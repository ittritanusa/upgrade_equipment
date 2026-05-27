import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';

import {
    ArrowLeft,
    Save,
    FileText,
    Calendar,
    Building2,
    User,
    Phone,
    ClipboardList,
    Package,
    Plus,
    Trash2,
    DollarSign,
    ReceiptText,
    AlertTriangle,
    CheckCircle2,
} from 'lucide-react';

// ==========================================
// DUMMY PROJECT DATA
// ==========================================
const PROJECTS = [
    {
        id: 1,
        namaProject: 'Project Gedung DPR RI',
        customer: 'PT Wijaya Karya',
        picCustomer: 'Budi Santoso',
        noHpPic: '0812-7788-9900',
        alamat: 'Jakarta Pusat',
    },
    {
        id: 2,
        namaProject: 'Project Tol Cisumdawu',
        customer: 'PT Hutama Karya',
        picCustomer: 'Andi Pratama',
        noHpPic: '0813-8899-6677',
        alamat: 'Bandung',
    },
    {
        id: 3,
        namaProject: 'Project Apartemen Grand City',
        customer: 'PT PP Properti',
        picCustomer: 'Rizky Maulana',
        noHpPic: '0819-2211-6677',
        alamat: 'Surabaya',
    },
];

// ==========================================
// DUMMY ITEM
// ==========================================
const ITEMS = [
    {
        id: 1,
        kode: 'MAT-001',
        nama: 'Semen Tiga Roda 50KG',
        harga: 75000,
        satuan: 'Zak',
    },
    {
        id: 2,
        kode: 'MAT-002',
        nama: 'Besi Hollow 4x4',
        harga: 145000,
        satuan: 'Batang',
    },
    {
        id: 3,
        kode: 'SRV-003',
        nama: 'Jasa Pemasangan Bekisting',
        harga: 3500000,
        satuan: 'Lot',
    },
];

// ==========================================
// PAGE
// ==========================================
export default function EditInvoicePage() {

    const navigate = useNavigate();
    const { id } = useParams();

    // ==========================================
    // FORM STATE
    // ==========================================
    const [form, setForm] = useState({
        nomorInvoice: `INV-2026-00${id}`,
        tanggalInvoice: '2026-05-28',
        dueDate: '2026-06-15',

        projectId: 2,
        namaProject: 'Project Tol Cisumdawu',

        customer: 'PT Hutama Karya',
        picCustomer: 'Andi Pratama',
        noHpPic: '0813-8899-6677',
        alamatCustomer: 'Bandung',

        paymentTerm: '30 Hari',
        status: 'Draft',

        notes:
            'Invoice progress pekerjaan termin 2 pembangunan proyek jalan tol.',
    });

    // ==========================================
    // ITEMS
    // ==========================================
    const [items, setItems] = useState([
        {
            itemId: 1,
            kode: 'MAT-001',
            nama: 'Semen Tiga Roda 50KG',
            qty: 100,
            harga: 75000,
            satuan: 'Zak',
            subtotal: 7500000,
        },
        {
            itemId: 3,
            kode: 'SRV-003',
            nama: 'Jasa Pemasangan Bekisting',
            qty: 1,
            harga: 3500000,
            satuan: 'Lot',
            subtotal: 3500000,
        },
    ]);

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
    // HANDLE PROJECT
    // ==========================================
    const handleProjectChange = (projectId) => {

        const selected = PROJECTS.find(
            (x) => x.id === parseInt(projectId)
        );

        if (!selected) return;

        setForm({
            ...form,
            projectId: selected.id,
            namaProject: selected.namaProject,
            customer: selected.customer,
            picCustomer: selected.picCustomer,
            noHpPic: selected.noHpPic,
            alamatCustomer: selected.alamat,
        });
    };

    // ==========================================
    // HANDLE SELECT ITEM
    // ==========================================
    const handleSelectItem = (index, itemId) => {

        const selected = ITEMS.find(
            (x) => x.id === parseInt(itemId)
        );

        if (!selected) return;

        const updated = [...items];

        updated[index] = {
            ...updated[index],
            itemId: selected.id,
            kode: selected.kode,
            nama: selected.nama,
            harga: selected.harga,
            satuan: selected.satuan,
            qty: 1,
            subtotal: selected.harga,
        };

        setItems(updated);
    };

    // ==========================================
    // HANDLE ITEM CHANGE
    // ==========================================
    const handleItemChange = (index, field, value) => {

        const updated = [...items];

        updated[index][field] = value;

        const qty = parseFloat(updated[index].qty || 0);
        const harga = parseFloat(updated[index].harga || 0);

        updated[index].subtotal = qty * harga;

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
                harga: 0,
                satuan: '',
                subtotal: 0,
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
    const formatRupiah = (angka) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(angka || 0);
    };

    // ==========================================
    // TOTAL
    // ==========================================
    const grandTotal = items.reduce(
        (sum, item) => sum + item.subtotal,
        0
    );

    return (
        <PortalLayout>

            <div className="space-y-6">

                {/* ========================================== */}
                {/* HEADER */}
                {/* ========================================== */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                    <div>

                        <h1 className="text-2xl font-semibold text-gray-900">
                            Edit Invoice
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
                                Edit Invoice
                            </span>

                        </div>

                    </div>

                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 h-11 px-5 rounded-xl border border-gray-300 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 transition"
                    >
                        <ArrowLeft size={17} />
                        Kembali
                    </button>

                </div>

                {/* ========================================== */}
                {/* INFORMASI INVOICE */}
                {/* ========================================== */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">

                    <div className="flex items-center gap-2 mb-6">

                        <ReceiptText
                            size={20}
                            className="text-indigo-600"
                        />

                        <div>

                            <h2 className="text-lg font-semibold text-gray-900">
                                Informasi Invoice
                            </h2>

                            <p className="text-sm text-gray-500">
                                Form edit invoice account receivable
                            </p>

                        </div>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        {/* NOMOR */}
                        <div>

                            <label className="text-sm font-medium text-gray-700 mb-2 block">
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
                                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-300 text-sm outline-none focus:border-indigo-500"
                                />

                            </div>

                        </div>

                        {/* PROJECT */}
                        <div>

                            <label className="text-sm font-medium text-gray-700 mb-2 block">
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
                                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-300 text-sm outline-none focus:border-indigo-500"
                                >
                                    <option value="">
                                        Pilih Project
                                    </option>

                                    {PROJECTS.map((project) => (

                                        <option
                                            key={project.id}
                                            value={project.id}
                                        >
                                            {project.namaProject}
                                        </option>

                                    ))}

                                </select>

                            </div>

                        </div>

                        {/* CUSTOMER */}
                        <div>

                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Customer
                            </label>

                            <div className="h-11 px-4 rounded-xl border border-gray-200 bg-gray-50 flex items-center text-sm font-semibold text-gray-800">
                                {form.customer || '-'}
                            </div>

                        </div>

                        {/* PIC */}
                        <div>

                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                PIC Customer
                            </label>

                            <div className="h-11 px-4 rounded-xl border border-gray-200 bg-gray-50 flex items-center text-sm font-semibold text-gray-800">
                                {form.picCustomer || '-'}
                            </div>

                        </div>

                        {/* TANGGAL */}
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
                                    value={form.tanggalInvoice}
                                    onChange={(e) =>
                                        handleChange('tanggalInvoice', e.target.value)
                                    }
                                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-300 text-sm outline-none focus:border-indigo-500"
                                />

                            </div>

                        </div>

                        {/* DUE DATE */}
                        <div>

                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Due Date
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
                                        handleChange('dueDate', e.target.value)
                                    }
                                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-300 text-sm outline-none focus:border-indigo-500"
                                />

                            </div>

                        </div>

                        {/* NOTES */}
                        <div className="md:col-span-2">

                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Catatan Invoice
                            </label>

                            <textarea
                                rows={4}
                                value={form.notes}
                                onChange={(e) =>
                                    handleChange('notes', e.target.value)
                                }
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

                            <ClipboardList
                                size={20}
                                className="text-indigo-600"
                            />

                            <div>

                                <h2 className="text-lg font-semibold text-gray-900">
                                    Detail Item Invoice
                                </h2>

                                <p className="text-sm text-gray-500">
                                    List item penagihan invoice project
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
                                        Subtotal
                                    </th>

                                    <th className="px-4 py-4 text-center">
                                        Aksi
                                    </th>

                                </tr>

                            </thead>

                            <tbody className="divide-y divide-gray-200">

                                {items.map((row, index) => (

                                    <tr key={index}>

                                        {/* ITEM */}
                                        <td className="px-4 py-4 min-w-[320px]">

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

                                                {ITEMS.map((item) => (

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

                                        {/* HARGA */}
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
                                                className="w-40 h-10 rounded-xl border border-gray-300 px-3 text-right outline-none focus:border-indigo-500"
                                            />

                                        </td>

                                        {/* SUBTOTAL */}
                                        <td className="px-4 py-4 text-right font-bold text-indigo-600">
                                            {formatRupiah(row.subtotal)}
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

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

                {/* ========================================== */}
                {/* TOTAL */}
                {/* ========================================== */}
                <div className="flex justify-end">

                    <div className="w-full max-w-md bg-slate-900 text-white rounded-2xl p-6 shadow-sm">

                        <div className="flex items-center justify-between">

                            <div className="flex items-center gap-2">

                                <DollarSign size={20} />

                                <span className="text-sm font-semibold">
                                    Grand Total Invoice
                                </span>

                            </div>

                            <div className="text-2xl font-black">
                                {formatRupiah(grandTotal)}
                            </div>

                        </div>

                    </div>

                </div>

                {/* ========================================== */}
                {/* ALERT */}
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
                                Informasi Invoice
                            </h3>

                            <p className="text-sm text-amber-800 mt-1 leading-relaxed">
                                Pastikan data invoice, customer, dan nilai tagihan
                                sudah sesuai sebelum dilakukan approval dan pengiriman invoice ke customer.
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
                        Update Invoice
                    </button>

                </div>

            </div>

        </PortalLayout>
    );
}