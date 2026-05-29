import React from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import {
    Plus,
    Eye,
    Pencil,
    Trash2,
    CalendarClock,
    Tag
} from 'lucide-react';

export default function MasterAlasanCuti() {
    const navigate = useNavigate();

    // Data alasan cuti
    const leaveReasonsData = [
        { no: 1, kode: 'CT-001', nama: 'Cuti Tahunan Reguler', tipe: 'Cuti Tahunan', status: 'Aktif' },
        { no: 2, kode: 'CK-001', nama: 'Pernikahan Karyawan', tipe: 'Cuti Khusus', status: 'Aktif' },
        { no: 3, kode: 'CK-002', nama: 'Keluarga Inti Meninggal', tipe: 'Cuti Khusus', status: 'Aktif' },
        { no: 4, kode: 'CK-003', nama: 'Cuti Melahirkan', tipe: 'Cuti Khusus', status: 'Aktif' },
    ];

    const getTipeColor = (tipe) => {
        return tipe === 'Cuti Tahunan' 
            ? 'bg-blue-100 text-blue-700' 
            : 'bg-purple-100 text-purple-700';
    };

    return (
        <PortalLayout>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Master Data Alasan Cuti</h1>
                    <div className="flex items-center gap-2 mt-1 text-sm">
                        <span className="text-gray-400">Master Data</span>
                        <span className="text-gray-300">/</span>
                        <span className="text-gray-400">Data HR</span>
                        <span className="text-gray-300">/</span>
                        <span className="text-blue-600 font-medium">Alasan Cuti</span>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white border border-gray-200 rounded-xl p-5">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-5">
                        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                            <CalendarClock className="text-blue-600" size={20} /> List Alasan Cuti
                        </h2>
                        <button
                            onClick={() => navigate('/portal/master/leave-reasons/create')}
                            className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
                        >
                            <Plus size={16} /> Tambah Alasan
                        </button>
                    </div>

                    {/* Filter */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <span>Tampilkan</span>
                            <select className="h-10 rounded-lg border border-gray-300 px-3 text-sm">
                                <option>10</option>
                                <option>25</option>
                            </select>
                        </div>
                        <input
                            type="text"
                            placeholder="Cari alasan atau tipe cuti..."
                            className="h-10 rounded-lg border border-gray-300 px-3 text-sm w-full md:w-64"
                        />
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto border border-gray-200 rounded-xl">
                        <table className="min-w-full text-sm">
                            <thead className="bg-gray-50">
                                <tr className="text-gray-700">
                                    <th className="px-4 py-3 text-left">No</th>
                                    <th className="px-4 py-3 text-left">Kode</th>
                                    <th className="px-4 py-3 text-left">Nama Alasan</th>
                                    <th className="px-4 py-3 text-left">Tipe Cuti</th>
                                    <th className="px-4 py-3 text-center">Status</th>
                                    <th className="px-4 py-3 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {leaveReasonsData.map((item) => (
                                    <tr key={item.no} className="hover:bg-gray-50 transition">
                                        <td className="px-4 py-4">{item.no}</td>
                                        <td className="px-4 py-4 font-medium text-gray-700">{item.kode}</td>
                                        <td className="px-4 py-4 font-semibold text-gray-900">{item.nama}</td>
                                        <td className="px-4 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTipeColor(item.tipe)}`}>
                                                {item.tipe}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 text-center text-emerald-600 font-medium">{item.status}</td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center justify-center gap-3">
                                                <button onClick={() => navigate(`/portal/master/leave-reasons/detail`)} className="text-gray-500 hover:text-blue-600">
                                                    <Eye size={16} />
                                                </button>
                                                <button onClick={() => navigate(`/portal/master/leave-reasons/edit`)} className="text-gray-500 hover:text-amber-600">
                                                    <Pencil size={16} />
                                                </button>
                                                <button className="text-gray-500 hover:text-red-600">
                                                    <Trash2 size={16} />
                                                </button>
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