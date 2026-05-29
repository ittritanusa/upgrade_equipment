import React from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import {
    Plus,
    Eye,
    Pencil,
    Trash2,
} from 'lucide-react';

export default function MasterDepartemen() {
    const navigate = useNavigate();

    // Contoh data departemen
    const departemenData = [
        { no: 1, kode: 'DEP-001', nama: 'Operations', head: 'Budi Santoso' },
        { no: 2, kode: 'DEP-002', nama: 'Engineering', head: 'Siti Aminah' },
        { no: 3, kode: 'DEP-003', nama: 'Finance', head: 'Andi Wijaya' },
        { no: 4, kode: 'DEP-004', nama: 'Human Resources', head: 'Dewi Lestari' },
    ];

    return (
        <PortalLayout>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Master Data Departemen
                    </h1>
                    <div className="flex items-center gap-2 mt-1 text-sm">
                        <span className="text-gray-400">Master Data</span>
                        <span className="text-gray-300">/</span>
                        <span className="text-blue-600 font-medium">Data Departemen</span>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white border border-gray-200 rounded-xl p-5">
                    {/* Top Action */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-5">
                        <h2 className="text-lg font-semibold text-gray-800">
                            List Departemen
                        </h2>
                        <button
                            onClick={() => navigate('/portal/master/departments/create')}
                            className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
                        >
                            <Plus size={16} />
                            Tambah Departemen
                        </button>
                    </div>

                    {/* Filter Table */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <span>Tampilkan</span>
                            <select className="h-10 rounded-lg border border-gray-300 px-3 text-sm">
                                <option>10</option>
                                <option>25</option>
                            </select>
                            <span>data</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-600">Cari Data</span>
                            <input
                                type="text"
                                placeholder="Cari nama departemen..."
                                className="h-10 rounded-lg border border-gray-300 px-3 text-sm w-56"
                            />
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto border border-gray-200 rounded-xl">
                        <table className="min-w-full text-sm">
                            <thead className="bg-gray-100">
                                <tr className="text-gray-700">
                                    <th className="px-4 py-3 text-left w-16">No</th>
                                    <th className="px-4 py-3 text-left">Kode Departemen</th>
                                    <th className="px-4 py-3 text-left">Nama Departemen</th>
                                    <th className="px-4 py-3 text-left">Kepala Departemen</th>
                                    <th className="px-4 py-3 text-center w-32">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {departemenData.map((item) => (
                                    <tr
                                        key={item.no}
                                        className="border-t border-gray-200 hover:bg-gray-50"
                                    >
                                        <td className="px-4 py-4">{item.no}</td>
                                        <td className="px-4 py-4 font-medium text-gray-700">{item.kode}</td>
                                        <td className="px-4 py-4 text-gray-800">{item.nama}</td>
                                        <td className="px-4 py-4 text-gray-600">{item.head}</td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center justify-center gap-3">
                                                <button 
                                                    onClick={() => navigate(`/portal/master/departments/detail`)}
                                                    className="text-blue-600 hover:text-blue-800">
                                                    <Eye size={16} />
                                                </button>
                                                <button
                                                    onClick={() => navigate(`/portal/master/departments/edit`)} 
                                                    className="text-amber-600 hover:text-amber-800">
                                                    <Pencil size={16} />
                                                </button>
                                                <button className="text-red-600 hover:text-red-800">
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