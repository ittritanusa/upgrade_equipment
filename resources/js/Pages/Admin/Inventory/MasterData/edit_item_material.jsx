import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';

import {
    Save,
    ArrowLeft,
    Tag,
    ShieldCheck,
    Warehouse,
    Info,
    AlertCircle,
    History,
    RefreshCw,
    ToggleLeft,
    ToggleRight,
    X,
    User,
    Calendar
} from 'lucide-react';

export default function EditMasterItemMaterial() {
    const navigate = useNavigate();
    const { id } = useParams();

    // Kontrol State untuk Popup/Modal Histori
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);

    // ==========================================
    // STATE FORM DATA (PRE-FILLED MOCK DATA)
    // ==========================================
    const [formData, setFormData] = useState({
        sku: 'SKU-IT-UPS-003',
        namaItem: 'UPS APC Smart-UPS 3000VA Rackmount',
        kategori: 'Teknologi Informasi',
        merek: 'APC by Schneider Electric',
        tipeInventaris: 'Asset',
        satuanBesar: 'Unit',
        minStok: 5,
        maxStok: 15,
        lokasiRak: 'Rak A-02',
        metodeValuasi: 'FIFO',
        catatanTeknis: 'Rackmount 2U, LCD 230V. Pastikan baterai diperiksa setiap 6 bulan sekali.',
        status: 'Aktif',
        lastUpdated: '20/05/2026 14:20 oleh Admin Warehouse'
    });

    // Simulasi Data Log Audit Trail Perubahan Parameter
    const [auditLogs] = useState([
        { id: 1, tanggal: '20/05/2026 14:20', user: 'Rian Hidayat (Admin)', aksi: 'Mengubah Lokasi Rak dari "Rak B-01" menjadi "Rak A-02"' },
        { id: 2, tanggal: '12/04/2026 09:15', user: 'Siti Rahma (Procurement)', aksi: 'Mengubah Batas Minimum (Reorder) dari 2 menjadi 5' },
        { id: 3, tanggal: '10/04/2026 08:00', user: 'System (CLC Gudang)', aksi: 'Registrasi Awal Katalog Item (Master Data Created)' }
    ]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const toggleStatus = () => {
        setFormData(prev => ({
            ...prev,
            status: prev.status === 'Aktif' ? 'Non-Aktif' : 'Aktif'
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Update Data Master Item ID:', id, formData);
        alert('Perubahan data item berhasil disimpan!');
        navigate('/portal/inventory/master-item');
    };

    return (
        <PortalLayout>
            <div className="space-y-6">
                
                {/* 1. HEADER HALAMAN & BREADCRUMBS */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Edit Item & Material
                        </h1>
                        <div className="flex items-center gap-2 mt-1 text-sm">
                            <span className="text-gray-400">Gudang & Logistik</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-gray-400">Master Data</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-blue-600 font-medium">Ubah Detail Item</span>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 h-10 px-4 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium bg-white hover:bg-gray-50 transition"
                    >
                        <ArrowLeft size={16} /> Kembali
                    </button>
                </div>

                {/* BANNER INFORMASI PERUBAHAN & TOMBOL TRIGGER MODAL */}
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-center justify-between text-blue-700 shadow-sm">
                    <div className="flex items-center gap-3">
                        <History size={18} />
                        <span className="text-xs font-medium">Perubahan terakhir pada: <strong>{formData.lastUpdated}</strong></span>
                    </div>
                    <button 
                        type="button"
                        onClick={() => setIsHistoryOpen(true)}
                        className="text-[10px] font-bold uppercase tracking-widest hover:underline flex items-center gap-1 bg-white border border-blue-200 px-3 py-1.5 rounded-lg shadow-sm text-blue-600 hover:bg-blue-50 transition"
                    >
                        <RefreshCw size={10} /> Lihat Log Histori
                    </button>
                </div>

                {/* 2. MAIN FORM ENTRY AREA */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Panel 1: Informasi Identitas */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                            <h3 className="text-base font-bold text-gray-800 flex items-center gap-2">
                                <Tag size={18} className="text-blue-600" /> Identifikasi Katalog Barang
                            </h3>
                            
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
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-1">
                                    Nomor SKU <AlertCircle size={12} />
                                </label>
                                <input
                                    type="text"
                                    value={formData.sku}
                                    readOnly
                                    className="w-full h-11 rounded-lg border border-gray-200 px-4 text-sm bg-gray-50 text-gray-400 font-mono font-bold cursor-not-allowed"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-600 mb-2">
                                    Nama Lengkap Item & Deskripsi <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="namaItem"
                                    required
                                    value={formData.namaItem}
                                    onChange={handleInputChange}
                                    className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm outline-none focus:border-blue-500 transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">Brand / Produsen</label>
                                <input
                                    type="text"
                                    name="merek"
                                    value={formData.merek}
                                    onChange={handleInputChange}
                                    className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">Kategori Kelompok</label>
                                <select 
                                    name="kategori"
                                    value={formData.kategori}
                                    onChange={handleInputChange}
                                    className="w-full h-11 px-3 border border-gray-300 rounded-lg text-sm bg-white focus:border-blue-500 outline-none transition"
                                >
                                    <option value="Teknologi Informasi">Teknologi Informasi</option>
                                    <option value="GA & GA Logistik">GA & GA Logistik</option>
                                    <option value="Elektrikal & Mekanikal">Elektrikal & Mekanikal</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">Tipe Inventaris</label>
                                <select 
                                    name="tipeInventaris"
                                    value={formData.tipeInventaris}
                                    onChange={handleInputChange}
                                    className="w-full h-11 px-3 border border-gray-300 rounded-lg text-sm bg-white outline-none focus:border-blue-500"
                                >
                                    <option value="Consumable">Consumable (Habis Pakai)</option>
                                    <option value="Asset">Fixed Asset (Aset Tetap)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">Satuan Terkecil (UOM)</label>
                                <input
                                    type="text"
                                    name="satuanBesar"
                                    value={formData.satuanBesar}
                                    onChange={handleInputChange}
                                    className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Panel 2: Aturan Stok */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
                            <h3 className="text-base font-bold text-gray-800 border-b border-gray-100 pb-3 flex items-center gap-2">
                                <ShieldCheck size={18} className="text-blue-600" /> Parameter Kontrol Stok
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1.5 font-bold">Batas Minimum (Reorder)</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            name="minStok"
                                            value={formData.minStok}
                                            onChange={handleInputChange}
                                            className="w-full h-11 rounded-lg border border-amber-300 bg-amber-50/20 px-4 text-sm outline-none focus:border-blue-500 transition font-bold"
                                        />
                                        <span className="absolute right-3 top-3 text-[10px] font-bold text-gray-400 uppercase">{formData.satuanBesar}</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1.5">Kapasitas Maksimal Rak</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            name="maxStok"
                                            value={formData.maxStok}
                                            onChange={handleInputChange}
                                            className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm outline-none focus:border-blue-500 transition"
                                        />
                                        <span className="absolute right-3 top-3 text-[10px] font-bold text-gray-400 uppercase">{formData.satuanBesar}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Panel 3: Lokasi */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
                            <h3 className="text-base font-bold text-gray-800 border-b border-gray-100 pb-3 flex items-center gap-2">
                                <Warehouse size={18} className="text-blue-600" /> Penempatan & Lokasi Rak
                            </h3>
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2 text-xs font-bold uppercase tracking-wider">Lokasi Simpan Terdaftar</label>
                                    <input
                                        type="text"
                                        name="lokasiRak"
                                        value={formData.lokasiRak}
                                        onChange={handleInputChange}
                                        className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm outline-none focus:border-blue-500 transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">Metode Valuasi</label>
                                    <select 
                                        name="metodeValuasi"
                                        value={formData.metodeValuasi}
                                        onChange={handleInputChange}
                                        className="w-full h-11 px-3 border border-gray-300 rounded-lg text-sm bg-white outline-none focus:border-blue-500"
                                    >
                                        <option value="FIFO">FIFO (First In First Out)</option>
                                        <option value="AVERAGE">Moving Average</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Panel 4: Catatan */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                        <label className="block text-sm font-medium text-gray-600 mb-2">Update Catatan Spesifikasi / Kondisi Barang</label>
                        <textarea
                            name="catatanTeknis"
                            rows="3"
                            value={formData.catatanTeknis}
                            onChange={handleInputChange}
                            className="w-full rounded-lg border border-gray-300 p-4 text-sm outline-none focus:border-blue-500 transition resize-none"
                        ></textarea>
                    </div>

                    {/* Tombol Kontrol Bawah */}
                    <div className="flex items-center justify-end gap-3 pb-8">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="h-10 px-6 rounded-lg border border-gray-300 text-sm font-semibold bg-white text-gray-600 hover:bg-gray-50 transition"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="h-10 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold inline-flex items-center gap-2 transition shadow-lg shadow-blue-100"
                        >
                            <Save size={16} /> Simpan Perubahan Data
                        </button>
                    </div>
                </form>
            </div>

            {/* ==========================================
                MODAL/POPUP LOG HISTORI (AUDIT TRAIL)
               ========================================== */}
            {isHistoryOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-xl shadow-xl border border-gray-200 max-w-2xl w-full overflow-hidden transform transition-all">
                        
                        {/* Modal Header */}
                        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-gray-800">
                                <History size={18} className="text-blue-600" />
                                <h3 className="text-base font-bold">Audit Log Perubahan Parameter</h3>
                            </div>
                            <button 
                                type="button" 
                                onClick={() => setIsHistoryOpen(false)}
                                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Modal Body: Timeline Audit */}
                        <div className="p-6 max-h-[400px] overflow-y-auto space-y-4">
                            <div className="text-xs text-gray-400 font-mono mb-2 uppercase">SKU Target: {formData.sku}</div>
                            
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