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
    FileText,
    Clock,
    CheckCircle2,
    Wallet
} from 'lucide-react';

export default function PurchaseRequest() {
    const navigate = useNavigate();

    // Data Purchase Request yang disesuaikan untuk modul Procurement
    const prData = [
        {
            id: 1,
            no: 1,
            kode: 'PR/PROC/AGS/2026/05/001',
            perihal: 'Pengadaan Komputer & Laptop Divisi IT',
            divisi: 'Teknologi Informasi',
            totalNilai: 'Rp 145.000.000',
            tanggal: '24/05/2026',
            status: 'Disetujui',
        },
        {
            id: 2,
            no: 2,
            kode: 'PR/PROC/AGS/2026/05/002',
            perihal: 'Sewa Alat Berat Proyek Gedung Pusat',
            divisi: 'Operasional & Proyek',
            totalNilai: 'Rp 2.400.000.000',
            tanggal: '22/05/2026',
            status: 'Pending',
        },
        {
            id: 3,
            no: 3,
            kode: 'PR/PROC/AGS/2026/05/003',
            perihal: 'Pengadaan ATK & Konsumsi Kantor',
            divisi: 'GA & GA Logistik',
            totalNilai: 'Rp 12.650.000',
            tanggal: '20/05/2026',
            status: 'Draft',
        },
    ];

    // Fungsi helper penentuan warna badge status agar seragam & estetik
    const renderStatusBadge = (status) => {
        switch (status) {
            case 'Disetujui':
                return (
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                        {status}
                    </span>
                );
            case 'Pending':
                return (
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold">
                        {status}
                    </span>
                );
            case 'Draft':
                return (
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold">
                        {status}
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                        {status}
                    </span>
                );
        }
    };

    return (
        <PortalLayout>
            <div className="space-y-6">
                
                {/* 1. HEADER HALAMAN & BREADCRUMBS */}
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Purchase Request
                    </h1>

                    <div className="flex items-center gap-2 mt-1 text-sm">
                        <span className="text-gray-400">Procurement</span>
                        <span className="text-gray-300">/</span>
                        <span className="text-gray-400">Purchase Request</span>
                        <span className="text-gray-300">/</span>
                        <span className="text-blue-600 font-medium">List Data</span>
                    </div>
                </div>

                {/* 2. STATISTIC CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    
                    {/* Card Total PR */}
                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                        <div className="space-y-1">
                            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Total PR Masuk</span>
                            <h3 className="text-2xl font-bold text-gray-900">42</h3>
                            <span className="text-[11px] font-medium text-gray-400 block">Dokumen</span>
                        </div>
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                            <FileText size={20} />
                        </div>
                    </div>

                    {/* Card PR Disetujui */}
                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                        <div className="space-y-1">
                            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">PR Disetujui</span>
                            <h3 className="text-2xl font-bold text-gray-900">28</h3>
                            <span className="text-[11px] font-medium text-gray-400 block">Dokumen</span>
                        </div>
                        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                            <CheckCircle2 size={20} />
                        </div>
                    </div>

                    {/* Card PR Pending */}
                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                        <div className="space-y-1">
                            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">PR Pending Approval</span>
                            <h3 className="text-2xl font-bold text-gray-900">9</h3>
                            <span className="text-[11px] font-medium text-gray-400 block">Dokumen</span>
                        </div>
                        <div className="p-3 bg-amber-50 text-amber-500 rounded-xl">
                            <Clock size={20} />
                        </div>
                    </div>

                    {/* Card Total Nilai PR */}
                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                        <div className="space-y-1">
                            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Total Nilai Pengadaan</span>
                            <h3 className="text-xl lg:text-2xl font-bold text-gray-900">Rp 3,12 Miliar</h3>
                            <span className="text-[11px] font-medium text-gray-400 block">Estimasi Anggaran</span>
                        </div>
                        <div className="p-3 bg-slate-50 text-slate-600 rounded-xl">
                            <Wallet size={20} />
                        </div>
                    </div>
                </div>

                {/* 3. DATATABLE BLOCK PANEL */}
                <div className="bg-white border border-gray-200 rounded-xl p-5">
                    
                    {/* Top Action Data List */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-5">
                        <h2 className="text-lg font-semibold text-gray-800">
                            List Dokumen Purchase Request
                        </h2> 

                        <button
                            onClick={() => navigate('/portal/purchase-request/create')}
                            className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
                        >
                            <Plus size={16} />
                            Buat PR
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
                                placeholder="Cari Kode PR / Perihal..."
                                className="h-10 rounded-lg border border-gray-300 px-3 text-sm w-64 outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* Main Table Area (Responsive Wrapper) */}
                    <div className="overflow-x-auto border border-gray-200 rounded-xl">
                        <table className="min-w-full text-sm">
                            <thead className="bg-gray-100">
                                <tr className="text-gray-700">
                                    <th className="px-4 py-3 text-left font-semibold w-12">No</th>
                                    <th className="px-4 py-3 text-left font-semibold">Kode PR</th>
                                    <th className="px-4 py-3 text-left font-semibold">Perihal / Deskripsi</th>
                                    <th className="px-4 py-3 text-left font-semibold">Divisi Pemohon</th>
                                    <th className="px-4 py-3 text-left font-semibold">Estimasi Total</th>
                                    <th className="px-4 py-3 text-left font-semibold">Tanggal Pengajuan</th>
                                    <th className="px-4 py-3 text-left font-semibold">Status</th>
                                    <th className="px-4 py-3 text-center font-semibold w-24">Action</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200 bg-white">
                                {prData.map((item) => (
                                    <tr 
                                        key={item.id} 
                                        className="hover:bg-gray-50/80 transition-colors"
                                    >
                                        <td className="px-4 py-4 text-gray-500">
                                            {item.no}
                                        </td>
                                        <td className="px-4 py-4 text-gray-600 font-medium whitespace-nowrap">
                                            {item.kode}
                                        </td>
                                        <td className="px-4 py-4 text-gray-900 font-semibold">
                                            {item.perihal}
                                        </td>
                                        <td className="px-4 py-4 text-gray-600">
                                            {item.divisi}
                                        </td>
                                        <td className="px-4 py-4 font-semibold text-gray-800 whitespace-nowrap">
                                            {item.totalNilai}
                                        </td>
                                        <td className="px-4 py-4 text-gray-500 whitespace-nowrap">
                                            {item.tanggal}
                                        </td>
                                        <td className="px-4 py-4">
                                            {renderStatusBadge(item.status)}
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center justify-center gap-3">
                                                {/* Button View */}
                                                <button 
                                                    onClick={() => navigate(`/portal/purchase-request/detail`)}
                                                    className="text-blue-600 hover:text-blue-800 p-0.5 transition"
                                                    title="Lihat Detail PR"
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
                            Menampilkan 1-3 dari {prData.length} data
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