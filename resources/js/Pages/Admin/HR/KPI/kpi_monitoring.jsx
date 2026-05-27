import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { 
    Search, Filter, Eye, BarChart2, TrendingUp, CheckCircle2, Clock
} from 'lucide-react';

export default function KPIMonitoringListPage() {
    const navigate = useNavigate();
    
    // Contoh data list untuk Monitoring KPI
    const [data] = useState([
        { id: 1, karyawan: 'Budi Santoso', periode: 'Q1 2026', pencapaian: '85%', status: 'On Track' },
        { id: 2, karyawan: 'Siti Aminah', periode: 'Q1 2026', pencapaian: '60%', status: 'Needs Improvement' },
    ]);

    return (
        <PortalLayout>
            <div className="space-y-6">
                {/* Header Section */}
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">KPI Monitoring</h1>
                        <div className="flex items-center gap-2 mt-1 text-sm">
                            <span className="text-gray-400">HR & Manpower</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-blue-600 font-medium">KPI Monitoring</span>
                        </div>
                    </div>
                </div>

                {/* Filter & Search Bar */}
                <div className="flex gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Cari data monitoring..." 
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" 
                        />
                    </div>
                    <button className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm flex items-center gap-2 hover:bg-gray-50">
                        <Filter size={18} /> Filter
                    </button>
                </div>

                {/* Table Section */}
                <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-600">
                            <tr>
                                <th className="px-6 py-4">Karyawan</th>
                                <th className="px-6 py-4">Periode</th>
                                <th className="px-6 py-4">Pencapaian (%)</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {data.map((row) => (
                                <tr key={row.id} className="hover:bg-gray-50/50">
                                    <td className="px-6 py-4 font-medium text-gray-900">{row.karyawan}</td>
                                    <td className="px-6 py-4 text-gray-600">{row.periode}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold">{row.pencapaian}</span>
                                            <TrendingUp size={16} className={row.pencapaian >= '80%' ? 'text-emerald-500' : 'text-amber-500'} />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                                            row.status === 'On Track' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                                        }`}>
                                            {row.status === 'On Track' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                                            {row.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <button 
                                            onClick={() => navigate(`/portal/manpower/kpi-monitoring/detail`)}
                                            className="text-blue-600 hover:text-blue-800 p-0.5 transition"
                                            title="Lihat Monitoring"
                                        >
                                            <Eye size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {/* Pagination */}
                    <div className="px-6 py-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
                        <span>Menampilkan {data.length} dari {data.length} data</span>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 border rounded-lg hover:bg-gray-50">Sebelumnya</button>
                            <button className="px-3 py-1 border rounded-lg hover:bg-gray-50">Selanjutnya</button>
                        </div>
                    </div>
                </div>
            </div>
        </PortalLayout>
    );
}