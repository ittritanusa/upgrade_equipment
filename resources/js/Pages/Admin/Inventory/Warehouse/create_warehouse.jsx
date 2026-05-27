import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';

import {
    ArrowLeft,
    Save,
    Warehouse,
    Building2,
    MapPin,
    User,
    Phone,
    Mail,
    ShieldCheck,
    Package,
    Boxes,
    Truck,
    FileText,
    AlertTriangle,
    ChevronRight,
    Upload,
    CheckCircle2,
} from 'lucide-react';

// ==========================================
// PAGE
// ==========================================
export default function CreateWarehouseManagement() {

    const navigate = useNavigate();

    // ==========================================
    // FORM STATE
    // ==========================================
    const [form, setForm] = useState({
        kodeWarehouse: '',
        namaWarehouse: '',
        tipeWarehouse: '',
        lokasi: '',
        alamat: '',
        picWarehouse: '',
        noHp: '',
        email: '',
        kapasitas: '',
        status: 'Active',
        deskripsi: '',
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
    // TYPE BADGE
    // ==========================================
    const renderTypePreview = () => {

        if (form.tipeWarehouse === 'Main Warehouse') {

            return (
                <span className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 text-sm font-semibold">
                    <Warehouse size={16} />
                    Main Warehouse
                </span>
            );
        }

        if (form.tipeWarehouse === 'Project Warehouse') {

            return (
                <span className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 text-sm font-semibold">
                    <Building2 size={16} />
                    Project Warehouse
                </span>
            );
        }

        if (form.tipeWarehouse === 'Heavy Equipment Yard') {

            return (
                <span className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-orange-50 border border-orange-200 text-orange-700 text-sm font-semibold">
                    <Truck size={16} />
                    Heavy Equipment Yard
                </span>
            );
        }

        return (
            <span className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-100 border border-gray-200 text-gray-500 text-sm font-semibold">
                <Boxes size={16} />
                Belum dipilih
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

                        <div className="flex items-center gap-3">

                            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                                <Warehouse
                                    size={24}
                                    className="text-indigo-600"
                                />
                            </div>

                            <div>

                                <h1 className="text-2xl font-bold text-gray-900">
                                    Tambah Warehouse
                                </h1>

                                <div className="flex items-center gap-2 mt-1 text-sm">

                                    <span className="text-gray-400">
                                        Inventory & Warehouse
                                    </span>

                                    <ChevronRight
                                        size={14}
                                        className="text-gray-300"
                                    />

                                    <span className="text-gray-400">
                                        Warehouse Management
                                    </span>

                                    <ChevronRight
                                        size={14}
                                        className="text-gray-300"
                                    />

                                    <span className="text-indigo-600 font-medium">
                                        Tambah Warehouse
                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>

                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-sm font-semibold text-gray-700 transition"
                    >
                        <ArrowLeft size={16} />
                        Kembali
                    </button>

                </div>

                {/* ========================================== */}
                {/* FORM */}
                {/* ========================================== */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                    {/* ========================================== */}
                    {/* LEFT FORM */}
                    {/* ========================================== */}
                    <div className="xl:col-span-2 space-y-6">

                        {/* ========================================== */}
                        {/* BASIC INFO */}
                        {/* ========================================== */}
                        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

                            <div className="px-6 py-5 border-b border-gray-200">

                                <div className="flex items-center gap-2">

                                    <Warehouse
                                        size={20}
                                        className="text-indigo-600"
                                    />

                                    <div>

                                        <h2 className="text-lg font-semibold text-gray-900">
                                            Informasi Warehouse
                                        </h2>

                                        <p className="text-sm text-gray-500 mt-1">
                                            Isi informasi utama warehouse / gudang
                                        </p>

                                    </div>

                                </div>

                            </div>

                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">

                                {/* CODE */}
                                <div>

                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Kode Warehouse
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Contoh: WH-001"
                                        value={form.kodeWarehouse}
                                        onChange={(e) =>
                                            handleChange('kodeWarehouse', e.target.value)
                                        }
                                        className="w-full h-11 rounded-xl border border-gray-300 px-4 text-sm outline-none focus:border-indigo-500"
                                    />

                                </div>

                                {/* NAME */}
                                <div>

                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Nama Warehouse
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Masukkan nama warehouse"
                                        value={form.namaWarehouse}
                                        onChange={(e) =>
                                            handleChange('namaWarehouse', e.target.value)
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
                                            handleChange('tipeWarehouse', e.target.value)
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

                                        <option value="Heavy Equipment Yard">
                                            Heavy Equipment Yard
                                        </option>

                                    </select>

                                </div>

                                {/* CAPACITY */}
                                <div>

                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Kapasitas Warehouse
                                    </label>

                                    <div className="relative">

                                        <Boxes
                                            size={18}
                                            className="absolute left-3 top-3 text-gray-400"
                                        />

                                        <input
                                            type="text"
                                            placeholder="Contoh: 2.000 m²"
                                            value={form.kapasitas}
                                            onChange={(e) =>
                                                handleChange('kapasitas', e.target.value)
                                            }
                                            className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-300 text-sm outline-none focus:border-indigo-500"
                                        />

                                    </div>

                                </div>

                                {/* LOCATION */}
                                <div>

                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Lokasi
                                    </label>

                                    <div className="relative">

                                        <MapPin
                                            size={18}
                                            className="absolute left-3 top-3 text-gray-400"
                                        />

                                        <input
                                            type="text"
                                            placeholder="Contoh: Jakarta Selatan"
                                            value={form.lokasi}
                                            onChange={(e) =>
                                                handleChange('lokasi', e.target.value)
                                            }
                                            className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-300 text-sm outline-none focus:border-indigo-500"
                                        />

                                    </div>

                                </div>

                                {/* STATUS */}
                                <div>

                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Status Warehouse
                                    </label>

                                    <select
                                        value={form.status}
                                        onChange={(e) =>
                                            handleChange('status', e.target.value)
                                        }
                                        className="w-full h-11 rounded-xl border border-gray-300 px-4 text-sm outline-none focus:border-indigo-500"
                                    >
                                        <option value="Active">
                                            Active
                                        </option>

                                        <option value="Maintenance">
                                            Maintenance
                                        </option>

                                        <option value="Inactive">
                                            Inactive
                                        </option>

                                    </select>

                                </div>

                                {/* ADDRESS */}
                                <div className="md:col-span-2">

                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Alamat Warehouse
                                    </label>

                                    <textarea
                                        rows={4}
                                        placeholder="Masukkan alamat lengkap warehouse..."
                                        value={form.alamat}
                                        onChange={(e) =>
                                            handleChange('alamat', e.target.value)
                                        }
                                        className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-indigo-500 resize-none"
                                    />

                                </div>

                            </div>

                        </div>

                        {/* ========================================== */}
                        {/* PIC INFORMATION */}
                        {/* ========================================== */}
                        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

                            <div className="px-6 py-5 border-b border-gray-200">

                                <div className="flex items-center gap-2">

                                    <User
                                        size={20}
                                        className="text-indigo-600"
                                    />

                                    <div>

                                        <h2 className="text-lg font-semibold text-gray-900">
                                            Informasi PIC Warehouse
                                        </h2>

                                        <p className="text-sm text-gray-500 mt-1">
                                            Penanggung jawab warehouse
                                        </p>

                                    </div>

                                </div>

                            </div>

                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">

                                {/* PIC */}
                                <div>

                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Nama PIC
                                    </label>

                                    <div className="relative">

                                        <User
                                            size={18}
                                            className="absolute left-3 top-3 text-gray-400"
                                        />

                                        <input
                                            type="text"
                                            placeholder="Masukkan nama PIC"
                                            value={form.picWarehouse}
                                            onChange={(e) =>
                                                handleChange('picWarehouse', e.target.value)
                                            }
                                            className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-300 text-sm outline-none focus:border-indigo-500"
                                        />

                                    </div>

                                </div>

                                {/* PHONE */}
                                <div>

                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Nomor HP
                                    </label>

                                    <div className="relative">

                                        <Phone
                                            size={18}
                                            className="absolute left-3 top-3 text-gray-400"
                                        />

                                        <input
                                            type="text"
                                            placeholder="08xxxxxxxxxx"
                                            value={form.noHp}
                                            onChange={(e) =>
                                                handleChange('noHp', e.target.value)
                                            }
                                            className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-300 text-sm outline-none focus:border-indigo-500"
                                        />

                                    </div>

                                </div>

                                {/* EMAIL */}
                                <div className="md:col-span-2">

                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email PIC
                                    </label>

                                    <div className="relative">

                                        <Mail
                                            size={18}
                                            className="absolute left-3 top-3 text-gray-400"
                                        />

                                        <input
                                            type="email"
                                            placeholder="warehouse@company.com"
                                            value={form.email}
                                            onChange={(e) =>
                                                handleChange('email', e.target.value)
                                            }
                                            className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-300 text-sm outline-none focus:border-indigo-500"
                                        />

                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* ========================================== */}
                        {/* NOTES */}
                        {/* ========================================== */}
                        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

                            <div className="px-6 py-5 border-b border-gray-200">

                                <div className="flex items-center gap-2">

                                    <FileText
                                        size={20}
                                        className="text-indigo-600"
                                    />

                                    <div>

                                        <h2 className="text-lg font-semibold text-gray-900">
                                            Deskripsi Tambahan
                                        </h2>

                                        <p className="text-sm text-gray-500 mt-1">
                                            Informasi operasional warehouse
                                        </p>

                                    </div>

                                </div>

                            </div>

                            <div className="p-6">

                                <textarea
                                    rows={5}
                                    placeholder="Masukkan deskripsi warehouse, operasional, jenis inventory, dll..."
                                    value={form.deskripsi}
                                    onChange={(e) =>
                                        handleChange('deskripsi', e.target.value)
                                    }
                                    className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-indigo-500 resize-none"
                                />

                            </div>

                        </div>

                    </div>

                    {/* ========================================== */}
                    {/* RIGHT SIDEBAR */}
                    {/* ========================================== */}
                    <div className="space-y-6">

                        {/* ========================================== */}
                        {/* PREVIEW */}
                        {/* ========================================== */}
                        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

                            <div className="px-5 py-4 border-b border-gray-200">

                                <h2 className="text-base font-semibold text-gray-900">
                                    Preview Warehouse
                                </h2>

                            </div>

                            <div className="p-5 space-y-5">

                                <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                                    <Warehouse
                                        size={30}
                                        className="text-indigo-600"
                                    />
                                </div>

                                <div>

                                    <div className="text-lg font-bold text-gray-900">
                                        {form.namaWarehouse || 'Nama Warehouse'}
                                    </div>

                                    <div className="text-sm text-gray-500 mt-1">
                                        {form.kodeWarehouse || 'WH-000'}
                                    </div>

                                </div>

                                <div>
                                    {renderTypePreview()}
                                </div>

                                <div className="space-y-4 pt-2">

                                    <div className="flex items-start gap-3">

                                        <MapPin
                                            size={16}
                                            className="text-gray-400 mt-0.5"
                                        />

                                        <div>

                                            <div className="text-xs text-gray-500">
                                                Lokasi
                                            </div>

                                            <div className="text-sm font-medium text-gray-800 mt-0.5">
                                                {form.lokasi || '-'}
                                            </div>

                                        </div>

                                    </div>

                                    <div className="flex items-start gap-3">

                                        <Boxes
                                            size={16}
                                            className="text-gray-400 mt-0.5"
                                        />

                                        <div>

                                            <div className="text-xs text-gray-500">
                                                Kapasitas
                                            </div>

                                            <div className="text-sm font-medium text-gray-800 mt-0.5">
                                                {form.kapasitas || '-'}
                                            </div>

                                        </div>

                                    </div>

                                    <div className="flex items-start gap-3">

                                        <User
                                            size={16}
                                            className="text-gray-400 mt-0.5"
                                        />

                                        <div>

                                            <div className="text-xs text-gray-500">
                                                PIC Warehouse
                                            </div>

                                            <div className="text-sm font-medium text-gray-800 mt-0.5">
                                                {form.picWarehouse || '-'}
                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* ========================================== */}
                        {/* UPLOAD */}
                        {/* ========================================== */}
                        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

                            <div className="px-5 py-4 border-b border-gray-200">

                                <h2 className="text-base font-semibold text-gray-900">
                                    Upload Foto Warehouse
                                </h2>

                            </div>

                            <div className="p-5">

                                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-indigo-300 transition cursor-pointer">

                                    <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-50 flex items-center justify-center">

                                        <Upload
                                            size={24}
                                            className="text-indigo-600"
                                        />

                                    </div>

                                    <div className="mt-4 text-sm font-semibold text-gray-800">
                                        Upload Foto Warehouse
                                    </div>

                                    <div className="mt-1 text-xs text-gray-500">
                                        PNG / JPG maksimal 5MB
                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* ========================================== */}
                        {/* ALERT */}
                        {/* ========================================== */}
                        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">

                            <div className="flex items-start gap-3">

                                <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">

                                    <AlertTriangle
                                        size={20}
                                        className="text-amber-700"
                                    />

                                </div>

                                <div>

                                    <h3 className="font-semibold text-amber-900">
                                        Informasi
                                    </h3>

                                    <p className="text-sm text-amber-800 mt-1 leading-relaxed">
                                        Pastikan data warehouse sudah sesuai
                                        sebelum disimpan agar memudahkan monitoring
                                        inventory dan alat project.
                                    </p>

                                </div>

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
                        type="button"
                        className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-sm transition"
                    >
                        <CheckCircle2 size={18} />
                        Simpan Warehouse
                    </button>

                </div>

            </div>

        </PortalLayout>
    );
}