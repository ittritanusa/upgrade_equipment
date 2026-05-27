import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';

import {
    ArrowLeft,
    Search,
    Plus,
    Filter,
    Download,
    Calendar,
    Building2,
    Wallet,
    Receipt,
    Landmark,
    TrendingUp,
    TrendingDown,
    FileSpreadsheet,
    Eye,
    Printer,
    ChevronRight,
    ChevronDown,
    BadgeDollarSign,
} from 'lucide-react';

// ==========================================
// MOCK DATA GENERAL LEDGER
// ==========================================
const MOCK_GL = [
    {
        id: 1,
        coaCode: '1101',
        coaName: 'Kas Besar',
        category: 'Asset',
        transactions: [
            {
                id: 1,
                date: '2026-05-01',
                journalNo: 'JV-2026-00121',
                description: 'Saldo Awal Bulan Mei',
                debit: 85000000,
                credit: 0,
            },
            {
                id: 2,
                date: '2026-05-03',
                journalNo: 'JV-2026-00125',
                description: 'Pembelian Material Project MBZ',
                debit: 0,
                credit: 12000000,
            },
            {
                id: 3,
                date: '2026-05-06',
                journalNo: 'JV-2026-00130',
                description: 'Penerimaan Progress Termin Project',
                debit: 25000000,
                credit: 0,
            },
        ],
    },
    {
        id: 2,
        coaCode: '5101',
        coaName: 'Biaya Operasional Project',
        category: 'Expense',
        transactions: [
            {
                id: 1,
                date: '2026-05-02',
                journalNo: 'JV-2026-00122',
                description: 'Biaya Mobilisasi Alat Berat',
                debit: 18000000,
                credit: 0,
            },
            {
                id: 2,
                date: '2026-05-04',
                journalNo: 'JV-2026-00128',
                description: 'Pembayaran BBM Excavator',
                debit: 4500000,
                credit: 0,
            },
        ],
    },
    {
        id: 3,
        coaCode: '4101',
        coaName: 'Pendapatan Project',
        category: 'Revenue',
        transactions: [
            {
                id: 1,
                date: '2026-05-05',
                journalNo: 'JV-2026-00131',
                description: 'Revenue Progress Project Tol',
                debit: 0,
                credit: 65000000,
            },
            {
                id: 2,
                date: '2026-05-09',
                journalNo: 'JV-2026-00135',
                description: 'Revenue Project Gedung DPR',
                debit: 0,
                credit: 43000000,
            },
        ],
    },
];

// ==========================================
// PAGE
// ==========================================
export default function GeneralLedgerPage() {

    const navigate = useNavigate();

    // ==========================================
    // FILTER STATE
    // ==========================================
    const [search, setSearch] = useState('');
    const [expandedRows, setExpandedRows] = useState([1]);

    // ==========================================
    // FORMAT RUPIAH
    // ==========================================
    const formatRupiah = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount || 0);
    };

    // ==========================================
    // FILTERED DATA
    // ==========================================
    const filteredData = useMemo(() => {

        return MOCK_GL.filter((item) =>
            item.coaCode.toLowerCase().includes(search.toLowerCase()) ||
            item.coaName.toLowerCase().includes(search.toLowerCase())
        );

    }, [search]);

    // ==========================================
    // TOGGLE EXPAND
    // ==========================================
    const toggleExpand = (id) => {

        if (expandedRows.includes(id)) {

            setExpandedRows(
                expandedRows.filter((x) => x !== id)
            );

        } else {

            setExpandedRows([...expandedRows, id]);

        }

    };

    // ==========================================
    // TOTAL SUMMARY
    // ==========================================
    const summary = useMemo(() => {

        let totalDebit = 0;
        let totalCredit = 0;

        MOCK_GL.forEach((ledger) => {

            ledger.transactions.forEach((trx) => {

                totalDebit += trx.debit;
                totalCredit += trx.credit;

            });

        });

        return {
            totalDebit,
            totalCredit,
            balance: totalDebit - totalCredit,
        };

    }, []);

    // ==========================================
    // CATEGORY BADGE
    // ==========================================
    const renderCategoryBadge = (category) => {

        if (category === 'Asset') {
            return (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold">
                    <Landmark size={11} />
                    Asset
                </span>
            );
        }

        if (category === 'Expense') {
            return (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-red-50 text-red-700 border border-red-200 text-xs font-semibold">
                    <TrendingDown size={11} />
                    Expense
                </span>
            );
        }

        return (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-green-50 text-green-700 border border-green-200 text-xs font-semibold">
                <TrendingUp size={11} />
                Revenue
            </span>
        );
    };

    return (
        <PortalLayout>

            <div className="space-y-6">

                {/* ========================================== */}
                {/* PAGE HEADER */}
                {/* ========================================== */}
                <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">

                    <div>

                        <h1 className="text-2xl font-semibold text-gray-900">
                            General Ledger
                        </h1>

                        <div className="flex items-center gap-2 mt-1 text-sm">

                            <span className="text-gray-400">
                                Accounting & Finance
                            </span>

                            <span className="text-gray-300">/</span>

                            <span className="text-indigo-600 font-medium">
                                General Ledger
                            </span>

                        </div>

                    </div>

                    <div className="flex items-center gap-2">

                        <button
                            onClick={() => window.print()}
                            className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                        >
                            <Printer size={16} />
                            Print
                        </button>

                        <button
                            className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                        >
                            <Download size={16} />
                            Export Excel
                        </button>

                        <button
                            onClick={() => navigate(-1)}
                            className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition"
                        >
                            <ArrowLeft size={16} />
                            Kembali
                        </button>

                    </div>

                </div>

                {/* ========================================== */}
                {/* SUMMARY */}
                {/* ========================================== */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                    {/* TOTAL DEBIT */}
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">

                        <div className="flex items-start justify-between">

                            <div>

                                <p className="text-sm text-gray-500">
                                    Total Debit
                                </p>

                                <h2 className="mt-2 text-2xl font-bold text-gray-900">
                                    {formatRupiah(summary.totalDebit)}
                                </h2>

                            </div>

                            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
                                <TrendingUp
                                    size={22}
                                    className="text-blue-600"
                                />
                            </div>

                        </div>

                    </div>

                    {/* TOTAL CREDIT */}
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">

                        <div className="flex items-start justify-between">

                            <div>

                                <p className="text-sm text-gray-500">
                                    Total Credit
                                </p>

                                <h2 className="mt-2 text-2xl font-bold text-gray-900">
                                    {formatRupiah(summary.totalCredit)}
                                </h2>

                            </div>

                            <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center">
                                <TrendingDown
                                    size={22}
                                    className="text-red-600"
                                />
                            </div>

                        </div>

                    </div>

                    {/* BALANCE */}
                    <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-2xl shadow-sm p-5 text-white">

                        <div className="flex items-start justify-between">

                            <div>

                                <p className="text-sm text-indigo-100">
                                    Balance
                                </p>

                                <h2 className="mt-2 text-2xl font-bold">
                                    {formatRupiah(summary.balance)}
                                </h2>

                            </div>

                            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                                <Wallet
                                    size={22}
                                    className="text-white"
                                />
                            </div>

                        </div>

                    </div>

                </div>

                {/* ========================================== */}
                {/* FILTER */}
                {/* ========================================== */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">

                    <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">

                        {/* SEARCH */}
                        <div className="xl:col-span-2">

                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Search Account
                            </label>

                            <div className="relative">

                                <Search
                                    size={18}
                                    className="absolute left-3 top-3 text-gray-400"
                                />

                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Cari kode account / nama account..."
                                    className="w-full h-11 rounded-xl border border-gray-300 pl-10 pr-4 text-sm outline-none focus:border-indigo-500"
                                />

                            </div>

                        </div>

                        {/* PERIOD */}
                        <div>

                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Periode
                            </label>

                            <div className="relative">

                                <Calendar
                                    size={18}
                                    className="absolute left-3 top-3 text-gray-400"
                                />

                                <input
                                    type="month"
                                    className="w-full h-11 rounded-xl border border-gray-300 pl-10 pr-4 text-sm outline-none focus:border-indigo-500"
                                />

                            </div>

                        </div>

                        {/* PROJECT */}
                        <div>

                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Project / Site
                            </label>

                            <div className="relative">

                                <Building2
                                    size={18}
                                    className="absolute left-3 top-3 text-gray-400"
                                />

                                <select className="w-full h-11 rounded-xl border border-gray-300 pl-10 pr-4 text-sm outline-none focus:border-indigo-500">

                                    <option>
                                        Semua Project
                                    </option>

                                    <option>
                                        Project Tol MBZ
                                    </option>

                                    <option>
                                        Project Gedung DPR
                                    </option>

                                    <option>
                                        Project Tol Cisumdawu
                                    </option>

                                </select>

                            </div>

                        </div>

                    </div>

                </div>

                {/* ========================================== */}
                {/* GENERAL LEDGER TABLE */}
                {/* ========================================== */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

                    {/* HEADER */}
                    <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">

                        <div className="flex items-center gap-2">

                            <FileSpreadsheet
                                size={20}
                                className="text-indigo-600"
                            />

                            <div>

                                <h2 className="text-lg font-semibold text-gray-900">
                                    General Ledger Account
                                </h2>

                                <p className="text-sm text-gray-500">
                                    Monitoring transaksi per account ledger
                                </p>

                            </div>

                        </div>

                        <button
                            type="button"
                            onClick={() =>
                                navigate('/portal/finance/journal-entry/create')
                            }
                            className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition"
                        >
                            <Plus size={16} />
                            Buat Journal
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

                                    <th className="px-4 py-4 text-center">
                                        Total Transaksi
                                    </th>

                                    <th className="px-4 py-4 text-right">
                                        Total Debit
                                    </th>

                                    <th className="px-4 py-4 text-right">
                                        Total Credit
                                    </th>

                                    <th className="px-4 py-4 text-center">
                                        Action
                                    </th>

                                </tr>

                            </thead>

                            <tbody className="divide-y divide-gray-200">

                                {filteredData.map((ledger) => {

                                    const totalDebit = ledger.transactions.reduce(
                                        (sum, trx) => sum + trx.debit,
                                        0
                                    );

                                    const totalCredit = ledger.transactions.reduce(
                                        (sum, trx) => sum + trx.credit,
                                        0
                                    );

                                    const expanded = expandedRows.includes(ledger.id);

                                    return (
                                        <React.Fragment key={ledger.id}>

                                            {/* MAIN ROW */}
                                            <tr className="hover:bg-gray-50 transition">

                                                <td className="px-4 py-4 min-w-[280px]">

                                                    <div className="flex items-start gap-3">

                                                        <button
                                                            onClick={() => toggleExpand(ledger.id)}
                                                            className="mt-1 text-gray-500"
                                                        >
                                                            {expanded ? (
                                                                <ChevronDown size={16} />
                                                            ) : (
                                                                <ChevronRight size={16} />
                                                            )}
                                                        </button>

                                                        <div>

                                                            <div className="font-semibold text-gray-900">
                                                                {ledger.coaName}
                                                            </div>

                                                            <div className="text-xs text-gray-500 mt-1">
                                                                {ledger.coaCode}
                                                            </div>

                                                        </div>

                                                    </div>

                                                </td>

                                                <td className="px-4 py-4 text-center">
                                                    {renderCategoryBadge(ledger.category)}
                                                </td>

                                                <td className="px-4 py-4 text-center font-semibold text-gray-900">
                                                    {ledger.transactions.length}
                                                </td>

                                                <td className="px-4 py-4 text-right font-bold text-green-600">
                                                    {formatRupiah(totalDebit)}
                                                </td>

                                                <td className="px-4 py-4 text-right font-bold text-red-600">
                                                    {formatRupiah(totalCredit)}
                                                </td>

                                                <td className="px-4 py-4 text-center">

                                                    <button
                                                        className="inline-flex items-center justify-center w-9 h-9 rounded-lg hover:bg-indigo-50 text-indigo-600 transition"
                                                    >
                                                        <Eye size={17} />
                                                    </button>

                                                </td>

                                            </tr>

                                            {/* DETAIL ROW */}
                                            {expanded && (

                                                <tr>

                                                    <td
                                                        colSpan={6}
                                                        className="bg-gray-50 px-6 py-5"
                                                    >

                                                        <div className="overflow-x-auto border border-gray-200 rounded-2xl bg-white">

                                                            <table className="min-w-full text-sm">

                                                                <thead className="bg-gray-100 border-b border-gray-200 text-gray-600 uppercase text-xs">

                                                                    <tr>

                                                                        <th className="px-4 py-3 text-left">
                                                                            Date
                                                                        </th>

                                                                        <th className="px-4 py-3 text-left">
                                                                            Journal No
                                                                        </th>

                                                                        <th className="px-4 py-3 text-left">
                                                                            Description
                                                                        </th>

                                                                        <th className="px-4 py-3 text-right">
                                                                            Debit
                                                                        </th>

                                                                        <th className="px-4 py-3 text-right">
                                                                            Credit
                                                                        </th>

                                                                    </tr>

                                                                </thead>

                                                                <tbody className="divide-y divide-gray-200">

                                                                    {ledger.transactions.map((trx) => (

                                                                        <tr
                                                                            key={trx.id}
                                                                            className="hover:bg-gray-50"
                                                                        >

                                                                            <td className="px-4 py-3 text-gray-700">
                                                                                {trx.date}
                                                                            </td>

                                                                            <td className="px-4 py-3">

                                                                                <span className="font-mono text-indigo-600 font-semibold">
                                                                                    {trx.journalNo}
                                                                                </span>

                                                                            </td>

                                                                            <td className="px-4 py-3 text-gray-700">
                                                                                {trx.description}
                                                                            </td>

                                                                            <td className="px-4 py-3 text-right font-semibold text-green-600">
                                                                                {trx.debit > 0
                                                                                    ? formatRupiah(trx.debit)
                                                                                    : '-'}
                                                                            </td>

                                                                            <td className="px-4 py-3 text-right font-semibold text-red-600">
                                                                                {trx.credit > 0
                                                                                    ? formatRupiah(trx.credit)
                                                                                    : '-'}
                                                                            </td>

                                                                        </tr>

                                                                    ))}

                                                                </tbody>

                                                            </table>

                                                        </div>

                                                    </td>

                                                </tr>

                                            )}

                                        </React.Fragment>
                                    );

                                })}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </PortalLayout>
    );
}