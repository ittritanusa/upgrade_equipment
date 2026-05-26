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

export default function CreateRealisasiBudget() {
    const navigate = useNavigate();

    // ==========================================
    // STATE FORM DATA UTAMA
    // ==========================================
    const [formData, setFormData] = useState({
        kodeRealisasi: 'REA-2026-006', // Contoh generate otomatis
        tanggalRealisasi: new Date().toISOString().split('T')[0],
        rabId: '',
        keterangan: '',
    });

    // State untuk item rincian realisasi (Dinamis Berbaris)
    const [items, setItems] = useState([
        { id: 1, namaItem: '', volume: 0, satuan: 'Pcs', hargaSatuan: 0, total: 0 }
    ]);

    // Data dummy RAB untuk pilihan select reference
    const dummyRabList = [
        { id: '1', kodeRab: 'RAB/AGS/USR/0526/0001', namaProject: 'Pembangunan Cluster Azure', sisaSaku: 1250000000 },
        { id: '2', kodeRab: 'RAB/AGS/USR/0526/0002', namaProject: 'Renovasi Gedung Kantor Pusat', sisaSaku: 630000000 },
        { id: '3', kodeRab: 'RAB/AGS/USR/0526/0003', namaProject: 'Pengadaan Server & IT Hub', sisaSaku: 300000000 },
    ];

    // Handler Perubahan Data Informasi Utama
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handler Tambah Baris Komponen Baru
    const addRow = () => {
        const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
        setItems([...items, { id: newId, namaItem: '', volume: 0, satuan: 'Pcs', hargaSatuan: 0, total: 0 }]);
    };

    // Handler Hapus Baris Komponen
    const removeRow = (id) => {
        if (items.length === 1) return; // Sisakan minimal 1 baris
        setItems(items.filter(item => item.id !== id));
    };

    // Handler Perubahan Nilai di Dalam Baris (Volume x Harga Satuan)
    const handleItemChange = (id, field, value) => {
        const updatedItems = items.map(item => {
            if (item.id === id) {
                const updatedItem = { ...item, [field]: value };
                
                // Kalkulasi otomatis subtotal item baris tersebut
                if (field === 'volume' || field === 'hargaSatuan') {
                    const vol = field === 'volume' ? Number(value) : Number(item.volume);
                    const harga = field === 'hargaSatuan' ? Number(value) : Number(item.hargaSatuan);
                    updatedItem.total = vol * harga;
                }
                return updatedItem;
            }
            return item;
        });
        setItems(updatedItems);
    };

    // Hitung Akumulasi Grand Total Belanja Lapangan
    const calculateGrandTotal = () => {
        return items.reduce((sum, item) => sum + (item.total || 0), 0);
    };

    // Helper Format Rupiah untuk Tampilan
    const formatRupiah = (angka) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(angka);
    };

    // Cari tahu info RAB yang sedang dipilih user
    const selectedRab = dummyRabList.find(r => r.id === formData.rabId);

    // Handler Submit Kirim Data Form
    const handleSubmit = (e) => {
        e.preventDefault();
        const fullPayload = {
            ...formData,
            items: items,
            grandTotal: calculateGrandTotal()
        };
        
        console.log('Data Realisasi Budget Payload:', fullPayload);
        alert('Realisasi budget berhasil disimpan!');
        navigate(-1);
    };

    return (
        <PortalLayout>
            <div className="space-y-6">
                
                {/* 1. HEADER HALAMAN & BREADCRUMBS */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Realisasi Budget
                        </h1>

                        <div className="flex items-center gap-2 mt-1 text-sm">
                            <span className="text-gray-400">Budget & RAB</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-gray-400">Realisasi Budget</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-blue-600 font-medium">Buat Realisasi Budget</span>
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
                    
                    {/* Panel Informasi Utama Realisasi */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
                        <h3 className="text-base font-bold text-gray-800 border-b border-gray-100 pb-3">
                            Informasi Dokumen Pengeluaran
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm text-gray-600 mb-2">
                                    Kode Realisasi
                                </label>
                                <input
                                    type="text"
                                    name="kodeRealisasi"
                                    placeholder='[AUTO GENERATE]'
                                    readOnly
                                    className="w-full h-11 rounded-lg bg-gray-50 border border-gray-300 px-4 text-sm text-gray-500 cursor-not-allowed outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 mb-2">
                                    Tanggal Realisasi <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    name="tanggalRealisasi"
                                    value={formData.tanggalRealisasi}
                                    onChange={handleFormChange}
                                    required
                                    className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm focus:border-blue-500 outline-none transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 mb-2">
                                    Project RAB <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="rabId"
                                    value={formData.rabId}
                                    onChange={handleFormChange}
                                    required
                                    className="w-full h-11 px-3 border border-gray-300 rounded-lg text-sm focus:border-blue-500 outline-none bg-white transition"
                                >
                                    <option value="">-- Choose Option --</option>
                                    {dummyRabList.map(rab => (
                                        <option key={rab.id} value={rab.id}>
                                            {rab.kodeRab} - {rab.namaProject}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Banner Informasi Sisa Saldo RAB jika RAB dipilih */}
                        {selectedRab && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between text-sm mt-2">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-500 rounded-lg text-white">
                                        <Coins className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-xs">Sisa Kuota Anggaran pada {selectedRab.kodeRab}:</p>
                                        <p className="font-semibold text-gray-900 mt-0.5">{selectedRab.namaProject}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="font-bold text-blue-700 text-base">
                                        {formatRupiah(selectedRab.sisaSaku)}
                                    </span>
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm text-gray-600 mb-2">
                                Keterangan / Deskripsi Lapangan
                            </label>
                            <textarea
                                name="keterangan"
                                rows={2}
                                value={formData.keterangan}
                                onChange={handleFormChange}
                                placeholder="Tulis catatan umum pengeluaran lapangan..."
                                className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 outline-none transition resize-none placeholder-gray-400"
                            />
                        </div>
                    </div>

                    {/* Panel Komponen Breakdown Penggunaan Anggaran */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                            <h3 className="text-base font-bold text-gray-800">
                                Rincian Komponen Penggunaan Anggaran
                            </h3>
                            
                            <button
                                type="button"
                                onClick={addRow}
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
                                        <th className="px-4 py-3 text-left min-w-[280px]">Nama Item Component / Alokasi</th>
                                        <th className="px-4 py-3 text-left w-24">Volume</th>
                                        <th className="px-4 py-3 text-left w-28">Satuan</th>
                                        <th className="px-4 py-3 text-left w-48">Harga Satuan (Rp)</th>
                                        <th className="px-4 py-3 text-left w-48">Total Harga</th>
                                        <th className="px-4 py-3 text-center w-12">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {items.map((item, index) => (
                                        <tr key={item.id} className="hover:bg-gray-50/40 transition-colors">
                                            <td className="px-4 py-3 text-gray-500 text-center font-medium">
                                                {index + 1}
                                            </td>
                                            <td className="px-3 py-2">
                                                <input 
                                                    type="text"
                                                    required
                                                    placeholder="Contoh: Belanja Kayu Usuk, Upah Tukang Harian"
                                                    value={item.namaItem}
                                                    onChange={(e) => handleItemChange(item.id, 'namaItem', e.target.value)}
                                                    className="w-full h-9 px-3 border border-gray-300 rounded focus:border-blue-500 outline-none text-xs"
                                                />
                                            </td>
                                            <td className="px-3 py-2">
                                                <input 
                                                    type="number"
                                                    required
                                                    min="1"
                                                    placeholder="0"
                                                    value={item.volume || ''}
                                                    onChange={(e) => handleItemChange(item.id, 'volume', e.target.value)}
                                                    className="w-full h-9 px-3 border border-gray-300 rounded focus:border-blue-500 outline-none text-xs text-center"
                                                />
                                            </td>
                                            <td className="px-3 py-2">
                                                <input 
                                                    type="text"
                                                    required
                                                    placeholder="M3 / Sak / Pcs"
                                                    value={item.satuan}
                                                    onChange={(e) => handleItemChange(item.id, 'satuan', e.target.value)}
                                                    className="w-full h-9 px-3 border border-gray-300 rounded focus:border-blue-500 outline-none text-xs text-center uppercase"
                                                />
                                            </td>
                                            <td className="px-3 py-2">
                                                <input 
                                                    type="number"
                                                    required
                                                    min="0"
                                                    placeholder="0"
                                                    value={item.hargaSatuan || ''}
                                                    onChange={(e) => handleItemChange(item.id, 'hargaSatuan', e.target.value)}
                                                    className="w-full h-9 px-3 border border-gray-300 rounded focus:border-blue-500 outline-none text-xs font-medium"
                                                />
                                            </td>
                                            <td className="px-4 py-3 text-xs font-semibold text-gray-900 align-middle">
                                                {formatRupiah(item.total)}
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <button
                                                    type="button"
                                                    onClick={() => removeRow(item.id)}
                                                    disabled={items.length === 1}
                                                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition disabled:opacity-30 disabled:cursor-not-allowed"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Panel Ringkasan Grand Total */}
                        <div className="bg-gray-50 p-4 border border-gray-200 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <span className="text-xs text-gray-500 italic">
                                Pastikan pengeluaran tidak melebihi sisa saku pagu proyek.
                            </span>
                            <div className="flex items-center gap-4 self-end sm:self-auto">
                                <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                                    Grand Total Realisasi:
                                </span>
                                <span className="text-lg font-bold text-blue-600">
                                    {formatRupiah(calculateGrandTotal())}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* FORM ACTIONS */}
                    <div className="flex items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="px-5 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-600 bg-white hover:bg-gray-50 transition"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition shadow-sm"
                        >
                            <Save size={16} />
                            Simpan Realisasi
                        </button>
                    </div>

                </form>

            </div>
        </PortalLayout>
    );
}