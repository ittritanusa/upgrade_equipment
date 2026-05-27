import React, { useEffect } from 'react';

import {
    BookOpen,
    Calendar,
    FileText,
    Landmark,
    BadgeDollarSign,
    CheckCircle2,
} from 'lucide-react';

// ======================================================
// MOCK DATA
// ======================================================
const DETAIL_JOURNAL = {
    nomorJournal: 'JV-2026-00021',
    tanggal: '28 Mei 2026',
    reference: 'Pembayaran Vendor Material',
    description:
        'Pembayaran pembelian material semen dan pasir untuk Project Tol MBZ.',
    status: 'Posted',

    dibuatOleh: 'Ekki Maulana',
    disetujuiOleh: 'Finance Manager',

    entries: [
        {
            id: 1,
            coaCode: '5101',
            coaName: 'Biaya Material Proyek',
            debit: 25000000,
            credit: 0,
        },
        {
            id: 2,
            coaCode: '1101',
            coaName: 'Kas Bank BCA',
            debit: 0,
            credit: 25000000,
        },
    ],
};

// ======================================================
// PAGE
// ======================================================
export default function PrintJournalEntry() {

    const detail = DETAIL_JOURNAL;

    // ======================================================
    // AUTO PRINT
    // ======================================================
    useEffect(() => {

        const timer = setTimeout(() => {
            window.print();
        }, 500);

        return () => clearTimeout(timer);

    }, []);

    // ======================================================
    // TOTAL
    // ======================================================
    const totalDebit = detail.entries.reduce(
        (sum, item) => sum + Number(item.debit || 0),
        0
    );

    const totalCredit = detail.entries.reduce(
        (sum, item) => sum + Number(item.credit || 0),
        0
    );

    // ======================================================
    // FORMAT RUPIAH
    // ======================================================
    const formatRupiah = (value) => {

        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(value || 0);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8 print:bg-white print:p-0">

            {/* ====================================================== */}
            {/* PRINT AREA */}
            {/* ====================================================== */}
            <div className="max-w-6xl mx-auto bg-white border border-gray-200 shadow-xl print:shadow-none print:border-none">

                {/* ====================================================== */}
                {/* HEADER */}
                {/* ====================================================== */}
                <div className="border-b border-gray-200 px-10 py-8">

                    <div className="flex items-start justify-between gap-8">

                        {/* COMPANY */}
                        <div>

                            <div className="text-3xl font-bold text-gray-900">
                                PT. ANUGRAH GUNA SEMESTA
                            </div>

                            <div className="mt-2 text-sm text-gray-600 leading-relaxed">
                                Bintaro Tride Center, Ruko Lantai Dasar Blok C2-18
                                Jalan Jendral Sudirman, South Tangerang.
                                <br />
                                Telp: (021) 555-9988 | Email:
                                info@anugrahgunasemesta.com
                            </div>

                        </div>

                        {/* DOCUMENT */}
                        <div className="text-right">

                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold text-sm">

                                <BookOpen size={16} />

                                JOURNAL ENTRY

                            </div>

                            <div className="mt-4">

                                <div className="text-xs text-gray-500">
                                    Nomor Journal
                                </div>

                                <div className="font-mono text-lg font-bold text-indigo-600">
                                    {detail.nomorJournal}
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                {/* ====================================================== */}
                {/* BODY */}
                {/* ====================================================== */}
                <div className="px-10 py-8 space-y-8">

                    {/* ====================================================== */}
                    {/* GENERAL INFORMATION */}
                    {/* ====================================================== */}
                    <div className="grid grid-cols-2 gap-8">

                        {/* LEFT */}
                        <div className="space-y-5">

                            <div>

                                <div className="flex items-center gap-2 mb-1">

                                    <Calendar
                                        size={14}
                                        className="text-gray-400"
                                    />

                                    <span className="text-xs text-gray-500">
                                        Tanggal Journal
                                    </span>

                                </div>

                                <div className="font-semibold text-gray-900">
                                    {detail.tanggal}
                                </div>

                            </div>

                            <div>

                                <div className="flex items-center gap-2 mb-1">

                                    <Landmark
                                        size={14}
                                        className="text-gray-400"
                                    />

                                    <span className="text-xs text-gray-500">
                                        Reference
                                    </span>

                                </div>

                                <div className="font-semibold text-gray-900">
                                    {detail.reference}
                                </div>

                            </div>

                        </div>

                        {/* RIGHT */}
                        <div className="space-y-5">

                            <div>

                                <div className="text-xs text-gray-500 mb-1">
                                    Status Journal
                                </div>

                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">

                                    <CheckCircle2 size={12} />

                                    {detail.status}

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

                        </div>

                    </div>

                    {/* ====================================================== */}
                    {/* DESCRIPTION */}
                    {/* ====================================================== */}
                    <div>

                        <div className="flex items-center gap-2 mb-2">

                            <FileText
                                size={16}
                                className="text-indigo-600"
                            />

                            <h2 className="text-sm font-bold text-gray-900">
                                Deskripsi Journal
                            </h2>

                        </div>

                        <div className="border border-gray-200 rounded-2xl bg-gray-50 p-4 text-sm text-gray-700 leading-relaxed">
                            {detail.description}
                        </div>

                    </div>

                    {/* ====================================================== */}
                    {/* TABLE */}
                    {/* ====================================================== */}
                    <div>

                        <div className="flex items-center gap-2 mb-4">

                            <BadgeDollarSign
                                size={18}
                                className="text-indigo-600"
                            />

                            <h2 className="text-lg font-bold text-gray-900">
                                Detail Journal Entry
                            </h2>

                        </div>

                        <div className="overflow-hidden border border-gray-200 rounded-2xl">

                            <table className="min-w-full text-sm">

                                <thead className="bg-gray-100 border-b border-gray-200 uppercase text-xs tracking-wider text-gray-700">

                                    <tr>

                                        <th className="px-4 py-4 text-left">
                                            No
                                        </th>

                                        <th className="px-4 py-4 text-left">
                                            Account
                                        </th>

                                        <th className="px-4 py-4 text-right">
                                            Debit
                                        </th>

                                        <th className="px-4 py-4 text-right">
                                            Credit
                                        </th>

                                    </tr>

                                </thead>

                                <tbody className="divide-y divide-gray-200">

                                    {detail.entries.map((item, index) => (

                                        <tr key={item.id}>

                                            {/* NO */}
                                            <td className="px-4 py-4 text-center font-medium text-gray-700">
                                                {index + 1}
                                            </td>

                                            {/* ACCOUNT */}
                                            <td className="px-4 py-4">

                                                <div className="font-semibold text-gray-900">
                                                    {item.coaName}
                                                </div>

                                                <div className="text-xs text-gray-500 mt-1">
                                                    {item.coaCode}
                                                </div>

                                            </td>

                                            {/* DEBIT */}
                                            <td className="px-4 py-4 text-right font-semibold text-emerald-600">
                                                {item.debit > 0
                                                    ? formatRupiah(item.debit)
                                                    : '-'}
                                            </td>

                                            {/* CREDIT */}
                                            <td className="px-4 py-4 text-right font-semibold text-red-600">
                                                {item.credit > 0
                                                    ? formatRupiah(item.credit)
                                                    : '-'}
                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                                {/* TOTAL */}
                                <tfoot className="bg-gray-50 border-t border-gray-200">

                                    <tr>

                                        <td
                                            colSpan={2}
                                            className="px-4 py-4 text-right font-bold text-gray-900"
                                        >
                                            TOTAL
                                        </td>

                                        <td className="px-4 py-4 text-right font-bold text-emerald-600">
                                            {formatRupiah(totalDebit)}
                                        </td>

                                        <td className="px-4 py-4 text-right font-bold text-red-600">
                                            {formatRupiah(totalCredit)}
                                        </td>

                                    </tr>

                                </tfoot>

                            </table>

                        </div>

                    </div>

                    {/* ====================================================== */}
                    {/* SIGNATURE */}
                    {/* ====================================================== */}
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
                                    Finance Staff
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
                                    Finance Manager
                                </div>

                            </div>

                            {/* RECEIVED */}
                            <div className="text-center">

                                <div className="text-sm font-semibold text-gray-900">
                                    Diperiksa Oleh
                                </div>

                                <div className="h-24"></div>

                                <div className="border-t border-gray-400 pt-2 text-sm font-semibold text-gray-900">
                                    __________________
                                </div>

                                <div className="text-xs text-gray-500 mt-1">
                                    Accounting Supervisor
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}