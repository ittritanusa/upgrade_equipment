import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';

import {
    ArrowLeft,
    Save,
    CreditCard,
    Receipt,
    CalendarDays,
    Building2,
    Landmark,
    FileText,
    Wallet,
    BadgeDollarSign,
} from 'lucide-react';

export default function CreateTaxPaymentPage() {
    const navigate = useNavigate();

    // ==========================================
    // STATE
    // ==========================================
    const [form, setForm] = useState({
        jenis_pajak: '',
        masa_pajak: '',
        tahun_pajak: '2026',
        kode_billing: '',
        nominal: '',
        metode_pembayaran: '',
        tanggal_pembayaran: '',
        rekening_bank: '',
        nomor_referensi: '',
        keterangan: '',
    });

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

        alert('Pembayaran pajak berhasil disimpan!');
    };

    return (
        <PortalLayout>
            <div className="space-y-6">

                {/* HEADER */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Create Tax Payment
                        </h1>

                        <p className="text-sm text-gray-500 mt-1">
                            Tambahkan data pembayaran pajak perusahaan
                        </p>
                    </div>

                    {/* ACTION */}
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 h-10 px-4 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium bg-white hover:bg-gray-50 transition self-start sm:self-auto"
                    >
                        <ArrowLeft size={16} />
                        Kembali
                    </button>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                        {/* LEFT CONTENT */}
                        <div className="xl:col-span-2 space-y-6">

                            {/* TAX INFORMATION */}
                            <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">

                                <div className="px-6 py-5 border-b border-gray-200">
                                    <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                                        <Receipt
                                            size={18}
                                            className="text-indigo-600"
                                        />
                                        Informasi Pajak
                                    </h2>
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
                                            required
                                        >
                                            <option value="">
                                                Pilih Jenis Pajak
                                            </option>

                                            <option value="PPh Pasal 21">
                                                PPh Pasal 21
                                            </option>

                                            <option value="PPh Pasal 23">
                                                PPh Pasal 23
                                            </option>

                                            <option value="PPh Pasal 4(2)">
                                                PPh Pasal 4(2)
                                            </option>

                                            <option value="PPN Masa">
                                                PPN Masa
                                            </option>

                                            <option value="PPh Badan">
                                                PPh Badan
                                            </option>
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
                                                required
                                            >
                                                <option value="">
                                                    Pilih Masa Pajak
                                                </option>

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
                                                placeholder="2026"
                                                className="w-full h-12 rounded-2xl border border-gray-200 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                                                required
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
                                            placeholder="Masukkan kode billing"
                                            className="w-full h-12 rounded-2xl border border-gray-200 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                                            required
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
                                            placeholder="Masukkan nominal pembayaran"
                                            className="w-full h-12 rounded-2xl border border-gray-200 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                                            required
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
                                            required
                                        >
                                            <option value="">
                                                Pilih Metode Pembayaran
                                            </option>

                                            <option value="Transfer Bank">
                                                Transfer Bank
                                            </option>

                                            <option value="Virtual Account">
                                                Virtual Account
                                            </option>

                                            <option value="Internet Banking">
                                                Internet Banking
                                            </option>

                                            <option value="Mobile Banking">
                                                Mobile Banking
                                            </option>
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
                                                required
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
                                                required
                                            >
                                                <option value="">
                                                    Pilih Rekening Bank
                                                </option>

                                                <option value="BCA - 1234567890">
                                                    BCA - 1234567890
                                                </option>

                                                <option value="Mandiri - 99887766">
                                                    Mandiri - 99887766
                                                </option>

                                                <option value="BNI - 77889900">
                                                    BNI - 77889900
                                                </option>
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
                                            placeholder="Masukkan nomor referensi transaksi"
                                            className="w-full h-12 rounded-2xl border border-gray-200 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
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
                                            placeholder="Tambahkan catatan pembayaran..."
                                            className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDEBAR */}
                        <div className="space-y-6">

                            {/* SUMMARY */}
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
                                            {form.jenis_pajak || '-'}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">
                                            Masa Pajak
                                        </span>

                                        <span className="text-sm font-semibold text-gray-900">
                                            {form.masa_pajak || '-'}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">
                                            Tahun Pajak
                                        </span>

                                        <span className="text-sm font-semibold text-gray-900">
                                            {form.tahun_pajak || '-'}
                                        </span>
                                    </div>

                                    <div className="border-t border-dashed border-gray-200 pt-4 flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-700">
                                            Total Pembayaran
                                        </span>

                                        <span className="text-lg font-bold text-indigo-600">
                                            {form.nominal
                                                ? new Intl.NumberFormat('id-ID', {
                                                      style: 'currency',
                                                      currency: 'IDR',
                                                      minimumFractionDigits: 0,
                                                  }).format(form.nominal)
                                                : 'Rp 0'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* ACTION BUTTON */}
                            <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-6">

                                <button
                                    type="submit"
                                    className="w-full h-12 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center justify-center gap-2 transition"
                                >
                                    <Save size={18} />
                                    Simpan Pembayaran Pajak
                                </button>

                                <button
                                    type="button"
                                    className="w-full h-12 rounded-2xl border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold flex items-center justify-center gap-2 transition mt-3"
                                >
                                    <FileText size={18} />
                                    Simpan Sebagai Draft
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </PortalLayout>
    );
}