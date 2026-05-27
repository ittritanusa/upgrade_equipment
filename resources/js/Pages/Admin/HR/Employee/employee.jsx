import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { 
    Search, 
    Filter, 
    Plus, 
    MoreHorizontal, 
    UserPlus,
    Mail,
    Phone,
    Briefcase,
    Eye,
    Pencil
} from 'lucide-react';

export default function EmployeeManagementPage() {
    const navigate = useNavigate();

    // Mock data karyawan
    const employees = [
        { id: 1, name: 'Budi Santoso', role: 'Engineering', status: 'Aktif', email: 'budi@company.com' },
        { id: 2, name: 'Siti Aminah', role: 'HR & GA', status: 'Aktif', email: 'siti@company.com' },
        { id: 3, name: 'Andi Wijaya', role: 'Finance', status: 'Cuti', email: 'andi@company.com' },
    ];

    return (
        <PortalLayout>
            <div className="space-y-6">
                {/* HEADER */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Employee Management
                        </h1>

                        <div className="flex items-center gap-2 mt-1 text-sm">
                            <span className="text-gray-400">HR & Manpower</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-blue-600 font-medium">Employee Management</span>
                        </div>
                    </div>
                    <button 
                            onClick={() => navigate('/portal/manpower/employee/create')}
                        className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition"
                    >
                        <Plus size={16} /> Tambah Karyawan
                    </button>
                </div>

                {/* TABLE SECTION */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-gray-100 flex items-center justify-between gap-2">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                            <input type="text" placeholder="Cari nama atau jabatan..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                        </div>
                        <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                            <Filter size={16} /> Filter
                        </button>
                    </div>
                    
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-gray-700 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left">Nama Lengkap</th>
                                <th className="px-6 py-3 text-left">Jabatan</th>
                                <th className="px-6 py-3 text-left">Status</th>
                                <th className="px-6 py-3 text-left">Kontak</th>
                                <th className="px-6 py-3 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {employees.map((emp) => (
                                <tr key={emp.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-gray-900">{emp.name}</div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 flex items-center gap-2">
                                        <Briefcase size={14} className="text-gray-400" /> {emp.role}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${emp.status === 'Aktif' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                            {emp.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 text-xs">
                                        <div className="flex flex-col gap-1">
                                            <span className="flex items-center gap-1"><Mail size={12} /> {emp.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex items-center justify-center gap-3">
                                            {/* Button View */}
                                            <button 
                                                onClick={() => navigate(`/portal/manpower/employee/detail`)}
                                                className="text-blue-600 hover:text-blue-800 p-0.5 transition"
                                                title="Edit Data"
                                            >
                                                <Eye size={16} />
                                            </button>

                                            <button 
                                                onClick={() => navigate(`/portal/manpower/employee/edit`)}
                                                className="text-blue-600 hover:text-blue-800 p-0.5 transition"
                                                title="Edit Data"
                                            >
                                                <Pencil size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </PortalLayout>
    );
}