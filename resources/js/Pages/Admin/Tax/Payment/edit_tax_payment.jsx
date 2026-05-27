import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';

import {
    ArrowLeft,
    Save,
    CreditCard,
    Receipt,
    Wallet,
    BadgeDollarSign,
    FileText,
    Pencil,
    CheckCircle2,
    Clock3,
} from 'lucide-react';

export default function EditTaxPaymentPage() {
    const navigate = useNavigate();

    // ==========================================
    // MOCK EXISTING DATA
    // ==========================================
    const existingData = {
        jenis_pajak: 'PPh Pasal 21',
        masa_pajak: 'Mei',
        tahun_pajak: '2026',
        kode_billing: '123456789012345',
        nominal: '25000000',
        metode_pembayaran: 'Transfer Bank',
        tanggal_pembayaran: '2026-05-25',
        rekening_bank: 'BCA - 1234567890',
        nomor_referensi: 'TRX-20260525-001',
        status_pembayaran: 'Paid',
        keterangan: 'Pembayaran pajak PPh Pasal 21 bulan Mei 2026',
    };

    // ==========================================
    // STATE
    // ==========================================
    const [form, setForm] = useState(existingData);

    // ==========================================
    // HANDLE CHANGE
    // ==========================================
    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // ==========================================
    // HANDLE SUBMIT
    // ==========================================
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(form);

        alert('Data pembayaran pajak berhasil diperbarui!');
    };

    // ==========================================
    // FORMAT RUPIAH
    // ==========================================
    const formatRupiah = (value) =>
        new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(value || 0);

    return (
        <PortalLayout>
            <div className="space-y-6">

                {/* HEADER */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Edit Tax Payment
                        </h1>

                        <p className="text-sm text-gray-500 mt-1">
                            Update data pembayaran pajak perusahaan
                        </p>
                    </div>

                    <div className="flex items-center gap-3">

                        <div className={`px-4 py-2 rounded-2xl text-sm font-semibold flex items-center gap-2 ${
                            form.status_pembayaran === 'Paid'
                                ? 'bg-green-50 text-green-700'
                                : 'bg-amber-50 text-amber-700'
                        }`}>
                            {form.status_pembayaran === 'Paid' ? (
                                <CheckCircle2 size={16} />
                            ) : (
                                <Clock3 size={16} />
                            )}

                            {form.status_pembayaran}
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
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit}>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                        {/* LEFT CONTENT */}
                        <div className="xl:col-span-2 space-y-6">

                            {/* TAX INFORMATION */}
                            <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">

                                <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">

                                    <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                                        <Receipt
                                            size={18}
                                            className="text-indigo-600"
                                        />
                                        Informasi Pajak
                                    </h2>

                                    <div className="text-xs bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full font-semibold">
                                        TAX PAYMENT
                                    </div>
                                </div>

                                <div className="p-6 space-y-5">

                                    {/* Jenis Pajak */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Jenis Pajak
                                        </label>

                                        <select
                                            name="jenis_pajak"
                                            value={form.jenis_pajak}
                                            onChange={handleChange}
                                            className="w-full h-12 rounded-2xl border border-gray-200 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                                        >
                                            <option>PPh Pasal 21</option>
                                            <option>PPh Pasal 23</option>
                                            <option>PPh Pasal 4(2)</option>
                                            <option>PPN Masa</option>
                                            <option>PPh Badan</option>
                                        </select>
                                    </div>

                                    {/* GRID */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                        {/* Masa Pajak */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Masa Pajak
                                            </label>

                                            <select
                                                name="masa_pajak"
                                                value={form.masa_pajak}
                                                onChange={handleChange}
                                                className="w-full h-12 rounded-2xl border border-gray-200 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                                            >
                                                <option>Januari</option>
                                                <option>Februari</option>
                                                <option>Maret</option>
                                                <option>April</option>
                                                <option>Mei</option>
                                                <option>Juni</option>
                                                <option>Juli</option>
                                                <option>Agustus</option>
                                                <option>September</option>
                                                <option>Oktober</option>
                                                <option>November</option>
                                                <option>Desember</option>
                                            </select>
                                        </div>

                                        {/* Tahun Pajak */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Tahun Pajak
                                            </label>

                                            <input
                                                type="number"
                                                name="tahun_pajak"
                                                value={form.tahun_pajak}
                                                onChange={handleChange}
                                                className="w-full h-12 rounded-2xl border border-gray-200 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                                            />
                                        </div>
                                    </div>

                                    {/* Kode Billing */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Kode Billing
                                        </label>

                                        <input
                                            type="text"
                                            name="kode_billing"
                                            value={form.kode_billing}
                                            onChange={handleChange}
                                            className="w-full h-12 rounded-2xl border border-gray-200 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>

                                    {/* Nominal */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Nominal Pembayaran
                                        </label>

                                        <input
                                            type="number"
                                            name="nominal"
                                            value={form.nominal}
                                            onChange={handleChange}
                                            className="w-full h-12 rounded-2xl border border-gray-200 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* PAYMENT INFORMATION */}
                            <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">

                                <div className="px-6 py-5 border-b border-gray-200">

                                    <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                                        <Wallet
                                            size={18}
                                            className="text-emerald-600"
                                        />
                                        Informasi Pembayaran
                                    </h2>
                                </div>

                                <div className="p-6 space-y-5">

                                    {/* Metode Pembayaran */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Metode Pembayaran
                                        </label>

                                        <select
                                            name="metode_pembayaran"
                                            value={form.metode_pembayaran}
                                            onChange={handleChange}
                                            className="w-full h-12 rounded-2xl border border-gray-200 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                                        >
                                            <option>Transfer Bank</option>
                                            <option>Virtual Account</option>
                                            <option>Internet Banking</option>
                                            <option>Mobile Banking</option>
                                        </select>
                                    </div>

                                    {/* GRID */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                        {/* Tanggal Pembayaran */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Tanggal Pembayaran
                                            </label>

                                            <input
                                                type="date"
                                                name="tanggal_pembayaran"
                                                value={form.tanggal_pembayaran}
                                                onChange={handleChange}
                                                className="w-full h-12 rounded-2xl border border-gray-200 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                                            />
                                        </div>

                                        {/* Rekening Bank */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Rekening Bank
                                            </label>

                                            <select
                                                name="rekening_bank"
                                                value={form.rekening_bank}
                                                onChange={handleChange}
                                                className="w-full h-12 rounded-2xl border border-gray-200 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                                            >
                                                <option>BCA - 1234567890</option>
                                                <option>Mandiri - 99887766</option>
                                                <option>BNI - 77889900</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Nomor Referensi */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Nomor Referensi
                                        </label>

                                        <input
                                            type="text"
                                            name="nomor_referensi"
                                            value={form.nomor_referensi}
                                            onChange={handleChange}
                                            className="w-full h-12 rounded-2xl border border-gray-200 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>

                                    {/* Status Pembayaran */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Status Pembayaran
                                        </label>

                                        <select
                                            name="status_pembayaran"
                                            value={form.status_pembayaran}
                                            onChange={handleChange}
                                            className="w-full h-12 rounded-2xl border border-gray-200 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                                        >
                                            <option value="Paid">
                                                Paid
                                            </option>

                                            <option value="Pending">
                                                Pending
                                            </option>

                                            <option value="Failed">
                                                Failed
                                            </option>
                                        </select>
                                    </div>

                                    {/* Keterangan */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Keterangan
                                        </label>

                                        <textarea
                                            rows={4}
                                            name="keterangan"
                                            value={form.keterangan}
                                            onChange={handleChange}
                                            className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDEBAR */}
                        <div className="space-y-6">

                            {/* PAYMENT SUMMARY */}
                            <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-6">

                                <h2 className="font-semibold text-gray-900 flex items-center gap-2 mb-5">
                                    <BadgeDollarSign
                                        size={18}
                                        className="text-indigo-600"
                                    />
                                    Payment Summary
                                </h2>

                                <div className="space-y-4">

                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">
                                            Jenis Pajak
                                        </span>

                                        <span className="text-sm font-semibold text-gray-900">
                                            {form.jenis_pajak}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">
                                            Masa Pajak
                                        </span>

                                        <span className="text-sm font-semibold text-gray-900">
                                            {form.masa_pajak}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">
                                            Tahun Pajak
                                        </span>

                                        <span className="text-sm font-semibold text-gray-900">
                                            {form.tahun_pajak}
                                        </span>
                                    </div>

                                    <div className="border-t border-dashed border-gray-200 pt-4 flex items-center justify-between">

                                        <span className="text-sm font-medium text-gray-700">
                                            Total Pembayaran
                                        </span>

                                        <span className="text-lg font-bold text-indigo-600">
                                            {formatRupiah(form.nominal)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* ACTION BUTTON */}
                            <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-6 space-y-3">

                                <button
                                    type="submit"
                                    className="w-full h-12 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center justify-center gap-2 transition"
                                >
                                    <Save size={18} />
                                    Update Tax Payment
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </PortalLayout>
    );
}