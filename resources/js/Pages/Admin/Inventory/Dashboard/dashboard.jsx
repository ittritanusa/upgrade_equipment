import React, { useState } from 'react';
import PortalLayout from '@/Pages/Layouts/PortalLayout';

import {
    Boxes,
    Package,
    AlertTriangle,
    TrendingUp,
    TrendingDown,
    ArrowUpRight,
    ArrowDownLeft,
    RefreshCw,
    MapPin,
    Layers,
    FileBarChart2
} from 'lucide-react';

export default function InventoryDashboard() {
    // ==========================================
    // SIMULASI DATA METRIK DASHBOARD INVENTORY
    // ==========================================
    const [warehouseStats] = useState({
        totalSku: 1240,
        totalItemKuantitas: 45230,
        lowStockAlert: 14,
        deadStockAlert: 8,
        occupancyRate: 78.5, // % Kapasitas Gudang Terpakai
    });

    // Simulasi data pergerakan barang terbaru (Gudang Logistik)
    const [recentMovements] = useState([
        { id: 1, kodeDoc: 'GRN/2026/05/044', tipe: 'Masuk', asalTujuan: 'CV. TechMedia Nusantara', qty: 3, item: 'Server HPE ProLiant', waktu: '10 Menit yang lalu' },
        { id: 2, kodeDoc: 'TO/2026/05/112', tipe: 'Keluar', asalTujuan: 'Divisi IT (Internal)', qty: 5, item: 'Laptop ASUS ExpertBook', waktu: '1 Jam yang lalu' },
        { id: 3, kodeDoc: 'GRN/2026/05/043', tipe: 'Masuk', asalTujuan: 'PT. Computindo Utama', qty: 50, item: 'Kabel LAN Cat6 UTP', waktu: '3 Jam yang lalu' },
        { id: 4, kodeDoc: 'DO/2026/05/089', tipe: 'Keluar', asalTujuan: 'Kantor Cabang Bandung', qty: 12, item: 'Meja Kerja Staff', waktu: 'Yesterday' }
    ]);

    // Simulasi Barang Kritis (Hampir Habis / Reorder Level)
    const [criticalStocks] = useState([
        { id: 301, sku: 'SKU-IT-UPS-003', nama: 'UPS APC Smart-UPS 3000VA', stockAktif: 2, minStock: 5, lokasi: 'Rak A-02' },
        { id: 302, sku: 'SKU-GA-MTR-012', nama: 'Tinta Printer Epson L-Series Black', stockAktif: 8, minStock: 20, lokasi: 'Rak C-05' },
        { id: 303, sku: 'SKU-IT-WAF-001', nama: 'Fortinet Firewall 60F', stockAktif: 1, minStock: 3, lokasi: 'Locker Khusus' }
    ]);

    // Helper formatting angka standard
    const formatNumber = (num) => new Intl.NumberFormat('id-ID').format(num);

    return (
        <PortalLayout>
            <div className="space-y-6">
                
                {/* 1. HEADER HALAMAN & OPERASIONAL INFO */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Inventory & Warehouse Dashboard
                        </h1>
                        <div className="flex items-center gap-2 mt-1 text-sm">
                            <span className="text-gray-400">Inventory & Warehouse</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-blue-600 font-medium">Ringkasan Eksekutif</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-500 bg-white border border-gray-200 rounded-lg p-2 shadow-sm self-start sm:self-auto">
                        <MapPin size={14} className="text-red-500" />
                        <span className="font-bold text-gray-700">Gudang Utama:</span> Central Logistics Center (CLC)
                    </div>
                </div>

                {/* 2. STATS OVERVIEW CARDS (METRIK KUNCI) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    
                    {/* Card 1: Total SKU */}
                    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex items-center justify-between">
                        <div>
                            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Total SKU Terdaftar</span>
                            <span className="text-2xl font-black text-gray-900 mt-1 block">
                                {formatNumber(warehouseStats.totalSku)}
                            </span>
                        </div>
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                            <Boxes size={22} />
                        </div>
                    </div>

                    {/* Card 2: Total Items Qty */}
                    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex items-center justify-between">
                        <div>
                            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Total Volume Kuantitas</span>
                            <span className="text-2xl font-black text-slate-800 mt-1 block">
                                {formatNumber(warehouseStats.totalItemKuantitas)} <span className="text-xs font-medium text-gray-400">Pcs</span>
                            </span>
                        </div>
                        <div className="p-3 bg-slate-100 text-slate-700 rounded-xl">
                            <Package size={22} />
                        </div>
                    </div>

                    {/* Card 3: Alert Low Stock */}
                    <div className={`bg-white border rounded-xl p-5 shadow-sm flex items-center justify-between border-l-4 ${
                        warehouseStats.lowStockAlert > 0 ? 'border-l-amber-500' : 'border-gray-200'
                    }`}>
                        <div>
                            <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider block">Stok Menipis (Reorder)</span>
                            <span className="text-2xl font-black text-amber-700 mt-1 block">
                                {warehouseStats.lowStockAlert} <span className="text-xs font-bold text-gray-400">SKU</span>
                            </span>
                        </div>
                        <div className="p-3 bg-amber-50 text-amber-500 rounded-xl">
                            <AlertTriangle size={22} />
                        </div>
                    </div>

                    {/* Card 4: Warehouse Capacity Utilisation */}
                    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Kapasitas Rak Terpakai</span>
                            <span className="text-xs font-bold text-blue-600">{warehouseStats.occupancyRate}%</span>
                        </div>
                        <span className="text-xl font-extrabold text-gray-900 mt-1 block">Sisa 21.5% Ruang</span>
                        {/* Progress Bar Mini */}
                        <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2.5">
                            <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${warehouseStats.occupancyRate}%` }}></div>
                        </div>
                    </div>

                </div>

                {/* 3. GRID UTAMA MONITORING (TABEL KRITIS & REAL-TIME LOG) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* LEFT / CENTER TWO-THIRDS COLUMN: STOK KRITIS */}
                    <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                            <div className="flex items-center gap-2">
                                <AlertTriangle size={18} className="text-red-500" />
                                <h3 className="text-base font-bold text-gray-800">Daftar Item Dibawah Batas Minimum (Reorder Alert)</h3>
                            </div>
                            <span className="text-[11px] font-semibold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded animate-pulse">Tindakan Segera</span>
                        </div>

                        <div className="overflow-x-auto border border-gray-200 rounded-xl">
                            <table className="min-w-full text-sm">
                                <thead className="bg-gray-50 text-gray-700 font-semibold border-b border-gray-200">
                                    <tr>
                                        <th className="px-4 py-3 text-left w-36">Kode SKU</th>
                                        <th className="px-4 py-3 text-left">Deskripsi Barang</th>
                                        <th className="px-4 py-3 text-center w-28">Stok Saat Ini</th>
                                        <th className="px-4 py-3 text-center w-24">Min. Batas</th>
                                        <th className="px-4 py-3 text-left w-28">Lokasi Rak</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white text-xs text-gray-700">
                                    {criticalStocks.map((item) => (
                                        <tr key={item.id} className="hover:bg-red-50/10 transition-colors">
                                            <td className="px-4 py-3.5 font-bold text-gray-500 tracking-wide">{item.sku}</td>
                                            <td className="px-4 py-3.5 font-bold text-gray-900">{item.nama}</td>
                                            <td className="px-4 py-3.5 text-center font-black text-red-600 bg-red-50/40 text-sm">{item.stockAktif}</td>
                                            <td className="px-4 py-3.5 text-center font-semibold text-gray-400">{item.minStock}</td>
                                            <td className="px-4 py-3.5 font-medium text-gray-600">
                                                <span className="inline-flex items-center gap-1"><Layers size={12} className="text-blue-500" /> {item.lokasi}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* RIGHT ONE-THIRD COLUMN: LOG PERGERAKAN TERBARU */}
                    <div className="lg:col-span-1 bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
                        <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                            <RefreshCw size={16} className="text-blue-600 animate-spin-slow" />
                            <h3 className="text-sm font-bold text-gray-800">Aktivitas Keluar-Masuk Terakhir</h3>
                        </div>

                        <div className="flow-root">
                            <ul className="-mb-8">
                                {recentMovements.map((movement, movementIdx) => (
                                    <li key={movement.id}>
                                        <div className="relative pb-6">
                                            {movementIdx !== recentMovements.length - 1 ? (
                                                <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                                            ) : null}
                                            <div className="relative flex space-x-3 text-xs">
                                                <div>
                                                    <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                                                        movement.tipe === 'Masuk' ? 'bg-emerald-50 text-emerald-600' : 'bg-indigo-50 text-indigo-600'
                                                    }`}>
                                                        {movement.tipe === 'Masuk' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                                                    </span>
                                                </div>
                                                <div className="flex-1 min-w-0 pt-1.5 flex justify-between space-x-4">
                                                    <div>
                                                        <p className="font-bold text-gray-900 text-xs">{movement.item} <span className="font-black">({movement.qty} Pcs)</span></p>
                                                        <p className="text-[11px] text-gray-400 mt-0.5">Ref: <span className="font-semibold text-gray-600">{movement.kodeDoc}</span></p>
                                                        <p className="text-[10px] text-gray-400 italic mt-0.5">Ket: {movement.asalTujuan}</p>
                                                    </div>
                                                    <div className="text-right text-[10px] whitespace-nowrap text-gray-400 font-medium">
                                                        {movement.waktu}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                </div>

                {/* 4. SHORTCUT PANEL MENU GUDANG */}
                <div className="bg-slate-900 text-white rounded-xl p-5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-slate-800 border border-slate-700 rounded-xl text-blue-400">
                            <FileBarChart2 size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-sm">Butuh melakukan pencatatan fisik stok opname atau pelacakan kartu stok?</h4>
                            <p className="text-xs text-slate-400 mt-0.5">Gunakan jalan pintas menu di samping kanan untuk mempercepat verifikasi mutasi barang.</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 w-full md:w-auto justify-end">
                        <button type="button" className="h-9 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold border border-slate-700 transition">
                            Mutasi Barang (In/Out)
                        </button>
                        <button type="button" className="h-9 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-xs font-bold transition">
                            Mulai Stock Opname
                        </button>
                    </div>
                </div>

            </div>
        </PortalLayout>
    );
}