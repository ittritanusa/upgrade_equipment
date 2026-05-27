import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';

import {
    Warehouse,
    Search,
    Plus,
    Filter,
    Building2,
    Package,
    MapPin,
    Boxes,
    Truck,
    ShieldCheck,
    AlertTriangle,
    Eye,
    Pencil,
    Trash2,
    ChevronRight,
    ArrowUpRight,
    CircleDollarSign,
    CheckCircle2,
    Clock3,
    Activity,
} from 'lucide-react';

// ==========================================
// MOCK DATA
// ==========================================
const WAREHOUSES = [
    {
        id: 1,
        kode: 'WH-001',
        nama: 'Gudang Pusat Jakarta',
        tipe: 'Main Warehouse',
        lokasi: 'Jakarta Selatan',
        pic: 'Budi Santoso',
        kapasitas: '4.000 m²',
        totalItem: 1245,
        totalAsset: 'Rp 12.4 M',
        status: 'Active',
        kondisi: 'Baik',
    },
    {
        id: 2,
        kode: 'WH-002',
        nama: 'Gudang Project Tol MBZ',
        tipe: 'Project Warehouse',
        lokasi: 'Bekasi',
        pic: 'Rizky Pratama',
        kapasitas: '1.500 m²',
        totalItem: 530,
        totalAsset: 'Rp 4.8 M',
        status: 'Active',
        kondisi: 'Baik',
    },
    {
        id: 3,
        kode: 'WH-003',
        nama: 'Warehouse Alat Berat',
        tipe: 'Heavy Equipment Yard',
        lokasi: 'Karawang',
        pic: 'Agus Saputra',
        kapasitas: '6.500 m²',
        totalItem: 87,
        totalAsset: 'Rp 21.2 M',
        status: 'Maintenance',
        kondisi: 'Perawatan',
    },
];

// ==========================================
// PAGE
// ==========================================
export default function WarehouseManagement() {
    const navigate = useNavigate();

    const [search, setSearch] = useState('');

    // ==========================================
    // FILTER DATA
    // ==========================================
    const filteredWarehouse = WAREHOUSES.filter((item) => {

        return (
            item.nama.toLowerCase().includes(search.toLowerCase()) ||
            item.kode.toLowerCase().includes(search.toLowerCase()) ||
            item.lokasi.toLowerCase().includes(search.toLowerCase())
        );

    });

    // ==========================================
    // STATUS BADGE
    // ==========================================
    const renderStatus = (status) => {

        if (status === 'Active') {

            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 border border-green-200 text-green-700 text-xs font-semibold">
                    <CheckCircle2 size={12} />
                    Active
                </span>
            );
        }

        return (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold">
                <Clock3 size={12} />
                Maintenance
            </span>
        );
    };

    // ==========================================
    // TYPE BADGE
    // ==========================================
    const renderType = (type) => {

        if (type === 'Main Warehouse') {

            return (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
                    <Warehouse size={11} />
                    Main Warehouse
                </span>
            );
        }

        if (type === 'Project Warehouse') {

            return (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
                    <Building2 size={11} />
                    Project Warehouse
                </span>
            );
        }

        return (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-orange-50 border border-orange-200 text-orange-700 text-xs font-semibold">
                <Truck size={11} />
                Heavy Equipment Yard
            </span>
        );
    };

    return (
        <PortalLayout>

            <div className="space-y-6">

                {/* ========================================== */}
                {/* HEADER */}
                {/* ========================================== */}
                <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">

                    <div>

                        <div className="flex items-center gap-3">

                            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                                <Warehouse
                                    size={24}
                                    className="text-indigo-600"
                                />
                            </div>

                            <div>

                                <h1 className="text-2xl font-bold text-gray-900">
                                    Warehouse Management
                                </h1>

                                <div className="flex items-center gap-2 mt-1 text-sm">

                                    <span className="text-gray-400">
                                        Inventory & Warehouse
                                    </span>

                                    <ChevronRight
                                        size={14}
                                        className="text-gray-300"
                                    />

                                    <span className="text-indigo-600 font-medium">
                                        Warehouse Management
                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>

                    <button
                        type="button"
                        onClick={() => navigate('/portal/inventory/warehouse/create')}
                        className="inline-flex items-center gap-2 h-10 px-4 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition shadow-sm self-start sm:self-auto"
                    >
                        <Plus size={16} />
                        Tambah Warehouse
                    </button>

                </div>

                {/* ========================================== */}
                {/* SUMMARY */}
                {/* ========================================== */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

                    {/* CARD */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">

                        <div className="flex items-start justify-between">

                            <div>

                                <p className="text-sm text-gray-500">
                                    Total Warehouse
                                </p>

                                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                                    12
                                </h2>

                            </div>

                            <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center">
                                <Warehouse
                                    size={22}
                                    className="text-indigo-600"
                                />
                            </div>

                        </div>

                        <div className="mt-4 flex items-center gap-1 text-xs text-green-600 font-semibold">
                            <ArrowUpRight size={13} />
                            +2 warehouse bulan ini
                        </div>

                    </div>

                    {/* CARD */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">

                        <div className="flex items-start justify-between">

                            <div>

                                <p className="text-sm text-gray-500">
                                    Total Inventory
                                </p>

                                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                                    8.540
                                </h2>

                            </div>

                            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                                <Boxes
                                    size={22}
                                    className="text-blue-600"
                                />
                            </div>

                        </div>

                        <div className="mt-4 flex items-center gap-1 text-xs text-blue-600 font-semibold">
                            <Activity size={13} />
                            Inventory aktif seluruh project
                        </div>

                    </div>

                    {/* CARD */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">

                        <div className="flex items-start justify-between">

                            <div>

                                <p className="text-sm text-gray-500">
                                    Asset Value
                                </p>

                                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                                    Rp 38 M
                                </h2>

                            </div>

                            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                                <CircleDollarSign
                                    size={22}
                                    className="text-emerald-600"
                                />
                            </div>

                        </div>

                        <div className="mt-4 flex items-center gap-1 text-xs text-emerald-600 font-semibold">
                            <ShieldCheck size={13} />
                            Asset terpantau sistem
                        </div>

                    </div>

                    {/* CARD */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">

                        <div className="flex items-start justify-between">

                            <div>

                                <p className="text-sm text-gray-500">
                                    Warehouse Maintenance
                                </p>

                                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                                    1
                                </h2>

                            </div>

                            <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center">
                                <AlertTriangle
                                    size={22}
                                    className="text-amber-600"
                                />
                            </div>

                        </div>

                        <div className="mt-4 flex items-center gap-1 text-xs text-amber-600 font-semibold">
                            <Clock3 size={13} />
                            Perlu monitoring operasional
                        </div>

                    </div>

                </div>

                {/* ========================================== */}
                {/* TABLE SECTION */}
                {/* ========================================== */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

                    {/* TOPBAR */}
                    <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 px-6 py-5 border-b border-gray-200">

                        <div>

                            <h2 className="text-lg font-semibold text-gray-900">
                                Daftar Warehouse
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Monitoring warehouse project, gudang pusat, dan alat berat
                            </p>

                        </div>

                        {/* SEARCH */}
                        <div className="relative w-full xl:w-[340px]">

                            <Search
                                size={18}
                                className="absolute left-3 top-3 text-gray-400"
                            />

                            <input
                                type="text"
                                placeholder="Cari warehouse..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-300 text-sm outline-none focus:border-indigo-500"
                            />

                        </div>

                    </div>

                    {/* TABLE */}
                    <div className="overflow-x-auto">

                        <table className="min-w-full text-sm">

                            <thead className="bg-gray-50 border-b border-gray-200 uppercase text-xs tracking-wider text-gray-600">

                                <tr>

                                    <th className="px-5 py-4 text-left">
                                        Warehouse
                                    </th>

                                    <th className="px-5 py-4 text-center">
                                        Tipe
                                    </th>

                                    <th className="px-5 py-4 text-left">
                                        Lokasi
                                    </th>

                                    <th className="px-5 py-4 text-left">
                                        PIC
                                    </th>

                                    <th className="px-5 py-4 text-center">
                                        Inventory
                                    </th>

                                    <th className="px-5 py-4 text-center">
                                        Asset
                                    </th>

                                    <th className="px-5 py-4 text-center">
                                        Status
                                    </th>

                                    <th className="px-5 py-4 text-center">
                                        Aksi
                                    </th>

                                </tr>

                            </thead>

                            <tbody className="divide-y divide-gray-200">

                                {filteredWarehouse.map((item) => (

                                    <tr
                                        key={item.id}
                                        className="hover:bg-gray-50/60 transition"
                                    >

                                        {/* WAREHOUSE */}
                                        <td className="px-5 py-5 min-w-[260px]">

                                            <div className="flex items-start gap-3">

                                                <div className="w-11 h-11 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center flex-shrink-0">
                                                    <Warehouse
                                                        size={20}
                                                        className="text-indigo-600"
                                                    />
                                                </div>

                                                <div>

                                                    <div className="font-semibold text-gray-900">
                                                        {item.nama}
                                                    </div>

                                                    <div className="text-xs text-gray-500 mt-1">
                                                        {item.kode}
                                                    </div>

                                                    <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                                                        <Package size={12} />
                                                        Kapasitas: {item.kapasitas}
                                                    </div>

                                                </div>

                                            </div>

                                        </td>

                                        {/* TYPE */}
                                        <td className="px-5 py-5 text-center">
                                            {renderType(item.tipe)}
                                        </td>

                                        {/* LOCATION */}
                                        <td className="px-5 py-5">

                                            <div className="flex items-center gap-2 text-gray-700 font-medium">
                                                <MapPin
                                                    size={15}
                                                    className="text-gray-400"
                                                />
                                                {item.lokasi}
                                            </div>

                                        </td>

                                        {/* PIC */}
                                        <td className="px-5 py-5">

                                            <div className="flex items-center gap-2 text-gray-800 font-semibold">
                                                <Building2
                                                    size={15}
                                                    className="text-gray-400"
                                                />
                                                {item.pic}
                                            </div>

                                        </td>

                                        {/* ITEM */}
                                        <td className="px-5 py-5 text-center">

                                            <div className="font-bold text-indigo-600">
                                                {item.totalItem}
                                            </div>

                                            <div className="text-xs text-gray-500 mt-1">
                                                Total Item
                                            </div>

                                        </td>

                                        {/* ASSET */}
                                        <td className="px-5 py-5 text-center">

                                            <div className="font-bold text-emerald-600">
                                                {item.totalAsset}
                                            </div>

                                            <div className="text-xs text-gray-500 mt-1">
                                                Asset Value
                                            </div>

                                        </td>

                                        {/* STATUS */}
                                        <td className="px-5 py-5 text-center">
                                            {renderStatus(item.status)}
                                        </td>

                                        {/* ACTION */}
                                        <td className="px-5 py-5">

                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => navigate(`/portal/inventory/warehouse/detail`)}
                                                    className="w-9 h-9 rounded-lg border border-gray-200 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 flex items-center justify-center text-gray-600 transition"
                                                    title="Edit Parameter Data Item"
                                                >
                                                    <Eye size={16} />
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => navigate(`/portal/inventory/warehouse/edit`)}
                                                    className="w-9 h-9 rounded-lg border border-gray-200 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 flex items-center justify-center text-gray-600 transition"
                                                    title="Edit Parameter Data Item"
                                                >
                                                    <Pencil size={13} />
                                                </button>

                                            </div>

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