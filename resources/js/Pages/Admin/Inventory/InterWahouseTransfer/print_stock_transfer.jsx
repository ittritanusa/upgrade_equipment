import React, { useEffect } from 'react';

import {
    ArrowRightLeft,
    Truck,
    ClipboardCheck,
    Package,
    Wrench,
    CheckCircle2,
} from 'lucide-react';

// ==========================================
// MOCK DATA
// ==========================================
const DETAIL_TRANSFER = {
    noDoc: 'IWT-2026-00021',
    tanggal: '28 Mei 2026',
    status: 'Approved',

    tipeTransfer: 'Peminjaman Alat Berat',

    dariProject: 'Gudang Pusat',
    tujuanProject: 'Project Tol Cisumdawu',

    kendaraan: 'Lowbed Trailer',
    driver: 'Budi Santoso',
    noHpDriver: '0812-8899-7788',

    dibuatOleh: 'Ekki Maulana',
    disetujuiOleh: 'Site Manager',

    tanggalKebutuhan: '30 Mei 2026',

    notes:
        'Excavator digunakan untuk pekerjaan penggalian area drainase utama pada project Tol Cisumdawu.',

    items: [
        {
            id: 1,
            kode: 'HVY-001',
            nama: 'Excavator CAT 320D',
            kategori: 'Alat Berat',
            qty: 1,
            satuan: 'Unit',
            kondisi: 'Baik',
            keterangan: 'Unit utama pekerjaan cut & fill',
        },
        {
            id: 2,
            kode: 'TLS-002',
            nama: 'Pacul Baja',
            kategori: 'Tools',
            qty: 8,
            satuan: 'Unit',
            kondisi: 'Baik',
            keterangan: 'Digunakan untuk helper lapangan',
        },
    ],
};

export default function PrintInterWarehouseTransfer() {

    const detail = DETAIL_TRANSFER;

    // ==========================================
    // AUTO PRINT
    // ==========================================
    useEffect(() => {

        const timer = setTimeout(() => {
            window.print();
        }, 500);

        return () => clearTimeout(timer);

    }, []);

    // ==========================================
    // CATEGORY BADGE
    // ==========================================
    const renderCategory = (category) => {

        if (category === 'Alat Berat') {
            return (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-red-50 text-red-700 border border-red-200 text-[11px] font-semibold">
                    <Truck size={10} />
                    Alat Berat
                </span>
            );
        }

        if (category === 'Tools') {
            return (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-amber-50 text-amber-700 border border-amber-200 text-[11px] font-semibold">
                    <Wrench size={10} />
                    Tools
                </span>
            );
        }

        return (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 text-[11px] font-semibold">
                <Package size={10} />
                Material
            </span>
        );
    };

    return (
        <>
            {/* ========================================== */}
            {/* PRINT STYLE */}
            {/* ========================================== */}
            <style>
                {`
                    @media print {

                        body {
                            background: white !important;
                        }

                        @page {
                            size: A4 portrait;
                            margin: 12mm;
                        }

                    }
                `}
            </style>

            <div className="min-h-screen bg-gray-100 p-8 print:bg-white print:p-0">

                {/* ========================================== */}
                {/* PRINT AREA */}
                {/* ========================================== */}
                <div className="max-w-5xl mx-auto bg-white shadow-xl print:shadow-none border border-gray-200 print:border-none">

                    {/* ========================================== */}
                    {/* HEADER */}
                    {/* ========================================== */}
                    <div className="border-b border-gray-200 px-10 py-8">

                        <div className="flex items-start justify-between gap-8">

                            {/* COMPANY */}
                            <div>

                                <div className="text-3xl font-bold text-gray-900">
                                    PT. ANUGRAH GUNA SEMESTA
                                </div>

                                <div className="mt-2 text-sm text-gray-600 leading-relaxed">
                                    Bintaro Tride Center, Ruko Lantai Dasar Blok C2-18 Jalan Jendral Sudirman, SOUTH TANGERANG.
                                    <br />
                                    Telp: (021) 555-9988 | Email: info@anugrahgunasemesta.com
                                </div>

                            </div>

                            {/* DOCUMENT */}
                            <div className="text-right">

                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold text-sm">
                                    <ArrowRightLeft size={16} />
                                    INTER WAREHOUSE TRANSFER
                                </div>

                                <div className="mt-4">

                                    <div className="text-xs text-gray-500">
                                        Nomor Dokumen
                                    </div>

                                    <div className="font-mono text-lg font-bold text-indigo-600">
                                        {detail.noDoc}
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* ========================================== */}
                    {/* BODY */}
                    {/* ========================================== */}
                    <div className="px-10 py-8 space-y-8">

                        {/* ========================================== */}
                        {/* GENERAL INFO */}
                        {/* ========================================== */}
                        <div className="grid grid-cols-2 gap-8">

                            {/* LEFT */}
                            <div className="space-y-4">

                                <div>
                                    <div className="text-xs text-gray-500 mb-1">
                                        Tanggal Pengajuan
                                    </div>

                                    <div className="font-semibold text-gray-900">
                                        {detail.tanggal}
                                    </div>
                                </div>

                                <div>
                                    <div className="text-xs text-gray-500 mb-1">
                                        Jenis Transfer
                                    </div>

                                    <div className="font-semibold text-gray-900">
                                        {detail.tipeTransfer}
                                    </div>
                                </div>

                                <div>
                                    <div className="text-xs text-gray-500 mb-1">
                                        Dari Project / Gudang
                                    </div>

                                    <div className="font-semibold text-gray-900">
                                        {detail.dariProject}
                                    </div>
                                </div>

                                <div>
                                    <div className="text-xs text-gray-500 mb-1">
                                        Tujuan Project
                                    </div>

                                    <div className="font-semibold text-gray-900">
                                        {detail.tujuanProject}
                                    </div>
                                </div>

                            </div>

                            {/* RIGHT */}
                            <div className="space-y-4">

                                <div>
                                    <div className="text-xs text-gray-500 mb-1">
                                        Kendaraan
                                    </div>

                                    <div className="font-semibold text-gray-900">
                                        {detail.kendaraan}
                                    </div>
                                </div>

                                <div>
                                    <div className="text-xs text-gray-500 mb-1">
                                        Driver / PIC
                                    </div>

                                    <div className="font-semibold text-gray-900">
                                        {detail.driver}
                                    </div>
                                </div>

                                <div>
                                    <div className="text-xs text-gray-500 mb-1">
                                        Nomor HP Driver
                                    </div>

                                    <div className="font-semibold text-gray-900">
                                        {detail.noHpDriver}
                                    </div>
                                </div>

                                <div>
                                    <div className="text-xs text-gray-500 mb-1">
                                        Tanggal Kebutuhan
                                    </div>

                                    <div className="font-semibold text-gray-900">
                                        {detail.tanggalKebutuhan}
                                    </div>
                                </div>

                            </div>

                        </div>

                        {/* ========================================== */}
                        {/* NOTES */}
                        {/* ========================================== */}
                        <div>

                            <div className="text-sm font-bold text-gray-900 mb-2">
                                Catatan Pengajuan
                            </div>

                            <div className="border border-gray-200 rounded-xl p-4 text-sm text-gray-700 leading-relaxed bg-gray-50">
                                {detail.notes}
                            </div>

                        </div>

                        {/* ========================================== */}
                        {/* TABLE */}
                        {/* ========================================== */}
                        <div>

                            <div className="flex items-center gap-2 mb-4">

                                <ClipboardCheck
                                    size={18}
                                    className="text-indigo-600"
                                />

                                <h2 className="text-lg font-bold text-gray-900">
                                    Detail Item Transfer
                                </h2>

                            </div>

                            <div className="overflow-hidden border border-gray-200 rounded-2xl">

                                <table className="min-w-full text-sm">

                                    <thead className="bg-gray-100 border-b border-gray-200 text-gray-700 uppercase text-xs tracking-wider">

                                        <tr>

                                            <th className="px-4 py-4 text-left">
                                                No
                                            </th>

                                            <th className="px-4 py-4 text-left">
                                                Item
                                            </th>

                                            <th className="px-4 py-4 text-center">
                                                Kategori
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

                                        </tr>

                                    </thead>

                                    <tbody className="divide-y divide-gray-200">

                                        {detail.items.map((item, index) => (

                                            <tr key={item.id}>

                                                {/* NO */}
                                                <td className="px-4 py-4 text-center font-medium text-gray-700">
                                                    {index + 1}
                                                </td>

                                                {/* ITEM */}
                                                <td className="px-4 py-4">

                                                    <div className="font-semibold text-gray-900">
                                                        {item.nama}
                                                    </div>

                                                    <div className="text-xs text-gray-500 mt-1">
                                                        {item.kode}
                                                    </div>

                                                </td>

                                                {/* CATEGORY */}
                                                <td className="px-4 py-4 text-center">
                                                    {renderCategory(item.kategori)}
                                                </td>

                                                {/* QTY */}
                                                <td className="px-4 py-4 text-center font-bold text-indigo-600">
                                                    {item.qty} {item.satuan}
                                                </td>

                                                {/* CONDITION */}
                                                <td className="px-4 py-4 text-center">

                                                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-50 text-green-700 border border-green-200 text-xs font-semibold">
                                                        <CheckCircle2 size={11} />
                                                        {item.kondisi}
                                                    </span>

                                                </td>

                                                {/* NOTES */}
                                                <td className="px-4 py-4 text-gray-700">
                                                    {item.keterangan}
                                                </td>

                                            </tr>

                                        ))}

                                    </tbody>

                                </table>

                            </div>

                        </div>

                        {/* ========================================== */}
                        {/* SIGNATURE */}
                        {/* ========================================== */}
                        <div className="pt-12">

                            <div className="grid grid-cols-3 gap-10">

                                {/* REQUESTOR */}
                                <div className="text-center">

                                    <div className="text-sm font-semibold text-gray-900">
                                        Dibuat Oleh
                                    </div>

                                    <div className="h-24"></div>

                                    <div className="border-t border-gray-400 pt-2 text-sm font-semibold text-gray-900">
                                        {detail.dibuatOleh}
                                    </div>

                                    <div className="text-xs text-gray-500 mt-1">
                                        Requestor
                                    </div>

                                </div>

                                {/* APPROVAL */}
                                <div className="text-center">

                                    <div className="text-sm font-semibold text-gray-900">
                                        Disetujui Oleh
                                    </div>

                                    <div className="h-24"></div>

                                    <div className="border-t border-gray-400 pt-2 text-sm font-semibold text-gray-900">
                                        {detail.disetujuiOleh}
                                    </div>

                                    <div className="text-xs text-gray-500 mt-1">
                                        Site Manager
                                    </div>

                                </div>

                                {/* RECEIVER */}
                                <div className="text-center">

                                    <div className="text-sm font-semibold text-gray-900">
                                        Diterima Oleh
                                    </div>

                                    <div className="h-24"></div>

                                    <div className="border-t border-gray-400 pt-2 text-sm font-semibold text-gray-900">
                                        __________________
                                    </div>

                                    <div className="text-xs text-gray-500 mt-1">
                                        Warehouse / PIC Project
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}