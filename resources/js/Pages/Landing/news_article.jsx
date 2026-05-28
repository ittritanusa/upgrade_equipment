import React from 'react';
import LandingLayout from '@/Pages/Layouts/LandingLayout';

export default function NewsPage() {
  const articles = [
    {
      title: "Inovasi Material Ramah Lingkungan dalam Proyek Konstruksi Modern",
      excerpt: "Mengeksplorasi bagaimana penggunaan material berkelanjutan menjadi standar baru dalam industri infrastruktur Indonesia...",
      date: "25 Mei 2026",
      category: "Teknologi",
      img: "https://images.unsplash.com/photo-1518770660439-4636190af475"
    },
    {
      title: "Strategi Manajemen Proyek agar Selesai Tepat Waktu",
      excerpt: "Tips dan trik dari tim ahli kami untuk mengoptimalkan alur kerja konstruksi skala besar agar tetap efisien...",
      date: "18 Mei 2026",
      category: "Manajemen",
      img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5"
    },
    {
      title: "Pentingnya Standar Keselamatan Kerja di Lokasi Proyek",
      excerpt: "Mengenal protokol K3 (Kesehatan dan Keselamatan Kerja) sebagai prioritas utama dalam operasional PT Anugrah Guna Semesta...",
      date: "10 Mei 2026",
      category: "Keselamatan",
      img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd"
    }
  ];

  return (
    <LandingLayout>
      {/* ================= HEADER ================= */}
      <header className="py-24 bg-blue-950 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-extrabold mb-6 tracking-tight">Wawasan & Berita</h1>
          <p className="text-xl text-gray-300 font-light">
            Temukan pemikiran terbaru, tren industri, dan informasi terkini mengenai dunia konstruksi profesional.
          </p>
        </div>
      </header>

      {/* ================= ARTICLE FEED ================= */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
          {articles.map((article, index) => (
            <article key={index} className="flex flex-col group cursor-pointer">
              {/* Image Container */}
              <div className="overflow-hidden mb-6 h-64">
                <img 
                  src={article.img} 
                  alt={article.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              
              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4 text-xs font-bold uppercase tracking-widest text-yellow-500">
                  <span>{article.category}</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-400">{article.date}</span>
                </div>
                <h3 className="text-2xl font-bold text-blue-950 leading-snug group-hover:text-blue-800 transition-colors">
                  {article.title}
                </h3>
                <p className="mt-4 text-gray-600 leading-relaxed mb-6">
                  {article.excerpt}
                </p>
                <button className="text-blue-900 font-bold border-b-2 border-blue-900 pb-1">
                  Baca Selengkapnya
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ================= NEWSLETTER ================= */}
      <section className="py-20 bg-gray-50 border-y">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-blue-950 mb-6">Dapatkan Insight Konstruksi Eksklusif</h2>
          <p className="text-gray-600 mb-8">Berlangganan newsletter kami untuk mendapatkan update terbaru langsung ke email Anda.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input 
              type="email" 
              placeholder="Masukkan alamat email Anda" 
              className="px-6 py-4 border border-gray-300 outline-none focus:border-blue-900 w-full sm:w-80"
            />
            <button className="bg-blue-900 text-white px-8 py-4 font-bold hover:bg-blue-800 transition">
              Berlangganan
            </button>
          </div>
        </div>
      </section>
    </LandingLayout>
  );
}