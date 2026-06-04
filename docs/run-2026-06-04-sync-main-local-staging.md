# Execution Log: Sync `origin/main` into `codex/local-staging-ops`

## Waktu

- Tanggal: 4 Juni 2026
- Branch kerja: `codex/local-staging-ops`
- Target `origin/main`: `a7d9806677f40fb75ce25d2266682df991c25d85`

## Tujuan run ini

- menjalankan rule sync dari `origin/main` ke branch local atau staging
- mendokumentasikan langkah nyata yang terjadi di mesin local
- memastikan local bootstrap dan local smoke test benar-benar bisa dipakai setelah sync

## Kondisi awal

- branch aktif: `codex/local-staging-ops`
- `origin/main` terbaru berada 1 commit di atas basis branch kerja
- branch kerja masih berisi perubahan local atau staging yang belum seluruhnya ter-checkpoint
- host PHP local masih `7.4.33`
- Docker Desktop pada awal run belum aktif
- local hostname `http://local.fms-lvl/` belum dianggap pasti sehat

## Langkah yang dijalankan

### 1. Fetch referensi terbaru

Dilakukan:

```bash
git fetch origin
git ls-remote --heads origin main
```

Hasil:

- `origin/main` terverifikasi di `a7d9806677f40fb75ce25d2266682df991c25d85`

### 2. Checkpoint branch kerja sebelum merge

Catatan penting:

- percobaan pertama checkpoint dilakukan dengan `git add` dan `git commit` terlalu berdekatan
- hasilnya hanya sebagian perubahan yang masuk commit pertama
- sisanya masih tertinggal di staging area

Pelajaran operasional:

- `git add` dan `git commit` tidak boleh dijalankan paralel
- checkpoint harus dilakukan berurutan

Commit yang dibuat:

- `841adb0` `chore: checkpoint local staging workflow baseline`
- `a66b354` `chore: add local and staging workflow assets`

Catatan tambahan:

- kejadian ini menjadi dasar rule baru bahwa checkpoint harus dilakukan berurutan
- setelah `git add`, selalu verifikasi dulu dengan `git status -sb` sebelum `git commit`

### 3. Merge `origin/main` ke branch kerja

Dilakukan:

```bash
git merge origin/main
```

Hasil:

- auto-merge berhasil untuk sebagian besar file
- conflict terjadi di `routes/api.php`

### 4. Resolve conflict `routes/api.php`

Penyebab conflict:

- branch kerja memakai pola `Route::middleware('web')` dan `auth:web` untuk menjaga session Laravel
- `origin/main` menambah modul `merk-kendaraan`

Penyelesaian:

- route auth tetap dipertahankan
- route `unit-kendaraan`, `tipe-kendaraan`, dan `merk-kendaraan` diletakkan di dalam blok `auth:web`
- route `merk-kendaraan` dirapikan ke syntax class-based controller

### 5. Verifikasi host PHP local

Percobaan:

```bash
php artisan route:list --path=api
```

Hasil:

- gagal di host local karena PHP WAMP masih `7.4.33`
- repo ini membutuhkan PHP `>= 8.2`

Kesimpulan:

- validasi Laravel local harus melalui Docker
- host PHP tidak boleh dijadikan acuan untuk repo ini

### 6. Jalankan bootstrap local sesuai rule

Dilakukan:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/bootstrap-local.ps1 -RefreshEnv
```

Temuan pertama:

- Docker daemon belum aktif
- Docker Desktop harus dinyalakan lebih dulu

Setelah Docker aktif:

- build image `app` berhasil
- bootstrap sempat gagal karena port `3307` masih dipakai stack local lama `repo-mysql-1`

Tindakan:

```bash
docker compose -f docker-compose.yml down --remove-orphans
```

Setelah itu:

- bootstrap local dapat berjalan
- `mariadb`, `redis`, dan `app` berhasil hidup
- asset frontend build berhasil
- namun smoke test belum bisa dianggap final karena parity schema modul master belum lengkap

### 7. Jalankan smoke test local pertama

Percobaan awal:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/smoke-test-fms.ps1 -BaseUrl http://local.fms-lvl -Username developer -Password password
```

Hasil:

- gagal koneksi ke `local.fms-lvl`

Catatan:

- hostname proxy WAMP tidak sedang merespons pada run ini
- fallback local verification dialihkan ke `http://localhost:8000`

Percobaan kedua:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/smoke-test-fms.ps1 -BaseUrl http://localhost:8000 -Username developer -Password password
```

Hasil:

- login berhasil
- `auth/me` berhasil
- `unit-kendaraan` gagal `500`

Error nyata:

- `Table 'db_trucking_system.m_unit_kendaraan' doesn't exist`

### 8. Tambah parity minimum untuk local

Tindakan perbaikan:

- tambah migration:
  - `m_unit_kendaraan`
  - `m_type_kendaraan`
  - `m_merk_kendaraan`
- tambah `MasterKendaraanSeeder`
- sambungkan `MasterKendaraanSeeder` ke `DatabaseSeeder`

Tujuan:

- local smoke test tetap bisa lulus walau belum clone penuh data production
- modul `Unit`, `Tipe`, dan `Merk` punya tabel serta data dasar minimum setelah sync dari `origin/main`

### 9. Ulang bootstrap local dari nol

Dilakukan:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/bootstrap-local.ps1 -Fresh -RefreshEnv
```

Hasil:

- volume DB local di-reset
- migration baru dijalankan
- seeder baru dijalankan
- `app`, `mariadb`, dan `redis` hidup normal

### 10. Smoke test local final

Dilakukan:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/smoke-test-fms.ps1 -BaseUrl http://localhost:8000 -Username developer -Password password
```

Hasil final:

- `LOGIN_STATUS=200`
- `ME_STATUS=200`
- `UNIT_STATUS=200`
- `TIPE_STATUS=200`

Tambahan verifikasi:

- container local final:
  - `repo-app-1`
  - `repo-mariadb-1`
  - `repo-redis-1`
- local test final dijalankan melalui fallback resmi `http://localhost:8000`

## Temuan penting dari run ini

### Temuan 1

- sync dari `origin/main` valid, tetapi modul baru dari `main` belum otomatis punya local parity schema

Tindak lanjut:

- migration minimum untuk master kendaraan perlu dipertahankan di branch ops

### Temuan 2

- host PHP WAMP tidak cocok untuk repo ini

Tindak lanjut:

- semua validasi Laravel local harus lewat Docker

### Temuan 3

- hostname `local.fms-lvl` tidak selalu siap pada level proxy WAMP

Tindak lanjut:

- smoke test SOP local perlu menganggap `http://localhost:8000` sebagai fallback resmi

### Temuan 4

- stack local lama dapat mengganggu bootstrap rule baru

Tindak lanjut:

- saat port `3307` bentrok, bersihkan stack compose lama dari repo ini lebih dulu

## Status akhir run local

- `origin/main` terbaru sudah ditarik ke branch ops
- conflict route sudah diselesaikan
- bootstrap local branch-only berhasil
- smoke test local final berhasil
- merge dan dokumentasi akhir sudah tertutup di commit:
  - `f3a6408` `merge: sync origin main into local staging ops`
  - `60a6d48` `docs: record main sync execution status`
- branch local saat akhir dokumentasi berada dalam keadaan bersih

## Status staging

- belum selesai dijalankan pada log ini

Kondisi terakhir:

- branch local sudah bersih di commit `f3a6408`
- percobaan `git push -u origin codex/local-staging-ops` ditahan guardrail tool
- alasan penahanan: dianggap sebagai transfer kode keluar yang perlu persetujuan eksplisit tambahan

Langkah berikutnya setelah ada persetujuan eksplisit untuk push atau transfer ke remote:

- push branch ops ke remote
- sync branch yang sama di server 155
- jalankan deploy staging
- jalankan smoke test staging
