import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';

import {
    ArrowLeft,
    Printer,
    FileText,
    Package,
    CheckCircle2,
    Clock,
    AlertCircle,
    Calendar,
    Warehouse,
    User,
    Layers,
    ExternalLink
} from 'lucide-react';

export default function DetailGoodsReceipt() {
    const navigate = useNavigate();
    const { id } = useParams();

    // ==========================================
    // MOCK DATA DETAIL GOODS RECEIPT (READONLY)
    // ==========================================
    const [grData] = useState({
        noReceipt: 'GR-2026-0089',
        tanggalTerima: '2026-05-28 10:30 WIB',
        noPoRef: 'PO-2026-0412',
        noSuratJalan: 'SJ-TMU-991A',
        namaSupplier: 'PT. Teknologi Maju Utama',
        gudangTujuan: 'Gudang Utama (GDG-01) - Bin A2',
        petugasPenerima: 'Hendra Wijaya (Logistik Officer)',
        status: 'Ada Reject', // Sesuai PO, Parsial, Ada Reject
        catatan: 'Diterima dari armada logistik kurir internal vendor. Box nomor 2 penyok sedikit namun item komponen di dalamnya sudah dites manual dan aman.',
        items: [
            {
                id: 1,
                kodeSku: 'SKU-IT-0091',
                namaBarang: 'Access Point Aruba AP-505 Dual-Radio',
                satuan: 'Pcs',
                qtyPo: 10,
                qtyDiterima: 10,
                qtyReject: 0,
                noBatchSerial: 'SN-ARUB-99210-X',
                kondisi: 'Kondisi Sesuai standard operational'
            },
            {
                id: 2,
                kodeSku: 'SKU-IT-0145',
                namaBarang: 'Kabel UTP Cat6 Belden (Roll @305 Meter)',
                satuan: 'Roll',
                qtyPo: 5,
                qtyDiterima: 4,
                qtyReject: 1,
                noBatchSerial: 'BATCH-BLD-0526',
                kondisi: '1 Roll plastik pembungkus sobek dan lembab'
            }
        ]
    });

    // Helper Badge Status
    const renderStatusBadge = (status) => {
        switch (status) {
            case 'Sesuai PO':
                return (
                    <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200 text-xs font-bold uppercase tracking-wide">
                        <CheckCircle2 size={14} /> Diterima Penuh
                    </span>
                );
            case 'Parsial':
                return (
                    <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 px-3 py-1 rounded-full border border-amber-200 text-xs font-bold uppercase tracking-wide">
                        <Clock size={14} /> Penerimaan Parsial
                    </span>
                );
            case 'Ada Reject':
                return (
                    <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-700 px-3 py-1 rounded-full border border-red-200 text-xs font-bold uppercase tracking-wide">
                        <AlertCircle size={14} /> Ada Item Reject
                    </span>
                );
            default:
                return null;
        }
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <PortalLayout>
            <div className="space-y-6 printable-area">
                
                {/* 1. HEADER HALAMAN & ACTIONS BAR */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-4 no-print">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-semibold text-gray-900 font-mono">
                                {grData.noReceipt}
                            </h1>
                            {renderStatusBadge(grData.status)}
                        </div>
                        <p className="text-sm text-gray-400 mt-1">
                            Arsip digital lembar penerimaan barang masuk gudang.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="inline-flex items-center gap-2 h-10 px-4 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium bg-white hover:bg-gray-50 transition"
                        >
                            <ArrowLeft size={16} /> Kembali
                        </button>

                        <button
                            type="button"
                            onClick={handlePrint}
                            className="inline-flex items-center gap-2 h-10 px-4 bg-gray-950 hover:bg-gray-800 text-white text-sm font-bold rounded-lg transition shadow-md"
                        >
                            <Printer size={16} /> Cetak Bukti (PDF)
                        </button>
                    </div>
                </div>

                {/* AREA TAMPILAN NOTA CETAK / KARTU ARSIP */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    
                    {/* SEKSI KIRI: METADATA UTAMA DOKUMEN (LEBAR 2 KOLOM) */}
                    <div className="md:col-span-2 space-y-6">
                        
                        {/* 2. SUMMARY CARD HEADER */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <Calendar size={18} className="text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Tanggal & Waktu Masuk</p>
                                        <p className="text-sm font-semibold text-gray-800 mt-0.5">{grData.tanggalTerima}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <FileText size={18} className="text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400">No. Referensi PO Asal</p>
                                        <p className="text-sm font-mono font-bold text-blue-600 mt-0.5 inline-flex items-center gap-1 hover:underline cursor-pointer">
                                            {grData.noPoRef} <ExternalLink size={12} />
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Layers size={18} className="text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400">No. Surat Jalan Vendor</p>
                                        <p className="text-sm font-mono font-bold text-gray-800 mt-0.5 uppercase">{grData.noSuratJalan}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3 border-t sm:border-t-0 sm:border-l border-gray-100 sm:pt-0 pt-3 sm:pl-6">
                                <div className="flex items-start gap-3">
                                    <User size={18} className="text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Asal Vendor / Supplier</p>
                                        <p className="text-sm font-bold text-gray-900 mt-0.5">{grData.namaSupplier}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Warehouse size={18} className="text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Gudang Penyimpanan</p>
                                        <p className="text-sm font-semibold text-gray-700 mt-0.5">{grData.gudangTujuan}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <User size={18} className="text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Petugas Gudang Pemeriksa</p>
                                        <p className="text-sm font-semibold text-gray-700 mt-0.5">{grData.petugasPenerima}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 3. GRID ITEM DETAIL LIST BARANG */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
                            <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2 border-b border-gray-100 pb-3">
                                <Package size={16} className="text-blue-600" /> Manifes Rincian Fisik Item SKU
                            </h3>

                            <div className="overflow-x-auto border border-gray-200 rounded-xl">
                                <table className="min-w-full text-sm">
                                    <thead className="bg-gray-50 font-bold border-b border-gray-200 text-xs text-gray-600 uppercase tracking-wider">
                                        <tr>
                                            <th className="px-4 py-3 text-left">SKU & Deskripsi Barang</th>
                                            <th className="px-3 py-3 text-center w-16">Unit</th>
                                            <th className="px-3 py-3 text-center w-20">QTY PO</th>
                                            <th className="px-3 py-3 text-center w-20 text-emerald-700 bg-emerald-50/50">QTY OK</th>
                                            <th className="px-3 py-3 text-center w-20 text-red-600 bg-red-50/50">QTY Rjct</th>
                                            <th className="px-4 py-3 text-left w-40">No. Batch/Serial</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white text-xs text-gray-700">
                                        {grData.items.map((item, index) => {
                                            const progressPersen = (item.qtyDiterima / item.qtyPo) * 100;
                                            return (
                                                <tr key={item.id} className="hover:bg-gray-50/30 transition-colors">
                                                    {/* Identitas Barang */}
                                                    <td className="px-4 py-3">
                                                        <p className="font-mono font-bold text-blue-600 mb-0.5">{item.kodeSku}</p>
                                                        <p className="font-bold text-gray-900 mb-2">{item.namaBarang}</p>
                                                        <p className="text-[11px] text-gray-400 italic font-medium bg-gray-50 p-2 rounded border border-gray-100 leading-relaxed">
                                                            <strong>Catatan Kondisi:</strong> {item.kondisi}
                                                        </p>
                                                    </td>

                                                    {/* Satuan UOM */}
                                                    <td className="px-3 py-3 text-center">
                                                        <span className="bg-gray-100 text-gray-600 font-mono font-bold text-[10px] px-1.5 py-0.5 rounded border border-gray-200">
                                                            {item.satuan}
                                                        </span>
                                                    </td>

                                                    {/* Qty Original PO */}
                                                    <td className="px-3 py-3 text-center font-mono font-bold text-gray-400">
                                                        {item.qtyPo}
                                                    </td>

                                                    {/* Qty Diterima Bagus */}
                                                    <td className="px-3 py-3 text-center font-mono font-black text-emerald-600 bg-emerald-50/10">
                                                        {item.qtyDiterima}
                                                    </td>

                                                    {/* Qty Rusak / Reject */}
                                                    <td className={`px-3 py-3 text-center font-mono font-black bg-red-50/10 ${item.qtyReject > 0 ? 'text-red-600 bg-red-50/30' : 'text-gray-300'}`}>
                                                        {item.qtyReject}
                                                    </td>

                                                    {/* Batch / Serial Number */}
                                                    <td className="px-4 py-3 font-mono text-gray-600 font-bold tracking-tight">
                                                        {item.noBatchSerial}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>

                    {/* SEKSI KANAN: BERITA ACARA & SIGNATURE AUDIT TRACK (LEBAR 1 KOLOM) */}
                    <div className="space-y-6">
                        
                        {/* Berita Acara Catatan Pemeriksa */}
                        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-3">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Berita Acara / Keterangan Masuk</h4>
                            <div className="text-xs text-gray-600 font-medium bg-slate-50 border border-slate-200 p-3.5 rounded-lg leading-relaxed">
                                {grData.catatan}
                            </div>
                        </div>

                        {/* Validasi Dokumen Ledger */}
                        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Status Validasi Sistem</h4>
                            
                            <div className="space-y-3">
                                <div className="flex items-center justify-between border-b border-gray-100 pb-2 text-xs">
                                    <span className="text-gray-500 font-medium">Stok Ter-update</span>
                                    <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">SUCCESS</span>
                                </div>
                                <div className="flex items-center justify-between border-b border-gray-100 pb-2 text-xs">
                                    <span className="text-gray-500 font-medium">Jurnal Ledger Akun</span>
                                    <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">AUTO_POSTED</span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-gray-500 font-medium">Kondisi Sinkronisasi PO</span>
                                    <span className="text-red-600 font-bold bg-red-50 px-2 py-0.5 rounded border border-red-200">COMPLETED_WITH_REJECT</span>
                                </div>
                            </div>
                        </div>

                        {/* Dokumentasi Lembar Tanda Tangan Cetak */}
                        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-8 pt-6">
                            <div className="text-center">
                                <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-12">Diserahkan Oleh (Driver Vendor)</p>
                                <div className="h-px bg-gray-300 w-36 mx-auto mb-1"></div>
                                <p className="text-xs font-bold text-gray-700">Tanda Tangan Kurir</p>
                            </div>

                            <div className="text-center">
                                <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-12">Diterima & Diperiksa Oleh</p>
                                <div className="h-px bg-gray-900 w-48 mx-auto mb-1"></div>
                                <p className="text-xs font-bold text-gray-900">{grData.petugasPenerima}</p>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

            {/* CSS inline khusus untuk kebutuhan perapihan hasil cetak printer (window.print) */}
            <style>{`
                @media print {
                    .no-print { display: none !important; }
                    body { background-color: #ffffff !important; color: #000000 !important; }
                    .printable-area { space-y: 0 !important; }
                    .bg-white, .bg-slate-50, .bg-gray-50 { background-color: #ffffff !important; border: none !important; shadow: none !important; }
                    table { border: 1px solid #e2e8f0 !important; }
                }
            `}</style>
        </PortalLayout>
    );
}