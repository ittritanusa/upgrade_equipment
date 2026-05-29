import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { ArrowLeft, Pencil, Building, User } from 'lucide-react';

export default function DetailDepartemen() {
    const navigate = useNavigate();
    const { id } = useParams();

    // Data dummy
    const departemen = {
        kode: 'DEP-001',
        nama: 'Engineering',
        kepala: 'Siti Aminah',
        status: 'Aktif',
        keterangan: 'Departemen yang menangani proyek konstruksi dan teknis perusahaan.'
    };

    // Data Karyawan dalam Departemen ini
    const karyawanData = [
        { id: 1, nip: 'NIP-001', nama: 'Budi Santoso', jabatan: 'Project Manager' },
        { id: 2, nip: 'NIP-002', nama: 'Andi Wijaya', jabatan: 'Site Engineer' },
    ];

    return (
        <PortalLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Detail Departemen</h1>
                        <div className="flex items-center gap-2 mt-1 text-sm">
                            <span className="text-gray-400">Master Data</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-gray-400">Data Departemen</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-blue-600 font-medium">Detail Departemen</span>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 h-10 px-4 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-sm font-medium">
                            <ArrowLeft size={16} /> Kembali
                        </button>
                        <button onClick={() => navigate(`/portal/master/departments/edit/${id}`)} className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm font-medium transition">
                            <Pencil size={16} /> Edit Data
                        </button>
                    </div>
                </div>

                {/* Info Utama */}
                <div className="bg-white border border-gray-200 rounded-xl p-8">
                    <div className="flex items-start gap-4 mb-8">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Building size={32} /></div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">{departemen.nama}</h2>
                            <p className="text-sm text-gray-500 font-medium">Kode: {departemen.kode}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Kepala Departemen</p>
                            <p className="text-base font-semibold text-gray-900">{departemen.kepala}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Status</p>
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">{departemen.status}</span>
                        </div>
                    </div>
                </div>

                {/* Table Section: Karyawan */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-6">
                        <User className="text-gray-400" size={20} />
                        <h2 className="text-lg font-semibold text-gray-800">Daftar Karyawan di Departemen Ini</h2>
                    </div>
                    
                    <div className="overflow-x-auto border border-gray-200 rounded-xl">
                        <table className="min-w-full text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left">NIP</th>
                                    <th className="px-4 py-3 text-left">Nama Karyawan</th>
                                    <th className="px-4 py-3 text-left">Jabatan</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {karyawanData.map((karyawan) => (
                                    <tr key={karyawan.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 font-medium text-gray-700">{karyawan.nip}</td>
                                        <td className="px-4 py-3 text-gray-800">{karyawan.nama}</td>
                                        <td className="px-4 py-3 text-gray-600">{karyawan.jabatan}</td>
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