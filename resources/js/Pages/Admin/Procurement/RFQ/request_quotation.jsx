import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';

import {
    Plus,
    Eye,
    Pencil,
    Search,
    FileText,
    Clock,
    CheckCircle2,
    Users, // Icon untuk jumlah vendor
    ArrowRightLeft, // Icon untuk proses seleksi/komparasi
    ArrowUpRight
} from 'lucide-react';

export default function RequestQuotation() {
    const navigate = useNavigate();

    // DATA RFQ: Fokus pada tracking progress dokumen penawaran yang disebar ke vendor
    const rfqData = [
        {
            id: 1,
            no: 1,
            kodeRFQ: 'RFQ/PROC/AGS/2026/05/001',
            kodePR: 'PR/PROC/AGS/2026/05/001',
            perihal: 'Pengadaan Komputer & Laptop Divisi IT',
            tanggalDibuat: '24/05/2026',
            vendorDiundang: 3,     // Jumlah vendor yang dikirimi RFQ
            penawaranMasuk: 2,     // Jumlah vendor yang sudah kirim balik harga penawaran
            statusRFQ: 'Proses Penawaran' 
        },
        {
            id: 2,
            no: 2,
            kodeRFQ: 'RFQ/PROC/AGS/2026/05/002',
            kodePR: 'PR/PROC/AGS/2026/04/015',
            perihal: 'Peremajaan Server Ruang Data Center',
            tanggalDibuat: '25/05/2026',
            vendorDiundang: 4,
            penawaranMasuk: 4,     // Semua vendor sudah merespon, siap diseleksi
            statusRFQ: 'Siap Seleksi' 
        },
        {
            id: 3,
            no: 3,
            kodeRFQ: 'RFQ/PROC/AGS/2026/05/003',
            kodePR: 'PR/PROC/AGS/2026/03/009',
            perihal: 'Pengadaan Meja & Kursi Kerja Ergonomis',
            tanggalDibuat: '26/05/2026',
            vendorDiundang: 2,
            penawaranMasuk: 2,
            statusRFQ: 'Selesai Seleksi' // Sudah ditentukan pemenangnya (lanjut ke PO)
        }
    ];

    const renderRFQStatus = (status) => {
        switch (status) {
            case 'Selesai Seleksi':
                return (
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                        {status}
                    </span>
                );
            case 'Siap Seleksi':
                return (
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold animate-pulse">
                        {status}
                    </span>
                );
            case 'Proses Penawaran':
                return (
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold">
                        {status}
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold">
                        {status}
                    </span>
                );
        }
    };

    return (
        <PortalLayout>
            <div className="space-y-6">
                
                {/* 1. HEADER */}
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Request for Quotation (RFQ)</h1>
                    <div className="flex items-center gap-2 mt-1 text-sm text-gray-400">
                        <span>Procurement</span>
                        <span>/</span>
                        <span className="text-blue-600 font-medium">RFQ List</span>
                    </div>
                </div>

                {/* 2. STATISTIC CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                        <div>
                            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">RFQ Berjalan</span>
                            <h3 className="text-2xl font-bold text-gray-900">
                                {rfqData.filter(i => i.statusRFQ === 'Proses Penawaran').length}
                            </h3>
                        </div>
                        <div className="p-3 bg-amber-50 text-amber-500 rounded-xl"><Clock size={20} /></div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                        <div>
                            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Siap Seleksi Vendor</span>
                            <h3 className="text-2xl font-bold text-blue-600">
                                {rfqData.filter(i => i.statusRFQ === 'Siap Seleksi').length}
                            </h3>
                        </div>
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><ArrowRightLeft size={20} /></div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                        <div>
                            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">RFQ Selesai (PO Created)</span>
                            <h3 className="text-2xl font-bold text-emerald-600">
                                {rfqData.filter(i => i.statusRFQ === 'Selesai Seleksi').length}
                            </h3>
                        </div>
                        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><CheckCircle2 size={20} /></div>
                    </div>
                </div>

                {/* 3. DATATABLE */}
                <div className="bg-white border border-gray-200 rounded-xl p-5">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-5">
                        <h2 className="text-lg font-semibold text-gray-800">Daftar Request for Quotation</h2> 
                        <button
                            onClick={() => navigate('/portal/request-quotation/create')}
                            className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
                        >
                            <Plus size={16} />
                            Buat RFQ Baru
                        </button>
                    </div>

                    <div className="overflow-x-auto border border-gray-200 rounded-xl">
                        <table className="min-w-full text-sm">
                            <thead className="bg-gray-100">
                                <tr className="text-gray-700">
                                    <th className="px-4 py-3 text-left font-semibold w-12">No</th>
                                    <th className="px-4 py-3 text-left font-semibold">Kode RFQ</th>
                                    <th className="px-4 py-3 text-left font-semibold">Referensi PR</th>
                                    <th className="px-4 py-3 text-left font-semibold">Perihal Barang</th>
                                    <th className="px-4 py-3 text-center font-semibold">Respon Vendor</th>
                                    <th className="px-4 py-3 text-left font-semibold">Tgl Dibuat</th>
                                    <th className="px-4 py-3 text-left font-semibold">Status Progress</th>
                                    <th className="px-4 py-3 text-center font-semibold w-32">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {rfqData.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                                        <td className="px-4 py-4 text-gray-500">{item.no}</td>
                                        <td className="px-4 py-4 text-blue-600 font-semibold">{item.kodeRFQ}</td>
                                        <td className="px-4 py-4 text-gray-600 font-medium">{item.kodePR}</td>
                                        <td className="px-4 py-4 text-gray-900 font-semibold">{item.perihal}</td>
                                        <td className="px-4 py-4 text-center">
                                            <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded bg-slate-100 text-slate-700">
                                                <Users size={12} />
                                                {item.penawaranMasuk} / {item.vendorDiundang} Vendor
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 text-gray-500">{item.tanggalDibuat}</td>
                                        <td className="px-4 py-4">{renderRFQStatus(item.statusRFQ)}</td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <button 
                                                    onClick={() => navigate(`/portal/request-quotation/detail`)}
                                                    className="text-gray-600 hover:text-blue-600 p-1 transition"
                                                    title="Lihat Detail RFQ"
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
                </div>

            </div>
        </PortalLayout>
    );
}