import React from 'react';
import PortalLayout from '@/Pages/Layouts/PortalLayout';

import {
    Wallet,
    TrendingUp,
    TrendingDown,
    Landmark,
    ReceiptText,
    CreditCard,
    ArrowUpRight,
    ArrowDownRight,
    Calendar,
    CircleDollarSign,
    FileBarChart2,
    Banknote,
    Building2,
    BadgeDollarSign,
    AlertTriangle,
    CheckCircle2,
    Clock3,
    ChevronRight,
} from 'lucide-react';

// ==========================================
// MOCK SUMMARY DATA
// ==========================================
const SUMMARY = {
    cashBalance: 2850000000,
    monthlyIncome: 1480000000,
    monthlyExpense: 1125000000,
    outstandingReceivable: 685000000,
    outstandingPayable: 420000000,
    profit: 355000000,
};

// ==========================================
// MOCK CASH FLOW
// ==========================================
const CASHFLOW = [
    {
        month: 'Jan',
        income: 950,
        expense: 720,
    },
    {
        month: 'Feb',
        income: 1100,
        expense: 860,
    },
    {
        month: 'Mar',
        income: 1380,
        expense: 990,
    },
    {
        month: 'Apr',
        income: 1200,
        expense: 910,
    },
    {
        month: 'Mei',
        income: 1480,
        expense: 1125,
    },
];

// ==========================================
// MOCK PROJECT FINANCE
// ==========================================
const PROJECT_FINANCE = [
    {
        id: 1,
        project: 'Project Tol Cisumdawu',
        budget: 8500000000,
        realization: 6250000000,
        remaining: 2250000000,
        progress: 74,
        status: 'On Track',
    },
    {
        id: 2,
        project: 'Project Gedung DPR',
        budget: 4200000000,
        realization: 3950000000,
        remaining: 250000000,
        progress: 94,
        status: 'Over Budget Risk',
    },
    {
        id: 3,
        project: 'Project Apartemen Bandung',
        budget: 3100000000,
        realization: 1650000000,
        remaining: 1450000000,
        progress: 53,
        status: 'Normal',
    },
];

// ==========================================
// MOCK RECENT TRANSACTIONS
// ==========================================
const RECENT_TRANSACTIONS = [
    {
        id: 1,
        type: 'income',
        title: 'Pembayaran Progress Project Tol MBZ',
        amount: 450000000,
        date: '28 Mei 2026',
    },
    {
        id: 2,
        type: 'expense',
        title: 'Pembelian Material Besi Beton',
        amount: 185000000,
        date: '27 Mei 2026',
    },
    {
        id: 3,
        type: 'expense',
        title: 'Pembayaran Sewa Excavator',
        amount: 95000000,
        date: '26 Mei 2026',
    },
    {
        id: 4,
        type: 'income',
        title: 'Termin Project Gedung DPR',
        amount: 320000000,
        date: '24 Mei 2026',
    },
];

// ==========================================
// FORMAT RUPIAH
// ==========================================
const formatRupiah = (value) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(value);
};

// ==========================================
// COMPONENT
// ==========================================
export default function FinanceDashboard() {

    return (
        <PortalLayout>

            <div className="space-y-6">

                {/* ========================================== */}
                {/* PAGE HEADER */}
                {/* ========================================== */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                    <div>

                        <h1 className="text-2xl font-semibold text-gray-900">
                            Finance Dashboard
                        </h1>

                        <div className="flex items-center gap-2 mt-1 text-sm">

                            <span className="text-gray-400">
                                Accounting & Finance
                            </span>

                            <span className="text-gray-300">/</span>

                            <span className="text-indigo-600 font-medium">
                                Dashboard
                            </span>

                        </div>

                    </div>

                    <div className="flex items-center gap-3">

                        <button className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-gray-300 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 transition">

                            <Calendar size={16} />

                            Mei 2026

                        </button>

                    </div>

                </div>

                {/* ========================================== */}
                {/* FINANCE OVERVIEW */}
                {/* ========================================== */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

                    {/* CASH */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">

                        <div className="flex items-start justify-between">

                            <div>

                                <p className="text-sm text-gray-500">
                                    Cash Balance
                                </p>

                                <h3 className="mt-2 text-2xl font-bold text-gray-900">
                                    {formatRupiah(SUMMARY.cashBalance)}
                                </h3>

                            </div>

                            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center">
                                <Wallet
                                    size={22}
                                    className="text-indigo-600"
                                />
                            </div>

                        </div>

                        <div className="mt-4 flex items-center gap-2 text-sm text-green-600 font-medium">

                            <ArrowUpRight size={16} />

                            +12.5% dibanding bulan lalu

                        </div>

                    </div>

                    {/* INCOME */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">

                        <div className="flex items-start justify-between">

                            <div>

                                <p className="text-sm text-gray-500">
                                    Total Income
                                </p>

                                <h3 className="mt-2 text-2xl font-bold text-gray-900">
                                    {formatRupiah(SUMMARY.monthlyIncome)}
                                </h3>

                            </div>

                            <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center">
                                <TrendingUp
                                    size={22}
                                    className="text-green-600"
                                />
                            </div>

                        </div>

                        <div className="mt-4 flex items-center gap-2 text-sm text-green-600 font-medium">

                            <ArrowUpRight size={16} />

                            Income meningkat 18%

                        </div>

                    </div>

                    {/* EXPENSE */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">

                        <div className="flex items-start justify-between">

                            <div>

                                <p className="text-sm text-gray-500">
                                    Total Expense
                                </p>

                                <h3 className="mt-2 text-2xl font-bold text-gray-900">
                                    {formatRupiah(SUMMARY.monthlyExpense)}
                                </h3>

                            </div>

                            <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center">
                                <TrendingDown
                                    size={22}
                                    className="text-red-600"
                                />
                            </div>

                        </div>

                        <div className="mt-4 flex items-center gap-2 text-sm text-red-600 font-medium">

                            <ArrowDownRight size={16} />

                            Pengeluaran naik 8%

                        </div>

                    </div>

                    {/* PROFIT */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">

                        <div className="flex items-start justify-between">

                            <div>

                                <p className="text-sm text-gray-500">
                                    Net Profit
                                </p>

                                <h3 className="mt-2 text-2xl font-bold text-gray-900">
                                    {formatRupiah(SUMMARY.profit)}
                                </h3>

                            </div>

                            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center">
                                <BadgeDollarSign
                                    size={22}
                                    className="text-amber-600"
                                />
                            </div>

                        </div>

                        <div className="mt-4 flex items-center gap-2 text-sm text-green-600 font-medium">

                            <ArrowUpRight size={16} />

                            Margin profit stabil

                        </div>

                    </div>

                </div>

                {/* ========================================== */}
                {/* SECOND GRID */}
                {/* ========================================== */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                    {/* ========================================== */}
                    {/* CASHFLOW CHART */}
                    {/* ========================================== */}
                    <div className="xl:col-span-2 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

                        <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">

                            <div className="flex items-center gap-3">

                                <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center">
                                    <FileBarChart2
                                        size={20}
                                        className="text-indigo-600"
                                    />
                                </div>

                                <div>

                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Cashflow Overview
                                    </h2>

                                    <p className="text-sm text-gray-500">
                                        Monitoring income & expense bulanan
                                    </p>

                                </div>

                            </div>

                        </div>

                        <div className="p-6">

                            <div className="h-80 flex items-end justify-between gap-5">

                                {CASHFLOW.map((item, index) => (

                                    <div
                                        key={index}
                                        className="flex-1 flex flex-col items-center gap-3"
                                    >

                                        <div className="flex items-end gap-2 h-56">

                                            {/* INCOME */}
                                            <div
                                                className="w-10 rounded-t-xl bg-green-500"
                                                style={{
                                                    height: `${item.income / 8}px`,
                                                }}
                                            />

                                            {/* EXPENSE */}
                                            <div
                                                className="w-10 rounded-t-xl bg-red-400"
                                                style={{
                                                    height: `${item.expense / 8}px`,
                                                }}
                                            />

                                        </div>

                                        <div className="text-sm font-semibold text-gray-700">
                                            {item.month}
                                        </div>

                                    </div>

                                ))}

                            </div>

                            {/* LEGEND */}
                            <div className="mt-8 flex items-center gap-6 text-sm">

                                <div className="flex items-center gap-2">

                                    <div className="w-3 h-3 rounded-full bg-green-500" />

                                    <span className="text-gray-600">
                                        Income
                                    </span>

                                </div>

                                <div className="flex items-center gap-2">

                                    <div className="w-3 h-3 rounded-full bg-red-400" />

                                    <span className="text-gray-600">
                                        Expense
                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* ========================================== */}
                    {/* RECEIVABLE & PAYABLE */}
                    {/* ========================================== */}
                    <div className="space-y-6">

                        {/* RECEIVABLE */}
                        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">

                            <div className="flex items-center justify-between">

                                <div>

                                    <p className="text-sm text-gray-500">
                                        Outstanding Receivable
                                    </p>

                                    <h3 className="mt-2 text-2xl font-bold text-gray-900">
                                        {formatRupiah(SUMMARY.outstandingReceivable)}
                                    </h3>

                                </div>

                                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
                                    <ReceiptText
                                        size={22}
                                        className="text-blue-600"
                                    />
                                </div>

                            </div>

                            <div className="mt-4 flex items-center gap-2 text-sm text-blue-600 font-medium">

                                <Clock3 size={16} />

                                12 invoice belum dibayar

                            </div>

                        </div>

                        {/* PAYABLE */}
                        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">

                            <div className="flex items-center justify-between">

                                <div>

                                    <p className="text-sm text-gray-500">
                                        Outstanding Payable
                                    </p>

                                    <h3 className="mt-2 text-2xl font-bold text-gray-900">
                                        {formatRupiah(SUMMARY.outstandingPayable)}
                                    </h3>

                                </div>

                                <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center">
                                    <CreditCard
                                        size={22}
                                        className="text-orange-600"
                                    />
                                </div>

                            </div>

                            <div className="mt-4 flex items-center gap-2 text-sm text-orange-600 font-medium">

                                <AlertTriangle size={16} />

                                7 tagihan jatuh tempo minggu ini

                            </div>

                        </div>

                        {/* BANK */}
                        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white shadow-lg">

                            <div className="flex items-center justify-between">

                                <div>

                                    <p className="text-sm text-slate-300">
                                        Corporate Bank Account
                                    </p>

                                    <h3 className="mt-2 text-xl font-bold">
                                        PT. Anugrah Guna Semesta
                                    </h3>

                                </div>

                                <Landmark size={28} />

                            </div>

                            <div className="mt-8 text-2xl font-mono tracking-widest">
                                **** **** **** 8899
                            </div>

                            <div className="mt-4 flex items-center justify-between text-sm">

                                <div>
                                    <div className="text-slate-400">
                                        Available Balance
                                    </div>

                                    <div className="font-bold text-lg mt-1">
                                        {formatRupiah(1850000000)}
                                    </div>
                                </div>

                                <Banknote size={30} />

                            </div>

                        </div>

                    </div>

                </div>

                {/* ========================================== */}
                {/* PROJECT FINANCE */}
                {/* ========================================== */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

                    <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">

                        <div className="flex items-center gap-3">

                            <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center">
                                <Building2
                                    size={20}
                                    className="text-indigo-600"
                                />
                            </div>

                            <div>

                                <h2 className="text-lg font-semibold text-gray-900">
                                    Financial Project Monitoring
                                </h2>

                                <p className="text-sm text-gray-500">
                                    Monitoring budget & realisasi project
                                </p>

                            </div>

                        </div>

                    </div>

                    <div className="overflow-x-auto">

                        <table className="min-w-full text-sm">

                            <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 uppercase tracking-wider text-xs">

                                <tr>

                                    <th className="px-6 py-4 text-left">
                                        Project
                                    </th>

                                    <th className="px-6 py-4 text-right">
                                        Budget
                                    </th>

                                    <th className="px-6 py-4 text-right">
                                        Realisasi
                                    </th>

                                    <th className="px-6 py-4 text-right">
                                        Remaining
                                    </th>

                                    <th className="px-6 py-4 text-center">
                                        Progress
                                    </th>

                                    <th className="px-6 py-4 text-center">
                                        Status
                                    </th>

                                </tr>

                            </thead>

                            <tbody className="divide-y divide-gray-200">

                                {PROJECT_FINANCE.map((item) => (

                                    <tr
                                        key={item.id}
                                        className="hover:bg-gray-50/50 transition"
                                    >

                                        <td className="px-6 py-5">

                                            <div className="font-semibold text-gray-900">
                                                {item.project}
                                            </div>

                                        </td>

                                        <td className="px-6 py-5 text-right font-medium text-gray-700">
                                            {formatRupiah(item.budget)}
                                        </td>

                                        <td className="px-6 py-5 text-right font-medium text-gray-700">
                                            {formatRupiah(item.realization)}
                                        </td>

                                        <td className="px-6 py-5 text-right font-bold text-indigo-600">
                                            {formatRupiah(item.remaining)}
                                        </td>

                                        <td className="px-6 py-5">

                                            <div className="flex items-center gap-3">

                                                <div className="w-full bg-gray-200 rounded-full h-2.5">

                                                    <div
                                                        className={`h-2.5 rounded-full ${
                                                            item.progress >= 90
                                                                ? 'bg-red-500'
                                                                : 'bg-indigo-600'
                                                        }`}
                                                        style={{
                                                            width: `${item.progress}%`,
                                                        }}
                                                    />

                                                </div>

                                                <span className="text-xs font-bold text-gray-700 w-10 text-right">
                                                    {item.progress}%
                                                </span>

                                            </div>

                                        </td>

                                        <td className="px-6 py-5 text-center">

                                            {item.status === 'Over Budget Risk' ? (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-700 border border-red-200 text-xs font-semibold">
                                                    <AlertTriangle size={11} />
                                                    Over Budget Risk
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 border border-green-200 text-xs font-semibold">
                                                    <CheckCircle2 size={11} />
                                                    {item.status}
                                                </span>
                                            )}

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

                {/* ========================================== */}
                {/* RECENT TRANSACTION */}
                {/* ========================================== */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

                    <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">

                        <div>

                            <h2 className="text-lg font-semibold text-gray-900">
                                Recent Transactions
                            </h2>

                            <p className="text-sm text-gray-500">
                                Aktivitas transaksi terakhir finance
                            </p>

                        </div>

                        <button className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition">

                            Lihat Semua

                            <ChevronRight size={16} />

                        </button>

                    </div>

                    <div className="divide-y divide-gray-200">

                        {RECENT_TRANSACTIONS.map((trx) => (

                            <div
                                key={trx.id}
                                className="px-6 py-5 flex items-center justify-between hover:bg-gray-50/50 transition"
                            >

                                <div className="flex items-center gap-4">

                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                                        trx.type === 'income'
                                            ? 'bg-green-50'
                                            : 'bg-red-50'
                                    }`}>

                                        {trx.type === 'income' ? (
                                            <ArrowUpRight
                                                size={22}
                                                className="text-green-600"
                                            />
                                        ) : (
                                            <ArrowDownRight
                                                size={22}
                                                className="text-red-600"
                                            />
                                        )}

                                    </div>

                                    <div>

                                        <div className="font-semibold text-gray-900">
                                            {trx.title}
                                        </div>

                                        <div className="text-sm text-gray-500 mt-1">
                                            {trx.date}
                                        </div>

                                    </div>

                                </div>

                                <div className={`text-lg font-bold ${
                                    trx.type === 'income'
                                        ? 'text-green-600'
                                        : 'text-red-600'
                                }`}>

                                    {trx.type === 'income' ? '+' : '-'}
                                    {formatRupiah(trx.amount)}

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

                {/* ========================================== */}
                {/* QUICK ACTION */}
                {/* ========================================== */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

                    <button className="group bg-white border border-gray-200 rounded-2xl p-5 text-left hover:border-indigo-300 hover:shadow-md transition">

                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center mb-4 group-hover:scale-105 transition">

                            <ReceiptText
                                size={22}
                                className="text-indigo-600"
                            />

                        </div>

                        <h3 className="font-semibold text-gray-900">
                            Create Invoice
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                            Buat invoice project baru
                        </p>

                    </button>

                    <button className="group bg-white border border-gray-200 rounded-2xl p-5 text-left hover:border-green-300 hover:shadow-md transition">

                        <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center mb-4 group-hover:scale-105 transition">

                            <CircleDollarSign
                                size={22}
                                className="text-green-600"
                            />

                        </div>

                        <h3 className="font-semibold text-gray-900">
                            Record Income
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                            Input pemasukan perusahaan
                        </p>

                    </button>

                    <button className="group bg-white border border-gray-200 rounded-2xl p-5 text-left hover:border-red-300 hover:shadow-md transition">

                        <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center mb-4 group-hover:scale-105 transition">

                            <CreditCard
                                size={22}
                                className="text-red-600"
                            />

                        </div>

                        <h3 className="font-semibold text-gray-900">
                            Record Expense
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                            Input pengeluaran operasional
                        </p>

                    </button>

                    <button className="group bg-white border border-gray-200 rounded-2xl p-5 text-left hover:border-amber-300 hover:shadow-md transition">

                        <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center mb-4 group-hover:scale-105 transition">

                            <FileBarChart2
                                size={22}
                                className="text-amber-600"
                            />

                        </div>

                        <h3 className="font-semibold text-gray-900">
                            Financial Report
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                            Generate laporan finance
                        </p>

                    </button>

                </div>

            </div>

        </PortalLayout>
    );
}