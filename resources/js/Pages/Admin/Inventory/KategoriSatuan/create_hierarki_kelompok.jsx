import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';

import {
    ArrowLeft,
    Save,
    FolderTree,
    Tag,
    Info,
    HelpCircle,
    CheckCircle2
} from 'lucide-react';

export default function CreateCategoryHierarchy() {
    const navigate = useNavigate();

    // ==========================================
    // STATE FORM DATA KATEGORI BARU
    // ==========================================
    const [formData, setFormData] = useState({
        kodeKategori: '',
        namaKategori: '',
        isSubCategory: false,
        parentCategoryId: '',
        status: 'Aktif',
        deskripsi: ''
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validasi Sederhana
        if (!formData.kodeKategori || !formData.namaKategori) {
            return alert('Mohon isi Kode Kategori dan Nama Kategori!');
        }

        if (formData.isSubCategory && !formData.parentCategoryId) {
            return alert('Mohon pilih Induk Kategori jika ini merupakan Sub-Kategori!');
        }

        console.log('Kategori Baru Berhasil Dibuat:', formData);
        alert('Kategori Kelompok Baru Berhasil Ditambahkan!');
        navigate('/portal/inventory/configurations/categories-units'); // Kembali ke halaman utama konfigurasi
    };

    return (
        <PortalLayout>
            <div className="space-y-6">
                
                {/* 1. HEADER HALAMAN & UTILITY BUTTON */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Tambah Kategori Kelompok Baru
                        </h1>
                        <div className="flex items-center gap-2 mt-1 text-sm">
                            <span className="text-gray-400">Inventory & Warehouse</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-gray-400">Konfigurasi</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-blue-600 font-medium">Tambah Kategori</span>
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

                {/* BOARD INFORMASI TEKNIS */}
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3 text-blue-700 shadow-sm text-xs">
                    <Info size={16} className="mt-0.5 flex-shrink-0" />
                    <div>
                        <span className="font-bold block mb-0.5">Aturan Penamaan Kode Kategori:</span>
                        <p className="leading-relaxed text-blue-600 font-medium">
                            Gunakan prefix standar yang seragam (Contoh: <span className="font-mono font-bold text-gray-900 bg-white/60 px-1 rounded">CAT-IT</span> atau <span className="font-mono font-bold text-gray-900 bg-white/60 px-1 rounded">CAT-GA</span>) untuk mempermudah pemetaan laporan analitik dan *filtering* aset pada modul pencarian barang di gudang utama.
                        </p>
                    </div>
                </div>

                {/* 2. FORM UTAMA ENTRY KATEGORI (Lebar Penuh / Full-Width) */}
                <form onSubmit={handleSubmit} className="space-y-6 w-full">
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-5">
                        
                        <h3 className="text-sm font-bold text-gray-800 border-b border-gray-100 pb-2.5 flex items-center gap-2">
                            <FolderTree size={16} className="text-blue-600" /> Parameter Struktur Kategori
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {/* Input Kode Kategori */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wide text-gray-600 mb-2">
                                    Kode Kategori <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="kodeKategori"
                                    required
                                    value={formData.kodeKategori}
                                    onChange={handleInputChange}
                                    placeholder="Contoh: CAT-IT"
                                    className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm font-mono font-bold uppercase outline-none focus:border-blue-500 transition"
                                />
                            </div>

                            {/* Input Nama Kategori */}
                            <div className="sm:col-span-2">
                                <label className="block text-xs font-bold uppercase tracking-wide text-gray-600 mb-2">
                                    Nama Kelompok Kategori <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="namaKategori"
                                    required
                                    value={formData.namaKategori}
                                    onChange={handleInputChange}
                                    placeholder="Contoh: Perangkat Jaringan & Server"
                                    className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm font-medium outline-none focus:border-blue-500 transition"
                                />
                            </div>
                        </div>

                        {/* Opsi Struktur Hierarki (Checkbox Sub-Kategori) */}
                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-4">
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="isSubCategory"
                                    name="isSubCategory"
                                    checked={formData.isSubCategory}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                                />
                                <label htmlFor="isSubCategory" className="text-xs font-bold text-gray-700 uppercase tracking-tight cursor-pointer selection:bg-transparent">
                                    Jadikan ini sebagai Sub-Kategori (Turunan Beranak)
                                </label>
                            </div>

                            {/* Dropdown Pilihan Parent (Hanya aktif jika checkbox dicentang) */}
                            {formData.isSubCategory && (
                                <div className="animate-fade-in space-y-1.5 pl-7">
                                    <label className="block text-xs font-semibold text-gray-500">
                                        Pilih Induk (Parent Category) <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="parentCategoryId"
                                        value={formData.parentCategoryId}
                                        onChange={handleInputChange}
                                        className="w-full md:w-80 h-10 px-3 border border-gray-300 rounded-lg text-xs bg-white outline-none focus:border-blue-500"
                                    >
                                        <option value="">-- Pilih Induk Kategori --</option>
                                        <option value="1">Teknologi Informasi (CAT-IT)</option>
                                        <option value="2">GA & GA Logistik (CAT-GA)</option>
                                        <option value="3">Elektrikal & Mekanikal (CAT-ME)</option>
                                    </select>
                                </div>
                            )}
                        </div>

                        {/* Input Deskripsi Tambahan */}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wide text-gray-600 mb-2">Deskripsi / Ruang Lingkup Kategori</label>
                            <textarea
                                name="deskripsi"
                                rows="3"
                                value={formData.deskripsi}
                                onChange={handleInputChange}
                                placeholder="Jelaskan jenis-jenis barang atau material apa saja yang termasuk di dalam kelompok klasifikasi kategori ini..."
                                className="w-full rounded-lg border border-gray-300 p-4 text-sm outline-none focus:border-blue-500 transition resize-none font-medium text-gray-700"
                            ></textarea>
                        </div>

                        {/* Input Status Aktif */}
                        <div className="w-55">
                            <label className="block text-xs font-bold uppercase tracking-wide text-gray-600 mb-2">Status Aktivasi</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleInputChange}
                                className="w-full h-11 px-3 border border-gray-300 rounded-lg text-sm bg-white outline-none focus:border-blue-500"
                            >
                                <option value="Aktif">Aktif (Dapat Digunakan)</option>
                                <option value="Non-Aktif">Non-Aktif (Diarsipkan)</option>
                            </select>
                        </div>

                    </div>

                    {/* Tombol Aksi Bawah */}
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
                            className="h-10 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold inline-flex items-center gap-2 transition shadow-md shadow-blue-100"
                        >
                            <Save size={16} /> Simpan Struktur Kategori
                        </button>
                    </div>
                </form>

            </div>
        </PortalLayout>
    );
}