import React, { useState } from 'react';
import AuthLayout from '@/Pages/Layouts/AuthLayout';
import { useLoginForm } from './Hooks/useLoginForm';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function Login() {
    const { form, errors, isLoading, handleChange, handleSubmit } = useLoginForm();
    const [showPassword, setShowPassword] = useState(false);

    return (
        <AuthLayout>
            {/* CONTAINER UTAMA LAYAR PENUH */}
            <div className="fixed inset-0 w-full h-full flex bg-[#edf2f7] overflow-hidden">
                
                {/* SISI KIRI: GAMBAR LATAR BELAKANG PROYEK (Mengambil 55% Lebar Layar) */}
                <div className="hidden md:block md:w-[85%] h-full relative">
                    <img
                        src="/assets/img/bg_login.png" 
                        alt="Construction Crane Background"
                        className="w-full h-full object-cover"
                    />
                    {/* Efek kabut atmosfer tipis sesuai contoh gambar asli */}
                    <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]" />
                </div>

                {/* SISI KANAN: PANEL FORM LOGIN (Mengambil 45% Lebar Layar di Desktop) */}
                <div className="w-full md:w-[45%] h-full bg-white md:rounded-l-[45px] flex flex-col justify-between p-8 lg:p-14 xl:p-20 relative shadow-2xl z-10 overflow-y-auto">
                    
                    {/* Spacer Atas untuk menjaga keseimbangan posisi vertikal */}
                    <div className="hidden md:block h-4" />

                    {/* AREA KONTEN UTAMA FORM */}
                    <div className="w-full max-w-sm mx-auto space-y-8 my-auto">
                        
                        {/* LOGO & SALAM */}
                        <div className="flex flex-col items-center justify-center text-center space-y-4">
                            <img
                                src="/assets/img/logo_tirta_group.png"
                                alt="AGS Logo"
                                className="h-20 lg:h-24 object-contain"
                            />
                            <div className="space-y-1">
                                <h1 className="text-xl lg:text-2xl font-bold text-gray-900 tracking-tight">
                                    Selamat Datang Kembali!
                                </h1>
                                <p className="text-xs lg:text-sm text-gray-500 font-medium">
                                    Silahkan Masukan Username dan Password!
                                </p>
                            </div>
                        </div>

                        {/* INPUT FORM UTAMA */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            
                            {/* FIELD INPUT USERNAME */}
                            <div className="space-y-1.5">
                                <label className="block text-xs font-semibold text-gray-700">
                                    Username
                                </label>
                                <div className="relative flex items-center">
                                    <span className="absolute left-4 text-gray-400">
                                        <Mail size={16} />
                                    </span>
                                    <input
                                        type="text"
                                        name="username"
                                        value={form.username}
                                        onChange={handleChange}
                                        className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-800 text-xs font-medium placeholder-gray-400 focus:outline-none focus:border-[#0a3a58] focus:ring-1 focus:ring-[#0a3a58] transition-all shadow-sm"
                                        placeholder="Silahkan Masukan Username Anda"
                                        disabled={isLoading}
                                    />
                                </div>
                                {errors.username && (
                                    <p className="text-red-500 text-[11px] mt-1 pl-1">{errors.username}</p>
                                )}
                            </div>

                            {/* FIELD INPUT PASSWORD */}
                            <div className="space-y-1.5">
                                <label className="block text-xs font-semibold text-gray-700">
                                    Password
                                </label>
                                <div className="relative flex items-center">
                                    <span className="absolute left-4 text-gray-400">
                                        <Lock size={16} />
                                    </span>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        className="w-full pl-11 pr-12 py-3 border border-gray-200 rounded-xl bg-white text-gray-800 text-xs font-medium placeholder-gray-400 focus:outline-none focus:border-[#0a3a58] focus:ring-1 focus:ring-[#0a3a58] transition-all shadow-sm"
                                        placeholder="Silahkan Masukan Kata Sandi Anda"
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-red-500 text-[11px] mt-1 pl-1">{errors.password}</p>
                                )}
                            </div>

                            {/* ERROR VALIDASI UMUM */}
                            {errors.general && (
                                <p className="text-red-500 text-xs text-center font-medium bg-red-50 p-2.5 rounded-lg border border-red-100">
                                    {errors.general}
                                </p>
                            )}

                            {/* TOMBOL AKSI LOGIN */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3 px-4 mt-2 bg-[#0a3a58] hover:bg-[#072d45] text-white rounded-xl text-xs font-bold tracking-wider transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'MEMPROSES...' : 'LOGIN'}
                            </button>
                        </form>
                    </div>

                    {/* HAK CIPTA DI BAGIAN BAWAH KANAN */}
                    <div className="text-center text-[10px] text-gray-400 font-medium pt-8">
                        Powered By IT TIRTA Group. All rights reserved. Version 01.24-01
                    </div>
                </div>

            </div>
        </AuthLayout>
    );
}