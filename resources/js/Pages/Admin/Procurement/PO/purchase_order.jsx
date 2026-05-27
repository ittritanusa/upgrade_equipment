import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';

import {
    Search,
    SlidersHorizontal,
    Eye,
    Plus,
    FileText,
    Calendar,
    Printer,
    ArrowUpRight,
    CheckCircle2
} from 'lucide-react';

export default function PurchaseOrderList() {
    const navigate = useNavigate();

    // ==========================================
    // SIMULASI DATA LIST PURCHASE ORDER (PO)
    // ==========================================
    const [poData] = useState([
        {
            id: 1,
            kodePO: 'PO/PROC/AGS/2026/05/002',
            kodeBA: 'BA-SV/PROC/AGS/2026/05/012',
            perihal: 'Peremajaan Server Ruang Data Center',
            vendorPemenang: 'CV. TechMedia Nusantara',
            tanggalPO: '27/05/2026',
            totalNilaiPO: 89900000,
            statusPO: 'Disetujui', // Status: Draft / Menunggu Persetujuan / Disetujui / Dikirim ke Vendor
        },
        {
            id: 2,
            kodePO: 'PO/PROC/AGS/2026/05/001',
            kodeBA: 'BA-SV/PROC/AGS/2026/05/009',
            perihal: 'Pengadaan Komputer & Laptop Divisi IT',
            vendorPemenang: 'PT. Computindo Utama',
            tanggalPO: '20/05/2026',
            totalNilaiPO: 145000000,
            statusPO: 'Dikirim ke Vendor',
        },
        {
            id: 3,
            kodePO: 'PO/PROC/AGS/2026/04/005',
            kodeBA: 'BA-SV/PROC/AGS/2026/04/002',
            perihal: 'Pengadaan Meja & Kursi Kerja Kantor Cabang',
            vendorPemenang: 'PT. Sinergi Integrasi',
            tanggalPO: '18/04/2026',
            totalNilaiPO: 42000000,
            statusPO: 'Menunggu Persetujuan',
        }
    ]);

    // State Kontrol Pencarian dan Filter
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('Semua');

    // Helper Format Rupiah untuk Finansial Kontrak
    const formatRupiah = (angka) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(angka);
    };

    // Helper Badge Status Siklus Hidup PO
    const renderPOStatusBadge = (status) => {
        switch (status) {
            case 'Dikirim ke Vendor':
                return <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold">Sent to Vendor</span>;
            case 'Disetujui':
                return <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">Approved</span>;
            case 'Menunggu Persetujuan':
                return <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold">Pending Approval</span>;
            default:
                return <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold">{status}</span>;
        }
    };

    // Logika Pemfilteran Data PO
    const filteredPO = poData.filter(item => {
        const matchesSearch = item.kodePO.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              item.perihal.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              item.vendorPemenang.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'Semua' || item.statusPO === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <PortalLayout>
            <div className="space-y-6">
                
                {/* 1. HEADER HALAMAN & BREADCRUMBS */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Purchase Order (PO)
                        </h1>

                        <div className="flex items-center gap-2 mt-1 text-sm">
                            <span className="text-gray-400">Procurement</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-blue-600 font-medium">Purchase Order</span>
                        </div>
                    </div>

                    {/* Tombol Buat Dokumen PO Baru */}
                    <button
                        type="button"
                        onClick={() => navigate('/portal/purchase-order/create')}
                        className="inline-flex items-center gap-2 h-10 px-4 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition shadow-sm self-start sm:self-auto"
                    >
                        <Plus size={16} />
                        Buat PO Baru
                    </button>
                </div>

                {/* 2. RINGKASAN PANEL STATISTIK KONTRAK */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex items-center justify-between">
                        <div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Total PO Aktif</span>
                            <span className="text-2xl font-black text-gray-900 mt-1 block">
                                {poData.length} Dokumen
                            </span>
                        </div>
                        <div className="p-3 bg-slate-100 text-slate-700 rounded-xl">
                            <FileText size={22} />
                        </div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex items-center justify-between">
                        <div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Menunggu Approval</span>
                            <span className="text-2xl font-black text-amber-600 mt-1 block">
                                {poData.filter(d => d.statusPO === 'Menunggu Persetujuan').length} Berkas
                            </span>
                        </div>
                        <div className="p-3 bg-amber-50 text-amber-500 rounded-xl">
                            <SlidersHorizontal size={22} />
                        </div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex items-center justify-between">
                        <div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Total Nilai Komitmen PO</span>
                            <span className="text-2xl font-black text-green-600 mt-1 block">
                                {formatRupiah(poData.reduce((acc, curr) => acc + curr.totalNilaiPO, 0))}
                            </span>
                        </div>
                        <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                            <CheckCircle2 size={22} />
                        </div>
                    </div>
                </div>

                {/* 3. FILTER BAR CONTROLS */}
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="relative w-full md:w-80">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                            <Search size={16} />
                        </span>
                        <input
                            type="text"
                            placeholder="Cari Nomor PO, Perihal, atau Vendor..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full h-10 pl-9 pr-4 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 transition"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                            <SlidersHorizontal size={14} /> Status Dokumen:
                        </div>
                        
                        <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
                            {['Semua', 'Menunggu Persetujuan', 'Disetujui', 'Dikirim ke Vendor'].map((status) => (
                                <button
                                    key={status}
                                    type="button"
                                    onClick={() => setStatusFilter(status)}
                                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                                        statusFilter === status
                                            ? 'bg-white text-blue-600 shadow-sm'
                                            : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                >
                                    {status === 'Semua' ? 'Semua' : status === 'Menunggu Persetujuan' ? 'Pending' : status === 'Dikirim ke Vendor' ? 'Sent' : status}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 4. TABEL UTAMA DATA PURCHASE ORDER */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead className="bg-gray-50 text-gray-700 font-semibold border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3.5 text-left w-52">Nomor PO</th>
                                    <th className="px-6 py-3.5 text-left w-48">Ref. Berita Acara</th>
                                    <th className="px-6 py-3.5 text-left">Perihal & Nama Vendor</th>
                                    <th className="px-6 py-3.5 text-center w-36">Tanggal PO</th>
                                    <th className="px-6 py-3.5 text-right w-44">Total Nilai Kontrak</th>
                                    <th className="px-6 py-3.5 text-center w-40">Status</th>
                                    <th className="px-6 py-3.5 text-center w-28">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white text-xs text-gray-700">
                                {filteredPO.length > 0 ? (
                                    filteredPO.map((po) => (
                                        <tr key={po.id} className="hover:bg-gray-50/40 transition-colors">
                                            <td className="px-6 py-4 font-bold text-gray-900 tracking-wide">
                                                {po.kodePO}
                                            </td>
                                            <td className="px-6 py-4 text-gray-400 font-medium">
                                                {po.kodeBA}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="space-y-0.5">
                                                    <p className="font-bold text-gray-800 text-sm">{po.perihal}</p>
                                                    <p className="text-blue-600 font-bold uppercase text-[11px] tracking-wide">🏢 {po.vendorPemenang}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center text-gray-600 font-medium">
                                                <div className="inline-flex items-center gap-1">
                                                    <Calendar size={13} className="text-gray-400" />
                                                    {po.tanggalPO}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right font-black text-gray-900 text-sm">
                                                {formatRupiah(po.totalNilaiPO)}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {renderPOStatusBadge(po.statusPO)}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex items-center justify-center gap-1.5">
                                                    <button
                                                        type="button"
                                                        onClick={() => navigate(`/portal/purchase-order/detail`)}
                                                        className="h-8 px-2 rounded border border-gray-300 text-gray-600 bg-white hover:bg-gray-50 transition inline-flex items-center gap-1"
                                                        title="Lihat Detail Kontrak PO"
                                                    >
                                                        <Eye size={13} /> Detail
                                                    </button>
                                                    
                                                    {po.statusPO === 'Disetujui' || po.statusPO === 'Dikirim ke Vendor' ? (
                                                        <button
                                                            type="button"
                                                            className="h-8 w-8 rounded border border-gray-300 text-gray-500 bg-white hover:bg-gray-50 transition flex items-center justify-center"
                                                            title="Cetak Salinan PO"
                                                        >
                                                            <Printer size={13} />
                                                        </button>
                                                    ) : null}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-12 text-center text-gray-400 italic">
                                            Tidak ada berkas Purchase Order yang sesuai dengan pencarian Anda.
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