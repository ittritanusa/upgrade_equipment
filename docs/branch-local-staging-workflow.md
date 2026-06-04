# Branch-Only Workflow for Local and Staging

## Tujuan

- `main` tetap dibiarkan mengikuti developer lain.
- Semua penyesuaian lokal dan staging hidup di branch khusus.
- Local dan server 155 memakai langkah yang sama setiap kali ada update dari Git.
- Aturan detail operasional ada di `docs/git-main-local-staging-rules.md`.

## Branch yang dipakai

- Contoh branch kerja: `codex/local-staging-ops`
- Jangan deploy dari `main`.
- Saat ada update baru dari Git, sync dulu ke branch ini, lalu jalankan bootstrap local dan deploy staging dari branch yang sama.

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

## Urutan update rutin

1. Checkout branch lokal/staging.
2. Tarik update terbaru `origin/main`.
3. Merge atau rebase ke branch lokal/staging.
4. Verifikasi file branch-only tetap utuh:
   - `.env.local.example`
   - `.env.staging.example`
   - `docker-compose.local.yml`
   - `docker-compose.staging.yml`
   - `scripts/bootstrap-local.ps1`
   - `scripts/deploy-staging.sh`
   - `scripts/smoke-test-fms.ps1`
5. Jalankan bootstrap local.
6. Jalankan deploy staging dari branch yang sama.
7. Jalankan smoke test.

Fallback operasional yang perlu diingat:

- local test boleh memakai `http://localhost:8000` bila `http://local.fms-lvl/` belum sehat
- validasi Laravel local dilakukan melalui Docker, bukan PHP host WAMP

## Catatan penting

- Jangan edit file PHP atau JS langsung di server 155.
- Kalau fix memang valid untuk aplikasi, simpan di branch ini lalu deploy ulang.
- Jika nanti branch ini ingin dipakai jangka panjang di server 155 dengan `git pull`, branch harus dipush ke remote dan clone di server harus track branch itu, bukan `main`.
