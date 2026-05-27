import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';

import {
    Plus,
    Search,
    SlidersHorizontal,
    FileText,
    Eye,
    Edit,
    Printer,
    ArrowUpRight, 
    AlertCircle,
    CheckCircle2,
    Clock,
    ChevronLeft,
    ChevronRight,
    Calendar,
    Inbox
} from 'lucide-react';

export default function GoodsIssueList() {
    const navigate = useNavigate();

    // ==========================================
    // STATE FILTER & SEARCH
    // ==========================================
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('Semua');

    // ==========================================
    // DATA SOURCE MASTER GOODS ISSUE (KONTRAKTOR)
    // ==========================================
    const [issuesList] = useState([
        {
            id: 1,
            noIssue: 'GI-2026-0412',
            tanggalKeluar: '28/05/2026',
            noRefKontrak: 'MR-PRJ01-098', // Material Request Proyek
            kodeWbs: 'WBS-1.1.2 (Struktur)', // Work Breakdown Structure Cost Center
            proyekTujuan: 'Proyek Pembangunan Gedung Bertingkat - Area Site A',
            subKontraktor: 'PT. Sinar Jaya Mandiri (Subkon Struktur)',
            gudangAsal: 'Gudang Pusat Logistik (GDG-01)',
            totalItem: 18,
            status: 'Ada Selisih', 
        },
        {
            id: 2,
            noIssue: 'GI-2026-0411',
            tanggalKeluar: '27/05/2026',
            noRefKontrak: 'WO-MEP-0054', // Work Order Bengkel/Alat Berat
            kodeWbs: 'WBS-3.2.1 (MEP)',
            proyekTujuan: 'Flyover Mandiri Mandiri - Balikpapan',
            subKontraktor: 'Tim Internal MEP Cabang',
            gudangAsal: 'Gudang Lapangan Bpp (GDG-04)',
            totalItem: 6,
            status: 'Sesuai Request',
        },
        {
            id: 3,
            noIssue: 'GI-2026-0410',
            tanggalKeluar: '25/05/2026',
            noRefKontrak: 'MTN-2026-0021', // Material Transfer Note antar site
            kodeWbs: 'WBS-2.4.5 (Infrastruktur)',
            proyekTujuan: 'Pematangan Lahan Site C - Morowali',
            subKontraktor: 'PT. Bumi Teknikat (Subkon Galian)',
            gudangAsal: 'Gudang Transit Makassar (GDG-02)',
            totalItem: 32,
            status: 'Parsial',
        }
    ]);

    // ==========================================
    // LOGIKA FILTERING DATA (SEARCH & STATUS)
    // ==========================================
    const filteredIssues = issuesList.filter((gi) => {
        const matchesSearch = 
            gi.noIssue.toLowerCase().includes(searchTerm.toLowerCase()) ||
            gi.noRefKontrak.toLowerCase().includes(searchTerm.toLowerCase()) ||
            gi.kodeWbs.toLowerCase().includes(searchTerm.toLowerCase()) ||
            gi.proyekTujuan.toLowerCase().includes(searchTerm.toLowerCase()) ||
            gi.subKontraktor.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'Semua' || gi.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    // Badge Renderer Komponen Berdasarkan Status Alokasi Material Proyek
    const renderStatusBadge = (status) => {
        switch (status) {
            case 'Sesuai Request':
                return (
                    <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md border border-emerald-200 text-[11px] font-bold uppercase tracking-tight">
                        <CheckCircle2 size={12} /> Sesuai Request
                    </span>
                );
            case 'Parsial':
                return (
                    <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 px-2.5 py-1 rounded-md border border-amber-200 text-[11px] font-bold uppercase tracking-tight">
                        <Clock size={12} /> Parsial (Mobilisasi)
                    </span>
                );
            case 'Ada Selisih':
                return (
                    <span className="inline-flex items-center gap-1 bg-red-50 text-red-700 px-2.5 py-1 rounded-md border border-red-200 text-[11px] font-bold uppercase tracking-tight">
                        <AlertCircle size={12} /> Ada Selisih / Rusak
                    </span>
                );
            default:
                return null;
        }
    };

    return (
        <PortalLayout>
            <div className="space-y-6">

                {/* 1. HEADER HALAMAN & TOMBOL TAMBAH TRANSAKSI */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Goods Issue (Pengeluaran & Alokasi Material)
                        </h1>
                        <p className="text-sm text-gray-400 mt-0.5">
                            Pencatatan pengeluaran material gudang untuk kebutuhan opname proyek, mobilisasi alat, dan distribusi subkontraktor.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => navigate('/portal/inventory/goods-issue/create')}
                        className="inline-flex items-center gap-2 h-10 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition shadow-md shadow-blue-100 self-start sm:self-auto"
                    >
                        <Plus size={16} /> Issue Material Baru
                    </button>
                </div>

                {/* 2. OPERATIONAL WIDGET METRICS SUMMARY */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Pelepasan Material Bulan Ini</p>
                            <h3 className="text-2xl font-black text-gray-900 mt-1 font-mono">184 <span className="text-xs font-sans font-medium text-gray-400">Manifes</span></h3>
                        </div>
                        <div className="h-10 w-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                            <FileText size={18} />
                        </div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Disetujui Site Manager</p>
                            <h3 className="text-2xl font-black text-emerald-600 mt-1 font-mono">172 <span className="text-xs font-sans font-medium text-gray-400">Clear</span></h3>
                        </div>
                        <div className="h-10 w-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                            <CheckCircle2 size={18} />
                        </div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Selisih Opname / Rusak Lapangan</p>
                            <h3 className="text-2xl font-black text-red-600 mt-1 font-mono">12 <span className="text-xs font-sans font-medium text-gray-400">Kasus</span></h3>
                        </div>
                        <div className="h-10 w-10 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center text-red-600">
                            <AlertCircle size={18} />
                        </div>
                    </div>
                </div>

                {/* 3. CONTROLLER BAR (SEARCH INPUT & SELECT FILTER) */}
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
                    <div className="relative w-full md:w-96">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 pointer-events-none">
                            <Search size={16} />
                        </span>
                        <input
                            type="text"
                            placeholder="Cari No. GI, Kode WBS, Project Site, atau Subkon..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full h-10 pl-9 pr-4 text-xs font-medium border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition placeholder:text-gray-400"
                        />
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                        <span className="text-xs font-bold text-gray-500 inline-flex items-center gap-1 hidden sm:inline-flex">
                            <SlidersHorizontal size={12} /> Filter:
                        </span>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="h-10 px-3 border border-gray-300 rounded-lg text-xs font-semibold bg-white outline-none focus:border-blue-500 transition w-full md:w-48"
                        >
                            <option value="Semua">Semua Pengeluaran</option>
                            <option value="Sesuai Request">Sesuai Request (Clear)</option>
                            <option value="Parsial">Parsial (Mobilisasi Berkelanjutan)</option>
                            <option value="Ada Selisih">Ada Selisih / Rusak Lapangan</option>
                        </select>
                    </div>
                </div>

                {/* 4. MAIN DATA TABLE LOG */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden w-full">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead className="bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-700 uppercase tracking-wider">
                                <tr>
                                    <th className="px-5 py-3.5 text-left w-44">No. Goods Issue</th>
                                    <th className="px-4 py-3.5 text-left w-36">Tanggal Keluar</th>
                                    <th className="px-5 py-3.5 text-left w-48">Ref Dokumen & Kode WBS</th>
                                    <th className="px-5 py-3.5 text-left">Project Site Tujuan & Pelaksana/Subkon</th>
                                    <th className="px-5 py-3.5 text-left w-52">Asal Gudang Supply</th>
                                    <th className="px-4 py-3.5 text-center w-28">Volume Item</th>
                                    <th className="px-5 py-3.5 text-center w-36">Status Lapangan</th>
                                    <th className="px-5 py-3.5 text-center w-32">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 text-xs text-gray-700">
                                {filteredIssues.length > 0 ? (
                                    filteredIssues.map((gi) => (
                                        <tr key={gi.id} className="hover:bg-gray-50/40 transition-colors">
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-1.5 font-mono font-black text-gray-900 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-[11px] w-fit">
                                                    <ArrowUpRight size={12} className="text-blue-600" />
                                                    {gi.noIssue}
                                                </div>
                                            </td>

                                            <td className="px-4 py-4 text-gray-500 font-medium">
                                                <div className="inline-flex items-center gap-1 text-[11px]">
                                                    <Calendar size={12} className="text-gray-400" /> {gi.tanggalKeluar}
                                                </div>
                                            </td>

                                            <td className="px-5 py-4">
                                                <p className="font-mono font-bold text-gray-800 text-[11px] mb-0.5">{gi.noRefKontrak}</p>
                                                <p className="text-[10px] text-blue-600 font-semibold bg-blue-50 border border-blue-100 px-1 py-0.5 rounded w-fit">{gi.kodeWbs}</p>
                                            </td>

                                            <td className="px-5 py-4">
                                                <p className="font-bold text-gray-900 leading-normal">{gi.proyekTujuan}</p>
                                                <p className="text-[10px] text-gray-400 font-medium mt-0.5">Pelaksana: {gi.subKontraktor}</p>
                                            </td>

                                            <td className="px-5 py-4 text-gray-600 font-medium">
                                                {gi.gudangAsal}
                                            </td>

                                            <td className="px-4 py-4 text-center font-mono font-bold text-gray-900">
                                                {gi.totalItem} <span className="font-sans text-[10px] text-gray-400 font-normal">Material</span>
                                            </td>

                                            <td className="px-5 py-4 text-center whitespace-nowrap">
                                                {renderStatusBadge(gi.status)}
                                            </td>

                                            {/* Tombol Aksi Kerja */}
                                            <td className="px-5 py-4 text-center">
                                                <div className="flex items-center justify-center gap-1">
                                                    <button
                                                        type="button"
                                                        onClick={() => navigate(`/portal/inventory/goods-issue/detail`)}
                                                        className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                                        title="Lihat Bukti Pengeluaran Barang"
                                                    >
                                                        <Eye size={14} />
                                                    </button>
                                                    
                                                    {/* KONDISIONAL BUTTON EDIT: Muncul jika pengeluaran berseri/parsial */}
                                                    {gi.status === 'Parsial' && (
                                                        <button
                                                            type="button"
                                                            onClick={() => navigate(`/portal/inventory/goods-issue/edit`)}
                                                            className="p-1.5 text-amber-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg border border-amber-200 transition"
                                                            title="Input Drop Material Kloter Susulan"
                                                        >
                                                            <Edit size={14} />
                                                        </button>
                                                    )}

                                                    <button
                                                        type="button"
                                                        onClick={() => navigate(`/portal/inventory/goods-issue/print`)}
                                                        className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition"
                                                        title="Cetak Surat Jalan / Bukti Keluar Gudang (PDF)"
                                                    >
                                                        <Printer size={14} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="px-5 py-12 text-center text-gray-400">
                                            <div className="flex flex-col items-center justify-center gap-2">
                                                <Inbox size={32} className="text-gray-300 stroke-[1.5]" />
                                                <p className="font-medium">Data pengeluaran material proyek tidak ditemukan</p>
                                                <p className="text-[11px] text-gray-400 font-normal max-w-xs leading-normal">
                                                    Coba periksa nomor Material Request (MR), kode WBS anggaran, atau nama lokasi proyek yang dicari.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* 5. FOOTER TABEL / PAGINATION SYSTEM */}
                    <div className="bg-gray-50 border-t border-gray-200 px-5 py-3 flex items-center justify-between text-xs font-semibold text-gray-500">
                        <div>
                            Menampilkan <span className="text-gray-800 font-mono">{filteredIssues.length}</span> dari <span className="text-gray-800 font-mono">{issuesList.length}</span> Manifes Lapangan
                        </div>
                        <div className="flex items-center gap-1">
                            <button type="button" disabled className="h-8 w-8 rounded border border-gray-200 bg-white inline-flex items-center justify-center text-gray-300 cursor-not-allowed">
                                <ChevronLeft size={14} />
                            </button>
                            <button type="button" className="h-8 w-8 rounded border border-blue-500 bg-blue-600 inline-flex items-center justify-center text-white font-mono">
                                1
                            </button>
                            <button type="button" disabled className="h-8 w-8 rounded border border-gray-200 bg-white inline-flex items-center justify-center text-gray-300 cursor-not-allowed">
                                <ChevronRight size={14} />
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        </PortalLayout>
    );
}