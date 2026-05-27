import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { ArrowLeft, Target, User, Calendar, CheckCircle2, FileText, Download } from 'lucide-react';

export default function DetailKPISettingPage() {
    const navigate = useNavigate();
    const { id } = useParams();

    // Simulasi data detail (biasanya dari API)
    const [data] = useState({
        nama_karyawan: 'Budi Santoso',
        jabatan: 'Sales Manager',
        periode: 'Q1 2026',
        status: 'Published',
        items: [
            { indikator: 'Pencapaian Sales', target: '1 Miliar', bobot: 60, realisasi: '950 Juta' },
            { indikator: 'Kepuasan Pelanggan', target: '4.8/5', bobot: 40, realisasi: '4.7/5' }
        ]
    });

    return (
        <PortalLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Detail KPI</h1>
                        <p className="text-sm text-gray-500">Melihat rincian indikator kinerja karyawan</p>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={() => navigate(-1)} className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50 flex items-center gap-2">
                            <ArrowLeft size={16} /> Kembali
                        </button>
                        <button className="px-4 py-2 bg-white border border-indigo-600 text-indigo-600 rounded-lg text-sm hover:bg-indigo-50 flex items-center gap-2">
                            <Download size={16} /> Export PDF
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="xl:col-span-2 space-y-6">
                        {/* Profile Card */}
                        <div className="bg-white border p-6 rounded-3xl shadow-sm flex items-center gap-6">
                            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xl">
                                {data.nama_karyawan.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                                <h2 className="text-lg font-bold">{data.nama_karyawan}</h2>
                                <p className="text-sm text-gray-500">{data.jabatan}</p>
                                <div className="flex gap-4 mt-2 text-sm">
                                    <span className="flex items-center gap-1 text-gray-600"><Calendar size={14} /> {data.periode}</span>
                                    <span className="flex items-center gap-1 text-emerald-600 font-medium"><CheckCircle2 size={14} /> {data.status}</span>
                                </div>
                            </div>
                        </div>

                        {/* Indikator Table */}
                        <div className="bg-white border rounded-3xl shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b font-semibold flex items-center gap-2">
                                <Target size={18} className="text-indigo-600" /> Daftar Indikator Kinerja
                            </div>
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                                    <tr>
                                        <th className="px-6 py-4">Indikator</th>
                                        <th className="px-6 py-4">Target</th>
                                        <th className="px-6 py-4">Realisasi</th>
                                        <th className="px-6 py-4">Bobot</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {data.items.map((item, idx) => (
                                        <tr key={idx}>
                                            <td className="px-6 py-4 font-medium">{item.indikator}</td>
                                            <td className="px-6 py-4 text-gray-600">{item.target}</td>
                                            <td className="px-6 py-4 text-gray-600">{item.realisasi}</td>
                                            <td className="px-6 py-4 font-semibold">{item.bobot}%</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-white border rounded-3xl shadow-sm p-6">
                            <h3 className="font-semibold mb-4 flex items-center gap-2"><FileText size={18} className="text-indigo-600" /> Catatan Admin</h3>
                            <p className="text-sm text-gray-500 italic">
                                "KPI ini telah disetujui oleh manajemen untuk periode Q1 2026. Pastikan seluruh target tercapai sesuai timeline yang ditentukan."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </PortalLayout>
    );
}