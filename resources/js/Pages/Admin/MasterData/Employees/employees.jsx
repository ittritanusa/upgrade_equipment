import React from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { 
    Search, Filter, Plus, Mail, Phone, Briefcase, Eye, Pencil, Users, UserCheck, Clock 
} from 'lucide-react';

export default function EmployeeManagementPage() {
    const navigate = useNavigate();

    const employees = [
        { id: 1, nip: 'EMP-001', name: 'Budi Santoso', role: 'Project Manager', dept: 'Operations', status: 'Aktif', email: 'budi@company.com', phone: '0812xxxx' },
        { id: 2, nip: 'EMP-002', name: 'Siti Aminah', role: 'HR Coordinator', dept: 'Human Resources', status: 'Aktif', email: 'siti@company.com', phone: '0813xxxx' },
        { id: 3, nip: 'EMP-003', name: 'Andi Wijaya', role: 'Finance Officer', dept: 'Finance', status: 'Cuti', email: 'andi@company.com', phone: '0857xxxx' },
    ];

    return (
        <PortalLayout>
            <div className="space-y-6">
                {/* Header & Stats */}
                <div className="flex flex-col gap-6">
                    <div className="flex justify-between items-end">
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Master Data Karyawan
                        </h1>
                        <div className="flex items-center gap-2 mt-1 text-sm">
                            <span className="text-gray-400">Master Data</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-blue-600 font-medium">Data Karyawan</span>
                        </div>
                        <button 
                            onClick={() => navigate('/portal/master/employees/create')}
                            className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 shadow-sm transition"
                        >
                            <Plus size={18} /> Tambah Karyawan
                        </button>
                    </div>

                    {/* Stats Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            { label: 'Total Karyawan', value: '128', icon: Users, color: 'text-blue-600' },
                            { label: 'Aktif', value: '120', icon: UserCheck, color: 'text-emerald-600' },
                            { label: 'Sedang Cuti', value: '8', icon: Clock, color: 'text-amber-600' },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                                <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}><stat.icon size={24}/></div>
                                <div>
                                    <p className="text-sm text-gray-500">{stat.label}</p>
                                    <h3 className="text-xl font-bold">{stat.value}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-gray-100 flex gap-4">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                            <input type="text" placeholder="Cari nama atau NIP..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition" />
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
                            <Filter size={18} /> Filter
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 text-gray-600 uppercase text-[10px] tracking-wider">
                                <tr>
                                    <th className="px-6 py-4 text-left">Karyawan</th>
                                    <th className="px-6 py-4 text-left">Departemen</th>
                                    <th className="px-6 py-4 text-left">Kontak</th>
                                    <th className="px-6 py-4 text-center">Status</th>
                                    <th className="px-6 py-4 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {employees.map((emp) => (
                                    <tr key={emp.id} className="hover:bg-gray-50/50 transition">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                                                    {emp.name.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-gray-900">{emp.name}</div>
                                                    <div className="text-[11px] text-gray-500">{emp.nip}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-gray-900 font-medium">{emp.dept}</div>
                                            <div className="text-[11px] text-gray-500">{emp.role}</div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">
                                            <div className="flex flex-col gap-0.5">
                                                <span className="flex items-center gap-1.5"><Mail size={12} /> {emp.email}</span>
                                                <span className="flex items-center gap-1.5"><Phone size={12} /> {emp.phone}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${emp.status === 'Aktif' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
                                                {emp.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex justify-center gap-2">
                                                <button onClick={() => navigate(`/portal/master/employees/detail`)} className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition"><Eye size={16} /></button>
                                                <button onClick={() => navigate(`/portal/master/employees/edit`)} className="p-2 hover:bg-amber-50 text-amber-600 rounded-lg transition"><Pencil size={16} /></button>
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