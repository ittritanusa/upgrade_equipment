Struktur Code Umum Frontend
- gunakan @ untuk path Frontend
- setiap folder dan file dalam js CamelCase
- setting logic global di dalam Utils
- Utils/Libs dipake untuk logic global
- Utils/Contexts untuk beberapa context
- Utils/Helpers untuk logic + komponen global
- Utils/Apis setiap prefix group files api, menggunakan axios
- Utils/Hooks setiap prefix group file React Query dari Apis
- Setiap halaman pakai dari react query jika memungkinkan

Struktur Layout
- Pages/Layouts/AuthLayout.jsx untuk halaman autentikasi
- Pages/Layouts/PortalLayout.jsx untuk halaman admin

Struktur Code Halaman
- setiap halaman 1 folder, 1 folder punya 1 file utama yang sama namanya. Misal: User/User.jsx
- penamaan file komponen lain selain file utama menambahkan di belakangnya. Misal: User/UserModal.jsx
- UI dengan Logic dipisah. UI dengan .jsx lalu Logic dengan Hooks/.js
- semua file menggunakan .js atau .jsx
