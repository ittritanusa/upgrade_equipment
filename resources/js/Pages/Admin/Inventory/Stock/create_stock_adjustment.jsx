import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';

import {
    ArrowLeft,
    Save,
    Plus,
    Trash2,
    Package,
    Warehouse,
    FileText,
    AlertTriangle,
    Search,
    ClipboardList,
    Calculator,
} from 'lucide-react';

// ==========================================
// MOCK DATA ITEM
// ==========================================
const MOCK_ITEMS = [
    {
        id: 1,
        kode: 'BRG-001',
        nama: 'Semen Tiga Roda 50KG',
        stokSistem: 120,
        satuan: 'Zak',
        harga: 65000,
    },
    {
        id: 2,
        kode: 'BRG-002',
        nama: 'Besi Hollow 4x4',
        stokSistem: 80,
        satuan: 'Batang',
        harga: 120000,
    },
];

export default function CreateStockAdjustment() {
    const navigate = useNavigate();

    const [warehouse, setWarehouse] = useState('');
    const [reason, setReason] = useState('');
    const [notes, setNotes] = useState('');

    const [items, setItems] = useState([
        {
            itemId: '',
            kode: '',
            nama: '',
            stokSistem: 0,
            stokFisik: 0,
            selisih: 0,
            harga: 0,
            nilaiAdjustment: 0,
            satuan: '',
        },
    ]);

    // ==========================================
    // HANDLE PILIH ITEM
    // ==========================================
    const handleSelectItem = (index, itemId) => {
        const selected = MOCK_ITEMS.find((x) => x.id === parseInt(itemId));

        if (!selected) return;

        const updated = [...items];

        updated[index] = {
            ...updated[index],
            itemId: selected.id,
            kode: selected.kode,
            nama: selected.nama,
            stokSistem: selected.stokSistem,
            stokFisik: selected.stokSistem,
            selisih: 0,
            harga: selected.harga,
            nilaiAdjustment: 0,
            satuan: selected.satuan,
        };

        setItems(updated);
    };

    // ==========================================
    // HANDLE STOK FISIK
    // ==========================================
    const handleQtyChange = (index, value) => {
        const updated = [...items];

        updated[index].stokFisik = Number(value);

        const selisih =
            updated[index].stokFisik - updated[index].stokSistem;

        updated[index].selisih = selisih;

        updated[index].nilaiAdjustment =
            selisih * updated[index].harga;

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
                stokSistem: 0,
                stokFisik: 0,
                selisih: 0,
                harga: 0,
                nilaiAdjustment: 0,
                satuan: '',
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
    // TOTAL NILAI
    // ==========================================
    const totalAdjustment = items.reduce(
        (total, item) => total + item.nilaiAdjustment,
        0
    );

    return (
        <PortalLayout>
            <div className="space-y-6 w-full">

                {/* ========================================== */}
                {/* HEADER */}
                {/* ========================================== */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Buat Stock Adjustment
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
                                Buat Adjustment
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
                {/* FORM HEADER */}
                {/* ========================================== */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">

                    <div className="flex items-center gap-2 mb-5">
                        <ClipboardList size={20} className="text-indigo-600" />
                        <h2 className="text-lg font-semibold text-gray-900">
                            Informasi Adjustment
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        {/* Warehouse */}
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Gudang
                            </label>

                            <div className="relative">
                                <Warehouse
                                    size={18}
                                    className="absolute left-3 top-3 text-gray-400"
                                />

                                <select
                                    value={warehouse}
                                    onChange={(e) => setWarehouse(e.target.value)}
                                    className="w-full h-11 pl-10 pr-4 rounded-lg border border-gray-300 text-sm outline-none focus:border-indigo-500"
                                >
                                    <option value="">Pilih Gudang</option>
                                    <option value="GDG-01">GDG-01 - Gudang Utama</option>
                                    <option value="GDG-02">GDG-02 - Gudang Proyek</option>
                                    <option value="GDG-03">GDG-03 - Gudang Cabang</option>
                                </select>
                            </div>
                        </div>

                        {/* Reason */}
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Alasan Adjustment
                            </label>

                            <div className="relative">
                                <AlertTriangle
                                    size={18}
                                    className="absolute left-3 top-3 text-gray-400"
                                />

                                <select
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    className="w-full h-11 pl-10 pr-4 rounded-lg border border-gray-300 text-sm outline-none focus:border-indigo-500"
                                >
                                    <option value="">Pilih Alasan</option>
                                    <option value="stok-opname">
                                        Selisih Stock Opname
                                    </option>
                                    <option value="barang-rusak">
                                        Barang Rusak
                                    </option>
                                    <option value="kadaluarsa">
                                        Kadaluarsa / Afkir
                                    </option>
                                    <option value="kehilangan">
                                        Kehilangan Barang
                                    </option>
                                </select>
                            </div>
                        </div>

                        {/* Notes */}
                        <div className="md:col-span-2">
                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Catatan
                            </label>

                            <textarea
                                rows={4}
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Masukkan catatan adjustment..."
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-indigo-500"
                            />
                        </div>

                    </div>
                </div>

                {/* ========================================== */}
                {/* TABLE ITEM */}
                {/* ========================================== */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

                    {/* HEADER */}
                    <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
                        <div className="flex items-center gap-2">
                            <Package size={20} className="text-indigo-600" />

                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Detail Item Adjustment
                                </h2>
                                <p className="text-sm text-gray-500">
                                    Tambahkan item yang ingin disesuaikan
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={addRow}
                            className="inline-flex items-center gap-2 h-10 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition"
                        >
                            <Plus size={16} />
                            Tambah Item
                        </button>
                    </div>

                    {/* TABLE */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">

                            <thead className="bg-gray-50 border-b border-gray-200 uppercase text-xs tracking-wider text-gray-600">
                                <tr>
                                    <th className="px-4 py-4 text-left">
                                        Item
                                    </th>
                                    <th className="px-4 py-4 text-center">
                                        Stok Sistem
                                    </th>
                                    <th className="px-4 py-4 text-center">
                                        Stok Fisik
                                    </th>
                                    <th className="px-4 py-4 text-center">
                                        Selisih
                                    </th>
                                    <th className="px-4 py-4 text-right">
                                        Nilai Adjustment
                                    </th>
                                    <th className="px-4 py-4 text-center">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200">

                                {items.map((row, index) => (
                                    <tr key={index} className="hover:bg-gray-50/50">

                                        {/* ITEM */}
                                        <td className="px-4 py-4 min-w-[320px]">
                                            <select
                                                value={row.itemId}
                                                onChange={(e) =>
                                                    handleSelectItem(index, e.target.value)
                                                }
                                                className="w-full h-11 rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-indigo-500"
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
                                                <div className="mt-2 text-xs text-gray-500">
                                                    {row.kode} • {row.satuan}
                                                </div>
                                            )}
                                        </td>

                                        {/* STOK SISTEM */}
                                        <td className="px-4 py-4 text-center">
                                            <div className="font-semibold text-gray-800">
                                                {row.stokSistem}
                                            </div>
                                        </td>

                                        {/* STOK FISIK */}
                                        <td className="px-4 py-4 text-center">
                                            <input
                                                type="number"
                                                value={row.stokFisik}
                                                onChange={(e) =>
                                                    handleQtyChange(index, e.target.value)
                                                }
                                                className="w-24 h-10 rounded-lg border border-gray-300 text-center outline-none focus:border-indigo-500"
                                            />
                                        </td>

                                        {/* SELISIH */}
                                        <td className="px-4 py-4 text-center">
                                            <span
                                                className={`font-bold ${
                                                    row.selisih > 0
                                                        ? 'text-emerald-600'
                                                        : row.selisih < 0
                                                        ? 'text-red-600'
                                                        : 'text-gray-500'
                                                }`}
                                            >
                                                {row.selisih > 0 ? '+' : ''}
                                                {row.selisih}
                                            </span>
                                        </td>

                                        {/* NILAI */}
                                        <td
                                            className={`px-4 py-4 text-right font-mono font-bold ${
                                                row.nilaiAdjustment >= 0
                                                    ? 'text-emerald-600'
                                                    : 'text-red-600'
                                            }`}
                                        >
                                            {row.nilaiAdjustment.toLocaleString(
                                                'id-ID',
                                                {
                                                    style: 'currency',
                                                    currency: 'IDR',
                                                    minimumFractionDigits: 0,
                                                }
                                            )}
                                        </td>

                                        {/* ACTION */}
                                        <td className="px-4 py-4 text-center">
                                            <button
                                                onClick={() => removeRow(index)}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                                            >
                                                <Trash2 size={18} />
                                            </button>
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

                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">
                                    Total Item
                                </span>

                                <span className="font-semibold text-gray-900">
                                    {items.length} SKU
                                </span>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">
                                    Total Dampak Finansial
                                </span>

                                <span
                                    className={`font-bold text-lg ${
                                        totalAdjustment >= 0
                                            ? 'text-emerald-600'
                                            : 'text-red-600'
                                    }`}
                                >
                                    {totalAdjustment.toLocaleString('id-ID', {
                                        style: 'currency',
                                        currency: 'IDR',
                                        minimumFractionDigits: 0,
                                    })}
                                </span>
                            </div>

                        </div>

                    </div>

                </div>

                {/* ========================================== */}
                {/* ACTION BUTTON */}
                {/* ========================================== */}
                <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-2">

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
                        Simpan Adjustment
                    </button>

                </div>

            </div>
        </PortalLayout>
    );
}