import React from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { 
    DollarSign, 
    Download, 
    Filter, 
    Search, 
    CheckCircle2, 
    Clock, 
    MoreHorizontal,
    Plus
} from 'lucide-react';

export default function PayrollPage() {
    const navigate = useNavigate();

    // Mock data untuk Payroll
    const payrollData = [
        { id: 1, nama: 'Budi Santoso', periode: 'Mei 2026', total: 'Rp 8.500.000', status: 'Dibayar' },
        { id: 2, nama: 'Siti Aminah', periode: 'Mei 2026', total: 'Rp 9.200.000', status: 'Pending' },
        { id: 3, nama: 'Andi Wijaya', periode: 'Mei 2026', total: 'Rp 7.800.000', status: 'Dibayar' },
    ];

    return (
        <PortalLayout>
            <div className="space-y-6">
                {/* HEADER */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Payroll & Compensation
                        </h1>

                        <div className="flex items-center gap-2 mt-1 text-sm">
                            <span className="text-gray-400">HR & Manpower</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-blue-600 font-medium">Payroll & Compensation</span>
                        </div>
                    </div>
                    <button 
                            onClick={() => navigate('/portal/manpower/payroll/create')}
                        className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition"
                    >
                        <Plus size={16} /> Proses Payroll
                    </button>
                </div>

                {/* SUMMARY CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SummaryCard title="Total Pengeluaran Bulan Ini" value="Rp 125.500.000" />
                    <SummaryCard title="Karyawan Telah Dibayar" value="42 / 45" />
                </div>

                {/* TABLE SECTION */}
                <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between gap-4">
                        <div className="relative w-full sm:w-64">
                            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                            <input type="text" placeholder="Cari karyawan..." className="w-full h-10 pl-10 pr-4 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>
                        <button className="flex items-center justify-center gap-2 h-10 px-4 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50">
                            <Filter size={16} /> Filter Periode
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-gray-600 font-semibold">
                                <tr>
                                    <th className="px-6 py-4">Nama Karyawan</th>
                                    <th className="px-6 py-4">Periode</th>
                                    <th className="px-6 py-4">Total Gaji</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {payrollData.map((row) => (
                                    <tr key={row.id} className="hover:bg-gray-50/50 transition">
                                        <td className="px-6 py-4 font-medium text-gray-900">{row.nama}</td>
                                        <td className="px-6 py-4 text-gray-600">{row.periode}</td>
                                        <td className="px-6 py-4 font-semibold text-gray-900">{row.total}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                                                row.status === 'Dibayar' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                                            }`}>
                                                {row.status === 'Dibayar' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                                                {row.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <button className="text-indigo-600 hover:text-indigo-800 font-medium text-xs">Download Slip</button>
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

// Sub-component untuk Summary Card
function SummaryCard({ title, value }) {
    return (
        <div className="bg-white border border-gray-200 p-6 rounded-3xl shadow-sm">
            <p className="text-sm text-gray-500 mb-1">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
    );
}