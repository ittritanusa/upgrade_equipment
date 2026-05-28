import React from 'react';
import { useNavigate } from 'react-router-dom';
import LandingLayout from '@/Pages/Layouts/LandingLayout';
import { ShieldCheck, Clock, Users, MessageSquareText } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <LandingLayout>
      {/* ================= HERO ================= */}
      <header className="relative h-[650px] flex items-center" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1504307651254-35680f356dfd)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
        <div className="relative max-w-7xl mx-auto w-full px-6">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">Membangun Kualitas,<br />Mewujudkan Kepercayaan</h1>
            <p className="text-gray-200 leading-relaxed mb-8">PT Anugrah Guna Semesta adalah perusahaan konstruksi terintegrasi dengan komitmen pada mutu, keselamatan, dan ketepatan waktu dalam setiap proyek yang kami kerjakan.</p>
            <div className="flex gap-4">
              <button className="bg-yellow-400 text-black px-6 py-3 rounded font-semibold hover:bg-yellow-300 transition">Lihat Proyek Kami</button>
              <button className="border border-white px-6 py-3 rounded hover:bg-white hover:text-black transition">Hubungi Kami</button>
            </div>
          </div>
        </div>
      </header>

      {/* ================= ABOUT ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-yellow-500 font-semibold">Tentang Kami</span>
          <h2 className="text-3xl font-bold mt-2 mb-5 leading-snug">Kontraktor Profesional Untuk Setiap Kebutuhan Konstruksi Anda</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">Berpengalaman dalam menangani berbagai proyek konstruksi skala kecil hingga besar dengan standar kualitas tinggi dan manajemen profesional.</p>
          <ul className="space-y-3 text-gray-700">
            {['Tim Profesional dan berpengalaman', 'Manajemen proyek efektif & transparan', 'Teknologi konstruksi modern', 'Komitmen keselamatan kerja & lingkungan'].map((item) => (
              <li key={item} className="flex gap-2"><span className="text-green-600">✔</span> {item}</li>
            ))}
          </ul>
          <button 
            onClick={() => navigate('/tentang-kami')}
            className="mt-8 bg-blue-900 text-white px-6 py-3 rounded hover:bg-blue-800 transition"
          >
              Selengkapnya
          </button>
        </div>
        <div className="relative">
          <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab" className="rounded-xl shadow-lg h-[380px] w-full object-cover" alt="About" />
          <div className="absolute bottom-5 right-5 bg-blue-900 text-white px-5 py-4 rounded-lg shadow-lg">
            <div className="text-3xl font-bold">10+</div>
            <div className="text-xs text-gray-200">Tahun Pengalaman</div>
          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">

          <span className="text-yellow-500 font-semibold">Layanan Kami</span>
          <h2 className="text-3xl font-bold mt-2 mb-12">
            Solusi Konstruksi Terintegrasi
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
            {[
              'Konstruksi Gedung',
              'Infrastruktur',
              'Engineering & Design',
              'Renovasi & Rehabilitasi',
              'Manajemen Proyek'
            ].map((item) => (
              <div
                key={item}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition border"
              >
                <div className="text-3xl mb-3">🏗️</div>
                <h3 className="font-semibold text-sm">{item}</h3>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= WHY CHOOSE ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
        {/* Bagian Teks & Fitur */}
        <div>
          <h2 className="text-4xl font-extrabold mb-6 text-blue-950">
            Mengapa Memilih Kami?
          </h2>
          <p className="text-gray-600 mb-10 text-lg">
            Kami memberikan solusi konstruksi dengan dedikasi tinggi untuk memastikan setiap proyek memberikan hasil maksimal.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: 'Kualitas Terjamin', desc: 'Standar konstruksi tinggi dengan material pilihan.', icon: <ShieldCheck className="w-6 h-6 text-yellow-500" /> },
              { title: 'Tepat Waktu', desc: 'Pengerjaan efisien sesuai dengan timeline yang disepakati.', icon: <Clock className="w-6 h-6 text-yellow-500" /> },
              { title: 'Tim Profesional', desc: 'Didukung oleh tenaga ahli yang berpengalaman di bidangnya.', icon: <Users className="w-6 h-6 text-yellow-500" /> },
              { title: 'Konsultasi', desc: 'Pendampingan proyek penuh dari awal hingga selesai.', icon: <MessageSquareText className="w-6 h-6 text-yellow-500" /> },
            ].map((item, index) => (
              <div key={index} className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4">{item.icon}</div>
                <h4 className="font-bold text-lg mb-1 text-blue-950">{item.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bagian Gambar */}
        <div className="relative">
          <div className="absolute -top-6 -left-6 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <img
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5"
            alt="Construction site"
            className="relative rounded-3xl shadow-2xl h-[500px] w-full object-cover"
          />
        </div>
      </section>

      {/* ================= PARTNER ================= */}
      <section className="py-10 border-t border-b bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          
          <h3 className="text-xl font-bold mb-8">Mitra Kami</h3>

          <div className="flex flex-wrap justify-center items-center gap-12 opacity-70">
            {[
              "https://upload.wikimedia.org/wikipedia/id/thumb/7/73/Waskita_Karya.svg/1280px-Waskita_Karya.svg.png",
              "https://upload.wikimedia.org/wikipedia/id/thumb/7/79/Adhi_Karya.svg/1280px-Adhi_Karya.svg.png",
              "https://upload.wikimedia.org/wikipedia/id/thumb/c/cc/PT_PP_logo.svg/1280px-PT_PP_logo.svg.png",
              "https://vectorseek.com/wp-content/uploads/2023/07/Jaya-Konstruksi-Logo-Vector.svg-.png",
              "https://upload.wikimedia.org/wikipedia/id/b/b1/Logo_Nindya_HR_MOD-01.png"
            ].map((logo, index) => (
              <img 
                key={index}
                src={logo} 
                alt={`Mitra ${index + 1}`} 
                className="h-12 w-auto object-contain hover:opacity-100 transition duration-300"
              />
            ))}
          </div>

        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        {/* Container utama dengan grid untuk membagi teks dan gambar */}
        <div className="bg-blue-950 text-white rounded-3xl flex flex-col md:flex-row items-stretch overflow-hidden">
          
          {/* Bagian Teks (Kiri) */}
          <div className="p-10 md:p-16 md:w-1/2 flex flex-col justify-center items-start">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Siap Mewujudkan Proyek Anda Bersama Kami?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-md">
              PT Anugrah Guna Semesta menjadi mitra strategis dalam mewujudkan proyek konstruksi Anda dengan kualitas terbaik.
            </p>
            <button className="bg-yellow-400 text-black px-8 py-4 rounded-lg font-bold hover:bg-yellow-300 transition flex items-center gap-2">
              Hubungi Kami &rarr;
            </button>
          </div>

          {/* Bagian Gambar (Kanan) */}
          <div className="w-full md:w-1/2 min-h-[300px]">
            <img 
              src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5" 
              alt="Construction Site" 
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </section>
      
    </LandingLayout>
  );
}