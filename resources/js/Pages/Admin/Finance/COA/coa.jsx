import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';

import {
    ArrowLeft,
    Plus,
    Search,
    Download,
    FolderTree,
    Landmark,
    Wallet,
    CreditCard,
    Building2,
    ChevronRight,
    Pencil,
    Eye,
    ShieldCheck,
    CircleDollarSign,
    FileSpreadsheet,
    Layers3,
    ReceiptText,
} from 'lucide-react';

// ==========================================
// MOCK DATA COA
// ==========================================
const COA_DATA = [
    {
        id: 1,
        kode: '1000',
        nama: 'ASET',
        tipe: 'Header',
        kategori: 'Asset',
        level: 1,
        saldo: 0,
        status: 'Active',
    },
    {
        id: 2,
        kode: '1100',
        nama: 'Kas & Bank',
        tipe: 'Header',
        kategori: 'Asset',
        level: 2,
        saldo: 0,
        status: 'Active',
    },
    {
        id: 3,
        kode: '1110',
        nama: 'Kas Kecil',
        tipe: 'Detail',
        kategori: 'Asset',
        level: 3,
        saldo: 15000000,
        status: 'Active',
    },
    {
        id: 4,
        kode: '1120',
        nama: 'Bank BCA Operasional',
        tipe: 'Detail',
        kategori: 'Asset',
        level: 3,
        saldo: 275000000,
        status: 'Active',
    },
    {
        id: 5,
        kode: '1200',
        nama: 'Piutang Project',
        tipe: 'Detail',
        kategori: 'Asset',
        level: 2,
        saldo: 890000000,
        status: 'Active',
    },
    {
        id: 6,
        kode: '2000',
        nama: 'LIABILITAS',
        tipe: 'Header',
        kategori: 'Liability',
        level: 1,
        saldo: 0,
        status: 'Active',
    },
    {
        id: 7,
        kode: '2100',
        nama: 'Hutang Vendor',
        tipe: 'Detail',
        kategori: 'Liability',
        level: 2,
        saldo: 420000000,
        status: 'Active',
    },
    {
        id: 8,
        kode: '3000',
        nama: 'EKUITAS',
        tipe: 'Header',
        kategori: 'Equity',
        level: 1,
        saldo: 0,
        status: 'Active',
    },
    {
        id: 9,
        kode: '4000',
        nama: 'PENDAPATAN',
        tipe: 'Header',
        kategori: 'Revenue',
        level: 1,
        saldo: 0,
        status: 'Active',
    },
    {
        id: 10,
        kode: '4100',
        nama: 'Pendapatan Project Konstruksi',
        tipe: 'Detail',
        kategori: 'Revenue',
        level: 2,
        saldo: 5600000000,
        status: 'Active',
    },
    {
        id: 11,
        kode: '5000',
        nama: 'BEBAN OPERASIONAL',
        tipe: 'Header',
        kategori: 'Expense',
        level: 1,
        saldo: 0,
        status: 'Active',
    },
    {
        id: 12,
        kode: '5100',
        nama: 'Biaya Operasional Site',
        tipe: 'Detail',
        kategori: 'Expense',
        level: 2,
        saldo: 1280000000,
        status: 'Active',
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
    }).format(value || 0);
};

// ==========================================
// PAGE
// ==========================================
export default function ChartOfAccountPage() {

    const navigate = useNavigate();

    // ==========================================
    // SUMMARY
    // ==========================================
    const summary = useMemo(() => {

        return {
            totalAkun: COA_DATA.length,
            totalHeader: COA_DATA.filter(x => x.tipe === 'Header').length,
            totalDetail: COA_DATA.filter(x => x.tipe === 'Detail').length,
            totalActive: COA_DATA.filter(x => x.status === 'Active').length,
        };

    }, []);

    // ==========================================
    // CATEGORY BADGE
    // ==========================================
    const renderCategory = (category) => {

        switch (category) {

            case 'Asset':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
                        <Wallet size={12} />
                        Asset
                    </span>
                );

            case 'Liability':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                        <CreditCard size={12} />
                        Liability
                    </span>
                );

            case 'Equity':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-semibold">
                        <Building2 size={12} />
                        Equity
                    </span>
                );

            case 'Revenue':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 border border-green-200 text-green-700 text-xs font-semibold">
                        <CircleDollarSign size={12} />
                        Revenue
                    </span>
                );

            default:
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold">
                        <ReceiptText size={12} />
                        Expense
                    </span>
                );

        }

    };

    // ==========================================
    // TYPE BADGE
    // ==========================================
    const renderType = (type) => {

        if (type === 'Header') {

            return (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold">
                    <Layers3 size={11} />
                    Header
                </span>
            );

        }

        return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-semibold">
                <FileSpreadsheet size={11} />
                Detail
            </span>
        );

    };

    return (
        <PortalLayout>

            <div className="space-y-6">

                {/* ========================================== */}
                {/* HEADER */}
                {/* ========================================== */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                    <div>

                        <div className="flex items-center gap-3">

                            <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center">
                                <FolderTree
                                    size={26}
                                    className="text-indigo-600"
                                />
                            </div>

                            <div>

                                <h1 className="text-2xl font-semibold text-gray-900">
                                    Chart Of Account (COA)
                                </h1>

                                <div className="flex items-center gap-2 mt-1 text-sm">

                                    <span className="text-gray-400">
                                        Accounting & Finance
                                    </span>

                                    <ChevronRight
                                        size={14}
                                        className="text-gray-300"
                                    />

                                    <span className="text-indigo-600 font-medium">
                                        Chart Of Account
                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="flex items-center gap-3 flex-wrap">

                        <button
                            type="button"
                            className="inline-flex items-center gap-2 h-11 px-4 rounded-xl border border-gray-300 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 transition"
                        >
                            <Download size={17} />
                            Export Excel
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate('/portal/finance/coa/create')}
                            className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-sm transition"
                        >
                            <Plus size={18} />
                            Tambah Account
                        </button>

                    </div>

                </div>

                {/* ========================================== */}
                {/* SUMMARY */}
                {/* ========================================== */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

                    {/* TOTAL ACCOUNT */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">

                        <div className="flex items-start justify-between">

                            <div>

                                <p className="text-sm text-gray-500">
                                    Total Account
                                </p>

                                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                                    {summary.totalAkun}
                                </h2>

                            </div>

                            <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center">
                                <FolderTree
                                    size={22}
                                    className="text-indigo-600"
                                />
                            </div>

                        </div>

                    </div>

                    {/* HEADER */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">

                        <div className="flex items-start justify-between">

                            <div>

                                <p className="text-sm text-gray-500">
                                    Account Header
                                </p>

                                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                                    {summary.totalHeader}
                                </h2>

                            </div>

                            <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center">
                                <Layers3
                                    size={22}
                                    className="text-slate-700"
                                />
                            </div>

                        </div>

                    </div>

                    {/* DETAIL */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">

                        <div className="flex items-start justify-between">

                            <div>

                                <p className="text-sm text-gray-500">
                                    Account Detail
                                </p>

                                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                                    {summary.totalDetail}
                                </h2>

                            </div>

                            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center">
                                <FileSpreadsheet
                                    size={22}
                                    className="text-blue-600"
                                />
                            </div>

                        </div>

                    </div>

                    {/* ACTIVE */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">

                        <div className="flex items-start justify-between">

                            <div>

                                <p className="text-sm text-gray-500">
                                    Active Account
                                </p>

                                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                                    {summary.totalActive}
                                </h2>

                            </div>

                            <div className="w-12 h-12 rounded-xl bg-green-50 border border-green-200 flex items-center justify-center">
                                <ShieldCheck
                                    size={22}
                                    className="text-green-600"
                                />
                            </div>

                        </div>

                    </div>

                </div>

                {/* ========================================== */}
                {/* DISTRIBUSI ACCOUNT (DUMMY UI) */}
                {/* ========================================== */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">

                    <div className="flex items-center justify-between mb-6">

                        <div>

                            <h2 className="text-lg font-semibold text-gray-900">
                                Distribusi Account
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Persentase struktur kategori akun keuangan perusahaan
                            </p>

                        </div>

                        <div className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-lg">
                            Dummy Analytics
                        </div>

                    </div>

                    {/* LIST DISTRIBUTION */}
                    <div className="space-y-5">

                        {/* ASSET */}
                        <div>

                            <div className="flex items-center justify-between mb-2">

                                <div className="flex items-center gap-2">

                                    <div className="w-3 h-3 rounded-full bg-indigo-500"></div>

                                    <span className="text-sm font-semibold text-gray-800">
                                        Asset
                                    </span>

                                </div>

                                <span className="text-sm font-bold text-indigo-600">
                                    42%
                                </span>

                            </div>

                            <div className="w-full h-3 rounded-full bg-gray-100 overflow-hidden">

                                <div className="h-full w-[42%] bg-indigo-500 rounded-full"></div>

                            </div>

                        </div>

                        {/* LIABILITY */}
                        <div>

                            <div className="flex items-center justify-between mb-2">

                                <div className="flex items-center gap-2">

                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>

                                    <span className="text-sm font-semibold text-gray-800">
                                        Liability
                                    </span>

                                </div>

                                <span className="text-sm font-bold text-red-600">
                                    23%
                                </span>

                            </div>

                            <div className="w-full h-3 rounded-full bg-gray-100 overflow-hidden">

                                <div className="h-full w-[23%] bg-red-500 rounded-full"></div>

                            </div>

                        </div>

                        {/* EQUITY */}
                        <div>

                            <div className="flex items-center justify-between mb-2">

                                <div className="flex items-center gap-2">

                                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>

                                    <span className="text-sm font-semibold text-gray-800">
                                        Equity
                                    </span>

                                </div>

                                <span className="text-sm font-bold text-emerald-600">
                                    18%
                                </span>

                            </div>

                            <div className="w-full h-3 rounded-full bg-gray-100 overflow-hidden">

                                <div className="h-full w-[18%] bg-emerald-500 rounded-full"></div>

                            </div>

                        </div>

                        {/* REVENUE */}
                        <div>

                            <div className="flex items-center justify-between mb-2">

                                <div className="flex items-center gap-2">

                                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>

                                    <span className="text-sm font-semibold text-gray-800">
                                        Revenue
                                    </span>

                                </div>

                                <span className="text-sm font-bold text-amber-600">
                                    12%
                                </span>

                            </div>

                            <div className="w-full h-3 rounded-full bg-gray-100 overflow-hidden">

                                <div className="h-full w-[12%] bg-amber-500 rounded-full"></div>

                            </div>

                        </div>

                        {/* EXPENSE */}
                        <div>

                            <div className="flex items-center justify-between mb-2">

                                <div className="flex items-center gap-2">

                                    <div className="w-3 h-3 rounded-full bg-slate-500"></div>

                                    <span className="text-sm font-semibold text-gray-800">
                                        Expense
                                    </span>

                                </div>

                                <span className="text-sm font-bold text-slate-600">
                                    5%
                                </span>

                            </div>

                            <div className="w-full h-3 rounded-full bg-gray-100 overflow-hidden">

                                <div className="h-full w-[5%] bg-slate-500 rounded-full"></div>

                            </div>

                        </div>

                    </div>

                    {/* FOOTER SUMMARY */}
                    <div className="mt-6 pt-5 border-t border-gray-100 grid grid-cols-2 md:grid-cols-5 gap-4">

                        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3">

                            <div className="text-xs text-indigo-500 font-medium">
                                Asset
                            </div>

                            <div className="text-lg font-bold text-indigo-700 mt-1">
                                245
                            </div>

                        </div>

                        <div className="bg-red-50 border border-red-100 rounded-xl p-3">

                            <div className="text-xs text-red-500 font-medium">
                                Liability
                            </div>

                            <div className="text-lg font-bold text-red-700 mt-1">
                                89
                            </div>

                        </div>

                        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3">

                            <div className="text-xs text-emerald-500 font-medium">
                                Equity
                            </div>

                            <div className="text-lg font-bold text-emerald-700 mt-1">
                                54
                            </div>

                        </div>

                        <div className="bg-amber-50 border border-amber-100 rounded-xl p-3">

                            <div className="text-xs text-amber-500 font-medium">
                                Revenue
                            </div>

                            <div className="text-lg font-bold text-amber-700 mt-1">
                                120
                            </div>

                        </div>

                        <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">

                            <div className="text-xs text-slate-500 font-medium">
                                Expense
                            </div>

                            <div className="text-lg font-bold text-slate-700 mt-1">
                                38
                            </div>

                        </div>

                    </div>

                </div>

                {/* ========================================== */}
                {/* TABLE */}
                {/* ========================================== */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

                    {/* HEADER */}
                    <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 px-6 py-5 border-b border-gray-200">

                        <div className="flex items-center gap-3">

                            <div className="w-11 h-11 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center">
                                <Landmark
                                    size={20}
                                    className="text-indigo-600"
                                />
                            </div>

                            <div>

                                <h2 className="text-lg font-semibold text-gray-900">
                                    Data Chart Of Account
                                </h2>

                                <p className="text-sm text-gray-500">
                                    Struktur master account accounting perusahaan
                                </p>

                            </div>

                        </div>

                        {/* FILTER */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">

                            <div className="relative">

                                <Search
                                    size={18}
                                    className="absolute left-3 top-3 text-gray-400"
                                />

                                <input
                                    type="text"
                                    placeholder="Cari kode / nama account..."
                                    className="w-full sm:w-[300px] h-11 pl-10 pr-4 rounded-xl border border-gray-300 text-sm outline-none focus:border-indigo-500"
                                />

                            </div>

                            <select className="h-11 px-4 rounded-xl border border-gray-300 text-sm outline-none focus:border-indigo-500 bg-white">
                                <option>Semua Kategori</option>
                                <option>Asset</option>
                                <option>Liability</option>
                                <option>Equity</option>
                                <option>Revenue</option>
                                <option>Expense</option>
                            </select>

                        </div>

                    </div>

                    {/* TABLE */}
                    <div className="overflow-x-auto">

                        <table className="min-w-full text-sm">

                            <thead className="bg-gray-50 border-b border-gray-200 uppercase text-xs tracking-wider text-gray-600">

                                <tr>

                                    <th className="px-4 py-4 text-left">
                                        Kode Account
                                    </th>

                                    <th className="px-4 py-4 text-left">
                                        Nama Account
                                    </th>

                                    <th className="px-4 py-4 text-center">
                                        Tipe
                                    </th>

                                    <th className="px-4 py-4 text-center">
                                        Kategori
                                    </th>

                                    <th className="px-4 py-4 text-center">
                                        Level
                                    </th>

                                    <th className="px-4 py-4 text-right">
                                        Saldo
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

                                {COA_DATA.map((item) => (

                                    <tr
                                        key={item.id}
                                        className="hover:bg-gray-50/60 transition"
                                    >

                                        {/* CODE */}
                                        <td className="px-4 py-4">

                                            <div className="font-mono font-bold text-indigo-600">
                                                {item.kode}
                                            </div>

                                        </td>

                                        {/* NAME */}
                                        <td className="px-4 py-4 min-w-[320px]">

                                            <div
                                                className={`font-semibold ${item.level === 1
                                                    ? 'text-gray-900 text-base'
                                                    : 'text-gray-800'
                                                    }`}
                                                style={{
                                                    paddingLeft: `${(item.level - 1) * 20}px`,
                                                }}
                                            >
                                                {item.level > 1 && (
                                                    <span className="text-gray-300 mr-2">
                                                        └
                                                    </span>
                                                )}

                                                {item.nama}
                                            </div>

                                        </td>

                                        {/* TYPE */}
                                        <td className="px-4 py-4 text-center">
                                            {renderType(item.tipe)}
                                        </td>

                                        {/* CATEGORY */}
                                        <td className="px-4 py-4 text-center">
                                            {renderCategory(item.kategori)}
                                        </td>

                                        {/* LEVEL */}
                                        <td className="px-4 py-4 text-center">

                                            <span className="inline-flex items-center justify-center min-w-[34px] h-8 px-2 rounded-lg bg-gray-100 text-gray-700 font-bold text-xs">
                                                L{item.level}
                                            </span>

                                        </td>

                                        {/* SALDO */}
                                        <td className="px-4 py-4 text-right">

                                            <div className="font-bold text-gray-900">
                                                {formatRupiah(item.saldo)}
                                            </div>

                                        </td>

                                        {/* STATUS */}
                                        <td className="px-4 py-4 text-center">

                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 border border-green-200 text-green-700 text-xs font-semibold">
                                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                                {item.status}
                                            </span>

                                        </td>

                                        {/* ACTION */}
                                        <td className="px-4 py-4">

                                            <div className="flex items-center justify-center gap-1">

                                                <button
                                                    type="button"
                                                    onClick={() => navigate(`/portal/finance/coa/detail`)}
                                                    className="w-9 h-9 rounded-lg border border-gray-200 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 flex items-center justify-center text-gray-600 transition"
                                                    title="Edit Parameter Data Item"
                                                >
                                                    <Eye size={16} />
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => navigate(`/portal/finance/coa/edit`)}
                                                    className="w-9 h-9 rounded-lg border border-gray-200 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 flex items-center justify-center text-gray-600 transition"
                                                    title="Edit Parameter Data Item"
                                                >
                                                    <Pencil size={13} />
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