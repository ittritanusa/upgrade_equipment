import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';

import {
    ArrowLeft,
    Pencil,
    Landmark,
    Wallet,
    Building2,
    Layers3,
    CalendarDays,
    ShieldCheck,
    FileText,
    BadgeCheck,
    CircleDollarSign,
    BriefcaseBusiness,
    CheckCircle2,
    XCircle,
    Hash,
    ChevronRight,
    ClipboardCheck
} from 'lucide-react';

// ======================================================
// MOCK DETAIL ACCOUNT
// ======================================================
const ACCOUNT_DETAIL = {
    id: 1,
    kode: '1101.001',
    nama: 'Kas Operasional Pusat',
    kategori: 'Asset',
    subKategori: 'Current Asset',
    tipeNormal: 'Debit',
    parent: 'Kas & Bank',
    level: 2,

    currency: 'IDR',
    status: 'Active',

    description:
        'Digunakan untuk mencatat seluruh transaksi kas operasional perusahaan pada kantor pusat.',

    createdBy: 'Ekki Maulana',
    createdAt: '28 Mei 2026 10:15',
    updatedAt: '29 Mei 2026 09:42',

    saldoAwal: 150000000,
    saldoBerjalan: 248750000,

    allowJournal: true,
    isHeader: false,
};

// ======================================================
// PAGE
// ======================================================
export default function DetailChartOfAccount() {

    const navigate = useNavigate();
    const { id } = useParams();

    const detail = ACCOUNT_DETAIL;

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
    // CATEGORY BADGE
    // ======================================================
    const renderCategoryBadge = (category) => {

        switch (category) {

            case 'Asset':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
                        <Landmark size={12} />
                        Asset
                    </span>
                );

            case 'Liability':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                        <ShieldCheck size={12} />
                        Liability
                    </span>
                );

            case 'Equity':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-semibold">
                        <BriefcaseBusiness size={12} />
                        Equity
                    </span>
                );

            case 'Revenue':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                        <CircleDollarSign size={12} />
                        Revenue
                    </span>
                );

            case 'Expense':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-semibold">
                        <Wallet size={12} />
                        Expense
                    </span>
                );

            default:
                return null;
        }
    };

    // ======================================================
    // STATUS BADGE
    // ======================================================
    const renderStatusBadge = (status) => {

        if (status === 'Active') {

            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 border border-green-200 text-green-700 text-xs font-semibold">
                    <CheckCircle2 size={12} />
                    Active
                </span>
            );
        }

        return (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                <XCircle size={12} />
                Inactive
            </span>
        );
    };

    return (
        <PortalLayout>

            <div className="space-y-6">

                {/* ====================================================== */}
                {/* PAGE HEADER */}
                {/* ====================================================== */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                    <div>

                        <div className="flex items-center gap-3 flex-wrap">

                            <h1 className="text-2xl font-semibold text-gray-900">
                                Detail Chart Of Account
                            </h1>

                            {renderCategoryBadge(detail.kategori)}

                            {renderStatusBadge(detail.status)}

                        </div>

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

                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="inline-flex items-center gap-2 h-11 px-5 rounded-xl border border-gray-300 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 transition"
                        >
                            <ArrowLeft size={17} />
                            Kembali
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                navigate(`/portal/finance/coa/edit`)
                            }
                            className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-sm transition"
                        >
                            <Pencil size={17} />
                            Edit Account
                        </button>

                    </div>

                </div>

                {/* ====================================================== */}
                {/* ACCOUNT SUMMARY */}
                {/* ====================================================== */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                    {/* ACCOUNT INFO */}
                    <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl shadow-sm p-6">

                        <div className="flex items-center gap-2 mb-6">

                            <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center">
                                <Landmark
                                    size={20}
                                    className="text-indigo-600"
                                />
                            </div>

                            <div>

                                <h2 className="text-lg font-semibold text-gray-900">
                                    Informasi Account
                                </h2>

                                <p className="text-sm text-gray-500">
                                    Detail struktur dan konfigurasi account
                                </p>

                            </div>

                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            <div>
                                <div className="text-xs font-medium text-gray-500 uppercase mb-1">
                                    Kode Account
                                </div>

                                <div className="flex items-center gap-2 text-sm font-bold text-indigo-700">
                                    <Hash size={14} />
                                    {detail.kode}
                                </div>
                            </div>

                            <div>
                                <div className="text-xs font-medium text-gray-500 uppercase mb-1">
                                    Nama Account
                                </div>

                                <div className="text-sm font-semibold text-gray-900">
                                    {detail.nama}
                                </div>
                            </div>

                            <div>
                                <div className="text-xs font-medium text-gray-500 uppercase mb-1">
                                    Kategori
                                </div>

                                <div>
                                    {renderCategoryBadge(detail.kategori)}
                                </div>
                            </div>

                            <div>
                                <div className="text-xs font-medium text-gray-500 uppercase mb-1">
                                    Sub Kategori
                                </div>

                                <div className="text-sm font-semibold text-gray-900">
                                    {detail.subKategori}
                                </div>
                            </div>

                            <div>
                                <div className="text-xs font-medium text-gray-500 uppercase mb-1">
                                    Parent Account
                                </div>

                                <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                                    <Layers3 size={15} className="text-gray-400" />
                                    {detail.parent}
                                </div>
                            </div>

                            <div>
                                <div className="text-xs font-medium text-gray-500 uppercase mb-1">
                                    Level Account
                                </div>

                                <div className="text-sm font-semibold text-gray-900">
                                    Level {detail.level}
                                </div>
                            </div>

                            <div>
                                <div className="text-xs font-medium text-gray-500 uppercase mb-1">
                                    Tipe Normal
                                </div>

                                <div className="text-sm font-semibold text-gray-900">
                                    {detail.tipeNormal}
                                </div>
                            </div>

                            <div>
                                <div className="text-xs font-medium text-gray-500 uppercase mb-1">
                                    Currency
                                </div>

                                <div className="text-sm font-semibold text-gray-900">
                                    {detail.currency}
                                </div>
                            </div>

                        </div>

                        {/* DESCRIPTION */}
                        <div className="mt-6 pt-6 border-t border-gray-100">

                            <div className="flex items-center gap-2 mb-3">

                                <FileText
                                    size={16}
                                    className="text-gray-500"
                                />

                                <h3 className="text-sm font-semibold text-gray-900">
                                    Deskripsi Account
                                </h3>

                            </div>

                            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 text-sm text-gray-700 leading-relaxed">
                                {detail.description}
                            </div>

                        </div>

                    </div>

                    {/* BALANCE CARD */}
                    <div className="space-y-5">

                        {/* CURRENT BALANCE */}
                        <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl shadow-sm p-6 text-white">

                            <div className="flex items-center justify-between mb-5">

                                <div>

                                    <p className="text-indigo-100 text-sm">
                                        Saldo Berjalan
                                    </p>

                                    <h2 className="text-3xl font-bold mt-2">
                                        {formatRupiah(detail.saldoBerjalan)}
                                    </h2>

                                </div>

                                <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center">

                                    <Wallet size={26} />

                                </div>

                            </div>

                            <div className="border-t border-white/20 pt-4 text-sm text-indigo-100">
                                Total saldo account saat ini
                            </div>

                        </div>

                        {/* OPENING BALANCE */}
                        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">

                            <div className="flex items-center gap-2 mb-4">

                                <CircleDollarSign
                                    size={18}
                                    className="text-emerald-600"
                                />

                                <h3 className="text-sm font-semibold text-gray-900">
                                    Saldo Awal
                                </h3>

                            </div>

                            <div className="text-2xl font-bold text-gray-900">
                                {formatRupiah(detail.saldoAwal)}
                            </div>

                            <p className="text-xs text-gray-500 mt-2">
                                Opening balance account
                            </p>

                        </div>

                    </div>

                </div>

                {/* ====================================================== */}
                {/* SYSTEM INFORMATION */}
                {/* ====================================================== */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">

                    <div className="flex items-center gap-2 mb-6">

                        <Building2
                            size={20}
                            className="text-indigo-600"
                        />

                        <div>

                            <h2 className="text-lg font-semibold text-gray-900">
                                Informasi Sistem
                            </h2>

                            <p className="text-sm text-gray-500">
                                Metadata dan konfigurasi account
                            </p>

                        </div>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

                        <div className="border border-gray-200 rounded-2xl p-5">

                            <div className="flex items-center gap-2 mb-3">

                                <BadgeCheck
                                    size={16}
                                    className="text-indigo-600"
                                />

                                <span className="text-xs font-semibold text-gray-500 uppercase">
                                    Status Account
                                </span>

                            </div>

                            {renderStatusBadge(detail.status)}

                        </div>

                        <div className="border border-gray-200 rounded-2xl p-5">

                            <div className="flex items-center gap-2 mb-3">

                                <ClipboardCheck
                                    size={16}
                                    className="text-emerald-600"
                                />

                                <span className="text-xs font-semibold text-gray-500 uppercase">
                                    Allow Journal
                                </span>

                            </div>

                            <div className="text-sm font-semibold text-gray-900">
                                {detail.allowJournal ? 'Yes' : 'No'}
                            </div>

                        </div>

                        <div className="border border-gray-200 rounded-2xl p-5">

                            <div className="flex items-center gap-2 mb-3">

                                <Layers3
                                    size={16}
                                    className="text-orange-600"
                                />

                                <span className="text-xs font-semibold text-gray-500 uppercase">
                                    Header Account
                                </span>

                            </div>

                            <div className="text-sm font-semibold text-gray-900">
                                {detail.isHeader ? 'Yes' : 'No'}
                            </div>

                        </div>

                        <div className="border border-gray-200 rounded-2xl p-5">

                            <div className="flex items-center gap-2 mb-3">

                                <CalendarDays
                                    size={16}
                                    className="text-sky-600"
                                />

                                <span className="text-xs font-semibold text-gray-500 uppercase">
                                    Last Updated
                                </span>

                            </div>

                            <div className="text-sm font-semibold text-gray-900">
                                {detail.updatedAt}
                            </div>

                        </div>

                    </div>

                    {/* FOOTER INFO */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6 pt-6 border-t border-gray-100">

                        <div>

                            <div className="text-xs font-medium text-gray-500 uppercase mb-1">
                                Dibuat Oleh
                            </div>

                            <div className="text-sm font-semibold text-gray-900">
                                {detail.createdBy}
                            </div>

                            <div className="text-xs text-gray-500 mt-1">
                                {detail.createdAt}
                            </div>

                        </div>

                        <div>

                            <div className="text-xs font-medium text-gray-500 uppercase mb-1">
                                Terakhir Diupdate
                            </div>

                            <div className="text-sm font-semibold text-gray-900">
                                {detail.updatedAt}
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </PortalLayout>
    );
}