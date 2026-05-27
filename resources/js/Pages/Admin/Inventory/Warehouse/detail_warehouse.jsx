import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';

import {
    ArrowLeft,
    Warehouse,
    Building2,
    Phone,
    User,
    MapPin,
    Clock3,
    ShieldCheck,
    Package,
    Boxes,
    Truck,
    Wrench,
    Hammer,
    CheckCircle2,
    AlertTriangle,
    ClipboardList,
    FileText,
    Pencil,
    Printer,
    CalendarDays,
    ArrowRightLeft,
    Layers3,
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

    tanggalDibuat: '25 Mei 2026',
    dibuatOleh: 'Ekki Maulana',

    fasilitas: [
        'Forklift',
        'Loading Dock',
        'CCTV 24 Jam',
        'Rak Heavy Duty',
        'Area Outdoor',
    ],

    catatan:
        'Gudang pusat digunakan untuk penyimpanan material project, tools, sparepart, serta distribusi antar project dan site operasional.',

    inventorySummary: {
        totalItem: 1268,
        material: 986,
        tools: 210,
        alatBerat: 72,
    },

    recentTransfers: [
        {
            id: 1,
            nomor: 'IWT-2026-0012',
            tujuan: 'Project Tol Cisumdawu',
            tanggal: '26 Mei 2026',
            status: 'Approved',
        },
        {
            id: 2,
            nomor: 'IWT-2026-0013',
            tujuan: 'Project MBZ',
            tanggal: '27 Mei 2026',
            status: 'Pending',
        },
    ],
};

// ==========================================
// PAGE
// ==========================================
export default function DetailWarehouseManagement() {

    const navigate = useNavigate();
    const { id } = useParams();

    const detail = DETAIL_WAREHOUSE;

    // ==========================================
    // TYPE BADGE
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

    // ==========================================
    // TRANSFER STATUS
    // ==========================================
    const renderTransferStatus = (status) => {

        if (status === 'Approved') {
            return (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-green-50 text-green-700 border border-green-200 text-[11px] font-semibold">
                    Approved
                </span>
            );
        }

        if (status === 'Pending') {
            return (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[11px] font-semibold">
                    Pending
                </span>
            );
        }

        return (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-red-50 text-red-700 border border-red-200 text-[11px] font-semibold">
                Rejected
            </span>
        );
    };

    return (
        <PortalLayout>

            <div className="space-y-6">

                {/* ========================================== */}
                {/* HEADER */}
                {/* ========================================== */}
                <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">

                    <div>

                        <div className="flex items-center gap-3 flex-wrap">

                            <h1 className="text-2xl font-semibold text-gray-900">
                                Detail Warehouse
                            </h1>

                            {renderStatusBadge(detail.status)}

                            {renderTypeBadge(detail.tipeWarehouse)}

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
                                {detail.namaWarehouse}
                            </span>

                        </div>

                    </div>

                    <div className="flex flex-wrap items-center gap-3">

                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="inline-flex items-center gap-2 h-11 px-5 rounded-xl border border-gray-300 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 transition"
                        >
                            <ArrowLeft size={17} />
                            Kembali
                        </button>

                    </div>

                </div>

                {/* ========================================== */}
                {/* TOP INFO */}
                {/* ========================================== */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">

                    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">

                        <div className="flex items-center justify-between">

                            <div>

                                <div className="text-sm text-gray-500">
                                    Total Item
                                </div>

                                <div className="text-3xl font-bold text-gray-900 mt-2">
                                    {detail.inventorySummary.totalItem}
                                </div>

                            </div>

                            <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center">
                                <Boxes
                                    size={26}
                                    className="text-indigo-700"
                                />
                            </div>

                        </div>

                    </div>

                    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">

                        <div className="flex items-center justify-between">

                            <div>

                                <div className="text-sm text-gray-500">
                                    Material
                                </div>

                                <div className="text-3xl font-bold text-indigo-600 mt-2">
                                    {detail.inventorySummary.material}
                                </div>

                            </div>

                            <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center">
                                <Hammer
                                    size={26}
                                    className="text-indigo-600"
                                />
                            </div>

                        </div>

                    </div>

                    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">

                        <div className="flex items-center justify-between">

                            <div>

                                <div className="text-sm text-gray-500">
                                    Tools
                                </div>

                                <div className="text-3xl font-bold text-amber-600 mt-2">
                                    {detail.inventorySummary.tools}
                                </div>

                            </div>

                            <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center">
                                <Wrench
                                    size={26}
                                    className="text-amber-600"
                                />
                            </div>

                        </div>

                    </div>

                    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">

                        <div className="flex items-center justify-between">

                            <div>

                                <div className="text-sm text-gray-500">
                                    Alat Berat
                                </div>

                                <div className="text-3xl font-bold text-red-600 mt-2">
                                    {detail.inventorySummary.alatBerat}
                                </div>

                            </div>

                            <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center">
                                <Truck
                                    size={26}
                                    className="text-red-600"
                                />
                            </div>

                        </div>

                    </div>

                </div>

                {/* ========================================== */}
                {/* MAIN CONTENT */}
                {/* ========================================== */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                    {/* ========================================== */}
                    {/* LEFT */}
                    {/* ========================================== */}
                    <div className="xl:col-span-2 space-y-6">

                        {/* ========================================== */}
                        {/* DETAIL INFORMATION */}
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
                                        Detail lengkap warehouse / gudang
                                    </p>

                                </div>

                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                <div>

                                    <div className="text-xs text-gray-500 mb-1">
                                        Kode Warehouse
                                    </div>

                                    <div className="font-semibold text-gray-900">
                                        {detail.kodeWarehouse}
                                    </div>

                                </div>

                                <div>

                                    <div className="text-xs text-gray-500 mb-1">
                                        Nama Warehouse
                                    </div>

                                    <div className="font-semibold text-gray-900">
                                        {detail.namaWarehouse}
                                    </div>

                                </div>

                                <div>

                                    <div className="text-xs text-gray-500 mb-1">
                                        Project / Lokasi
                                    </div>

                                    <div className="font-semibold text-gray-900">
                                        {detail.project}
                                    </div>

                                </div>

                                <div>

                                    <div className="text-xs text-gray-500 mb-1">
                                        Kapasitas Warehouse
                                    </div>

                                    <div className="font-semibold text-gray-900">
                                        {detail.kapasitas} {detail.satuanKapasitas}
                                    </div>

                                </div>

                                <div>

                                    <div className="text-xs text-gray-500 mb-1">
                                        PIC Warehouse
                                    </div>

                                    <div className="flex items-center gap-2 font-semibold text-gray-900">
                                        <User size={15} className="text-gray-400" />
                                        {detail.picWarehouse}
                                    </div>

                                </div>

                                <div>

                                    <div className="text-xs text-gray-500 mb-1">
                                        Nomor HP PIC
                                    </div>

                                    <div className="flex items-center gap-2 font-semibold text-gray-900">
                                        <Phone size={15} className="text-gray-400" />
                                        {detail.noHp}
                                    </div>

                                </div>

                                <div>

                                    <div className="text-xs text-gray-500 mb-1">
                                        Jam Operasional
                                    </div>

                                    <div className="flex items-center gap-2 font-semibold text-gray-900">
                                        <Clock3 size={15} className="text-gray-400" />
                                        {detail.operationalHour}
                                    </div>

                                </div>

                                <div>

                                    <div className="text-xs text-gray-500 mb-1">
                                        Dibuat Oleh
                                    </div>

                                    <div className="font-semibold text-gray-900">
                                        {detail.dibuatOleh}
                                    </div>

                                </div>

                                <div className="md:col-span-2">

                                    <div className="text-xs text-gray-500 mb-1">
                                        Alamat Warehouse
                                    </div>

                                    <div className="flex items-start gap-2 font-semibold text-gray-900 leading-relaxed">
                                        <MapPin
                                            size={15}
                                            className="text-gray-400 mt-1"
                                        />

                                        <span>
                                            {detail.alamat}
                                        </span>

                                    </div>

                                </div>

                                <div className="md:col-span-2">

                                    <div className="text-xs text-gray-500 mb-2">
                                        Catatan Warehouse
                                    </div>

                                    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700 leading-relaxed">
                                        {detail.catatan}
                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* ========================================== */}
                        {/* FACILITY */}
                        {/* ========================================== */}
                        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">

                            <div className="flex items-center gap-2 mb-5">

                                <ShieldCheck
                                    size={20}
                                    className="text-indigo-600"
                                />

                                <div>

                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Fasilitas Warehouse
                                    </h2>

                                    <p className="text-sm text-gray-500">
                                        Fasilitas pendukung operasional gudang
                                    </p>

                                </div>

                            </div>

                            <div className="flex flex-wrap gap-3">

                                {detail.fasilitas.map((item, index) => (

                                    <div
                                        key={index}
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-medium"
                                    >
                                        <CheckCircle2 size={14} />
                                        {item}
                                    </div>

                                ))}

                            </div>

                        </div>

                    </div>

                    {/* ========================================== */}
                    {/* RIGHT */}
                    {/* ========================================== */}
                    <div className="space-y-6">

                        {/* ========================================== */}
                        {/* ACTIVITY */}
                        {/* ========================================== */}
                        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

                            <div className="px-6 py-5 border-b border-gray-200 flex items-center gap-2">

                                <ArrowRightLeft
                                    size={20}
                                    className="text-indigo-600"
                                />

                                <div>

                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Recent Transfer
                                    </h2>

                                    <p className="text-sm text-gray-500">
                                        Aktivitas transfer warehouse
                                    </p>

                                </div>

                            </div>

                            <div className="divide-y divide-gray-200">

                                {detail.recentTransfers.map((item) => (

                                    <div
                                        key={item.id}
                                        className="p-5 hover:bg-gray-50 transition"
                                    >

                                        <div className="flex items-start justify-between gap-4">

                                            <div>

                                                <div className="font-semibold text-gray-900">
                                                    {item.nomor}
                                                </div>

                                                <div className="text-sm text-gray-500 mt-1">
                                                    {item.tujuan}
                                                </div>

                                                <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                                                    <CalendarDays size={12} />
                                                    {item.tanggal}
                                                </div>

                                            </div>

                                            {renderTransferStatus(item.status)}

                                        </div>

                                    </div>

                                ))}

                            </div>

                        </div>

                        {/* ========================================== */}
                        {/* SUMMARY */}
                        {/* ========================================== */}
                        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">

                            <div className="flex items-center gap-2 mb-5">

                                <Layers3
                                    size={20}
                                    className="text-indigo-600"
                                />

                                <div>

                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Warehouse Summary
                                    </h2>

                                    <p className="text-sm text-gray-500">
                                        Ringkasan operasional warehouse
                                    </p>

                                </div>

                            </div>

                            <div className="space-y-4">

                                <div className="flex items-center justify-between text-sm">

                                    <span className="text-gray-500">
                                        Total Inventory
                                    </span>

                                    <span className="font-bold text-gray-900">
                                        {detail.inventorySummary.totalItem} Item
                                    </span>

                                </div>

                                <div className="flex items-center justify-between text-sm">

                                    <span className="text-gray-500">
                                        Warehouse Type
                                    </span>

                                    <span className="font-semibold text-gray-900">
                                        {detail.tipeWarehouse}
                                    </span>

                                </div>

                                <div className="flex items-center justify-between text-sm">

                                    <span className="text-gray-500">
                                        Status Warehouse
                                    </span>

                                    {renderStatusBadge(detail.status)}

                                </div>

                                <div className="flex items-center justify-between text-sm">

                                    <span className="text-gray-500">
                                        Dibuat Tanggal
                                    </span>

                                    <span className="font-semibold text-gray-900">
                                        {detail.tanggalDibuat}
                                    </span>

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
                                        Informasi Warehouse
                                    </h3>

                                    <p className="text-sm text-amber-800 mt-1 leading-relaxed">
                                        Warehouse ini terhubung dengan proses
                                        transfer stock, inventory adjustment,
                                        serta monitoring tools & alat berat
                                        antar project.
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </PortalLayout>
    );
}