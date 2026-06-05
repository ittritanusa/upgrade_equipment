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
- Server 155 tidak boleh mengikuti `main`; gunakan branch staging khusus yang hanya berisi commit yang sudah lolos local.
- Tidak boleh edit file PHP, JS, atau env langsung di server bila fix itu sebenarnya fix aplikasi.
- Semua fix aplikasi disimpan di branch dulu, lalu local test, staging test, baru diputuskan apakah layak merge ke `main`.

## Branch yang dipakai

- Branch local dan integrasi: `codex/local-staging-ops`
- Branch staging deploy candidate: `staging/fms-laravel`
- `codex/local-staging-ops` menjadi tempat:
  - fix aplikasi yang sedang diverifikasi
  - file Docker local
  - file Docker staging
  - script deploy
  - script smoke test
  - dokumentasi operasional
- `staging/fms-laravel` hanya diangkat dari commit `codex/local-staging-ops` yang sudah lolos test local

## Preflight checklist sebelum mulai

Checklist ini wajib dicek sebelum menjalankan workflow.

### Preflight local

- branch aktif bukan `main`
- `git status -sb` dipahami hasilnya
- Docker Desktop aktif
- port `8000`, `3315`, dan `6379` tidak bentrok dengan stack repo lama
- jika ingin tes lewat hostname, `http://local.fms-lvl/` harus aktif
- jika hostname WAMP tidak aktif, siapkan fallback ke `http://localhost:8000`

### Preflight staging

- branch local dan branch staging sudah ada di remote
- repo staging di server 155 track `staging/fms-laravel`
- `.env` staging sesuai `.env.staging.example`
- container runtime server 155 sehat
- domain `https://staging-fms-laravel.tirtanusa.com/` merespons
- jika policy kerja menahan `git push`, proses berhenti sampai ada persetujuan eksplisit

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

Command yang disarankan:

```bash
git checkout codex/local-staging-ops
git status -sb
```

Expected:

- branch aktif `codex/local-staging-ops`
- jika working tree kotor, pahami dulu apakah itu perubahan yang memang akan di-checkpoint

### 2. Ambil update terbaru dari remote

```bash
git fetch origin
git merge origin/main
```

Command verifikasi yang disarankan:

```bash
git ls-remote --heads origin main
git log --oneline --decorate -n 3 origin/main
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

Aturan merge yang wajib:

- checkpoint branch kerja dulu sebelum merge
- `git add` lalu `git commit` jalankan berurutan, jangan paralel
- jika conflict menyangkut route auth, session, atau Docker env, pilih hasil akhir yang tetap aman untuk local dan staging

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

Jika salah satu file branch-only berubah karena merge dari `main`:

- review isinya
- kembalikan behavior branch-only yang benar
- dokumentasikan penyesuaian itu di run log

## Tes lokal yang wajib

### Bootstrap local

```powershell
powershell -ExecutionPolicy Bypass -File scripts/bootstrap-local.ps1 -RefreshEnv
```

Expected:

- image `app` berhasil dibuild
- service `repo-app-1`, `repo-mariadb-1`, dan `repo-redis-1` hidup
- asset frontend build berhasil

Jika gagal:

- jika Docker daemon mati, nyalakan Docker Desktop dulu
- jika port `3315` bentrok, bersihkan stack compose repo lama atau cek service DB host Windows yang mengambil port itu
- jika perlu reset total, gunakan mode `-Fresh`

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

Fallback resmi bila hostname WAMP tidak aktif:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/smoke-test-fms.ps1 -BaseUrl http://localhost:8000 -Username developer -Password password
```

Minimal hasil yang harus lolos:

- `LOGIN_STATUS=200`
- `ME_STATUS=200`
- `UNIT_STATUS=200`
- `TIPE_STATUS=200`

Jika smoke test local gagal:

- `Unable to connect to the remote server`
  - cek container app sudah `Up`
  - coba ulang ke `http://localhost:8000`
- `500` pada `Unit` atau `Tipe`
  - cek log `docker compose -f docker-compose.local.yml logs app --tail 200`
  - verifikasi migration parity local untuk master kendaraan sudah ada
- `401`
  - verifikasi login response
  - verifikasi route auth tetap berada di `web` dan protected route berada di `auth:web`

### Tes manual local

Minimal cek manual:

- halaman login tampil normal
- login berhasil
- halaman `Unit Kendaraan` tampil
- halaman `Tipe Kendaraan` tampil
- halaman `Merk Kendaraan` tampil bila modul itu ikut dari `main`
- pagination tidak error
- logout berhasil

## Urutan deploy staging 155

### 1. Push branch local ke remote

Staging tidak boleh menarik dari `main`. Branch local dan branch staging harus tersedia di remote.

Contoh:

```bash
git push -u origin codex/local-staging-ops
```

Lalu sinkronkan branch staging ke commit yang sama:

```bash
git branch -f staging/fms-laravel codex/local-staging-ops
git push -u origin staging/fms-laravel
```

Catatan operasional:

- jika tool atau policy kerja menahan `git push` karena dianggap transfer kode keluar, proses staging berhenti di sini sampai ada persetujuan eksplisit
- jangan menyiasati blokir push dengan transfer alternatif yang tidak disetujui

Expected:

- branch local tersedia di remote
- branch staging tersedia di remote
- server 155 bisa checkout `staging/fms-laravel`

### 2. Pastikan server 155 memakai branch staging

Di server:

- repo staging harus checkout `staging/fms-laravel`
- file `.env` staging harus mengikuti nilai aman dari `.env.staging.example`

Command verifikasi yang disarankan di server:

```bash
git branch --show-current
docker compose -p fms-laravel-staging -f docker-compose.staging.yml ps
```

Jika runtime staging aktif bukan checkout Git:

- gunakan artifact dari branch yang sudah diuji local
- contoh:
  - `git archive --format=tar.gz ... HEAD`
  - upload ke server
  - extract ke folder runtime staging
  - rebuild app container

Aturan:

- branch sumber deploy harus `staging/fms-laravel`
- jangan deploy dari working copy acak yang tidak terlacak

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
DEPLOY_BRANCH=staging/fms-laravel ./scripts/deploy-staging.sh
```

Expected:

- container DB sehat
- container app berhasil rebuild dan restart
- smoke check dasar domain tidak gagal
- jika halaman `Rules & Docs` dipakai, bundle staging harus memuat marker `Rules and Deployment Playbook`

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

Tambahan bila modul `Merk Kendaraan` dipakai:

- cek halaman `Merk Kendaraan` secara manual
- pastikan create atau edit tidak error

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
- apakah perubahan ini hanya untuk parity local branch-only
- apakah perubahan ini aman untuk developer lain yang tidak memakai server 155

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
- Jangan mengandalkan PHP host WAMP untuk validasi repo ini selama requirement aplikasi masih `>= 8.2`

## Checklist ringkas per run

Gunakan checklist ini untuk tiap eksekusi:

1. `git checkout codex/local-staging-ops`
2. `git status -sb`
3. `git fetch origin`
4. checkpoint branch jika masih ada perubahan
5. `git merge origin/main`
6. selesaikan conflict bila ada
7. `powershell -ExecutionPolicy Bypass -File scripts/bootstrap-local.ps1 -RefreshEnv`
8. `powershell -ExecutionPolicy Bypass -File scripts/smoke-test-fms.ps1 -BaseUrl http://localhost:8000 -Username developer -Password password`
9. commit hasil sync dan fix parity jika ada
10. `git push -u origin codex/local-staging-ops`
11. update `staging/fms-laravel` ke commit local yang lolos test
12. deploy staging dari `staging/fms-laravel`
13. smoke test staging

## Dokumen pendamping

- [branch-local-staging-workflow.md](C:/wamp64/www/FMS-LRVL/repo/docs/branch-local-staging-workflow.md)
- [local-docker.md](C:/wamp64/www/FMS-LRVL/repo/docs/local-docker.md)
- [staging-server155.md](C:/wamp64/www/FMS-LRVL/repo/docs/staging-server155.md)

## View dari dalam aplikasi staging

- Di environment staging, sidebar portal dapat menampilkan menu `Rules & Docs`.
- Route halaman: `/portal/staging/rules`
- Flag env yang dipakai: `VITE_SHOW_STAGING_RULES=true`
- Tujuannya agar operator staging dapat membaca SOP, fallback, dan ringkasan run terakhir tanpa membuka repo secara langsung.
