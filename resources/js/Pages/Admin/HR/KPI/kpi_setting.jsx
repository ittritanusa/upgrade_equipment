import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { 
    Search, Plus, Filter, MoreVertical, Target, Clock, CheckCircle2, Eye, Pencil
} from 'lucide-react';

export default function KPISettingListPage() {
    const navigate = useNavigate();
    
    // Contoh data list untuk KPI
    const [data] = useState([
        { id: 1, karyawan: 'Budi Santoso', periode: 'Q1 2026', total_indikator: 5, status: 'Published' },
        { id: 2, karyawan: 'Siti Aminah', periode: 'Q1 2026', total_indikator: 4, status: 'Draft' },
    ]);

    return (
        <PortalLayout>
            <div className="space-y-6">
                {/* Header Section */}
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">KPI Setting</h1>
                        <div className="flex items-center gap-2 mt-1 text-sm">
                            <span className="text-gray-400">HR & Manpower</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-blue-600 font-medium">KPI Setting</span>
                        </div>
                    </div>
                    <button 
                        onClick={() => navigate('/portal/manpower/kpi-setting/create')}
                        className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition"
                    >
                        <Plus size={16} /> Tambah Data
                    </button>
                </div>

                {/* Filter & Search Bar */}
                <div className="flex gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Cari KPI karyawan..." 
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
                                <th className="px-6 py-4">Total Indikator</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {data.map((row) => (
                                <tr key={row.id} className="hover:bg-gray-50/50">
                                    <td className="px-6 py-4 font-medium text-gray-900">{row.karyawan}</td>
                                    <td className="px-6 py-4 text-gray-600">{row.periode}</td>
                                    <td className="px-6 py-4 text-gray-600">{row.total_indikator} Indikator</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                                            row.status === 'Published' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-600'
                                        }`}>
                                            {row.status === 'Published' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                                            {row.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <button 
                                            onClick={() => navigate(`/portal/manpower/kpi-setting/detail`)}
                                            className="text-blue-600 hover:text-blue-800 p-0.5 transition"
                                            title="Detail Data"
                                        >
                                            <Eye size={16} />
                                        </button>

                                        <button 
                                            onClick={() => navigate(`/portal/manpower/kpi-setting/edit`)}
                                            className="text-blue-600 hover:text-blue-800 p-0.5 transition"
                                            title="Edit Data"
                                        >
                                            <Pencil size={16} />
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