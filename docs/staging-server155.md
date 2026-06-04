# Staging Server 155

## Target

- Domain: `https://staging-fms-laravel.tirtanusa.com`
- Host: `103.75.27.155:5522`
- Runtime: Docker on server, Apache host-level reverse proxy to container port `8014`

## Container layout

- `app`: FMS source layered onto the proven `tms-erp-app:local-php82` runtime that already works on server 155
- `mariadb`: isolated `mariadb:10.6` container for staging, aligned with the working `erp-tms-staging` stack on server 155
- `docker/staging/clone-production-db.sh`: host-side helper that clones production DB into the staging MariaDB container using Docker DB client tools

## Database strategy

- Staging app uses its own Docker MariaDB, still named `db_trucking_system` inside the container.
- Full production clone is performed by `./docker/staging/clone-production-db.sh`, not by the Laravel app container.
- Host DB source is accessed via `host.docker.internal`.
- Alternative risky mode: staging can point directly to production DB on server 155, but in that mode Laravel bootstrap migrations/seeds must be skipped and `session/cache/queue` should avoid database drivers.
- Runtime note: `USE_PRODUCTION_DB_DIRECT`, `CLONE_SOURCE_DB_FULL`, and related flags are deployment controls for the staging workflow. Laravel only consumes `SKIP_DB_BOOTSTRAP` directly.

## Recommended mode: full clone into staging DB

This is the safer compromise when you want production-like data without letting staging write into production.

Use these env choices:

- `CLONE_SOURCE_DB_FULL=true`
- `USE_PRODUCTION_DB_DIRECT=false`
- `DB_HOST=mariadb`
- `DB_PORT=3306`
- `DB_DATABASE=db_trucking_system`
- `DB_USERNAME=fms`
- `DB_PASSWORD=fms_secret`
- `SOURCE_DB_HOST=host.docker.internal`
- `SOURCE_DB_PORT=3306`
- `SOURCE_DB_DATABASE=db_trucking_system`
- `SOURCE_DB_USERNAME=it`
- `SOURCE_DB_PASSWORD=...`
- `STAGING_DB_ROOT_PASSWORD=rootpassword`
- `MYSQL_CLIENT_IMAGE=mariadb:10.6`

Then run:

```bash
docker-compose -p fms-laravel-staging -f docker-compose.staging.yml up -d mariadb
./docker/staging/clone-production-db.sh
docker-compose -p fms-laravel-staging -f docker-compose.staging.yml up -d app
```

Untuk workflow yang tidak menyentuh `main`, utamakan deploy dari branch khusus dengan helper:

```bash
DEPLOY_BRANCH=codex/local-staging-ops ./scripts/deploy-staging.sh
```

Rule operasional lengkap untuk sync dari `main`, deploy staging, smoke test, dan aturan merge balik ada di `docs/git-main-local-staging-rules.md`.

If you want zero Laravel schema changes after the clone:

- `SESSION_DRIVER=file`
- `CACHE_STORE=file`
- `QUEUE_CONNECTION=sync`
- `SYNC_SOURCE_M_USER=false`
- `SKIP_DB_BOOTSTRAP=true`

If later you want Laravel-owned tables inside staging only:

- leave `CLONE_SOURCE_DB_FULL=true`
- set `SKIP_DB_BOOTSTRAP=false`

That will run migrations only against the staging container DB, not production.

## Direct production DB mode

If you intentionally want staging to read the production DB directly:

- set `USE_PRODUCTION_DB_DIRECT=true`
- set `DB_HOST=host.docker.internal`
- set `DB_PORT=3306`
- set `DB_DATABASE=db_trucking_system`
- set `DB_USERNAME=it`
- set `DB_PASSWORD` to the host DB credential
- set `SESSION_DRIVER=file`
- set `CACHE_STORE=file`
- set `QUEUE_CONNECTION=sync`
- set `SYNC_SOURCE_M_USER=false`
- set `SKIP_DB_BOOTSTRAP=true`

Important risk:

- login flow can still write to production if a user still has legacy SHA1 password, because the current `AuthController` auto-upgrades it to bcrypt
- any future create/update/delete feature in Laravel staging will hit production data directly

## Key files

- `docker-compose.staging.yml`
- `.env.staging.example`
- `docker/staging/app/Dockerfile`
- `docker/staging/app/entrypoint.sh`
- `docker/staging/clone-production-db.sh`
- `scripts/deploy-staging.sh`
- `scripts/smoke-test-fms.ps1`
- `docs/branch-local-staging-workflow.md`

## Menu khusus staging

- Staging dapat menampilkan menu khusus `Rules & Docs` di sidebar portal.
- Menu ini muncul bila `VITE_SHOW_STAGING_RULES=true` atau hostname aktif adalah `staging-fms-laravel.tirtanusa.com`.
- Route yang dipakai: `/portal/staging/rules`
- Halaman ini merangkum SOP sync dari `main`, bootstrap local, deploy staging, dan highlight run terakhir.

Status deploy 4 Juni 2026:

- bundle staging sudah terverifikasi memuat halaman `Rules & Docs`
- marker halaman ditemukan pada asset:
  - `/build/assets/App-4a2LxF_2.js`

## Server 155 note

- Server 155 already runs `erp_tms_staging_app` on PHP 8.2 and `erp_tms_staging_db` on `mariadb:10.6`.
- FMS staging is aligned to that same DB stack and reuses the existing PHP 8.2 runtime image pattern to avoid on-host extension compilation failures.

## Expected host Apache proxy

- HTTPS vhost proxies `staging-fms-laravel.tirtanusa.com` to `http://127.0.0.1:8014/`
- Cert path follows existing `tirtanusa.com` pattern on server 155
