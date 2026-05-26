import React, { useState } from 'react'; 
import { useNavigate, useParams } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';

import {
    ArrowLeft,
    Coins,
    Printer,
    Calendar,
    FileText,
    Layers,
    Check,
    FilePlus,
    SearchCode,
    ThumbsUp,
    RefreshCw,
    TrendingUp,
    Percent
} from 'lucide-react';

export default function DetailRealisasiBudget() {
    const navigate = useNavigate();
    const { id } = useParams(); 
    
    // State Kontrol Modal Approval
    const [isStatusRealisasiModalOpen, setIsStatusRealisasiModalOpen] = useState(false);

    // State form approval realisasi
    const [realisasiForm, setRealisasiForm] = useState({
        status: "APPROVE",
        catatan: ""
    });

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setRealisasiForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveApproval = () => {
        alert(`Status Realisasi Budget berhasil diperbarui ke: ${realisasiForm.status}`);
        setIsStatusRealisasiModalOpen(false);
    };

    const handleResetForm = () => {
        setRealisasiForm({
            status: "APPROVE",
            catatan: ""
        });
    };

    // Mock Data Khusus Detail Realisasi Budget
    const detailData = {
        kodeRealisasi: 'REQ-BGT/AGS/0526/0142',
        kodeRAB: 'RAB/AGS/USR/0526/0001',
        namaProject: 'Pembangunan Gedung Kantor Pusat',
        tahunAnggaran: '2024',
        tanggalRealisasi: '25/05/2026',
        status: 'Disetujui',
        pic: 'Suryono Anggoro (Site Manager)',
        workflow: [
            { label: 'Pengajuan Realisasi', date: '23/05/2026 09:30', desc: 'Selesai', current: false, done: true, icon: FilePlus },
            { label: 'Verifikasi Finansial', date: '24/05/2026 14:15', desc: 'Selesai', current: false, done: true, icon: SearchCode },
            { label: 'Persetujuan / Dana Cair', date: '25/05/2026 11:00', desc: 'Disetujui', current: true, done: true, icon: ThumbsUp }
        ],
        // Item disesuaikan dengan skema budget vs realisasi riil
        items: [
            { id: 1, namaItem: 'Semen Portland (PC) @50kg', kategori: 'Material', kuantitas: 1000, satuan: 'Zak', budgetAwal: 97500000, realisasi: 65000000 },
            { id: 2, namaItem: 'Besi Beton Ulir D16', kategori: 'Material', kuantitas: 500, satuan: 'Batang', budgetAwal: 116000000, realisasi: 116000000 },
            { id: 3, namaItem: 'Sewa Excavator PC200', kategori: 'Alat Berat', kuantitas: 20, satuan: 'Jam', budgetAwal: 11000000, realisasi: 55000000 }, // Over-budget case
            { id: 4, namaItem: 'Upah Tenaga Kerja Struktur', kategori: 'Upah Kerja', kuantitas: 1, satuan: 'Lot', budgetAwal: 45000000, realisasi: 45000000 },
            { id: 5, namaItem: 'Pekerjaan Pondasi Tiang Pancang', kategori: 'Subkon', kuantitas: 1, satuan: 'Lot', budgetAwal: 185000000, realisasi: 150000000 },
        ]
    };

    const renderStatusBadge = (status) => {
        switch (status) {
            case 'Disetujui':
                return (
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
                        {status}
                    </span>
                );
            case 'Draft':
                return (
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold">
                        <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-1.5"></span>
                        {status}
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-1.5"></span>
                        {status}
                    </span>
                );
        }
    };

    // Kalkulasi total budget awal, total realisasi, dan sisa
    const totalBudgetAwal = detailData.items.reduce((sum, item) => sum + item.budgetAwal, 0);
    const totalRealisasi = detailData.items.reduce((sum, item) => sum + item.realisasi, 0);
    const persentasePenyerapan = (totalRealisasi / totalBudgetAwal) * 100;

    const formatRupiah = (angka) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(angka);
    };

    return (
        <PortalLayout>
            {/* Manipulasi Cetak Dokumen */}
            <style dangerouslySetInnerHTML={{__html: `
                @media print {
                    aside, nav, header, footer, .sidebar, .topbar, button {
                        display: none !important;
                    }
                    body, min-h-screen, .main-content {
                        background-color: white !important;
                        padding: 0 !important;
                        margin: 0 !important;
                    }
                    .shadow-sm {
                        box-shadow: none !important;
                        border: 1px solid #e5e7eb !important;
                    }
                }
            `}} />

            <div className="space-y-6">
                
                {/* 1. HEADER HALAMAN & BREADCRUMBS */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-4 print:hidden">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-semibold text-gray-900">
                                Detail Realisasi Budget
                            </h1>
                            {renderStatusBadge(detailData.status)}
                        </div>

                        <div className="flex items-center gap-2 mt-1 text-sm">
                            <span className="text-gray-400">Budget & RAB</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-gray-400">Realisasi Budget</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-blue-600 font-medium">{detailData.kodeRealisasi}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                        <button
                            type="button"
                            onClick={() => window.print()}
                            className="inline-flex items-center gap-2 h-10 px-3.5 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium bg-white hover:bg-gray-50 transition"
                        >
                            <Printer size={16} />
                            Cetak Laporan
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition"
                        >
                            <ArrowLeft size={16} />
                            Kembali
                        </button>
                    </div>
                </div>

                {/* AREA UTAMA / PRINT CONTAINER */}
                <div className="space-y-6 print:space-y-8 print:p-0">
                    
                    {/* Header Khusus Cetak Fiskal */}
                    <div className="hidden print:block border-b-2 border-gray-900 pb-4 mb-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 uppercase tracking-tight">Laporan Realisasi & Penyerapan Anggaran</h2>
                                <p className="text-sm font-mono text-gray-500 mt-0.5">No Realisasi: {detailData.kodeRealisasi}</p>
                            </div>
                            <div className="text-right">
                                <span className="text-sm font-bold uppercase tracking-wider px-3 py-1 bg-gray-100 border border-gray-300 text-gray-800 rounded">
                                    Status: {detailData.status}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* 2. AREA INFORMASI MASTER REALISASI */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm print:border-gray-300">
                        <div>
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-5">
                                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                    <FileText size={16} className="text-gray-400 print:hidden" /> Informasi Pengajuan Realisasi
                                </h2> 

                                <button
                                    onClick={() => setIsStatusRealisasiModalOpen(true)}
                                    className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition print:hidden"
                                >
                                    <RefreshCw size={16} />
                                    Proses Approval
                                </button>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 print:grid-cols-4">
                                <div className="space-y-1 md:col-span-2 print:col-span-2">
                                    <span className="text-xs text-gray-400 font-medium print:text-gray-500">Nama Proyek Utama</span>
                                    <p className="text-base font-semibold text-gray-900">{detailData.namaProject}</p>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-xs text-gray-400 font-medium print:text-gray-500">Kode Realisasi / RAB</span>
                                    <p className="text-sm font-mono font-bold text-gray-800">{detailData.kodeRealisasi}</p>
                                    <p className="text-[11px] font-mono text-gray-400">Ref RAB: {detailData.kodeRAB}</p>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-xs text-gray-400 font-medium print:text-gray-500">Tanggal Pencairan & TA</span>
                                    <p className="text-sm font-semibold text-gray-900 flex items-center gap-1.5">
                                        <Calendar size={14} className="text-gray-400 print:hidden" /> {detailData.tanggalRealisasi} ({detailData.tahunAnggaran})
                                    </p>
                                    <p className="text-[11px] text-gray-500">PIC: {detailData.pic}</p>
                                </div>
                            </div>
                        </div>

                        {/* Stepper Workflow Status */}
                        <div className="border-t border-gray-100 mt-4 print:border-gray-200">
                            <div className="overflow-x-auto pb-2 print:overflow-visible mt-4">
                                <div className="min-w-[800px] print:min-w-full flex items-center justify-between relative px-10 print:px-4">
                                    <div className="absolute top-5 left-20 right-20 h-1 bg-gray-100 -z-10 print:bg-gray-200" />

                                    {detailData.workflow.map((step, idx) => {
                                        const StepIcon = step.icon;
                                        return (
                                            <div key={idx} className="flex flex-col items-center text-center flex-1 relative">
                                                {idx > 0 && detailData.workflow[idx - 1].done && (
                                                    <div className={`absolute top-5 right-[50%] translate-y-[-50%] w-full h-1 -z-10 ${step.done ? 'bg-green-500' : 'bg-gray-100'}`} />
                                                )}

                                                <div className={`w-11 h-11 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${step.current ? 'bg-blue-600 border-blue-100 text-white shadow-md print:bg-white print:text-blue-600 print:border-blue-600' : step.done ? 'bg-green-500 border-green-100 text-white print:bg-white print:text-green-600 print:border-green-600' : 'bg-white border-gray-200 text-gray-400 print:border-gray-300'}`}>
                                                    {step.done && !step.current ? <Check size={18} className="stroke-[3]" /> : <StepIcon size={18} />}
                                                </div>

                                                <div className="mt-3 space-y-0.5">
                                                    <p className="text-sm font-bold text-gray-800">{step.label}</p>
                                                    <p className="text-[11px] text-gray-400 font-medium">{step.date}</p>
                                                    <p className={`text-xs font-semibold ${step.desc === 'Selesai' || step.desc === 'Disetujui' ? 'text-green-600' : 'text-blue-600'}`}>
                                                        {step.desc}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. RINCIAN TABEL REALISASI VS BUDGET */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4 print:border-gray-300 print:p-0 print:shadow-none">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2 print:text-gray-700 print:px-2">
                            <Layers size={16} className="text-gray-400 print:hidden" /> Perbandingan Alokasi Budget & Realisasi Lapangan
                        </h3>

                        <div className="overflow-x-auto border border-gray-200 rounded-xl print:border-gray-300 print:rounded-none">
                            <table className="min-w-full text-sm">
                                <thead className="bg-gray-50 text-gray-700 font-semibold border-b border-gray-200 print:bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-3 text-center w-12">No</th>
                                        <th className="px-4 py-3 text-left">Komponen Pekerjaan</th>
                                        <th className="px-4 py-3 text-left w-32">Kategori</th>
                                        <th className="px-4 py-3 text-right w-44">Plavon Budget Awal</th>
                                        <th className="px-4 py-3 text-right w-44">Realisasi Dibayarkan</th>
                                        <th className="px-4 py-3 text-right w-44">Sisa / Selisih</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white text-gray-600 print:divide-gray-300">
                                    {detailData.items.map((item, index) => {
                                        const sisa = item.budgetAwal - item.realisasi;
                                        return (
                                            <tr key={item.id} className="hover:bg-gray-50/50 transition-colors print:hover:bg-transparent">
                                                <td className="px-4 py-3.5 text-center font-medium text-gray-400 print:text-gray-700">
                                                    {index + 1}
                                                </td>
                                                <td className="px-4 py-3.5 font-medium text-gray-900">
                                                    {item.namaItem}
                                                    <div className="text-[11px] text-gray-400 font-normal">Volume Req: {item.kuantitas} {item.satuan}</div>
                                                </td>
                                                <td className="px-4 py-3.5">
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200 print:bg-transparent print:border-none print:p-0">
                                                        {item.kategori}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3.5 text-right text-gray-700">
                                                    {formatRupiah(item.budgetAwal)}
                                                </td>
                                                <td className="px-4 py-3.5 text-right font-semibold text-gray-900">
                                                    {formatRupiah(item.realisasi)}
                                                </td>
                                                <td className={`px-4 py-3.5 text-right font-bold ${sisa < 0 ? 'text-red-600 bg-red-50/30' : 'text-green-600'}`}>
                                                    {sisa < 0 ? `(Over) ${formatRupiah(Math.abs(sisa))}` : formatRupiah(sisa)}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* Ringkasan Akumulasi Total Realisasi */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-center justify-between print:border-gray-300">
                                <div className="space-y-0.5">
                                    <span className="text-xs text-gray-400 font-medium block">Total Anggaran (RAB)</span>
                                    <span className="text-base font-bold text-gray-800">{formatRupiah(totalBudgetAwal)}</span>
                                </div>
                            </div>
                            <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 flex items-center justify-between print:border-gray-300">
                                <div className="space-y-0.5">
                                    <span className="text-xs text-blue-600 font-medium block flex items-center gap-1"><TrendingUp size={12} /> Total Dana Terealisasi</span>
                                    <span className="text-base font-bold text-blue-700">{formatRupiah(totalRealisasi)}</span>
                                </div>
                            </div>
                            <div className="bg-slate-900 text-white border border-slate-800 rounded-xl p-4 flex items-center justify-between print:bg-gray-100 print:text-gray-900 print:border-gray-300">
                                <div className="space-y-0.5">
                                    <span className="text-xs text-slate-400 font-medium block print:text-gray-500 flex items-center gap-1"><Percent size={12} /> Persentase Serapan Budget</span>
                                    <span className="text-base font-black print:text-gray-900">{persentasePenyerapan.toFixed(1)}% Penyerapan</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL Approval Realisasi */}
            {isStatusRealisasiModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                        
                        {/* HEADER */}
                        <div className="px-6 py-4 border-b flex items-center justify-between">
                            <h3 className="text-lg font-bold text-gray-800">
                                Verifikasi & Approval Realisasi Budget
                            </h3>
                            <button
                                onClick={() => setIsStatusRealisasiModalOpen(false)}
                                className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
                            >
                                <span className="text-xs font-bold">✕</span>
                            </button>
                        </div>

                        {/* BODY */}
                        <div className="p-6 space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-800 mb-2">Kode Realisasi</label>
                                    <input
                                        type="text"
                                        readOnly
                                        value={detailData.kodeRealisasi}
                                        className="w-full h-11 rounded-xl bg-gray-100 border border-gray-200 px-4 text-xs font-medium text-gray-700 outline-none cursor-not-allowed"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-800 mb-2">Total Nilai Pencairan</label>
                                    <input
                                        type="text"
                                        readOnly
                                        value={formatRupiah(totalRealisasi)}
                                        className="w-full h-11 rounded-xl bg-gray-100 border border-gray-200 px-4 text-xs font-mono font-bold text-blue-600 outline-none cursor-not-allowed"
                                    />
                                </div>
                            </div>

                            {/* Approval Action */}
                            <div>
                                <label className="block text-xs font-bold text-gray-800 mb-2">
                                    Aksi Persetujuan <span className="text-red-500">*</span>
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                                    {/* DRAFT / HOLD */}
                                    <div 
                                        onClick={() => handleFormChange({ target: { name: 'status', value: 'HOLD / RE-CHECK' } })}
                                        className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                                            realisasiForm.status === 'HOLD / RE-CHECK' 
                                            ? 'bg-slate-100 border-slate-400 ring-2 ring-slate-400/20' 
                                            : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                                        }`}
                                    >
                                        <span className="block text-xs font-bold text-slate-800">HOLD / AUDIT</span>
                                        <span className="block text-[11px] text-slate-500 mt-1">Penundaan pencairan untuk kroscek internal</span>
                                    </div>

                                    {/* APPROVE */}
                                    <div 
                                        onClick={() => handleFormChange({ target: { name: 'status', value: 'APPROVE' } })}
                                        className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                                            realisasiForm.status === 'APPROVE' 
                                            ? 'bg-green-550 border-green-500 ring-2 ring-green-500/20' 
                                            : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        <span className="block text-xs font-bold text-green-600">SETUJUI & CAIRKAN</span>
                                        <span className="block text-[11px] text-green-600/70 mt-1">Sesuai aturan dan alokasi disetujui</span>
                                    </div>

                                    {/* REJECTED */}
                                    <div 
                                        onClick={() => handleFormChange({ target: { name: 'status', value: 'REJECTED' } })}
                                        className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                                            realisasiForm.status === 'REJECTED' 
                                            ? 'bg-red-50 border-red-400 ring-2 ring-red-400/20' 
                                            : 'bg-red-50/30 border-red-200 hover:border-red-300'
                                        }`}
                                    >
                                        <span className="block text-xs font-bold text-red-500">TOLAK PENGELUARAN</span>
                                        <span className="block text-[11px] text-red-400/70 mt-1">Pengajuan menyalahi limit/anggaran</span>
                                    </div>
                                </div>
                            </div>

                            {/* CATATAN VERIFIKASI */}
                            <div>
                                <label className="block text-xs font-bold text-gray-800 mb-2">Catatan Finansial (Opsional)</label>
                                <textarea
                                    name="catatan"
                                    value={realisasiForm.catatan}
                                    onChange={handleFormChange}
                                    placeholder="Tulis alasan, memo, atau referensi transfer dana keuangan..."
                                    rows={3}
                                    className="w-full rounded-xl border border-gray-200 p-4 text-xs text-gray-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400 resize-none"
                                />
                            </div>
                        </div>

                        {/* FOOTER */}
                        <div className="px-6 py-4 bg-gray-50 border-t flex items-center justify-start gap-3">
                            <button
                                onClick={handleSaveApproval}
                                className="h-10 px-6 rounded-lg bg-green-500 hover:bg-green-600 text-white text-xs font-semibold shadow-sm transition-colors"
                            >
                                Konfirmasi Status
                            </button>
                            <button
                                onClick={handleResetForm}
                                className="h-10 px-6 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-semibold shadow-sm transition-colors"
                            >
                                Reset Form
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </PortalLayout>
    );
}