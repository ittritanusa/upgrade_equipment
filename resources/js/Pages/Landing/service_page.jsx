import React from 'react';
import LandingLayout from '@/Pages/Layouts/LandingLayout';
import { Building2, HardHat, DraftingCompass, Wrench, BarChart3 } from 'lucide-react';

export default function ServicesPage() {
  const services = [
    {
      icon: <Building2 className="w-10 h-10" />,
      title: "Konstruksi Gedung",
      desc: "Pembangunan gedung komersial, residensial, dan fasilitas umum dengan standar keamanan tertinggi dan estetika modern."
    },
    {
      icon: <HardHat className="w-10 h-10" />,
      title: "Infrastruktur",
      desc: "Pengembangan infrastruktur strategis yang dirancang untuk daya tahan jangka panjang dan efisiensi mobilitas."
    },
    {
      icon: <DraftingCompass className="w-10 h-10" />,
      title: "Engineering & Design",
      desc: "Perencanaan arsitektural dan teknis yang presisi, menggabungkan visi kreatif dengan kalkulasi struktural yang akurat."
    },
    {
      icon: <Wrench className="w-10 h-10" />,
      title: "Renovasi & Rehabilitasi",
      desc: "Restorasi struktur lama menjadi ruang modern yang fungsional dengan tetap mempertahankan integritas bangunan."
    },
    {
      icon: <BarChart3 className="w-10 h-10" />,
      title: "Manajemen Proyek",
      desc: "Pengawasan menyeluruh mulai dari perencanaan hingga serah terima, memastikan proyek selesai tepat waktu dan sesuai anggaran."
    }
  ];

  return (
    <LandingLayout>
      {/* ================= HEADER ================= */}
      <header className="relative py-24 bg-blue-950 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-extrabold mb-6 tracking-tight">Solusi Konstruksi <br/><span className="text-yellow-400">Terintegrasi & Premium</span></h1>
          <p className="text-xl text-gray-300 font-light">
            Kami menghadirkan keunggulan teknis untuk setiap tahapan proyek Anda, memberikan hasil akhir yang presisi, tahan lama, dan berkelas.
          </p>
        </div>
      </header>

      {/* ================= SERVICE GRID ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="group p-10 border border-gray-100 bg-gray-50 hover:bg-blue-900 hover:text-white transition-all duration-500 hover:shadow-2xl"
              >
                <div className="mb-8 text-yellow-500 group-hover:text-yellow-400 transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="leading-relaxed opacity-80 group-hover:opacity-100">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PROCESS SECTION ================= */}
      <section className="py-24 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-blue-950 mb-16 text-center">Metodologi Kerja Kami</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {['Konsultasi', 'Perencanaan', 'Eksekusi', 'Quality Control'].map((step, i) => (
              <div key={i} className="text-center p-6 border-b-4 border-yellow-500 bg-white">
                <div className="text-3xl font-bold text-blue-900 mb-2">0{i + 1}</div>
                <div className="font-semibold text-lg">{step}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
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