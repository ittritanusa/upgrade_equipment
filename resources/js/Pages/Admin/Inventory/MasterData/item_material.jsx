import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';

import {
    Search,
    SlidersHorizontal,
    Plus,
    Layers,
    Tag,
    Edit2,
    Eye,
    Package,
    AlertCircle,
    CheckCircle2,
    ArrowUpRight
} from 'lucide-react';

export default function MasterItemMaterialList() {
    const navigate = useNavigate();

    // ==========================================
    // SIMULASI DATA MASTER ITEM & MATERIAL
    // ==========================================
    const [masterItems] = useState([
        {
            id: 1,
            sku: 'SKU-IT-SRV-001',
            namaItem: 'HPE ProLiant DL380 Gen10 Server',
            kategori: 'Teknologi Informasi',
            satuanBesar: 'Unit',
            stokAktif: 4,
            reorderLevel: 2, // Batas aman minimum stok
            lokasiRak: 'Rak A-01',
            status: 'Aktif'
        },
        {
            id: 2,
            sku: 'SKU-IT-UPS-003',
            namaItem: 'UPS APC Smart-UPS 3000VA Rackmount',
            kategori: 'Teknologi Informasi',
            satuanBesar: 'Unit',
            stokAktif: 2,
            reorderLevel: 5, // Stok aktif < reorderLevel (Warning)
            lokasiRak: 'Rak A-02',
            status: 'Aktif'
        },
        {
            id: 3,
            sku: 'SKU-GA-MTR-012',
            namaItem: 'Tinta Printer Epson L-Series Black',
            kategori: 'GA & GA Logistik',
            satuanBesar: 'Botol',
            stokAktif: 45,
            reorderLevel: 20,
            lokasiRak: 'Rak C-05',
            status: 'Aktif'
        },
        {
            id: 4,
            sku: 'SKU-GA-FUR-088',
            namaItem: 'Meja Kerja Staff Standar Wood',
            kategori: 'GA & GA Logistik',
            satuanBesar: 'Unit',
            stokAktif: 0,
            reorderLevel: 5, // Out of Stock
            lokasiRak: 'Area B-Gudang 2',
            status: 'Non-Aktif'
        }
    ]);

    // State Kontrol Pencarian dan Filter
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('Semua');

    // Helper Badge Kondisi Stok vs Reorder Level
    const renderStockStatusBadge = (stok, limit) => {
        if (stok === 0) {
            return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-red-100 text-red-700 text-[11px] font-bold">Habis</span>;
        } else if (stok <= limit) {
            return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-100 text-amber-700 text-[11px] font-bold animate-pulse">Restock</span>;
        }
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 text-[11px] font-bold">Aman</span>;
    };

    // Logika Pemfilteran Data Master Item
    const filteredItems = masterItems.filter(item => {
        const matchesSearch = item.sku.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              item.namaItem.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              item.lokasiRak.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'Semua' || item.kategori === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    return (
        <PortalLayout>
            <div className="space-y-6">
                
                {/* 1. HEADER HALAMAN & BREADCRUMBS */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Master Item & Material
                        </h1>

                        <div className="flex items-center gap-2 mt-1 text-sm">
                            <span className="text-gray-400">Inventory & Warehouse</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-blue-600 font-medium">Master Data Item</span>
                        </div>
                    </div>

                    {/* Tombol Tambah Item Baru */}
                    <button
                        type="button"
                        onClick={() => navigate('/portal/inventory/master-item/create')}
                        className="inline-flex items-center gap-2 h-10 px-4 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition shadow-sm self-start sm:self-auto"
                    >
                        <Plus size={16} />
                        Tambah Item Baru
                    </button>
                </div>

                {/* 2. SUMMARY COUNTER MINIPANEL */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Total SKU</span>
                        <span className="text-xl font-black text-gray-900 mt-0.5 block">{masterItems.length} Item</span>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm border-l-4 border-l-amber-500">
                        <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">Butuh Order Ulang</span>
                        <span className="text-xl font-black text-amber-700 mt-0.5 block">
                            {masterItems.filter(i => i.stokAktif <= i.reorderLevel && i.stokAktif > 0).length} SKU
                        </span>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm border-l-4 border-l-red-500">
                        <span className="text-xs font-bold text-red-600 uppercase tracking-wider block">Stok Kosong</span>
                        <span className="text-xl font-black text-red-700 mt-0.5 block">
                            {masterItems.filter(i => i.stokAktif === 0).length} SKU
                        </span>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Kategori Terbanyak</span>
                        <span className="text-xl font-bold text-blue-600 mt-0.5 block">IT Perangkat</span>
                    </div>
                </div>

                {/* 3. FILTER & BAR CONTROLS */}
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="relative w-full md:w-80">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                            <Search size={16} />
                        </span>
                        <input
                            type="text"
                            placeholder="Cari SKU, Nama Barang, atau Rak..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full h-10 pl-9 pr-4 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 transition"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                            <SlidersHorizontal size={14} /> Departemen / Kategori:
                        </div>
                        
                        <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
                            {['Semua', 'Teknologi Informasi', 'GA & GA Logistik'].map((cat) => (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => setCategoryFilter(cat)}
                                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                                        categoryFilter === cat
                                            ? 'bg-white text-blue-600 shadow-sm'
                                            : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                >
                                    {cat === 'Semua' ? 'Semua' : cat === 'Teknologi Informasi' ? 'IT' : 'GA'}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 4. TABEL UTAMA DATA MASTER ITEM & MATERIAL */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead className="bg-gray-50 text-gray-700 font-semibold border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3.5 text-left w-40">Nomor SKU</th>
                                    <th className="px-6 py-3.5 text-left">Nama Deskripsi Item</th>
                                    <th className="px-6 py-3.5 text-left w-48">Kategori Kelompok</th>
                                    <th className="px-6 py-3.5 text-center w-32">Stok Gudang</th>
                                    <th className="px-6 py-3.5 text-center w-32">Min. Reorder</th>
                                    <th className="px-6 py-3.5 text-center w-36">Tata Letak Rak</th>
                                    <th className="px-6 py-3.5 text-center w-28">Kondisi</th>
                                    <th className="px-6 py-3.5 text-center w-28">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white text-xs text-gray-700">
                                {filteredItems.length > 0 ? (
                                    filteredItems.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50/40 transition-colors">
                                            {/* SKU */}
                                            <td className="px-6 py-4 font-mono font-bold text-gray-900 tracking-wide">
                                                {item.sku}
                                            </td>
                                            {/* Nama Barang */}
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-gray-800 text-sm">{item.namaItem}</div>
                                                <div className="text-[10px] text-gray-400 mt-0.5">Satuan Terkecil: {item.satuanBesar}</div>
                                            </td>
                                            {/* Kategori */}
                                            <td className="px-6 py-4 text-gray-500 font-medium">
                                                <span className="inline-flex items-center gap-1">
                                                    <Tag size={12} className="text-gray-400" />
                                                    {item.kategori}
                                                </span>
                                            </td>
                                            {/* Stok Aktif */}
                                            <td className="px-6 py-4 text-center">
                                                <span className={`text-sm font-black ${item.stokAktif === 0 ? 'text-red-600' : 'text-gray-900'}`}>
                                                    {item.stokAktif}
                                                </span>{' '}
                                                <span className="text-[11px] font-medium text-gray-400">{item.satuanBesar}</span>
                                            </td>
                                            {/* Minimum Limit */}
                                            <td className="px-6 py-4 text-center font-semibold text-gray-400">
                                                {item.reorderLevel} {item.satuanBesar}
                                            </td>
                                            {/* Lokasi Rak */}
                                            <td className="px-6 py-4 text-center text-gray-600 font-bold">
                                                <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 px-2 py-1 rounded text-[11px]">
                                                    <Layers size={12} className="text-blue-500" />
                                                    {item.lokasiRak}
                                                </span>
                                            </td>
                                            {/* Kondisi Alert Status */}
                                            <td className="px-6 py-4 text-center">
                                                {renderStockStatusBadge(item.stokAktif, item.reorderLevel)}
                                            </td>
                                            {/* Akses Tombol Edit / Detail */}
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex items-center justify-center gap-1.5">
                                                    <button
                                                        type="button"
                                                        onClick={() => navigate(`/portal/inventory/master-item/edit`)}
                                                        className="h-8 w-8 rounded border border-gray-300 text-gray-600 bg-white hover:bg-gray-50 transition flex items-center justify-center"
                                                        title="Edit Parameter Data Item"
                                                    >
                                                        <Edit2 size={13} />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => navigate(`/portal/inventory/master-item/detail`)}
                                                        className="h-8 w-8 rounded border border-gray-300 text-gray-500 bg-white hover:bg-gray-50 transition flex items-center justify-center"
                                                        title="Lihat Log Kartu Stok Lengkap"
                                                    >
                                                        <Eye size={13} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="px-6 py-12 text-center text-gray-400 italic">
                                            Tidak ada data material atau SKU item yang cocok dengan kriteria filter saat ini.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </PortalLayout>
    );
}