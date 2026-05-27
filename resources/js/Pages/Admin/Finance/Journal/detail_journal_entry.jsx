import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';

import {
    ArrowLeft,
    Printer,
    ReceiptText,
    CalendarDays,
    Building2,
    FileText,
    ClipboardCheck,
    Wallet,
    BadgeDollarSign,
    CheckCircle2,
    AlertTriangle,
    User,
    RefreshCw,
    Check,
    XCircle,
    Clock3,
} from 'lucide-react';

// ==========================================
// MOCK DETAIL
// ==========================================
const JOURNAL_DETAIL = {
    id: 1,
    journalNo: 'JE-2026-00021',
    journalDate: '28 Mei 2026',
    reference: 'INV/2026/001',
    project: 'Project Gedung DPR',
    createdBy: 'Ekki Maulana',
    approvedBy: 'Finance Manager',
    status: 'Approved',
    description:
        'Pencatatan biaya operasional proyek terkait pembayaran material dan transportasi project.',

    details: [
        {
            id: 1,
            accountCode: '5101',
            accountName: 'Operational Expense',
            category: 'Expense',
            debit: 25000000,
            credit: 0,
            notes: 'Biaya pembelian material',
        },
        {
            id: 2,
            accountCode: '1102',
            accountName: 'Bank BCA',
            category: 'Asset',
            debit: 0,
            credit: 25000000,
            notes: 'Pembayaran melalui transfer bank',
        },
    ],

    approvalHistory: [
        {
            id: 1,
            title: 'Journal Created',
            date: '28 Mei 2026 09:00',
            status: 'done',
            user: 'Ekki Maulana',
        },
        {
            id: 2,
            title: 'Finance Review',
            date: '28 Mei 2026 10:15',
            status: 'done',
            user: 'Finance Supervisor',
        },
        {
            id: 3,
            title: 'Manager Approval',
            date: '28 Mei 2026 11:00',
            status: 'approved',
            user: 'Finance Manager',
        },
    ],
};

// ==========================================
// PAGE
// ==========================================
export default function DetailJournalEntry() {

    const navigate = useNavigate();
    const { id } = useParams();

    const detail = JOURNAL_DETAIL;

    // ==========================================
    // MODAL
    // ==========================================
    const [isStatusModalOpen, setIsStatusModalOpen] =
        useState(false);

    const [approvalForm, setApprovalForm] = useState({
        status: 'PENDING',
        notes: '',
    });

    // ==========================================
    // FORMAT RUPIAH
    // ==========================================
    const formatRupiah = (value) => {

        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(value || 0);
    };

    // ==========================================
    // TOTAL
    // ==========================================
    const totalDebit = detail.details.reduce(
        (sum, item) => sum + item.debit,
        0
    );

    const totalCredit = detail.details.reduce(
        (sum, item) => sum + item.credit,
        0
    );

    // ==========================================
    // STATUS BADGE
    // ==========================================
    const renderStatusBadge = (status) => {

        switch (status?.toLowerCase()) {

            case 'approved':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">
                        <CheckCircle2 size={12} />
                        Approved
                    </span>
                );

            case 'rejected':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold">
                        <XCircle size={12} />
                        Rejected
                    </span>
                );

            default:
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold">
                        <Clock3 size={12} />
                        Pending
                    </span>
                );
        }
    };

    // ==========================================
    // CATEGORY BADGE
    // ==========================================
    const renderCategory = (category) => {

        switch (category) {

            case 'Asset':
                return (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold">
                        Asset
                    </span>
                );

            case 'Expense':
                return (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-red-50 text-red-700 border border-red-200 text-xs font-semibold">
                        Expense
                    </span>
                );

            case 'Revenue':
                return (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
                        Revenue
                    </span>
                );

            default:
                return (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 border border-gray-200 text-xs font-semibold">
                        -
                    </span>
                );
        }
    };

    // ==========================================
    // SAVE STATUS
    // ==========================================
    const handleSaveStatus = () => {

        alert(
            `Status Journal berhasil diperbarui menjadi ${approvalForm.status}`
        );

        setIsStatusModalOpen(false);
    };

    return (
        <PortalLayout>

            {/* PRINT STYLE */}
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                    @media print {
                        aside,
                        nav,
                        header,
                        footer,
                        button {
                            display: none !important;
                        }

                        body {
                            background: white !important;
                        }

                        .print-area {
                            padding: 0 !important;
                            margin: 0 !important;
                        }

                        .shadow-sm,
                        .shadow-xl {
                            box-shadow: none !important;
                        }
                    }
                `,
                }}
            />

            <div className="space-y-6 print-area">

                {/* ========================================== */}
                {/* HEADER */}
                {/* ========================================== */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 print:hidden">

                    <div>

                        <div className="flex items-center gap-3">

                            <h1 className="text-2xl font-semibold text-gray-900">
                                Detail Journal Entry
                            </h1>

                            {renderStatusBadge(detail.status)}

                        </div>

                        <div className="flex items-center gap-2 mt-1 text-sm">

                            <span className="text-gray-400">
                                Accounting & Finance
                            </span>

                            <span className="text-gray-300">/</span>

                            <span className="text-gray-400">
                                Journal Entry
                            </span>

                            <span className="text-gray-300">/</span>

                            <span className="text-indigo-600 font-medium">
                                {detail.journalNo}
                            </span>

                        </div>

                    </div>

                    <div className="flex items-center gap-2">

                        <button
                            onClick={() => window.print()}
                            className="inline-flex items-center gap-2 h-11 px-5 rounded-xl border border-gray-300 bg-white text-gray-700 text-sm font-semibold hover:bg-gray-50 transition"
                        >
                            <Printer size={17} />
                            Print
                        </button>

                        <button
                            onClick={() => setIsStatusModalOpen(true)}
                            className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition"
                        >
                            <RefreshCw size={17} />
                            Update Status
                        </button>

                        <button
                            onClick={() => navigate(-1)}
                            className="inline-flex items-center gap-2 h-11 px-5 rounded-xl border border-gray-300 bg-white text-gray-700 text-sm font-semibold hover:bg-gray-50 transition"
                        >
                            <ArrowLeft size={17} />
                            Kembali
                        </button>

                    </div>

                </div>

                {/* ========================================== */}
                {/* DOCUMENT HEADER */}
                {/* ========================================== */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">

                    <div className="flex items-start justify-between gap-6">

                        <div>

                            <div className="flex items-center gap-2 mb-3">

                                <ReceiptText
                                    size={22}
                                    className="text-indigo-600"
                                />

                                <h2 className="text-xl font-bold text-gray-900">
                                    JOURNAL ENTRY
                                </h2>

                            </div>

                            <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">
                                Dokumen jurnal transaksi accounting perusahaan untuk kebutuhan pencatatan keuangan internal.
                            </p>

                        </div>

                        <div className="text-right">

                            <div className="text-xs text-gray-500">
                                Nomor Journal
                            </div>

                            <div className="text-xl font-bold font-mono text-indigo-600">
                                {detail.journalNo}
                            </div>

                        </div>

                    </div>

                </div>

                {/* ========================================== */}
                {/* INFORMATION */}
                {/* ========================================== */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                        <div>

                            <div className="text-xs text-gray-500 mb-1">
                                Tanggal Journal
                            </div>

                            <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">

                                <CalendarDays
                                    size={15}
                                    className="text-gray-400"
                                />

                                {detail.journalDate}

                            </div>

                        </div>

                        <div>

                            <div className="text-xs text-gray-500 mb-1">
                                Reference
                            </div>

                            <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">

                                <FileText
                                    size={15}
                                    className="text-gray-400"
                                />

                                {detail.reference}

                            </div>

                        </div>

                        <div>

                            <div className="text-xs text-gray-500 mb-1">
                                Project
                            </div>

                            <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">

                                <Building2
                                    size={15}
                                    className="text-gray-400"
                                />

                                {detail.project}

                            </div>

                        </div>

                        <div>

                            <div className="text-xs text-gray-500 mb-1">
                                Created By
                            </div>

                            <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">

                                <User
                                    size={15}
                                    className="text-gray-400"
                                />

                                {detail.createdBy}

                            </div>

                        </div>

                    </div>

                    {/* DESCRIPTION */}
                    <div className="mt-6 border-t border-gray-100 pt-5">

                        <div className="text-xs font-semibold text-gray-500 uppercase mb-2">
                            Description
                        </div>

                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm text-gray-700 leading-relaxed">
                            {detail.description}
                        </div>

                    </div>

                </div>

                {/* ========================================== */}
                {/* DETAIL TABLE */}
                {/* ========================================== */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

                    <div className="px-6 py-5 border-b border-gray-200 flex items-center gap-2">

                        <ClipboardCheck
                            size={20}
                            className="text-indigo-600"
                        />

                        <div>

                            <h2 className="text-lg font-semibold text-gray-900">
                                Detail Journal Entry
                            </h2>

                            <p className="text-sm text-gray-500">
                                Detail transaksi debit & credit
                            </p>

                        </div>

                    </div>

                    <div className="overflow-x-auto">

                        <table className="min-w-full text-sm">

                            <thead className="bg-gray-50 border-b border-gray-200 uppercase text-xs tracking-wider text-gray-600">

                                <tr>

                                    <th className="px-4 py-4 text-left">
                                        Account
                                    </th>

                                    <th className="px-4 py-4 text-center">
                                        Category
                                    </th>

                                    <th className="px-4 py-4 text-right">
                                        Debit
                                    </th>

                                    <th className="px-4 py-4 text-right">
                                        Credit
                                    </th>

                                    <th className="px-4 py-4 text-left">
                                        Notes
                                    </th>

                                </tr>

                            </thead>

                            <tbody className="divide-y divide-gray-200">

                                {detail.details.map((item) => (

                                    <tr
                                        key={item.id}
                                        className="hover:bg-gray-50/50 transition"
                                    >

                                        {/* ACCOUNT */}
                                        <td className="px-4 py-4 min-w-[280px]">

                                            <div className="font-semibold text-gray-900">
                                                {item.accountName}
                                            </div>

                                            <div className="text-xs text-gray-500 mt-1">
                                                {item.accountCode}
                                            </div>

                                        </td>

                                        {/* CATEGORY */}
                                        <td className="px-4 py-4 text-center">
                                            {renderCategory(item.category)}
                                        </td>

                                        {/* DEBIT */}
                                        <td className="px-4 py-4 text-right font-semibold text-indigo-600">
                                            {item.debit > 0
                                                ? formatRupiah(item.debit)
                                                : '-'}
                                        </td>

                                        {/* CREDIT */}
                                        <td className="px-4 py-4 text-right font-semibold text-emerald-600">
                                            {item.credit > 0
                                                ? formatRupiah(item.credit)
                                                : '-'}
                                        </td>

                                        {/* NOTES */}
                                        <td className="px-4 py-4 text-gray-700">
                                            {item.notes}
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                            {/* TOTAL */}
                            <tfoot className="bg-gray-50 border-t border-gray-200">

                                <tr>

                                    <td
                                        colSpan={2}
                                        className="px-4 py-4 text-right font-bold text-gray-900"
                                    >
                                        TOTAL
                                    </td>

                                    <td className="px-4 py-4 text-right font-bold text-indigo-700">
                                        {formatRupiah(totalDebit)}
                                    </td>

                                    <td className="px-4 py-4 text-right font-bold text-emerald-700">
                                        {formatRupiah(totalCredit)}
                                    </td>

                                    <td></td>

                                </tr>

                            </tfoot>

                        </table>

                    </div>

                </div>

                {/* ========================================== */}
                {/* APPROVAL FLOW */}
                {/* ========================================== */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">

                    <div className="flex items-center gap-2 mb-6">

                        <CheckCircle2
                            size={20}
                            className="text-indigo-600"
                        />

                        <div>

                            <h2 className="text-lg font-semibold text-gray-900">
                                Approval Workflow
                            </h2>

                            <p className="text-sm text-gray-500">
                                Riwayat approval journal entry
                            </p>

                        </div>

                    </div>

                    <div className="space-y-5">

                        {detail.approvalHistory.map((history) => (

                            <div
                                key={history.id}
                                className="flex items-start gap-4"
                            >

                                <div className={`w-11 h-11 rounded-full flex items-center justify-center ${
                                    history.status === 'approved'
                                        ? 'bg-emerald-100 text-emerald-600'
                                        : 'bg-indigo-100 text-indigo-600'
                                }`}>

                                    <Check size={18} />

                                </div>

                                <div className="flex-1">

                                    <div className="flex items-center justify-between gap-4">

                                        <div>

                                            <div className="font-semibold text-gray-900">
                                                {history.title}
                                            </div>

                                            <div className="text-sm text-gray-500 mt-1">
                                                {history.user}
                                            </div>

                                        </div>

                                        <div className="text-sm text-gray-500">
                                            {history.date}
                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

            {/* ========================================== */}
            {/* MODAL */}
            {/* ========================================== */}
            {isStatusModalOpen && (

                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">

                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl overflow-hidden">

                        {/* HEADER */}
                        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">

                            <h3 className="text-base font-bold text-gray-900">
                                Update Status Journal
                            </h3>

                            <button
                                onClick={() =>
                                    setIsStatusModalOpen(false)
                                }
                                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500"
                            >
                                ✕
                            </button>

                        </div>

                        {/* BODY */}
                        <div className="p-6 space-y-5">

                            <div>

                                <label className="text-xs font-bold text-gray-700 uppercase mb-3 block">
                                    Pilih Status
                                </label>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

                                    <div
                                        onClick={() =>
                                            setApprovalForm({
                                                ...approvalForm,
                                                status: 'PENDING',
                                            })
                                        }
                                        className={`p-4 rounded-xl border-2 cursor-pointer transition ${
                                            approvalForm.status === 'PENDING'
                                                ? 'border-amber-500 bg-amber-50'
                                                : 'border-gray-200'
                                        }`}
                                    >

                                        <div className="font-bold text-amber-700 text-sm">
                                            Pending
                                        </div>

                                    </div>

                                    <div
                                        onClick={() =>
                                            setApprovalForm({
                                                ...approvalForm,
                                                status: 'APPROVED',
                                            })
                                        }
                                        className={`p-4 rounded-xl border-2 cursor-pointer transition ${
                                            approvalForm.status === 'APPROVED'
                                                ? 'border-emerald-500 bg-emerald-50'
                                                : 'border-gray-200'
                                        }`}
                                    >

                                        <div className="font-bold text-emerald-700 text-sm">
                                            Approved
                                        </div>

                                    </div>

                                    <div
                                        onClick={() =>
                                            setApprovalForm({
                                                ...approvalForm,
                                                status: 'REJECTED',
                                            })
                                        }
                                        className={`p-4 rounded-xl border-2 cursor-pointer transition ${
                                            approvalForm.status === 'REJECTED'
                                                ? 'border-red-500 bg-red-50'
                                                : 'border-gray-200'
                                        }`}
                                    >

                                        <div className="font-bold text-red-700 text-sm">
                                            Rejected
                                        </div>

                                    </div>

                                </div>

                            </div>

                            <div>

                                <label className="text-xs font-bold text-gray-700 uppercase mb-2 block">
                                    Notes
                                </label>

                                <textarea
                                    rows={4}
                                    value={approvalForm.notes}
                                    onChange={(e) =>
                                        setApprovalForm({
                                            ...approvalForm,
                                            notes: e.target.value,
                                        })
                                    }
                                    placeholder="Masukkan catatan approval..."
                                    className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-indigo-500"
                                />

                            </div>

                        </div>

                        {/* FOOTER */}
                        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-end gap-3">

                            <button
                                onClick={() =>
                                    setIsStatusModalOpen(false)
                                }
                                className="h-10 px-4 rounded-xl border border-gray-300 bg-white text-gray-700 text-sm font-semibold hover:bg-gray-50 transition"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleSaveStatus}
                                className="h-10 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition"
                            >
                                Simpan Status
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </PortalLayout>
    );
}