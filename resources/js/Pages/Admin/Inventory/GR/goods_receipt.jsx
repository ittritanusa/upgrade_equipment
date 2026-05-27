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
    ArrowDownRight,
    AlertCircle,
    CheckCircle2,
    Clock,
    ChevronLeft,
    ChevronRight,
    Calendar,
    Inbox
} from 'lucide-react';

export default function GoodsReceiptList() {
    const navigate = useNavigate();

    // ==========================================
    // STATE FILTER & SEARCH
    // ==========================================
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('Semua');

    // ==========================================
    // DATA SOURCE MASTER GOODS RECEIPT
    // ==========================================
    const [receiptsList] = useState([
        {
            id: 1,
            noReceipt: 'GR-2026-0089',
            tanggalTerima: '28/05/2026',
            noPoRef: 'PO-2026-0412',
            noSuratJalan: 'SJ-TMU-991A',
            supplier: 'PT. Teknologi Maju Utama',
            gudang: 'Gudang Utama (GDG-01)',
            totalItem: 2,
            status: 'Ada Reject',
        },
        {
            id: 2,
            noReceipt: 'GR-2026-0088',
            tanggalTerima: '26/05/2026',
            noPoRef: 'PO-2026-0398',
            noSuratJalan: 'SJ-2026-9011',
            supplier: 'CV. Multi Karya Elektrik',
            gudang: 'Gudang Utama (GDG-01)',
            totalItem: 5,
            status: 'Sesuai PO',
        },
        {
            id: 3,
            noReceipt: 'GR-2026-0087',
            tanggalTerima: '22/05/2026',
            noPoRef: 'PO-2026-0350',
            noSuratJalan: 'DO-LOG-7721',
            supplier: 'Global Logistics Supply',
            gudang: 'Gudang Transit (GDG-03)',
            totalItem: 12,
            status: 'Parsial',
        }
    ]);

    // ==========================================
    // LOGIKA FILTERING DATA (SEARCH & STATUS)
    // ==========================================
    const filteredReceipts = receiptsList.filter((gr) => {
        const matchesSearch = 
            gr.noReceipt.toLowerCase().includes(searchTerm.toLowerCase()) ||
            gr.noPoRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
            gr.noSuratJalan.toLowerCase().includes(searchTerm.toLowerCase()) ||
            gr.supplier.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'Semua' || gr.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    // Badge Renderer Komponen Berdasarkan Status Dokumen
    const renderStatusBadge = (status) => {
        switch (status) {
            case 'Sesuai PO':
                return (
                    <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md border border-emerald-200 text-[11px] font-bold uppercase tracking-tight">
                        <CheckCircle2 size={12} /> Sesuai PO
                    </span>
                );
            case 'Parsial':
                return (
                    <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 px-2.5 py-1 rounded-md border border-amber-200 text-[11px] font-bold uppercase tracking-tight">
                        <Clock size={12} /> Parsial
                    </span>
                );
            case 'Ada Reject':
                return (
                    <span className="inline-flex items-center gap-1 bg-red-50 text-red-700 px-2.5 py-1 rounded-md border border-red-200 text-[11px] font-bold uppercase tracking-tight">
                        <AlertCircle size={12} /> Ada Reject
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
                            Goods Receipt (Penerimaan Barang)
                        </h1>
                        <p className="text-sm text-gray-400 mt-0.5">
                            Manajemen pencatatan inventaris masuk dan verifikasi dokumen manifes logistik vendor.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => navigate('/portal/inventory/goods-receipt/create')}
                        className="inline-flex items-center gap-2 h-10 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition shadow-md shadow-blue-100 self-start sm:self-auto"
                    >
                        <Plus size={16} /> Buat Penerimaan Baru
                    </button>
                </div>

                {/* 2. OPERATIONAL WIDGET METRICS SUMMARY */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Total GR Bulan Ini</p>
                            <h3 className="text-2xl font-black text-gray-900 mt-1 font-mono">42 <span className="text-xs font-sans font-medium text-gray-400">Dokumen</span></h3>
                        </div>
                        <div className="h-10 w-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                            <FileText size={18} />
                        </div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Penerimaan Sesuai PO</p>
                            <h3 className="text-2xl font-black text-emerald-600 mt-1 font-mono">38 <span className="text-xs font-sans font-medium text-gray-400">Aman</span></h3>
                        </div>
                        <div className="h-10 w-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                            <CheckCircle2 size={18} />
                        </div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Kasus Masalah (Reject)</p>
                            <h3 className="text-2xl font-black text-red-600 mt-1 font-mono">4 <span className="text-xs font-sans font-medium text-gray-400">Insiden</span></h3>
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
                            placeholder="Cari No. GR, No. PO, Surat Jalan, atau Supplier..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full h-10 pl-9 pr-4 text-xs font-medium border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition placeholder:text-gray-400"
                        />
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                        <span className="text-xs font-bold text-gray-500 inline-flex items-center gap-1 hidden sm:inline-flex">
                            <SlidersHorizontal size={12} /> Status:
                        </span>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="h-10 px-3 border border-gray-300 rounded-lg text-xs font-semibold bg-white outline-none focus:border-blue-500 transition w-full md:w-44"
                        >
                            <option value="Semua">Semua Penerimaan</option>
                            <option value="Sesuai PO">Sesuai PO (Clear)</option>
                            <option value="Parsial">Parsial (Bertahap)</option>
                            <option value="Ada Reject">Ada Reject (Bermasalah)</option>
                        </select>
                    </div>
                </div>

                {/* 4. MAIN DATA TABLE LOG */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden w-full">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead className="bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-700 uppercase tracking-wider">
                                <tr>
                                    <th className="px-5 py-3.5 text-left w-44">No. Goods Receipt</th>
                                    <th className="px-4 py-3.5 text-left w-36">Tanggal Terima</th>
                                    <th className="px-5 py-3.5 text-left w-44">Referensi PO & SJ</th>
                                    <th className="px-5 py-3.5 text-left">Asal Vendor / Supplier</th>
                                    <th className="px-5 py-3.5 text-left w-52">Gudang Penyimpanan</th>
                                    <th className="px-4 py-3.5 text-center w-28">Item SKU</th>
                                    <th className="px-5 py-3.5 text-center w-36">Status</th>
                                    <th className="px-5 py-3.5 text-center w-32">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 text-xs text-gray-700">
                                {filteredReceipts.length > 0 ? (
                                    filteredReceipts.map((gr) => (
                                        <tr key={gr.id} className="hover:bg-gray-50/40 transition-colors">
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-1.5 font-mono font-black text-gray-900 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-[11px] w-fit">
                                                    <ArrowDownRight size={12} className="text-blue-600" />
                                                    {gr.noReceipt}
                                                </div>
                                            </td>

                                            <td className="px-4 py-4 text-gray-500 font-medium">
                                                <div className="inline-flex items-center gap-1 text-[11px]">
                                                    <Calendar size={12} className="text-gray-400" /> {gr.tanggalTerima}
                                                </div>
                                            </td>

                                            <td className="px-5 py-4">
                                                <p className="font-mono font-bold text-gray-800 text-[11px] mb-0.5">{gr.noPoRef}</p>
                                                <p className="text-[10px] text-gray-400 font-medium">SJ: {gr.noSuratJalan}</p>
                                            </td>

                                            <td className="px-5 py-4 font-bold text-gray-900">
                                                {gr.supplier}
                                            </td>

                                            <td className="px-5 py-4 text-gray-600 font-medium">
                                                {gr.gudang}
                                            </td>

                                            <td className="px-4 py-4 text-center font-mono font-bold text-gray-900">
                                                {gr.totalItem} <span className="font-sans text-[10px] text-gray-400 font-normal">Varietas</span>
                                            </td>

                                            <td className="px-5 py-4 text-center whitespace-nowrap">
                                                {renderStatusBadge(gr.status)}
                                            </td>

                                            {/* Tombol Aksi Kerja */}
                                            <td className="px-5 py-4 text-center">
                                                <div className="flex items-center justify-center gap-1">
                                                    <button
                                                        type="button"
                                                        onClick={() => navigate(`/portal/inventory/goods-receipt/detail`)}
                                                        className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                                        title="Lihat Detail Transaksi"
                                                    >
                                                        <Eye size={14} />
                                                    </button>
                                                    
                                                    {/* KONDISIONAL BUTTON EDIT: Hanya muncul jika status === 'Parsial' */}
                                                    {gr.status === 'Parsial' && (
                                                        <button
                                                            type="button"
                                                            onClick={() => navigate(`/portal/inventory/goods-receipt/edit`)}
                                                            className="p-1.5 text-amber-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg border border-amber-200 transition"
                                                            title="Input Penerimaan Kloter Susulan (Parsial)"
                                                        >
                                                            <Edit size={14} />
                                                        </button>
                                                    )}

                                                    <button
                                                        type="button"
                                                        onClick={() => navigate(`/portal/inventory/goods-receipt/print`)}
                                                        className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition"
                                                        title="Cetak Berita Acara Penerimaan (PDF)"
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
                                                <p className="font-medium">Data penerimaan barang tidak ditemukan</p>
                                                <p className="text-[11px] text-gray-400 font-normal max-w-xs leading-normal">
                                                    Coba periksa kembali kata kunci pencarian Anda atau ubah opsi filter status yang dipilih.
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
                            Menampilkan <span className="text-gray-800 font-mono">{filteredReceipts.length}</span> dari <span className="text-gray-800 font-mono">{receiptsList.length}</span> Total Transaksi
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