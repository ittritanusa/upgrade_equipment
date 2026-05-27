import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';

import {
    ArrowLeft,
    Printer,
    Receipt,
    Calendar,
    Building2,
    User,
    CreditCard,
    FileText,
    CheckCircle2,
    Clock3,
    AlertTriangle,
    BadgeDollarSign,
    Package,
    Calculator,
    Landmark,
    Wallet,
    Pencil,
    Save,
    X,
} from 'lucide-react';

// ==========================================
// MOCK DATA
// ==========================================
const DETAIL_AP = {
    invoiceNumber: 'AP-2026-00012',
    projectName: 'Project Tol Cisumdawu',
    vendor: 'PT Sumber Material Nusantara',
    picVendor: 'Andi Saputra',

    invoiceDate: '28 Mei 2026',
    dueDate: '10 Juni 2026',

    paymentMethod: 'Bank Transfer',
    status: 'Outstanding',

    createdBy: 'Ekki Maulana',

    notes:
        'Tagihan pembelian material proyek dan sewa alat pekerjaan struktur area STA 12+200.',

    items: [
        {
            id: 1,
            kode: 'MAT-001',
            nama: 'Semen Tiga Roda 50KG',
            qty: 300,
            satuan: 'Zak',
            harga: 72000,
        },
        {
            id: 2,
            kode: 'MAT-002',
            nama: 'Besi Beton 12mm',
            qty: 150,
            satuan: 'Batang',
            harga: 145000,
        },
        {
            id: 3,
            kode: 'SRV-002',
            nama: 'Sewa Excavator',
            qty: 5,
            satuan: 'Hari',
            harga: 3500000,
        },
    ],
};

// ==========================================
// COMPONENT
// ==========================================
export default function DetailAccountPayable() {

    const navigate = useNavigate();
    const { id } = useParams();

    const [status, setStatus] = useState(DETAIL_AP.status);
    const [showModal, setShowModal] = useState(false);
    const [paymentNotes, setPaymentNotes] = useState('');

    const detail = DETAIL_AP;

    // ==========================================
    // TOTAL
    // ==========================================
    const subtotal = detail.items.reduce((sum, item) => {

        return sum + (item.qty * item.harga);

    }, 0);

    const ppn = subtotal * 0.11;

    const grandTotal = subtotal + ppn;

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
    const renderStatusBadge = (statusValue) => {

        if (statusValue === 'Paid') {

            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 border border-green-200 text-green-700 text-xs font-semibold">
                    <CheckCircle2 size={12} />
                    Paid
                </span>
            );
        }

        if (statusValue === 'Partial') {

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
    // UPDATE STATUS
    // ==========================================
    const handleUpdateStatus = (newStatus) => {

        setStatus(newStatus);
        setShowModal(false);
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

                            <h1 className="text-2xl font-semibold text-gray-900">
                                Detail Account Payable
                            </h1>

                            {renderStatusBadge(status)}

                        </div>

                        <div className="flex items-center gap-2 mt-1 text-sm">

                            <span className="text-gray-400">
                                Accounting & Finance
                            </span>

                            <span className="text-gray-300">/</span>

                            <span className="text-gray-400">
                                Account Payable
                            </span>

                            <span className="text-gray-300">/</span>

                            <span className="text-indigo-600 font-medium">
                                {detail.invoiceNumber}
                            </span>

                        </div>

                    </div>

                    <div className="flex flex-wrap items-center gap-3">

                        <button
                            onClick={() => setShowModal(true)}
                            className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition"
                        >
                            <Wallet size={18} />
                            Update Status
                        </button>

                        <button
                            onClick={() => window.print()}
                            className="inline-flex items-center gap-2 h-11 px-5 rounded-xl border border-gray-300 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 transition"
                        >
                            <Printer size={18} />
                            Print
                        </button>

                        <button
                            onClick={() => navigate(-1)}
                            className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition"
                        >
                            <ArrowLeft size={18} />
                            Kembali
                        </button>

                    </div>

                </div>

                {/* ========================================== */}
                {/* INFO */}
                {/* ========================================== */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* LEFT */}
                    <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl shadow-sm p-6">

                        <div className="flex items-center gap-2 mb-6">

                            <Receipt
                                size={20}
                                className="text-indigo-600"
                            />

                            <div>

                                <h2 className="text-lg font-semibold text-gray-900">
                                    Informasi Tagihan Vendor
                                </h2>

                                <p className="text-sm text-gray-500">
                                    Detail data account payable vendor
                                </p>

                            </div>

                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            <div className="border border-gray-200 rounded-2xl p-5">

                                <div className="flex items-center gap-2 mb-3">

                                    <FileText
                                        size={16}
                                        className="text-indigo-600"
                                    />

                                    <span className="text-xs font-semibold text-gray-500 uppercase">
                                        Nomor Invoice
                                    </span>

                                </div>

                                <div className="text-sm font-bold text-gray-900">
                                    {detail.invoiceNumber}
                                </div>

                            </div>

                            <div className="border border-gray-200 rounded-2xl p-5">

                                <div className="flex items-center gap-2 mb-3">

                                    <Building2
                                        size={16}
                                        className="text-blue-600"
                                    />

                                    <span className="text-xs font-semibold text-gray-500 uppercase">
                                        Project
                                    </span>

                                </div>

                                <div className="text-sm font-semibold text-gray-900">
                                    {detail.projectName}
                                </div>

                            </div>

                            <div className="border border-gray-200 rounded-2xl p-5">

                                <div className="flex items-center gap-2 mb-3">

                                    <Landmark
                                        size={16}
                                        className="text-emerald-600"
                                    />

                                    <span className="text-xs font-semibold text-gray-500 uppercase">
                                        Vendor
                                    </span>

                                </div>

                                <div className="text-sm font-semibold text-gray-900">
                                    {detail.vendor}
                                </div>

                            </div>

                            <div className="border border-gray-200 rounded-2xl p-5">

                                <div className="flex items-center gap-2 mb-3">

                                    <User
                                        size={16}
                                        className="text-orange-600"
                                    />

                                    <span className="text-xs font-semibold text-gray-500 uppercase">
                                        PIC Vendor
                                    </span>

                                </div>

                                <div className="text-sm font-semibold text-gray-900">
                                    {detail.picVendor}
                                </div>

                            </div>

                            <div className="border border-gray-200 rounded-2xl p-5">

                                <div className="flex items-center gap-2 mb-3">

                                    <Calendar
                                        size={16}
                                        className="text-indigo-600"
                                    />

                                    <span className="text-xs font-semibold text-gray-500 uppercase">
                                        Tanggal Invoice
                                    </span>

                                </div>

                                <div className="text-sm font-semibold text-gray-900">
                                    {detail.invoiceDate}
                                </div>

                            </div>

                            <div className="border border-gray-200 rounded-2xl p-5">

                                <div className="flex items-center gap-2 mb-3">

                                    <Clock3
                                        size={16}
                                        className="text-red-600"
                                    />

                                    <span className="text-xs font-semibold text-gray-500 uppercase">
                                        Jatuh Tempo
                                    </span>

                                </div>

                                <div className="text-sm font-semibold text-gray-900">
                                    {detail.dueDate}
                                </div>

                            </div>

                            <div className="border border-gray-200 rounded-2xl p-5">

                                <div className="flex items-center gap-2 mb-3">

                                    <CreditCard
                                        size={16}
                                        className="text-cyan-600"
                                    />

                                    <span className="text-xs font-semibold text-gray-500 uppercase">
                                        Payment Method
                                    </span>

                                </div>

                                <div className="text-sm font-semibold text-gray-900">
                                    {detail.paymentMethod}
                                </div>

                            </div>

                            <div className="border border-gray-200 rounded-2xl p-5">

                                <div className="flex items-center gap-2 mb-3">

                                    <User
                                        size={16}
                                        className="text-gray-600"
                                    />

                                    <span className="text-xs font-semibold text-gray-500 uppercase">
                                        Created By
                                    </span>

                                </div>

                                <div className="text-sm font-semibold text-gray-900">
                                    {detail.createdBy}
                                </div>

                            </div>

                        </div>

                        <div className="mt-5 border border-dashed border-gray-300 rounded-2xl p-5 bg-gray-50">

                            <div className="flex items-center gap-2 mb-2">

                                <FileText
                                    size={16}
                                    className="text-gray-500"
                                />

                                <span className="text-xs font-semibold text-gray-500 uppercase">
                                    Catatan Invoice
                                </span>

                            </div>

                            <p className="text-sm text-gray-700 leading-relaxed">
                                {detail.notes}
                            </p>

                        </div>

                    </div>

                    {/* RIGHT */}
                    <div className="space-y-6">

                        <div className="bg-slate-900 rounded-2xl p-6 text-white">

                            <div className="flex items-center gap-2 mb-5">

                                <Calculator size={20} />

                                <h3 className="font-semibold">
                                    Ringkasan Tagihan
                                </h3>

                            </div>

                            <div className="space-y-4 text-sm">

                                <div className="flex items-center justify-between">

                                    <span className="text-slate-300">
                                        Subtotal
                                    </span>

                                    <span className="font-semibold">
                                        {formatRupiah(subtotal)}
                                    </span>

                                </div>

                                <div className="flex items-center justify-between">

                                    <span className="text-slate-300">
                                        PPN 11%
                                    </span>

                                    <span className="font-semibold">
                                        {formatRupiah(ppn)}
                                    </span>

                                </div>

                                <div className="pt-4 border-t border-slate-700 flex items-center justify-between">

                                    <span className="text-base font-semibold">
                                        Grand Total
                                    </span>

                                    <span className="text-xl font-bold">
                                        {formatRupiah(grandTotal)}
                                    </span>

                                </div>

                            </div>

                        </div>

                        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">

                            <div className="flex items-center gap-2 mb-4">

                                <BadgeDollarSign
                                    size={18}
                                    className="text-indigo-600"
                                />

                                <h3 className="font-semibold text-gray-900">
                                    Status Pembayaran
                                </h3>

                            </div>

                            <div className="flex items-center justify-between">

                                <span className="text-sm text-gray-500">
                                    Status Invoice
                                </span>

                                {renderStatusBadge(status)}

                            </div>

                        </div>

                    </div>

                </div>

                {/* ========================================== */}
                {/* TABLE */}
                {/* ========================================== */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

                    <div className="px-6 py-5 border-b border-gray-200 flex items-center gap-2">

                        <Package
                            size={20}
                            className="text-indigo-600"
                        />

                        <div>

                            <h2 className="text-lg font-semibold text-gray-900">
                                Detail Item Invoice
                            </h2>

                            <p className="text-sm text-gray-500">
                                Rincian item pembelian / jasa vendor
                            </p>

                        </div>

                    </div>

                    <div className="overflow-x-auto">

                        <table className="min-w-full text-sm">

                            <thead className="bg-gray-50 border-b border-gray-200 uppercase text-xs tracking-wider text-gray-600">

                                <tr>

                                    <th className="px-4 py-4 text-left">
                                        Item
                                    </th>

                                    <th className="px-4 py-4 text-center">
                                        Qty
                                    </th>

                                    <th className="px-4 py-4 text-right">
                                        Harga
                                    </th>

                                    <th className="px-4 py-4 text-right">
                                        Total
                                    </th>

                                </tr>

                            </thead>

                            <tbody className="divide-y divide-gray-200">

                                {detail.items.map((item) => {

                                    const total = item.qty * item.harga;

                                    return (

                                        <tr
                                            key={item.id}
                                            className="hover:bg-gray-50/50 transition"
                                        >

                                            <td className="px-4 py-4 min-w-[320px]">

                                                <div className="font-semibold text-gray-900">
                                                    {item.nama}
                                                </div>

                                                <div className="text-xs text-gray-500 mt-1">
                                                    {item.kode}
                                                </div>

                                            </td>

                                            <td className="px-4 py-4 text-center">

                                                <div className="font-semibold text-gray-900">
                                                    {item.qty} {item.satuan}
                                                </div>

                                            </td>

                                            <td className="px-4 py-4 text-right font-medium text-gray-700">
                                                {formatRupiah(item.harga)}
                                            </td>

                                            <td className="px-4 py-4 text-right font-bold text-indigo-600">
                                                {formatRupiah(total)}
                                            </td>

                                        </tr>

                                    );

                                })}

                            </tbody>

                        </table>

                    </div>

                </div>

                {/* ========================================== */}
                {/* MODAL */}
                {/* ========================================== */}
                {showModal && (

                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

                        <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">

                            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">

                                <div>

                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Update Status Pembayaran
                                    </h2>

                                    <p className="text-sm text-gray-500 mt-1">
                                        Update status pembayaran invoice vendor
                                    </p>

                                </div>

                                <button
                                    onClick={() => setShowModal(false)}
                                    className="w-10 h-10 rounded-xl hover:bg-gray-100 flex items-center justify-center transition"
                                >
                                    <X size={18} className="text-gray-500" />
                                </button>

                            </div>

                            <div className="p-6 space-y-5">

                                <div>

                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Status Pembayaran
                                    </label>

                                    <select
                                        defaultValue={status}
                                        id="paymentStatus"
                                        className="w-full h-11 rounded-xl border border-gray-300 px-4 text-sm outline-none focus:border-indigo-500"
                                    >
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

                                <div>

                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Catatan Pembayaran
                                    </label>

                                    <textarea
                                        rows={4}
                                        value={paymentNotes}
                                        onChange={(e) => setPaymentNotes(e.target.value)}
                                        placeholder="Masukkan catatan pembayaran..."
                                        className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-indigo-500"
                                    />

                                </div>

                            </div>

                            <div className="px-6 py-5 border-t border-gray-200 flex flex-col-reverse sm:flex-row items-center justify-end gap-3">

                                <button
                                    onClick={() => setShowModal(false)}
                                    className="w-full sm:w-auto h-11 px-5 rounded-xl border border-gray-300 bg-white text-gray-700 text-sm font-semibold hover:bg-gray-50 transition"
                                >
                                    Batal
                                </button>

                                <button
                                    onClick={() => {

                                        const selectedStatus = document.getElementById('paymentStatus').value;

                                        handleUpdateStatus(selectedStatus);

                                    }}
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition"
                                >
                                    <Save size={16} />
                                    Simpan Status
                                </button>

                            </div>

                        </div>

                    </div>

                )}

            </div>

        </PortalLayout>
    );
}