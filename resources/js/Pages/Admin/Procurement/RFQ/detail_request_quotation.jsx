import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';

import {
    ArrowLeft,
    FileText,
    Building2,
    Calendar,
    Clock,
    CheckCircle2,
    AlertCircle,
    UserCheck,
    ArrowUpRight,
    ExternalLink
} from 'lucide-react';

export default function DetailRequestQuotation() {
    const navigate = useNavigate();
    const { id } = useParams(); // Mengambil ID RFQ dari URL jika diperlukan

    // ==========================================
    // SIMULASI DATA DETAIL RFQ DARI BACKEND
    // ==========================================
    const [rfqDetail] = useState({
        kodeRFQ: 'RFQ/PROC/AGS/2026/05/002',
        kodePR: 'PR/PROC/AGS/2026/04/015',
        perihal: 'Peremajaan Server Ruang Data Center',
        divisiPemohon: 'Teknologi Informasi',
        tanggalDibuat: '25/05/2026',
        deadlineDate: '05/06/2026',
        statusRFQ: 'Siap Seleksi', // Status: Proses Penawaran / Siap Seleksi / Selesai Seleksi
        catatan: 'Harap menyertakan sertifikat garansi resmi minimal 3 tahun dan rincian SLA instalasi hardware dalam dokumen penawaran harga.',
        
        // Item barang yang ditarik dari PR
        items: [
            { id: 201, namaBarang: 'HPE ProLiant DL380 Gen10', qty: 1, satuan: 'Unit', spek: 'Intel Xeon 4208, 32GB RAM, 2x 2.4TB SAS' },
            { id: 202, namaBarang: 'UPS APC Smart-UPS 3000VA', qty: 2, satuan: 'Unit', spek: 'Rackmount 2U, LCD 230V' }
        ],

        // Status tracking penawaran dari masing-masing vendor yang diundang
        vendorResponses: [
            { id: 1, nama: 'PT. Computindo Utama', email: 'sales@computindo.com', statusRespon: 'Sudah Kirim', tanggalRespon: '26/05/2026', filePenawaran: 'QUO-CU-9921.pdf' },
            { id: 2, nama: 'CV. TechMedia Nusantara', email: 'info@techmedia.co.id', statusRespon: 'Sudah Kirim', tanggalRespon: '27/05/2026', filePenawaran: 'TMN-PRQM-2026.pdf' },
            { id: 3, nama: 'PT. Sinergi Integrasi', email: 'procurement@sinergi.com', statusRespon: 'Sudah Kirim', tanggalRespon: '26/05/2026', filePenawaran: 'SI-OFFER-04.pdf' },
            { id: 4, nama: 'PT. Data Network Solution', email: 'dns.sales@datanetwork.com', statusRespon: 'Belum Merespon', tanggalRespon: '-', filePenawaran: '-' }
        ]
    });

    // Helper badge status untuk dokumen RFQ utama
    const renderRFQStatusBadge = (status) => {
        switch (status) {
            case 'Selesai Seleksi':
                return <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">{status}</span>;
            case 'Siap Seleksi':
                return <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold animate-pulse">{status}</span>;
            case 'Proses Penawaran':
                return <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold">{status}</span>;
            default:
                return <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold">{status}</span>;
        }
    };

    // Helper badge status untuk masing-masing respon vendor
    const renderVendorStatusBadge = (status) => {
        if (status === 'Sudah Kirim') {
            return (
                <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded bg-green-50 text-green-700 border border-green-200">
                    <CheckCircle2 size={12} /> {status}
                </span>
            );
        }
        return (
            <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded bg-amber-50 text-amber-600 border border-amber-200">
                <Clock size={12} /> {status}
            </span>
        );
    };

    return (
        <PortalLayout>
            <div className="space-y-6">
                
                {/* 1. HEADER HALAMAN & BREADCRUMBS */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Detail Request for Quotation
                        </h1>

                        <div className="flex items-center gap-2 mt-1 text-sm">
                            <span className="text-gray-400">Procurement</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-gray-400">Request for Quotation</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-blue-600 font-medium">{rfqDetail.kodeRFQ}</span>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => navigate('/portal/request-quotation')}
                        className="inline-flex items-center gap-2 h-10 px-4 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium bg-white hover:bg-gray-50 transition self-start sm:self-auto"
                    >
                        <ArrowLeft size={16} />
                        Kembali ke List
                    </button>
                </div>

                {/* 2. DATA UTAMA FORM AREA */}
                <div className="space-y-6">
                    
                    {/* Panel 1: Ringkasan Informasi RFQ */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                            <div className="flex items-center gap-2">
                                <FileText size={18} className="text-blue-600" />
                                <h3 className="text-base font-bold text-gray-800">
                                    Informasi Utama RFQ
                        </h3>
                            </div>
                            {renderRFQStatusBadge(rfqDetail.statusRFQ)}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
                            <div>
                                <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Nomor RFQ</span>
                                <p className="font-bold text-gray-900">{rfqDetail.kodeRFQ}</p>
                            </div>
                            <div>
                                <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Referensi PR Asal</span>
                                <p className="font-semibold text-blue-600 hover:underline cursor-pointer">{rfqDetail.kodePR}</p>
                            </div>
                            <div>
                                <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Divisi Pemohon</span>
                                <p className="font-medium text-gray-800">{rfqDetail.divisiPemohon}</p>
                            </div>
                            <div>
                                <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Tanggal Dibuat</span>
                                <p className="font-medium text-gray-800">{rfqDetail.tanggalDibuat}</p>
                            </div>
                            <div>
                                <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Batas Akhir Penawaran</span>
                                <p className="font-bold text-red-600 inline-flex items-center gap-1">
                                    <Calendar size={14} /> {rfqDetail.deadlineDate}
                                </p>
                            </div>
                            <div className="lg:col-span-3">
                                <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Perihal Pengadaan</span>
                                <p className="font-semibold text-gray-900">{rfqDetail.perihal}</p>
                            </div>
                        </div>

                        <div className="pt-2">
                            <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Catatan / Instruksi Khusus Vendor</span>
                            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-xs text-gray-600 leading-relaxed">
                                {rfqDetail.catatan || '-'}
                            </div>
                        </div>
                    </div>

                    {/* Panel 2: Tracking Status Respon Vendor & Dokumen Penawaran Masuk */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
                        <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                            <Building2 size={18} className="text-blue-600" />
                            <h3 className="text-base font-bold text-gray-800">
                                Progres Penawaran Harga Vendor (Quotation Bids)
                            </h3>
                        </div>

                        <div className="overflow-x-auto border border-gray-200 rounded-xl">
                            <table className="min-w-full text-sm">
                                <thead className="bg-gray-50 text-gray-700 font-semibold border-b border-gray-200">
                                    <tr>
                                        <th className="px-4 py-3 text-center w-12">No</th>
                                        <th className="px-4 py-3 text-left">Nama Vendor Terundang</th>
                                        <th className="px-4 py-3 text-left">Email Penanggung Jawab</th>
                                        <th className="px-4 py-3 text-center w-40">Status Respon</th>
                                        <th className="px-4 py-3 text-center w-40">Tgl Kirim Penawaran</th>
                                        <th className="px-4 py-3 text-left w-52">Berkas Dokumen</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white text-xs text-gray-700">
                                    {rfqDetail.vendorResponses.map((vendor, index) => (
                                        <tr key={vendor.id} className="hover:bg-gray-50/40 transition-colors">
                                            <td className="px-4 py-3.5 text-gray-400 text-center font-medium">{index + 1}</td>
                                            <td className="px-4 py-3.5 font-bold text-gray-900">{vendor.nama}</td>
                                            <td className="px-4 py-3.5 text-gray-500">{vendor.email}</td>
                                            <td className="px-4 py-3.5 text-center">{renderVendorStatusBadge(vendor.statusRespon)}</td>
                                            <td className="px-4 py-3.5 text-center text-gray-500">{vendor.tanggalRespon}</td>
                                            <td className="px-4 py-3.5">
                                                {vendor.statusRespon === 'Sudah Kirim' ? (
                                                    <a 
                                                        href={`/mock-path/files/${vendor.filePenawaran}`} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:text-blue-800 hover:underline"
                                                    >
                                                        {vendor.filePenawaran}
                                                        <ExternalLink size={12} />
                                                    </a>
                                                ) : (
                                                    <span className="text-gray-400 italic">Menunggu berkas uploaded...</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Panel 3: Rincian Item Barang */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
                        <h3 className="text-base font-bold text-gray-800 border-b border-gray-100 pb-3">
                            Rincian Kebutuhan Barang / Jasa Yang Diminta
                        </h3>

                        <div className="overflow-x-auto border border-gray-200 rounded-xl">
                            <table className="min-w-full text-sm">
                                <thead className="bg-gray-50 text-gray-700 font-semibold border-b border-gray-200">
                                    <tr>
                                        <th className="px-4 py-3 text-center w-12">No</th>
                                        <th className="px-4 py-3 text-left">Nama Barang / Deskripsi Pekerjaan</th>
                                        <th className="px-4 py-3 text-left">Spesifikasi Teknis Aturan</th>
                                        <th className="px-4 py-3 text-center w-28">Kuantitas</th>
                                        <th className="px-4 py-3 text-left w-28">Satuan</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white text-xs text-gray-700">
                                    {rfqDetail.items.map((item, index) => (
                                        <tr key={item.id} className="hover:bg-gray-50/40 transition-colors">
                                            <td className="px-4 py-4 text-gray-400 text-center font-medium">{index + 1}</td>
                                            <td className="px-4 py-4 font-semibold text-gray-900">{item.namaBarang}</td>
                                            <td className="px-4 py-4 text-gray-500 italic">{item.spek || '-'}</td>
                                            <td className="px-4 py-4 text-center font-bold text-blue-600 text-sm">{item.qty}</td>
                                            <td className="px-4 py-4 text-gray-500 font-medium">{item.satuan}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Tombol Kontrol Bawah: Aksi Dinamis Pintas menuju Vendor Selection */}
                    <div className="flex items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => navigate('/portal/request-quotation')}
                            className="h-10 px-5 rounded-lg border border-gray-300 text-sm font-semibold bg-white text-gray-600 hover:bg-gray-50 transition"
                        >
                            Kembali
                        </button>
                        
                        {rfqDetail.statusRFQ === 'Siap Seleksi' && (
                            <button
                                type="button"
                                onClick={() => navigate(`/portal/vendor-selection/process/${id}`)}
                                className="h-10 px-6 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-semibold inline-flex items-center gap-2 transition shadow-sm"
                            >
                                <UserCheck size={16} /> Mulai Proses Seleksi / Komparasi Vendor
                                <ArrowUpRight size={16} />
                            </button>
                        )}
                    </div>

                </div>
            </div>
        </PortalLayout>
    );
}