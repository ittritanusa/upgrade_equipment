import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';

import {
    Search,
    SlidersHorizontal,
    Eye,
    UserCheck,
    ArrowUpRight,
    FileBarChart2,
    Calendar,
    ArrowRight
} from 'lucide-react';

export default function VendorSelectionList() {
    const navigate = useNavigate();

    // ==========================================
    // SIMULASI DATA LIST VENDOR SELECTION (RFQ SELEKSI)
    // ==========================================
    const [selectionData] = useState([
        {
            id: 1,
            kodeRFQ: 'RFQ/PROC/AGS/2026/05/002',
            kodePR: 'PR/PROC/AGS/2026/04/015',
            perihal: 'Peremajaan Server Ruang Data Center',
            divisiPemohon: 'Teknologi Informasi',
            deadlineDate: '25/05/2026', // Sudah lewat deadline
            totalVendorUndangan: 4,
            vendorMerespon: 3,
            statusSeleksi: 'Siap Seleksi', // Status: Siap Seleksi / Dalam Proses / Selesai
        },
        {
            id: 2,
            kodeRFQ: 'RFQ/PROC/AGS/2026/05/001',
            kodePR: 'PR/PROC/AGS/2026/05/001',
            perihal: 'Pengadaan Komputer & Laptop Divisi IT',
            divisiPemohon: 'Teknologi Informasi',
            deadlineDate: '01/06/2026',
            totalVendorUndangan: 3,
            vendorMerespon: 3, // Kuota respon penuh sebelum deadline
            statusSeleksi: 'Dalam Proses',
        },
        {
            id: 3,
            kodeRFQ: 'RFQ/PROC/AGS/2026/04/009',
            kodePR: 'PR/PROC/AGS/2026/04/002',
            perihal: 'Pengadaan Meja & Kursi Kerja Kantor Cabang',
            divisiPemohon: 'GA & GA Logistik',
            deadlineDate: '15/04/2026',
            totalVendorUndangan: 4,
            vendorMerespon: 4,
            statusSeleksi: 'Selesai',
        }
    ]);

    // State Kontrol Filter Konten
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('Semua');

    // Helper Badge untuk Status Alur Seleksi Komparasi
    const renderSelectionStatusBadge = (status) => {
        switch (status) {
            case 'Selesai':
                return <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">Selesai Seleksi</span>;
            case 'Dalam Proses':
                return <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold">Dalam Evaluasi</span>;
            case 'Siap Seleksi':
                return <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold animate-pulse">Siap Seleksi</span>;
            default:
                return <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold">{status}</span>;
        }
    };

    // Filter Logic Data
    const filteredData = selectionData.filter(item => {
        const matchesSearch = item.kodeRFQ.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              item.perihal.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              item.kodePR.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'Semua' || item.statusSeleksi === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <PortalLayout>
            <div className="space-y-6">
                
                {/* 1. HEADER HALAMAN & BREADCRUMBS */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Vendor Selection & Komparasi Harga
                        </h1>

                        <div className="flex items-center gap-2 mt-1 text-sm">
                            <span className="text-gray-400">Procurement</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-blue-600 font-medium">Vendor Selection</span>
                        </div>
                    </div>
                </div>

                {/* 2. SUB-PANEL STATISTIK RINGKAS (Khas Corak Modul Finansial/Procurement) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex items-center justify-between">
                        <div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Butuh Tindakan</span>
                            <span className="text-2xl font-black text-blue-600 mt-1 block">
                                {selectionData.filter(d => d.statusSeleksi === 'Siap Seleksi').length} Berkas
                            </span>
                        </div>
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                            <UserCheck size={22} />
                        </div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex items-center justify-between">
                        <div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Sedang Dievaluasi</span>
                            <span className="text-2xl font-black text-amber-600 mt-1 block">
                                {selectionData.filter(d => d.statusSeleksi === 'Dalam Proses').length} Berkas
                            </span>
                        </div>
                        <div className="p-3 bg-amber-50 text-amber-500 rounded-xl">
                            <FileBarChart2 size={22} />
                        </div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex items-center justify-between">
                        <div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Selesai Berita Acara</span>
                            <span className="text-2xl font-black text-green-600 mt-1 block">
                                {selectionData.filter(d => d.statusSeleksi === 'Selesai').length} Dokumen
                            </span>
                        </div>
                        <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                            <ArrowRight size={22} />
                        </div>
                    </div>
                </div>

                {/* 3. FILTER CONTROLS BAR AREA */}
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="relative w-full md:w-80">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                            <Search size={16} />
                        </span>
                        <input
                            type="text"
                            placeholder="Cari No. RFQ, PR, atau Perihal..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full h-10 pl-9 pr-4 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 transition"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                            <SlidersHorizontal size={14} /> Status Seleksi:
                        </div>
                        
                        <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
                            {['Semua', 'Siap Seleksi', 'Dalam Proses', 'Selesai'].map((status) => (
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
                                    {status === 'Semua' ? 'Semua' : status === 'Dalam Proses' ? 'Evaluasi' : status}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 4. MAIN DATA TABLE AREA */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead className="bg-gray-50 text-gray-700 font-semibold border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3.5 text-left w-48">Nomor RFQ</th>
                                    <th className="px-6 py-3.5 text-left w-48">Referensi No. PR</th>
                                    <th className="px-6 py-3.5 text-left">Perihal Pengadaan</th>
                                    <th className="px-6 py-3.5 text-center w-40">Masa Tenggat</th>
                                    <th className="px-6 py-3.5 text-center w-36">Respon Vendor</th>
                                    <th className="px-6 py-3.5 text-center w-36">Status</th>
                                    <th className="px-6 py-3.5 text-center w-28">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white text-xs text-gray-700">
                                {filteredData.length > 0 ? (
                                    filteredData.map((data) => (
                                        <tr key={data.id} className="hover:bg-gray-50/40 transition-colors">
                                            <td className="px-6 py-4 font-bold text-gray-900 tracking-wide">
                                                {data.kodeRFQ}
                                            </td>
                                            <td className="px-6 py-4 text-gray-500 font-medium">
                                                {data.kodePR}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="space-y-0.5">
                                                    <p className="font-semibold text-gray-800 text-sm">{data.perihal}</p>
                                                    <p className="text-gray-400 text-[11px]">{data.divisiPemohon}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center font-medium text-gray-600">
                                                <div className="inline-flex items-center gap-1">
                                                    <Calendar size={13} className="text-gray-400" />
                                                    {data.deadlineDate}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`inline-block px-2 py-1 rounded font-bold ${
                                                    data.vendorMerespon === data.totalVendorUndangan 
                                                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                                                        : 'bg-slate-100 text-slate-700'
                                                }`}>
                                                    {data.vendorMerespon} / {data.totalVendorUndangan} Vendor
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {renderSelectionStatusBadge(data.statusSeleksi)}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {data.statusSeleksi === 'Selesai' ? (
                                                    <button
                                                        type="button"
                                                        onClick={() => navigate(`/portal/vendor-selection/berita-acara`)}
                                                        className="h-8 px-2.5 rounded border border-gray-300 text-gray-600 bg-white hover:bg-gray-50 transition font-medium inline-flex items-center gap-1.5"
                                                        title="Lihat Hasil Seleksi"
                                                    >
                                                        <Eye size={14} /> Lihat BA
                                                    </button>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        onClick={() => navigate(`/portal/vendor-selection/proses`)}
                                                        className="h-8 px-2.5 rounded text-white bg-blue-600 hover:bg-blue-700 transition font-semibold inline-flex items-center gap-1 shadow-sm"
                                                        title="Mulai Bandingkan Harga"
                                                    >
                                                        <UserCheck size={14} /> Proses
                                                        <ArrowUpRight size={13} />
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-12 text-center text-gray-400 italic">
                                            Tidak ada data penawaran RFQ yang cocok dengan kriteria filter saat ini.
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