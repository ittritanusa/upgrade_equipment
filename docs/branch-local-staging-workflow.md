# Branch-Only Workflow for Local and Staging

## Tujuan

- `main` tetap dibiarkan mengikuti developer lain.
- Semua penyesuaian lokal dan staging hidup di branch khusus.
- Local dan server 155 memakai langkah yang sama setiap kali ada update dari Git.
- Aturan detail operasional ada di `docs/git-main-local-staging-rules.md`.

## Branch yang dipakai

- Branch kerja local dan integrasi: `codex/local-staging-ops`
- Branch deploy candidate staging: `staging/fms-laravel`
- Jangan deploy dari `main`.
- Saat ada update baru dari Git:
  - sync dulu `origin/main` ke `codex/local-staging-ops`
  - jalankan bootstrap dan smoke test local di branch itu
  - jika lolos, angkat commit yang sama ke `staging/fms-laravel`
  - deploy server 155 dari `staging/fms-laravel`
- Dengan pola ini, local tetap leluasa menerima fix parity, sementara staging hanya menarik commit yang sudah lolos test.

## Local yang stabil

Gunakan file dan command ini:

- env template: `.env.local.example`
- compose file: `docker-compose.local.yml`
- bootstrap: `powershell -ExecutionPolicy Bypass -File scripts/bootstrap-local.ps1`

Mode yang disarankan:

- `SESSION_DRIVER=file`
- `CACHE_STORE=file`
- `QUEUE_CONNECTION=sync`
- asset default memakai hasil build, bukan tergantung Vite hot reload

Jika butuh Vite watcher:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/bootstrap-local.ps1 -WithFrontendWatch
```

## Staging 155 yang stabil

Gunakan file dan command ini:

- env template: `.env.staging.example`
- compose file: `docker-compose.staging.yml`
- deploy script: `./scripts/deploy-staging.sh`
- smoke test: `powershell -ExecutionPolicy Bypass -File scripts/smoke-test-fms.ps1`

Default staging yang disarankan:

- clone data production ke DB staging Docker
- `SESSION_DRIVER=file`
- `CACHE_STORE=file`
- `QUEUE_CONNECTION=sync`
- `SKIP_DB_BOOTSTRAP=true`

Menu operasional tambahan:

- di staging, sidebar portal dapat menampilkan menu `Rules & Docs`
- menu ini diarahkan ke `/portal/staging/rules`
- flag utama yang mengaktifkannya adalah `VITE_SHOW_STAGING_RULES=true`

## Urutan update rutin

1. Checkout branch local `codex/local-staging-ops`.
2. Tarik update terbaru `origin/main`.
3. Merge atau rebase ke branch local itu.
4. Verifikasi file branch-only tetap utuh:
   - `.env.local.example`
   - `.env.staging.example`
   - `docker-compose.local.yml`
   - `docker-compose.staging.yml`
   - `scripts/bootstrap-local.ps1`
   - `scripts/deploy-staging.sh`
   - `scripts/smoke-test-fms.ps1`
5. Jalankan bootstrap local.
6. Sinkronkan commit lolos test ke `staging/fms-laravel`.
7. Jalankan deploy staging dari branch `staging/fms-laravel`.
8. Jalankan smoke test.

Fallback operasional yang perlu diingat:

- local test boleh memakai `http://localhost:8000` bila `http://local.fms-lvl/` belum sehat
- validasi Laravel local dilakukan melalui Docker, bukan PHP host WAMP

## Catatan penting

- Jangan edit file PHP atau JS langsung di server 155.
- Kalau fix memang valid untuk aplikasi, simpan di branch ini lalu deploy ulang.
- Server 155 idealnya track branch `staging/fms-laravel`, bukan `main`.
- Branch `codex/local-staging-ops` tetap menjadi branch kerja yang menerima sync dari `origin/main`.
