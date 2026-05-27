import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';

import {
    ArrowLeft,
    Save,
    FilePenLine,
    Calendar,
    BookOpen,
    FileText,
    Wallet,
    Landmark,
    BadgeDollarSign,
    Trash2,
    Plus,
    AlertCircle,
} from 'lucide-react';

// ======================================================
// MOCK DATA DETAIL JOURNAL
// ======================================================
const DETAIL_JOURNAL = {
    id: 1,
    nomorJournal: 'JV-2026-00021',
    tanggal: '2026-05-28',
    reference: 'Pembayaran Vendor Material',
    description:
        'Pembayaran pembelian material semen dan pasir untuk Project Tol MBZ.',
    status: 'Posted',

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
// MOCK COA
// ======================================================
const COA_LIST = [
    {
        code: '1101',
        name: 'Kas Bank BCA',
    },
    {
        code: '1102',
        name: 'Kas Bank Mandiri',
    },
    {
        code: '1201',
        name: 'Piutang Usaha',
    },
    {
        code: '5101',
        name: 'Biaya Material Proyek',
    },
    {
        code: '5201',
        name: 'Biaya Operasional',
    },
];

// ======================================================
// PAGE
// ======================================================
export default function EditJournalEntry() {

    const navigate = useNavigate();

    const { id } = useParams();

    const [journal, setJournal] = useState({
        nomorJournal: DETAIL_JOURNAL.nomorJournal,
        tanggal: DETAIL_JOURNAL.tanggal,
        reference: DETAIL_JOURNAL.reference,
        description: DETAIL_JOURNAL.description,
        status: DETAIL_JOURNAL.status,
    });

    const [entries, setEntries] = useState(
        DETAIL_JOURNAL.entries
    );

    // ======================================================
    // HANDLE HEADER FORM
    // ======================================================
    const handleHeaderChange = (field, value) => {

        setJournal((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // ======================================================
    // HANDLE SELECT COA
    // ======================================================
    const handleSelectCOA = (index, value) => {

        const selected = COA_LIST.find(
            (item) => item.code === value
        );

        const updated = [...entries];

        updated[index] = {
            ...updated[index],
            coaCode: selected?.code || '',
            coaName: selected?.name || '',
        };

        setEntries(updated);
    };

    // ======================================================
    // HANDLE ENTRY CHANGE
    // ======================================================
    const handleEntryChange = (
        index,
        field,
        value
    ) => {

        const updated = [...entries];

        updated[index][field] = value;

        setEntries(updated);
    };

    // ======================================================
    // ADD ROW
    // ======================================================
    const addRow = () => {

        setEntries([
            ...entries,
            {
                id: Date.now(),
                coaCode: '',
                coaName: '',
                debit: 0,
                credit: 0,
            },
        ]);
    };

    // ======================================================
    // REMOVE ROW
    // ======================================================
    const removeRow = (index) => {

        const updated = [...entries];

        updated.splice(index, 1);

        setEntries(updated);
    };

    // ======================================================
    // TOTAL DEBIT
    // ======================================================
    const totalDebit = entries.reduce(
        (sum, item) =>
            sum + Number(item.debit || 0),
        0
    );

    // ======================================================
    // TOTAL CREDIT
    // ======================================================
    const totalCredit = entries.reduce(
        (sum, item) =>
            sum + Number(item.credit || 0),
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
        <PortalLayout>

            <div className="space-y-6">

                {/* ====================================================== */}
                {/* HEADER */}
                {/* ====================================================== */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                    <div>

                        <div className="flex items-center gap-3">

                            <h1 className="text-2xl font-semibold text-gray-900">
                                Edit Journal Entry
                            </h1>

                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold">
                                Draft Edit
                            </span>

                        </div>

                        <div className="flex items-center gap-2 mt-1 text-sm">

                            <span className="text-gray-400">
                                Accounting & Finance
                            </span>

                            <span className="text-gray-300">/</span>

                            <span className="text-gray-400">
                                Journal Entry
                            </span>

                            <span className="text-gray-300">/</span>

                            <span className="text-indigo-600 font-medium">
                                {journal.nomorJournal}
                            </span>

                        </div>

                    </div>

                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 h-11 px-5 rounded-xl border border-gray-300 bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
                    >
                        <ArrowLeft size={18} />
                        Kembali
                    </button>

                </div>

                {/* ====================================================== */}
                {/* FORM HEADER */}
                {/* ====================================================== */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">

                    <div className="flex items-center gap-2 mb-6">

                        <FilePenLine
                            size={20}
                            className="text-indigo-600"
                        />

                        <div>

                            <h2 className="text-lg font-semibold text-gray-900">
                                Informasi Journal
                            </h2>

                            <p className="text-sm text-gray-500">
                                Update informasi header jurnal transaksi
                            </p>

                        </div>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        {/* NOMOR */}
                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nomor Journal
                            </label>

                            <div className="relative">

                                <BookOpen
                                    size={18}
                                    className="absolute left-3 top-3 text-gray-400"
                                />

                                <input
                                    type="text"
                                    value={journal.nomorJournal}
                                    disabled
                                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-300 bg-gray-50 text-sm text-gray-700"
                                />

                            </div>

                        </div>

                        {/* TANGGAL */}
                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tanggal Journal
                            </label>

                            <div className="relative">

                                <Calendar
                                    size={18}
                                    className="absolute left-3 top-3 text-gray-400"
                                />

                                <input
                                    type="date"
                                    value={journal.tanggal}
                                    onChange={(e) =>
                                        handleHeaderChange(
                                            'tanggal',
                                            e.target.value
                                        )
                                    }
                                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-300 text-sm outline-none focus:border-indigo-500"
                                />

                            </div>

                        </div>

                        {/* REFERENCE */}
                        <div className="md:col-span-2">

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Reference
                            </label>

                            <div className="relative">

                                <Landmark
                                    size={18}
                                    className="absolute left-3 top-3 text-gray-400"
                                />

                                <input
                                    type="text"
                                    value={journal.reference}
                                    onChange={(e) =>
                                        handleHeaderChange(
                                            'reference',
                                            e.target.value
                                        )
                                    }
                                    placeholder="Masukkan reference transaksi"
                                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-300 text-sm outline-none focus:border-indigo-500"
                                />

                            </div>

                        </div>

                        {/* DESCRIPTION */}
                        <div className="md:col-span-2">

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Deskripsi Journal
                            </label>

                            <div className="relative">

                                <FileText
                                    size={18}
                                    className="absolute left-3 top-3 text-gray-400"
                                />

                                <textarea
                                    rows={4}
                                    value={journal.description}
                                    onChange={(e) =>
                                        handleHeaderChange(
                                            'description',
                                            e.target.value
                                        )
                                    }
                                    placeholder="Masukkan deskripsi journal..."
                                    className="w-full rounded-2xl border border-gray-300 pl-10 pr-4 py-3 text-sm outline-none focus:border-indigo-500 resize-none"
                                />

                            </div>

                        </div>

                    </div>

                </div>

                {/* ====================================================== */}
                {/* DETAIL TABLE */}
                {/* ====================================================== */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

                    <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">

                        <div className="flex items-center gap-2">

                            <Wallet
                                size={20}
                                className="text-indigo-600"
                            />

                            <div>

                                <h2 className="text-lg font-semibold text-gray-900">
                                    Detail Journal Entry
                                </h2>

                                <p className="text-sm text-gray-500">
                                    Update debit & credit journal
                                </p>

                            </div>

                        </div>

                        <button
                            type="button"
                            onClick={addRow}
                            className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition"
                        >
                            <Plus size={16} />
                            Tambah Baris
                        </button>

                    </div>

                    <div className="overflow-x-auto">

                        <table className="min-w-full text-sm">

                            <thead className="bg-gray-50 border-b border-gray-200 uppercase text-xs tracking-wider text-gray-600">

                                <tr>

                                    <th className="px-4 py-4 text-left">
                                        Account
                                    </th>

                                    <th className="px-4 py-4 text-right">
                                        Debit
                                    </th>

                                    <th className="px-4 py-4 text-right">
                                        Credit
                                    </th>

                                    <th className="px-4 py-4 text-center">
                                        Action
                                    </th>

                                </tr>

                            </thead>

                            <tbody className="divide-y divide-gray-200">

                                {entries.map((item, index) => (

                                    <tr
                                        key={item.id}
                                        className="hover:bg-gray-50/50 transition"
                                    >

                                        {/* ACCOUNT */}
                                        <td className="px-4 py-4 min-w-[340px]">

                                            <select
                                                value={item.coaCode}
                                                onChange={(e) =>
                                                    handleSelectCOA(
                                                        index,
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full h-11 rounded-xl border border-gray-300 px-4 text-sm outline-none focus:border-indigo-500"
                                            >
                                                <option value="">
                                                    Pilih COA
                                                </option>

                                                {COA_LIST.map((coa) => (

                                                    <option
                                                        key={coa.code}
                                                        value={coa.code}
                                                    >
                                                        {coa.code} - {coa.name}
                                                    </option>

                                                ))}

                                            </select>

                                            {item.coaName && (

                                                <div className="mt-2 flex items-center gap-2">

                                                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-semibold">
                                                        <BadgeDollarSign size={11} />
                                                        Account
                                                    </span>

                                                    <span className="text-xs text-gray-500">
                                                        {item.coaName}
                                                    </span>

                                                </div>

                                            )}

                                        </td>

                                        {/* DEBIT */}
                                        <td className="px-4 py-4 text-right">

                                            <input
                                                type="number"
                                                min="0"
                                                value={item.debit}
                                                onChange={(e) =>
                                                    handleEntryChange(
                                                        index,
                                                        'debit',
                                                        e.target.value
                                                    )
                                                }
                                                className="w-40 h-11 rounded-xl border border-gray-300 px-4 text-right outline-none focus:border-indigo-500"
                                            />

                                        </td>

                                        {/* CREDIT */}
                                        <td className="px-4 py-4 text-right">

                                            <input
                                                type="number"
                                                min="0"
                                                value={item.credit}
                                                onChange={(e) =>
                                                    handleEntryChange(
                                                        index,
                                                        'credit',
                                                        e.target.value
                                                    )
                                                }
                                                className="w-40 h-11 rounded-xl border border-gray-300 px-4 text-right outline-none focus:border-indigo-500"
                                            />

                                        </td>

                                        {/* ACTION */}
                                        <td className="px-4 py-4 text-center">

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeRow(index)
                                                }
                                                className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-red-500 hover:bg-red-50 transition"
                                            >
                                                <Trash2 size={17} />
                                            </button>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                            {/* TOTAL */}
                            <tfoot className="bg-gray-50 border-t border-gray-200">

                                <tr>

                                    <td className="px-4 py-4 text-right font-bold text-gray-900">
                                        TOTAL
                                    </td>

                                    <td className="px-4 py-4 text-right font-bold text-emerald-600">
                                        {formatRupiah(totalDebit)}
                                    </td>

                                    <td className="px-4 py-4 text-right font-bold text-red-600">
                                        {formatRupiah(totalCredit)}
                                    </td>

                                    <td></td>

                                </tr>

                            </tfoot>

                        </table>

                    </div>

                </div>

                {/* ====================================================== */}
                {/* ALERT */}
                {/* ====================================================== */}
                <div className={`border rounded-2xl p-5 ${
                    totalDebit === totalCredit
                        ? 'bg-emerald-50 border-emerald-200'
                        : 'bg-red-50 border-red-200'
                }`}>

                    <div className="flex items-start gap-3">

                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            totalDebit === totalCredit
                                ? 'bg-emerald-100'
                                : 'bg-red-100'
                        }`}>

                            <AlertCircle
                                size={20}
                                className={
                                    totalDebit === totalCredit
                                        ? 'text-emerald-700'
                                        : 'text-red-700'
                                }
                            />

                        </div>

                        <div>

                            <h3 className={`font-semibold ${
                                totalDebit === totalCredit
                                    ? 'text-emerald-900'
                                    : 'text-red-900'
                            }`}>
                                {totalDebit === totalCredit
                                    ? 'Balance Journal'
                                    : 'Journal Tidak Balance'}
                            </h3>

                            <p className={`text-sm mt-1 leading-relaxed ${
                                totalDebit === totalCredit
                                    ? 'text-emerald-800'
                                    : 'text-red-800'
                            }`}>
                                {totalDebit === totalCredit
                                    ? 'Total debit dan credit sudah balance dan siap disimpan.'
                                    : 'Total debit dan credit harus balance sebelum journal dapat disimpan.'}
                            </p>

                        </div>

                    </div>

                </div>

                {/* ====================================================== */}
                {/* ACTION BUTTON */}
                {/* ====================================================== */}
                <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3">

                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="h-11 px-5 rounded-xl border border-gray-300 bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
                    >
                        Batal
                    </button>

                    <button
                        type="button"
                        className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-sm transition"
                    >
                        <Save size={18} />
                        Update Journal
                    </button>

                </div>

            </div>

        </PortalLayout>
    );
}