import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';

import {
    Plus,
    Eye,
    Pencil,
    Download,
    Search,
    SlidersHorizontal,
    Trash2,
    ChevronLeft,
    ChevronRight,
    Briefcase,
    Wallet,
    CheckCircle2,
    FileEdit,
    TrendingUp,
    AlertCircle
} from 'lucide-react';

export default function RealisasiBudget() {
    const navigate = useNavigate();
    
    // State dummy untuk search dan filter
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    // Summary Cards khusus untuk Realisasi Lapangan
    const stats = [
        { title: 'Total Alokasi RAB', value: 'Rp 4.250.000.000', icon: Wallet, color: 'text-blue-600', bg: 'bg-blue-50' },
        { title: 'Total Realisasi Lapangan', value: 'Rp 1.820.000.000', icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50' },
        { title: 'Sisa Saldo Anggaran', value: 'Rp 2.430.000.000', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { title: 'Item Realisasi', value: '24 Transaksi', icon: Briefcase, color: 'text-purple-600', bg: 'bg-purple-50' },
    ];

    // Dummy data untuk pengeluaran / realisasi di lapangan
    const realisasiData = [
        { id: 1, kodeRealisasi: 'REA/AGS/USR/0526/0005', kodeRab: 'RAB/AGS/USR/0526/0001', namaProject: 'Pembangunan Cluster Azure', budgetRab: 'Rp 1.500.000.000', realisasi: 'Rp 250.000.000', status: 'APPROVE', tanggal: '27 Mei 2026' },
        { id: 2, kodeRealisasi: 'REA/AGS/USR/0526/0004', kodeRab: 'RAB/AGS/USR/0526/0002', namaProject: 'Renovasi Gedung Kantor Pusat', budgetRab: 'Rp 750.000.000', realisasi: 'Rp 120.000.000', status: 'OPEN', tanggal: '26 Mei 2026' },
        { id: 3, kodeRealisasi: 'REA/AGS/USR/0526/0003', kodeRab: 'RAB/AGS/USR/0526/0003', namaProject: 'Pembangunan Cluster Azure', budgetRab: 'Rp 1.500.000.000', realisasi: 'Rp 85.000.000', status: 'APPROVE', tanggal: '24 Mei 2026' },
        { id: 4, kodeRealisasi: 'REA/AGS/USR/0526/0002', kodeRab: 'RAB/AGS/USR/0526/0004', namaProject: 'Pengadaan Server & IT Hub', budgetRab: 'Rp 450.000.000', realisasi: 'Rp 150.000.000', status: 'APPROVE', tanggal: '22 Mei 2026' },
        { id: 5, kodeRealisasi: 'REA/AGS/USR/0526/0001', kodeRab: 'RAB/AGS/USR/0526/0005', namaProject: 'Instalasi Listrik Kawasan B', budgetRab: 'Rp 350.000.000', realisasi: 'Rp 95.000.000', status: 'REJECTED', tanggal: '20 Mei 2026' },
    ];

    const getStatusBadge = (status) => {
        switch (status) {
            case 'APPROVE':
                return <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-green-50 text-green-700 border border-green-200">APPROVED</span>;
            case 'REJECTED':
                return <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-red-50 text-red-700 border border-red-200">REJECTED</span>;
            default:
                return <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 text-slate-700 border border-slate-200">PENDING</span>;
        }
    };

    return (
        <PortalLayout>
            <div className="space-y-6 max-w-[1600px] mx-auto p-2">
                
                {/* 1. HEADER HALAMAN & ACTION BUTTONS */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                            Realisasi Budget
                        </h1>
                        <div className="flex items-center gap-2 mt-1 text-xs sm:text-sm">
                            <span className="text-gray-400">Budget & RAB</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-gray-400">Realisasi Budget</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-blue-600 font-medium">List Data</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((item, index) => {
                        const IconComponent = item.icon;
                        return (
                            <div key={index} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                                <div className="space-y-1">
                                    <span className="text-xs font-medium text-gray-400 block">{item.title}</span>
                                    <span className="text-lg sm:text-xl font-bold text-gray-900 block">{item.value}</span>
                                </div>
                                <div className={`p-3 rounded-xl ${item.bg}`}>
                                    <IconComponent className={`w-5 h-5 ${item.color}`} />
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-5">
                    
                    {/* Top Action Data List */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-5">
                        <h2 className="text-lg font-semibold text-gray-800">
                            List Data
                        </h2>

                        <button
                            onClick={() => navigate('/portal/budget/realisasi/create')}
                            className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
                        >
                            <Plus size={16} />
                            Tambah
                        </button>
                    </div>

                    {/* Table Internal Utility Filters */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <span>Tampilkan</span>
                            <select className="h-10 rounded-lg border border-gray-300 px-3 text-sm">
                                <option>10</option>
                                <option>25</option>
                                <option>50</option>
                            </select>
                            <span>data</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-600">Cari Data</span>
                            <input
                                type="text"
                                placeholder="Ketik kata kunci..."
                                className="h-10 rounded-lg border border-gray-300 px-3 text-sm w-56 outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* Main Table Area (Responsive Wrapper) */}
                    <div className="overflow-x-auto border border-gray-200 rounded-xl">
                        <table className="min-w-full text-sm">
                            <thead className="bg-gray-100">
                                <tr className="text-gray-700">
                                    <th className="py-4 px-6">KODE REALISASI</th>
                                    <th className="py-4 px-6">REF. KODE RAB</th>
                                    <th className="py-4 px-6">NAMA PROYEK</th>
                                    <th className="py-4 px-6">TOTAL BUDGET RAB</th>
                                    <th className="py-4 px-6">NILAI REALISASI</th>
                                    <th className="py-4 px-6 text-center">STATUS</th>
                                    <th className="py-4 px-6 text-center">AKSI</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200 bg-white">
                                {realisasiData.map((row) => (
                                    <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="py-4 px-6 font-bold text-gray-900">{row.kodeRealisasi}</td>
                                        <td className="py-4 px-6 font-semibold text-blue-600">{row.kodeRab}</td>
                                        <td className="py-4 px-6 font-medium text-gray-800 max-w-[200px] truncate">
                                            {row.namaProject}
                                        </td>
                                        <td className="py-4 px-6 text-gray-400 font-medium">{row.budgetRab}</td>
                                        <td className="py-4 px-6 font-bold text-amber-600">{row.realisasi}</td>
                                        <td className="py-4 px-6 text-center">{getStatusBadge(row.status)}</td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center justify-center gap-2">
                                                <button 
                                                    onClick={() => navigate(`/portal/budget/realisasi/detail`)}
                                                    className="text-blue-600 hover:text-blue-800 p-0.5 transition"
                                                    title="Lihat Detail"
                                                >
                                                    <Eye size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Footer */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-5">
                        <p className="text-sm text-gray-500">
                            Menampilkan 1-3 dari {realisasiData.length} data
                        </p>

                        <div className="flex items-center gap-2">
                            <button className="h-9 px-3 rounded-lg border border-gray-300 text-sm text-gray-500 hover:bg-gray-100 transition disabled:opacity-50" disabled>
                                Kembali
                            </button>

                            <button className="h-9 w-9 rounded-lg bg-blue-600 text-white text-sm font-medium shadow-sm">
                                1
                            </button>

                            <button className="h-9 px-3 rounded-lg border border-gray-300 text-sm text-gray-500 hover:bg-gray-100 transition">
                                Lanjut
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        </PortalLayout>
    );
}