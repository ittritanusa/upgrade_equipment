import React from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { useProject } from './Hooks/useProject';
import {
    Plus,
    Eye,
    Pencil,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';

export default function Project() {
    const navigate = useNavigate();
    const { user, isLoading, handleLogout } = useProject();

    const projects = [
        {
            no: 1,
            contract: 'SPK/AGS/USR/0526/0004',
            project: 'Pembangunan Gedung Kantor',
            company: 'PT. Maju Bersama Makmur',
            lokasi: 'DKI Jakarta',
            manager: 'Andi Wijaya',
            start: '24/04/2026',
            end: '24/04/2026',
            progress: 60,
            status: 'On Progress',
        },
        {
            no: 2,
            contract: 'SPK/AGS/USR/0526/0003',
            project: 'Pembangunan Gedung Kantor',
            company: 'PT. Maju Bersama Makmur',
            lokasi: 'DKI Jakarta',
            manager: 'Andi Wijaya',
            start: '24/04/2026',
            end: '24/04/2026',
            progress: 60,
            status: 'On Progress',
        },
        {
            no: 3,
            contract: 'SPK/AGS/USR/0526/0002',
            project: 'Pembangunan Gedung Kantor',
            company: 'PT. Maju Bersama Makmur',
            lokasi: 'DKI Jakarta',
            manager: 'Andi Wijaya',
            start: '24/04/2026',
            end: '24/04/2026',
            progress: 60,
            status: 'On Progress',
        },
    ];

    return (
        <PortalLayout>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Project Management
                    </h1>

                    <div className="flex items-center gap-2 mt-1 text-sm">
                        <span className="text-gray-400">
                            Project Management
                        </span>

                        <span className="text-gray-300">/</span>

                        <span className="text-blue-600 font-medium">
                            List Project
                        </span>
                    </div>
                </div>

                {/* Search Parameter */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-5">
                        Search Parameter
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {/* Periode */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Periode
                            </label>

                            <input
                                type="date"
                                placeholder="dd/mm/yyyy to dd/mm/yyyy"
                                className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Lokasi */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Lokasi Proyek
                            </label>

                            <select className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm outline-none focus:ring-2 focus:ring-blue-500">
                                <option>--Choose Option--</option>
                            </select>
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Status
                            </label>

                            <select className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm outline-none focus:ring-2 focus:ring-blue-500">
                                <option>--Choose Option--</option>
                            </select>
                        </div>
                    </div>

                    {/* Button */}
                    <div className="flex items-center gap-3 mt-6">
                        <button className="h-11 px-6 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition">
                            Cari
                        </button>

                        <button className="h-11 px-6 rounded-lg border border-gray-300 text-sm font-medium hover:bg-gray-100 transition">
                            Reset
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white border border-gray-200 rounded-xl p-5">
                    {/* Top Action */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-5">
                        <h2 className="text-lg font-semibold text-gray-800">
                            List Data
                        </h2>

                        <button
                            onClick={() => navigate('/portal/project/create')}
                            className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
                        >
                            <Plus size={16} />
                            Tambah
                        </button>
                    </div>

                    {/* Filter Table */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <span>Tampilkan</span>

                            <select className="h-10 rounded-lg border border-gray-300 px-3 text-sm">
                                <option>10</option>
                            </select>

                            <span>data</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-600">
                                Cari Data
                            </span>

                            <input
                                type="text"
                                className="h-10 rounded-lg border border-gray-300 px-3 text-sm w-56"
                            />
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto border border-gray-200 rounded-xl">
                        <table className="min-w-full text-sm">
                            <thead className="bg-gray-100">
                                <tr className="text-gray-700">
                                    <th className="px-4 py-3 text-left">No</th>
                                    <th className="px-4 py-3 text-left">
                                        No Contract
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Project
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Lokasi
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Project Manager
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Start Date
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        End Date
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Progress
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Status
                                    </th>
                                    <th className="px-4 py-3 text-center">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {projects.map((item) => (
                                    <tr
                                        key={item.no}
                                        className="border-t border-gray-200 hover:bg-gray-50"
                                    >
                                        <td className="px-4 py-4">
                                            {item.no}
                                        </td>

                                        <td className="px-4 py-4 text-gray-600">
                                            {item.contract}
                                        </td>

                                        <td className="px-4 py-4">
                                            <div className="font-semibold text-gray-800">
                                                {item.project}
                                            </div>

                                            <div className="text-xs text-gray-500 mt-1">
                                                {item.company}
                                            </div>
                                        </td>

                                        <td className="px-4 py-4">
                                            {item.lokasi}
                                        </td>

                                        <td className="px-4 py-4">
                                            {item.manager}
                                        </td>

                                        <td className="px-4 py-4">
                                            {item.start}
                                        </td>

                                        <td className="px-4 py-4">
                                            {item.end}
                                        </td>

                                        <td className="px-4 py-4 min-w-[140px]">
                                            <div className="flex items-center gap-3">
                                                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-green-600 rounded-full"
                                                        style={{
                                                            width: `${item.progress}%`,
                                                        }}
                                                    />
                                                </div>

                                                <span className="text-xs font-semibold text-gray-700">
                                                    {item.progress}%
                                                </span>
                                            </div>
                                        </td>

                                        <td className="px-4 py-4">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                                                {item.status}
                                            </span>
                                        </td>

                                        <td className="px-4 py-4">
                                            <div className="flex items-center justify-center gap-3">
                                                <button 
                                                    onClick={() => navigate('/portal/project/detail')}
                                                    className="text-blue-600 hover:text-blue-800">
                                                    <Eye size={16} />
                                                </button>

                                                <button className="text-gray-600 hover:text-gray-800">
                                                    <Pencil size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-5">
                        <p className="text-sm text-gray-500">
                            Menampilkan 1 dari 1
                        </p>

                        <div className="flex items-center gap-2">
                            <button className="h-9 px-3 rounded-lg border border-gray-300 text-sm text-gray-500 hover:bg-gray-100">
                                Kembali
                            </button>

                            <button className="h-9 w-9 rounded-lg bg-blue-600 text-white text-sm font-medium">
                                1
                            </button>

                            <button className="h-9 px-3 rounded-lg border border-gray-300 text-sm text-gray-500 hover:bg-gray-100">
                                Lanjut
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </PortalLayout>
    );
}