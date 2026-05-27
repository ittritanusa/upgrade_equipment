import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';

import {
    Plus,
    Search,
    Filter,
    Pencil,
    Eye,
    Wallet,
    Building2,
    Calendar,
    Clock3,
    CheckCircle2,
    AlertTriangle,
    FileSpreadsheet,
    Receipt,
    ArrowDownUp,
    Briefcase,
} from 'lucide-react';

// ==========================================
// MOCK DATA
// ==========================================
const PETTY_CASH_DATA = [
    {
        id: 1,
        transactionCode: 'PC-2026-00101',
        description: 'Pembelian ATK Proyek',
        project: 'Project Tol Cisumdawu',
        date: '28 Mei 2026',
        amount: 2500000,
        status: 'Approved',
    },
    {
        id: 2,
        transactionCode: 'PC-2026-00102',
        description: 'Bensin & Tol Operasional',
        project: 'Project Gedung DPR',
        date: '27 Mei 2026',
        amount: 850000,
        status: 'Pending',
    },
    {
        id: 3,
        transactionCode: 'PC-2026-00103',
        description: 'Konsumsi Rapat Tim',
        project: 'Head Office',
        date: '25 Mei 2026',
        amount: 1200000,
        status: 'Rejected',
    },
];

// ==========================================
// COMPONENT
// ==========================================
export default function PettyCashPage() {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    // Filter Data
    const filteredData = PETTY_CASH_DATA.filter((item) => {
        const matchSearch =
            item.transactionCode.toLowerCase().includes(search.toLowerCase()) ||
            item.description.toLowerCase().includes(search.toLowerCase()) ||
            item.project.toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === 'All' ? true : item.status === statusFilter;
        return matchSearch && matchStatus;
    });

    const formatRupiah = (value) =>
        new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value || 0);

    const renderStatusBadge = (status) => {
        const styles = {
            Approved: "bg-green-50 border-green-200 text-green-700",
            Pending: "bg-amber-50 border-amber-200 text-amber-700",
            Rejected: "bg-red-50 border-red-200 text-red-700",
        };
        const icons = {
            Approved: <CheckCircle2 size={12} />,
            Pending: <Clock3 size={12} />,
            Rejected: <AlertTriangle size={12} />,
        };
        return (
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold ${styles[status] || 'bg-gray-50'}`}>
                {icons[status]} {status}
            </span>
        );
    };

    return (
        <PortalLayout>
            <div className="space-y-6">
                {/* HEADER */}
                <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Petty Cash</h1>
                        <div className="flex items-center gap-2 mt-1 text-sm text-gray-400">
                            Accounting & Finance <span className="text-gray-300">/</span> 
                            <span className="text-indigo-600 font-medium">Petty Cash</span>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate('/portal/finance/petty-cash/create')}
                        className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition"
                    >
                        <Plus size={18} /> Transaksi Baru
                    </button>
                </div>

                {/* FILTER & SEARCH */}
                <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-5 flex flex-col xl:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search size={18} className="absolute left-4 top-3.5 text-gray-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari kode, deskripsi, atau project..."
                            className="w-full h-11 pl-11 pr-4 rounded-xl border border-gray-300 text-sm outline-none focus:border-indigo-500"
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="h-11 px-4 rounded-xl border border-gray-300 text-sm outline-none focus:border-indigo-500"
                    >
                        <option value="All">Semua Status</option>
                        <option value="Approved">Approved</option>
                        <option value="Pending">Pending</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>

                {/* TABLE */}
                <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">Daftar Transaksi Petty Cash</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead className="bg-gray-50 border-b border-gray-200 uppercase text-xs tracking-wider text-gray-600">
                                <tr>
                                    <th className="px-5 py-4 text-left">Kode Transaksi</th>
                                    <th className="px-5 py-4 text-left">Deskripsi</th>
                                    <th className="px-5 py-4 text-left">Project</th>
                                    <th className="px-5 py-4 text-center">Tanggal</th>
                                    <th className="px-5 py-4 text-right">Nominal</th>
                                    <th className="px-5 py-4 text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredData.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50/60 transition">
                                        <td className="px-5 py-5 font-semibold text-indigo-600">{item.transactionCode}</td>
                                        <td className="px-5 py-5">{item.description}</td>
                                        <td className="px-5 py-5 flex items-center gap-2"><Building2 size={14} className="text-gray-400"/> {item.project}</td>
                                        <td className="px-5 py-5 text-center">{item.date}</td>
                                        <td className="px-5 py-5 text-right font-medium">{formatRupiah(item.amount)}</td>
                                        <td className="px-5 py-5 text-center">{renderStatusBadge(item.status)}</td>
                                        <td className="px-5 py-5">

                                            <div className="flex items-center justify-center gap-2">

                                                <button
                                                    onClick={() =>
                                                        navigate(`/portal/finance/petty-cash/detail`)
                                                    }
                                                    className="w-10 h-10 rounded-xl border border-gray-200 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 flex items-center justify-center transition"
                                                >
                                                    <Eye size={17} />
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        navigate(`/portal/finance/petty-cash/edit`)
                                                    }
                                                    className="w-10 h-10 rounded-xl border border-gray-200 text-gray-600 hover:bg-amber-50 hover:text-amber-600 hover:border-amber-200 flex items-center justify-center transition"
                                                >
                                                    <Pencil size={17} />
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