import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';

import {
    Check,
    ChevronRight,
    ChevronLeft,
    Trash2,
    Plus,
    FileText,
} from 'lucide-react';

const steps = [
    'Informasi Project',
    'RAB (Budget)',
    'Budget Plan',
    'Payment Term',
    'Dokumen',
    'Konfirmasi',
];

export default function CreateProject() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);

    // =========================
    // DYNAMIC TABLE STATE
    // =========================
    const [rabItems, setRabItems] = useState([]);

    const [budgetPlanItems, setBudgetPlanItems] =
        useState([]);

    const [paymentTerms, setPaymentTerms] =
        useState([]);

    const [documents, setDocuments] = useState([]);

    // =========================
    // NAVIGATION
    // =========================
    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    // =========================
    // RAB
    // =========================
    const addRabItem = () => {
        setRabItems([
            ...rabItems,
            {
                kategori: '',
                item: '',
                satuan: '',
                qty: '',
                harga: '',
                total: '',
            },
        ]);
    };

    const removeRabItem = (index) => {
        setRabItems(
            rabItems.filter((_, i) => i !== index)
        );
    };

    // =========================
    // BUDGET PLAN
    // =========================
    const addBudgetPlanItem = () => {
        setBudgetPlanItems([
            ...budgetPlanItems,
            {
                periode: '',
                item: '',
                satuan: '',
                qty: '',
                biaya: '',
                keterangan: '',
            },
        ]);
    };

    const removeBudgetPlanItem = (index) => {
        setBudgetPlanItems(
            budgetPlanItems.filter(
                (_, i) => i !== index
            )
        );
    };

    // =========================
    // PAYMENT TERM
    // =========================
    const addPaymentTerm = () => {
        setPaymentTerms([
            ...paymentTerms,
            {
                termin: '',
                nominal: '',
                persen: '',
                jatuhTempo: '',
                jenisTagihan: '',
            },
        ]);
    };

    const removePaymentTerm = (index) => {
        setPaymentTerms(
            paymentTerms.filter((_, i) => i !== index)
        );
    };

    // =========================
    // DOCUMENT
    // =========================
    const addDocument = () => {
        setDocuments([
            ...documents,
            {
                jenis: '',
                file: null,
            },
        ]);
    };

    const removeDocument = (index) => {
        setDocuments(
            documents.filter((_, i) => i !== index)
        );
    };

    return (
        <PortalLayout>
            <div className="space-y-6">

                {/* HEADER */}
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Project Management
                    </h1>

                    <div className="flex items-center gap-2 mt-1 text-sm">
                        <span className="text-gray-400">
                            Project Management
                        </span>

                        <span className="text-gray-300">
                            /
                        </span>

                        <span className="text-gray-500">
                            List Project
                        </span>

                        <span className="text-gray-300">
                            /
                        </span>

                        <span className="text-blue-600 font-medium">
                            Tambah Data
                        </span>
                    </div>
                </div>

                {/* CARD */}
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">

                    {/* CARD HEADER */}
                    <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                        {/* Title */}
                        <h2 className="text-lg font-semibold text-gray-800">
                            Form Input
                        </h2>

                        {/* Button */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => navigate('/portal/project')}
                                className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="icon icon-tabler icon-tabler-chevrons-left"
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M11 7l-5 5l5 5" />
                                    <path d="M17 7l-5 5l5 5" />
                                </svg>

                                Kembali
                            </button>
                        </div>
                    </div>

                    {/* STEPPER */}
                    <div className="px-6 pt-6">
                        <div className="flex items-center justify-between overflow-x-auto">

                            {steps.map((step, index) => {

                                const isActive =
                                    index === currentStep;

                                const isCompleted =
                                    index < currentStep;

                                return (
                                    <div
                                        key={step}
                                        className="flex items-center flex-1 min-w-max"
                                    >

                                        <div className="flex items-center">

                                            {/* CIRCLE */}
                                            <div
                                                className={`
                                                    w-8 h-8 rounded-full
                                                    flex items-center justify-center
                                                    text-xs font-semibold
                                                    border transition-all

                                                    ${
                                                        isCompleted
                                                            ? 'bg-blue-600 border-blue-600 text-white'
                                                            : ''
                                                    }

                                                    ${
                                                        isActive
                                                            ? 'bg-blue-600 border-blue-600 text-white'
                                                            : ''
                                                    }

                                                    ${
                                                        !isCompleted &&
                                                        !isActive
                                                            ? 'bg-gray-100 border-gray-300 text-gray-500'
                                                            : ''
                                                    }
                                                `}
                                            >
                                                {isCompleted ? (
                                                    <Check size={14} />
                                                ) : (
                                                    index + 1
                                                )}
                                            </div>

                                            {/* LABEL */}
                                            <span
                                                className={`
                                                    ml-2 text-sm whitespace-nowrap
                                                    ${
                                                        isActive
                                                            ? 'text-blue-600 font-semibold'
                                                            : 'text-gray-500'
                                                    }
                                                `}
                                            >
                                                {step}
                                            </span>
                                        </div>

                                        {/* LINE */}
                                        {index !==
                                            steps.length - 1 && (
                                            <div className="flex-1 h-px bg-gray-300 mx-4 min-w-[40px]" />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* CONTENT */}
                    <div className="p-6">

                        {/* ================================================= */}
                        {/* STEP 1 */}
                        {/* ================================================= */}
                        {currentStep === 0 && (

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                                {/* LEFT */}
                                <div>

                                    <h3 className="text-sm font-semibold text-gray-700 mb-4">
                                        Sumber Project
                                    </h3>

                                    <div className="space-y-4">

                                        <div>
                                            <label className="block text-sm text-gray-600 mb-2">
                                                Tanggal Closing
                                            </label>

                                            <input
                                                type="date"
                                                className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm text-gray-600 mb-2">
                                                Sumber Project
                                            </label>

                                            <input
                                                type="text"
                                                placeholder="Input Sumber Project"
                                                className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm text-gray-600 mb-2">
                                                Project Type
                                            </label>

                                            <select className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm">
                                                <option>
                                                    -- Choose Option --
                                                </option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm text-gray-600 mb-2">
                                                Project Category
                                            </label>

                                            <select className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm">
                                                <option>
                                                    -- Choose Option --
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* RIGHT */}
                                <div>

                                    <h3 className="text-sm font-semibold text-gray-700 mb-4">
                                        Informasi Project
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                        <div>
                                            <label className="block text-sm text-gray-600 mb-2">
                                                No Contract
                                            </label>

                                            <input
                                                type="text"
                                                placeholder="Input No Contract"
                                                className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm text-gray-600 mb-2">
                                                Nama Project
                                            </label>

                                            <input
                                                type="text"
                                                placeholder="Input Nama Project"
                                                className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm text-gray-600 mb-2">
                                                Client
                                            </label>

                                            <input
                                                type="text"
                                                placeholder="Input Client"
                                                className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm text-gray-600 mb-2">
                                                Lokasi Proyek
                                            </label>

                                            <input
                                                type="number"
                                                placeholder="Input Lokasi Proyek"
                                                className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm text-gray-600 mb-2">
                                                Project Manager
                                            </label>

                                            <select className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm">
                                                <option>
                                                    -- Choose Option --
                                                </option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm text-gray-600 mb-2">
                                                Nilai Proyek (Rp)
                                            </label>

                                            <input
                                                type="number"
                                                placeholder="Input Nilai Proyek (Rp)"
                                                className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm text-gray-600 mb-2">
                                                Rencana Mulai Proyek
                                            </label>

                                            <input
                                                type="date"
                                                placeholder="Input Rencana Mulai Proyek"
                                                className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm text-gray-600 mb-2">
                                                Rencana Selesai Proyek
                                            </label>

                                            <input
                                                type="date"
                                                placeholder="Input Rencana Selesai Proyek"
                                                className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ================================================= */}
                        {/* STEP 2 - RAB */}
                        {/* ================================================= */}
                        {currentStep === 1 && (

                            <div className="space-y-6">

                                {/* SUMMARY */}
                                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

                                    {[
                                        {
                                            title: 'Total RAB',
                                            value: 'Rp985.500.000',
                                        },
                                        {
                                            title: 'Total Material',
                                            value: 'Rp500.000.000',
                                        },
                                        {
                                            title: 'Total Manpower',
                                            value: 'Rp100.000.000',
                                        },
                                        {
                                            title: 'Total Equipment',
                                            value: 'Rp100.000.000',
                                        },
                                        {
                                            title: 'Total Lainnya',
                                            value: 'Rp285.500.000',
                                        },
                                    ].map((item) => (
                                        <div
                                            key={item.title}
                                            className="border border-gray-200 rounded-lg p-4"
                                        >
                                            <p className="text-lg font-semibold">
                                                {item.value}
                                            </p>

                                            <p className="text-xs text-gray-500 mt-1">
                                                {item.title}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* TABLE */}
                                <div className="border border-gray-200 rounded-lg overflow-hidden">

                                    <div className="overflow-x-auto">

                                        <table className="w-full text-sm">

                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-4 py-3">
                                                        No
                                                    </th>

                                                    <th className="px-4 py-3">
                                                        Kategori
                                                    </th>

                                                    <th className="px-4 py-3">
                                                        Item/Pekerjaan
                                                    </th>

                                                    <th className="px-4 py-3">
                                                        Satuan
                                                    </th>

                                                    <th className="px-4 py-3">
                                                        Qty
                                                    </th>

                                                    <th className="px-4 py-3">
                                                        Harga
                                                    </th>

                                                    <th className="px-4 py-3">
                                                        Total
                                                    </th>

                                                    <th className="px-4 py-3">
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>

                                            <tbody>

                                                {rabItems.length === 0 ? (

                                                    <tr>
                                                        <td
                                                            colSpan={8}
                                                            className="py-16 text-center"
                                                        >

                                                            <div className="flex flex-col items-center justify-center text-gray-400">
                                                                <FileText size={42} />
                                                                <p className="mt-3 text-sm">
                                                                    Belum ada data RAB
                                                                </p>
                                                            </div>

                                                        </td>
                                                    </tr>

                                                ) : (

                                                    rabItems.map((item, index) => (

                                                        <tr
                                                            key={index}
                                                            className="border-t"
                                                        >

                                                            <td className="px-4 py-3">
                                                                {index + 1}
                                                            </td>

                                                            <td className="px-4 py-3">
                                                                <select className="w-full h-10 rounded-lg border border-gray-300 px-3">
                                                                    <option>
                                                                        -- Pilih --
                                                                    </option>
                                                                </select>
                                                            </td>

                                                            <td className="px-4 py-3">
                                                                <input
                                                                    type="text"
                                                                    placeholder="Nama Item"
                                                                    className="w-full h-10 rounded-lg border border-gray-300 px-3"
                                                                />
                                                            </td>

                                                            <td className="px-4 py-3">
                                                                <input
                                                                    type="text"
                                                                    placeholder="Satuan"
                                                                    className="w-full h-10 rounded-lg border border-gray-300 px-3"
                                                                />
                                                            </td>

                                                            <td className="px-4 py-3">
                                                                <input
                                                                    type="number"
                                                                    placeholder="0"
                                                                    className="w-24 h-10 rounded-lg border border-gray-300 px-3"
                                                                />
                                                            </td>

                                                            <td className="px-4 py-3">
                                                                <input
                                                                    type="number"
                                                                    placeholder="0"
                                                                    className="w-full h-10 rounded-lg border border-gray-300 px-3"
                                                                />
                                                            </td>

                                                            <td className="px-4 py-3">
                                                                <input
                                                                    type="number"
                                                                    placeholder="0"
                                                                    className="w-full h-10 rounded-lg border border-gray-300 px-3"
                                                                />
                                                            </td>

                                                            <td className="px-4 py-3 text-center">
                                                                <button
                                                                    onClick={() =>
                                                                        removeRabItem(index)
                                                                    }
                                                                    className="w-9 h-9 rounded-lg bg-red-500 text-white flex items-center justify-center"
                                                                >
                                                                    <Trash2 size={15} />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* BUTTON */}
                                <button
                                    onClick={addRabItem}
                                    className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700"
                                >
                                    <Plus size={16} />
                                    Tambah
                                </button>
                            </div>
                        )}

                        {/* ================================================= */}
                        {/* STEP 3 */}
                        {/* ================================================= */}
                        {currentStep === 2 && (

                            <div className="space-y-6">

                                <div className="border border-gray-200 rounded-lg overflow-hidden">

                                    <div className="overflow-x-auto">

                                        <table className="w-full text-sm">

                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-4 py-3">
                                                        No
                                                    </th>

                                                    <th className="px-4 py-3">
                                                        Periode
                                                    </th>

                                                    <th className="px-4 py-3">
                                                        Item
                                                    </th>

                                                    <th className="px-4 py-3">
                                                        Qty
                                                    </th>

                                                    <th className="px-4 py-3">
                                                        Biaya
                                                    </th>

                                                    <th className="px-4 py-3">
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>

                                            <tbody>

                                                {budgetPlanItems.length === 0 ? (

                                                    <tr>
                                                        <td
                                                            colSpan={6}
                                                            className="py-16 text-center"
                                                        >
                                                            <div className="flex flex-col items-center justify-center text-gray-400">
                                                                <FileText size={42} />
                                                                <p className="mt-3 text-sm">
                                                                    Belum ada data budgeting plan
                                                                </p>
                                                            </div>
                                                        </td>
                                                    </tr>

                                                ) : (

                                                    budgetPlanItems.map((item, index) => (

                                                        <tr
                                                            key={index}
                                                            className="border-t"
                                                        >

                                                            <td className="px-4 py-3">
                                                                {index + 1}
                                                            </td>

                                                            <td className="px-4 py-3">
                                                                <input
                                                                    type="month"
                                                                    className="w-full h-10 rounded-lg border border-gray-300 px-3"
                                                                />
                                                            </td>

                                                            <td className="px-4 py-3">
                                                                <input
                                                                    type="text"
                                                                    placeholder="Item"
                                                                    className="w-full h-10 rounded-lg border border-gray-300 px-3"
                                                                />
                                                            </td>

                                                            <td className="px-4 py-3">
                                                                <input
                                                                    type="number"
                                                                    placeholder="0"
                                                                    className="w-full h-10 rounded-lg border border-gray-300 px-3"
                                                                />
                                                            </td>

                                                            <td className="px-4 py-3">
                                                                <input
                                                                    type="number"
                                                                    placeholder="0"
                                                                    className="w-full h-10 rounded-lg border border-gray-300 px-3"
                                                                />
                                                            </td>

                                                            <td className="px-4 py-3 text-center">
                                                                <button
                                                                    onClick={() =>
                                                                        removeBudgetPlanItem(index)
                                                                    }
                                                                    className="w-9 h-9 rounded-lg bg-red-500 text-white flex items-center justify-center"
                                                                >
                                                                    <Trash2 size={15} />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <button
                                    onClick={addBudgetPlanItem}
                                    className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-blue-600 text-white text-sm"
                                >
                                    <Plus size={16} />
                                    Tambah
                                </button>
                            </div>
                        )}

                        {/* STEP 4 */}
                        {currentStep === 3 && (

                            <div className="space-y-6">

                                <div className="border border-gray-200 rounded-lg overflow-hidden">

                                    <div className="overflow-x-auto">

                                        <table className="w-full text-sm">

                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-4 py-3">
                                                        No
                                                    </th>

                                                    <th className="px-4 py-3">
                                                        Termin
                                                    </th>

                                                    <th className="px-4 py-3">
                                                        Nominal
                                                    </th>

                                                    <th className="px-4 py-3">
                                                        Persen
                                                    </th>

                                                    <th className="px-4 py-3">
                                                        Jatuh Tempo
                                                    </th>

                                                    <th className="px-4 py-3">
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>

                                            <tbody>

                                                {paymentTerms.length === 0 ? (

                                                    <tr>
                                                        <td
                                                            colSpan={6}
                                                            className="py-16 text-center"
                                                        >
                                                            <div className="flex flex-col items-center justify-center text-gray-400">
                                                                <FileText size={42} />
                                                                <p className="mt-3 text-sm">
                                                                    Belum ada payment term
                                                                </p>
                                                            </div>
                                                        </td>
                                                    </tr>

                                                ) : (

                                                    paymentTerms.map((item, index) => (

                                                        <tr
                                                            key={index}
                                                            className="border-t"
                                                        >

                                                            <td className="px-4 py-3">
                                                                {index + 1}
                                                            </td>

                                                            <td className="px-4 py-3">
                                                                <input
                                                                    type="text"
                                                                    placeholder="Termin"
                                                                    className="w-full h-10 rounded-lg border border-gray-300 px-3"
                                                                />
                                                            </td>

                                                            <td className="px-4 py-3">
                                                                <input
                                                                    type="number"
                                                                    placeholder="0"
                                                                    className="w-full h-10 rounded-lg border border-gray-300 px-3"
                                                                />
                                                            </td>

                                                            <td className="px-4 py-3">
                                                                <input
                                                                    type="number"
                                                                    placeholder="0"
                                                                    className="w-full h-10 rounded-lg border border-gray-300 px-3"
                                                                />
                                                            </td>

                                                            <td className="px-4 py-3">
                                                                <input
                                                                    type="date"
                                                                    className="w-full h-10 rounded-lg border border-gray-300 px-3"
                                                                />
                                                            </td>

                                                            <td className="px-4 py-3 text-center">
                                                                <button
                                                                    onClick={() =>
                                                                        removePaymentTerm(index)
                                                                    }
                                                                    className="w-9 h-9 rounded-lg bg-red-500 text-white flex items-center justify-center"
                                                                >
                                                                    <Trash2 size={15} />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <button
                                    onClick={addPaymentTerm}
                                    className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-blue-600 text-white text-sm"
                                >
                                    <Plus size={16} />
                                    Tambah
                                </button>
                            </div>
                        )}

                        {/* STEP 5 */}
                        {currentStep === 4 && (

                            <div className="space-y-6">

                                <div className="border border-gray-200 rounded-lg overflow-hidden">

                                    <div className="overflow-x-auto">

                                        <table className="w-full text-sm">

                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-4 py-3">
                                                        No
                                                    </th>

                                                    <th className="px-4 py-3">
                                                        Jenis File
                                                    </th>

                                                    <th className="px-4 py-3">
                                                        Upload File
                                                    </th>

                                                    <th className="px-4 py-3">
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>

                                            <tbody>

                                                {documents.length === 0 ? (

                                                    <tr>
                                                        <td
                                                            colSpan={4}
                                                            className="py-16 text-center"
                                                        >
                                                            <div className="flex flex-col items-center justify-center text-gray-400">
                                                                <FileText size={42} />
                                                                <p className="mt-3 text-sm">
                                                                    Belum ada dokumen
                                                                </p>
                                                            </div>
                                                        </td>
                                                    </tr>

                                                ) : (

                                                    documents.map((item, index) => (

                                                        <tr
                                                            key={index}
                                                            className="border-t"
                                                        >

                                                            <td className="px-4 py-3">
                                                                {index + 1}
                                                            </td>

                                                            <td className="px-4 py-3">
                                                                <input
                                                                    type="text"
                                                                    placeholder="Jenis File"
                                                                    className="w-full h-10 rounded-lg border border-gray-300 px-3"
                                                                />
                                                            </td>

                                                            <td className="px-4 py-3">
                                                                <input
                                                                    type="file"
                                                                    className="w-full h-10 rounded-lg border border-gray-300 px-3 py-2"
                                                                />
                                                            </td>

                                                            <td className="px-4 py-3 text-center">
                                                                <button
                                                                    onClick={() =>
                                                                        removeDocument(index)
                                                                    }
                                                                    className="w-9 h-9 rounded-lg bg-red-500 text-white flex items-center justify-center"
                                                                >
                                                                    <Trash2 size={15} />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <button
                                    onClick={addDocument}
                                    className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-blue-600 text-white text-sm"
                                >
                                    <Plus size={16} />
                                    Tambah
                                </button>
                            </div>
                        )}

                        {/* STEP 6 */}
                        {currentStep === 5 && (

                            <div className="space-y-6">

                                <div className="rounded-xl border border-green-200 bg-green-50 p-6">
                                    <h3 className="text-lg font-semibold text-green-700">
                                        Konfirmasi Data
                                    </h3>

                                    <p className="text-sm text-green-600 mt-2">
                                        Pastikan seluruh data project sudah benar sebelum disimpan.
                                    </p>
                                </div>

                            </div>
                        )}
                    </div>

                    {/* FOOTER */}
                    <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">

                        <button
                            onClick={prevStep}
                            disabled={currentStep === 0}
                            className={`
                                inline-flex items-center gap-2
                                h-11 px-5 rounded-lg text-sm font-medium transition

                                ${
                                    currentStep === 0
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'border border-gray-300 hover:bg-gray-100'
                                }
                            `}
                        >
                            <ChevronLeft size={16} />
                            Kembali
                        </button>

                        {currentStep ===
                        steps.length - 1 ? (

                            <button className="inline-flex items-center gap-2 h-11 px-6 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition">
                                Simpan Project
                            </button>

                        ) : (

                            <button
                                onClick={nextStep}
                                className="inline-flex items-center gap-2 h-11 px-6 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
                            >
                                Lanjut
                                <ChevronRight size={16} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </PortalLayout>
    );
}