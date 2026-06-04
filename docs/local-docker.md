# Local Docker Setup

## Ringkasan arsitektur saat ini

- Repo ini adalah Laravel 12 + React/Vite.
- Login Laravel memakai tabel legacy `m_user`, bukan tabel default `users`.
- Dari server 155, aplikasi aktif lama masih CodeIgniter dan memakai MySQL `db_trucking_system` di `127.0.0.1:3306`.
- Aplikasi lama juga punya koneksi ERP terpisah ke `tirtalogisticco_erp` pada port `3311`, tetapi repo Laravel saat ini baru menyimpan `id_erp` dan belum melakukan query ERP.

## Service Docker

- `app`: PHP 8.2 CLI + Composer, menjalankan `php artisan serve`.
- `node`: Vite dev server untuk React, opsional jika sedang aktif mengerjakan frontend.
- `mysql`: DB utama lokal, dipublish ke host port `3315` supaya tidak bentrok dengan WAMP atau MariaDB host Windows.
- `redis`: disediakan bila nanti queue/cache dipindah dari database.

## Langkah jalankan

```bash
cp .env.docker.example .env
docker compose up --build
```

Untuk workflow yang lebih stabil dan tidak mengganggu `main`, gunakan branch-only helper ini:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/bootstrap-local.ps1
```

Helper ini memakai:

- `.env.local.example`
- `docker-compose.local.yml`
- session/cache/queue yang tidak bergantung ke tabel database Laravel

Rule operasional lengkap untuk sync dari `main`, tes local, tes staging, dan merge balik ada di `docs/git-main-local-staging-rules.md`.

Setelah container `app` hidup:

- Domain utama via Apache WAMP proxy: `http://local.fms-lvl/`
- Laravel direct debug port: `http://localhost:8000`
- Vite dev server opsional: `http://localhost:5173`
- MySQL host access: `127.0.0.1:3315`

## SQLyog local

Gunakan koneksi berikut untuk DB local Docker:

- Host: `127.0.0.1`
- Port: `3315`
- User: `fms`
- Password: `fms_secret`
- Database: `db_trucking_system`

Catatan:

- port `3315` dipakai sebagai port khusus agar tidak bentrok dengan MariaDB atau MySQL host Windows
- jika SQLyog masih gagal, pastikan Anda tidak memakai koneksi lama yang masih menunjuk port `3307`

## Database lokal

Migration lokal sekarang membuat:

- tabel default Laravel untuk session, cache, jobs
- tabel `permissions`/`roles` dari Spatie
- tabel legacy `m_user` sesuai schema production yang dipakai login
- tabel master minimum `m_unit_kendaraan`, `m_type_kendaraan`, dan `m_merk_kendaraan` untuk smoke test local setelah sync dari `main`

Seeder lokal membuat user:

- `username`: `developer`
- `password`: `password`

Seeder lokal juga mengisi data minimum:

- `m_unit_kendaraan`
- `m_type_kendaraan`
- `m_merk_kendaraan`

## Catatan penting

- `.env.example` bawaan repo masih default `sqlite`, jadi untuk Docker gunakan `.env.docker.example`.
- Untuk workflow yang paling aman dari perubahan `main`, utamakan `.env.local.example` + `docker-compose.local.yml`.
- Host Windows dan Apache vhost perlu mengarah ke `local.fms-lvl`.
- Untuk mode lokal yang paling stabil, gunakan asset hasil build Laravel/Vite dan jangan bergantung pada `public/hot`.
- Jika halaman blank saat mode dev aktif, hapus `public/hot` setelah `npm run build` agar Laravel kembali memakai `public/build/*`.
- Bila nanti butuh parity data login, impor subset `m_user` dari production ke database lokal `db_trucking_system`.
- Bila modul ERP mulai dipakai dari Laravel, koneksi `tnperp` sudah disiapkan di `config/database.php` lewat env `ERP_DB_*`.
