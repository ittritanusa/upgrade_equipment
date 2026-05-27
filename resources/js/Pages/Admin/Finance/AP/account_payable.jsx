import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';

import {
    Plus,
    Search,
    Filter,
    Wallet,
    Building2,
    Calendar,
    Clock3,
    CheckCircle2,
    AlertTriangle,
    CreditCard,
    Eye,
    Pencil,
    Printer,
    FileSpreadsheet,
    Receipt,
    Landmark,
    ArrowDownUp,
} from 'lucide-react';

// ==========================================
// MOCK DATA
// ==========================================
const ACCOUNT_PAYABLES = [
    {
        id: 1,
        invoiceNumber: 'AP-2026-00021',
        vendor: 'PT Sinar Baja Perkasa',
        project: 'Project Tol Cisumdawu',
        invoiceDate: '28 Mei 2026',
        dueDate: '15 Juni 2026',
        amount: 185000000,
        paymentMethod: 'Bank Transfer',
        status: 'Outstanding',
    },
    {
        id: 2,
        invoiceNumber: 'AP-2026-00022',
        vendor: 'PT Beton Nusantara',
        project: 'Project Gedung DPR',
        invoiceDate: '24 Mei 2026',
        dueDate: '10 Juni 2026',
        amount: 96000000,
        paymentMethod: 'Giro',
        status: 'Partial',
    },
    {
        id: 3,
        invoiceNumber: 'AP-2026-00023',
        vendor: 'PT Mandiri Equipment',
        project: 'Project MBZ',
        invoiceDate: '18 Mei 2026',
        dueDate: '05 Juni 2026',
        amount: 320000000,
        paymentMethod: 'Bank Transfer',
        status: 'Paid',
    },
];

// ==========================================
// COMPONENT
// ==========================================
export default function AccountPayablePage() {

    const navigate = useNavigate();

    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    // ==========================================
    // FILTER DATA
    // ==========================================
    const filteredData = ACCOUNT_PAYABLES.filter((item) => {

        const matchSearch =
            item.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
            item.vendor.toLowerCase().includes(search.toLowerCase()) ||
            item.project.toLowerCase().includes(search.toLowerCase());

        const matchStatus =
            statusFilter === 'All'
                ? true
                : item.status === statusFilter;

        return matchSearch && matchStatus;
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
    // STATUS BADGE
    // ==========================================
    const renderStatusBadge = (status) => {

        if (status === 'Paid') {

            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 border border-green-200 text-green-700 text-xs font-semibold">
                    <CheckCircle2 size={12} />
                    Paid
                </span>
            );
        }

        if (status === 'Partial') {

            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold">
                    <Clock3 size={12} />
                    Partial Paid
                </span>
            );
        }

        return (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                <AlertTriangle size={12} />
                Outstanding
            </span>
        );
    };

    // ==========================================
    // SUMMARY
    // ==========================================
    const totalOutstanding = ACCOUNT_PAYABLES
        .filter((x) => x.status === 'Outstanding')
        .reduce((sum, item) => sum + item.amount, 0);

    const totalPartial = ACCOUNT_PAYABLES
        .filter((x) => x.status === 'Partial')
        .reduce((sum, item) => sum + item.amount, 0);

    const totalPaid = ACCOUNT_PAYABLES
        .filter((x) => x.status === 'Paid')
        .reduce((sum, item) => sum + item.amount, 0);

    return (
        <PortalLayout>

            <div className="space-y-6">

                {/* ========================================== */}
                {/* HEADER */}
                {/* ========================================== */}
                <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">

                    <div>

                        <h1 className="text-2xl font-semibold text-gray-900">
                            Account Payable
                        </h1>

                        <div className="flex items-center gap-2 mt-1 text-sm">

                            <span className="text-gray-400">
                                Accounting & Finance
                            </span>

                            <span className="text-gray-300">/</span>

                            <span className="text-indigo-600 font-medium">
                                Account Payable
                            </span>

                        </div>

                    </div>

                    <div className="flex flex-wrap items-center gap-3">

                        <button
                            className="inline-flex items-center gap-2 h-11 px-5 rounded-xl border border-gray-300 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 transition"
                        >
                            <Printer size={18} />
                            Print
                        </button>

                        <button
                            className="inline-flex items-center gap-2 h-11 px-5 rounded-xl border border-gray-300 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 transition"
                        >
                            <FileSpreadsheet size={18} />
                            Export Excel
                        </button>

                        <button
                            onClick={() => navigate('/portal/finance/account-payable/create')}
                            className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition"
                        >
                            <Plus size={18} />
                            Buat Invoice Vendor
                        </button>

                    </div>

                </div>

                {/* ========================================== */}
                {/* SUMMARY */}
                {/* ========================================== */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

                    {/* TOTAL AP */}
                    <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-3xl p-6 text-white shadow-lg">

                        <div className="flex items-start justify-between">

                            <div>

                                <p className="text-sm text-indigo-100">
                                    Total Hutang
                                </p>

                                <h2 className="text-2xl font-bold mt-2">
                                    {formatRupiah(
                                        totalOutstanding +
                                        totalPartial +
                                        totalPaid
                                    )}
                                </h2>

                            </div>

                            <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center">
                                <Wallet size={28} />
                            </div>

                        </div>

                    </div>

                    {/* OUTSTANDING */}
                    <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">

                        <div className="flex items-start justify-between">

                            <div>

                                <p className="text-sm text-gray-500">
                                    Outstanding
                                </p>

                                <h2 className="text-2xl font-bold text-red-600 mt-2">
                                    {formatRupiah(totalOutstanding)}
                                </h2>

                            </div>

                            <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center">
                                <AlertTriangle
                                    size={28}
                                    className="text-red-600"
                                />
                            </div>

                        </div>

                    </div>

                    {/* PARTIAL */}
                    <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">

                        <div className="flex items-start justify-between">

                            <div>

                                <p className="text-sm text-gray-500">
                                    Partial Paid
                                </p>

                                <h2 className="text-2xl font-bold text-amber-600 mt-2">
                                    {formatRupiah(totalPartial)}
                                </h2>

                            </div>

                            <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center">
                                <Clock3
                                    size={28}
                                    className="text-amber-600"
                                />
                            </div>

                        </div>

                    </div>

                    {/* PAID */}
                    <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">

                        <div className="flex items-start justify-between">

                            <div>

                                <p className="text-sm text-gray-500">
                                    Paid Invoice
                                </p>

                                <h2 className="text-2xl font-bold text-emerald-600 mt-2">
                                    {formatRupiah(totalPaid)}
                                </h2>

                            </div>

                            <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center">
                                <CheckCircle2
                                    size={28}
                                    className="text-emerald-600"
                                />
                            </div>

                        </div>

                    </div>

                </div>

                {/* ========================================== */}
                {/* FILTER */}
                {/* ========================================== */}
                <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-5">

                    <div className="flex flex-col xl:flex-row xl:items-center gap-4">

                        {/* SEARCH */}
                        <div className="relative flex-1">

                            <Search
                                size={18}
                                className="absolute left-4 top-3.5 text-gray-400"
                            />

                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari invoice, vendor, atau project..."
                                className="w-full h-11 pl-11 pr-4 rounded-xl border border-gray-300 text-sm outline-none focus:border-indigo-500"
                            />

                        </div>

                        {/* STATUS */}
                        <div className="flex items-center gap-3">

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
                                    className="h-11 pl-10 pr-10 rounded-xl border border-gray-300 text-sm outline-none focus:border-indigo-500"
                                >
                                    <option value="All">
                                        Semua Status
                                    </option>

                                    <option value="Outstanding">
                                        Outstanding
                                    </option>

                                    <option value="Partial">
                                        Partial Paid
                                    </option>

                                    <option value="Paid">
                                        Paid
                                    </option>

                                </select>

                            </div>

                        </div>

                    </div>

                </div>

                {/* ========================================== */}
                {/* TABLE */}
                {/* ========================================== */}
                <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">

                    {/* HEADER */}
                    <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">

                        <div className="flex items-center gap-3">

                            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center">

                                <Receipt
                                    size={22}
                                    className="text-indigo-600"
                                />

                            </div>

                            <div>

                                <h2 className="text-lg font-semibold text-gray-900">
                                    List Account Payable
                                </h2>

                                <p className="text-sm text-gray-500">
                                    Monitoring hutang vendor dan supplier perusahaan
                                </p>

                            </div>

                        </div>

                        <div className="hidden lg:flex items-center gap-2 text-sm text-gray-500">

                            <ArrowDownUp size={16} />

                            Latest Update

                        </div>

                    </div>

                    {/* TABLE */}
                    <div className="overflow-x-auto">

                        <table className="min-w-full text-sm">

                            <thead className="bg-gray-50 border-b border-gray-200 uppercase text-xs tracking-wider text-gray-600">

                                <tr>

                                    <th className="px-5 py-4 text-left">
                                        Invoice
                                    </th>

                                    <th className="px-5 py-4 text-left">
                                        Vendor
                                    </th>

                                    <th className="px-5 py-4 text-left">
                                        Project
                                    </th>

                                    <th className="px-5 py-4 text-center">
                                        Tanggal
                                    </th>

                                    <th className="px-5 py-4 text-center">
                                        Jatuh Tempo
                                    </th>

                                    <th className="px-5 py-4 text-right">
                                        Total
                                    </th>

                                    <th className="px-5 py-4 text-center">
                                        Status
                                    </th>

                                    <th className="px-5 py-4 text-center">
                                        Aksi
                                    </th>

                                </tr>

                            </thead>

                            <tbody className="divide-y divide-gray-200">

                                {filteredData.map((item) => (

                                    <tr
                                        key={item.id}
                                        className="hover:bg-gray-50/60 transition"
                                    >

                                        {/* INVOICE */}
                                        <td className="px-5 py-5 min-w-[220px]">

                                            <div className="font-semibold text-gray-900">
                                                {item.invoiceNumber}
                                            </div>

                                            <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">

                                                <CreditCard size={12} />

                                                {item.paymentMethod}

                                            </div>

                                        </td>

                                        {/* VENDOR */}
                                        <td className="px-5 py-5 min-w-[240px]">

                                            <div className="flex items-center gap-3">

                                                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">

                                                    <Landmark
                                                        size={18}
                                                        className="text-emerald-600"
                                                    />

                                                </div>

                                                <div>

                                                    <div className="font-semibold text-gray-900">
                                                        {item.vendor}
                                                    </div>

                                                    <div className="text-xs text-gray-500 mt-1">
                                                        Vendor / Supplier
                                                    </div>

                                                </div>

                                            </div>

                                        </td>

                                        {/* PROJECT */}
                                        <td className="px-5 py-5 min-w-[220px]">

                                            <div className="flex items-center gap-2 text-gray-700">

                                                <Building2
                                                    size={15}
                                                    className="text-indigo-500"
                                                />

                                                {item.project}

                                            </div>

                                        </td>

                                        {/* DATE */}
                                        <td className="px-5 py-5 text-center">

                                            <div className="inline-flex items-center gap-1.5 text-gray-700">

                                                <Calendar
                                                    size={14}
                                                    className="text-gray-400"
                                                />

                                                {item.invoiceDate}

                                            </div>

                                        </td>

                                        {/* DUE DATE */}
                                        <td className="px-5 py-5 text-center">

                                            <div className="inline-flex items-center gap-1.5 text-gray-700">

                                                <Clock3
                                                    size={14}
                                                    className="text-gray-400"
                                                />

                                                {item.dueDate}

                                            </div>

                                        </td>

                                        {/* TOTAL */}
                                        <td className="px-5 py-5 text-right">

                                            <div className="font-bold text-indigo-600">
                                                {formatRupiah(item.amount)}
                                            </div>

                                        </td>

                                        {/* STATUS */}
                                        <td className="px-5 py-5 text-center">
                                            {renderStatusBadge(item.status)}
                                        </td>

                                        {/* ACTION */}
                                        <td className="px-5 py-5">

                                            <div className="flex items-center justify-center gap-2">

                                                <button
                                                    onClick={() =>
                                                        navigate(`/portal/finance/account-payable/detail`)
                                                    }
                                                    className="w-10 h-10 rounded-xl border border-gray-200 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 flex items-center justify-center transition"
                                                >
                                                    <Eye size={17} />
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        navigate(`/portal/finance/account-payable/edit`)
                                                    }
                                                    className="w-10 h-10 rounded-xl border border-gray-200 text-gray-600 hover:bg-amber-50 hover:text-amber-600 hover:border-amber-200 flex items-center justify-center transition"
                                                >
                                                    <Pencil size={17} />
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