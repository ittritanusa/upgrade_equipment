#!/usr/bin/env sh
set -eu

PROJECT_ROOT=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
PROJECT_NAME=${PROJECT_NAME:-fms-laravel-staging}
COMPOSE_FILE=${COMPOSE_FILE:-docker-compose.staging.yml}
DEPLOY_BRANCH=${DEPLOY_BRANCH:-$(git -C "$PROJECT_ROOT" rev-parse --abbrev-ref HEAD)}
SMOKE_BASE_URL=${SMOKE_BASE_URL:-https://staging-fms-laravel.tirtanusa.com}

cd "$PROJECT_ROOT"

if [ "$DEPLOY_BRANCH" = "main" ] && [ "${ALLOW_MAIN_DEPLOY:-false}" != "true" ]; then
    echo "Refusing to deploy branch 'main'. Use a dedicated local/staging branch."
    exit 1
fi

if [ ! -f .env ]; then
    echo "Missing .env in $PROJECT_ROOT"
    exit 1
fi

git fetch origin
git checkout "$DEPLOY_BRANCH"
git pull --ff-only origin "$DEPLOY_BRANCH"

docker compose -p "$PROJECT_NAME" -f "$COMPOSE_FILE" up -d mariadb

if [ "${CLONE_SOURCE_DB_FULL:-false}" = "true" ]; then
    ./docker/staging/clone-production-db.sh
fi

docker compose -p "$PROJECT_NAME" -f "$COMPOSE_FILE" up -d --build app
docker compose -p "$PROJECT_NAME" -f "$COMPOSE_FILE" ps

curl -fsS "$SMOKE_BASE_URL/" >/dev/null
curl -fsS "$SMOKE_BASE_URL/api/auth/me" >/dev/null

echo "Staging deploy finished for branch $DEPLOY_BRANCH"
