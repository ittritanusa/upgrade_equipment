import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';

import {
    ArrowLeft,
    Save,
    Scale,
    Info,
    AlertTriangle
} from 'lucide-react';

export default function EditUnitOfMeasurement() {
    const navigate = useNavigate();
    const { id } = useParams();

    // ==========================================
    // STATE FORM DATA SATUAN (PRE-FILLED MOCK DATA)
    // ==========================================
    const [formData, setFormData] = useState({
        lambang: 'Pcs',
        namaSatuan: 'Pieces',
        tipe: 'Kuantitas',
        keterangan: 'Satuan unit terkecil untuk hitungan tunggal barang/material elektrikal dan IT.'
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

        if (!formData.namaSatuan) {
            return alert('Mohon lengkapi data Nama Satuan!');
        }

        console.log('Update Satuan UOM ID:', id, formData);
        alert('Perubahan parameter satuan (UOM) berhasil disimpan!');
        
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
                            Ubah Parameter Satuan (UOM)
                        </h1>
                        <div className="flex items-center gap-2 mt-1 text-sm">
                            <span className="text-gray-400">Inventory & Warehouse</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-gray-400">Konfigurasi</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-blue-600 font-medium">Edit {formData.lambang}</span>
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

                {/* WARNING BOARD PERUBAHAN PARAMETER */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 text-amber-800 shadow-sm text-xs">
                    <AlertTriangle size={16} className="text-amber-600 mt-0.5 flex-shrink-0" />
                    <div>
                        <span className="font-bold text-amber-900 block mb-0.5">Dampak Perubahan Parameter:</span>
                        <p className="leading-relaxed font-medium text-amber-700">
                            Perubahan pada <strong>Nama Satuan</strong> atau <strong>Dimensi Tipe</strong> akan langsung merefleksikan seluruh item SKU aktif yang terikat. Lambang unit telah dikunci otomatis oleh sistem untuk menghindari kerusakan kalkulasi riwayat transaksi pada kartu stok digital.
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
                            {/* Input Lambang Unit (Sistem Lock / Readonly) */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wide text-gray-400 mb-2">
                                    Lambang Unit (Locked)
                                </label>
                                <input
                                    type="text"
                                    name="lambang"
                                    readOnly
                                    value={formData.lambang}
                                    className="w-full h-11 rounded-lg border border-gray-200 px-4 text-sm font-mono font-black bg-gray-50 text-gray-400 cursor-not-allowed uppercase"
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
                                    placeholder="Contoh: Pieces / Kotak Kartus"
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
                            <Save size={16} /> Simpan Perubahan Satuan
                        </button>
                    </div>
                </form>

            </div>
        </PortalLayout>
    );
}