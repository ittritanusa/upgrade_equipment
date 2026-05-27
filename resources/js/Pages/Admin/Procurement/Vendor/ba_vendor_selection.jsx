import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';

import {
    ArrowLeft,
    FileCheck2,
    Award,
    Download,
    Printer,
    FileText,
    TrendingDown,
    Building2,
    Calendar,
    Coins
} from 'lucide-react';

export default function DetailBeritaAcaraVendor() {
    const navigate = useNavigate();
    const { id } = useParams();

    // ==========================================
    // SIMULASI DATA DETAIL BERITA ACARA SELEKSI
    // ==========================================
    const [baDetail] = useState({
        nomorBA: 'BA-SV/PROC/AGS/2026/05/012',
        tanggalBA: '27/05/2026',
        kodeRFQ: 'RFQ/PROC/AGS/2026/05/002',
        kodePR: 'PR/PROC/AGS/2026/04/015',
        perihal: 'Peremajaan Server Ruang Data Center',
        divisiPemohon: 'Teknologi Informasi',
        anggaranOE: 95000000, // Owner Estimate / Pagu Anggaran Maksimal
        
        // Informasi Vendor Terpilih (Pemenang)
        pemenang: {
            id: 2,
            nama: 'CV. TechMedia Nusantara',
            totalPenawaran: 89900000,
            filePenawaran: 'TMN-PRQM-2026.pdf',
            alasanPemilihan: 'Menawarkan harga terendah yang kompetitif dengan pemenuhan spesifikasi teknis 100% sesuai PR, serta bersedia memberikan penambahan garansi hardware menjadi total 4 tahun.',
            catatanNegosiasi: 'Termasuk gratis biaya instalasi, konfigurasi awal server, dan integrasi ke jaringan core eksisting pada hari libur (weekend).'
        },

        // Rekapitulasi Penawaran Seluruh Peserta (Peringkat Evaluasi)
        peringkatVendor: [
            { peringkat: 1, nama: 'CV. TechMedia Nusantara', totalBid: 89900000, status: 'Pemenang Utam' },
            { peringkat: 2, nama: 'PT. Computindo Utama', totalBid: 91000000, status: 'Ditolak' },
            { peringkat: 3, nama: 'PT. Sinergi Integrasi', totalBid: 92000000, status: 'Ditolak' }
        ]
    });

    // Helper Format Rupiah
    const formatRupiah = (angka) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(angka);
    };

    // Hitung Nilai Efisiensi Pengadaan (Saving)
    const nilaiSaving = baDetail.anggaranOE - baDetail.pemenang.totalPenawaran;
    const persentaseSaving = ((nilaiSaving / baDetail.anggaranOE) * 100).toFixed(1);

    return (
        <PortalLayout>
            <div className="space-y-6">
                
                {/* 1. HEADER HALAMAN & BREADCRUMBS */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Berita Acara Kelulusan & Pemilihan Vendor
                        </h1>

                        <div className="flex items-center gap-2 mt-1 text-sm">
                            <span className="text-gray-400">Procurement</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-gray-400">Vendor Selection</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-blue-600 font-medium">{baDetail.nomorBA}</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
                        <button
                            type="button"
                            onClick={() => window.print()}
                            className="inline-flex items-center gap-1.5 h-10 px-3.5 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium bg-white hover:bg-gray-50 transition"
                        >
                            <Printer size={15} /> Cetak BA
                        </button>
                        
                        <button
                            type="button"
                            className="inline-flex items-center gap-1.5 h-10 px-3.5 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium bg-white hover:bg-gray-50 transition"
                        >
                            <Download size={15} /> Export PDF
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate('/portal/vendor-selection')}
                            className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-gray-950 text-white text-sm font-medium hover:bg-gray-800 transition"
                        >
                            <ArrowLeft size={16} /> Kembali ke List
                        </button>
                    </div>
                </div>

                {/* 2. AREA FINANCIAL SAVING CARD SUMMARY */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Pagu Estimasi Anggaran (OE)</span>
                        <span className="text-xl font-bold text-gray-800 mt-1 block">
                            {formatRupiah(baDetail.anggaranOE)}
                        </span>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm border-l-4 border-l-emerald-500">
                        <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider block">Nilai Kontrak Pemenang</span>
                        <span className="text-xl font-black text-emerald-700 mt-1 block">
                            {formatRupiah(baDetail.pemenang.totalPenawaran)}
                        </span>
                    </div>
                    <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5 shadow-sm flex items-center justify-between">
                        <div>
                            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">Efisiensi Biaya (Cost Saving)</span>
                            <span className="text-xl font-black text-emerald-800 mt-1 block">
                                {formatRupiah(nilaiSaving)} <span className="text-xs font-normal text-emerald-600">({persentaseSaving}%)</span>
                            </span>
                        </div>
                        <div className="p-2.5 bg-emerald-500 text-white rounded-lg">
                            <TrendingDown size={18} />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                    
                    {/* LEFT / MAIN COLUMN: INFORMASI DETAIL BERITA ACARA */}
                    <div className="lg:col-span-2 space-y-6">
                        
                        {/* Panel Informasi Utama Dokumen */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
                            <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                                <FileCheck2 size={18} className="text-blue-600" />
                                <h3 className="text-base font-bold text-gray-800">Dokumen Berita Acara</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 text-xs">
                                <div>
                                    <span className="block font-semibold text-gray-400 mb-0.5 uppercase tracking-wide">Nomor Berita Acara (BA)</span>
                                    <p className="font-bold text-gray-900 text-sm tracking-wide">{baDetail.nomorBA}</p>
                                </div>
                                <div>
                                    <span className="block font-semibold text-gray-400 mb-0.5 uppercase tracking-wide">Tanggal Pengesahan BA</span>
                                    <p className="font-medium text-gray-800 inline-flex items-center gap-1">
                                        <Calendar size={13} /> {baDetail.tanggalBA}
                                    </p>
                                </div>
                                <div>
                                    <span className="block font-semibold text-gray-400 mb-0.5 uppercase tracking-wide">Referensi Dokumen RFQ</span>
                                    <p className="font-semibold text-blue-600 hover:underline cursor-pointer">{baDetail.kodeRFQ}</p>
                                </div>
                                <div>
                                    <span className="block font-semibold text-gray-400 mb-0.5 uppercase tracking-wide">Referensi Dokumen PR</span>
                                    <p className="font-semibold text-gray-700">{baDetail.kodePR}</p>
                                </div>
                                <div className="md:col-span-2 border-t border-gray-100 pt-3">
                                    <span className="block font-semibold text-gray-400 mb-0.5 uppercase tracking-wide">Perihal Pengadaan Barang / Jasa</span>
                                    <p className="font-bold text-gray-900 text-sm leading-relaxed">{baDetail.perihal}</p>
                                    <p className="text-[11px] text-gray-400 mt-0.5">Pemohon: Divisi {baDetail.divisiPemohon}</p>
                                </div>
                            </div>
                        </div>

                        {/* Panel Justifikasi Hasil Evaluasi Penetapan Pemenang */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
                            <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                                <Award size={18} className="text-amber-500" />
                                <h3 className="text-base font-bold text-gray-800">Pernyataan & Justifikasi Pemenang</h3>
                            </div>

                            <div className="space-y-4 text-xs">
                                <div>
                                    <span className="block font-bold text-gray-400 uppercase tracking-wider mb-1">Vendor Terpilih Utama:</span>
                                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-center justify-between">
                                        <div>
                                            <p className="font-black text-gray-900 text-sm uppercase tracking-wide">{baDetail.pemenang.nama}</p>
                                            <p className="text-gray-500 font-medium text-[11px] mt-0.5">Nilai Kontrak Akhir: <span className="font-bold text-blue-600">{formatRupiah(baDetail.pemenang.totalPenawaran)}</span></p>
                                        </div>
                                        <span className="px-2.5 py-1 bg-amber-500 text-white rounded text-[10px] font-bold uppercase tracking-widest">SELECTED</span>
                                    </div>
                                </div>

                                <div>
                                    <span className="block font-semibold text-gray-400 uppercase tracking-wide mb-1">Dasar Justifikasi & Pertimbangan Kelulusan:</span>
                                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 text-gray-700 leading-relaxed font-medium">
                                        {baDetail.pemenang.alasanPemilihan}
                                    </div>
                                </div>

                                <div>
                                    <span className="block font-semibold text-gray-400 uppercase tracking-wide mb-1">Poin Tambahan Hasil Negosiasi Komersial:</span>
                                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 text-gray-700 leading-relaxed italic">
                                        {baDetail.pemenang.catatanNegosiasi || '- Tidak ada catatan negosiasi tambahan -'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: REKAPITULASI DAFTAR PERINGKAT BIDDING */}
                    <div className="lg:col-span-1 space-y-6">
                        
                        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
                            <div className="flex items-center gap-2 border-b border-gray-100 pb-2.5">
                                <Building2 size={16} className="text-gray-500" />
                                <h3 className="text-sm font-bold text-gray-800">Rekap Peringkat Penawaran</h3>
                            </div>

                            <p className="text-[11px] text-gray-400 leading-normal">
                                Berikut urutan penawaran harga dari seluruh vendor terundang berdasarkan nilai komparasi termurah:
                            </p>

                            <div className="space-y-3">
                                {baDetail.peringkatVendor.map((v) => (
                                    <div 
                                        key={v.peringkat} 
                                        className={`p-3 rounded-xl border text-xs flex items-center justify-between transition ${
                                            v.peringkat === 1 
                                                ? 'bg-emerald-50/70 border-emerald-300 text-emerald-900 shadow-sm' 
                                                : 'bg-white border-gray-200 text-gray-700'
                                        }`}
                                    >
                                        <div className="space-y-0.5">
                                            <div className="flex items-center gap-1.5">
                                                <span className={`inline-grid place-content-center w-5 h-5 rounded-full text-[10px] font-bold ${
                                                    v.peringkat === 1 ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-500'
                                                }`}>
                                                    {v.peringkat}
                                                </span>
                                                <p className="font-bold tracking-wide text-gray-900 truncate max-w-[140px] uppercase">
                                                    {v.nama}
                                                </p>
                                            </div>
                                            <p className={`text-[11px] font-semibold pl-6 ${v.peringkat === 1 ? 'text-emerald-700' : 'text-gray-500'}`}>
                                                {formatRupiah(v.totalBid)}
                                            </p>
                                        </div>

                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                                            v.peringkat === 1 ? 'bg-emerald-200 text-emerald-800' : 'bg-gray-100 text-gray-400'
                                        }`}>
                                            {v.peringkat === 1 ? 'Pemenang' : 'Gugur'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* PANEL TANDA TANGAN DIGITAL / STATUS OTORISASI */}
                        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
                            <h3 className="text-sm font-bold text-gray-800 border-b border-gray-100 pb-2">Status Validasi Dokumen</h3>
                            
                            <div className="space-y-3 text-xs">
                                <div className="flex items-center justify-between border-b border-dashed border-gray-100 pb-2">
                                    <span className="text-gray-400">Dibuat Oleh:</span>
                                    <span className="font-semibold text-gray-800 text-right">Tim Purchasing <span className="block text-[10px] text-gray-400 font-normal">27/05/2026</span></span>
                                </div>
                                <div className="flex items-center justify-between border-b border-dashed border-gray-100 pb-2">
                                    <span className="text-gray-400">Diperiksa Oleh:</span>
                                    <span className="font-semibold text-emerald-600 text-right">Procurement Mgr <span className="block text-[10px] text-emerald-500 font-bold uppercase tracking-widest">✔ APPROVED</span></span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-400">Disetujui Oleh:</span>
                                    <span className="font-semibold text-emerald-600 text-right">Finance Director <span className="block text-[10px] text-emerald-500 font-bold uppercase tracking-widest">✔ APPROVED</span></span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </PortalLayout>
    );
}