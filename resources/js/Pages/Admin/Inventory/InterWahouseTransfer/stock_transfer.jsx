import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';

import {
    Search,
    Plus,
    ArrowRightLeft,
    Building2,
    Package,
    Truck,
    Calendar,
    Printer,
    Filter,
    Clock3,
    CheckCircle2,
    AlertTriangle,
    Eye,
    ClipboardList,
    Wrench,
    Hammer,
} from 'lucide-react';

// ==========================================
// MOCK DATA
// ==========================================
const MOCK_TRANSFER = [
    {
        id: 1,
        noDoc: 'IWT-2026-00021',
        tanggal: '2026-05-28',
        dari: 'Project Gedung DPR',
        tujuan: 'Project Tol Cisumdawu',
        category: 'Material',
        totalItem: 5,
        status: 'Approved',
        kendaraan: 'Truck Colt Diesel',
    },
    {
        id: 2,
        noDoc: 'IWT-2026-00022',
        tanggal: '2026-05-27',
        dari: 'Gudang Pusat',
        tujuan: 'Project Apartemen Bandung',
        category: 'Alat Berat',
        totalItem: 1,
        status: 'On Delivery',
        kendaraan: 'Lowbed Trailer',
    },
    {
        id: 3,
        noDoc: 'IWT-2026-00023',
        tanggal: '2026-05-26',
        dari: 'Project Tol MBZ',
        tujuan: 'Project Gedung DPR',
        category: 'Tools',
        totalItem: 8,
        status: 'Pending',
        kendaraan: '-',
    },
];

export default function InterWarehouseTransfer() {

    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');

    // ==========================================
    // STATUS BADGE
    // ==========================================
    const renderStatus = (status) => {

        if (status === 'Approved') {
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-200">
                    <CheckCircle2 size={12} />
                    Approved
                </span>
            );
        }

        if (status === 'On Delivery') {
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                    <Truck size={12} />
                    On Delivery
                </span>
            );
        }

        return (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                <Clock3 size={12} />
                Pending
            </span>
        );
    };

    // ==========================================
    // CATEGORY BADGE
    // ==========================================
    const renderCategory = (category) => {

        if (category === 'Alat Berat') {
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-red-50 text-red-700 border border-red-200 text-xs font-semibold">
                    <Truck size={12} />
                    Alat Berat
                </span>
            );
        }

        if (category === 'Tools') {
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold">
                    <Wrench size={12} />
                    Tools
                </span>
            );
        }

        return (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-semibold">
                <Package size={12} />
                Material
            </span>
        );
    };

    return (
        <PortalLayout>

            <div className="space-y-6 w-full">

                {/* ========================================== */}
                {/* PAGE HEADER */}
                {/* ========================================== */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Inter Warehouse Transfer
                        </h1>

                        <div className="flex items-center gap-2 mt-1 text-sm">
                            <span className="text-gray-400">
                                Inventory & Warehouse
                            </span>

                            <span className="text-gray-300">/</span>

                            <span className="text-indigo-600 font-medium">
                                Inter Warehouse Transfer
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate('/portal/inventory/inter-warehouse-transfer/create')}
                        className="inline-flex items-center gap-2 h-11 px-5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-sm transition"
                    >
                        <Plus size={18} />
                        Buat Pengajuan Transfer
                    </button>

                </div>

                {/* ========================================== */}
                {/* SUMMARY CARD */}
                {/* ========================================== */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

                    {/* TOTAL REQUEST */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">

                        <div className="flex items-start justify-between">

                            <div>
                                <div className="text-sm text-gray-500">
                                    Total Transfer
                                </div>

                                <div className="mt-2 text-3xl font-bold text-gray-900">
                                    148
                                </div>
                            </div>

                            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center">
                                <ArrowRightLeft size={22} className="text-indigo-600" />
                            </div>

                        </div>

                    </div>

                    {/* PENDING */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">

                        <div className="flex items-start justify-between">

                            <div>
                                <div className="text-sm text-gray-500">
                                    Pending Approval
                                </div>

                                <div className="mt-2 text-3xl font-bold text-amber-600">
                                    12
                                </div>
                            </div>

                            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center">
                                <Clock3 size={22} className="text-amber-600" />
                            </div>

                        </div>

                    </div>

                    {/* DELIVERY */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">

                        <div className="flex items-start justify-between">

                            <div>
                                <div className="text-sm text-gray-500">
                                    On Delivery
                                </div>

                                <div className="mt-2 text-3xl font-bold text-blue-600">
                                    8
                                </div>
                            </div>

                            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
                                <Truck size={22} className="text-blue-600" />
                            </div>

                        </div>

                    </div>

                    {/* TOOLS */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">

                        <div className="flex items-start justify-between">

                            <div>
                                <div className="text-sm text-gray-500">
                                    Alat Dipinjam
                                </div>

                                <div className="mt-2 text-3xl font-bold text-red-600">
                                    21
                                </div>
                            </div>

                            <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center">
                                <Hammer size={22} className="text-red-600" />
                            </div>

                        </div>

                    </div>

                </div>

                {/* ========================================== */}
                {/* FILTER */}
                {/* ========================================== */}
                <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">

                    <div className="flex flex-col lg:flex-row gap-3">

                        {/* SEARCH */}
                        <div className="relative flex-1">

                            <Search
                                size={18}
                                className="absolute left-3 top-3 text-gray-400"
                            />

                            <input
                                type="text"
                                placeholder="Cari nomor dokumen, project, atau kendaraan..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-300 text-sm outline-none focus:border-indigo-500"
                            />

                        </div>

                        {/* FILTER STATUS */}
                        <select
                            className="h-11 px-4 rounded-xl border border-gray-300 text-sm outline-none focus:border-indigo-500"
                        >
                            <option>Semua Status</option>
                            <option>Pending</option>
                            <option>Approved</option>
                            <option>On Delivery</option>
                            <option>Completed</option>
                        </select>

                        {/* FILTER CATEGORY */}
                        <select
                            className="h-11 px-4 rounded-xl border border-gray-300 text-sm outline-none focus:border-indigo-500"
                        >
                            <option>Semua Kategori</option>
                            <option>Material</option>
                            <option>Tools</option>
                            <option>Alat Berat</option>
                        </select>

                        {/* DATE */}
                        <button
                            className="inline-flex items-center justify-center gap-2 h-11 px-4 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            <Calendar size={16} />
                            Periode
                        </button>

                    </div>

                </div>

                {/* ========================================== */}
                {/* TABLE */}
                {/* ========================================== */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

                    <div className="overflow-x-auto">

                        <table className="min-w-full text-sm">

                            <thead className="bg-gray-50 border-b border-gray-200 uppercase text-xs tracking-wider text-gray-600">

                                <tr>
                                    <th className="px-6 py-4 text-left">
                                        Dokumen
                                    </th>

                                    <th className="px-6 py-4 text-left">
                                        Transfer Project
                                    </th>

                                    <th className="px-6 py-4 text-center">
                                        Kategori
                                    </th>

                                    <th className="px-6 py-4 text-center">
                                        Total Item
                                    </th>

                                    <th className="px-6 py-4 text-left">
                                        Kendaraan
                                    </th>

                                    <th className="px-6 py-4 text-center">
                                        Status
                                    </th>

                                    <th className="px-6 py-4 text-center">
                                        Aksi
                                    </th>
                                </tr>

                            </thead>

                            <tbody className="divide-y divide-gray-200 bg-white">

                                {MOCK_TRANSFER.map((item) => (

                                    <tr
                                        key={item.id}
                                        className="hover:bg-gray-50/50 transition"
                                    >

                                        {/* DOC */}
                                        <td className="px-6 py-4">

                                            <div className="font-mono font-bold text-indigo-600">
                                                {item.noDoc}
                                            </div>

                                            <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                                                <Calendar size={12} />
                                                {item.tanggal}
                                            </div>

                                        </td>

                                        {/* PROJECT */}
                                        <td className="px-6 py-4">

                                            <div className="flex items-center gap-2">

                                                <Building2
                                                    size={15}
                                                    className="text-gray-400"
                                                />

                                                <div>

                                                    <div className="font-semibold text-gray-900">
                                                        {item.dari}
                                                    </div>

                                                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                                        <ArrowRightLeft size={11} />
                                                        {item.tujuan}
                                                    </div>

                                                </div>

                                            </div>

                                        </td>

                                        {/* CATEGORY */}
                                        <td className="px-6 py-4 text-center">
                                            {renderCategory(item.category)}
                                        </td>

                                        {/* TOTAL */}
                                        <td className="px-6 py-4 text-center font-semibold text-gray-900">
                                            {item.totalItem} Item
                                        </td>

                                        {/* VEHICLE */}
                                        <td className="px-6 py-4 text-gray-700">
                                            {item.kendaraan}
                                        </td>

                                        {/* STATUS */}
                                        <td className="px-6 py-4 text-center">
                                            {renderStatus(item.status)}
                                        </td>

                                        {/* ACTION */}
                                        <td className="px-6 py-4 text-center">

                                            <button
                                                onClick={() =>
                                                    navigate(`/portal/inventory/inter-warehouse-transfer/detail`)
                                                }
                                                className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200 text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition"
                                            >
                                                <Eye size={17} />
                                            </button>

                                            <button
                                                onClick={() =>
                                                    navigate(`/portal/inventory/inter-warehouse-transfer/print`)
                                                }
                                                className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200 text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition"
                                            >
                                                <Printer size={17} />
                                            </button>
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </PortalLayout>
    );
}