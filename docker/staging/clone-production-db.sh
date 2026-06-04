#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
COMPOSE_FILE="${COMPOSE_FILE:-docker-compose.staging.yml}"
PROJECT_NAME="${COMPOSE_PROJECT_NAME:-fms-laravel-staging}"
NETWORK_NAME="${PROJECT_NAME}_default"

cd "${ROOT_DIR}"

if [[ ! -f .env ]]; then
    echo "Missing .env in ${ROOT_DIR}" >&2
    exit 1
fi

set -a
. ./.env
set +a

TARGET_ROOT_PASSWORD="${STAGING_DB_ROOT_PASSWORD:-rootpassword}"

require_var() {
    local name="$1"
    if [[ -z "${!name:-}" ]]; then
        echo "Required env var ${name} is not set." >&2
        exit 1
    fi
}

for var_name in \
    DB_DATABASE \
    SOURCE_DB_HOST \
    SOURCE_DB_PORT \
    SOURCE_DB_DATABASE \
    SOURCE_DB_USERNAME \
    SOURCE_DB_PASSWORD
do
    require_var "${var_name}"
done

if [[ "${CLONE_SOURCE_DB_FULL:-false}" != "true" ]]; then
    echo "CLONE_SOURCE_DB_FULL is not true. Refusing to run full clone." >&2
    exit 1
fi

echo "Starting staging MariaDB container..."
docker-compose -p "${PROJECT_NAME}" -f "${COMPOSE_FILE}" up -d mariadb

TARGET_CONTAINER="$(docker-compose -p "${PROJECT_NAME}" -f "${COMPOSE_FILE}" ps -q mariadb)"
if [[ -z "${TARGET_CONTAINER}" ]]; then
    echo "Could not resolve mariadb container id." >&2
    exit 1
fi

echo "Waiting for staging MariaDB health check..."
until [[ "$(docker inspect -f '{{.State.Health.Status}}' "${TARGET_CONTAINER}")" == "healthy" ]]; do
    sleep 3
done

MYSQL_CLIENT_IMAGE="${MYSQL_CLIENT_IMAGE:-mariadb:10.6}"

echo "Recreating target database ${DB_DATABASE}..."
docker run --rm \
    --network "${NETWORK_NAME}" \
    "${MYSQL_CLIENT_IMAGE}" \
    sh -lc "
        MYSQL_PWD='${TARGET_ROOT_PASSWORD}' mysql \
            -h mariadb \
            -P 3306 \
            -u root \
            -e \"DROP DATABASE IF EXISTS \\\`${DB_DATABASE}\\\`; CREATE DATABASE \\\`${DB_DATABASE}\\\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;\"
    "

echo "Cloning ${SOURCE_DB_DATABASE} from ${SOURCE_DB_HOST}:${SOURCE_DB_PORT} into staging..."
docker run --rm \
    --network "${NETWORK_NAME}" \
    --add-host host.docker.internal:host-gateway \
    "${MYSQL_CLIENT_IMAGE}" \
    sh -lc "
        set -e
        MYSQL_PWD='${SOURCE_DB_PASSWORD}' mysqldump \
            --single-transaction \
            --skip-lock-tables \
            --default-character-set=utf8mb4 \
            -h '${SOURCE_DB_HOST}' \
            -P '${SOURCE_DB_PORT}' \
            -u '${SOURCE_DB_USERNAME}' \
            '${SOURCE_DB_DATABASE}' \
        | MYSQL_PWD='${TARGET_ROOT_PASSWORD}' mysql \
            --default-character-set=utf8mb4 \
            -h mariadb \
            -P 3306 \
            -u root \
            '${DB_DATABASE}'
    "

echo "Database clone completed for ${DB_DATABASE}."
