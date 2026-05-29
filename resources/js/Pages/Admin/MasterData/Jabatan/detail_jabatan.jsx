import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { ArrowLeft, Pencil } from 'lucide-react';

export default function DetailJabatan() {
    const navigate = useNavigate();
    const { id } = useParams();

    // Data dummy (nanti diganti dengan fetch data berdasarkan id)
    const jabatan = {
        kode: 'JBT-001',
        nama: 'Project Manager',
        departemen: 'Operations',
        pendapatan: [
            { nama: 'Gaji Pokok', jumlah: '15.000.000' },
            { nama: 'Tunjangan Jabatan', jumlah: '3.000.000' }
        ],
        potongan: [
            { nama: 'BPJS Kesehatan', jumlah: '200.000' },
            { nama: 'Pajak PPh 21', jumlah: '500.000' }
        ]
    };

    return (
        <PortalLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Detail Jabatan</h1>
                        <div className="flex items-center gap-2 mt-1 text-sm">
                            <span className="text-gray-400">Master Data</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-gray-400">Data Jabatan</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-blue-600 font-medium">Detail Jabatan</span>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button 
                            onClick={() => navigate(-1)} 
                            className="inline-flex items-center gap-2 h-10 px-4 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-sm font-medium"
                        >
                            <ArrowLeft size={16} /> Kembali
                        </button>
                        <button 
                            onClick={() => navigate(`/portal/master/jabatan/edit`)}
                            className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm font-medium transition"
                        >
                            <Pencil size={16} /> Edit Data
                        </button>
                    </div>
                </div>

                {/* Info Utama */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-6">Informasi Jabatan</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <p className="text-sm text-gray-500">Kode Jabatan</p>
                            <p className="text-base font-medium text-gray-900">{jabatan.kode}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Nama Jabatan</p>
                            <p className="text-base font-medium text-gray-900">{jabatan.nama}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Departemen</p>
                            <p className="text-base font-medium text-gray-900">{jabatan.departemen}</p>
                        </div>
                    </div>
                </div>

                {/* Komponen Gaji */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Pendapatan */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Komponen Pendapatan</h2>
                        <div className="space-y-3">
                            {jabatan.pendapatan.map((item, index) => (
                                <div key={index} className="flex justify-between p-3 bg-gray-50 rounded-lg">
                                    <span className="text-sm text-gray-700">{item.nama}</span>
                                    <span className="text-sm font-semibold text-gray-900">Rp {item.jumlah}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Potongan */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Komponen Potongan</h2>
                        <div className="space-y-3">
                            {jabatan.potongan.map((item, index) => (
                                <div key={index} className="flex justify-between p-3 bg-gray-50 rounded-lg">
                                    <span className="text-sm text-gray-700">{item.nama}</span>
                                    <span className="text-sm font-semibold text-red-600">Rp {item.jumlah}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </PortalLayout>
    );
}