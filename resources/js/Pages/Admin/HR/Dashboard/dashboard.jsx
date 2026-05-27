import React from 'react';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { 
    Users, 
    UserCheck, 
    UserX, 
    AlertCircle, 
    Calendar,
    Briefcase,
    BarChart3
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function HRDashboardPage() {
    // 1. Data Dummy Otomatis untuk Grafik
    const attendanceData = [
        { name: 'Senin', hadir: 130, izin: 5 },
        { name: 'Selasa', hadir: 125, izin: 8 },
        { name: 'Rabu', hadir: 135, izin: 2 },
        { name: 'Kamis', hadir: 128, izin: 4 },
        { name: 'Jumat', hadir: 132, izin: 3 },
    ];

    // 2. Data Statistik
    const stats = [
        { label: 'Total Karyawan', value: '142', icon: Users, color: 'text-blue-600' },
        { label: 'Hadir Hari Ini', value: '128', icon: UserCheck, color: 'text-emerald-600' },
        { label: 'Izin/Sakit', value: '4', icon: UserX, color: 'text-amber-600' },
        { label: 'Kontrak Berakhir', value: '3', icon: AlertCircle, color: 'text-rose-600' },
    ];

    return (
        <PortalLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">HR & Manpower Dashboard</h1>
                    <p className="text-sm text-gray-500 mt-1">Ringkasan operasional sumber daya manusia perusahaan</p>
                </div>

                {/* STATS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
                            <div className={`p-3 rounded-xl bg-gray-50 ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
                                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* AREA NOTIFIKASI / KONTRAK */}
                    <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
                        <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Briefcase size={18} className="text-indigo-600" /> Kontrak Mendekati Berakhir
                        </h2>
                        <div className="space-y-3">
                            {[1, 2, 3].map((item) => (
                                <div key={item} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">AN</div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900">Ahmad Naufal</p>
                                            <p className="text-xs text-gray-500">Divisi Engineering</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full">Sisa 14 Hari</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* QUICK ACTIONS */}
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
                        <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Calendar size={18} className="text-indigo-600" /> Akses Cepat
                        </h2>
                        <div className="grid grid-cols-1 gap-3">
                            {['Data Karyawan', 'Manajemen Absensi', 'Payroll System', 'Request Cuti'].map((action) => (
                                <button key={action} className="w-full text-left p-3 rounded-lg border border-gray-100 text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition">
                                    {action}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* BAR CHART SECTION */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                            <BarChart3 size={18} className="text-indigo-600" /> Tren Kehadiran Mingguan
                        </h2>
                        <div className="flex gap-4 text-xs">
                            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-indigo-600"></div> Hadir</div>
                            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-amber-400"></div> Izin/Sakit</div>
                        </div>
                    </div>
                    
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={attendanceData}>
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#6b7280'}} />
                                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#6b7280'}} />
                                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                <Bar dataKey="hadir" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="izin" fill="#fbbf24" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </PortalLayout>
    );
}