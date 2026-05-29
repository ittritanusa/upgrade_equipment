import React from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import {
    Plus,
    Eye,
    Pencil,
    Trash2,
    Landmark,
    Wallet
} from 'lucide-react';

export default function MasterCashBank() {
    const navigate = useNavigate();

    // Data akun kas & bank
    const cashBankData = [
        { no: 1, kode: 'CB-001', nama: 'Bank BCA Utama', tipe: 'Bank', nomor_rekening: '1234567890', saldo: 'Rp 500.000.000', status: 'Aktif' },
        { no: 2, kode: 'CB-002', nama: 'Bank Mandiri Operasional', tipe: 'Bank', nomor_rekening: '0987654321', saldo: 'Rp 250.000.000', status: 'Aktif' },
        { no: 3, kode: 'CB-003', nama: 'Kas Kecil Jakarta', tipe: 'Cash', nomor_rekening: '-', saldo: 'Rp 5.000.000', status: 'Aktif' },
        { no: 4, kode: 'CB-004', nama: 'Bank BNI Project A', tipe: 'Bank', nomor_rekening: '1122334455', saldo: 'Rp 100.000.000', status: 'Nonaktif' },
    ];

    const getTipeIcon = (tipe) => {
        return tipe === 'Bank' ? <Landmark size={16} /> : <Wallet size={16} />;
    };

    return (
        <PortalLayout>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Master Data Cash & Bank</h1>
                    <div className="flex items-center gap-2 mt-1 text-sm">
                        <span className="text-gray-400">Master Data</span>
                        <span className="text-gray-300">/</span>
                        <span className="text-gray-400">Finance & Accounting</span>
                        <span className="text-gray-300">/</span>
                        <span className="text-blue-600 font-medium">List Cash & Bank</span>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white border border-gray-200 rounded-xl p-5">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-5">
                        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                            <Landmark className="text-blue-600" size={20} /> List Akun Kas & Bank
                        </h2>
                        <button
                            onClick={() => navigate('/portal/master/cash-bank/create')}
                            className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
                        >
                            <Plus size={16} /> Tambah Akun
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
                            placeholder="Cari nama akun atau nomor rekening..."
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
                                    <th className="px-4 py-3 text-left">Nama Akun</th>
                                    <th className="px-4 py-3 text-left">Tipe</th>
                                    <th className="px-4 py-3 text-left">No. Rekening</th>
                                    <th className="px-4 py-3 text-right">Saldo Saat Ini</th>
                                    <th className="px-4 py-3 text-center">Status</th>
                                    <th className="px-4 py-3 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {cashBankData.map((item) => (
                                    <tr key={item.no} className="hover:bg-gray-50 transition">
                                        <td className="px-4 py-4">{item.no}</td>
                                        <td className="px-4 py-4 font-medium text-gray-700">{item.kode}</td>
                                        <td className="px-4 py-4 font-semibold text-gray-900">{item.nama}</td>
                                        <td className="px-4 py-4 flex items-center gap-2 text-gray-600">
                                            {getTipeIcon(item.tipe)} {item.tipe}
                                        </td>
                                        <td className="px-4 py-4 font-mono text-gray-600">{item.nomor_rekening}</td>
                                        <td className="px-4 py-4 text-right font-medium text-gray-900">{item.saldo}</td>
                                        <td className="px-4 py-4 text-center">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === 'Aktif' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center justify-center gap-3">
                                                <button onClick={() => navigate(`/portal/master/cash-bank/detail`)} className="text-gray-500 hover:text-blue-600">
                                                    <Eye size={16} />
                                                </button>
                                                <button onClick={() => navigate(`/portal/master/cash-bank/edit`)} className="text-gray-500 hover:text-amber-600">
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