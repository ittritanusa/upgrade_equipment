import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';

import {
    ArrowLeft,
    Save,
    FileText,
    Package,
    Calendar,
    Plus,
    Trash2,
    Hash,
    Layers,
    Briefcase,
    User,
    AlertCircle
} from 'lucide-react';

// ==========================================
// DATA MASTER ITEM (REFERENSI DATABASE)
// ==========================================
const MASTER_ITEMS = [
    { kode: 'BMT-D16', nama: 'Besi Beton Ulir D16 (KS/Per Batang)', satuan: 'Batang' },
    { kode: 'BMT-D13', nama: 'Besi Beton Ulir D13 (KS/Per Batang)', satuan: 'Batang' },
    { kode: 'CMN-PD50', nama: 'Semen Padang Type I @50kg', satuan: 'Zak' },
    { kode: 'CMN-TIGA', nama: 'Semen Tiga Roda Portland @50kg', satuan: 'Zak' },
    { kode: 'PPA-PVC3', nama: 'Pipa PVC Wavin AW 3 Inch', satuan: 'Batang' },
    { kode: 'ELC-KBL4', nama: 'Kabel NYM 3x4 mm Supreme (Roll @100m)', satuan: 'Roll' },
    { kode: 'SFT-HLM01', nama: 'Helm Keselamatan Kerja (Safety Helmet Premium)', satuan: 'Pcs' },
];

export default function EditGoodsIssue() {
    const navigate = useNavigate();
    const { id } = useParams(); // Mengambil ID Goods Issue dari URL parameter

    // ==========================================
    // STATE MASTER HEADER DOKUMEN GOODS ISSUE
    // ==========================================
    const [formData, setFormData] = useState({
        noIssue: '', 
        tanggalKeluar: '',
        gudangAsal: '',
        noRefRequest: '',
        kodeWbs: '',
        petugasGudang: '',
        proyekTujuan: '',
        subKontraktor: '',
        catatan: ''
    });

    // ==========================================
    // STATE DETAIL ITEMS GRID (URAIAN MATERIAL)
    // ==========================================
    const [materialItems, setMaterialItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // ==========================================
    // SIMULASI FETCH DATA BERDASARKAN ID (API CALL)
    // ==========================================
    useEffect(() => {
        // Mensimulasikan loading data dari database
        const timer = setTimeout(() => {
            // Data tiruan yang berhasil di-fetch berdasarkan ID
            const existingDataHeader = {
                noIssue: 'GI-2026-0045', 
                tanggalKeluar: '2026-05-28',
                gudangAsal: 'Gudang Pusat Logistik (GDG-01)',
                noRefRequest: 'MR-PRJ01-098',
                kodeWbs: 'WBS-1.1.2',
                petugasGudang: 'Hendra Wijaya (Dispatcher PIC)',
                proyekTujuan: 'Proyek Bendungan Hilir Balikpapan',
                subKontraktor: 'PT. Sinar Jaya Mandiri',
                catatan: 'Supir Pak Doni - Truk Colt Diesel Plat B 9283 FAA'
            };

            const existingDataItems = [
                {
                    id: 1,
                    kodeMaterial: 'BMT-D16',
                    namaMaterial: 'Besi Beton Ulir D16 (KS/Per Batang)',
                    jumlahDiminta: 150,
                    jumlahDikeluarkan: 150,
                    satuan: 'Batang',
                    kondisi: 'Bagus'
                },
                {
                    id: 2,
                    kodeMaterial: 'CMN-PD50',
                    namaMaterial: 'Semen Padang Type I @50kg',
                    jumlahDiminta: 200,
                    jumlahDikeluarkan: 180,
                    satuan: 'Zak',
                    kondisi: 'Bagus'
                }
            ];

            setFormData(existingDataHeader);
            setMaterialItems(existingDataItems);
            setIsLoading(false);
        }, 600); // Simulasi delay network 600ms

        return () => clearTimeout(timer);
    }, [id]);

    // Handler Perubahan Data Header
    const handleHeaderChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handler Perubahan Dropdown SKU & Pengisian Otomatis (Sama seperti halaman Create)
    const handleSkuSelection = (id, selectedKode) => {
        const itemTerpilih = MASTER_ITEMS.find(item => item.kode === selectedKode);

        setMaterialItems(prevItems =>
            prevItems.map(item => {
                if (item.id === id) {
                    return {
                        ...item,
                        kodeMaterial: selectedKode,
                        namaMaterial: itemTerpilih ? itemTerpilih.nama : '',
                        satuan: itemTerpilih ? itemTerpilih.satuan : 'Batang'
                    };
                }
                return item;
            })
        );
    };

    // Handler Perubahan Data Manual Kolom Lain (Volume, Kondisi, dll)
    const handleItemChange = (id, field, value) => {
        setMaterialItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, [field]: value } : item
            )
        );
    };

    // Fungsi Tambah Baris Material Baru
    const addMaterialRow = () => {
        const newId = materialItems.length > 0 ? Math.max(...materialItems.map(i => i.id)) + 1 : 1;
        setMaterialItems(prev => [
            ...prev,
            {
                id: newId,
                kodeMaterial: '',
                namaMaterial: '',
                jumlahDiminta: 0,
                jumlahDikeluarkan: 0,
                satuan: 'Batang',
                kondisi: 'Bagus'
            }
        ]);
    };

    // Fungsi Hapus Baris Material
    const removeMaterialRow = (id) => {
        if (materialItems.length > 1) {
            setMaterialItems(prev => prev.filter(item => item.id !== id));
        }
    };

    // Menghitung akumulasi total volume keluar
    const totalVolumeKeluar = materialItems.reduce((sum, item) => sum + Number(item.jumlahDikeluarkan || 0), 0);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validasi
        const adaSkuKosong = materialItems.some(item => !item.kodeMaterial);
        if (adaSkuKosong) {
            return alert('Harap pilih Kode Material / SKU terlebih dahulu pada tabel detail!');
        }

        const adaNegatif = materialItems.some(item => item.jumlahDiminta < 0 || item.jumlahDikeluarkan < 0);
        if (adaNegatif) {
            return alert('Volume material tidak boleh bernilai negatif!');
        }

        console.log('Mengupdate Dokumen Goods Issue:', { id, formData, materialItems });
        alert(`Dokumen Goods Issue ${formData.noIssue} Berhasil Diperbarui! Penyesuaian stok logistik telah disimpan.`);
        navigate('/portal/inventory/goods-issue'); 
    };

    if (isLoading) {
        return (
            <PortalLayout>
                <div className="flex flex-col items-center justify-center min-h-[400px] space-y-3">
                    <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-sm font-medium text-gray-500">Memuat data transaksi Goods Issue...</p>
                </div>
            </PortalLayout>
        );
    }

    return (
        <PortalLayout>
            <div className="space-y-6">
                
                {/* 1. HEADER HALAMAN & NAVIGASI */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                            Edit Isu Pengeluaran Material <span className="text-sm font-mono bg-amber-50 text-amber-700 px-2.5 py-1 rounded-md border border-amber-200">{formData.noIssue}</span>
                        </h1>
                        <div className="flex items-center gap-2 mt-1 text-sm">
                            <span className="text-gray-400">Inventory & Warehouse</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-gray-400">Goods Issue</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-amber-600 font-medium">Edit Transaksi</span>
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

                {/* NOTIFIKASI EDIT MODE */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3 text-amber-800">
                    <AlertCircle size={20} className="shrink-0 mt-0.5 text-amber-600" />
                    <div className="text-sm">
                        <span className="font-bold">Mode Koreksi Dokumen:</span> Perubahan pada volume keluar atau penggantian SKU akan langsung memengaruhi kalkulasi *Stock-on-Hand* di gudang asal sesaat setelah dokumen ini disimpan kembali.
                    </div>
                </div>

                {/* 2. FORM PENGERJAAN UTAMA */}
                <form onSubmit={handleSubmit} className="space-y-6 w-full">
                    
                    {/* SEKSI A: VALIDASI DOKUMEN ASAL & COST CENTER */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
                        <h3 className="text-sm font-bold text-gray-800 border-b border-gray-100 pb-2.5 flex items-center gap-2">
                            <FileText size={16} className="text-blue-600" /> 1. Validasi Dokumen Asal & Cost Center Proyek
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wide text-gray-400 mb-1.5 flex items-center gap-1">
                                    <Hash size={13} /> No. Goods Issue (Kunci)
                                </label>
                                <input type="text" readOnly value={formData.noIssue} className="w-full h-10 rounded-lg bg-gray-100 border border-gray-200 px-3 text-sm font-mono font-bold text-gray-500 cursor-not-allowed" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wide text-gray-600 mb-1.5 flex items-center gap-1">
                                    <Calendar size={13} className="text-gray-400" /> Tanggal Keluar Mobilisasi <span className="text-red-500">*</span>
                                </label>
                                <input type="date" name="tanggalKeluar" required value={formData.tanggalKeluar} onChange={handleHeaderChange} className="w-full h-10 rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-blue-500 transition font-medium text-gray-800" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wide text-gray-600 mb-1.5 flex items-center gap-1">
                                    <Layers size={13} className="text-gray-400" /> Asal Gudang Logistik <span className="text-red-500">*</span>
                                </label>
                                <select name="gudangAsal" value={formData.gudangAsal} onChange={handleHeaderChange} required className="w-full h-10 rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-blue-500 bg-white transition font-medium text-gray-800">
                                    <option value="">-- Pilih Gudang Sumber --</option>
                                    <option value="Gudang Pusat Logistik (GDG-01)">Gudang Pusat Logistik (GDG-01)</option>
                                    <option value="Gudang Lapangan Bpp (GDG-04)">Gudang Lapangan Bpp (GDG-04)</option>
                                    <option value="Gudang Transit Makassar (GDG-02)">Gudang Transit Makassar (GDG-02)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wide text-gray-600 mb-1.5 flex items-center gap-1">
                                    <FileText size={13} className="text-gray-400" /> Ref. Material Request No (MR) <span className="text-red-500">*</span>
                                </label>
                                <input type="text" name="noRefRequest" required value={formData.noRefRequest} onChange={handleHeaderChange} placeholder="Contoh: MR-PRJ01-098" className="w-full h-10 rounded-lg border border-gray-300 px-3 text-sm font-mono font-bold uppercase outline-none focus:border-blue-500 transition" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wide text-gray-600 mb-1.5 flex items-center gap-1">
                                    <Briefcase size={13} className="text-gray-400" /> Kode Anggaran WBS / Cost Center <span className="text-red-500">*</span>
                                </label>
                                <input type="text" name="kodeWbs" required value={formData.kodeWbs} onChange={handleHeaderChange} placeholder="Contoh: WBS-1.1.2" className="w-full h-10 rounded-lg border border-gray-300 px-3 text-sm font-medium outline-none focus:border-blue-500 transition" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wide text-gray-400 mb-1.5 flex items-center gap-1">
                                    <User size={13} /> Petugas Gudang (Dispatcher PIC)
                                </label>
                                <input type="text" readOnly value={formData.petugasGudang} className="w-full h-10 rounded-lg bg-gray-50 border border-gray-200 px-3 text-sm font-bold text-gray-700 cursor-not-allowed" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wide text-gray-600 mb-1.5">Project Site Lapangan / Lokasi Tujuan <span className="text-red-500">*</span></label>
                                <input type="text" name="proyekTujuan" required value={formData.proyekTujuan} onChange={handleHeaderChange} placeholder="Masukkan nama proyek..." className="w-full h-10 rounded-lg border border-gray-300 px-3 text-sm font-medium outline-none focus:border-blue-500 transition" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wide text-gray-600 mb-1.5">Subkontraktor / Mandor Pelaksana <span className="text-red-500">*</span></label>
                                <input type="text" name="subKontraktor" required value={formData.subKontraktor} onChange={handleHeaderChange} placeholder="Contoh: PT. Sinar Jaya Mandiri" className="w-full h-10 rounded-lg border border-gray-300 px-3 text-sm font-medium outline-none focus:border-blue-500 transition" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold uppercase tracking-wide text-gray-600 mb-1.5">Catatan Khusus / Instruksi Pengiriman</label>
                                <input type="text" name="catatan" value={formData.catatan} onChange={handleHeaderChange} placeholder="No plat truk, nama supir, atau notes..." className="w-full h-10 rounded-lg border border-gray-300 px-3 text-sm font-medium outline-none focus:border-blue-500 transition" />
                            </div>
                        </div>
                    </div>

                    {/* SEKSI B: DETAIL BARANG YANG DIKELUARKAN */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-2.5">
                            <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                                <Package size={16} className="text-blue-600" /> 2. Detail Spesifikasi & Volume Material Keluar
                            </h3>
                            <div className="flex items-center gap-4 text-xs font-bold text-gray-500 self-end sm:self-auto">
                                <div>Total Volume Keluar: <span className="text-blue-600 font-mono text-sm">{totalVolumeKeluar}</span></div>
                                <div className="border-l pl-4">Varietas SKU: <span className="text-gray-800 font-mono text-sm">{materialItems.length} Item</span></div>
                                <button
                                    type="button"
                                    onClick={addMaterialRow}
                                    className="inline-flex items-center gap-1.5 h-8 px-3 bg-gray-900 hover:bg-gray-800 text-white text-xs font-semibold rounded-md transition shadow-sm ml-2"
                                >
                                    <Plus size={14} /> Tambah Row
                                </button>
                            </div>
                        </div>

                        {/* Table Form Grid */}
                        <div className="overflow-x-auto border border-gray-200 rounded-xl">
                            <table className="min-w-full text-sm">
                                <thead className="bg-gray-50 text-gray-700 font-bold border-b border-gray-200 text-xs uppercase tracking-wider">
                                    <tr>
                                        <th className="px-4 py-3 text-left w-60">Kode Material / SKU</th>
                                        <th className="px-4 py-3 text-left">Nama Material & Spesifikasi Teknis</th>
                                        <th className="px-3 py-3 text-center w-28">Unit (Satuan)</th>
                                        <th className="px-3 py-3 text-center w-32">Vol Diminta (MR)</th>
                                        <th className="px-3 py-3 text-center w-32">Vol Keluar Gudang</th>
                                        <th className="px-4 py-3 text-left w-52">Kondisi Fisik Barang</th>
                                        <th className="px-4 py-3 text-center w-16">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {materialItems.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50/50 transition">
                                            
                                            {/* Dropdown SKU */}
                                            <td className="px-4 py-2.5">
                                                <select
                                                    required
                                                    value={item.kodeMaterial}
                                                    onChange={(e) => handleSkuSelection(item.id, e.target.value)}
                                                    className="w-full h-9 rounded-lg border border-gray-300 px-2 text-sm font-mono bg-white outline-none focus:border-blue-500 transition text-gray-800 font-bold"
                                                >
                                                    <option value="">-- Pilih SKU --</option>
                                                    {MASTER_ITEMS.map((master) => (
                                                        <option key={master.kode} value={master.kode}>
                                                            {master.kode}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>

                                            {/* Nama Material (Otomatis) */}
                                            <td className="px-4 py-2.5">
                                                <input 
                                                    type="text" 
                                                    readOnly
                                                    value={item.namaMaterial} 
                                                    placeholder="Pilih SKU untuk memuat deskripsi..." 
                                                    className="w-full h-9 rounded-lg bg-gray-50 border border-gray-200 px-3 text-sm font-medium text-gray-600 cursor-not-allowed outline-none" 
                                                />
                                            </td>

                                            {/* Satuan Logistik (Otomatis) */}
                                            <td className="px-3 py-2.5 text-center">
                                                <input 
                                                    type="text" 
                                                    readOnly
                                                    value={item.satuan} 
                                                    className="w-full h-9 rounded-lg bg-gray-50 border border-gray-200 px-2 text-center text-sm font-medium text-gray-600 cursor-not-allowed outline-none" 
                                                />
                                            </td>

                                            {/* Volume Diminta */}
                                            <td className="px-3 py-2.5">
                                                <input 
                                                    type="number" 
                                                    min="0"
                                                    required
                                                    value={item.jumlahDiminta} 
                                                    onChange={(e) => handleItemChange(item.id, 'jumlahDiminta', parseFloat(e.target.value) || 0)} 
                                                    className="w-full h-9 rounded-lg border border-gray-300 px-3 text-center text-sm font-mono font-medium text-gray-800 outline-none focus:border-blue-500 transition" 
                                                />
                                            </td>

                                            {/* Volume Keluar */}
                                            <td className="px-3 py-2.5">
                                                <input 
                                                    type="number" 
                                                    min="0"
                                                    required
                                                    value={item.jumlahDikeluarkan} 
                                                    onChange={(e) => handleItemChange(item.id, 'jumlahDikeluarkan', parseFloat(e.target.value) || 0)} 
                                                    className="w-full h-9 rounded-lg border border-gray-300 px-3 text-center text-sm font-mono font-bold text-blue-600 bg-blue-50/20 outline-none focus:border-blue-500 transition" 
                                                />
                                            </td>

                                            {/* Kondisi Fisik */}
                                            <td className="px-4 py-2.5">
                                                <select
                                                    value={item.kondisi}
                                                    onChange={(e) => handleItemChange(item.id, 'kondisi', e.target.value)}
                                                    className="w-full h-9 rounded-lg border border-gray-300 px-2 text-sm bg-white outline-none focus:border-blue-500 transition text-gray-800"
                                                >
                                                    <option value="Bagus">Bagus / Layak Konstruksi</option>
                                                    <option value="Cacat Karat">Karat Ringan (Komersial)</option>
                                                    <option value="Rusak Basah">Rusak Air / Afkir</option>
                                                </select>
                                            </td>

                                            {/* Hapus Baris */}
                                            <td className="px-4 py-2.5 text-center">
                                                <button
                                                    type="button"
                                                    onClick={() => removeMaterialRow(item.id)}
                                                    disabled={materialItems.length === 1}
                                                    className={`p-2 rounded-lg transition ${
                                                        materialItems.length === 1
                                                            ? 'text-gray-200 cursor-not-allowed'
                                                            : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
                                                    }`}
                                                    title="Hapus Item"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* SEKSI C: ACTION SUBMIT BUTTONS */}
                    <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4">
                        <button
                            type="button"
                            onClick={() => navigate('/portal/inventory/goods-issue')}
                            className="h-11 px-5 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-sm font-semibold rounded-lg transition"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="inline-flex items-center gap-2 h-11 px-5 bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold rounded-lg transition shadow-md shadow-amber-100"
                        >
                            <Save size={16} /> Simpan Perubahan Dokumen
                        </button>
                    </div>

                </form>
            </div>
        </PortalLayout>
    );
}