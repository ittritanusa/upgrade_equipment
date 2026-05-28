import React, { useState } from 'react';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { 
    LayoutDashboard, Briefcase, DollarSign, Package, 
    ShoppingCart, FileText, Users, Receipt, TrendingUp, ArrowUpRight
} from 'lucide-react';

export default function IntegratedDashboardPage() {
    // Data untuk masing-masing modul
    const modules = [
        { title: 'Project Management', val: '84%', trend: '+2%', color: 'text-indigo-600', icon: Briefcase },
        { title: 'Budget & RAB', val: 'Rp 4.2M', trend: '-5%', color: 'text-blue-600', icon: DollarSign },
        { title: 'Procurement', val: '12 PO', trend: '+8%', color: 'text-emerald-600', icon: ShoppingCart },
        { title: 'Inventory & WH', val: '98% Stock', trend: '+1%', color: 'text-purple-600', icon: Package },
        { title: 'Accounting & Fin', val: 'Healthy', trend: 'Stable', color: 'text-rose-600', icon: Receipt },
        { title: 'Tax Management', val: 'Compliant', trend: 'Audit', color: 'text-amber-600', icon: FileText },
        { title: 'HR & Manpower', val: '142 Staff', trend: 'Stable', color: 'text-cyan-600', icon: Users },
    ];

    return (
        <PortalLayout>
            <div className="space-y-8">
                {/* Header Section */}
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Executive Overview</h1>
                        <p className="text-gray-500">Integrasi data real-time seluruh operasional perusahaan.</p>
                    </div>
                    <div className="flex gap-2">
                        <select className="px-4 py-2 bg-white border rounded-xl text-sm outline-none">
                            <option>Q1 2026</option>
                            <option>Q2 2026</option>
                        </select>
                        <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium">Export Master Report</button>
                    </div>
                </div>

                {/* Modul Overview Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {modules.map((m, i) => (
                        <div key={i} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition">
                            <div className="flex justify-between mb-4">
                                <div className={`p-2 bg-gray-50 rounded-xl ${m.color}`}>
                                    <m.icon size={20} />
                                </div>
                                <span className="text-xs font-medium text-emerald-600 flex items-center gap-1">
                                    {m.trend} <ArrowUpRight size={12} />
                                </span>
                            </div>
                            <h4 className="text-sm text-gray-500">{m.title}</h4>
                            <p className="text-xl font-bold text-gray-900">{m.val}</p>
                        </div>
                    ))}
                </div>

                {/* Detail Analysis Section */}
                <div className="lg:col-span-2 bg-white p-8 rounded-3xl border shadow-sm">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-lg font-bold">Financial & Tax Health</h3>
                        <div className="flex gap-4 text-xs">
                            <span className="flex items-center gap-1"><div className="w-3 h-3 bg-indigo-500 rounded-sm"></div> Budget</span>
                            <span className="flex items-center gap-1"><div className="w-3 h-3 bg-emerald-500 rounded-sm"></div> Actual</span>
                        </div>
                    </div>
                    
                    <div className="h-64 flex items-end justify-between gap-4">
                        {[
                            { month: 'Jan', budget: 80, actual: 75 },
                            { month: 'Feb', budget: 85, actual: 82 },
                            { month: 'Mar', budget: 90, actual: 88 },
                            { month: 'Apr', budget: 95, actual: 92 },
                            { month: 'May', budget: 100, actual: 105 }, // Over budget case
                        ].map((data, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-3">
                                {/* Bar Group */}
                                <div className="w-full flex justify-center items-end gap-1 h-48">
                                    {/* Budget Bar */}
                                    <div 
                                        className="w-1/3 bg-indigo-100 hover:bg-indigo-200 transition-all rounded-t-lg relative group" 
                                        style={{ height: `${data.budget}%` }}
                                    >
                                        <div className="absolute -top-8 left-0 w-full text-[10px] text-center opacity-0 group-hover:opacity-100 font-bold text-indigo-600">
                                            {data.budget}M
                                        </div>
                                    </div>
                                    {/* Actual Bar */}
                                    <div 
                                        className={`w-1/3 ${data.actual > data.budget ? 'bg-rose-500' : 'bg-emerald-500'} hover:opacity-80 transition-all rounded-t-lg relative group`} 
                                        style={{ height: `${data.actual}%` }}
                                    >
                                        <div className="absolute -top-8 left-0 w-full text-[10px] text-center opacity-0 group-hover:opacity-100 font-bold text-emerald-600">
                                            {data.actual}M
                                        </div>
                                    </div>
                                </div>
                                <span className="text-xs text-gray-500 font-medium">{data.month}</span>
                            </div>
                        ))}
                    </div>
                    
                    {/* Tax Compliance Indicator */}
                    <div className="mt-8 pt-6 border-t flex items-center justify-between">
                        <div>
                            <p className="text-sm font-bold text-gray-800">Tax Compliance Status</p>
                            <p className="text-xs text-gray-500">Last audit: 15 Mei 2026</p>
                        </div>
                        <div className="flex gap-2">
                            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-lg border border-emerald-200">PPN: OK</span>
                            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-lg border border-emerald-200">PPh: OK</span>
                        </div>
                    </div>
                </div>

                {/* Bottom Stats: Project & Inventory Table */}
                <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">
                    <div className="p-6 border-b flex justify-between items-center">
                        <h3 className="text-lg font-bold">Active Projects Performance</h3>
                        <button className="text-indigo-600 text-sm font-semibold">Lihat Semua</button>
                    </div>
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                            <tr>
                                <th className="px-6 py-4">Project Name</th>
                                <th className="px-6 py-4">Budget Utilization</th>
                                <th className="px-6 py-4">Resource Status</th>
                                <th className="px-6 py-4">Completion</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y text-sm">
                            {['Pembangunan Gedung A', 'Renovasi Infrastruktur B'].map((p, i) => (
                                <tr key={i}>
                                    <td className="px-6 py-4 font-medium">{p}</td>
                                    <td className="px-6 py-4">Rp 1.2M / 1.5M</td>
                                    <td className="px-6 py-4 text-emerald-600">Optimal</td>
                                    <td className="px-6 py-4 font-bold">75%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </PortalLayout>
    );
}