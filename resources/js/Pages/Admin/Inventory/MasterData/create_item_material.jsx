import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';

import {
    Plus,
    ArrowLeft,
    Save,
    Package,
    Layers,
    Tag,
    Info,
    AlertCircle,
    Warehouse,
    ShieldCheck
} from 'lucide-react';

export default function CreateMasterItemMaterial() {
    const navigate = useNavigate();

    // ==========================================
    // STATE FORM DATA MASTER ITEM
    // ==========================================
    const [formData, setFormData] = useState({
        sku: 'SKU-AUTO-' + Math.floor(1000 + Math.random() * 9000), // Placeholder Auto-gen
        namaItem: '',
        kategori: '',
        merek: '',
        tipeInventaris: 'Consumable', // Consumable (Habis Pakai) atau Asset (Aset Tetap)
        satuanBesar: 'Pcs',
        minStok: 0,
        maxStok: 0,
        lokasiRak: '',
        metodeValuasi: 'FIFO',
        catatanTeknis: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Simulasi validasi sederhana
        if (!formData.namaItem || !formData.kategori) {
            return alert('Mohon lengkapi Nama Item dan Kategori Kelompok!');
        }

        console.log('Data Master Item Baru:', formData);
        alert('Item Baru Berhasil Diregistrasikan ke Katalog Inventory!');
        navigate('/portal/inventory/master-item'); // Kembali ke list
    };

    return (
        <PortalLayout>
            <div className="space-y-6">
                
                {/* 1. HEADER HALAMAN & BREADCRUMBS */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Registrasi Item & Material Baru
                        </h1>

                        <div className="flex items-center gap-2 mt-1 text-sm">
                            <span className="text-gray-400">Inventory & Warehouse</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-gray-400">Master Data</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-blue-600 font-medium">Tambah Item</span>
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

                {/* 2. MAIN FORM ENTRY AREA */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Panel 1: Informasi Identitas Barang */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
                        <h3 className="text-base font-bold text-gray-800 border-b border-gray-100 pb-3 flex items-center gap-2">
                            <Tag size={18} className="text-blue-600" /> Identifikasi Katalog Barang
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">Nomor SKU / Part Number</label>
                                <input
                                    type="text"
                                    name="sku"
                                    value={formData.sku}
                                    readOnly
                                    className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm bg-gray-50 text-gray-500 font-mono font-bold cursor-not-allowed"
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
                                    placeholder="Contoh: Kabel LAN Belden Cat6 UTP 305M"
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
                                    placeholder="Merek Barang"
                                    className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">Kategori Kelompok <span className="text-red-500">*</span></label>
                                <select 
                                    name="kategori"
                                    required
                                    value={formData.kategori}
                                    onChange={handleInputChange}
                                    className="w-full h-11 px-3 border border-gray-300 rounded-lg text-sm bg-white focus:border-blue-500 outline-none transition"
                                >
                                    <option value="">-- Pilih Kategori --</option>
                                    <option value="Teknologi Informasi">Teknologi Informasi</option>
                                    <option value="GA & GA Logistik">GA & GA Logistik</option>
                                    <option value="Elektrikal & Mekanikal">Elektrikal & Mekanikal</option>
                                    <option value="Alat Tulis Kantor">Alat Tulis Kantor (ATK)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">Tipe Pengelolaan Inventaris</label>
                                <div className="flex gap-2 p-1 bg-gray-100 rounded-lg border border-gray-200">
                                    <button 
                                        type="button"
                                        onClick={() => setFormData(prev => ({...prev, tipeInventaris: 'Consumable'}))}
                                        className={`flex-1 py-1.5 rounded-md text-xs font-bold transition ${formData.tipeInventaris === 'Consumable' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}
                                    >
                                        Consumable
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={() => setFormData(prev => ({...prev, tipeInventaris: 'Asset'}))}
                                        className={`flex-1 py-1.5 rounded-md text-xs font-bold transition ${formData.tipeInventaris === 'Asset' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}
                                    >
                                        Fixed Asset
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">Satuan Terkecil (UOM)</label>
                                <select 
                                    name="satuanBesar"
                                    value={formData.satuanBesar}
                                    onChange={handleInputChange}
                                    className="w-full h-11 px-3 border border-gray-300 rounded-lg text-sm bg-white focus:border-blue-500 outline-none transition"
                                >
                                    <option value="Pcs">Pcs (Pieces)</option>
                                    <option value="Unit">Unit</option>
                                    <option value="Box">Box / Dus</option>
                                    <option value="Roll">Roll</option>
                                    <option value="Lot">Lot</option>
                                    <option value="Set">Set</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Panel 2: Aturan Stok & Alert */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
                            <h3 className="text-base font-bold text-gray-800 border-b border-gray-100 pb-3 flex items-center gap-2">
                                <ShieldCheck size={18} className="text-blue-600" /> Parameter Kontrol Stok
                            </h3>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1.5">Batas Minimum (Reorder)</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            name="minStok"
                                            min="0"
                                            value={formData.minStok}
                                            onChange={handleInputChange}
                                            className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm outline-none focus:border-blue-500 transition"
                                        />
                                        <span className="absolute right-3 top-3 text-[10px] font-bold text-gray-400 uppercase">{formData.satuanBesar}</span>
                                    </div>
                                    <p className="text-[10px] text-gray-400 mt-1.5 flex items-start gap-1">
                                        <Info size={10} className="mt-0.5" /> Notifikasi alert akan muncul jika stok di bawah nilai ini.
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1.5">Kapasitas Maksimal Rak</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            name="maxStok"
                                            min="0"
                                            value={formData.maxStok}
                                            onChange={handleInputChange}
                                            className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm outline-none focus:border-blue-500 transition"
                                        />
                                        <span className="absolute right-3 top-3 text-[10px] font-bold text-gray-400 uppercase">{formData.satuanBesar}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Panel 3: Lokasi & Penyimpanan Gudang */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
                            <h3 className="text-base font-bold text-gray-800 border-b border-gray-100 pb-3 flex items-center gap-2">
                                <Warehouse size={18} className="text-blue-600" /> Penempatan & Lokasi Rak
                            </h3>
                            
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2 text-xs font-bold uppercase tracking-wider">Titik Lokasi Simpan Gudang</label>
                                    <input
                                        type="text"
                                        name="lokasiRak"
                                        value={formData.lokasiRak}
                                        onChange={handleInputChange}
                                        placeholder="Contoh: Rak A-12, Lemari 02, atau Pallet B"
                                        className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm outline-none focus:border-blue-500 transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">Metode Penilaian Persediaan</label>
                                    <select 
                                        name="metodeValuasi"
                                        value={formData.metodeValuasi}
                                        onChange={handleInputChange}
                                        className="w-full h-11 px-3 border border-gray-300 rounded-lg text-sm bg-white outline-none focus:border-blue-500"
                                    >
                                        <option value="FIFO">FIFO (First In First Out)</option>
                                        <option value="AVERAGE">Moving Average</option>
                                        <option value="LIFO">LIFO (Last In First Out)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Panel 4: Catatan Teknis */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                        <label className="block text-sm font-medium text-gray-600 mb-2">Catatan Spesifikasi / Informasi Tambahan</label>
                        <textarea
                            name="catatanTeknis"
                            rows="3"
                            value={formData.catatanTeknis}
                            onChange={handleInputChange}
                            placeholder="Tuliskan spesifikasi teknis tambahan, dimensi barang, atau instruksi penanganan khusus (misal: Fragile, Jangan ditumpuk)..."
                            className="w-full rounded-lg border border-gray-300 p-4 text-sm outline-none focus:border-blue-500 transition resize-none"
                        ></textarea>
                    </div>

                    {/* Tombol Aksi Kontrol Bawah */}
                    <div className="flex items-center justify-end gap-3 pb-8">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="h-10 px-6 rounded-lg border border-gray-300 text-sm font-semibold bg-white text-gray-600 hover:bg-gray-50 transition"
                        >
                            Batalkan
                        </button>
                        
                        <button
                            type="submit"
                            className="h-10 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold inline-flex items-center gap-2 transition shadow-lg shadow-blue-100"
                        >
                            <Save size={16} /> Simpan Katalog Item
                        </button>
                    </div>

                </form>
            </div>
        </PortalLayout>
    );
}