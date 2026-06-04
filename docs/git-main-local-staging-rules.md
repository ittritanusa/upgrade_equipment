# Rules for Syncing `main`, Local, Staging, and Merge Back

## Tujuan

Dokumen ini menjadi acuan setiap kali:

- ada update baru di `origin/main`
- branch lokal dan staging harus ikut update
- perlu penyesuaian code untuk local atau staging
- perlu tes sebelum deploy
- perlu memutuskan apakah sebuah perubahan layak di-merge kembali ke `main`

## Prinsip utama

- `main` tidak dipakai untuk kerja harian local atau staging.
- Semua pekerjaan local dan staging dilakukan di branch khusus.
- Server 155 harus mengikuti branch yang sama dengan local staging, bukan `main`.
- Tidak boleh edit file PHP, JS, atau env langsung di server bila fix itu sebenarnya fix aplikasi.
- Semua fix aplikasi disimpan di branch dulu, lalu local test, staging test, baru diputuskan apakah layak merge ke `main`.

## Branch yang dipakai

- Branch contoh: `codex/local-staging-ops`
- Branch ini menjadi tempat:
  - fix aplikasi yang sedang diverifikasi
  - file Docker local
  - file Docker staging
  - script deploy
  - script smoke test
  - dokumentasi operasional

## Klasifikasi perubahan code

### Boleh tetap di branch local or staging saja

Ini tidak perlu dipaksa masuk ke `main` bila developer lain punya environment berbeda:

- `.env.local.example`
- `.env.staging.example`
- `docker-compose.local.yml`
- `docker-compose.staging.yml`
- script helper seperti `scripts/bootstrap-local.ps1`
- script deploy staging
- script smoke test
- dokumentasi server 155, local hostname, atau proxy host

### Kandidat merge ke `main`

Ini sebaiknya dipertimbangkan merge ke `main` bila sudah lolos local dan staging:

- bug fix auth aplikasi
- bug fix React page atau hook
- perbaikan route API
- perbaikan model Laravel
- perbaikan query, pagination, validation, permission, response format
- migration atau seeder yang memang dibutuhkan aplikasi secara umum
- perubahan `bootstrap/app.php`, `config/database.php`, `vite.config.js`, atau controller yang memperbaiki behavior aplikasi lintas environment

### Harus ditahan dulu, jangan merge ke `main` sebelum koordinasi

- perubahan yang hanya cocok untuk server 155
- perubahan yang mengunci credential, domain, host, port, atau nama DB tertentu
- perubahan yang bergantung pada data clone production tertentu
- perubahan yang memaksa developer lain mengubah cara kerja environment mereka tanpa persetujuan

## Urutan standar saat ada update dari `origin/main`

### 1. Siapkan branch kerja

Pastikan bekerja di branch khusus:

```bash
git checkout codex/local-staging-ops
```

Pastikan tidak ada file sementara yang ikut mengganggu:

- file `tmp-*`
- dump manual
- artifact smoke test

### 2. Ambil update terbaru dari remote

```bash
git fetch origin
git merge origin/main
```

Jika ada conflict:

- selesaikan conflict di branch `codex/local-staging-ops`
- jangan menyelesaikan conflict dengan edit di `main`
- utamakan mempertahankan file branch-only berikut:
  - `.env.local.example`
  - `.env.staging.example`
  - `docker-compose.local.yml`
  - `docker-compose.staging.yml`
  - `scripts/bootstrap-local.ps1`
  - `scripts/deploy-staging.sh`
  - `scripts/smoke-test-fms.ps1`

## Urutan penyesuaian code setelah pull dari `main`

Setelah `git merge origin/main`, cek perubahan dalam urutan ini:

### 1. Perubahan aplikasi inti

Cek file seperti:

- `app/Http/Controllers/*`
- `app/Models/*`
- `routes/api.php`
- `resources/js/*`
- `bootstrap/app.php`
- `config/database.php`
- `vite.config.js`

Fokus pertanyaan:

- apakah logic auth masih cocok
- apakah API route lama berubah
- apakah hook frontend masih memanggil endpoint yang benar
- apakah model login masih cocok ke `m_user`
- apakah perubahan baru dari `main` menimpa fix staging yang penting

### 2. Perubahan dependency

Cek:

- `composer.json`
- `composer.lock`
- `package.json`
- `package-lock.json`

Jika berubah:

- sync dependency lokal
- pastikan build frontend masih sukses
- pastikan container app staging masih bisa build

### 3. Perubahan database

Cek:

- `database/migrations`
- `database/seeders`

Aturan:

- local boleh menjalankan migrate dan seed
- staging clone production default tidak menjalankan bootstrap schema tambahan bila `SKIP_DB_BOOTSTRAP=true`
- migration baru jangan dipaksa ke staging clone tanpa evaluasi dampak

### 4. Perubahan file branch-only

Verifikasi file berikut tidak hilang atau tertimpa:

- `.env.local.example`
- `.env.staging.example`
- `docker-compose.local.yml`
- `docker-compose.staging.yml`
- `docs/local-docker.md`
- `docs/staging-server155.md`
- `docs/branch-local-staging-workflow.md`
- `scripts/bootstrap-local.ps1`
- `scripts/deploy-staging.sh`
- `scripts/smoke-test-fms.ps1`

## Tes lokal yang wajib

### Bootstrap local

```powershell
powershell -ExecutionPolicy Bypass -File scripts/bootstrap-local.ps1 -RefreshEnv
```

Jika perlu reset total local DB volume:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/bootstrap-local.ps1 -Fresh -RefreshEnv
```

### Smoke test local

Gunakan salah satu akun yang tersedia di local:

- akun seed local seperti `developer`
- akun hasil import subset `m_user`, bila local sedang pakai data parity

Command:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/smoke-test-fms.ps1 -BaseUrl http://local.fms-lvl -Username developer -Password password
```

Minimal hasil yang harus lolos:

- `LOGIN_STATUS=200`
- `ME_STATUS=200`
- `UNIT_STATUS=200`
- `TIPE_STATUS=200`

### Tes manual local

Minimal cek manual:

- halaman login tampil normal
- login berhasil
- halaman `Unit Kendaraan` tampil
- halaman `Tipe Kendaraan` tampil
- pagination tidak error
- logout berhasil

## Urutan deploy staging 155

### 1. Push branch local or staging ke remote

Staging tidak boleh menarik dari `main`. Branch kerja harus tersedia di remote.

Contoh:

```bash
git push -u origin codex/local-staging-ops
```

### 2. Pastikan server 155 memakai branch yang sama

Di server:

- repo staging harus checkout `codex/local-staging-ops`
- file `.env` staging harus mengikuti nilai aman dari `.env.staging.example`

Default aman staging:

- `CLONE_SOURCE_DB_FULL=true`
- `SKIP_DB_BOOTSTRAP=true`
- `SESSION_DRIVER=file`
- `CACHE_STORE=file`
- `QUEUE_CONNECTION=sync`
- `SYNC_SOURCE_M_USER=false`

### 3. Jalankan deploy staging

Di server:

```bash
DEPLOY_BRANCH=codex/local-staging-ops ./scripts/deploy-staging.sh
```

## Tes staging yang wajib

### Smoke test staging

Gunakan akun staging yang valid.

Contoh command dari local:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/smoke-test-fms.ps1 -BaseUrl https://staging-fms-laravel.tirtanusa.com -Username <user-valid> -Password <password-valid>
```

Minimal hasil yang harus lolos:

- `LOGIN_STATUS=200`
- `ME_STATUS=200`
- `UNIT_STATUS=200`
- `TIPE_STATUS=200`

### Tes manual staging

Minimal cek manual:

- login berhasil
- refresh browser setelah login tidak memutus session
- `Unit Kendaraan` tidak `401`
- `Tipe Kendaraan` tidak `401` atau `404`
- logout berhasil
- halaman tetap bisa dibuka ulang

## Kapan perubahan boleh merge ke `main`

Sebuah perubahan hanya layak merge ke `main` bila semua syarat ini terpenuhi:

1. Perubahan itu memang fix aplikasi umum, bukan fix environment server 155 saja.
2. Local smoke test lulus.
3. Staging smoke test lulus.
4. Tes manual local lulus.
5. Tes manual staging lulus.
6. Tidak ada credential, host, domain, atau port khusus staging yang ikut masuk.
7. Tidak merusak cara kerja developer lain yang memakai environment berbeda.

## Urutan merge balik ke `main`

### 1. Pisahkan mana yang branch-only dan mana yang kandidat merge

Tetap branch-only:

- `.env.local.example`
- `.env.staging.example`
- `docker-compose.local.yml`
- script atau docs operasional yang spesifik untuk workflow local atau server 155

Kandidat merge:

- fix controller
- fix model
- fix route
- fix hook frontend
- fix auth/session aplikasi
- fix build yang memang universal

### 2. Review diff sebelum merge

Pertanyaan review:

- apakah perubahan ini universal
- apakah ada hardcoded host atau credential
- apakah perubahan ini murni bug fix aplikasi
- apakah response API tetap kompatibel
- apakah migration baru benar-benar wajib

### 3. Merge atau cherry-pick ke branch yang akan masuk `main`

Lebih aman:

- buat branch bersih dari `origin/main`
- cherry-pick hanya commit aplikasi yang memang universal
- jangan ikut membawa commit branch-only local atau staging

### 4. Tes ulang sebelum push ke `main`

Minimal ulang:

- build frontend
- smoke test local
- review file yang akan dipush

## Larangan operasional

- Jangan deploy staging dari `main`
- Jangan edit source langsung di server 155
- Jangan pakai DB production langsung untuk staging jika tujuan utamanya hanya quick test biasa
- Jangan merge file env staging atau local ke `main` tanpa alasan kuat
- Jangan anggap page yang terbuka berarti fitur sudah benar; smoke test auth dan API tetap wajib

## Dokumen pendamping

- [branch-local-staging-workflow.md](C:/wamp64/www/FMS-LRVL/repo/docs/branch-local-staging-workflow.md)
- [local-docker.md](C:/wamp64/www/FMS-LRVL/repo/docs/local-docker.md)
- [staging-server155.md](C:/wamp64/www/FMS-LRVL/repo/docs/staging-server155.md)
