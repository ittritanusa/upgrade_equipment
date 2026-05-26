import React, { useState } from 'react'; // 1. Diperbaiki: Import useState
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
    CheckCircle2,
    Plus // 2. Diperbaiki: Import icon Plus yang kurang
} from 'lucide-react';

export default function DetailRABProject() {
    const navigate = useNavigate();
    const { id } = useParams(); 
    
    // State Kontrol Modal
    const [isStatusRABModalOpen, setIsStatusRABModalOpen] = useState(false);

    // 3. Diperbaiki: Ditambahkan state form dan handler pendukung agar tidak error undefined
    const [taskForm, setTaskForm] = useState({
        task: "Mobilisasi dan Persiapan",
        status: "OPEN",
        catatan: ""
    });

    const handleTaskChange = (e) => {
        const { name, value } = e.target;
        setTaskForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveTask = () => {
        alert(`Status berhasil diperbarui ke: ${taskForm.status}`);
        setIsStatusRABModalOpen(false);
    };

    const handleResetForm = () => {
        setTaskForm({
            task: "Mobilisasi dan Persiapan",
            status: "OPEN",
            catatan: ""
        });
    };

    // Mock Data Detail RAB
    const detailData = {
        kode: 'RAB/AGS/USR/0526/0001',
        namaProject: 'Pembangunan Gedung Kantor Pusat',
        tahunAnggaran: '2024',
        tanggalPengajuan: '20/05/2024',
        status: 'Disetujui',
        workflow: [
            { label: 'RAB Dibuat', date: '20/05/2026 09:30', desc: 'Selesai', current: false, done: true, icon: FilePlus },
            { label: 'Diperiksa', date: '21/05/2026 14:15', desc: 'Selesai', current: false, done: true, icon: SearchCode },
            { label: 'Approval', date: '22/05/2026 11:00', desc: 'Disetujui', current: true, done: true, icon: ThumbsUp }
        ],
        items: [
            { id: 1, namaItem: 'Semen Portland (PC) @50kg', kategori: 'Material', kuantitas: 1500, satuan: 'Zak', hargaSatuan: 65000, total: 97500000 },
            { id: 2, namaItem: 'Besi Beton Ulir D16', kategori: 'Material', kuantitas: 800, satuan: 'Batang', hargaSatuan: 145000, total: 116000000 },
            { id: 3, namaItem: 'Sewa Excavator PC200', kategori: 'Alat Berat', kuantitas: 40, satuan: 'Jam', hargaSatuan: 275000, total: 11000000 },
            { id: 4, namaItem: 'Upah Tenaga Kerja Struktur', kategori: 'Upah Kerja', kuantitas: 1, satuan: 'Lot', hargaSatuan: 45000000, total: 45000000 },
            { id: 5, namaItem: 'Pekerjaan Pondasi Tiang Pancang', kategori: 'Subkon', kuantitas: 1, satuan: 'Lot', hargaSatuan: 185000000, total: 185000000 },
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

    const calculateGrandTotal = () => {
        return detailData.items.reduce((sum, item) => sum + (item.total || 0), 0);
    };

    const formatRupiah = (angka) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(angka);
    };

    return (
        <PortalLayout>
            {/* Style Tambahan Khusus untuk manipulasi cetak */}
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
                
                {/* 1. HEADER HALAMAN & BREADCRUMBS - Sembunyi saat cetak */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-4 print:hidden">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-semibold text-gray-900">
                                Detail RAB Project
                            </h1>
                            {renderStatusBadge(detailData.status)}
                        </div>

                        <div className="flex items-center gap-2 mt-1 text-sm">
                            <span className="text-gray-400">Budget & RAB</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-gray-400">RAB Project</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-blue-600 font-medium">{detailData.kode}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                        <button
                            type="button"
                            onClick={() => window.print()}
                            className="inline-flex items-center gap-2 h-10 px-3.5 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium bg-white hover:bg-gray-50 transition"
                        >
                            <Printer size={16} />
                            Cetak
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

                {/* AREA YANG AKAN DI-PRINT (START FROM MASTER INFO) */}
                <div className="space-y-6 print:space-y-8 print:p-0">
                    
                    {/* Header khusus cetak */}
                    <div className="hidden print:block border-b-2 border-gray-900 pb-4 mb-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 uppercase tracking-tight">Dokumen Rencana Anggaran Biaya (RAB)</h2>
                                <p className="text-sm font-mono text-gray-500 mt-0.5">ID: {detailData.kode}</p>
                            </div>
                            <div className="text-right">
                                <span className="text-sm font-bold uppercase tracking-wider px-3 py-1 bg-gray-100 border border-gray-300 text-gray-800 rounded">
                                    Status: {detailData.status}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* 2. AREA INFORMASI UTAMA (INFORMASI MASTER) */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm print:border-gray-300">
                        <div>
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-5">
                                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                    <FileText size={16} className="text-gray-400 print:hidden" /> Informasi Master Proyek
                                </h2> 

                                <button
                                    onClick={() => setIsStatusRABModalOpen(true)}
                                    className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition print:hidden"
                                >
                                    <RefreshCw size={16} />
                                    Approval
                                </button>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 print:grid-cols-4">
                                <div className="space-y-1 md:col-span-2 print:col-span-2">
                                    <span className="text-xs text-gray-400 font-medium print:text-gray-500">Nama Rencana Proyek</span>
                                    <p className="text-base font-semibold text-gray-900">{detailData.namaProject}</p>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-xs text-gray-400 font-medium print:text-gray-500">Kode Registrasi RAB</span>
                                    <p className="text-sm font-mono font-bold text-gray-800">{detailData.kode}</p>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-xs text-gray-400 font-medium print:text-gray-500">Tahun Anggaran</span>
                                    <p className="text-sm font-semibold text-gray-900 flex items-center gap-1.5">
                                        <Calendar size={14} className="text-gray-400 print:hidden" /> {detailData.tahunAnggaran}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Stepper Flow */}
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
                                                    <p className={`text-xs font-semibold ${step.desc === 'Selesai' || step.desc === 'Disetujui' ? 'text-green-600' : step.desc === 'In Progress' ? 'text-blue-600' : 'text-gray-400'}`}>
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

                    {/* 3. RINCIAN TABEL */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4 print:border-gray-300 print:p-0 print:shadow-none">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2 print:text-gray-700 print:px-2">
                            <Layers size={16} className="text-gray-400 print:hidden" /> Rincian Komponen Biaya Anggaran
                        </h3>

                        <div className="overflow-x-auto border border-gray-200 rounded-xl print:border-gray-300 print:rounded-none">
                            <table className="min-w-full text-sm">
                                <thead className="bg-gray-50 text-gray-700 font-semibold border-b border-gray-200 print:bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-3 text-center w-12">No</th>
                                        <th className="px-4 py-3 text-left">Deskripsi Komponen Pekerjaan</th>
                                        <th className="px-4 py-3 text-left w-40">Kategori</th>
                                        <th className="px-4 py-3 text-right w-28">Volume</th>
                                        <th className="px-4 py-3 text-left w-24">Satuan</th>
                                        <th className="px-4 py-3 text-right w-44">Harga Satuan</th>
                                        <th className="px-4 py-3 text-right w-48">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white text-gray-600 print:divide-gray-300">
                                    {detailData.items.map((item, index) => (
                                        <tr key={item.id} className="hover:bg-gray-50/50 transition-colors print:hover:bg-transparent">
                                            <td className="px-4 py-3.5 text-center font-medium text-gray-400 print:text-gray-700">
                                                {index + 1}
                                            </td>
                                            <td className="px-4 py-3.5 font-medium text-gray-900">
                                                {item.namaItem}
                                            </td>
                                            <td className="px-4 py-3.5">
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200 print:bg-transparent print:border-none print:p-0">
                                                    {item.kategori}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3.5 text-right font-semibold text-gray-700">
                                                {item.kuantitas.toLocaleString('id-ID')}
                                            </td>
                                            <td className="px-4 py-3.5 text-gray-500 print:text-gray-700">
                                                {item.satuan}
                                            </td>
                                            <td className="px-4 py-3.5 text-right font-medium text-gray-700">
                                                {formatRupiah(item.hargaSatuan)}
                                            </td>
                                            <td className="px-4 py-3.5 text-right font-bold text-gray-900 bg-gray-50/30 print:bg-transparent">
                                                {formatRupiah(item.total)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Ringkasan Akumulasi Total */}
                        <div className="flex flex-col items-end gap-2 pt-4 border-t border-gray-100 print:border-gray-300">
                            <div className="flex items-center gap-12 bg-slate-900 text-white px-6 py-4 rounded-xl shadow-sm print:bg-gray-100 print:text-gray-900 print:border print:border-gray-300 print:rounded-lg">
                                <div className="flex items-center gap-2">
                                    <Coins size={20} className="text-yellow-400 print:text-slate-700" />
                                    <span className="text-xs font-bold text-gray-300 uppercase tracking-wider print:text-gray-600">Total Alokasi RAB Terkunci:</span>
                                </div>
                                <span className="text-xl font-black tracking-wide text-white print:text-gray-900">
                                    {formatRupiah(calculateGrandTotal())}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL Approval */}
            {isStatusRABModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                        
                        {/* HEADER */}
                        <div className="px-6 py-4 border-b flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-bold text-gray-800">
                                    Approval RAB Project
                                </h3>
                            </div>
                            <button
                                onClick={() => setIsStatusRABModalOpen(false)} // 4. Diperbaiki: camelCase Huruf 'S' besar
                                className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
                            >
                                <span className="text-xs font-bold">✕</span>
                            </button>
                        </div>

                        {/* BODY */}
                        <div className="p-6 space-y-5">
    
                            {/* Baris Pertama: Kode dan Nama Sejajar (Gunakan Grid) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Kode Registrasi RAB */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-800 mb-2">
                                        Kode Registrasi RAB
                                    </label>
                                    <input
                                        type="text"
                                        readOnly
                                        value={detailData.kode}
                                        className="w-full h-11 rounded-xl bg-gray-100 border border-gray-200 px-4 text-xs font-medium text-gray-700 outline-none cursor-not-allowed"
                                    />
                                </div>

                                {/* Nama Rencana Proyek */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-800 mb-2">
                                        Nama Rencana Proyek
                                    </label>
                                    <input
                                        type="text"
                                        readOnly
                                        value={detailData.namaProject}
                                        className="w-full h-11 rounded-xl bg-gray-100 border border-gray-200 px-4 text-xs font-medium text-gray-700 outline-none cursor-not-allowed"
                                    />
                                </div>
                            </div>

                            {/* Approval Action (SELECTION CARDS) - Full Width */}
                            <div>
                                <label className="block text-xs font-bold text-gray-800 mb-2">
                                    Approval Action <span className="text-red-500">*</span>
                                </label>
                                {/* Diubah menjadi grid-cols-3 agar 3 kartu statusnya memenuhi lebar container */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                                    
                                    {/* DRAFT CARD */}
                                    <div 
                                        onClick={() => handleTaskChange({ target: { name: 'status', value: 'DRAFT' } })}
                                        className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                                            taskForm.status === 'DRAFT' 
                                            ? 'bg-slate-100 border-slate-400 ring-2 ring-slate-400/20' 
                                            : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                                        }`}
                                    >
                                        <span className="block text-xs font-bold text-slate-800">DRAFT</span>
                                        <span className="block text-[11px] text-slate-500 mt-1">Pengajuan RAB Telah Dibuat</span>
                                    </div>

                                    {/* APPROVE CARD */}
                                    <div 
                                        onClick={() => handleTaskChange({ target: { name: 'status', value: 'APPROVE' } })}
                                        className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                                            taskForm.status === 'APPROVE' 
                                            ? 'bg-green-50 border-green-500 ring-2 ring-green-500/20' 
                                            : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        <span className="block text-xs font-bold text-green-600">APPROVE</span>
                                        <span className="block text-[11px] text-green-600/70 mt-1">Pengajuan RAB Disetujui</span>
                                    </div>

                                    {/* REJECTED CARD */}
                                    <div 
                                        onClick={() => handleTaskChange({ target: { name: 'status', value: 'REJECTED' } })}
                                        className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                                            taskForm.status === 'REJECTED' 
                                            ? 'bg-red-50 border-red-400 ring-2 ring-red-400/20' 
                                            : 'bg-red-50/30 border-red-200 hover:border-red-300'
                                        }`}
                                    >
                                        <span className="block text-xs font-bold text-red-500">REJECTED</span>
                                        <span className="block text-[11px] text-red-400/70 mt-1">Pengajuan RAB Ditolak</span>
                                    </div>

                                </div>
                            </div>

                            {/* CATATAN */}
                            <div>
                                <label className="block text-xs font-bold text-gray-800 mb-2">
                                    Catatan (Optional)
                                </label>
                                <textarea
                                    name="catatan"
                                    value={taskForm.catatan}
                                    onChange={handleTaskChange}
                                    placeholder="Tulis Catatan Status"
                                    rows={3}
                                    className="w-full rounded-xl border border-gray-200 p-4 text-xs text-gray-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400 resize-none"
                                />
                            </div>

                        </div>

                        {/* FOOTER */}
                        <div className="px-6 py-4 bg-gray-50 border-t flex items-center justify-start gap-3">
                            <button
                                onClick={handleSaveTask}
                                className="h-10 px-6 rounded-lg bg-green-500 hover:bg-green-600 text-white text-xs font-semibold shadow-sm transition-colors"
                            >
                                Simpan
                            </button>

                            <button
                                onClick={handleResetForm} // 5. Diperbaiki: Panggil fungsi reset state yang benar
                                className="h-10 px-6 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-semibold shadow-sm transition-colors"
                            >
                                Reset
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </PortalLayout>
    );
}