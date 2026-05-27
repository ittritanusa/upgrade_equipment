import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';

import {
    Plus,
    Search,
    Filter,
    CalendarDays,
    ReceiptText,
    ArrowUpRight,
    ArrowDownLeft,
    Pencil,
    Eye,
    Printer,
    Download,
    CheckCircle2,
    Clock3,
    XCircle,
    FileSpreadsheet,
    ChevronRight,
    BookOpen,
    Wallet,
} from 'lucide-react';

// ======================================================
// MOCK DATA
// ======================================================
const MOCK_JOURNALS = [
    {
        id: 1,
        nomor: 'JV-2026-00021',
        tanggal: '28 Mei 2026',
        reference: 'Pembayaran Vendor Project MBZ',
        kategori: 'Cash Disbursement',
        createdBy: 'Finance Admin',
        debit: 25000000,
        credit: 25000000,
        status: 'Posted',
    },
    {
        id: 2,
        nomor: 'JV-2026-00022',
        tanggal: '28 Mei 2026',
        reference: 'Pembelian Material Semen',
        kategori: 'Purchase',
        createdBy: 'Ekki Maulana',
        debit: 12000000,
        credit: 12000000,
        status: 'Draft',
    },
    {
        id: 3,
        nomor: 'JV-2026-00023',
        tanggal: '27 Mei 2026',
        reference: 'Biaya Operasional Site Office',
        kategori: 'Expense',
        createdBy: 'Accounting Staff',
        debit: 8500000,
        credit: 8500000,
        status: 'Rejected',
    },
];

// ======================================================
// PAGE
// ======================================================
export default function JournalEntryPage() {

    const navigate = useNavigate();

    // ======================================================
    // STATES
    // ======================================================
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    // ======================================================
    // FORMAT RUPIAH
    // ======================================================
    const formatRupiah = (amount) => {

        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    // ======================================================
    // FILTER DATA
    // ======================================================
    const filteredData = useMemo(() => {

        return MOCK_JOURNALS.filter((item) => {

            const matchSearch =
                item.nomor.toLowerCase().includes(search.toLowerCase()) ||
                item.reference.toLowerCase().includes(search.toLowerCase());

            const matchStatus =
                statusFilter === 'All'
                    ? true
                    : item.status === statusFilter;

            return matchSearch && matchStatus;
        });

    }, [search, statusFilter]);

    // ======================================================
    // TOTALS
    // ======================================================
    const totalJournal = filteredData.length;

    const totalDebit = filteredData.reduce(
        (sum, item) => sum + item.debit,
        0
    );

    const totalCredit = filteredData.reduce(
        (sum, item) => sum + item.credit,
        0
    );

    // ======================================================
    // STATUS BADGE
    // ======================================================
    const renderStatusBadge = (status) => {

        switch (status) {

            case 'Posted':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 border border-green-200 text-green-700 text-xs font-semibold">
                        <CheckCircle2 size={12} />
                        Posted
                    </span>
                );

            case 'Draft':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold">
                        <Clock3 size={12} />
                        Draft
                    </span>
                );

            case 'Rejected':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                        <XCircle size={12} />
                        Rejected
                    </span>
                );

            default:
                return null;
        }
    };

    return (
        <PortalLayout>

            <div className="space-y-6">

                {/* ====================================================== */}
                {/* PAGE HEADER */}
                {/* ====================================================== */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                    <div>

                        <div className="flex items-center gap-3">

                            <h1 className="text-2xl font-semibold text-gray-900">
                                Journal Entry
                            </h1>

                        </div>

                        <div className="flex items-center gap-2 mt-1 text-sm">

                            <span className="text-gray-400">
                                Accounting & Finance
                            </span>

                            <span className="text-gray-300">/</span>

                            <span className="text-indigo-600 font-medium">
                                Journal Entry
                            </span>

                        </div>

                    </div>

                    <div className="flex flex-wrap items-center gap-3">

                        <button
                            type="button"
                            className="inline-flex items-center gap-2 h-11 px-5 rounded-xl border border-gray-300 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 transition"
                        >
                            <Download size={17} />
                            Export Excel
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                navigate('/portal/finance/journal-entry/create')
                            }
                            className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-sm transition"
                        >
                            <Plus size={17} />
                            Buat Journal
                        </button>

                    </div>

                </div>

                {/* ====================================================== */}
                {/* SUMMARY */}
                {/* ====================================================== */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                    {/* TOTAL JOURNAL */}
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-gray-500">
                                    Total Journal
                                </p>

                                <h2 className="text-3xl font-bold text-gray-900 mt-2">
                                    {totalJournal}
                                </h2>

                            </div>

                            <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center">

                                <BookOpen
                                    size={26}
                                    className="text-indigo-600"
                                />

                            </div>

                        </div>

                    </div>

                    {/* TOTAL DEBIT */}
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-gray-500">
                                    Total Debit
                                </p>

                                <h2 className="text-2xl font-bold text-emerald-600 mt-2">
                                    {formatRupiah(totalDebit)}
                                </h2>

                            </div>

                            <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center">

                                <ArrowDownLeft
                                    size={26}
                                    className="text-emerald-600"
                                />

                            </div>

                        </div>

                    </div>

                    {/* TOTAL CREDIT */}
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-gray-500">
                                    Total Credit
                                </p>

                                <h2 className="text-2xl font-bold text-red-600 mt-2">
                                    {formatRupiah(totalCredit)}
                                </h2>

                            </div>

                            <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center">

                                <ArrowUpRight
                                    size={26}
                                    className="text-red-600"
                                />

                            </div>

                        </div>

                    </div>

                </div>

                {/* ====================================================== */}
                {/* FILTER */}
                {/* ====================================================== */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

                        {/* SEARCH */}
                        <div className="relative">

                            <Search
                                size={18}
                                className="absolute left-3 top-3 text-gray-400"
                            />

                            <input
                                type="text"
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                placeholder="Cari nomor journal atau reference..."
                                className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-300 text-sm outline-none focus:border-indigo-500"
                            />

                        </div>

                        {/* STATUS */}
                        <div className="relative">

                            <Filter
                                size={18}
                                className="absolute left-3 top-3 text-gray-400"
                            />

                            <select
                                value={statusFilter}
                                onChange={(e) =>
                                    setStatusFilter(e.target.value)
                                }
                                className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-300 text-sm outline-none focus:border-indigo-500"
                            >
                                <option value="All">
                                    Semua Status
                                </option>

                                <option value="Posted">
                                    Posted
                                </option>

                                <option value="Draft">
                                    Draft
                                </option>

                                <option value="Rejected">
                                    Rejected
                                </option>

                            </select>

                        </div>

                        {/* DATE */}
                        <div className="relative">

                            <CalendarDays
                                size={18}
                                className="absolute left-3 top-3 text-gray-400"
                            />

                            <input
                                type="date"
                                className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-300 text-sm outline-none focus:border-indigo-500"
                            />

                        </div>

                    </div>

                </div>

                {/* ====================================================== */}
                {/* TABLE */}
                {/* ====================================================== */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

                    {/* HEADER */}
                    <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">

                        <div className="flex items-center gap-2">

                            <ReceiptText
                                size={20}
                                className="text-indigo-600"
                            />

                            <div>

                                <h2 className="text-lg font-semibold text-gray-900">
                                    List Journal Entry
                                </h2>

                                <p className="text-sm text-gray-500">
                                    Data transaksi jurnal accounting perusahaan
                                </p>

                            </div>

                        </div>

                    </div>

                    {/* TABLE */}
                    <div className="overflow-x-auto">

                        <table className="min-w-full text-sm">

                            <thead className="bg-gray-50 border-b border-gray-200 uppercase text-xs tracking-wider text-gray-600">

                                <tr>

                                    <th className="px-4 py-4 text-left">
                                        Journal
                                    </th>

                                    <th className="px-4 py-4 text-left">
                                        Reference
                                    </th>

                                    <th className="px-4 py-4 text-center">
                                        Debit
                                    </th>

                                    <th className="px-4 py-4 text-center">
                                        Credit
                                    </th>

                                    <th className="px-4 py-4 text-center">
                                        Status
                                    </th>

                                    <th className="px-4 py-4 text-center">
                                        Aksi
                                    </th>

                                </tr>

                            </thead>

                            <tbody className="divide-y divide-gray-200">

                                {filteredData.map((item) => (

                                    <tr
                                        key={item.id}
                                        className="hover:bg-gray-50/50 transition"
                                    >

                                        {/* JOURNAL */}
                                        <td className="px-4 py-4 min-w-[240px]">

                                            <div className="font-semibold text-gray-900">
                                                {item.nomor}
                                            </div>

                                            <div className="text-xs text-gray-500 mt-1">
                                                {item.tanggal}
                                            </div>

                                            <div className="text-xs text-gray-500 mt-1">
                                                By: {item.createdBy}
                                            </div>

                                        </td>

                                        {/* REF */}
                                        <td className="px-4 py-4 min-w-[280px]">

                                            <div className="font-medium text-gray-900">
                                                {item.reference}
                                            </div>

                                            <div className="text-xs text-gray-500 mt-1">
                                                {item.kategori}
                                            </div>

                                        </td>

                                        {/* DEBIT */}
                                        <td className="px-4 py-4 text-center">

                                            <div className="font-bold text-emerald-600">
                                                {formatRupiah(item.debit)}
                                            </div>

                                        </td>

                                        {/* CREDIT */}
                                        <td className="px-4 py-4 text-center">

                                            <div className="font-bold text-red-600">
                                                {formatRupiah(item.credit)}
                                            </div>

                                        </td>

                                        {/* STATUS */}
                                        <td className="px-4 py-4 text-center">
                                            {renderStatusBadge(item.status)}
                                        </td>

                                        {/* ACTION */}
                                        <td className="px-4 py-4 text-center">

                                            <div className="flex items-center justify-center gap-2">

                                                <button
                                                    type="button"
                                                    onClick={() => navigate(`/portal/finance/journal-entry/detail`)}
                                                    className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition"
                                                    title="Detail Journal"
                                                >
                                                    <Eye size={16} />
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => navigate(`/portal/finance/journal-entry/edit`)}
                                                    className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200 text-indigo-600 hover:bg-indigo-50 transition"
                                                    title="Edit Journal"
                                                >
                                                    <Pencil size={16} />
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => navigate(`/portal/finance/journal-entry/print`)}
                                                    className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200 text-emerald-600 hover:bg-emerald-50 transition"
                                                    title="Print Journal"
                                                >
                                                    <Printer size={16} />
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

                {/* ====================================================== */}
                {/* INFO */}
                {/* ====================================================== */}
                <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-5">

                    <div className="flex items-start gap-3">

                        <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center flex-shrink-0">

                            <Wallet
                                size={20}
                                className="text-indigo-700"
                            />

                        </div>

                        <div>

                            <h3 className="font-semibold text-indigo-900">
                                Informasi Journal Entry
                            </h3>

                            <p className="text-sm text-indigo-800 mt-1 leading-relaxed">
                                Journal Entry digunakan untuk mencatat seluruh transaksi
                                accounting perusahaan seperti pembayaran vendor,
                                biaya operasional project, pembelian material,
                                adjustment saldo, dan transaksi keuangan lainnya.
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </PortalLayout>
    );
}