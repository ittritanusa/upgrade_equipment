import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';

import {
    ArrowLeft,
    Save,
    Warehouse,
    Building2,
    MapPin,
    Phone,
    User,
    ShieldCheck,
    Package,
    AlertTriangle,
    ClipboardList,
    CheckCircle2,
    Boxes,
    Truck,
    Wrench,
    Hammer,
    Clock3,
    FileText,
} from 'lucide-react';

// ==========================================
// MOCK DETAIL DATA
// ==========================================
const DETAIL_WAREHOUSE = {
    id: 1,
    kodeWarehouse: 'WH-001',
    namaWarehouse: 'Gudang Pusat Jakarta',
    tipeWarehouse: 'Main Warehouse',

    status: 'Aktif',

    project: 'Head Office & Main Distribution',
    picWarehouse: 'Budi Santoso',
    noHp: '0812-9988-1122',
    email: 'warehouse.jakarta@ags.com',

    alamat:
        'Jl. Raya Industri No.88, Cakung, Jakarta Timur, DKI Jakarta',

    kapasitas: 2500,
    satuanKapasitas: 'm²',

    operationalHour: '08:00 - 17:00',

    fasilitas: [
        'Forklift',
        'Loading Dock',
        'CCTV 24 Jam',
        'Area Outdoor',
        'Rak Heavy Duty',
    ],

    catatan:
        'Gudang pusat digunakan untuk penyimpanan material proyek, tools, alat berat, serta distribusi antar project.',

    inventorySummary: {
        totalItem: 1268,
        material: 986,
        tools: 210,
        alatBerat: 72,
    },
};

export default function EditWarehouseManagement() {

    const navigate = useNavigate();
    const { id } = useParams();

    // ==========================================
    // FORM STATE
    // ==========================================
    const [form, setForm] = useState({
        kodeWarehouse: DETAIL_WAREHOUSE.kodeWarehouse,
        namaWarehouse: DETAIL_WAREHOUSE.namaWarehouse,
        tipeWarehouse: DETAIL_WAREHOUSE.tipeWarehouse,
        status: DETAIL_WAREHOUSE.status,
        project: DETAIL_WAREHOUSE.project,
        picWarehouse: DETAIL_WAREHOUSE.picWarehouse,
        noHp: DETAIL_WAREHOUSE.noHp,
        email: DETAIL_WAREHOUSE.email,
        alamat: DETAIL_WAREHOUSE.alamat,
        kapasitas: DETAIL_WAREHOUSE.kapasitas,
        satuanKapasitas: DETAIL_WAREHOUSE.satuanKapasitas,
        operationalHour: DETAIL_WAREHOUSE.operationalHour,
        catatan: DETAIL_WAREHOUSE.catatan,
    });

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
    // CATEGORY BADGE
    // ==========================================
    const renderTypeBadge = (type) => {

        if (type === 'Main Warehouse') {
            return (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-semibold">
                    <Warehouse size={11} />
                    Main Warehouse
                </span>
            );
        }

        if (type === 'Project Warehouse') {
            return (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold">
                    <Building2 size={11} />
                    Project Warehouse
                </span>
            );
        }

        return (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
                <Boxes size={11} />
                Container Storage
            </span>
        );
    };

    // ==========================================
    // STATUS BADGE
    // ==========================================
    const renderStatusBadge = (status) => {

        if (status === 'Aktif') {
            return (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-50 text-green-700 border border-green-200 text-xs font-semibold">
                    <CheckCircle2 size={11} />
                    Aktif
                </span>
            );
        }

        return (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-50 text-red-700 border border-red-200 text-xs font-semibold">
                <AlertTriangle size={11} />
                Non Aktif
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

                        <div className="flex items-center gap-3">

                            <h1 className="text-2xl font-semibold text-gray-900">
                                Edit Warehouse
                            </h1>

                            {renderStatusBadge(form.status)}

                        </div>

                        <div className="flex items-center gap-2 mt-1 text-sm">

                            <span className="text-gray-400">
                                Inventory & Warehouse
                            </span>

                            <span className="text-gray-300">/</span>

                            <span className="text-gray-400">
                                Warehouse Management
                            </span>

                            <span className="text-gray-300">/</span>

                            <span className="text-indigo-600 font-medium">
                                Edit Warehouse
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
                {/* FORM */}
                {/* ========================================== */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                    {/* ========================================== */}
                    {/* LEFT */}
                    {/* ========================================== */}
                    <div className="xl:col-span-2 space-y-6">

                        {/* ========================================== */}
                        {/* GENERAL INFORMATION */}
                        {/* ========================================== */}
                        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">

                            <div className="flex items-center gap-2 mb-6">

                                <ClipboardList
                                    size={20}
                                    className="text-indigo-600"
                                />

                                <div>

                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Informasi Warehouse
                                    </h2>

                                    <p className="text-sm text-gray-500">
                                        Update data warehouse / gudang project
                                    </p>

                                </div>

                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                {/* KODE */}
                                <div>

                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Kode Warehouse
                                    </label>

                                    <input
                                        type="text"
                                        value={form.kodeWarehouse}
                                        onChange={(e) =>
                                            handleChange(
                                                'kodeWarehouse',
                                                e.target.value
                                            )
                                        }
                                        className="w-full h-11 rounded-xl border border-gray-300 px-4 text-sm outline-none focus:border-indigo-500"
                                    />

                                </div>

                                {/* NAMA */}
                                <div>

                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Nama Warehouse
                                    </label>

                                    <input
                                        type="text"
                                        value={form.namaWarehouse}
                                        onChange={(e) =>
                                            handleChange(
                                                'namaWarehouse',
                                                e.target.value
                                            )
                                        }
                                        className="w-full h-11 rounded-xl border border-gray-300 px-4 text-sm outline-none focus:border-indigo-500"
                                    />

                                </div>

                                {/* TYPE */}
                                <div>

                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Tipe Warehouse
                                    </label>

                                    <select
                                        value={form.tipeWarehouse}
                                        onChange={(e) =>
                                            handleChange(
                                                'tipeWarehouse',
                                                e.target.value
                                            )
                                        }
                                        className="w-full h-11 rounded-xl border border-gray-300 px-4 text-sm outline-none focus:border-indigo-500"
                                    >
                                        <option value="">
                                            Pilih Tipe Warehouse
                                        </option>

                                        <option value="Main Warehouse">
                                            Main Warehouse
                                        </option>

                                        <option value="Project Warehouse">
                                            Project Warehouse
                                        </option>

                                        <option value="Container Storage">
                                            Container Storage
                                        </option>

                                    </select>

                                </div>

                                {/* STATUS */}
                                <div>

                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Status Warehouse
                                    </label>

                                    <select
                                        value={form.status}
                                        onChange={(e) =>
                                            handleChange(
                                                'status',
                                                e.target.value
                                            )
                                        }
                                        className="w-full h-11 rounded-xl border border-gray-300 px-4 text-sm outline-none focus:border-indigo-500"
                                    >
                                        <option value="Aktif">
                                            Aktif
                                        </option>

                                        <option value="Non Aktif">
                                            Non Aktif
                                        </option>

                                    </select>

                                </div>

                                {/* PROJECT */}
                                <div className="md:col-span-2">

                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Project / Lokasi
                                    </label>

                                    <div className="relative">

                                        <Building2
                                            size={18}
                                            className="absolute left-3 top-3 text-gray-400"
                                        />

                                        <input
                                            type="text"
                                            value={form.project}
                                            onChange={(e) =>
                                                handleChange(
                                                    'project',
                                                    e.target.value
                                                )
                                            }
                                            className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-300 text-sm outline-none focus:border-indigo-500"
                                        />

                                    </div>

                                </div>

                                {/* PIC */}
                                <div>

                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        PIC Warehouse
                                    </label>

                                    <div className="relative">

                                        <User
                                            size={18}
                                            className="absolute left-3 top-3 text-gray-400"
                                        />

                                        <input
                                            type="text"
                                            value={form.picWarehouse}
                                            onChange={(e) =>
                                                handleChange(
                                                    'picWarehouse',
                                                    e.target.value
                                                )
                                            }
                                            className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-300 text-sm outline-none focus:border-indigo-500"
                                        />

                                    </div>

                                </div>

                                {/* PHONE */}
                                <div>

                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Nomor HP PIC
                                    </label>

                                    <div className="relative">

                                        <Phone
                                            size={18}
                                            className="absolute left-3 top-3 text-gray-400"
                                        />

                                        <input
                                            type="text"
                                            value={form.noHp}
                                            onChange={(e) =>
                                                handleChange(
                                                    'noHp',
                                                    e.target.value
                                                )
                                            }
                                            className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-300 text-sm outline-none focus:border-indigo-500"
                                        />

                                    </div>

                                </div>

                                {/* EMAIL */}
                                <div className="md:col-span-2">

                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Warehouse
                                    </label>

                                    <input
                                        type="email"
                                        value={form.email}
                                        onChange={(e) =>
                                            handleChange(
                                                'email',
                                                e.target.value
                                            )
                                        }
                                        className="w-full h-11 rounded-xl border border-gray-300 px-4 text-sm outline-none focus:border-indigo-500"
                                    />

                                </div>

                                {/* ADDRESS */}
                                <div className="md:col-span-2">

                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Alamat Warehouse
                                    </label>

                                    <div className="relative">

                                        <MapPin
                                            size={18}
                                            className="absolute left-3 top-3 text-gray-400"
                                        />

                                        <textarea
                                            rows={4}
                                            value={form.alamat}
                                            onChange={(e) =>
                                                handleChange(
                                                    'alamat',
                                                    e.target.value
                                                )
                                            }
                                            className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-300 text-sm outline-none focus:border-indigo-500"
                                        />

                                    </div>

                                </div>

                                {/* CAPACITY */}
                                <div>

                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Kapasitas Gudang
                                    </label>

                                    <div className="flex items-center gap-2">

                                        <input
                                            type="number"
                                            value={form.kapasitas}
                                            onChange={(e) =>
                                                handleChange(
                                                    'kapasitas',
                                                    e.target.value
                                                )
                                            }
                                            className="w-full h-11 rounded-xl border border-gray-300 px-4 text-sm outline-none focus:border-indigo-500"
                                        />

                                        <select
                                            value={form.satuanKapasitas}
                                            onChange={(e) =>
                                                handleChange(
                                                    'satuanKapasitas',
                                                    e.target.value
                                                )
                                            }
                                            className="w-32 h-11 rounded-xl border border-gray-300 px-3 text-sm outline-none focus:border-indigo-500"
                                        >
                                            <option>m²</option>
                                            <option>Unit</option>
                                            <option>Pallet</option>
                                        </select>

                                    </div>

                                </div>

                                {/* OPERATIONAL */}
                                <div>

                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Jam Operasional
                                    </label>

                                    <div className="relative">

                                        <Clock3
                                            size={18}
                                            className="absolute left-3 top-3 text-gray-400"
                                        />

                                        <input
                                            type="text"
                                            value={form.operationalHour}
                                            onChange={(e) =>
                                                handleChange(
                                                    'operationalHour',
                                                    e.target.value
                                                )
                                            }
                                            className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-300 text-sm outline-none focus:border-indigo-500"
                                        />

                                    </div>

                                </div>

                                {/* NOTES */}
                                <div className="md:col-span-2">

                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Catatan Tambahan
                                    </label>

                                    <textarea
                                        rows={4}
                                        value={form.catatan}
                                        onChange={(e) =>
                                            handleChange(
                                                'catatan',
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-indigo-500"
                                    />

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* ========================================== */}
                    {/* RIGHT SIDEBAR */}
                    {/* ========================================== */}
                    <div className="space-y-6">

                        {/* SUMMARY */}
                        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">

                            <div className="flex items-center gap-2 mb-5">

                                <Package
                                    size={20}
                                    className="text-indigo-600"
                                />

                                <h2 className="text-lg font-semibold text-gray-900">
                                    Inventory Summary
                                </h2>

                            </div>

                            <div className="space-y-4">

                                <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-100">

                                    <div className="flex items-center gap-3">

                                        <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                                            <Boxes
                                                size={18}
                                                className="text-indigo-700"
                                            />
                                        </div>

                                        <div>

                                            <div className="text-xs text-gray-500">
                                                Total Item
                                            </div>

                                            <div className="font-bold text-gray-900">
                                                {DETAIL_WAREHOUSE.inventorySummary.totalItem}
                                            </div>

                                        </div>

                                    </div>

                                </div>

                                <div className="grid grid-cols-1 gap-3">

                                    <div className="p-4 rounded-xl border border-gray-200">

                                        <div className="flex items-center justify-between">

                                            <div className="flex items-center gap-2">

                                                <Hammer
                                                    size={16}
                                                    className="text-indigo-600"
                                                />

                                                <span className="text-sm font-medium text-gray-700">
                                                    Material
                                                </span>

                                            </div>

                                            <span className="font-bold text-indigo-600">
                                                {DETAIL_WAREHOUSE.inventorySummary.material}
                                            </span>

                                        </div>

                                    </div>

                                    <div className="p-4 rounded-xl border border-gray-200">

                                        <div className="flex items-center justify-between">

                                            <div className="flex items-center gap-2">

                                                <Wrench
                                                    size={16}
                                                    className="text-amber-600"
                                                />

                                                <span className="text-sm font-medium text-gray-700">
                                                    Tools
                                                </span>

                                            </div>

                                            <span className="font-bold text-amber-600">
                                                {DETAIL_WAREHOUSE.inventorySummary.tools}
                                            </span>

                                        </div>

                                    </div>

                                    <div className="p-4 rounded-xl border border-gray-200">

                                        <div className="flex items-center justify-between">

                                            <div className="flex items-center gap-2">

                                                <Truck
                                                    size={16}
                                                    className="text-red-600"
                                                />

                                                <span className="text-sm font-medium text-gray-700">
                                                    Alat Berat
                                                </span>

                                            </div>

                                            <span className="font-bold text-red-600">
                                                {DETAIL_WAREHOUSE.inventorySummary.alatBerat}
                                            </span>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* INFO */}
                        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">

                            <div className="flex items-start gap-3">

                                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">

                                    <ShieldCheck
                                        size={20}
                                        className="text-amber-700"
                                    />

                                </div>

                                <div>

                                    <h3 className="font-semibold text-amber-900">
                                        Informasi Warehouse
                                    </h3>

                                    <p className="text-sm text-amber-800 mt-1 leading-relaxed">
                                        Pastikan data warehouse dan PIC gudang
                                        sesuai untuk mempermudah proses
                                        inventory movement, transfer stock,
                                        serta monitoring material project.
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                {/* ========================================== */}
                {/* ACTION BUTTON */}
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
                        Update Warehouse
                    </button>

                </div>

            </div>

        </PortalLayout>
    );
}