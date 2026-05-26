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

export default function CreateRABProject() {
    const navigate = useNavigate();

    // ==========================================
    // STATE FORM DATA UTAMA
    // ==========================================
    const [formData, setFormData] = useState({
        namaProject: '',
        tahunAnggaran: new Date().getFullYear().toString(),
        deskripsi: '',
    });

    // State untuk item rincian komponen biaya RAB (Dinamis Berbaris)
    const [rabItems, setRabItems] = useState([
        { id: 1, namaItem: '', kategori: 'Material', kuantitas: 0, satuan: 'Pcs', hargaSatuan: 0, total: 0 }
    ]);

    // Handler Perubahan Data Informasi Utama
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handler Tambah Baris Komponen Baru
    const addRowItem = () => {
        const newId = rabItems.length > 0 ? Math.max(...rabItems.map(i => i.id)) + 1 : 1;
        setRabItems([...rabItems, { id: newId, namaItem: '', kategori: 'Material', kuantitas: 0, satuan: 'Pcs', hargaSatuan: 0, total: 0 }]);
    };

    // Handler Hapus Baris Komponen
    const removeRowItem = (id) => {
        if (rabItems.length === 1) return; // Sisakan minimal 1 baris
        setRabItems(rabItems.filter(item => item.id !== id));
    };

    // Handler Perubahan Nilai di Dalam Baris (Kuantitas x Harga Satuan)
    const handleItemChange = (id, field, value) => {
        const updatedItems = rabItems.map(item => {
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
        setRabItems(updatedItems);
    };

    // Hitung Akumulasi Grand Total Anggaran RAB
    const calculateGrandTotal = () => {
        return rabItems.reduce((sum, item) => sum + (item.total || 0), 0);
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
            items: rabItems,
            totalAnggaran: calculateGrandTotal()
        };
        
        console.log('Data RAB Project Payload:', fullPayload);
        // Panggil API simpan data di sini, kemudian redirect
        alert('Data RAB Project Baru Berhasil Disimpan!');
        navigate('/portal/budget/rab-project'); 
    };

    return (
        <PortalLayout>
            <div className="space-y-6">
                
                {/* 1. HEADER HALAMAN & BREADCRUMBS */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            RAB Project
                        </h1>

                        <div className="flex items-center gap-2 mt-1 text-sm">
                            <span className="text-gray-400">Budget & RAB</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-gray-400">RAB Project</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-blue-600 font-medium">Buat RAB Project</span>
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
                    
                    {/* Panel Informasi Utama Proyek */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
                        <h3 className="text-base font-bold text-gray-800 border-b border-gray-100 pb-3">
                            Informasi Proyek Master
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-600 mb-2">
                                    Nama Project
                                </label>

                                <input
                                    type="text"
                                    placeholder="Input Nama Project"
                                    className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 mb-2">
                                    Client
                                </label>

                                <input
                                    type="text"
                                    placeholder="Input Client"
                                    className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 mb-2">
                                    Lokasi Proyek
                                </label>

                                <input
                                    type="number"
                                    placeholder="Input Lokasi Proyek"
                                    className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">
                                    Tahun Anggaran <span className="text-red-500">*</span>
                                </label>
                                <select 
                                    name="tahunAnggaran"
                                    value={formData.tahunAnggaran}
                                    onChange={handleInputChange}
                                    className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:border-blue-500 outline-none bg-white transition"
                                >
                                    <option value="2024">2024</option>
                                    <option value="2025">2025</option>
                                    <option value="2026">2026</option>
                                    <option value="2027">2027</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Panel Komponen Breakdown Biaya */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                            <h3 className="text-base font-bold text-gray-800">
                                Rincian Rencana Anggaran Biaya
                            </h3>
                            
                            <button
                                type="button"
                                onClick={addRowItem}
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100/80 px-3 py-1.5 rounded-lg transition"
                            >
                                <Plus size={14} /> Tambah Baris Komponen
                            </button>
                        </div>

                        {/* Responsive Table Form */}
                        <div className="overflow-x-auto border border-gray-200 rounded-xl">
                            <table className="min-w-full text-sm">
                                <thead className="bg-gray-50 text-gray-700 font-semibold border-b border-gray-200">
                                    <tr>
                                        <th className="px-4 py-3 text-center w-12">No</th>
                                        <th className="px-4 py-3 text-left min-w-[260px]">Deskripsi Item / Pekerjaan</th>
                                        <th className="px-4 py-3 text-left w-44">Kategori Kelompok</th>
                                        <th className="px-4 py-3 text-left w-24">Volume</th>
                                        <th className="px-4 py-3 text-left w-28">Satuan</th>
                                        <th className="px-4 py-3 text-left w-48">Harga Satuan (Rp)</th>
                                        <th className="px-4 py-3 text-left w-48">Subtotal</th>
                                        <th className="px-4 py-3 text-center w-12">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {rabItems.map((item, index) => (
                                        <tr key={item.id} className="hover:bg-gray-50/40 transition-colors">
                                            <td className="px-4 py-3 text-gray-500 text-center font-medium">
                                                {index + 1}
                                            </td>
                                            <td className="px-3 py-2">
                                                <input 
                                                    type="text"
                                                    required
                                                    placeholder="Contoh: Pembesian, Semen, Biaya Pekerja Teknis"
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
                                                    <option value="Material">Material</option>
                                                    <option value="Upah Kerja">Upah Kerja</option>
                                                    <option value="Alat Berat">Alat Berat</option>
                                                    <option value="Subkon">Subkon</option>
                                                    <option value="Operasional">Operasional</option>
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
                                                    placeholder="Pcs / M2 / Lot"
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
                                                    disabled={rabItems.length === 1}
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

                        {/* Panel Total Akumulasi Biaya */}
                        <div className="flex flex-col items-end gap-2 pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-10 bg-gray-900 text-white px-6 py-3.5 rounded-xl">
                                <div className="flex items-center gap-2">
                                    <Coins size={18} className="text-yellow-400" />
                                    <span className="text-xs font-medium text-gray-300 uppercase tracking-wider">Total Estimasi RAB:</span>
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
                            <Save size={16} /> Simpan Data RAB
                        </button>
                    </div>

                </form>
            </div>
        </PortalLayout>
    );
}