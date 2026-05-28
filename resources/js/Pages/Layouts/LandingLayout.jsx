import React from 'react';
import { NavLink } from 'react-router-dom';

const LandingLayout = ({ children }) => {
  return (
    <div className="font-sans text-gray-900 bg-white">
      {/* ================= NAVBAR ================= */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <NavLink to="/" className="flex items-center gap-3 font-bold text-lg tracking-tight">
            <img src="/assets/img/logo_ags.png" alt="AGS Logo" className="h-10 object-contain" />
          </NavLink>
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
            {[
              { name: 'Beranda', path: '/' },
              { name: 'Tentang Kami', path: '/tentang-kami' },
              { name: 'Layanan', path: '/layanan' },
              { name: 'Proyek', path: '/proyek' },
              { name: 'Berita', path: '/berita' },
            ].map((item) => (
              <NavLink key={item.name} to={item.path} className={({ isActive }) => `transition ${isActive ? 'text-blue-900 font-bold border-b-2 border-blue-900' : 'hover:text-blue-900'}`}>
                {item.name}
              </NavLink>
            ))}
          </div>
          <NavLink to="/kontak" className="bg-blue-900 text-white px-5 py-2.5 rounded-full text-sm hover:bg-blue-800 transition shadow">
            Hubungi Kami
          </NavLink>
        </div>
      </nav>

      {/* Konten Halaman */}
      <main>{children}</main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">
          <div>
            <img src="/assets/img/logo_ags.png" alt="AGS Logo" className="h-10 object-contain" />
            <p className="text-sm leading-relaxed mt-4">Perusahaan konstruksi terpercaya dengan komitmen pada kualitas, keselamatan, dan ketepatan waktu.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-3">Menu</h4>
            <ul className="space-y-2 text-sm">{['Beranda', 'Tentang Kami', 'Layanan', 'Proyek', 'Kontak'].map(i => <li key={i}>{i}</li>)}</ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-3">Layanan</h4>
            <ul className="space-y-2 text-sm"><li>Konstruksi Gedung</li><li>Infrastruktur</li><li>Engineering Design</li><li>Renovasi</li></ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-3">Kontak</h4>
            <p className="text-sm">Email: info@ags.co.id<br />Telp: 0812-xxxx-xxxx<br />Jakarta, Indonesia</p>
          </div>
        </div>
        <div className="border-t border-gray-800 text-center py-4 text-sm">© 2026 PT Anugrah Guna Semesta. All rights reserved.</div>
      </footer>
    </div>
  );
};

export default LandingLayout;