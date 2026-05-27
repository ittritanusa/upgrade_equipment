import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';

import {
    ArrowLeft,
    Save,
    FileText,
    Calendar,
    Building2,
    User,
    Receipt,
    Wallet,
    CreditCard,
    Landmark,
    Package,
    Plus,
    Trash2,
    CheckCircle2,
    AlertTriangle,
    Calculator,
} from 'lucide-react';

// ==========================================
// MOCK PROJECT
// ==========================================
const PROJECTS = [
    {
        id: 1,
        nama: 'Project Tol Cisumdawu',
        customer: 'PT Wijaya Karya Infrastruktur',
        picCustomer: 'Budi Santoso',
        alamat: 'Bandung, Jawa Barat',
    },
    {
        id: 2,
        nama: 'Project Gedung DPR RI',
        customer: 'PT Adhi Persada Gedung',
        picCustomer: 'Andi Saputra',
        alamat: 'Jakarta Pusat',
    },
    {
        id: 3,
        nama: 'Project Apartemen Skyline',
        customer: 'PT Modern Land',
        picCustomer: 'Rizky Maulana',
        alamat: 'Tangerang Selatan',
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
        qty: 250,
        satuan: 'Zak',
        harga: 72000,
    },
    {
        id: 2,
        kode: 'MAT-002',
        nama: 'Besi Beton 12mm',
        qty: 120,
        satuan: 'Batang',
        harga: 145000,
    },
    {
        id: 3,
        kode: 'SRV-001',
        nama: 'Jasa Pekerjaan Struktur',
        qty: 1,
        satuan: 'Lot',
        harga: 125000000,
    },
];

// ==========================================
// COMPONENT
// ==========================================
export default function CreateInvoice() {

    const navigate = useNavigate();

    // ==========================================
    // FORM HEADER
    // ==========================================
    const [form, setForm] = useState({
        nomorInvoice: 'INV-2026-00021',
        tanggalInvoice: '',
        jatuhTempo: '',
        projectId: '',
        customer: '',
        picCustomer: '',
        paymentMethod: '',
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
    // HANDLE HEADER
    // ==========================================
    const handleChange = (field, value) => {

        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // ==========================================
    // HANDLE PROJECT
    // ==========================================
    const handleProjectChange = (projectId) => {

        const selectedProject = PROJECTS.find(
            (project) => project.id === parseInt(projectId)
        );

        if (!selectedProject) {
            setForm((prev) => ({
                ...prev,
                projectId: '',
                customer: '',
                picCustomer: '',
            }));

            return;
        }

        setForm((prev) => ({
            ...prev,
            projectId,
            customer: selectedProject.customer,
            picCustomer: selectedProject.picCustomer,
        }));
    };

    // ==========================================
    // HANDLE SELECT ITEM
    // ==========================================
    const handleSelectItem = (index, itemId) => {

        const selectedItem = MOCK_ITEMS.find(
            (item) => item.id === parseInt(itemId)
        );

        if (!selectedItem) return;

        const updated = [...items];

        updated[index] = {
            ...updated[index],
            itemId: selectedItem.id,
            kode: selectedItem.kode,
            nama: selectedItem.nama,
            qty: selectedItem.qty,
            satuan: selectedItem.satuan,
            harga: selectedItem.harga,
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
    // TOTAL
    // ==========================================
    const subtotal = useMemo(() => {

        return items.reduce((sum, item) => {

            const total =
                (parseFloat(item.qty) || 0) *
                (parseFloat(item.harga) || 0);

            return sum + total;

        }, 0);

    }, [items]);

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

    return (
        <PortalLayout>

            <div className="space-y-6">

                {/* ========================================== */}
                {/* HEADER */}
                {/* ========================================== */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                    <div>

                        <h1 className="text-2xl font-semibold text-gray-900">
                            Create Invoice
                        </h1>

                        <div className="flex items-center gap-2 mt-1 text-sm">

                            <span className="text-gray-400">
                                Accounting & Finance
                            </span>

                            <span className="text-gray-300">/</span>

                            <span className="text-gray-400">
                                Account Receivable
                            </span>

                            <span className="text-gray-300">/</span>

                            <span className="text-indigo-600 font-medium">
                                Create Invoice
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
                {/* FORM HEADER */}
                {/* ========================================== */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">

                    <div className="flex items-center gap-2 mb-6">

                        <Receipt
                            size={20}
                            className="text-indigo-600"
                        />

                        <div>

                            <h2 className="text-lg font-semibold text-gray-900">
                                Informasi Invoice
                            </h2>

                            <p className="text-sm text-gray-500">
                                Lengkapi data invoice project customer
                            </p>

                        </div>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        {/* NOMOR */}
                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nomor Invoice
                            </label>

                            <div className="relative">

                                <FileText
                                    size={18}
                                    className="absolute left-3 top-3 text-gray-400"
                                />

                                <input
                                    type="text"
                                    value={form.nomorInvoice}
                                    onChange={(e) =>
                                        handleChange('nomorInvoice', e.target.value)
                                    }
                                    className="w-full h-11 rounded-xl border border-gray-300 pl-10 pr-4 text-sm outline-none focus:border-indigo-500"
                                />

                            </div>

                        </div>

                        {/* PROJECT */}
                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Project
                            </label>

                            <div className="relative">

                                <Building2
                                    size={18}
                                    className="absolute left-3 top-3 text-gray-400"
                                />

                                <select
                                    value={form.projectId}
                                    onChange={(e) =>
                                        handleProjectChange(e.target.value)
                                    }
                                    className="w-full h-11 rounded-xl border border-gray-300 pl-10 pr-4 text-sm outline-none focus:border-indigo-500"
                                >
                                    <option value="">
                                        Pilih Project
                                    </option>

                                    {PROJECTS.map((project) => (

                                        <option
                                            key={project.id}
                                            value={project.id}
                                        >
                                            {project.nama}
                                        </option>

                                    ))}

                                </select>

                            </div>

                        </div>

                        {/* CUSTOMER */}
                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Customer
                            </label>

                            <div className="relative">

                                <Landmark
                                    size={18}
                                    className="absolute left-3 top-3 text-gray-400"
                                />

                                <input
                                    type="text"
                                    value={form.customer}
                                    readOnly
                                    placeholder="Otomatis muncul dari project"
                                    className="w-full h-11 rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm text-gray-700"
                                />

                            </div>

                        </div>

                        {/* PIC */}
                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                PIC Customer
                            </label>

                            <div className="relative">

                                <User
                                    size={18}
                                    className="absolute left-3 top-3 text-gray-400"
                                />

                                <input
                                    type="text"
                                    value={form.picCustomer}
                                    readOnly
                                    placeholder="Otomatis muncul dari project"
                                    className="w-full h-11 rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm text-gray-700"
                                />

                            </div>

                        </div>

                        {/* DATE */}
                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tanggal Invoice
                            </label>

                            <div className="relative">

                                <Calendar
                                    size={18}
                                    className="absolute left-3 top-3 text-gray-400"
                                />

                                <input
                                    type="date"
                                    value={form.tanggalInvoice}
                                    onChange={(e) =>
                                        handleChange('tanggalInvoice', e.target.value)
                                    }
                                    className="w-full h-11 rounded-xl border border-gray-300 pl-10 pr-4 text-sm outline-none focus:border-indigo-500"
                                />

                            </div>

                        </div>

                        {/* DUE DATE */}
                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Jatuh Tempo
                            </label>

                            <div className="relative">

                                <Calendar
                                    size={18}
                                    className="absolute left-3 top-3 text-gray-400"
                                />

                                <input
                                    type="date"
                                    value={form.jatuhTempo}
                                    onChange={(e) =>
                                        handleChange('jatuhTempo', e.target.value)
                                    }
                                    className="w-full h-11 rounded-xl border border-gray-300 pl-10 pr-4 text-sm outline-none focus:border-indigo-500"
                                />

                            </div>

                        </div>

                        {/* PAYMENT */}
                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Payment Method
                            </label>

                            <div className="relative">

                                <CreditCard
                                    size={18}
                                    className="absolute left-3 top-3 text-gray-400"
                                />

                                <select
                                    value={form.paymentMethod}
                                    onChange={(e) =>
                                        handleChange('paymentMethod', e.target.value)
                                    }
                                    className="w-full h-11 rounded-xl border border-gray-300 pl-10 pr-4 text-sm outline-none focus:border-indigo-500"
                                >
                                    <option value="">
                                        Pilih Payment Method
                                    </option>

                                    <option value="bank-transfer">
                                        Bank Transfer
                                    </option>

                                    <option value="cash">
                                        Cash
                                    </option>

                                    <option value="giro">
                                        Giro
                                    </option>

                                </select>

                            </div>

                        </div>

                        {/* NOTES */}
                        <div className="md:col-span-2">

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Catatan Invoice
                            </label>

                            <textarea
                                rows={4}
                                value={form.notes}
                                onChange={(e) =>
                                    handleChange('notes', e.target.value)
                                }
                                placeholder="Masukkan catatan invoice..."
                                className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-indigo-500"
                            />

                        </div>

                    </div>

                </div>

                {/* ========================================== */}
                {/* DETAIL ITEM */}
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
                                    Detail Invoice Item
                                </h2>

                                <p className="text-sm text-gray-500">
                                    Tambahkan item pekerjaan atau material
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

                                    <th className="px-4 py-4 text-center">
                                        Harga
                                    </th>

                                    <th className="px-4 py-4 text-center">
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
                                        (parseFloat(row.qty) || 0) *
                                        (parseFloat(row.harga) || 0);

                                    return (

                                        <tr key={index}>

                                            {/* ITEM */}
                                            <td className="px-4 py-4 min-w-[340px]">

                                                <select
                                                    value={row.itemId}
                                                    onChange={(e) =>
                                                        handleSelectItem(index, e.target.value)
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

                                                        <div className="font-semibold text-gray-900">
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
                                                        handleItemChange(index, 'qty', e.target.value)
                                                    }
                                                    className="w-24 h-10 rounded-xl border border-gray-300 text-center outline-none focus:border-indigo-500"
                                                />

                                                <div className="text-xs text-gray-500 mt-1">
                                                    {row.satuan}
                                                </div>

                                            </td>

                                            {/* PRICE */}
                                            <td className="px-4 py-4 text-center">

                                                <input
                                                    type="number"
                                                    value={row.harga}
                                                    onChange={(e) =>
                                                        handleItemChange(index, 'harga', e.target.value)
                                                    }
                                                    className="w-40 h-10 rounded-xl border border-gray-300 px-3 text-sm text-right outline-none focus:border-indigo-500"
                                                />

                                            </td>

                                            {/* TOTAL */}
                                            <td className="px-4 py-4 text-center font-bold text-indigo-600 whitespace-nowrap">
                                                {formatRupiah(total)}
                                            </td>

                                            {/* ACTION */}
                                            <td className="px-4 py-4 text-center">

                                                <button
                                                    onClick={() => removeRow(index)}
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

                    {/* ALERT */}
                    <div className="lg:col-span-2 bg-amber-50 border border-amber-200 rounded-2xl p-5">

                        <div className="flex items-start gap-3">

                            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">

                                <AlertTriangle
                                    size={20}
                                    className="text-amber-700"
                                />

                            </div>

                            <div>

                                <h3 className="font-semibold text-amber-900">
                                    Informasi Invoice
                                </h3>

                                <p className="text-sm text-amber-800 mt-1 leading-relaxed">
                                    Pastikan nilai invoice dan item pekerjaan
                                    sudah sesuai sebelum invoice dikirim ke customer.
                                </p>

                            </div>

                        </div>

                    </div>

                    {/* TOTAL */}
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

                            <div className="border-t border-slate-700 pt-4 flex items-center justify-between">

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
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-sm transition"
                    >
                        <Save size={18} />
                        Save Invoice
                    </button>

                </div>

            </div>

        </PortalLayout>
    );
}