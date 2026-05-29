import React from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import {
    Plus,
    Eye,
    Pencil,
    Trash2,
} from 'lucide-react';

export default function MasterJabatan() {
    const navigate = useNavigate();

    // Contoh data jabatan
    const jabatanData = [
        { no: 1, kode: 'JBT-001', nama: 'Project Manager', departemen: 'Operations' },
        { no: 2, kode: 'JBT-002', nama: 'Site Engineer', departemen: 'Engineering' },
        { no: 3, kode: 'JBT-003', nama: 'Finance Officer', departemen: 'Finance' },
        { no: 4, kode: 'JBT-004', nama: 'HR Coordinator', departemen: 'Human Resources' },
    ];

    return (
        <PortalLayout>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Master Data Jabatan
                    </h1>
                    <div className="flex items-center gap-2 mt-1 text-sm">
                        <span className="text-gray-400">Master Data</span>
                        <span className="text-gray-300">/</span>
                        <span className="text-blue-600 font-medium">Data Jabatan</span>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white border border-gray-200 rounded-xl p-5">
                    {/* Top Action */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-5">
                        <h2 className="text-lg font-semibold text-gray-800">
                            List Jabatan
                        </h2>
                        <button
                            onClick={() => navigate('/portal/master/jabatan/create')}
                            className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
                        >
                            <Plus size={16} />
                            Tambah Jabatan
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
                                placeholder="Cari nama jabatan..."
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
                                    <th className="px-4 py-3 text-left">Kode Jabatan</th>
                                    <th className="px-4 py-3 text-left">Nama Jabatan</th>
                                    <th className="px-4 py-3 text-left">Departemen</th>
                                    <th className="px-4 py-3 text-center w-32">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jabatanData.map((item) => (
                                    <tr
                                        key={item.no}
                                        className="border-t border-gray-200 hover:bg-gray-50"
                                    >
                                        <td className="px-4 py-4">{item.no}</td>
                                        <td className="px-4 py-4 font-medium text-gray-700">{item.kode}</td>
                                        <td className="px-4 py-4 text-gray-800">{item.nama}</td>
                                        <td className="px-4 py-4 text-gray-600">{item.departemen}</td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center justify-center gap-3">
                                                <button 
                                                    onClick={() => navigate('/portal/master/jabatan/detail')}
                                                    className="text-blue-600 hover:text-blue-800">
                                                    <Eye size={16} />
                                                </button>
                                                <button
                                                    onClick={() => navigate('/portal/master/jabatan/edit')} 
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