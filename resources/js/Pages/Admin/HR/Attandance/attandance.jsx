import React, { useState } from 'react';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { 
    Calendar, 
    Search, 
    Download, 
    Filter,
    CheckCircle2,
    XCircle,
    Clock,
    MoreHorizontal 
} from 'lucide-react';

export default function AttendancePage() {
    // Dummy Data
    const attendanceData = [
        { id: 1, nama: 'Budi Santoso', status: 'Hadir', jam_masuk: '08:00', jam_keluar: '17:00', lokasi: '-6.2084855,106.638865' },
        { id: 2, nama: 'Siti Aminah', status: 'Terlambat', jam_masuk: '09:15', jam_keluar: '17:00', lokasi: '-6.2084855,106.638865' },
        { id: 3, nama: 'Andi Wijaya', status: 'Absen', jam_masuk: '-', jam_keluar: '-', lokasi: '-6.2084855,106.638865' },
    ];

    return (
        <PortalLayout>
            <div className="space-y-6">
                {/* HEADER */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Kehadiran</h1>
                        <p className="text-sm text-gray-500 mt-1">Pantau absensi karyawan secara real-time</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 h-10 px-4 rounded-xl border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50">
                            <Download size={16} /> Export
                        </button>
                    </div>
                </div>

                {/* STATS CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard title="Hadir" value="24" icon={<CheckCircle2 className="text-emerald-500" />} />
                    <StatCard title="Terlambat" value="3" icon={<Clock className="text-amber-500" />} />
                    <StatCard title="Absen" value="2" icon={<XCircle className="text-red-500" />} />
                </div>

                {/* TABLE SECTION */}
                <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between gap-4">
                        <div className="relative w-full sm:w-64">
                            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                            <input type="text" placeholder="Cari karyawan..." className="w-full h-10 pl-10 pr-4 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>
                        <button className="flex items-center justify-center gap-2 h-10 px-4 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50">
                            <Filter size={16} /> Filter Tanggal
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-gray-600 font-semibold">
                                <tr>
                                    <th className="px-6 py-4">Nama Karyawan</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Jam Masuk</th>
                                    <th className="px-6 py-4">Jam Keluar</th>
                                    <th className="px-6 py-4">Lokasi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {attendanceData.map((row) => (
                                    <tr key={row.id} className="hover:bg-gray-50/50 transition">
                                        <td className="px-6 py-4 font-medium text-gray-900">{row.nama}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(row.status)}`}>
                                                {row.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{row.jam_masuk}</td>
                                        <td className="px-6 py-4 text-gray-600">{row.jam_keluar}</td>
                                        <td className="px-6 py-4 text-gray-600">{row.lokasi}</td>
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

// Sub-component untuk Stats
function StatCard({ title, value, icon }) {
    return (
        <div className="bg-white border border-gray-200 p-6 rounded-3xl shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-2xl">
                {icon}
            </div>
            <div>
                <p className="text-sm text-gray-500">{title}</p>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
            </div>
        </div>
    );
}

// Helper function untuk warna status
function getStatusColor(status) {
    switch (status) {
        case 'Hadir': return 'bg-emerald-50 text-emerald-700';
        case 'Terlambat': return 'bg-amber-50 text-amber-700';
        case 'Absen': return 'bg-red-50 text-red-700';
        default: return 'bg-gray-50 text-gray-700';
    }
}