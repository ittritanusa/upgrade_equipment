import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { ArrowLeft, Target, Award, Calendar, FileText } from 'lucide-react';

export default function KPIMonitoringDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Simulasi data detail (biasanya fetch berdasarkan ID)
    const kpiData = {
        id: id,
        karyawan: 'Budi Santoso',
        jabatan: 'Senior Software Engineer',
        periode: 'Q1 2026',
        pencapaianTotal: '85%',
        status: 'On Track',
        kpiList: [
            { nama: 'Penyelesaian Proyek', target: '100%', realisasi: '95%', bobot: '40%' },
            { nama: 'Code Quality (Bug Rate)', target: '< 5%', realisasi: '3%', bobot: '30%' },
            { nama: 'Efisiensi Waktu Kerja', target: '90%', realisasi: '80%', bobot: '30%' },
        ]
    };

    return (
        <PortalLayout>
            <div className="space-y-6">
                {/* Header Section */}
                <button 
                    onClick={() => navigate(-1)} 
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition"
                >
                    <ArrowLeft size={16} /> Kembali ke List
                </button>

                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Detail Monitoring KPI</h1>
                        <p className="text-gray-500 text-sm mt-1">Laporan kinerja untuk {kpiData.karyawan} - {kpiData.periode}</p>
                    </div>
                    <span className="px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm font-bold border border-emerald-100">
                        {kpiData.status}
                    </span>
                </div>

                {/* KPI Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Target size={24} /></div>
                            <div>
                                <p className="text-sm text-gray-500">Pencapaian Total</p>
                                <h3 className="text-2xl font-bold">{kpiData.pencapaianTotal}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl"><Award size={24} /></div>
                            <div>
                                <p className="text-sm text-gray-500">Jabatan</p>
                                <h3 className="text-md font-semibold mt-1">{kpiData.jabatan}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><Calendar size={24} /></div>
                            <div>
                                <p className="text-sm text-gray-500">Periode</p>
                                <h3 className="text-md font-semibold mt-1">{kpiData.periode}</h3>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Detailed KPI Table */}
                <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2 font-semibold">
                        <FileText size={18} className="text-gray-400" /> Rincian Indikator Kinerja
                    </div>
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-600">
                            <tr>
                                <th className="px-6 py-4">Nama Indikator</th>
                                <th className="px-6 py-4">Bobot</th>
                                <th className="px-6 py-4">Target</th>
                                <th className="px-6 py-4">Realisasi</th>
                                <th className="px-6 py-4">Skor</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {kpiData.kpiList.map((kpi, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium">{kpi.nama}</td>
                                    <td className="px-6 py-4 text-gray-600">{kpi.bobot}</td>
                                    <td className="px-6 py-4 text-gray-600">{kpi.target}</td>
                                    <td className="px-6 py-4 text-gray-900 font-semibold">{kpi.realisasi}</td>
                                    <td className="px-6 py-4">
                                        <div className="w-full bg-gray-100 rounded-full h-2 max-w-[100px]">
                                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: kpi.realisasi }}></div>
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