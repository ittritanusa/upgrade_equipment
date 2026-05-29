import React from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import {
    Plus,
    Eye,
    Pencil,
    Trash2,
    Building2,
    CheckCircle2
} from 'lucide-react';

export default function MasterVendor() {
    const navigate = useNavigate();

    // Data vendor yang diperluas untuk kebutuhan procurement
    const vendorData = [
        { no: 1, kode: 'VND-001', nama: 'PT. Maju Konstruksi', kategori: 'Material', pic: 'Budi Santoso', status: 'Approved' },
        { no: 2, kode: 'VND-002', nama: 'CV. Elektro Teknik', kategori: 'Jasa', pic: 'Siti Aminah', status: 'Approved' },
        { no: 3, kode: 'VND-003', nama: 'PT. Logistik Cepat', kategori: 'Logistik', pic: 'Andi Wijaya', status: 'Pending' },
        { no: 4, kode: 'VND-004', nama: 'Toko Bangunan Jaya', kategori: 'Material', pic: 'Dewi Lestari', status: 'Blacklisted' },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Approved': return 'bg-emerald-100 text-emerald-700';
            case 'Pending': return 'bg-amber-100 text-amber-700';
            case 'Blacklisted': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <PortalLayout>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Master Data Vendor</h1>
                    <div className="flex items-center gap-2 mt-1 text-sm">
                        <span className="text-gray-400">Master Data</span>
                        <span className="text-gray-300">/</span>
                        <span className="text-gray-400">Data Supplier / Vendor</span>
                        <span className="text-gray-300">/</span>
                        <span className="text-blue-600 font-medium">List Data</span>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white border border-gray-200 rounded-xl p-5">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-5">
                        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                            <Building2 className="text-blue-600" size={20} /> List Vendor
                        </h2>
                        <button
                            onClick={() => navigate('/portal/master/vendors/create')}
                            className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
                        >
                            <Plus size={16} /> Tambah Vendor
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
                            placeholder="Cari nama vendor atau kategori..."
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
                                    <th className="px-4 py-3 text-left">Nama Vendor</th>
                                    <th className="px-4 py-3 text-left">Kategori</th>
                                    <th className="px-4 py-3 text-left">PIC Contact</th>
                                    <th className="px-4 py-3 text-center">Status</th>
                                    <th className="px-4 py-3 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {vendorData.map((item) => (
                                    <tr key={item.no} className="hover:bg-gray-50 transition">
                                        <td className="px-4 py-4">{item.no}</td>
                                        <td className="px-4 py-4 font-medium text-blue-600">{item.kode}</td>
                                        <td className="px-4 py-4 font-semibold text-gray-900">{item.nama}</td>
                                        <td className="px-4 py-4 text-gray-600">{item.kategori}</td>
                                        <td className="px-4 py-4 text-gray-600">{item.pic}</td>
                                        <td className="px-4 py-4 text-center">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center justify-center gap-3">
                                                <button onClick={() => navigate(`/portal/master/vendors/detail`)} className="text-gray-500 hover:text-blue-600">
                                                    <Eye size={16} />
                                                </button>
                                                <button onClick={() => navigate(`/portal/master/vendors/edit`)} className="text-gray-500 hover:text-amber-600">
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