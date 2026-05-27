import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';

import {
    ArrowLeft,
    Calendar,
    Warehouse,
    User,
    ClipboardList,
    CheckCircle2,
    Clock,
    AlertTriangle,
    Package,
    FileText,
    Calculator,
    BadgeDollarSign,
    Hash,
} from 'lucide-react';

// ==========================================
// MOCK DETAIL DATA
// ==========================================
const MOCK_DETAIL = {
    id: 1,
    noDoc: 'SA-2026-0189',
    tanggal: '28 Mei 2026',
    warehouse: 'GDG-01 - Gudang Utama',
    status: 'Approved',
    alasan: 'Rusak saat bongkar muat',
    dibuatOleh: 'Ekki Maulana',
    catatan:
        'Terdapat beberapa barang rusak akibat proses bongkar muat dari supplier.',
    totalNilai: -340000,

    items: [
        {
            id: 1,
            kode: 'BRG-001',
            nama: 'Semen Tiga Roda 50KG',
            stokSistem: 120,
            stokFisik: 115,
            selisih: -5,
            satuan: 'Zak',
            harga: 65000,
            nilai: -325000,
        },
        {
            id: 2,
            kode: 'BRG-002',
            nama: 'Besi Hollow 4x4',
            stokSistem: 80,
            stokFisik: 79,
            selisih: -1,
            satuan: 'Batang',
            harga: 15000,
            nilai: -15000,
        },
    ],
};

export default function DetailStockAdjustment() {
    const navigate = useNavigate();
    const { id } = useParams();

    const detail = MOCK_DETAIL;

    return (
        <PortalLayout>
            <div className="space-y-6 w-full">

                {/* ========================================== */}
                {/* HEADER */}
                {/* ========================================== */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Detail Stock Adjustment
                        </h1>

                        <div className="flex items-center gap-2 mt-1 text-sm">
                            <span className="text-gray-400">
                                Inventory & Warehouse
                            </span>

                            <span className="text-gray-300">/</span>

                            <span className="text-gray-400">
                                Stock Adjustment
                            </span>

                            <span className="text-gray-300">/</span>

                            <span className="text-indigo-600 font-medium">
                                {detail.noDoc}
                            </span>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 h-10 px-4 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium bg-white hover:bg-gray-50 transition self-start sm:self-auto"
                    >
                        <ArrowLeft size={16} />
                        Kembali
                    </button>

                </div>

                {/* ========================================== */}
                {/* INFO CARD */}
                {/* ========================================== */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">

                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">

                        {/* LEFT */}
                        <div className="space-y-5 flex-1">

                            {/* DOC */}
                            <div>
                                <div className="text-sm text-gray-500 mb-1">
                                    Nomor Dokumen
                                </div>

                                <div className="flex items-center gap-2">
                                    <Hash size={18} className="text-indigo-600" />

                                    <h2 className="text-2xl font-bold text-indigo-600 font-mono">
                                        {detail.noDoc}
                                    </h2>
                                </div>
                            </div>

                            {/* GRID INFO */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                {/* DATE */}
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                                        <Calendar size={18} className="text-indigo-600" />
                                    </div>

                                    <div>
                                        <div className="text-xs text-gray-500 mb-1">
                                            Tanggal Adjustment
                                        </div>

                                        <div className="font-semibold text-gray-900">
                                            {detail.tanggal}
                                        </div>
                                    </div>
                                </div>

                                {/* WAREHOUSE */}
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                                        <Warehouse size={18} className="text-indigo-600" />
                                    </div>

                                    <div>
                                        <div className="text-xs text-gray-500 mb-1">
                                            Gudang
                                        </div>

                                        <div className="font-semibold text-gray-900">
                                            {detail.warehouse}
                                        </div>
                                    </div>
                                </div>

                                {/* USER */}
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                                        <User size={18} className="text-indigo-600" />
                                    </div>

                                    <div>
                                        <div className="text-xs text-gray-500 mb-1">
                                            Dibuat Oleh
                                        </div>

                                        <div className="font-semibold text-gray-900">
                                            {detail.dibuatOleh}
                                        </div>
                                    </div>
                                </div>

                                {/* REASON */}
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                                        <AlertTriangle size={18} className="text-amber-600" />
                                    </div>

                                    <div>
                                        <div className="text-xs text-gray-500 mb-1">
                                            Alasan Adjustment
                                        </div>

                                        <div className="font-semibold text-gray-900">
                                            {detail.alasan}
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>

                        {/* STATUS */}
                        <div>
                            <span
                                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border ${
                                    detail.status === 'Approved'
                                        ? 'bg-green-50 text-green-700 border-green-200'
                                        : 'bg-amber-50 text-amber-700 border-amber-200'
                                }`}
                            >
                                {detail.status === 'Approved' ? (
                                    <CheckCircle2 size={16} />
                                ) : (
                                    <Clock size={16} />
                                )}

                                {detail.status}
                            </span>
                        </div>

                    </div>

                    {/* NOTES */}
                    <div className="mt-6 border-t border-gray-200 pt-5">

                        <div className="flex items-center gap-2 mb-3">
                            <FileText size={18} className="text-indigo-600" />

                            <h3 className="font-semibold text-gray-900">
                                Catatan
                            </h3>
                        </div>

                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm text-gray-700 leading-relaxed">
                            {detail.catatan}
                        </div>

                    </div>

                </div>

                {/* ========================================== */}
                {/* TABLE ITEM */}
                {/* ========================================== */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

                    {/* HEADER */}
                    <div className="px-6 py-5 border-b border-gray-200 flex items-center gap-2">
                        <Package size={20} className="text-indigo-600" />

                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">
                                Detail Item Adjustment
                            </h2>

                            <p className="text-sm text-gray-500">
                                Daftar item yang mengalami adjustment stock
                            </p>
                        </div>
                    </div>

                    {/* TABLE */}
                    <div className="overflow-x-auto">

                        <table className="min-w-full text-sm">

                            <thead className="bg-gray-50 border-b border-gray-200 uppercase text-xs tracking-wider text-gray-600">
                                <tr>
                                    <th className="px-6 py-4 text-left">
                                        Item
                                    </th>

                                    <th className="px-6 py-4 text-center">
                                        Stok Sistem
                                    </th>

                                    <th className="px-6 py-4 text-center">
                                        Stok Fisik
                                    </th>

                                    <th className="px-6 py-4 text-center">
                                        Selisih
                                    </th>

                                    <th className="px-6 py-4 text-right">
                                        Harga Satuan
                                    </th>

                                    <th className="px-6 py-4 text-right">
                                        Nilai Adjustment
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200">

                                {detail.items.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="hover:bg-gray-50/50 transition"
                                    >

                                        {/* ITEM */}
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-gray-900">
                                                {item.nama}
                                            </div>

                                            <div className="text-xs text-gray-500 mt-1">
                                                {item.kode} • {item.satuan}
                                            </div>
                                        </td>

                                        {/* STOK SISTEM */}
                                        <td className="px-6 py-4 text-center font-medium text-gray-800">
                                            {item.stokSistem}
                                        </td>

                                        {/* STOK FISIK */}
                                        <td className="px-6 py-4 text-center font-medium text-gray-800">
                                            {item.stokFisik}
                                        </td>

                                        {/* SELISIH */}
                                        <td className="px-6 py-4 text-center">

                                            <span
                                                className={`font-bold ${
                                                    item.selisih > 0
                                                        ? 'text-emerald-600'
                                                        : item.selisih < 0
                                                        ? 'text-red-600'
                                                        : 'text-gray-500'
                                                }`}
                                            >
                                                {item.selisih > 0 ? '+' : ''}
                                                {item.selisih}
                                            </span>

                                        </td>

                                        {/* HARGA */}
                                        <td className="px-6 py-4 text-right font-medium text-gray-700">
                                            {item.harga.toLocaleString('id-ID', {
                                                style: 'currency',
                                                currency: 'IDR',
                                                minimumFractionDigits: 0,
                                            })}
                                        </td>

                                        {/* NILAI */}
                                        <td
                                            className={`px-6 py-4 text-right font-bold font-mono ${
                                                item.nilai >= 0
                                                    ? 'text-emerald-600'
                                                    : 'text-red-600'
                                            }`}
                                        >
                                            {item.nilai.toLocaleString('id-ID', {
                                                style: 'currency',
                                                currency: 'IDR',
                                                minimumFractionDigits: 0,
                                            })}
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

                    <div className="lg:col-span-2"></div>

                    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">

                        <div className="flex items-center gap-2 mb-5">
                            <Calculator size={20} className="text-indigo-600" />

                            <h2 className="text-lg font-semibold text-gray-900">
                                Ringkasan Adjustment
                            </h2>
                        </div>

                        <div className="space-y-4">

                            {/* TOTAL ITEM */}
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">
                                    Total Item
                                </span>

                                <span className="font-semibold text-gray-900">
                                    {detail.items.length} SKU
                                </span>
                            </div>

                            {/* TOTAL NILAI */}
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">
                                    Total Dampak Finansial
                                </span>

                                <span
                                    className={`font-bold text-lg ${
                                        detail.totalNilai >= 0
                                            ? 'text-emerald-600'
                                            : 'text-red-600'
                                    }`}
                                >
                                    {detail.totalNilai.toLocaleString('id-ID', {
                                        style: 'currency',
                                        currency: 'IDR',
                                        minimumFractionDigits: 0,
                                    })}
                                </span>
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </PortalLayout>
    );
}