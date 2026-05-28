import React from 'react';
import LandingLayout from '@/Pages/Layouts/LandingLayout';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
  return (
    <LandingLayout>
      {/* ================= HEADER ================= */}
      <header className="py-24 bg-gray-50 text-center border-b">
        <h1 className="text-5xl font-extrabold text-blue-950 mb-6">Hubungi Kami</h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Kami siap membantu merealisasikan proyek konstruksi Anda. Diskusikan kebutuhan Anda dengan tim ahli kami hari ini.
        </p>
      </header>

      {/* ================= CONTACT SECTION ================= */}
      <section className="py-24 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20">
        
        {/* Info Kontak */}
        <div className="space-y-12">
          <h2 className="text-3xl font-bold text-blue-950">Informasi Kantor</h2>
          
          <div className="space-y-8">
            {[
              { icon: <MapPin />, title: "Lokasi", info: "Bintaro Tride Center, Ruko Lantai Dasar Blok C2-18 Jalan Jendral Sudirman. Kota Tangerang Selatan" },
              { icon: <Phone />, title: "Telepon", info: "(021) 555-0123" },
              { icon: <Mail />, title: "Email", info: "info@anugrahgunasemesta.co.id" },
              { icon: <Clock />, title: "Jam Kerja", info: "Senin - Jumat: 08:00 - 17:00" }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-6">
                <div className="text-yellow-500 mt-1">{item.icon}</div>
                <div>
                  <h4 className="font-bold text-blue-950">{item.title}</h4>
                  <p className="text-gray-600">{item.info}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Formulir Kontak */}
        <div className="bg-white p-10 border border-gray-100 shadow-xl">
          <h2 className="text-2xl font-bold text-blue-950 mb-8">Kirim Pesan</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <input type="text" placeholder="Nama Lengkap" className="w-full p-4 border border-gray-200 outline-none focus:border-blue-900 transition" />
              <input type="email" placeholder="Email" className="w-full p-4 border border-gray-200 outline-none focus:border-blue-900 transition" />
            </div>
            <input type="text" placeholder="Subjek Proyek" className="w-full p-4 border border-gray-200 outline-none focus:border-blue-900 transition" />
            <textarea placeholder="Ceritakan detail kebutuhan Anda..." className="w-full p-4 border border-gray-200 outline-none focus:border-blue-900 transition h-40"></textarea>
            
            <button className="w-full bg-blue-900 text-white py-4 font-bold uppercase tracking-widest hover:bg-yellow-500 hover:text-black transition-all">
              Kirim Pesan
            </button>
          </form>
        </div>
      </section>

      {/* ================= MAP PLACEHOLDER ================= */}
      <section className="h-96 w-full bg-gray-200 flex items-center justify-center border-t">
        <div className="text-gray-500 font-semibold uppercase tracking-widest">
          [Integrasi Google Maps / Peta Lokasi Kantor]
        </div>
      </section>
    </LandingLayout>
  );
}