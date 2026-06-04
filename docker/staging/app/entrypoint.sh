#!/usr/bin/env sh
set -eu

cd /var/www/html

mkdir -p \
    storage/app/public \
    storage/framework/cache/data \
    storage/framework/sessions \
    storage/framework/views \
    storage/logs \
    bootstrap/cache

chown -R www-data:www-data storage bootstrap/cache
rm -f bootstrap/cache/*.php

wait_for_db() {
    echo "Waiting for database ${DB_HOST}:${DB_PORT}..."
    until php -r '
        $host = getenv("DB_HOST");
        $port = getenv("DB_PORT");
        $db = getenv("DB_DATABASE");
        $user = getenv("DB_USERNAME");
        $pass = getenv("DB_PASSWORD");
        try {
            new PDO("mysql:host={$host};port={$port};dbname={$db}", $user, $pass, [
                PDO::ATTR_TIMEOUT => 3,
            ]);
        } catch (Throwable $e) {
            fwrite(STDERR, $e->getMessage().PHP_EOL);
            exit(1);
        }
    '; do
        sleep 3
    done
}

wait_for_db

php artisan config:clear

if [ "${SKIP_DB_BOOTSTRAP:-false}" = "true" ]; then
    echo "Skipping migrate/seed/bootstrap because SKIP_DB_BOOTSTRAP=true."
else
    php artisan migrate --force
    php artisan db:seed --force
fi

php artisan storage:link || true
php artisan optimize:clear
php artisan optimize
php artisan config:cache

exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
