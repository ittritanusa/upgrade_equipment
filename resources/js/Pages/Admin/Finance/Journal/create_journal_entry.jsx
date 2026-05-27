import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';

import {
    ArrowLeft,
    Save,
    Plus,
    Trash2,
    ReceiptText,
    CalendarDays,
    FileText,
    Wallet,
    Building2,
    BadgeDollarSign,
    ClipboardList,
    AlertTriangle,
    CheckCircle2,
} from 'lucide-react';

// ==========================================
// MOCK ACCOUNT
// ==========================================
const MOCK_ACCOUNTS = [
    {
        id: 1,
        code: '1101',
        name: 'Cash On Hand',
        category: 'Asset',
        balance: 125000000,
    },
    {
        id: 2,
        code: '1102',
        name: 'Bank BCA',
        category: 'Asset',
        balance: 450000000,
    },
    {
        id: 3,
        code: '5101',
        name: 'Operational Expense',
        category: 'Expense',
        balance: 82000000,
    },
    {
        id: 4,
        code: '4101',
        name: 'Project Revenue',
        category: 'Revenue',
        balance: 950000000,
    },
];

// ==========================================
// PAGE
// ==========================================
export default function CreateJournalEntry() {

    const navigate = useNavigate();

    // ==========================================
    // HEADER FORM
    // ==========================================
    const [form, setForm] = useState({
        journalNo: 'JE-2026-00021',
        journalDate: '',
        reference: '',
        project: '',
        description: '',
    });

    // ==========================================
    // DETAIL JOURNAL
    // ==========================================
    const [details, setDetails] = useState([
        {
            accountId: '',
            accountCode: '',
            accountName: '',
            category: '',
            debit: '',
            credit: '',
            notes: '',
        },
    ]);

    // ==========================================
    // HANDLE CHANGE
    // ==========================================
    const handleChange = (field, value) => {

        setForm({
            ...form,
            [field]: value,
        });
    };

    // ==========================================
    // HANDLE ACCOUNT SELECT
    // ==========================================
    const handleSelectAccount = (index, accountId) => {

        const selected = MOCK_ACCOUNTS.find(
            (item) => item.id === parseInt(accountId)
        );

        if (!selected) return;

        const updated = [...details];

        updated[index] = {
            ...updated[index],
            accountId: selected.id,
            accountCode: selected.code,
            accountName: selected.name,
            category: selected.category,
        };

        setDetails(updated);
    };

    // ==========================================
    // HANDLE DETAIL CHANGE
    // ==========================================
    const handleDetailChange = (index, field, value) => {

        const updated = [...details];

        updated[index][field] = value;

        setDetails(updated);
    };

    // ==========================================
    // ADD ROW
    // ==========================================
    const addRow = () => {

        setDetails([
            ...details,
            {
                accountId: '',
                accountCode: '',
                accountName: '',
                category: '',
                debit: '',
                credit: '',
                notes: '',
            },
        ]);
    };

    // ==========================================
    // REMOVE ROW
    // ==========================================
    const removeRow = (index) => {

        const updated = [...details];

        updated.splice(index, 1);

        setDetails(updated);
    };

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
    // TOTALS
    // ==========================================
    const totalDebit = details.reduce(
        (sum, item) => sum + Number(item.debit || 0),
        0
    );

    const totalCredit = details.reduce(
        (sum, item) => sum + Number(item.credit || 0),
        0
    );

    const isBalanced = totalDebit === totalCredit;

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

    return (
        <PortalLayout>

            <div className="space-y-6">

                {/* ========================================== */}
                {/* HEADER */}
                {/* ========================================== */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                    <div>

                        <h1 className="text-2xl font-semibold text-gray-900">
                            Buat Journal Entry
                        </h1>

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
                                Create Journal
                            </span>

                        </div>

                    </div>

                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 h-11 px-5 rounded-xl border border-gray-300 bg-white text-gray-700 text-sm font-semibold hover:bg-gray-50 transition"
                    >
                        <ArrowLeft size={17} />
                        Kembali
                    </button>

                </div>

                {/* ========================================== */}
                {/* JOURNAL INFO */}
                {/* ========================================== */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">

                    <div className="flex items-center gap-2 mb-5">

                        <ReceiptText
                            size={20}
                            className="text-indigo-600"
                        />

                        <div>

                            <h2 className="text-lg font-semibold text-gray-900">
                                Informasi Journal
                            </h2>

                            <p className="text-sm text-gray-500">
                                Informasi utama transaksi jurnal
                            </p>

                        </div>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        {/* JOURNAL NO */}
                        <div>

                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Nomor Journal
                            </label>

                            <div className="relative">

                                <FileText
                                    size={18}
                                    className="absolute left-3 top-3 text-gray-400"
                                />

                                <input
                                    type="text"
                                    value={form.journalNo}
                                    disabled
                                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-300 bg-gray-50 text-sm text-gray-700"
                                />

                            </div>

                        </div>

                        {/* DATE */}
                        <div>

                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Tanggal Journal
                            </label>

                            <div className="relative">

                                <CalendarDays
                                    size={18}
                                    className="absolute left-3 top-3 text-gray-400"
                                />

                                <input
                                    type="date"
                                    value={form.journalDate}
                                    onChange={(e) =>
                                        handleChange('journalDate', e.target.value)
                                    }
                                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-300 text-sm outline-none focus:border-indigo-500"
                                />

                            </div>

                        </div>

                        {/* REFERENCE */}
                        <div>

                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Reference Number
                            </label>

                            <input
                                type="text"
                                placeholder="Contoh: INV/2026/001"
                                value={form.reference}
                                onChange={(e) =>
                                    handleChange('reference', e.target.value)
                                }
                                className="w-full h-11 px-4 rounded-xl border border-gray-300 text-sm outline-none focus:border-indigo-500"
                            />

                        </div>

                        {/* PROJECT */}
                        <div>

                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Project / Department
                            </label>

                            <div className="relative">

                                <Building2
                                    size={18}
                                    className="absolute left-3 top-3 text-gray-400"
                                />

                                <select
                                    value={form.project}
                                    onChange={(e) =>
                                        handleChange('project', e.target.value)
                                    }
                                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-300 text-sm outline-none focus:border-indigo-500"
                                >
                                    <option value="">
                                        Pilih Project
                                    </option>

                                    <option>
                                        Project Tol MBZ
                                    </option>

                                    <option>
                                        Project Gedung DPR
                                    </option>

                                    <option>
                                        Head Office
                                    </option>

                                </select>

                            </div>

                        </div>

                        {/* DESCRIPTION */}
                        <div className="md:col-span-2">

                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Description
                            </label>

                            <textarea
                                rows={4}
                                value={form.description}
                                onChange={(e) =>
                                    handleChange('description', e.target.value)
                                }
                                placeholder="Masukkan deskripsi transaksi jurnal..."
                                className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-indigo-500"
                            />

                        </div>

                    </div>

                </div>

                {/* ========================================== */}
                {/* DETAIL TABLE */}
                {/* ========================================== */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

                    {/* HEADER */}
                    <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">

                        <div className="flex items-center gap-2">

                            <ClipboardList
                                size={20}
                                className="text-indigo-600"
                            />

                            <div>

                                <h2 className="text-lg font-semibold text-gray-900">
                                    Detail Journal Entry
                                </h2>

                                <p className="text-sm text-gray-500">
                                    Tambahkan account debit dan credit
                                </p>

                            </div>

                        </div>

                        <button
                            onClick={addRow}
                            className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition"
                        >
                            <Plus size={16} />
                            Tambah Baris
                        </button>

                    </div>

                    {/* TABLE */}
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

                                    <th className="px-4 py-4 text-center">
                                        Action
                                    </th>

                                </tr>

                            </thead>

                            <tbody className="divide-y divide-gray-200">

                                {details.map((row, index) => (

                                    <tr key={index}>

                                        {/* ACCOUNT */}
                                        <td className="px-4 py-4 min-w-[300px]">

                                            <select
                                                value={row.accountId}
                                                onChange={(e) =>
                                                    handleSelectAccount(index, e.target.value)
                                                }
                                                className="w-full h-11 rounded-xl border border-gray-300 px-3 text-sm outline-none focus:border-indigo-500"
                                            >
                                                <option value="">
                                                    Pilih Account
                                                </option>

                                                {MOCK_ACCOUNTS.map((account) => (

                                                    <option
                                                        key={account.id}
                                                        value={account.id}
                                                    >
                                                        {account.code} - {account.name}
                                                    </option>

                                                ))}

                                            </select>

                                            {row.accountName && (

                                                <div className="mt-2">

                                                    <div className="font-semibold text-gray-900">
                                                        {row.accountName}
                                                    </div>

                                                    <div className="text-xs text-gray-500 mt-1">
                                                        {row.accountCode}
                                                    </div>

                                                </div>

                                            )}

                                        </td>

                                        {/* CATEGORY */}
                                        <td className="px-4 py-4 text-center">
                                            {renderCategory(row.category)}
                                        </td>

                                        {/* DEBIT */}
                                        <td className="px-4 py-4 min-w-[180px]">

                                            <input
                                                type="number"
                                                min="0"
                                                value={row.debit}
                                                onChange={(e) =>
                                                    handleDetailChange(index, 'debit', e.target.value)
                                                }
                                                placeholder="0"
                                                className="w-full h-11 rounded-xl border border-gray-300 px-4 text-right text-sm outline-none focus:border-indigo-500"
                                            />

                                        </td>

                                        {/* CREDIT */}
                                        <td className="px-4 py-4 min-w-[180px]">

                                            <input
                                                type="number"
                                                min="0"
                                                value={row.credit}
                                                onChange={(e) =>
                                                    handleDetailChange(index, 'credit', e.target.value)
                                                }
                                                placeholder="0"
                                                className="w-full h-11 rounded-xl border border-gray-300 px-4 text-right text-sm outline-none focus:border-indigo-500"
                                            />

                                        </td>

                                        {/* NOTES */}
                                        <td className="px-4 py-4 min-w-[240px]">

                                            <input
                                                type="text"
                                                value={row.notes}
                                                onChange={(e) =>
                                                    handleDetailChange(index, 'notes', e.target.value)
                                                }
                                                placeholder="Catatan jurnal..."
                                                className="w-full h-11 rounded-xl border border-gray-300 px-4 text-sm outline-none focus:border-indigo-500"
                                            />

                                        </td>

                                        {/* ACTION */}
                                        <td className="px-4 py-4 text-center">

                                            <button
                                                onClick={() => removeRow(index)}
                                                className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-red-500 hover:bg-red-50 transition"
                                            >
                                                <Trash2 size={17} />
                                            </button>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

                {/* ========================================== */}
                {/* SUMMARY */}
                {/* ========================================== */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                    {/* TOTAL DEBIT */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">

                        <div className="flex items-center gap-2 mb-3">

                            <Wallet
                                size={18}
                                className="text-indigo-600"
                            />

                            <span className="text-sm font-semibold text-gray-700">
                                Total Debit
                            </span>

                        </div>

                        <div className="text-2xl font-bold text-indigo-600">
                            {formatRupiah(totalDebit)}
                        </div>

                    </div>

                    {/* TOTAL CREDIT */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">

                        <div className="flex items-center gap-2 mb-3">

                            <BadgeDollarSign
                                size={18}
                                className="text-emerald-600"
                            />

                            <span className="text-sm font-semibold text-gray-700">
                                Total Credit
                            </span>

                        </div>

                        <div className="text-2xl font-bold text-emerald-600">
                            {formatRupiah(totalCredit)}
                        </div>

                    </div>

                    {/* STATUS */}
                    <div className={`border rounded-2xl p-5 shadow-sm ${
                        isBalanced
                            ? 'bg-emerald-50 border-emerald-200'
                            : 'bg-red-50 border-red-200'
                    }`}>

                        <div className="flex items-center gap-2 mb-3">

                            {isBalanced ? (
                                <CheckCircle2
                                    size={18}
                                    className="text-emerald-600"
                                />
                            ) : (
                                <AlertTriangle
                                    size={18}
                                    className="text-red-600"
                                />
                            )}

                            <span className={`text-sm font-semibold ${
                                isBalanced
                                    ? 'text-emerald-700'
                                    : 'text-red-700'
                            }`}>
                                Balance Status
                            </span>

                        </div>

                        <div className={`text-lg font-bold ${
                            isBalanced
                                ? 'text-emerald-700'
                                : 'text-red-700'
                        }`}>
                            {isBalanced
                                ? 'Balanced Journal'
                                : 'Journal Not Balanced'}
                        </div>

                    </div>

                </div>

                {/* ========================================== */}
                {/* ALERT */}
                {/* ========================================== */}
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">

                    <div className="flex items-start gap-3">

                        <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">

                            <AlertTriangle
                                size={20}
                                className="text-amber-700"
                            />

                        </div>

                        <div>

                            <h3 className="font-semibold text-amber-900">
                                Informasi Journal Entry
                            </h3>

                            <p className="text-sm text-amber-800 mt-1 leading-relaxed">
                                Pastikan total debit dan credit memiliki nilai yang seimbang sebelum jurnal disimpan ke sistem accounting perusahaan.
                            </p>

                        </div>

                    </div>

                </div>

                {/* ========================================== */}
                {/* ACTION */}
                {/* ========================================== */}
                <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3">

                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="h-11 px-5 rounded-xl border border-gray-300 bg-white text-gray-700 text-sm font-semibold hover:bg-gray-50 transition"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-sm transition"
                    >
                        <Save size={18} />
                        Simpan Journal
                    </button>

                </div>

            </div>

        </PortalLayout>
    );
}