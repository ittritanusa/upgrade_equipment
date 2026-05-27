import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { 
    Search, 
    Filter, 
    CheckCircle2, 
    XCircle, 
    Clock, 
    Calendar,
    Plus
} from 'lucide-react';

export default function MasterLeaveAttendancePage() {
    const navigate = useNavigate();

    // Mock data pengajuan cuti
    const leaveRequests = [
        { id: 1, name: 'Budi Santoso', type: 'Cuti Tahunan', date: '01/06/2026 - 03/06/2026', status: 'Pending' },
        { id: 2, name: 'Siti Aminah', type: 'Sakit', date: '28/05/2026', status: 'Approved' },
        { id: 3, name: 'Andi Wijaya', type: 'Cuti Khusus', date: '05/06/2026', status: 'Rejected' },
    ];

    const getStatusStyle = (status) => {
        switch(status) {
            case 'Approved': return 'bg-green-100 text-green-700 border-green-200';
            case 'Rejected': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-amber-100 text-amber-700 border-amber-200';
        }
    };

    return (
        <PortalLayout>
            <div className="space-y-6">
                {/* HEADER */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Master Leave Attendance</h1>
                        <p className="text-sm text-gray-500">Kelola dan pantau seluruh pengajuan cuti karyawan</p>
                    </div>
                    <button
                        onClick={() => navigate('/portal/manpower/master-leave/create')}
                        className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
                    >
                        <Plus size={16} />
                        Ajukan Cuti
                    </button>
                </div>

                {/* TABLE SECTION */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-gray-100 flex items-center justify-between gap-2">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                            <input type="text" placeholder="Cari nama karyawan..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                        </div>
                        <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                            <Filter size={16} /> Filter
                        </button>
                    </div>
                    
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-gray-700 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left">Nama Karyawan</th>
                                <th className="px-6 py-3 text-left">Jenis Cuti</th>
                                <th className="px-6 py-3 text-left">Tanggal</th>
                                <th className="px-6 py-3 text-center">Status</th>
                                <th className="px-6 py-3 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {leaveRequests.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                                    <td className="px-6 py-4 text-gray-600">{item.type}</td>
                                    <td className="px-6 py-4 text-gray-500">{item.date}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${getStatusStyle(item.status)}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {item.status === 'Pending' ? (
                                            <div className="flex justify-center gap-2">
                                                <button className="p-1.5 bg-green-50 text-green-600 rounded-lg hover:bg-green-100">
                                                    <CheckCircle2 size={16} />
                                                </button>
                                                <button className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100">
                                                    <XCircle size={16} />
                                                </button>
                                            </div>
                                        ) : (
                                            <span className="text-gray-400 text-xs italic">-</span>
                                        )}
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