import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';

import {
    ArrowLeft,
    Save,
    Plus,
    Trash2,
    ArrowRightLeft,
    Building2,
    Calendar,
    Package,
    Truck,
    ClipboardList,
    Wrench,
    Boxes,
    User,
    AlertTriangle,
    CheckCircle2,
    ClipboardCheck,
} from 'lucide-react';

// ==========================================
// MOCK ITEMS
// ==========================================
const MOCK_ITEMS = [
    {
        id: 1,
        kode: 'MAT-001',
        nama: 'Semen Tiga Roda 50KG',
        kategori: 'Material',
        stock: 120,
        satuan: 'Zak',
        kondisi: 'Baik',
    },
    {
        id: 2,
        kode: 'TLS-002',
        nama: 'Pacul Baja',
        kategori: 'Tools',
        stock: 15,
        satuan: 'Unit',
        kondisi: 'Baik',
    },
    {
        id: 3,
        kode: 'HVY-003',
        nama: 'Excavator CAT 320D',
        kategori: 'Alat Berat',
        stock: 2,
        satuan: 'Unit',
        kondisi: 'Baik',
    },
];

// ==========================================
// PAGE
// ==========================================
export default function CreateInterWarehouseTransfer() {

    const navigate = useNavigate();

    // ==========================================
    // FORM
    // ==========================================
    const [form, setForm] = useState({
        tipeTransfer: '',
        dariProject: '',
        tujuanProject: '',
        tanggalKebutuhan: '',
        kendaraan: '',
        driver: '',
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
            kategori: '',
            stock: 0,
            qty: 1,
            satuan: '',
            kondisi: '',
            keterangan: '',
        },
    ]);

    // ==========================================
    // HANDLE FORM
    // ==========================================
    const handleChange = (field, value) => {

        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // ==========================================
    // SELECT ITEM
    // ==========================================
    const handleSelectItem = (index, itemId) => {

        const selected = MOCK_ITEMS.find(
            (item) => item.id === parseInt(itemId)
        );

        const updated = [...items];

        if (!selected) {

            updated[index] = {
                itemId: '',
                kode: '',
                nama: '',
                kategori: '',
                stock: 0,
                qty: 1,
                satuan: '',
                kondisi: '',
                keterangan: '',
            };

            setItems(updated);

            return;
        }

        updated[index] = {
            ...updated[index],
            itemId: selected.id,
            kode: selected.kode,
            nama: selected.nama,
            kategori: selected.kategori,
            stock: selected.stock,
            qty: 1,
            satuan: selected.satuan,
            kondisi: selected.kondisi,
        };

        setItems(updated);
    };

    // ==========================================
    // HANDLE QTY
    // ==========================================
    const handleQtyChange = (index, value) => {

        const updated = [...items];

        updated[index].qty = value;

        setItems(updated);
    };

    // ==========================================
    // HANDLE NOTES
    // ==========================================
    const handleItemNotes = (index, value) => {

        const updated = [...items];

        updated[index].keterangan = value;

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
                kategori: '',
                stock: 0,
                qty: 1,
                satuan: '',
                kondisi: '',
                keterangan: '',
            },
        ]);
    };

    // ==========================================
    // REMOVE ROW
    // ==========================================
    const removeRow = (index) => {

        if (items.length === 1) return;

        const updated = [...items];

        updated.splice(index, 1);

        setItems(updated);
    };

    // ==========================================
    // CATEGORY BADGE
    // ==========================================
    const renderCategoryBadge = (category) => {

        if (category === 'Alat Berat') {
            return (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-red-50 text-red-700 border border-red-200 text-xs font-semibold">
                    <Truck size={11} />
                    Alat Berat
                </span>
            );
        }

        if (category === 'Tools') {
            return (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold">
                    <Wrench size={11} />
                    Tools
                </span>
            );
        }

        return (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-semibold">
                <Package size={11} />
                Material
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

                        <h1 className="text-2xl font-semibold text-gray-900">
                            Buat Pengajuan Transfer
                        </h1>

                        <div className="flex items-center gap-2 mt-1 text-sm">

                            <span className="text-gray-400">
                                Inventory & Warehouse
                            </span>

                            <span className="text-gray-300">/</span>

                            <span className="text-gray-400">
                                Inter Warehouse Transfer
                            </span>

                            <span className="text-gray-300">/</span>

                            <span className="text-indigo-600 font-medium">
                                Create Transfer Request
                            </span>

                        </div>

                    </div>

                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-gray-300 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 transition"
                    >
                        <ArrowLeft size={16} />
                        Kembali
                    </button>

                </div>

                {/* ========================================== */}
                {/* INFORMATION */}
                {/* ========================================== */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">

                    <div className="flex items-center gap-2 mb-5">

                        <ClipboardList
                            size={20}
                            className="text-indigo-600"
                        />

                        <div>

                            <h2 className="text-lg font-semibold text-gray-900">
                                Informasi Transfer
                            </h2>

                            <p className="text-sm text-gray-500">
                                Lengkapi data pengajuan transfer antar project / gudang
                            </p>

                        </div>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        {/* TYPE */}
                        <div>

                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Jenis Transfer
                            </label>

                            <select
                                value={form.tipeTransfer}
                                onChange={(e) =>
                                    handleChange('tipeTransfer', e.target.value)
                                }
                                className="w-full h-11 rounded-xl border border-gray-300 px-4 text-sm outline-none focus:border-indigo-500"
                            >
                                <option value="">
                                    Pilih Jenis Transfer
                                </option>

                                <option value="material">
                                    Transfer Material
                                </option>

                                <option value="tools">
                                    Peminjaman Tools
                                </option>

                                <option value="alat-berat">
                                    Peminjaman Alat Berat
                                </option>

                            </select>

                        </div>

                        {/* DATE */}
                        <div>

                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Tanggal Kebutuhan
                            </label>

                            <div className="relative">

                                <Calendar
                                    size={18}
                                    className="absolute left-3 top-3 text-gray-400"
                                />

                                <input
                                    type="date"
                                    value={form.tanggalKebutuhan}
                                    onChange={(e) =>
                                        handleChange('tanggalKebutuhan', e.target.value)
                                    }
                                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-300 text-sm outline-none focus:border-indigo-500"
                                />

                            </div>

                        </div>

                        {/* FROM */}
                        <div>

                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Dari Project / Gudang
                            </label>

                            <div className="relative">

                                <Building2
                                    size={18}
                                    className="absolute left-3 top-3 text-gray-400"
                                />

                                <select
                                    value={form.dariProject}
                                    onChange={(e) =>
                                        handleChange('dariProject', e.target.value)
                                    }
                                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-300 text-sm outline-none focus:border-indigo-500"
                                >
                                    <option value="">
                                        Pilih Project / Gudang
                                    </option>

                                    <option>Gudang Pusat</option>
                                    <option>Project Tol Cisumdawu</option>
                                    <option>Project Gedung DPR</option>

                                </select>

                            </div>

                        </div>

                        {/* TO */}
                        <div>

                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Tujuan Project
                            </label>

                            <div className="relative">

                                <ArrowRightLeft
                                    size={18}
                                    className="absolute left-3 top-3 text-gray-400"
                                />

                                <select
                                    value={form.tujuanProject}
                                    onChange={(e) =>
                                        handleChange('tujuanProject', e.target.value)
                                    }
                                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-300 text-sm outline-none focus:border-indigo-500"
                                >
                                    <option value="">
                                        Pilih Tujuan Project
                                    </option>

                                    <option>Project Apartemen Bandung</option>
                                    <option>Project Tol MBZ</option>
                                    <option>Project Gedung DPR</option>

                                </select>

                            </div>

                        </div>

                        {/* VEHICLE */}
                        <div>

                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Kendaraan Pengiriman
                            </label>

                            <div className="relative">

                                <Truck
                                    size={18}
                                    className="absolute left-3 top-3 text-gray-400"
                                />

                                <input
                                    type="text"
                                    placeholder="Contoh: Truck Colt Diesel"
                                    value={form.kendaraan}
                                    onChange={(e) =>
                                        handleChange('kendaraan', e.target.value)
                                    }
                                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-300 text-sm outline-none focus:border-indigo-500"
                                />

                            </div>

                        </div>

                        {/* DRIVER */}
                        <div>

                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Driver / PIC
                            </label>

                            <div className="relative">

                                <User
                                    size={18}
                                    className="absolute left-3 top-3 text-gray-400"
                                />

                                <input
                                    type="text"
                                    placeholder="Masukkan nama driver"
                                    value={form.driver}
                                    onChange={(e) =>
                                        handleChange('driver', e.target.value)
                                    }
                                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-300 text-sm outline-none focus:border-indigo-500"
                                />

                            </div>

                        </div>

                        {/* NOTES */}
                        <div className="md:col-span-2">

                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Catatan Transfer
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
                {/* DETAIL ITEM */}
                {/* ========================================== */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

                    <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">

                        <div className="flex items-center gap-2">

                            <ClipboardCheck
                                size={20}
                                className="text-indigo-600"
                            />

                            <div>

                                <h2 className="text-lg font-semibold text-gray-900">
                                    Detail Item Transfer
                                </h2>

                                <p className="text-sm text-gray-500">
                                    List barang / alat yang diajukan transfer
                                </p>

                            </div>

                        </div>

                        <button
                            onClick={addRow}
                            className="inline-flex items-center gap-2 h-10 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition"
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
                                        Kategori
                                    </th>

                                    <th className="px-4 py-4 text-center">
                                        Stock
                                    </th>

                                    <th className="px-4 py-4 text-center">
                                        Qty
                                    </th>

                                    <th className="px-4 py-4 text-center">
                                        Kondisi
                                    </th>

                                    <th className="px-4 py-4 text-left">
                                        Keterangan
                                    </th>

                                    <th className="px-4 py-4 text-center">
                                        Aksi
                                    </th>

                                </tr>

                            </thead>

                            <tbody className="divide-y divide-gray-200">

                                {items.map((item, index) => (

                                    <tr
                                        key={index}
                                        className="hover:bg-gray-50/50 transition"
                                    >

                                        {/* ITEM */}
                                        <td className="px-4 py-4 min-w-[320px] align-top">

                                            <select
                                                value={item.itemId}
                                                onChange={(e) =>
                                                    handleSelectItem(index, e.target.value)
                                                }
                                                className="w-full h-11 rounded-xl border border-gray-300 px-3 text-sm outline-none focus:border-indigo-500"
                                            >
                                                <option value="">
                                                    Pilih Item
                                                </option>

                                                {MOCK_ITEMS.map((row) => (

                                                    <option
                                                        key={row.id}
                                                        value={row.id}
                                                    >
                                                        {row.kode} - {row.nama}
                                                    </option>

                                                ))}

                                            </select>

                                            {item.nama && (

                                                <div className="mt-3">

                                                    <div className="font-semibold text-gray-900">
                                                        {item.nama}
                                                    </div>

                                                    <div className="text-xs text-gray-500 mt-1">
                                                        {item.kode}
                                                    </div>

                                                </div>

                                            )}

                                        </td>

                                        {/* CATEGORY */}
                                        <td className="px-4 py-4 text-center align-top">

                                            {item.kategori ? (
                                                renderCategoryBadge(item.kategori)
                                            ) : (
                                                <span className="text-xs text-gray-400">
                                                    -
                                                </span>
                                            )}

                                        </td>

                                        {/* STOCK */}
                                        <td className="px-4 py-4 text-center align-top">

                                            {item.stock > 0 ? (

                                                <>
                                                    <div className="font-bold text-gray-900">
                                                        {item.stock}
                                                    </div>

                                                    <div className="text-xs text-gray-500">
                                                        {item.satuan}
                                                    </div>
                                                </>

                                            ) : (

                                                <span className="text-xs text-gray-400">
                                                    -
                                                </span>

                                            )}

                                        </td>

                                        {/* QTY */}
                                        <td className="px-4 py-4 text-center align-top">

                                            <div className="flex flex-col items-center gap-1">

                                                <input
                                                    type="number"
                                                    min="1"
                                                    max={item.stock || 1}
                                                    value={item.qty}
                                                    onChange={(e) =>
                                                        handleQtyChange(index, e.target.value)
                                                    }
                                                    className="w-24 h-10 rounded-xl border border-gray-300 text-center outline-none focus:border-indigo-500"
                                                />

                                                {item.stock > 0 && Number(item.qty) > Number(item.stock) && (

                                                    <span className="text-[11px] text-red-500 font-medium">
                                                        Qty melebihi stock
                                                    </span>

                                                )}

                                            </div>

                                        </td>

                                        {/* CONDITION */}
                                        <td className="px-4 py-4 text-center align-top">

                                            {item.kondisi ? (

                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 border border-green-200 text-xs font-semibold">
                                                    <CheckCircle2 size={11} />
                                                    {item.kondisi}
                                                </span>

                                            ) : (

                                                <span className="text-xs text-gray-400">
                                                    -
                                                </span>

                                            )}

                                        </td>

                                        {/* NOTES */}
                                        <td className="px-4 py-4 min-w-[240px] align-top">

                                            <input
                                                type="text"
                                                value={item.keterangan}
                                                onChange={(e) =>
                                                    handleItemNotes(index, e.target.value)
                                                }
                                                placeholder="Keterangan item..."
                                                className="w-full h-10 rounded-xl border border-gray-300 px-3 text-sm outline-none focus:border-indigo-500"
                                            />

                                        </td>

                                        {/* ACTION */}
                                        <td className="px-4 py-4 text-center align-top">

                                            <button
                                                onClick={() => removeRow(index)}
                                                disabled={items.length === 1}
                                                className={`inline-flex items-center justify-center w-9 h-9 rounded-lg transition ${
                                                    items.length === 1
                                                        ? 'text-gray-300 cursor-not-allowed'
                                                        : 'text-red-500 hover:bg-red-50'
                                                }`}
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
                                Informasi Pengajuan Transfer
                            </h3>

                            <p className="text-sm text-amber-800 mt-1 leading-relaxed">
                                Pengajuan transfer wajib mendapatkan approval dari
                                Site Manager atau Kepala Gudang sebelum proses
                                pengiriman dilakukan.
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
                        Simpan Pengajuan Transfer
                    </button>

                </div>

            </div>

        </PortalLayout>
    );
}