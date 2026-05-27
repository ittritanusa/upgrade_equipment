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
    User,
    AlertCircle
} from 'lucide-react';

export default function DetailPurchaseRequest() {
    const navigate = useNavigate();
    const { id } = useParams(); // Mengambil ID PR dari URL parameter
    
    // State Kontrol Modal Approval Status
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

    // State form approval pendukung
    const [approvalForm, setApprovalForm] = useState({
        status: "PENDING",
        catatan: ""
    });

    const handleStatusChange = (statusValue) => {
        setApprovalForm(prev => ({ ...prev, status: statusValue }));
    };

    const handleSaveStatus = () => {
        alert(`Status Dokumen PR berhasil diperbarui ke: ${approvalForm.status}`);
        setIsStatusModalOpen(false);
    };

    // MOCK DATA DETAIL PR (Sesuai dengan skema objek hasil CreatePurchaseRequest)
    const prDetail = {
        nomorPr: 'PR/PROC/AGS/2026/05/004',
        tanggalPengajuan: '2026-05-27',
        divisiPemohon: 'Operasional & Proyek',
        prioritas: 'Urgent / Mendesak',
        catatan: 'Pengadaan kebutuhan mendesak untuk menunjang percepatan infrastruktur IT di area site office.',
        status: 'Pending', // Status dokumen saat ini (Draft, Pending, Disetujui, Ditolak)
        
        // Rincian item pengadaan yang di breakdown
        items: [
            { id: 1, namaItem: 'Laptop Asus ROG Strix Core i7 Gen 13', kategori: 'Aset Tetap', kuantitas: 2, satuan: 'Unit', hargaSatuan: 24500000, total: 49000000 },
            { id: 2, namaItem: 'Sewa Alat Berat Excavator PC200 (Bulanan)', kategori: 'Jasa', kuantitas: 1, satuan: 'Lot', hargaSatuan: 35000000, total: 35000000 },
            { id: 3, namaItem: 'Kabel Lan Belden Cat6 @300 Meter', kategori: 'Barang', kuantitas: 3, satuan: 'Roll', hargaSatuan: 2800000, total: 8400000 },
            { id: 4, namaItem: 'Connector RJ45 Besi AMP', kategori: 'Barang', kuantitas: 5, satuan: 'Box', hargaSatuan: 350000, total: 1750000 }
        ]
    };

    // Helper Flow Tracker Progress Persetujuan Dokumen
    const workflowSteps = [
        { label: 'Dibuat (Draft)', date: '27/05/2026 09:00', desc: 'Selesai', current: false, done: true, icon: FilePlus },
        { label: 'Verifikasi Divisi', date: '27/05/2026 10:15', desc: 'Selesai', current: false, done: true, icon: SearchCode },
        { label: 'Persetujuan Manajemen', date: '--/--/----', desc: prDetail.status, current: true, done: false, icon: ThumbsUp }
    ];

    // Helper Badge Warna Status Dokumen
    const renderStatusBadge = (status) => {
        switch (status?.toLowerCase()) {
            case 'disetujui':
            case 'approve':
                return (
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
                        Disetujui
                    </span>
                );
            case 'rejected':
            case 'ditolak':
                return (
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-1.5"></span>
                        Ditolak
                    </span>
                );
            case 'draft':
                return (
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold">
                        <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-1.5"></span>
                        Draft
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-1.5"></span>
                        Pending Review
                    </span>
                );
        }
    };

    // Hitung Akumulasi Grand Total Anggaran Item PR
    const calculateGrandTotal = () => {
        return prDetail.items.reduce((sum, item) => sum + (item.total || 0), 0);
    };

    // Format Rupiah
    const formatRupiah = (angka) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(angka);
    };

    return (
        <PortalLayout>
            {/* CSS Override Khusus Media Cetak / Print */}
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
                                Detail Purchase Request
                            </h1>
                            {renderStatusBadge(prDetail.status)}
                        </div>

                        <div className="flex items-center gap-2 mt-1 text-sm">
                            <span className="text-gray-400">Procurement</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-gray-400">Purchase Request</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-blue-600 font-medium">{prDetail.nomorPr}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                        <button
                            type="button"
                            onClick={() => window.print()}
                            className="inline-flex items-center gap-2 h-10 px-3.5 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium bg-white hover:bg-gray-50 transition"
                        >
                            <Printer size={16} />
                            Cetak / PDF
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

                {/* CONTAINER UTAMA AREA DETAIL (PRINTABLE) */}
                <div className="space-y-6 print:space-y-8 print:p-0">
                    
                    {/* Header Khusus Tampilan Dokumen Cetak */}
                    <div className="hidden print:block border-b-2 border-gray-900 pb-4 mb-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 uppercase tracking-tight">Formulir Internal Purchase Request (PR)</h2>
                                <p className="text-sm font-mono text-gray-500 mt-0.5">Dokumen No: {prDetail.nomorPr}</p>
                            </div>
                            <div className="text-right">
                                <span className="text-sm font-bold uppercase tracking-wider px-3 py-1 bg-gray-100 border border-gray-300 text-gray-800 rounded">
                                    Status: {prDetail.status}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* 2. PANEL INFORMASI UTAMA PENGAJUAN */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm print:border-gray-300">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-5">
                            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                <FileText size={16} className="text-gray-400 print:hidden" /> Informasi Pengajuan Pengadaan
                            </h2> 

                            <button
                                onClick={() => setIsStatusModalOpen(true)}
                                className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition print:hidden"
                            >
                                <RefreshCw size={16} />
                                Proses Tindakan Approval
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 print:grid-cols-4">
                            <div className="space-y-1">
                                <span className="text-xs text-gray-400 font-medium print:text-gray-500">Nomor Registrasi PR</span>
                                <p className="text-sm font-mono font-bold text-blue-600 print:text-gray-900">{prDetail.nomorPr}</p>
                            </div>
                            <div className="space-y-1">
                                <span className="text-xs text-gray-400 font-medium print:text-gray-500">Tanggal Pengajuan</span>
                                <p className="text-sm font-semibold text-gray-900 flex items-center gap-1.5">
                                    <Calendar size={14} className="text-gray-400 print:hidden" /> {prDetail.tanggalPengajuan}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <span className="text-xs text-gray-400 font-medium print:text-gray-500">Divisi / Departemen</span>
                                <p className="text-sm font-semibold text-gray-900 flex items-center gap-1.5">
                                    <User size={14} className="text-gray-400 print:hidden" /> {prDetail.divisiPemohon || '-'}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <span className="text-xs text-gray-400 font-medium print:text-gray-500">Tingkat Prioritas</span>
                                <p className="text-sm font-bold text-red-600">{prDetail.prioritas}</p>
                            </div>
                        </div>

                        {/* Catatan / Perihal Deskripsi */}
                        <div className="mt-5 pt-4 border-t border-gray-100 bg-gray-50/50 p-4 rounded-xl border border-dashed border-gray-200 print:bg-transparent print:p-0 print:border-none print:mt-4">
                            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block mb-1 print:text-gray-500">Catatan / Perihal Pengajuan:</span>
                            <p className="text-sm text-gray-700 leading-relaxed font-medium">{prDetail.catatan}</p>
                        </div>

                        {/* Stepper Flow Prosedur Dokumen */}
                        <div className="border-t border-gray-100 mt-6 pt-6 print:hidden">
                            <div className="overflow-x-auto pb-2">
                                <div className="min-w-[700px] flex items-center justify-between relative px-10">
                                    <div className="absolute top-5 left-20 right-20 h-1 bg-gray-100 -z-10" />

                                    {workflowSteps.map((step, idx) => {
                                        const StepIcon = step.icon;
                                        return (
                                            <div key={idx} className="flex flex-col items-center text-center flex-1 relative">
                                                {idx > 0 && workflowSteps[idx - 1].done && (
                                                    <div className={`absolute top-5 right-[50%] translate-y-[-50%] w-full h-1 -z-10 ${step.done ? 'bg-green-500' : 'bg-gray-100'}`} />
                                                )}

                                                <div className={`w-11 h-11 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${step.current && !step.done ? 'bg-blue-600 border-blue-100 text-white shadow-md' : step.done ? 'bg-green-500 border-green-100 text-white' : 'bg-white border-gray-200 text-gray-400'}`}>
                                                    {step.done ? <Check size={18} className="stroke-[3]" /> : <StepIcon size={18} />}
                                                </div>

                                                <div className="mt-3 space-y-0.5">
                                                    <p className="text-sm font-bold text-gray-800">{step.label}</p>
                                                    <p className="text-[11px] text-gray-400 font-medium">{step.date}</p>
                                                    <p className={`text-xs font-semibold ${step.desc === 'Selesai' || step.desc === 'Disetujui' ? 'text-green-600' : step.desc === 'Pending' ? 'text-blue-600' : 'text-gray-400'}`}>
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

                    {/* 3. PANEL BREAKDOWN ITEM TABEL BARANG/JASA */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4 print:border-gray-300 print:p-0 print:shadow-none">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2 print:text-gray-700 print:px-2">
                            <Layers size={16} className="text-gray-400 print:hidden" /> Rincian Kebutuhan Barang / Jasa (Breakdown)
                        </h3>

                        <div className="overflow-x-auto border border-gray-200 rounded-xl print:border-gray-300 print:rounded-none">
                            <table className="min-w-full text-sm">
                                <thead className="bg-gray-50 border-b border-gray-200 text-gray-700 font-semibold print:bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-3 text-center w-12">No</th>
                                        <th className="px-4 py-3 text-left">Nama Barang / Jasa Pekerjaan</th>
                                        <th className="px-4 py-3 text-left w-40">Kategori PR</th>
                                        <th className="px-4 py-3 text-center w-20">Jumlah</th>
                                        <th className="px-4 py-3 text-left w-24">Satuan</th>
                                        <th className="px-4 py-3 text-right w-44">Estimasi Harga Satuan</th>
                                        <th className="px-4 py-3 text-right w-44">Total Estimasi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white text-gray-600 print:divide-gray-300">
                                    {prDetail.items.map((item, index) => (
                                        <tr key={item.id} className="hover:bg-gray-50/50 transition-colors print:hover:bg-transparent">
                                            <td className="px-4 py-3.5 font-medium text-gray-400 text-center print:text-gray-700">
                                                {index + 1}
                                            </td>
                                            <td className="px-4 py-3.5 font-semibold text-gray-900">
                                                {item.namaItem}
                                            </td>
                                            <td className="px-4 py-3.5">
                                                <span className={`px-2 py-0.5 rounded text-xs font-medium ${item.kategori === 'Aset Tetap' ? 'bg-purple-50 text-purple-700 border border-purple-200' : item.kategori === 'Jasa' ? 'bg-orange-50 text-orange-700 border border-orange-200' : 'bg-blue-50 text-blue-700 border border-blue-200'}`}>
                                                    {item.kategori}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3.5 font-bold text-center text-gray-800">
                                                {item.kuantitas}
                                            </td>
                                            <td className="px-4 py-3.5 font-medium text-gray-500">
                                                {item.satuan}
                                            </td>
                                            <td className="px-4 py-3.5 font-medium text-right text-gray-700">
                                                {formatRupiah(item.hargaSatuan)}
                                            </td>
                                            <td className="px-4 py-3.5 font-bold text-right text-gray-900 bg-gray-50/30 print:bg-transparent">
                                                {formatRupiah(item.total)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Grand Total Row */}
                        <div className="flex flex-col items-end gap-2 pt-4 border-t border-gray-100 print:border-gray-300">
                            <div className="flex items-center gap-12 bg-slate-900 text-white px-6 py-4 rounded-xl shadow-sm print:bg-gray-100 print:text-gray-900 print:border print:border-gray-300 print:rounded-lg">
                                <div className="flex items-center gap-2">
                                    <Coins size={20} className="text-yellow-400 print:text-slate-700" />
                                    <span className="text-xs font-bold text-gray-300 uppercase tracking-wider print:text-gray-600">Total Keseluruhan Nilai PR:</span>
                                </div>
                                <span className="text-xl font-black tracking-wide text-white print:text-gray-900">
                                    {formatRupiah(calculateGrandTotal())}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL APPROVAL STATUS MANAGEMENT */}
            {isStatusModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                        
                        {/* HEADER MODAL */}
                        <div className="px-6 py-4 border-b flex items-center justify-between bg-gray-50">
                            <h3 className="text-base font-bold text-gray-800 flex items-center gap-2">
                                <AlertCircle size={18} className="text-blue-600" /> Kontrol Validasi Kelayakan Dokumen PR
                            </h3>
                            <button
                                onClick={() => setIsStatusModalOpen(false)}
                                className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-500 transition-colors text-xs font-bold"
                            >
                                ✕
                            </button>
                        </div>

                        {/* BODY MODAL */}
                        <div className="p-6 space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <span className="block text-xs font-semibold text-gray-400 uppercase">Nomor PR Terpilih</span>
                                    <p className="text-sm font-mono font-bold text-gray-800 mt-0.5">{prDetail.nomorPr}</p>
                                </div>
                                <div>
                                    <span className="block text-xs font-semibold text-gray-400 uppercase">Divisi Pemohon</span>
                                    <p className="text-sm font-bold text-gray-800 mt-0.5">{prDetail.divisiPemohon}</p>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-800 mb-2.5">
                                    Pilih Keputusan Kelayakan <span className="text-red-500">*</span>
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
                                    <div 
                                        onClick={() => handleStatusChange('PENDING')} 
                                        className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${approvalForm.status === 'PENDING' ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-500/20' : 'bg-gray-50 border-gray-200 hover:border-gray-300'}`}
                                    >
                                        <span className="block text-xs font-bold text-blue-600">PENDING REVIEW</span>
                                        <span className="block text-[11px] text-gray-400 mt-1">Tahan untuk peninjauan kembali</span>
                                    </div>
                                    <div 
                                        onClick={() => handleStatusChange('APPROVED')} 
                                        className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${approvalForm.status === 'APPROVED' ? 'bg-green-50 border-green-500 ring-2 ring-green-500/20' : 'bg-gray-50 border-gray-200 hover:border-gray-300'}`}
                                    >
                                        <span className="block text-xs font-bold text-green-600">APPROVE / SETUJU</span>
                                        <span className="block text-[11px] text-green-600/70 mt-1">Dokumen valid & siap diproses PO</span>
                                    </div>
                                    <div 
                                        onClick={() => handleStatusChange('REJECTED')} 
                                        className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${approvalForm.status === 'REJECTED' ? 'bg-red-50 border-red-400 ring-2 ring-red-400/20' : 'bg-gray-50 border-gray-200 hover:border-gray-300'}`}
                                    >
                                        <span className="block text-xs font-bold text-red-500">REJECT / TOLAK</span>
                                        <span className="block text-[11px] text-red-400/70 mt-1">Tolak berkas pengajuan ini</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-800 mb-2">Catatan Kelayakan Review Internal</label>
                                <textarea 
                                    name="catatan" 
                                    value={approvalForm.catatan} 
                                    onChange={(e) => setApprovalForm(prev => ({ ...prev, catatan: e.target.value }))} 
                                    placeholder="Tulis alasan penolakan atau catatan instruksi tambahan di sini..." 
                                    rows={3} 
                                    className="w-full rounded-xl border border-gray-200 p-4 text-xs text-gray-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400 resize-none" 
                                />
                            </div>
                        </div>

                        {/* FOOTER MODAL */}
                        <div className="px-6 py-4 bg-gray-50 border-t flex items-center justify-end gap-2.5">
                            <button 
                                onClick={() => setIsStatusModalOpen(false)} 
                                className="h-10 px-4 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-semibold transition-colors"
                            >
                                Batalkan
                            </button>
                            <button 
                                onClick={handleSaveStatus} 
                                className="h-10 px-5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors"
                            >
                                Simpan Keputusan
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </PortalLayout>
    );
}