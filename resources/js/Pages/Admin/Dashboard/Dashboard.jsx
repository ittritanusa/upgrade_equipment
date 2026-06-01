import React from 'react';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { Briefcase, DollarSign, Users, AlertCircle, AlertTriangle, Package, FileText } from 'lucide-react';

export default function Dashboard() {
    const projectStats = [
        { label: 'Selesai', value: '18', color: 'bg-blue-500', pct: 37.5 },
        { label: 'On Progress', value: '14', color: 'bg-emerald-500', pct: 29.2 },
        { label: 'Terlambat', value: '10', color: 'bg-rose-500', pct: 20.8 },
        { label: 'Belum Mulai', value: '6', color: 'bg-gray-300', pct: 12.5 },
    ];
    
    return (
        <PortalLayout>
            <div className="space-y-6">
                {/* Header & Filters */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text2xl font-semibold text-gray-900">Dashboard</h1>
                        <p className="text-sm text-gray-500">Monitor seluruh aktivitas proyek secara real time</p>
                    </div>
                    <div className="flex gap-2">
                        <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white">
                            <option>Semua Proyek</option>
                        </select>
                        <input type="month" className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white" defaultValue="2026-05" />
                    </div>
                </div>

                {/* Top Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                        { label: 'Total Project', val: '48', icon: Briefcase, color: 'text-indigo-600' },
                        { label: 'Total Revenue', val: 'Rp 188.185.268', icon: DollarSign, color: 'text-amber-600' },
                        { label: 'Total Cost', val: 'Rp 188.185.268', icon: DollarSign, color: 'text-amber-600' },
                        { label: 'Profit', val: 'Rp 188.185.268', icon: DollarSign, color: 'text-amber-600' },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                            <div className={`p-3 bg-gray-50 rounded-lg ${stat.color}`}><stat.icon size={20} /></div>
                            <div>
                                <p className="text-xs text-gray-400">{stat.label}</p>
                                <p className="font-bold text-gray-900">{stat.val}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Charts Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Pie Chart (Progress) */}
                    <div className="bg-white p-6 rounded-xl border shadow-sm flex flex-col items-center">
                        <h3 className="font-semibold mb-4 w-full">Project Progress</h3>
                        <div className="relative w-32 h-32 rounded-full border-8 border-gray-100 border-t-blue-500 flex items-center justify-center">
                            <span className="font-bold text-xl">48</span>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-2 text-xs w-full">
                            {projectStats.map(s => <div key={s.label} className="flex items-center gap-1"><span className={`w-2 h-2 ${s.color} rounded-full`}/> {s.label}</div>)}
                        </div>
                    </div>

                    {/* Bar Chart (Budget vs Actual) */}
                    <div className="bg-white p-6 rounded-xl border shadow-sm col-span-2">
                        <h3 className="font-semibold mb-6">Budget vs Actual (YTD)</h3>
                        <div className="flex items-end justify-between h-40 gap-2">
                            {[40, 60, 80, 50, 90, 70].map((h, i) => (
                                <div key={i} className="flex flex-col items-center gap-1">
                                    <div className="flex gap-1 w-12"><div className="w-1/2 bg-blue-500 h-24"/><div className="w-1/2 bg-emerald-500 h-32"/></div>
                                    <span className="text-[10px]">Bulan {i+1}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Middle Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                    {[
                        { label: 'Outstanding PO', val: '48' }, { label: 'Request Material', val: '48' },
                        { label: 'Equipment Idle', val: '48' }, { label: 'Low Stock', val: '48' },
                        { label: 'Over Budget', val: '48' }, { label: 'Plutang Invoice', val: '48' },
                    ].map((m, i) => (
                        <div key={i} className="bg-white p-4 rounded-xl border shadow-sm text-center">
                            <p className="text-xs text-gray-400">{m.label}</p>
                            <p className="text-xl font-bold">{m.val}</p>
                        </div>
                    ))}
                </div>

                {/* Reminders & Alerts Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Reminder Invoice */}
                    <div className="bg-white p-6 rounded-xl border shadow-sm">
                        <h3 className="font-semibold mb-4 text-gray-800">Reminder Invoice</h3>
                        
                        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                            {[
                                { spk: 'SPK/AGS/USR/0526/0004', project: 'Pembangunan Gedung Hotel - Bali', amount: 'Rp100.000.000', date: 'Due Date: 23 May 2026' },
                                { spk: 'SPK/AGS/USR/0526/0003', project: 'Pembangunan Gedung Apartment - IKN Kalimantan Timur', amount: 'Rp50.000.000', date: 'Due Date: 25 May 2026' },
                                { spk: 'SPK/AGS/USR/0526/0002', project: 'Pembangunan Perumahan - Demak', amount: 'Rp30.000.000', date: 'Due Date: 26 May 2026' },
                                { spk: 'SPK/AGS/USR/0526/0001', project: 'Pembangunan Gedung Kantor - DKI Jakarta', amount: 'Rp25.000.000', date: 'Due Date: 27 May 2026' },
                            ].map((item, index) => (
                                <div key={index} className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-amber-300 transition-colors">
                                    {/* Ikon Warning */}
                                    <div className="flex-shrink-0">
                                        <AlertCircle className="text-amber-500" size={32} />
                                    </div>
                                    
                                    {/* Bagian Kiri: SPK & Project */}
                                    <div className="flex-grow min-w-0">
                                        <p className="text-sm font-bold text-gray-900 truncate">{item.spk}</p>
                                        <p className="text-xs text-gray-500 truncate">{item.project}</p>
                                    </div>
                                    
                                    {/* Bagian Kanan: Nominal & Date */}
                                    <div className="flex-shrink-0 text-right">
                                        <p className="text-sm font-bold text-gray-900">{item.amount}</p>
                                        <p className="text-xs text-gray-500">{item.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Stock Alert */}
                    <div className="bg-white p-6 rounded-xl border shadow-sm">
                        <h3 className="font-semibold mb-4 text-gray-800">Stock Alert</h3>
                        
                        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                            {[
                                { item: 'Semen Tiga Roda', project: 'Pembangunan Gedung Kantor - DKI Jakarta', stock: 'Stock 8 PCS' },
                                { item: 'Semen Tiga Roda', project: 'Pembangunan Gedung Kantor - DKI Jakarta', stock: 'Stock 8 PCS' },
                                { item: 'Semen Tiga Roda', project: 'Pembangunan Gedung Kantor - DKI Jakarta', stock: 'Stock 8 PCS' },
                                { item: 'Semen Tiga Roda', project: 'Pembangunan Gedung Kantor - DKI Jakarta', stock: 'Stock 8 PCS' },
                            ].map((data, index) => (
                                <div key={index} className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-red-200 transition-colors">
                                    {/* Ikon Alert */}
                                    <div className="flex-shrink-0">
                                        <AlertTriangle className="text-red-500" size={32} />
                                    </div>
                                    
                                    {/* Bagian Kiri: Nama Item & Project */}
                                    <div className="flex-grow min-w-0">
                                        <p className="text-sm font-bold text-gray-900 truncate">{data.item}</p>
                                        <p className="text-xs text-gray-500 truncate">{data.project}</p>
                                    </div>
                                    
                                    {/* Bagian Kanan: Stock */}
                                    <div className="flex-shrink-0">
                                        <p className="text-sm font-bold text-red-600 whitespace-nowrap">{data.stock}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Project Table */}
                <div className="bg-white p-6 rounded-xl border shadow-sm">
                    <h3 className="font-semibold mb-4">Project Progress Table</h3>
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                            <tr>{['Project', 'Lokasi', 'Progress', 'Budget', 'Actual', 'Status'].map(h => <th key={h} className="p-3 text-left">{h}</th>)}</tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-3">Pembangunan Gedung A</td>
                                <td className="p-3">DKI Jakarta</td>
                                <td className="p-3"><div className="w-full bg-gray-200 h-2 rounded"><div className="w-3/4 bg-green-500 h-2 rounded"></div></div></td>
                                <td className="p-3">Rp 15.000.000</td>
                                <td className="p-3">Rp 9.000.000</td>
                                <td className="p-3"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">Aktif</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </PortalLayout>
    );
}