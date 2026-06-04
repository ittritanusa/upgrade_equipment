import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/Utils/Contexts/AuthContext'; // Pastikan path ini benar

const NotFoundPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Fungsi navigasi dinamis
  const handleGoHome = () => {
    if (isAuthenticated) {
      navigate('/portal/dashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 px-6 py-12 text-center overflow-hidden">
      {/* Animasi Ikon Konstruksi */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <motion.div 
          animate={{ rotate: [0, -5, 5, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-yellow-500 text-8xl"
        >
          🚧
        </motion.div>
      </motion.div>

      {/* Kode Error */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-[10rem] md:text-[12rem] font-black text-white tracking-tighter">
          4<span className="text-yellow-500">0</span>4
        </h1>
        
        <div className="bg-yellow-500 text-slate-900 px-6 py-2 font-black uppercase tracking-widest inline-block skew-x-[-10deg]">
          Oops! Sepertinya Anda tersesat.
        </div>
      </motion.div>
      
      {/* Pesan */}
      <div className="mt-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white">Halaman yang Anda cari tidak ada atau telah dipindahkan.</h2>
        <p className="mt-4 text-slate-400 text-lg max-w-sm mx-auto">
          "Pondasi" halaman ini sepertinya belum tersedia. Silakan kembali ke halaman utama kami.
        </p>
      </div>

      {/* Tombol Aksi */}
      <div className="mt-10 flex gap-4">
        <motion.button
          whileHover={{ x: -5 }}
          onClick={() => navigate(-1)}
          className="px-8 py-3 border-2 border-slate-700 hover:border-yellow-500 text-white font-bold rounded-none uppercase transition-all"
        >
          Kembali
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={handleGoHome}
          className="px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-black rounded-none uppercase shadow-[5px_5px_0px_0px_rgba(255,255,255,0.1)] transition-all"
        >
          {isAuthenticated ? 'Ke Dashboard' : 'Ke Login'}
        </motion.button>
      </div>
    </div>
  );
};

export default NotFoundPage;