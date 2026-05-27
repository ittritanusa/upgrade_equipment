import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';

import {
    ArrowLeft,
    Save,
    Landmark,
    Layers3,
    Hash,
    FileText,
    BadgeDollarSign,
    Building2,
    CircleDollarSign,
    AlertTriangle,
    CheckCircle2,
    PencilLine,
    ShieldCheck,
} from 'lucide-react';

export default function EditChartOfAccount() {

    const navigate = useNavigate();
    const { id } = useParams();

    // ==========================================
    // MOCK DATA DETAIL ACCOUNT
    // ==========================================
    const [form, setForm] = useState({
        kodeAccount: '1101',
        namaAccount: 'Kas Besar',
        kategori: 'Asset',
        subKategori: 'Current Asset',
        parentAccount: '1100 - Cash & Bank',
        tipeNormalBalance: 'Debit',
        cashFlowCategory: 'Operating',
        description:
            'Digunakan untuk pencatatan kas operasional perusahaan.',
        isActive: true,
    });

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
    // HANDLE SUBMIT
    // ==========================================
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(form);

        alert('Perubahan data account berhasil disimpan.');
    };

    return (
        <PortalLayout>

            <form
                onSubmit={handleSubmit}
                className="space-y-6"
            >

                {/* ========================================== */}
                {/* HEADER */}
                {/* ========================================== */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                    <div>

                        <div className="flex items-center gap-3">

                            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center">
                                <PencilLine
                                    size={22}
                                    className="text-indigo-600"
                                />
                            </div>

                            <div>

                                <h1 className="text-2xl font-semibold text-gray-900">
                                    Edit Account COA
                                </h1>

                                <div className="flex items-center gap-2 mt-1 text-sm">

                                    <span className="text-gray-400">
                                        Accounting & Finance
                                    </span>

                                    <span className="text-gray-300">/</span>

                                    <span className="text-gray-400">
                                        Chart Of Account
                                    </span>

                                    <span className="text-gray-300">/</span>

                                    <span className="text-indigo-600 font-medium">
                                        Edit Account
                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>

                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 h-11 px-5 rounded-xl border border-gray-300 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 transition"
                    >
                        <ArrowLeft size={18} />
                        Kembali
                    </button>

                </div>

                {/* ========================================== */}
                {/* ACCOUNT INFO */}
                {/* ========================================== */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

                    {/* HEADER */}
                    <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">

                        <div className="flex items-center gap-3">

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

                                <p className="text-sm text-gray-500 mt-1">
                                    Perbarui informasi master account perusahaan
                                </p>

                            </div>

                        </div>

                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold">

                            <ShieldCheck size={16} />

                            Active Account

                        </div>

                    </div>

                    {/* BODY */}
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">

                        {/* ACCOUNT CODE */}
                        <div>

                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Kode Account
                            </label>

                            <div className="relative">

                                <Hash
                                    size={18}
                                    className="absolute left-3 top-3 text-gray-400"
                                />

                                <input
                                    type="text"
                                    value={form.kodeAccount}
                                    onChange={(e) =>
                                        handleChange('kodeAccount', e.target.value)
                                    }
                                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-300 text-sm outline-none focus:border-indigo-500"
                                />

                            </div>

                        </div>

                        {/* ACCOUNT NAME */}
                        <div>

                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Nama Account
                            </label>

                            <div className="relative">

                                <FileText
                                    size={18}
                                    className="absolute left-3 top-3 text-gray-400"
                                />

                                <input
                                    type="text"
                                    value={form.namaAccount}
                                    onChange={(e) =>
                                        handleChange('namaAccount', e.target.value)
                                    }
                                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-300 text-sm outline-none focus:border-indigo-500"
                                />

                            </div>

                        </div>

                        {/* CATEGORY */}
                        <div>

                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Kategori Account
                            </label>

                            <div className="relative">

                                <Layers3
                                    size={18}
                                    className="absolute left-3 top-3 text-gray-400"
                                />

                                <select
                                    value={form.kategori}
                                    onChange={(e) =>
                                        handleChange('kategori', e.target.value)
                                    }
                                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-300 text-sm outline-none focus:border-indigo-500"
                                >
                                    <option value="Asset">
                                        Asset
                                    </option>

                                    <option value="Liability">
                                        Liability
                                    </option>

                                    <option value="Equity">
                                        Equity
                                    </option>

                                    <option value="Revenue">
                                        Revenue
                                    </option>

                                    <option value="Expense">
                                        Expense
                                    </option>

                                </select>

                            </div>

                        </div>

                        {/* SUB CATEGORY */}
                        <div>

                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Sub Kategori
                            </label>

                            <div className="relative">

                                <BadgeDollarSign
                                    size={18}
                                    className="absolute left-3 top-3 text-gray-400"
                                />

                                <input
                                    type="text"
                                    value={form.subKategori}
                                    onChange={(e) =>
                                        handleChange('subKategori', e.target.value)
                                    }
                                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-300 text-sm outline-none focus:border-indigo-500"
                                />

                            </div>

                        </div>

                        {/* PARENT ACCOUNT */}
                        <div>

                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Parent Account
                            </label>

                            <div className="relative">

                                <Building2
                                    size={18}
                                    className="absolute left-3 top-3 text-gray-400"
                                />

                                <select
                                    value={form.parentAccount}
                                    onChange={(e) =>
                                        handleChange('parentAccount', e.target.value)
                                    }
                                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-300 text-sm outline-none focus:border-indigo-500"
                                >
                                    <option>
                                        1000 - Asset
                                    </option>

                                    <option>
                                        1100 - Cash & Bank
                                    </option>

                                    <option>
                                        1200 - Inventory
                                    </option>

                                </select>

                            </div>

                        </div>

                        {/* NORMAL BALANCE */}
                        <div>

                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Normal Balance
                            </label>

                            <div className="relative">

                                <CircleDollarSign
                                    size={18}
                                    className="absolute left-3 top-3 text-gray-400"
                                />

                                <select
                                    value={form.tipeNormalBalance}
                                    onChange={(e) =>
                                        handleChange('tipeNormalBalance', e.target.value)
                                    }
                                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-300 text-sm outline-none focus:border-indigo-500"
                                >
                                    <option value="Debit">
                                        Debit
                                    </option>

                                    <option value="Credit">
                                        Credit
                                    </option>

                                </select>

                            </div>

                        </div>

                        {/* CASH FLOW */}
                        <div className="md:col-span-2">

                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Cash Flow Category
                            </label>

                            <select
                                value={form.cashFlowCategory}
                                onChange={(e) =>
                                    handleChange('cashFlowCategory', e.target.value)
                                }
                                className="w-full h-11 rounded-xl border border-gray-300 px-4 text-sm outline-none focus:border-indigo-500"
                            >
                                <option value="Operating">
                                    Operating Activities
                                </option>

                                <option value="Investing">
                                    Investing Activities
                                </option>

                                <option value="Financing">
                                    Financing Activities
                                </option>

                            </select>

                        </div>

                        {/* DESCRIPTION */}
                        <div className="md:col-span-2">

                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Deskripsi Account
                            </label>

                            <textarea
                                rows={4}
                                value={form.description}
                                onChange={(e) =>
                                    handleChange('description', e.target.value)
                                }
                                className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-indigo-500"
                            />

                        </div>

                    </div>

                </div>

                {/* ========================================== */}
                {/* ACCOUNT STATUS */}
                {/* ========================================== */}
                <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-5">

                    <div className="flex items-start gap-3">

                        <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center flex-shrink-0">
                            <CheckCircle2
                                size={20}
                                className="text-indigo-700"
                            />
                        </div>

                        <div>

                            <h3 className="font-semibold text-indigo-900">
                                Status Account
                            </h3>

                            <p className="text-sm text-indigo-800 mt-1 leading-relaxed">
                                Account ini aktif dan dapat digunakan untuk transaksi jurnal,
                                cashflow, dan laporan keuangan perusahaan.
                            </p>

                        </div>

                    </div>

                </div>

                {/* ========================================== */}
                {/* WARNING */}
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
                                Informasi Penting
                            </h3>

                            <p className="text-sm text-amber-800 mt-1 leading-relaxed">
                                Perubahan kategori atau normal balance account
                                dapat mempengaruhi struktur laporan keuangan dan jurnal akuntansi.
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
                        Batal
                    </button>

                    <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-sm transition"
                    >
                        <Save size={18} />
                        Update Account
                    </button>

                </div>

            </form>

        </PortalLayout>
    );
}