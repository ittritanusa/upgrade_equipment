import React from 'react';
import LandingLayout from '@/Pages/Layouts/LandingLayout';

export default function AboutUsPage() {
  return (
    <LandingLayout>
      {/* ================= HERO HEADER ================= */}
      <header className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center scale-105" 
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1504307651254-35680f356dfd)` }}
        />
        <div className="absolute inset-0 bg-blue-950/80" />
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Membangun Masa Depan, <br/> 
            <span className="text-yellow-400">Mewujudkan Prestige</span>
          </h1>
          <div className="w-20 h-1.5 bg-yellow-400 mx-auto mb-6"></div>
          <p className="text-lg text-gray-200 font-light italic">
            "Dedikasi tanpa kompromi untuk kualitas konstruksi yang melampaui standar industri."
          </p>
        </div>
      </header>

      {/* ================= STORY & VISION ================= */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-20 items-center">
        <div className="relative">
          <div className="absolute -left-4 top-0 w-2 h-full bg-blue-900"></div>
          <h2 className="text-4xl font-bold text-blue-950 mb-8 leading-tight">
            Filosofi Kami dalam Setiap<br/>Material dan Struktur
          </h2>
          <div className="space-y-6 text-gray-600 text-lg">
            <p className="leading-relaxed">
              Di <strong>PT Anugrah Guna Semesta</strong>, kami percaya bahwa konstruksi adalah seni teknik. Setiap proyek yang kami tangani mencerminkan komitmen terhadap presisi, efisiensi, dan estetika arsitektural.
            </p>
            <p className="leading-relaxed">
              Kami menggabungkan metode konstruksi mutakhir dengan manajemen sumber daya yang cerdas, memastikan setiap bangunan tidak hanya berdiri kokoh, tetapi juga memberikan nilai ekonomi jangka panjang bagi klien.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <img src="https://images.unsplash.com/photo-1487958449943-2429e8be8625" className="rounded-sm shadow-2xl h-96 w-full object-cover" />
          <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5" className="rounded-sm shadow-2xl h-96 w-full object-cover mt-12" />
        </div>
      </section>

      {/* ================= CORE VALUES (Modern Cards) ================= */}
      <section className="bg-blue-950 py-24 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Prinsip Utama Perusahaan</h2>
            <div className="h-1 w-24 bg-yellow-400 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Integritas Absolut', desc: 'Kepercayaan klien adalah aset kami yang paling berharga. Transparansi adalah standar kerja kami.' },
              { title: 'Inovasi Teknik', desc: 'Kami terus mengadopsi teknologi konstruksi terbaru untuk memastikan efisiensi dan keamanan tinggi.' },
              { title: 'Keunggulan Operasional', desc: 'Ketepatan waktu dan hasil akhir yang sempurna adalah cerminan dari profesionalisme tim kami.' }
            ].map((item, idx) => (
              <div key={idx} className="group p-10 border border-white/10 hover:bg-white hover:text-blue-950 transition-all duration-500">
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="leading-relaxed opacity-80 group-hover:opacity-100">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA / FINAL STATEMENT ================= */}
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