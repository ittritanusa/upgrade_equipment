import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';

import {
    ArrowLeft,
    Save,
    FolderTree,
    Info,
    History,
    RefreshCw,
    X,
    User,
    Calendar,
    ToggleLeft,
    ToggleRight
} from 'lucide-react';

export default function EditCategoryHierarchy() {
    const navigate = useNavigate();
    const { id } = useParams();

    // Kontrol State untuk Popup/Modal Histori Perubahan Kategori
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);

    // ==========================================
    // STATE FORM DATA (PRE-FILLED MOCK DATA)
    // ==========================================
    const [formData, setFormData] = useState({
        kodeKategori: 'CAT-IT-NET',
        namaKategori: 'Perangkat Jaringan & Server',
        isSubCategory: true,
        parentCategoryId: '1', // Taut ke 'Teknologi Informasi'
        status: 'Aktif',
        deskripsi: 'Khusus untuk menampung material infrastruktur IT seperti Router, Switch, UPS, Rak Server, dan perkabelan FO.',
        lastUpdated: '26/05/2026 10:15 oleh Super Admin'
    });

    // Simulasi Data Log Audit Trail Khusus Kategori Ini
    const [auditLogs] = useState([
        { id: 1, tanggal: '26/05/2026 10:15', user: 'Andi Wijaya (Super Admin)', aksi: 'Mengubah Deskripsi ruang lingkup kategori agar lebih spesifik ke infrastruktur.' },
        { id: 2, tanggal: '15/05/2026 14:00', user: 'Rian Hidayat (Admin Gudang)', aksi: 'Mengubah struktur dari kategori utama menjadi Sub-Kategori di bawah CAT-IT.' },
        { id: 3, tanggal: '10/04/2026 08:00', user: 'System (System Initial)', aksi: 'Registrasi data awal kategori (Struktur Terbuat).' }
    ]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const toggleStatus = () => {
        setFormData(prev => ({
            ...prev,
            status: prev.status === 'Aktif' ? 'Non-Aktif' : 'Aktif'
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (formData.isSubCategory && !formData.parentCategoryId) {
            return alert('Mohon pilih Induk Kategori jika statusnya adalah Sub-Kategori!');
        }

        console.log('Update Kategori ID:', id, formData);
        alert('Perubahan struktur hierarki kategori berhasil disimpan!');
        navigate('/portal/inventory/configurations/categories-units');
    };

    return (
        <PortalLayout>
            <div className="space-y-6">
                
                {/* 1. HEADER HALAMAN & UTILITY BUTTON */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Edit Kategori Kelompok
                        </h1>
                        <div className="flex items-center gap-2 mt-1 text-sm">
                            <span className="text-gray-400">Inventory & Warehouse</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-gray-400">Konfigurasi</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-blue-600 font-medium">{formData.kodeKategori}</span>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 h-10 px-4 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium bg-white hover:bg-gray-50 transition self-start sm:self-auto"
                    >
                        <ArrowLeft size={16} /> Kembali
                    </button>
                </div>

                {/* BANNER REVISI TERAKHIR & TOMBOL LIHAT LOG POPUP */}
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-center justify-between text-blue-700 shadow-sm">
                    <div className="flex items-center gap-3">
                        <History size={18} />
                        <span className="text-xs font-medium">Perubahan konfigurasi terakhir pada: <strong>{formData.lastUpdated}</strong></span>
                    </div>
                    <button 
                        type="button"
                        onClick={() => setIsHistoryOpen(true)}
                        className="text-[10px] font-bold uppercase tracking-widest hover:underline flex items-center gap-1 bg-white border border-blue-200 px-3 py-1.5 rounded-lg shadow-sm text-blue-600 hover:bg-blue-50 transition"
                    >
                        <RefreshCw size={10} /> Lihat Log Histori
                    </button>
                </div>

                {/* 2. FORM UTAMA ENTRY KATEGORI (Lebar Penuh / col-lg-12) */}
                <form onSubmit={handleSubmit} className="space-y-6 w-full">
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-5">
                        
                        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                            <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                                <FolderTree size={16} className="text-blue-600" /> Parameter Struktur Kategori
                            </h3>
                            
                            {/* Toggle Status Aktif Komponen */}
                            <div className="flex items-center gap-3 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
                                <span className={`text-[11px] font-bold uppercase tracking-tight ${formData.status === 'Aktif' ? 'text-emerald-600' : 'text-gray-400'}`}>
                                    Status: {formData.status}
                                </span>
                                <button type="button" onClick={toggleStatus} className="focus:outline-none">
                                    {formData.status === 'Aktif' ? (
                                        <ToggleRight size={28} className="text-emerald-500" />
                                    ) : (
                                        <ToggleLeft size={28} className="text-gray-300" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {/* Input Kode Kategori (Readonly untuk menjaga konsistensi data relational) */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wide text-gray-400 mb-2">
                                    Kode Kategori (Sistem Lock)
                                </label>
                                <input
                                    type="text"
                                    name="kodeKategori"
                                    readOnly
                                    value={formData.kodeKategori}
                                    className="w-full h-11 rounded-lg border border-gray-200 px-4 text-sm font-mono font-bold bg-gray-50 text-gray-400 cursor-not-allowed uppercase"
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
                                placeholder="Jelaskan jenis-jenis barang atau material apa saja yang termasuk..."
                                className="w-full rounded-lg border border-gray-300 p-4 text-sm outline-none focus:border-blue-500 transition resize-none font-medium text-gray-700"
                            ></textarea>
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
                            <Save size={16} /> Simpan Perubahan Kategori
                        </button>
                    </div>
                </form>
            </div>

            {/* ==========================================
                MODAL/POPUP LOG HISTORI KATEGORI (AUDIT LOG)
               ========================================== */}
            {isHistoryOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-xl border border-gray-200 max-w-2xl w-full overflow-hidden">
                        
                        {/* Modal Header */}
                        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-gray-800">
                                <History size={18} className="text-blue-600" />
                                <h3 className="text-base font-bold">Audit Trail Perubahan Kategori</h3>
                            </div>
                            <button 
                                type="button" 
                                onClick={() => setIsHistoryOpen(false)}
                                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 max-h-[400px] overflow-y-auto space-y-4">
                            <div className="text-xs text-gray-400 font-mono mb-2 uppercase">KODE GRUP: {formData.kodeKategori}</div>
                            
                            <div className="flow-root">
                                <ul className="-mb-8">
                                    {auditLogs.map((log, logIdx) => (
                                        <li key={log.id}>
                                            <div className="relative pb-8">
                                                {logIdx !== auditLogs.length - 1 ? (
                                                    <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                                                ) : null}
                                                <div className="relative flex space-x-3 text-xs">
                                                    <div>
                                                        <span className="h-8 w-8 rounded-full bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center ring-8 ring-white">
                                                            <History size={14} />
                                                        </span>
                                                    </div>
                                                    <div className="flex-1 min-w-0 pt-1.5">
                                                        <div className="flex justify-between items-center gap-4 border-b border-gray-50 pb-1">
                                                            <div className="font-bold text-gray-900 inline-flex items-center gap-1">
                                                                <User size={12} className="text-gray-400" /> {log.user}
                                                            </div>
                                                            <div className="text-[11px] text-gray-400 inline-flex items-center gap-1 font-medium">
                                                                <Calendar size={11} /> {log.tanggal}
                                                            </div>
                                                        </div>
                                                        <p className="text-gray-600 mt-1.5 leading-relaxed bg-gray-50/50 p-2.5 rounded-lg border border-gray-100">
                                                            {log.aksi}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="bg-gray-50 border-t border-gray-200 px-6 py-3.5 flex justify-end">
                            <button
                                type="button"
                                onClick={() => setIsHistoryOpen(false)}
                                className="h-9 px-4 rounded-lg bg-gray-950 hover:bg-gray-800 text-white text-xs font-bold transition shadow-sm"
                            >
                                Tutup Log
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </PortalLayout>
    );
}