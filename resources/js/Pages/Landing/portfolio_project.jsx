import React from 'react';
import LandingLayout from '@/Pages/Layouts/LandingLayout';

export default function ProjectsPage() {
  const projects = [
    { title: "Grand Office Tower", category: "Gedung Komersial", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab" },
    { title: "Skyline Residence", category: "Residensial", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00" },
    { title: "Jembatan Bahari", category: "Infrastruktur", img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df" },
    { title: "Green Eco Park", category: "Fasilitas Umum", img: "https://images.unsplash.com/photo-1518005020951-ecc89445a423" },
    { title: "Modern Hospital Hub", category: "Kesehatan", img: "https://images.unsplash.com/photo-1587370760527-3a17e0409095" },
    { title: "Urban Plaza Mall", category: "Komersial", img: "https://images.unsplash.com/photo-1519741497674-611481863552" },
  ];

  return (
    <LandingLayout>
      {/* ================= HEADER ================= */}
      <header className="py-24 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-blue-900 font-bold tracking-widest uppercase text-sm">Portfolio Kami</span>
          <h1 className="text-5xl font-extrabold text-blue-950 mt-4 mb-6">Proyek Unggulan</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Rekam jejak kualitas kami dalam menciptakan struktur yang mengkombinasikan fungsionalitas, keamanan, dan keindahan arsitektural.
          </p>
        </div>
      </header>

      {/* ================= PROJECT GRID ================= */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="group relative overflow-hidden bg-white shadow-sm cursor-pointer">
              {/* Image with zoom effect */}
              <div className="overflow-hidden h-80">
                <img 
                  src={project.img} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              {/* Overlay Content */}
              <div className="p-8 border-x border-b border-gray-100">
                <span className="text-yellow-600 font-medium text-sm tracking-tighter uppercase">
                  {project.category}
                </span>
                <h3 className="text-2xl font-bold text-blue-950 mt-2">
                  {project.title}
                </h3>
                <div className="mt-4 flex items-center text-blue-900 font-semibold group-hover:gap-2 transition-all">
                  Lihat Detail <span className="ml-1">&rarr;</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= STATISTIC / TRUST BAR ================= */}
      <section className="bg-blue-950 py-16 text-white text-center">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { label: "Proyek Selesai", value: "150+" },
            { label: "Klien Puas", value: "85+" },
            { label: "Tahun Pengalaman", value: "10+" },
            { label: "Penghargaan", value: "12" }
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-4xl font-extrabold text-yellow-400 mb-2">{stat.value}</div>
              <div className="uppercase tracking-widest text-xs opacity-70">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-24 text-center">
        <h2 className="text-3xl font-bold text-blue-950 mb-8">Ingin Proyek Anda Menjadi Bagian dari Portfolio Kami?</h2>
        <button className="border-2 border-blue-900 text-blue-900 px-10 py-4 font-bold uppercase tracking-widest hover:bg-blue-900 hover:text-white transition-all">
          Diskusikan Proyek Anda
        </button>
      </section>
    </LandingLayout>
  );
}