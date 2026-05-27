import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';

import {
    ArrowLeft,
    ArrowRightLeft,
    Calendar,
    ClipboardCheck,
    Package,
    Truck,
    Wrench,
    Building2,
    User,
    Phone,
    FileText,
    Printer,
    CheckCircle2,
    Clock3,
    XCircle,
    ShieldCheck,
    RefreshCw,
    AlertCircle,
    Check,
    FilePlus,
    SearchCheck,
} from 'lucide-react';

export default function DetailInterWarehouseTransfer() {

    const navigate = useNavigate();
    const { id } = useParams();

    // ==========================================
    // STATE MODAL
    // ==========================================
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

    const [approvalForm, setApprovalForm] = useState({
        status: 'PENDING',
        catatan: '',
    });

    // ==========================================
    // MOCK DETAIL DATA
    // ==========================================
    const detail = {
        id: 1,

        noDoc: 'IWT-2026-00021',

        tanggal: '2026-05-28',

        status: 'Pending',

        tipeTransfer: 'Peminjaman Alat Berat',

        dariProject: 'Gudang Pusat',

        tujuanProject: 'Project Tol Cisumdawu',

        kendaraan: 'Lowbed Trailer',

        driver: 'Budi Santoso',

        noHpDriver: '0812-8899-7788',

        dibuatOleh: 'Ekki Maulana',

        tanggalKebutuhan: '2026-05-30',

        notes:
            'Excavator digunakan untuk pekerjaan penggalian area drainase utama pada project Tol Cisumdawu.',

        items: [
            {
                id: 1,
                kode: 'HVY-001',
                nama: 'Excavator CAT 320D',
                kategori: 'Alat Berat',
                qty: 1,
                satuan: 'Unit',
                kondisi: 'Baik',
                keterangan: 'Unit utama pekerjaan cut & fill',
            },
            {
                id: 2,
                kode: 'TLS-002',
                nama: 'Pacul Baja',
                kategori: 'Tools',
                qty: 8,
                satuan: 'Unit',
                kondisi: 'Baik',
                keterangan: 'Digunakan untuk helper lapangan',
            },
            {
                id: 3,
                kode: 'MAT-003',
                nama: 'Semen Tiga Roda',
                kategori: 'Material',
                qty: 120,
                satuan: 'Zak',
                kondisi: 'Baik',
                keterangan: 'Material tambahan pekerjaan struktur',
            },
        ],
    };

    // ==========================================
    // WORKFLOW
    // ==========================================
    const workflowSteps = [
        {
            label: 'Pengajuan Dibuat',
            date: '28/05/2026 08:15',
            desc: 'Selesai',
            current: false,
            done: true,
            icon: FilePlus,
        },
        {
            label: 'Verifikasi Warehouse',
            date: '28/05/2026 10:20',
            desc: 'Selesai',
            current: false,
            done: true,
            icon: SearchCheck,
        },
        {
            label: 'Approval Project Manager',
            date: '--/--/----',
            desc: detail.status,
            current: true,
            done: false,
            icon: ShieldCheck,
        },
    ];

    // ==========================================
    // HANDLE STATUS
    // ==========================================
    const handleStatusChange = (statusValue) => {

        setApprovalForm((prev) => ({
            ...prev,
            status: statusValue,
        }));
    };

    const handleSaveStatus = () => {

        alert(
            `Status transfer berhasil diperbarui menjadi: ${approvalForm.status}`
        );

        setIsStatusModalOpen(false);
    };

    // ==========================================
    // BADGE STATUS
    // ==========================================
    const renderStatusBadge = (status) => {

        switch (status?.toLowerCase()) {

            case 'approved':
            case 'approve':

                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                        <CheckCircle2 size={12} />
                        Approved
                    </span>
                );

            case 'rejected':

                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold">
                        <XCircle size={12} />
                        Rejected
                    </span>
                );

            default:

                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold">
                        <Clock3 size={12} />
                        Pending Review
                    </span>
                );
        }
    };

    // ==========================================
    // BADGE CATEGORY
    // ==========================================
    const renderCategory = (category) => {

        if (category === 'Alat Berat') {

            return (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-50 text-red-700 border border-red-200 text-xs font-semibold">
                    <Truck size={12} />
                    Alat Berat
                </span>
            );
        }

        if (category === 'Tools') {

            return (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold">
                    <Wrench size={12} />
                    Tools
                </span>
            );
        }

        return (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-semibold">
                <Package size={12} />
                Material
            </span>
        );
    };

    return (
        <PortalLayout>

            <div className="space-y-6 w-full">

                {/* ========================================== */}
                {/* HEADER */}
                {/* ========================================== */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                    <div>

                        <div className="flex items-center gap-3">

                            <h1 className="text-2xl font-semibold text-gray-900">
                                Detail Pengajuan Transfer
                            </h1>

                            {renderStatusBadge(detail.status)}

                        </div>

                        <div className="flex items-center gap-2 mt-1 text-sm">

                            <span className="text-gray-400">
                                Inventory & Warehouse
                            </span>

                            <span className="text-gray-300">/</span>

                            <span className="text-gray-400">
                                Inter Warehouse Transfer
                            </span>

                            <span className="text-gray-300">/</span>

                            <span className="text-indigo-600 font-medium">
                                {detail.noDoc}
                            </span>

                        </div>

                    </div>

                    <div className="flex items-center gap-2 flex-wrap">

                        <button
                            onClick={() => setIsStatusModalOpen(true)}
                            className="inline-flex items-center gap-2 h-11 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition"
                        >
                            <RefreshCw size={16} />
                            Approval / Update Status
                        </button>

                        <button
                            onClick={() =>
                                navigate(
                                    `/portal/inventory/inter-warehouse-transfer/print`
                                )
                            }
                            className="inline-flex items-center gap-2 h-11 px-4 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-sm font-semibold rounded-xl transition"
                        >
                            <Printer size={16} />
                            Print
                        </button>

                        <button
                            onClick={() => navigate(-1)}
                            className="inline-flex items-center gap-2 h-11 px-4 bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold rounded-xl transition"
                        >
                            <ArrowLeft size={16} />
                            Kembali
                        </button>

                    </div>

                </div>

                {/* ========================================== */}
                {/* INFORMATION */}
                {/* ========================================== */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">

                    <div className="flex items-center gap-2 mb-6">

                        <ArrowRightLeft
                            size={20}
                            className="text-indigo-600"
                        />

                        <h2 className="text-lg font-semibold text-gray-900">
                            Informasi Pengajuan Transfer
                        </h2>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                        {/* DOC */}
                        <div>

                            <div className="text-xs text-gray-400 font-semibold uppercase">
                                Nomor Transfer
                            </div>

                            <div className="mt-1 font-mono font-bold text-indigo-600">
                                {detail.noDoc}
                            </div>

                        </div>

                        {/* DATE */}
                        <div>

                            <div className="text-xs text-gray-400 font-semibold uppercase">
                                Tanggal Pengajuan
                            </div>

                            <div className="mt-1 text-sm font-semibold text-gray-900 flex items-center gap-2">
                                <Calendar size={14} className="text-gray-400" />
                                {detail.tanggal}
                            </div>

                        </div>

                        {/* TYPE */}
                        <div>

                            <div className="text-xs text-gray-400 font-semibold uppercase">
                                Jenis Transfer
                            </div>

                            <div className="mt-1 text-sm font-semibold text-gray-900">
                                {detail.tipeTransfer}
                            </div>

                        </div>

                        {/* NEED DATE */}
                        <div>

                            <div className="text-xs text-gray-400 font-semibold uppercase">
                                Tanggal Kebutuhan
                            </div>

                            <div className="mt-1 text-sm font-semibold text-gray-900">
                                {detail.tanggalKebutuhan}
                            </div>

                        </div>

                    </div>

                    {/* ROUTE */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-6">

                        {/* FROM */}
                        <div className="border border-gray-200 rounded-2xl p-5 bg-gray-50">

                            <div className="flex items-center gap-2 mb-4">

                                <Building2
                                    size={18}
                                    className="text-indigo-600"
                                />

                                <h3 className="font-semibold text-gray-900">
                                    Dari Gudang / Project
                                </h3>

                            </div>

                            <div className="text-lg font-bold text-gray-900">
                                {detail.dariProject}
                            </div>

                        </div>

                        {/* TO */}
                        <div className="border border-gray-200 rounded-2xl p-5 bg-indigo-50">

                            <div className="flex items-center gap-2 mb-4">

                                <ArrowRightLeft
                                    size={18}
                                    className="text-indigo-600"
                                />

                                <h3 className="font-semibold text-gray-900">
                                    Tujuan Transfer
                                </h3>

                            </div>

                            <div className="text-lg font-bold text-indigo-700">
                                {detail.tujuanProject}
                            </div>

                        </div>

                    </div>

                    {/* LOGISTIC */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">

                        {/* VEHICLE */}
                        <div className="border border-gray-200 rounded-2xl p-5">

                            <div className="flex items-center gap-2 text-sm font-semibold text-gray-500 mb-2">
                                <Truck size={15} />
                                Kendaraan
                            </div>

                            <div className="text-gray-900 font-bold">
                                {detail.kendaraan}
                            </div>

                        </div>

                        {/* DRIVER */}
                        <div className="border border-gray-200 rounded-2xl p-5">

                            <div className="flex items-center gap-2 text-sm font-semibold text-gray-500 mb-2">
                                <User size={15} />
                                Driver / PIC
                            </div>

                            <div className="text-gray-900 font-bold">
                                {detail.driver}
                            </div>

                        </div>

                        {/* PHONE */}
                        <div className="border border-gray-200 rounded-2xl p-5">

                            <div className="flex items-center gap-2 text-sm font-semibold text-gray-500 mb-2">
                                <Phone size={15} />
                                Nomor HP
                            </div>

                            <div className="text-gray-900 font-bold">
                                {detail.noHpDriver}
                            </div>

                        </div>

                    </div>

                    {/* NOTES */}
                    <div className="mt-6 border border-dashed border-gray-300 rounded-2xl p-5 bg-gray-50">

                        <div className="flex items-center gap-2 mb-2">

                            <FileText
                                size={16}
                                className="text-gray-500"
                            />

                            <span className="text-sm font-semibold text-gray-700">
                                Catatan Pengajuan
                            </span>

                        </div>

                        <p className="text-sm text-gray-700 leading-relaxed">
                            {detail.notes}
                        </p>

                    </div>

                </div>

                {/* ========================================== */}
                {/* WORKFLOW */}
                {/* ========================================== */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">

                    <div className="flex items-center gap-2 mb-6">

                        <ShieldCheck
                            size={20}
                            className="text-indigo-600"
                        />

                        <h2 className="text-lg font-semibold text-gray-900">
                            Workflow Approval Transfer
                        </h2>

                    </div>

                    <div className="overflow-x-auto">

                        <div className="min-w-[720px] flex items-center justify-between relative px-8">

                            <div className="absolute top-5 left-20 right-20 h-1 bg-gray-100 -z-10" />

                            {workflowSteps.map((step, idx) => {

                                const StepIcon = step.icon;

                                return (
                                    <div
                                        key={idx}
                                        className="flex flex-col items-center text-center flex-1 relative"
                                    >

                                        {idx > 0 &&
                                            workflowSteps[idx - 1].done && (
                                                <div
                                                    className={`absolute top-5 right-[50%] translate-y-[-50%] w-full h-1 -z-10 ${
                                                        step.done
                                                            ? 'bg-green-500'
                                                            : 'bg-gray-100'
                                                    }`}
                                                />
                                            )}

                                        <div
                                            className={`w-11 h-11 rounded-full flex items-center justify-center border-4 transition-all ${
                                                step.current && !step.done
                                                    ? 'bg-blue-600 border-blue-100 text-white shadow-md'
                                                    : step.done
                                                    ? 'bg-green-500 border-green-100 text-white'
                                                    : 'bg-white border-gray-200 text-gray-400'
                                            }`}
                                        >

                                            {step.done ? (
                                                <Check
                                                    size={18}
                                                    className="stroke-[3]"
                                                />
                                            ) : (
                                                <StepIcon size={18} />
                                            )}

                                        </div>

                                        <div className="mt-3 space-y-1">

                                            <p className="text-sm font-bold text-gray-800">
                                                {step.label}
                                            </p>

                                            <p className="text-[11px] text-gray-400 font-medium">
                                                {step.date}
                                            </p>

                                            <p
                                                className={`text-xs font-semibold ${
                                                    step.desc === 'Selesai'
                                                        ? 'text-green-600'
                                                        : step.desc === 'Pending'
                                                        ? 'text-blue-600'
                                                        : 'text-gray-400'
                                                }`}
                                            >
                                                {step.desc}
                                            </p>

                                        </div>

                                    </div>
                                );
                            })}

                        </div>

                    </div>

                </div>

                {/* ========================================== */}
                {/* TABLE ITEM */}
                {/* ========================================== */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

                    <div className="px-6 py-5 border-b border-gray-200 flex items-center gap-2">

                        <ClipboardCheck
                            size={20}
                            className="text-indigo-600"
                        />

                        <div>

                            <h2 className="text-lg font-semibold text-gray-900">
                                Detail Item Transfer
                            </h2>

                            <p className="text-sm text-gray-500">
                                List barang / alat yang diajukan transfer
                            </p>

                        </div>

                    </div>

                    <div className="overflow-x-auto">

                        <table className="min-w-full text-sm">

                            <thead className="bg-gray-50 border-b border-gray-200 uppercase text-xs tracking-wider text-gray-600">

                                <tr>

                                    <th className="px-4 py-4 text-left">
                                        Item
                                    </th>

                                    <th className="px-4 py-4 text-center">
                                        Kategori
                                    </th>

                                    <th className="px-4 py-4 text-center">
                                        Qty
                                    </th>

                                    <th className="px-4 py-4 text-center">
                                        Kondisi
                                    </th>

                                    <th className="px-4 py-4 text-left">
                                        Keterangan
                                    </th>

                                </tr>

                            </thead>

                            <tbody className="divide-y divide-gray-200">

                                {detail.items.map((item) => (

                                    <tr
                                        key={item.id}
                                        className="hover:bg-gray-50/50 transition"
                                    >

                                        {/* ITEM */}
                                        <td className="px-4 py-4 min-w-[280px]">

                                            <div className="font-semibold text-gray-900">
                                                {item.nama}
                                            </div>

                                            <div className="text-xs text-gray-500 mt-1">
                                                {item.kode}
                                            </div>

                                        </td>

                                        {/* CATEGORY */}
                                        <td className="px-4 py-4 text-center">
                                            {renderCategory(item.kategori)}
                                        </td>

                                        {/* QTY */}
                                        <td className="px-4 py-4 text-center">

                                            <div className="font-bold text-indigo-600">
                                                {item.qty} {item.satuan}
                                            </div>

                                        </td>

                                        {/* CONDITION */}
                                        <td className="px-4 py-4 text-center">

                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 border border-green-200 text-xs font-semibold">
                                                <CheckCircle2 size={11} />
                                                {item.kondisi}
                                            </span>

                                        </td>

                                        {/* NOTES */}
                                        <td className="px-4 py-4 text-gray-700">
                                            {item.keterangan}
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

            {/* ========================================== */}
            {/* MODAL APPROVAL */}
            {/* ========================================== */}
            {isStatusModalOpen && (

                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">

                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">

                        {/* HEADER */}
                        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">

                            <div className="flex items-center gap-2">

                                <AlertCircle
                                    size={18}
                                    className="text-blue-600"
                                />

                                <h3 className="text-base font-bold text-gray-900">
                                    Approval & Update Status Transfer
                                </h3>

                            </div>

                            <button
                                onClick={() =>
                                    setIsStatusModalOpen(false)
                                }
                                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-500 text-sm font-bold transition"
                            >
                                ✕
                            </button>

                        </div>

                        {/* BODY */}
                        <div className="p-6 space-y-6">

                            {/* INFO */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                <div>

                                    <span className="text-xs font-semibold text-gray-400 uppercase">
                                        Nomor Transfer
                                    </span>

                                    <p className="mt-1 text-sm font-mono font-bold text-gray-900">
                                        {detail.noDoc}
                                    </p>

                                </div>

                                <div>

                                    <span className="text-xs font-semibold text-gray-400 uppercase">
                                        Project Tujuan
                                    </span>

                                    <p className="mt-1 text-sm font-bold text-gray-900">
                                        {detail.tujuanProject}
                                    </p>

                                </div>

                            </div>

                            {/* STATUS */}
                            <div>

                                <label className="block text-xs font-bold text-gray-900 mb-3">
                                    Pilih Status Approval
                                </label>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

                                    {/* PENDING */}
                                    <div
                                        onClick={() =>
                                            handleStatusChange('PENDING')
                                        }
                                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                                            approvalForm.status === 'PENDING'
                                                ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-500/20'
                                                : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                                        }`}
                                    >

                                        <div className="text-xs font-bold text-blue-600">
                                            PENDING
                                        </div>

                                        <div className="text-[11px] text-gray-500 mt-1">
                                            Menunggu review lanjutan
                                        </div>

                                    </div>

                                    {/* APPROVED */}
                                    <div
                                        onClick={() =>
                                            handleStatusChange('APPROVED')
                                        }
                                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                                            approvalForm.status ===
                                            'APPROVED'
                                                ? 'bg-green-50 border-green-500 ring-2 ring-green-500/20'
                                                : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                                        }`}
                                    >

                                        <div className="text-xs font-bold text-green-600">
                                            APPROVED
                                        </div>

                                        <div className="text-[11px] text-green-700/70 mt-1">
                                            Transfer disetujui
                                        </div>

                                    </div>

                                    {/* REJECTED */}
                                    <div
                                        onClick={() =>
                                            handleStatusChange('REJECTED')
                                        }
                                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                                            approvalForm.status ===
                                            'REJECTED'
                                                ? 'bg-red-50 border-red-500 ring-2 ring-red-500/20'
                                                : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                                        }`}
                                    >

                                        <div className="text-xs font-bold text-red-600">
                                            REJECTED
                                        </div>

                                        <div className="text-[11px] text-red-500/70 mt-1">
                                            Pengajuan ditolak
                                        </div>

                                    </div>

                                </div>

                            </div>

                            {/* NOTES */}
                            <div>

                                <label className="block text-xs font-bold text-gray-900 mb-2">
                                    Catatan Approval
                                </label>

                                <textarea
                                    rows={4}
                                    value={approvalForm.catatan}
                                    onChange={(e) =>
                                        setApprovalForm((prev) => ({
                                            ...prev,
                                            catatan: e.target.value,
                                        }))
                                    }
                                    placeholder="Masukkan catatan approval atau alasan penolakan..."
                                    className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 resize-none"
                                />

                            </div>

                        </div>

                        {/* FOOTER */}
                        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-end gap-3">

                            <button
                                onClick={() =>
                                    setIsStatusModalOpen(false)
                                }
                                className="h-10 px-4 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-semibold transition"
                            >
                                Batalkan
                            </button>

                            <button
                                onClick={handleSaveStatus}
                                className="h-10 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm transition"
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