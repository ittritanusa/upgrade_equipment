import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';

import {
    ArrowLeft,
    Save,
    FilePlus2,
    Calendar,
    Building2,
    Receipt,
    CreditCard,
    User,
    FileText,
    Plus,
    Trash2,
    Package,
    Calculator,
    Wallet,
    Landmark,
    BadgeDollarSign,
    ClipboardList,
} from 'lucide-react';

// ==========================================
// MOCK PROJECT / VENDOR
// ==========================================
const MOCK_VENDOR = [
    {
        id: 1,
        nama: 'PT Sumber Material Beton',
        pic: 'Budi Santoso',
        paymentTerm: '30 Hari',
        metode: 'Bank Transfer',
        bank: 'BCA - 1234567890',
    },
    {
        id: 2,
        nama: 'PT Baja Konstruksi Indonesia',
        pic: 'Agus Saputra',
        paymentTerm: '14 Hari',
        metode: 'Transfer Bank',
        bank: 'Mandiri - 8899776655',
    },
    {
        id: 3,
        nama: 'CV Mitra Teknik Nusantara',
        pic: 'Rizky Pratama',
        paymentTerm: 'Cash',
        metode: 'Cash',
        bank: '-',
    },
];

// ==========================================
// MOCK ITEM
// ==========================================
const MOCK_ITEMS = [
    {
        id: 1,
        kode: 'MAT-001',
        nama: 'Semen Tiga Roda 50KG',
        satuan: 'Zak',
        harga: 72000,
    },
    {
        id: 2,
        kode: 'MAT-002',
        nama: 'Besi Beton 12mm',
        satuan: 'Batang',
        harga: 145000,
    },
    {
        id: 3,
        kode: 'SRV-001',
        nama: 'Jasa Sewa Excavator',
        satuan: 'Hari',
        harga: 2500000,
    },
];

// ==========================================
// COMPONENT
// ==========================================
export default function CreateAccountPayable() {

    const navigate = useNavigate();

    // ==========================================
    // FORM
    // ==========================================
    const [form, setForm] = useState({
        invoiceNumber: '',
        vendorId: '',
        vendorName: '',
        picVendor: '',
        paymentTerm: '',
        paymentMethod: '',
        bankAccount: '',
        invoiceDate: '',
        dueDate: '',
        notes: '',
    });

    // ==========================================
    // ITEMS
    // ==========================================
    const [items, setItems] = useState([
        {
            itemId: '',
            kode: '',
            nama: '',
            qty: 1,
            satuan: '',
            harga: 0,
        },
    ]);

    // ==========================================
    // HANDLE CHANGE
    // ==========================================
    const handleChange = (field, value) => {

        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // ==========================================
    // SELECT VENDOR
    // ==========================================
    const handleSelectVendor = (vendorId) => {

        const selected = MOCK_VENDOR.find(
            (vendor) => vendor.id === parseInt(vendorId)
        );

        if (!selected) return;

        setForm((prev) => ({
            ...prev,
            vendorId: selected.id,
            vendorName: selected.nama,
            picVendor: selected.pic,
            paymentTerm: selected.paymentTerm,
            paymentMethod: selected.metode,
            bankAccount: selected.bank,
        }));
    };

    // ==========================================
    // SELECT ITEM
    // ==========================================
    const handleSelectItem = (index, itemId) => {

        const selected = MOCK_ITEMS.find(
            (item) => item.id === parseInt(itemId)
        );

        if (!selected) return;

        const updated = [...items];

        updated[index] = {
            ...updated[index],
            itemId: selected.id,
            kode: selected.kode,
            nama: selected.nama,
            satuan: selected.satuan,
            harga: selected.harga,
        };

        setItems(updated);
    };

    // ==========================================
    // HANDLE ITEM CHANGE
    // ==========================================
    const handleItemChange = (index, field, value) => {

        const updated = [...items];

        updated[index][field] = value;

        setItems(updated);
    };

    // ==========================================
    // ADD ROW
    // ==========================================
    const addRow = () => {

        setItems([
            ...items,
            {
                itemId: '',
                kode: '',
                nama: '',
                qty: 1,
                satuan: '',
                harga: 0,
            },
        ]);
    };

    // ==========================================
    // REMOVE ROW
    // ==========================================
    const removeRow = (index) => {

        const updated = [...items];

        updated.splice(index, 1);

        setItems(updated);
    };

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
    // CALCULATION
    // ==========================================
    const subtotal = useMemo(() => {

        return items.reduce((sum, item) => {

            return sum + (
                Number(item.qty || 0) *
                Number(item.harga || 0)
            );

        }, 0);

    }, [items]);

    const ppn = subtotal * 0.11;

    const grandTotal = subtotal + ppn;

    return (
        <PortalLayout>

            <div className="space-y-6">

                {/* ========================================== */}
                {/* HEADER */}
                {/* ========================================== */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                    <div>

                        <h1 className="text-2xl font-semibold text-gray-900">
                            Buat Account Payable
                        </h1>

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
                                Buat AP
                            </span>

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
                {/* FORM */}
                {/* ========================================== */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">

                    <div className="flex items-center gap-2 mb-6">

                        <ClipboardList
                            size={20}
                            className="text-indigo-600"
                        />

                        <div>

                            <h2 className="text-lg font-semibold text-gray-900">
                                Informasi Account Payable
                            </h2>

                            <p className="text-sm text-gray-500">
                                Form input hutang vendor / supplier
                            </p>

                        </div>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        {/* INVOICE */}
                        <div>

                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Nomor Invoice Vendor
                            </label>

                            <div className="relative">

                                <Receipt
                                    size={18}
                                    className="absolute left-3 top-3 text-gray-400"
                                />

                                <input
                                    type="text"
                                    placeholder="Masukkan nomor invoice"
                                    value={form.invoiceNumber}
                                    onChange={(e) =>
                                        handleChange(
                                            'invoiceNumber',
                                            e.target.value
                                        )
                                    }
                                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-300 text-sm outline-none focus:border-indigo-500"
                                />

                            </div>

                        </div>

                        {/* VENDOR */}
                        <div>

                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Vendor / Supplier
                            </label>

                            <div className="relative">

                                <Building2
                                    size={18}
                                    className="absolute left-3 top-3 text-gray-400"
                                />

                                <select
                                    value={form.vendorId}
                                    onChange={(e) =>
                                        handleSelectVendor(e.target.value)
                                    }
                                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-300 text-sm outline-none focus:border-indigo-500"
                                >
                                    <option value="">
                                        Pilih Vendor
                                    </option>

                                    {MOCK_VENDOR.map((vendor) => (

                                        <option
                                            key={vendor.id}
                                            value={vendor.id}
                                        >
                                            {vendor.nama}
                                        </option>

                                    ))}

                                </select>

                            </div>

                        </div>

                        {/* PIC */}
                        <div>

                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                PIC Vendor
                            </label>

                            <div className="relative">

                                <User
                                    size={18}
                                    className="absolute left-3 top-3 text-gray-400"
                                />

                                <input
                                    type="text"
                                    value={form.picVendor}
                                    disabled
                                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700"
                                />

                            </div>

                        </div>

                        {/* TERM */}
                        <div>

                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Payment Term
                            </label>

                            <div className="relative">

                                <Wallet
                                    size={18}
                                    className="absolute left-3 top-3 text-gray-400"
                                />

                                <input
                                    type="text"
                                    value={form.paymentTerm}
                                    disabled
                                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700"
                                />

                            </div>

                        </div>

                        {/* DATE */}
                        <div>

                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Tanggal Invoice
                            </label>

                            <div className="relative">

                                <Calendar
                                    size={18}
                                    className="absolute left-3 top-3 text-gray-400"
                                />

                                <input
                                    type="date"
                                    value={form.invoiceDate}
                                    onChange={(e) =>
                                        handleChange(
                                            'invoiceDate',
                                            e.target.value
                                        )
                                    }
                                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-300 text-sm outline-none focus:border-indigo-500"
                                />

                            </div>

                        </div>

                        {/* DUE */}
                        <div>

                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Jatuh Tempo
                            </label>

                            <div className="relative">

                                <Calendar
                                    size={18}
                                    className="absolute left-3 top-3 text-gray-400"
                                />

                                <input
                                    type="date"
                                    value={form.dueDate}
                                    onChange={(e) =>
                                        handleChange(
                                            'dueDate',
                                            e.target.value
                                        )
                                    }
                                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-300 text-sm outline-none focus:border-indigo-500"
                                />

                            </div>

                        </div>

                        {/* METHOD */}
                        <div>

                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Payment Method
                            </label>

                            <div className="relative">

                                <CreditCard
                                    size={18}
                                    className="absolute left-3 top-3 text-gray-400"
                                />

                                <input
                                    type="text"
                                    value={form.paymentMethod}
                                    disabled
                                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700"
                                />

                            </div>

                        </div>

                        {/* BANK */}
                        <div>

                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Rekening Vendor
                            </label>

                            <div className="relative">

                                <Landmark
                                    size={18}
                                    className="absolute left-3 top-3 text-gray-400"
                                />

                                <input
                                    type="text"
                                    value={form.bankAccount}
                                    disabled
                                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700"
                                />

                            </div>

                        </div>

                        {/* NOTES */}
                        <div className="md:col-span-2">

                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Catatan
                            </label>

                            <textarea
                                rows={4}
                                value={form.notes}
                                onChange={(e) =>
                                    handleChange('notes', e.target.value)
                                }
                                placeholder="Masukkan catatan tambahan..."
                                className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-indigo-500"
                            />

                        </div>

                    </div>

                </div>

                {/* ========================================== */}
                {/* TABLE ITEM */}
                {/* ========================================== */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

                    <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">

                        <div className="flex items-center gap-2">

                            <Package
                                size={20}
                                className="text-indigo-600"
                            />

                            <div>

                                <h2 className="text-lg font-semibold text-gray-900">
                                    Detail Item Invoice
                                </h2>

                                <p className="text-sm text-gray-500">
                                    Tambahkan item barang atau jasa
                                </p>

                            </div>

                        </div>

                        <button
                            onClick={addRow}
                            className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition"
                        >
                            <Plus size={16} />
                            Tambah Item
                        </button>

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

                                    <th className="px-4 py-4 text-center">
                                        Aksi
                                    </th>

                                </tr>

                            </thead>

                            <tbody className="divide-y divide-gray-200">

                                {items.map((row, index) => {

                                    const total =
                                        Number(row.qty || 0) *
                                        Number(row.harga || 0);

                                    return (

                                        <tr key={index}>

                                            {/* ITEM */}
                                            <td className="px-4 py-4 min-w-[320px]">

                                                <select
                                                    value={row.itemId}
                                                    onChange={(e) =>
                                                        handleSelectItem(
                                                            index,
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full h-11 rounded-xl border border-gray-300 px-3 text-sm outline-none focus:border-indigo-500"
                                                >
                                                    <option value="">
                                                        Pilih Item
                                                    </option>

                                                    {MOCK_ITEMS.map((item) => (

                                                        <option
                                                            key={item.id}
                                                            value={item.id}
                                                        >
                                                            {item.kode} - {item.nama}
                                                        </option>

                                                    ))}

                                                </select>

                                                {row.nama && (

                                                    <div className="mt-2">

                                                        <div className="font-semibold text-gray-900 text-sm">
                                                            {row.nama}
                                                        </div>

                                                        <div className="text-xs text-gray-500 mt-1">
                                                            {row.kode}
                                                        </div>

                                                    </div>

                                                )}

                                            </td>

                                            {/* QTY */}
                                            <td className="px-4 py-4 text-center">

                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={row.qty}
                                                    onChange={(e) =>
                                                        handleItemChange(
                                                            index,
                                                            'qty',
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-24 h-10 rounded-xl border border-gray-300 text-center outline-none focus:border-indigo-500"
                                                />

                                                <div className="text-xs text-gray-500 mt-1">
                                                    {row.satuan}
                                                </div>

                                            </td>

                                            {/* PRICE */}
                                            <td className="px-4 py-4 text-right">

                                                <input
                                                    type="number"
                                                    value={row.harga}
                                                    onChange={(e) =>
                                                        handleItemChange(
                                                            index,
                                                            'harga',
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-36 h-10 rounded-xl border border-gray-300 px-3 text-right outline-none focus:border-indigo-500"
                                                />

                                            </td>

                                            {/* TOTAL */}
                                            <td className="px-4 py-4 text-right font-bold text-indigo-600">
                                                {formatRupiah(total)}
                                            </td>

                                            {/* ACTION */}
                                            <td className="px-4 py-4 text-center">

                                                <button
                                                    onClick={() =>
                                                        removeRow(index)
                                                    }
                                                    className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-red-500 hover:bg-red-50 transition"
                                                >
                                                    <Trash2 size={17} />
                                                </button>

                                            </td>

                                        </tr>

                                    );

                                })}

                            </tbody>

                        </table>

                    </div>

                </div>

                {/* ========================================== */}
                {/* SUMMARY */}
                {/* ========================================== */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    <div className="lg:col-span-2"></div>

                    <div className="bg-slate-900 rounded-2xl p-6 text-white">

                        <div className="flex items-center gap-2 mb-5">

                            <Calculator size={20} />

                            <h3 className="font-semibold">
                                Ringkasan Invoice
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
                        Simpan Account Payable
                    </button>

                </div>

            </div>

        </PortalLayout>
    );
}