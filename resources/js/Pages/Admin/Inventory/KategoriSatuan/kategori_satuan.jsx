import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';

import {
    Plus,
    FolderTree,
    Scale,
    Edit2,
    Trash2,
    CheckCircle2,
    Info,
    Layers,
    Tag
} from 'lucide-react';

export default function CategoryUnitConfiguration() {
    const navigate = useNavigate();
    // ==========================================
    // SIMULASI DATA PARAMETER 1: KATEGORI BARANG
    // ==========================================
    const [categories, setCategories] = useState([
        { id: 1, nama: 'Teknologi Informasi', kode: 'CAT-IT', totalSku: 412, status: 'Aktif' },
        { id: 2, nama: 'GA & GA Logistik', kode: 'CAT-GA', totalSku: 680, status: 'Aktif' },
        { id: 3, nama: 'Elektrikal & Mekanikal', kode: 'CAT-ME', totalSku: 148, status: 'Aktif' },
        { id: 4, nama: 'Alat Tulis Kantor', kode: 'CAT-ATK', totalSku: 0, status: 'Non-Aktif' }
    ]);

    // ==========================================
    // SIMULASI DATA PARAMETER 2: SATUAN BARANG (UOM)
    // ==========================================
    const [units, setUnits] = useState([
        { id: 501, namaSatuan: 'Pieces', lambang: 'Pcs', keterangan: 'Satuan unit terkecil hitungan tunggal', tipe: 'Kuantitas' },
        { id: 502, namaSatuan: 'Unit', lambang: 'Unit', keterangan: 'Satuan untuk perangkat elektronik/mesin utuh', tipe: 'Kuantitas' },
        { id: 503, namaSatuan: 'Box', lambang: 'Box', keterangan: 'Kotak kardus kemasan sedang', tipe: 'Kemasan' },
        { id: 504, namaSatuan: 'Roll', lambang: 'Roll', keterangan: 'Gulungan material kabel atau pita', tipe: 'Dimensi/Panjang' }
    ]);

    // Handler sederhana aksi (Placeholder integrasi API backend)
    const handleActionAlert = (fitur, nama) => {
        alert(`Modul konfigurasi [${fitur}] untuk item "${nama}" dipicu.`);
    };

    return (
        <PortalLayout>
            <div className="space-y-6">
                
                {/* 1. HEADER HALAMAN & RUANG INFORMASI */}
                <div className="border-b border-gray-100 pb-4">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Manajemen Kategori & Satuan Ukur
                    </h1>
                    <div className="flex items-center gap-2 mt-1 text-sm">
                        <span className="text-gray-400">Inventory & Warehouse</span>
                        <span className="text-gray-300">/</span>
                        <span className="text-gray-400">Konfigurasi Sistem</span>
                        <span className="text-gray-300">/</span>
                        <span className="text-blue-600 font-medium">Kategori & Satuan</span>
                    </div>
                </div>

                {/* BOARD PANDUAN PENGGUNA */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs text-gray-600 flex items-start gap-3 shadow-sm">
                    <Info size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="leading-relaxed">
                        Halaman parameter ini mengatur standarisasi input pada pembuatan <strong>Master Item & Material</strong>. Pastikan tidak menghapus kategori atau satuan yang sudah memiliki tautan SKU aktif agar tidak merusak relasi pelacakan log transaksi kartu stok gudang.
                    </p>
                </div>

                {/* 2. SPLIT GRID CONTENT: KATEGORI VS SATUAN */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    {/* --- SEKSI KIRI: MANAGEMENT KATEGORI (SPAN 7) --- */}
                    <div className="lg:col-span-7 bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                            <div className="flex items-center gap-2">
                                <FolderTree size={18} className="text-blue-600" />
                                <h2 className="text-base font-bold text-gray-800">Hierarki Kategori Kelompok</h2>
                            </div>
                            <button
                                type="button"
                                onClick={() => navigate(`/portal/inventory/category-unit/create-hierarki`)}
                                className="h-8 px-3 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition inline-flex items-center gap-1.5 shadow-sm"
                            >
                                <Plus size={13} /> Tambah Kategori
                            </button>
                        </div>

                        {/* Tabel Kategori */}
                        <div className="overflow-x-auto border border-gray-200 rounded-xl">
                            <table className="min-w-full text-sm">
                                <thead className="bg-gray-50 text-gray-700 font-semibold border-b border-gray-200">
                                    <tr>
                                        <th className="px-4 py-3 text-left w-24">Kode</th>
                                        <th className="px-4 py-3 text-left">Grup Kategori</th>
                                        <th className="px-4 py-3 text-center w-28">Tautan SKU</th>
                                        <th className="px-4 py-3 text-center w-24">Status</th>
                                        <th className="px-4 py-3 text-center w-24">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white text-xs text-gray-700">
                                    {categories.map((cat) => (
                                        <tr key={cat.id} className="hover:bg-gray-50/30 transition-colors">
                                            <td className="px-4 py-3.5 font-mono font-bold text-gray-500 tracking-wider">{cat.kode}</td>
                                            <td className="px-4 py-3.5 font-bold text-gray-900">{cat.nama}</td>
                                            <td className="px-4 py-3.5 text-center font-semibold text-blue-600 bg-blue-50/30 font-mono">
                                                {cat.totalSku} Item
                                            </td>
                                            <td className="px-4 py-3.5 text-center">
                                                <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold ${
                                                    cat.status === 'Aktif' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'
                                                }`}>
                                                    {cat.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3.5 text-center">
                                                <div className="flex items-center justify-center gap-1">
                                                    <button 
                                                        onClick={() => navigate(`/portal/inventory/category-unit/edit-hierarki`)}
                                                        className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-gray-50 rounded transition"
                                                        title="Ubah Kategori"
                                                    >
                                                        <Edit2 size={12} />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleActionAlert('Hapus Kategori', cat.nama)}
                                                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-gray-50 rounded transition"
                                                        disabled={cat.totalSku > 0}
                                                        title={cat.totalSku > 0 ? "Tidak bisa dihapus karena memiliki SKU aktif" : "Hapus Kategori"}
                                                    >
                                                        <Trash2 size={12} className={cat.totalSku > 0 ? 'opacity-30 cursor-not-allowed' : ''} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* --- SEKSI KANAN: MANAGEMENT SATUAN / UOM (SPAN 5) --- */}
                    <div className="lg:col-span-5 bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                            <div className="flex items-center gap-2">
                                <Scale size={18} className="text-blue-600" />
                                <h2 className="text-base font-bold text-gray-800">Unit of Measurement (UOM)</h2>
                            </div>
                            <button
                                type="button"
                                onClick={() => navigate(`/portal/inventory/category-unit/create-satuan`)}
                                className="h-8 px-3 bg-gray-950 text-white rounded-lg text-xs font-bold hover:bg-gray-800 transition inline-flex items-center gap-1.5 shadow-sm"
                            >
                                <Plus size={13} /> Tambah Satuan
                            </button>
                        </div>

                        {/* Tabel Satuan UOM */}
                        <div className="overflow-x-auto border border-gray-200 rounded-xl">
                            <table className="min-w-full text-sm">
                                <thead className="bg-gray-50 text-gray-700 font-semibold border-b border-gray-200">
                                    <tr>
                                        <th className="px-4 py-3 text-left w-20">Unit</th>
                                        <th className="px-4 py-3 text-left">Nama Satuan</th>
                                        <th className="px-4 py-3 text-left w-28">Dimensi Tipe</th>
                                        <th className="px-4 py-3 text-center w-16">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white text-xs text-gray-700">
                                    {units.map((unit) => (
                                        <tr key={unit.id} className="hover:bg-gray-50/30 transition-colors">
                                            <td className="px-4 py-3.5">
                                                <span className="font-mono font-black text-gray-900 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                                                    {unit.lambang}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3.5">
                                                <p className="font-bold text-gray-800">{unit.namaSatuan}</p>
                                                <p className="text-[10px] text-gray-400 mt-0.5 leading-tight">{unit.keterangan}</p>
                                            </td>
                                            <td className="px-4 py-3.5 text-gray-500 font-medium">
                                                <span className="inline-flex items-center gap-1 bg-gray-50 px-1.5 py-0.5 rounded text-[10px]">
                                                    {unit.tipe}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3.5 text-center">
                                                <div className="flex items-center justify-center gap-0.5">
                                                    <button 
                                                        onClick={() => navigate(`/portal/inventory/category-unit/edit-satuan`)}
                                                        className="p-1.5 text-gray-500 hover:text-blue-600 rounded transition"
                                                        title="Ubah Parameter Satuan"
                                                    >
                                                        <Edit2 size={11} />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleActionAlert('Hapus UOM', unit.namaSatuan)}
                                                        className="p-1.5 text-gray-400 hover:text-red-600 rounded transition"
                                                        title="Hapus Satuan"
                                                    >
                                                        <Trash2 size={11} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

            </div>
        </PortalLayout>
    );
}