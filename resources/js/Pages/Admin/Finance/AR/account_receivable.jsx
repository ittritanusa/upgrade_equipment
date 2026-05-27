import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';

import {
    Search,
    Plus,
    Eye,
    Pencil,
    Printer,
    Wallet,
    Building2,
    Calendar,
    CircleDollarSign,
    BadgeCheck,
    Clock3,
    AlertCircle,
    ChevronRight,
    ReceiptText,
    Filter,
    ArrowUpRight,
} from 'lucide-react';

// ======================================================
// MOCK DATA ACCOUNT RECEIVABLE
// ======================================================
const MOCK_AR = [
    {
        id: 1,
        invoiceNo: 'INV-2026-00021',
        customer: 'PT Wijaya Karya',
        project: 'Project Tol Cisumdawu',
        invoiceDate: '2026-05-10',
        dueDate: '2026-06-10',
        amount: 285000000,
        paid: 120000000,
        status: 'Partial',
    },
    {
        id: 2,
        invoiceNo: 'INV-2026-00022',
        customer: 'PT Hutama Karya',
        project: 'Project Gedung DPR',
        invoiceDate: '2026-05-15',
        dueDate: '2026-06-15',
        amount: 95000000,
        paid: 95000000,
        status: 'Paid',
    },
    {
        id: 3,
        invoiceNo: 'INV-2026-00023',
        customer: 'PT PP Persero',
        project: 'Project Apartemen Bandung',
        invoiceDate: '2026-05-20',
        dueDate: '2026-06-20',
        amount: 145000000,
        paid: 0,
        status: 'Unpaid',
    },
    {
        id: 4,
        invoiceNo: 'INV-2026-00024',
        customer: 'PT Adhi Karya',
        project: 'Project Jembatan Nasional',
        invoiceDate: '2026-04-01',
        dueDate: '2026-05-01',
        amount: 210000000,
        paid: 50000000,
        status: 'Overdue',
    },
];

// ======================================================
// PAGE
// ======================================================
export default function AccountReceivablePage() {

    const navigate = useNavigate();

    const [search, setSearch] = useState('');

    // ======================================================
    // FORMAT RUPIAH
    // ======================================================
    const formatRupiah = (value) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(value || 0);
    };

    // ======================================================
    // SUMMARY
    // ======================================================
    const totalReceivable = MOCK_AR.reduce(
        (sum, item) => sum + item.amount,
        0
    );

    const totalPaid = MOCK_AR.reduce(
        (sum, item) => sum + item.paid,
        0
    );

    const outstanding = totalReceivable - totalPaid;

    const overdueCount = MOCK_AR.filter(
        (x) => x.status === 'Overdue'
    ).length;

    // ======================================================
    // FILTER
    // ======================================================
    const filteredData = MOCK_AR.filter((item) => {

        const keyword = search.toLowerCase();

        return (
            item.invoiceNo.toLowerCase().includes(keyword) ||
            item.customer.toLowerCase().includes(keyword) ||
            item.project.toLowerCase().includes(keyword)
        );
    });

    // ======================================================
    // STATUS BADGE
    // ======================================================
    const renderStatus = (status) => {

        if (status === 'Paid') {
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 border border-green-200 text-green-700 text-xs font-semibold">
                    <BadgeCheck size={12} />
                    Paid
                </span>
            );
        }

        if (status === 'Partial') {
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold">
                    <Clock3 size={12} />
                    Partial
                </span>
            );
        }

        if (status === 'Overdue') {
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                    <AlertCircle size={12} />
                    Overdue
                </span>
            );
        }

        return (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
                <ReceiptText size={12} />
                Unpaid
            </span>
        );
    };

    return (
        <PortalLayout>

            <div className="space-y-6">

                {/* ====================================================== */}
                {/* HEADER */}
                {/* ====================================================== */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                    <div>

                        <h1 className="text-2xl font-semibold text-gray-900">
                            Account Receivable
                        </h1>

                        <div className="flex items-center gap-2 mt-1 text-sm">

                            <span className="text-gray-400">
                                Finance & Accounting
                            </span>

                            <ChevronRight
                                size={14}
                                className="text-gray-300"
                            />

                            <span className="text-emerald-600 font-medium">
                                Account Receivable
                            </span>

                        </div>

                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            navigate('/portal/finance/account-receivable/create-invoice')
                        }
                        className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-sm transition"
                    >
                        <Plus size={18} />
                        Buat Invoice
                    </button>

                </div>

                {/* ====================================================== */}
                {/* SUMMARY */}
                {/* ====================================================== */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

                    {/* TOTAL AR */}
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">

                        <div className="flex items-start justify-between">

                            <div>

                                <p className="text-sm text-gray-500">
                                    Total Receivable
                                </p>

                                <h2 className="mt-2 text-2xl font-bold text-gray-900">
                                    {formatRupiah(totalReceivable)}
                                </h2>

                            </div>

                            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center">
                                <Wallet
                                    size={22}
                                    className="text-emerald-600"
                                />
                            </div>

                        </div>

                    </div>

                    {/* TOTAL PAID */}
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">

                        <div className="flex items-start justify-between">

                            <div>

                                <p className="text-sm text-gray-500">
                                    Total Paid
                                </p>

                                <h2 className="mt-2 text-2xl font-bold text-gray-900">
                                    {formatRupiah(totalPaid)}
                                </h2>

                            </div>

                            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
                                <BadgeCheck
                                    size={22}
                                    className="text-blue-600"
                                />
                            </div>

                        </div>

                    </div>

                    {/* OUTSTANDING */}
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">

                        <div className="flex items-start justify-between">

                            <div>

                                <p className="text-sm text-gray-500">
                                    Outstanding
                                </p>

                                <h2 className="mt-2 text-2xl font-bold text-gray-900">
                                    {formatRupiah(outstanding)}
                                </h2>

                            </div>

                            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center">
                                <CircleDollarSign
                                    size={22}
                                    className="text-amber-600"
                                />
                            </div>

                        </div>

                    </div>

                    {/* OVERDUE */}
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">

                        <div className="flex items-start justify-between">

                            <div>

                                <p className="text-sm text-gray-500">
                                    Overdue Invoice
                                </p>

                                <h2 className="mt-2 text-2xl font-bold text-gray-900">
                                    {overdueCount} Invoice
                                </h2>

                            </div>

                            <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center">
                                <AlertCircle
                                    size={22}
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

                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">

                        {/* SEARCH */}
                        <div className="relative flex-1">

                            <Search
                                size={18}
                                className="absolute left-3 top-3 text-gray-400"
                            />

                            <input
                                type="text"
                                placeholder="Cari invoice, customer, atau project..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-300 text-sm outline-none focus:border-emerald-500"
                            />

                        </div>

                        {/* FILTER */}
                        <button
                            className="inline-flex items-center justify-center gap-2 h-11 px-4 rounded-xl border border-gray-300 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 transition"
                        >
                            <Filter size={16} />
                            Filter
                        </button>

                    </div>

                </div>

                {/* ====================================================== */}
                {/* TABLE */}
                {/* ====================================================== */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

                    {/* HEADER */}
                    <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">

                        <div>

                            <h2 className="text-lg font-semibold text-gray-900">
                                Daftar Piutang Customer
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Monitoring invoice customer dan outstanding payment
                            </p>

                        </div>

                    </div>

                    {/* TABLE */}
                    <div className="overflow-x-auto">

                        <table className="min-w-full text-sm">

                            <thead className="bg-gray-50 border-b border-gray-200 uppercase text-xs tracking-wider text-gray-600">

                                <tr>

                                    <th className="px-4 py-4 text-left">
                                        Invoice
                                    </th>

                                    <th className="px-4 py-4 text-left">
                                        Customer
                                    </th>

                                    <th className="px-4 py-4 text-left">
                                        Project
                                    </th>

                                    <th className="px-4 py-4 text-center">
                                        Due Date
                                    </th>

                                    <th className="px-4 py-4 text-right">
                                        Amount
                                    </th>

                                    <th className="px-4 py-4 text-right">
                                        Paid
                                    </th>

                                    <th className="px-4 py-4 text-center">
                                        Status
                                    </th>

                                    <th className="px-4 py-4 text-center">
                                        Action
                                    </th>

                                </tr>

                            </thead>

                            <tbody className="divide-y divide-gray-200">

                                {filteredData.map((item) => (

                                    <tr
                                        key={item.id}
                                        className="hover:bg-gray-50/50 transition"
                                    >

                                        {/* INVOICE */}
                                        <td className="px-4 py-4">

                                            <div className="font-semibold text-emerald-600">
                                                {item.invoiceNo}
                                            </div>

                                            <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                                <Calendar size={11} />
                                                {item.invoiceDate}
                                            </div>

                                        </td>

                                        {/* CUSTOMER */}
                                        <td className="px-4 py-4">

                                            <div className="flex items-center gap-2">

                                                <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center">
                                                    <Building2
                                                        size={16}
                                                        className="text-gray-600"
                                                    />
                                                </div>

                                                <div>

                                                    <div className="font-semibold text-gray-900">
                                                        {item.customer}
                                                    </div>

                                                    <div className="text-xs text-gray-500 mt-1">
                                                        Customer Corporate
                                                    </div>

                                                </div>

                                            </div>

                                        </td>

                                        {/* PROJECT */}
                                        <td className="px-4 py-4">

                                            <div className="font-medium text-gray-700">
                                                {item.project}
                                            </div>

                                        </td>

                                        {/* DUE DATE */}
                                        <td className="px-4 py-4 text-center">

                                            <div className="font-medium text-gray-700">
                                                {item.dueDate}
                                            </div>

                                        </td>

                                        {/* AMOUNT */}
                                        <td className="px-4 py-4 text-right">

                                            <div className="font-bold text-gray-900">
                                                {formatRupiah(item.amount)}
                                            </div>

                                        </td>

                                        {/* PAID */}
                                        <td className="px-4 py-4 text-right">

                                            <div className="font-bold text-emerald-600">
                                                {formatRupiah(item.paid)}
                                            </div>

                                        </td>

                                        {/* STATUS */}
                                        <td className="px-4 py-4 text-center">
                                            {renderStatus(item.status)}
                                        </td>

                                        {/* ACTION */}
                                        <td className="px-4 py-4">

                                            <div className="flex items-center justify-center gap-2">

                                                <button
                                                    onClick={() => navigate(`/portal/finance/account-receivable/detail`)}
                                                    className="w-9 h-9 rounded-xl border border-gray-200 hover:bg-gray-50 flex items-center justify-center text-gray-600 transition"
                                                >
                                                    <Eye size={16} />
                                                </button>

                                                <button
                                                    onClick={() => navigate(`/portal/finance/account-receivable/edit-invoice`)}
                                                    className="w-9 h-9 rounded-xl border border-gray-200 hover:bg-blue-50 hover:border-blue-200 flex items-center justify-center text-blue-600 transition"
                                                >
                                                    <Pencil size={16} />
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
                {/* FOOTER INFO */}
                {/* ====================================================== */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">

                    <div className="flex items-start gap-3">

                        <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                            <ArrowUpRight
                                size={20}
                                className="text-emerald-700"
                            />
                        </div>

                        <div>

                            <h3 className="font-semibold text-emerald-900">
                                Monitoring Cashflow Piutang
                            </h3>

                            <p className="text-sm text-emerald-800 mt-1 leading-relaxed">
                                Pastikan seluruh invoice customer dimonitor secara berkala untuk menjaga cashflow project tetap sehat dan mengurangi risiko overdue payment.
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </PortalLayout>
    );
}