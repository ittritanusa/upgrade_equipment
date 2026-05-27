import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';

import {
    Plus,
    Trash2,
    ArrowLeft,
    Save,
    Coins
} from 'lucide-react';

export default function CreatePurchaseRequest() {
    const navigate = useNavigate();

    // ==========================================
    // STATE FORM DATA UTAMA (PURCHASE REQUEST)
    // ==========================================
    const [formData, setFormData] = useState({
        nomorPr: 'PR/PROC/AGS/' + new Date().getFullYear() + '/05/004', // Auto-generated placeholder
        tanggalPengajuan: new Date().toISOString().split('T')[0],
        divisiPemohon: '',
        prioritas: 'Normal',
        catatan: '',
    });

    // State untuk item rincian barang/jasa pengadaan (Dinamis Berbaris)
    const [prItems, setPrItems] = useState([
        { id: 1, namaItem: '', kategori: 'Barang', kuantitas: 0, satuan: 'Pcs', hargaSatuan: 0, total: 0 }
    ]);

    // Handler Perubahan Data Informasi Utama
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handler Tambah Baris Komponen Baru
    const addRowItem = () => {
        const newId = prItems.length > 0 ? Math.max(...prItems.map(i => i.id)) + 1 : 1;
        setPrItems([...prItems, { id: newId, namaItem: '', kategori: 'Barang', kuantitas: 0, satuan: 'Pcs', hargaSatuan: 0, total: 0 }]);
    };

    // Handler Hapus Baris Komponen
    const removeRowItem = (id) => {
        if (prItems.length === 1) return; // Sisakan minimal 1 baris
        setPrItems(prItems.filter(item => item.id !== id));
    };

    // Handler Perubahan Nilai di Dalam Baris (Kuantitas x Harga Satuan)
    const handleItemChange = (id, field, value) => {
        const updatedItems = prItems.map(item => {
            if (item.id === id) {
                const updatedItem = { ...item, [field]: value };
                
                // Kalkulasi otomatis subtotal item baris tersebut
                if (field === 'kuantitas' || field === 'hargaSatuan') {
                    const qty = field === 'kuantitas' ? Number(value) : Number(item.kuantitas);
                    const harga = field === 'hargaSatuan' ? Number(value) : Number(item.hargaSatuan);
                    updatedItem.total = qty * harga;
                }
                return updatedItem;
            }
            return item;
        });
        setPrItems(updatedItems);
    };

    // Hitung Akumulasi Grand Total Anggaran PR
    const calculateGrandTotal = () => {
        return prItems.reduce((sum, item) => sum + (item.total || 0), 0);
    };

    // Helper Format Rupiah untuk Tampilan
    const formatRupiah = (angka) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(angka);
    };

    // Handler Submit Kirim Data Form
    const handleSubmit = (e) => {
        e.preventDefault();
        const fullPayload = {
            ...formData,
            items: prItems,
            totalEstimasi: calculateGrandTotal()
        };
        
        console.log('Data Purchase Request Payload:', fullPayload);
        // Panggil API simpan data di sini, kemudian redirect
        alert('Dokumen Purchase Request Baru Berhasil Diajukan!');
        navigate('/portal/procurement/purchase-request'); 
    };

    return (
        <PortalLayout>
            <div className="space-y-6">
                
                {/* 1. HEADER HALAMAN & BREADCRUMBS */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Purchase Request
                        </h1>

                        <div className="flex items-center gap-2 mt-1 text-sm">
                            <span className="text-gray-400">Procurement</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-gray-400">Purchase Request</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-blue-600 font-medium">Buat Purchase Request</span>
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
                    
                    {/* Panel Informasi Utama Purchase Request */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
                        <h3 className="text-base font-bold text-gray-800 border-b border-gray-100 pb-3">
                            Informasi Pengajuan Pengadaan
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">
                                    Nomor PR <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="nomorPr"
                                    required
                                    value={formData.nomorPr}
                                    onChange={handleInputChange}
                                    placeholder="Input Nomor PR"
                                    className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm bg-gray-50 text-gray-500 font-medium cursor-not-allowed"
                                    readOnly
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">
                                    Tanggal Pengajuan <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    name="tanggalPengajuan"
                                    required
                                    value={formData.tanggalPengajuan}
                                    onChange={handleInputChange}
                                    className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm outline-none focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">
                                    Divisi / Departemen Pemohon <span className="text-red-500">*</span>
                                </label>
                                <select 
                                    name="divisiPemohon"
                                    required
                                    value={formData.divisiPemohon}
                                    onChange={handleInputChange}
                                    className="w-full h-11 px-3 border border-gray-300 rounded-lg text-sm focus:border-blue-500 outline-none bg-white transition"
                                >
                                    <option value="">-- Pilih Divisi --</option>
                                    <option value="Teknologi Informasi">Teknologi Informasi</option>
                                    <option value="Operasional & Proyek">Operasional & Proyek</option>
                                    <option value="GA & GA Logistik">GA & GA Logistik</option>
                                    <option value="Keuangan & Akuntansi">Keuangan & Akuntansi</option>
                                    <option value="Sumber Daya Manusia">Sumber Daya Manusia</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">
                                    Tingkat Prioritas <span className="text-red-500">*</span>
                                </label>
                                <select 
                                    name="prioritas"
                                    required
                                    value={formData.prioritas}
                                    onChange={handleInputChange}
                                    className="w-full h-11 px-3 border border-gray-300 rounded-lg text-sm focus:border-blue-500 outline-none bg-white transition"
                                >
                                    <option value="Normal">Normal</option>
                                    <option value="Penting">Penting</option>
                                    <option value="Urgent / Mendesak">Urgent / Mendesak</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">
                                    Catatan / Perihal Pengajuan <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="catatan"
                                    required
                                    rows="2"
                                    value={formData.catatan}
                                    onChange={handleInputChange}
                                    placeholder="Tuliskan tujuan pengadaan barang atau deskripsi singkat perihal pengajuan ini..."
                                    className="w-full rounded-lg border border-gray-300 p-4 text-sm outline-none focus:border-blue-500"
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Panel Komponen Breakdown Item Barang/Jasa */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                            <h3 className="text-base font-bold text-gray-800">
                                Rincian Kebutuhan Barang / Jasa
                            </h3>
                            
                            <button
                                type="button"
                                onClick={addRowItem}
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100/80 px-3 py-1.5 rounded-lg transition"
                            >
                                <Plus size={14} /> Tambah Baris Item
                            </button>
                        </div>

                        {/* Responsive Table Form */}
                        <div className="overflow-x-auto border border-gray-200 rounded-xl">
                            <table className="min-w-full text-sm">
                                <thead className="bg-gray-50 text-gray-700 font-semibold border-b border-gray-200">
                                    <tr>
                                        <th className="px-4 py-3 text-center w-12">No</th>
                                        <th className="px-4 py-3 text-left min-w-[280px]">Nama Barang / Jasa Pekerjaan</th>
                                        <th className="px-4 py-3 text-left w-44">Kategori PR</th>
                                        <th className="px-4 py-3 text-left w-24">Jumlah</th>
                                        <th className="px-4 py-3 text-left w-28">Satuan</th>
                                        <th className="px-4 py-3 text-left w-48">Estimasi Harga Satuan</th>
                                        <th className="px-4 py-3 text-left w-48">Total Estimasi</th>
                                        <th className="px-4 py-3 text-center w-12">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {prItems.map((item, index) => (
                                        <tr key={item.id} className="hover:bg-gray-50/40 transition-colors">
                                            <td className="px-4 py-3 text-gray-500 text-center font-medium">
                                                {index + 1}
                                            </td>
                                            <td className="px-3 py-2">
                                                <input 
                                                    type="text"
                                                    required
                                                    placeholder="Contoh: Laptop Core i7, Sewa Excavator, Jasa Pemeliharaan AC"
                                                    value={item.namaItem}
                                                    onChange={(e) => handleItemChange(item.id, 'namaItem', e.target.value)}
                                                    className="w-full h-9 px-3 border border-gray-300 rounded focus:border-blue-500 outline-none text-xs"
                                                />
                                            </td>
                                            <td className="px-3 py-2">
                                                <select
                                                    value={item.kategori}
                                                    onChange={(e) => handleItemChange(item.id, 'kategori', e.target.value)}
                                                    className="w-full h-9 px-2 border border-gray-300 rounded bg-white text-xs text-gray-700 outline-none focus:border-blue-500"
                                                >
                                                    <option value="Barang">Barang / Material</option>
                                                    <option value="Jasa">Jasa / Vendor</option>
                                                    <option value="Aset Tetap">Aset Tetap (Asset)</option>
                                                    <option value="Lain-lain">Lain-lain</option>
                                                </select>
                                            </td>
                                            <td className="px-3 py-2">
                                                <input 
                                                    type="number"
                                                    min="1"
                                                    required
                                                    value={item.kuantitas || ''}
                                                    onChange={(e) => handleItemChange(item.id, 'kuantitas', e.target.value)}
                                                    className="w-full h-9 px-2 border border-gray-300 rounded focus:border-blue-500 outline-none text-xs"
                                                />
                                            </td>
                                            <td className="px-3 py-2">
                                                <input 
                                                    type="text"
                                                    placeholder="Pcs / Unit / Lot"
                                                    value={item.satuan}
                                                    onChange={(e) => handleItemChange(item.id, 'satuan', e.target.value)}
                                                    className="w-full h-9 px-2 border border-gray-300 rounded focus:border-blue-500 outline-none text-xs"
                                                />
                                            </td>
                                            <td className="px-3 py-2">
                                                <input 
                                                    type="number"
                                                    min="0"
                                                    required
                                                    placeholder="0"
                                                    value={item.hargaSatuan || ''}
                                                    onChange={(e) => handleItemChange(item.id, 'hargaSatuan', e.target.value)}
                                                    className="w-full h-9 px-2 border border-gray-300 rounded focus:border-blue-500 outline-none text-xs font-semibold text-gray-700"
                                                />
                                            </td>
                                            <td className="px-4 py-3 text-xs font-bold text-gray-900 bg-gray-50/60">
                                                {formatRupiah(item.total)}
                                            </td>
                                            <td className="px-3 py-2 text-center">
                                                <button
                                                    type="button"
                                                    disabled={prItems.length === 1}
                                                    onClick={() => removeRowItem(item.id)}
                                                    className="text-red-500 hover:text-red-700 p-1.5 rounded hover:bg-red-50 transition disabled:opacity-30"
                                                >
                                                    <Trash2 size={15} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Panel Total Akumulasi Biaya PR */}
                        <div className="flex flex-col items-end gap-2 pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-10 bg-gray-900 text-white px-6 py-3.5 rounded-xl">
                                <div className="flex items-center gap-2">
                                    <Coins size={18} className="text-yellow-400" />
                                    <span className="text-xs font-medium text-gray-300 uppercase tracking-wider">Total Estimasi Nilai PR:</span>
                                </div>
                                <span className="text-lg font-black tracking-wide">
                                    {formatRupiah(calculateGrandTotal())}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Tombol Aksi Kontrol */}
                    <div className="flex items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="h-10 px-5 rounded-lg border border-gray-300 text-sm font-semibold bg-white text-gray-600 hover:bg-gray-50 transition"
                        >
                            Batalkan
                        </button>
                        
                        <button
                            type="submit"
                            className="h-10 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold inline-flex items-center gap-2 transition shadow-sm"
                        >
                            <Save size={16} /> Ajukan Dokumen PR
                        </button>
                    </div>

                </form>
            </div>
        </PortalLayout>
    );
}