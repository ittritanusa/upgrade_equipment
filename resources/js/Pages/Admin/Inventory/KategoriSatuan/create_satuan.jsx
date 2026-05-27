import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';

import {
    ArrowLeft,
    Save,
    Scale,
    Info,
    HelpCircle
} from 'lucide-react';

export default function CreateUnitOfMeasurement() {
    const navigate = useNavigate();

    // ==========================================
    // STATE FORM DATA SATUAN (UOM) BARU
    // ==========================================
    const [formData, setFormData] = useState({
        lambang: '',       // Contoh: Pcs, Box, Kg
        namaSatuan: '',    // Contoh: Pieces, Kilogram
        tipe: 'Kuantitas', // Pilihan default tipe dimensi
        keterangan: ''     // Catatan kegunaan satuan
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validasi input wajib
        if (!formData.lambang || !formData.namaSatuan) {
            return alert('Mohon lengkapi data Lambang Unit dan Nama Satuan!');
        }

        console.log('Satuan UOM Baru Berhasil Dibuat:', formData);
        alert('Satuan Ukur (UOM) Baru Berhasil Ditambahkan!');
        
        // Kembali ke halaman utama konfigurasi kategori dan satuan
        navigate('/portal/inventory/configurations/categories-units'); 
    };

    return (
        <PortalLayout>
            <div className="space-y-6">
                
                {/* 1. HEADER HALAMAN & NAVIGATION */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Tambah Satuan Ukur Baru (UOM)
                        </h1>
                        <div className="flex items-center gap-2 mt-1 text-sm">
                            <span className="text-gray-400">Inventory & Warehouse</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-gray-400">Konfigurasi</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-blue-600 font-medium">Tambah Satuan</span>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 h-10 px-4 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium bg-white hover:bg-gray-50 transition self-start sm:self-auto"
                    >
                        <ArrowLeft size={16} />
                        Kembali
                    </button>
                </div>

                {/* BOARD PANDUAN PENGISIAN */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-start gap-3 text-gray-600 shadow-sm text-xs">
                    <Info size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                        <span className="font-bold text-gray-800 block mb-0.5">Standarisasi Pengisian Unit of Measurement:</span>
                        <p className="leading-relaxed font-medium">
                            Kolom <strong>Lambang Unit</strong> akan digunakan sebagai label kuantitas ringkas di dalam Nota PO, Surat Jalan, dan Kartu Stok (Contoh penulisan singkat: <span className="font-mono bg-white border px-1 rounded text-gray-900 font-bold">Pcs</span>, <span className="font-mono bg-white border px-1 rounded text-gray-900 font-bold">Box</span>, <span className="font-mono bg-white border px-1 rounded text-gray-900 font-bold">Kg</span>).
                        </p>
                    </div>
                </div>

                {/* 2. FORM UTAMA ENTRY SATUAN (Full-Width / col-lg-12) */}
                <form onSubmit={handleSubmit} className="space-y-6 w-full">
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-5">
                        
                        <h3 className="text-sm font-bold text-gray-800 border-b border-gray-100 pb-2.5 flex items-center gap-2">
                            <Scale size={16} className="text-blue-600" /> Spesifikasi Satuan Ukur
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {/* Input Lambang Unit */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wide text-gray-600 mb-2">
                                    Lambang Unit <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="lambang"
                                    required
                                    maxLength={10}
                                    value={formData.lambang}
                                    onChange={handleInputChange}
                                    placeholder="Pcs / Box / Kg"
                                    className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm font-mono font-black placeholder:font-sans placeholder:font-normal outline-none focus:border-blue-500 transition uppercase"
                                />
                            </div>

                            {/* Input Nama Lengkap Satuan */}
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold uppercase tracking-wide text-gray-600 mb-2">
                                    Nama Lengkap Satuan <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="namaSatuan"
                                    required
                                    value={formData.namaSatuan}
                                    onChange={handleInputChange}
                                    placeholder="Contoh: Pieces / Kotak Kartus / Kilogram"
                                    className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm font-medium outline-none focus:border-blue-500 transition"
                                />
                            </div>

                            {/* Dropdown Dimensi Tipe */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wide text-gray-600 mb-2">
                                    Dimensi Tipe
                                </label>
                                <select
                                    name="tipe"
                                    value={formData.tipe}
                                    onChange={handleInputChange}
                                    className="w-full h-11 px-3 border border-gray-300 rounded-lg text-sm bg-white font-medium outline-none focus:border-blue-500 transition"
                                >
                                    <option value="Kuantitas">Kuantitas (Hitungan Unit)</option>
                                    <option value="Kemasan">Kemasan (Paket/Volume Bulk)</option>
                                    <option value="Dimensi/Panjang">Dimensi / Panjang (Meter/Roll)</option>
                                    <option value="Berat">Berat (Massa/Mekanis)</option>
                                </select>
                            </div>
                        </div>

                        {/* Input Keterangan Definisi */}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wide text-gray-600 mb-2">
                                Keterangan / Deskripsi Penggunaan
                            </label>
                            <textarea
                                name="keterangan"
                                rows="3"
                                value={formData.keterangan}
                                onChange={handleInputChange}
                                placeholder="Tuliskan catatan tambahan mengenai standar rasio ukuran atau cakupan pemakaian jenis unit satuan ini..."
                                className="w-full rounded-lg border border-gray-300 p-4 text-sm outline-none focus:border-blue-500 transition resize-none font-medium text-gray-700"
                            ></textarea>
                        </div>

                    </div>

                    {/* Tombol Aksi Form */}
                    <div className="flex items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="h-10 px-5 rounded-lg border border-gray-300 text-sm font-semibold bg-white text-gray-600 hover:bg-gray-50 transition"
                        >
                            Batal
                        </button>
                        
                        <button
                            type="submit"
                            className="h-10 px-6 bg-gray-950 hover:bg-gray-800 text-white rounded-lg text-sm font-bold inline-flex items-center gap-2 transition shadow-md"
                        >
                            <Save size={16} /> Simpan Satuan Baru
                        </button>
                    </div>
                </form>

            </div>
        </PortalLayout>
    );
}