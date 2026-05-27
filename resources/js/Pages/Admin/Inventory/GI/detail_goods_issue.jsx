import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';

import {
    ArrowLeft,
    Edit3,
    Printer,
    FileText,
    Package,
    Calendar,
    Hash,
    Layers,
    Briefcase,
    User,
    CheckCircle2,
    Truck
} from 'lucide-react';

export default function DetailGoodsIssue() {
    const navigate = useNavigate();
    const { id } = useParams(); // Mengambil ID dari URL parameter

    const [dataHeader, setDataHeader] = useState(null);
    const [dataItems, setDataItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // ==========================================
    // SIMULASI FETCH DATA DETAIL DARI API
    // ==========================================
    useEffect(() => {
        const timer = setTimeout(() => {
            const mockHeader = {
                noIssue: 'GI-2026-0045', 
                tanggalKeluar: '28 Mei 2026',
                gudangAsal: 'Gudang Pusat Logistik (GDG-01)',
                noRefRequest: 'MR-PRJ01-098',
                kodeWbs: 'WBS-1.1.2',
                petugasGudang: 'Hendra Wijaya (Dispatcher PIC)',
                proyekTujuan: 'Proyek Bendungan Hilir Balikpapan',
                subKontraktor: 'PT. Sinar Jaya Mandiri',
                catatan: 'Supir Pak Doni - Truk Colt Diesel Plat B 9283 FAA',
                status: 'Released'
            };

            const mockItems = [
                {
                    id: 1,
                    kodeMaterial: 'BMT-D16',
                    namaMaterial: 'Besi Beton Ulir D16 (KS/Per Batang)',
                    jumlahDiminta: 150,
                    jumlahDikeluarkan: 150,
                    satuan: 'Batang',
                    kondisi: 'Bagus / Layak Konstruksi'
                },
                {
                    id: 2,
                    kodeMaterial: 'CMN-PD50',
                    namaMaterial: 'Semen Padang Type I @50kg',
                    jumlahDiminta: 200,
                    jumlahDikeluarkan: 180,
                    satuan: 'Zak',
                    kondisi: 'Bagus / Layak Konstruksi'
                }
            ];

            setDataHeader(mockHeader);
            setDataItems(mockItems);
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [id]);

    const handlePrint = () => {
        window.print(); // Membuka dialog print browser native
    };

    if (isLoading) {
        return (
            <PortalLayout>
                <div className="flex flex-col items-center justify-center min-h-[400px] space-y-3">
                    <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-sm font-medium text-gray-500">Memuat detail dokumen...</p>
                </div>
            </PortalLayout>
        );
    }

    const totalVolumeKeluar = dataItems.reduce((sum, item) => sum + item.jumlahDikeluarkan, 0);

    return (
        <PortalLayout>
            <div className="space-y-6 print:p-0 print:space-y-4">
                
                {/* 1. HEADER HALAMAN & NAVIGASI (DISEMBUNYIKAN SAAT PRINT) */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-4 print:hidden">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                            Detail Pengeluaran Material <span className="text-sm font-mono bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md border border-blue-200">{dataHeader.noIssue}</span>
                        </h1>
                        <div className="flex items-center gap-2 mt-1 text-sm text-gray-400">
                            <span className="text-gray-400">Inventory & Warehouse</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-gray-400">Goods Issue</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-gray-800 font-medium">Lihat Detail</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                        <button
                            type="button"
                            onClick={() => navigate('/portal/inventory/goods-issue')}
                            className="inline-flex items-center gap-2 h-10 px-4 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium bg-white hover:bg-gray-50 transition"
                        >
                            <ArrowLeft size={16} /> Kembali
                        </button>
                        <button
                            type="button"
                            onClick={handlePrint}
                            className="inline-flex items-center gap-2 h-10 px-4 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium bg-white hover:bg-gray-50 transition"
                        >
                            <Printer size={16} /> Cetak Bukti GI
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate(`/portal/inventory/goods-issue/edit`)}
                            className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition shadow-sm"
                        >
                            <Edit3 size={16} /> Edit Dokumen
                        </button>
                    </div>
                </div>

                {/* HEADER KHUSUS TAMPILAN CETAK/PRINT */}
                <div className="hidden print:flex flex-col items-center text-center border-b-2 border-gray-900 pb-4 mb-4">
                    <h1 className="text-xl font-bold uppercase tracking-wide text-gray-900">PT. LOGISTIK KONSTRUKSI INDONESIA</h1>
                    <p className="text-xs text-gray-500 font-medium">Formulir Bukti Pengeluaran Barang / Goods Issue (GI)</p>
                </div>

                {/* SEKSI A: DATA HEADER UTAMA (INFO DOKUMEN) */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-6 print:border-none print:shadow-none print:p-0">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                        <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2 print:text-base">
                            <FileText size={16} className="text-blue-600 print:hidden" /> 1. Informasi Manifes & Validasi Dokumen
                        </h3>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold bg-green-50 text-green-700 border border-green-200 rounded-full font-mono uppercase">
                            <CheckCircle2 size={13} /> {dataHeader.status}
                        </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4 text-sm">
                        <div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wide block mb-0.5 flex items-center gap-1"><Hash size={12} /> No. Goods Issue</span>
                            <span className="font-mono font-bold text-gray-900 text-base">{dataHeader.noIssue}</span>
                        </div>
                        <div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wide block mb-0.5 flex items-center gap-1"><Calendar size={12} /> Tanggal Keluar</span>
                            <span className="font-medium text-gray-800">{dataHeader.tanggalKeluar}</span>
                        </div>
                        <div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wide block mb-0.5 flex items-center gap-1"><Layers size={12} /> Asal Gudang</span>
                            <span className="font-medium text-gray-800">{dataHeader.gudangAsal}</span>
                        </div>
                        <div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wide block mb-0.5 flex items-center gap-1"><FileText size={12} /> Ref. No Material Request</span>
                            <span className="font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 text-xs print:bg-none print:border-none print:p-0">{dataHeader.noRefRequest}</span>
                        </div>
                    </div>

                    <hr className="border-gray-100 print:border-gray-200" />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                        <div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wide block mb-0.5 flex items-center gap-1"><Briefcase size={12} /> WBS / Cost Center</span>
                            <span className="font-semibold text-gray-800">{dataHeader.kodeWbs}</span>
                        </div>
                        <div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wide block mb-0.5 flex items-center gap-1"><User size={12} /> Dispatcher / PIC Gudang</span>
                            <span className="font-medium text-gray-800">{dataHeader.petugasGudang}</span>
                        </div>
                        <div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wide block mb-0.5">Lokasi Proyek Tujuan</span>
                            <span className="font-semibold text-gray-800">{dataHeader.proyekTujuan}</span>
                        </div>
                    </div>

                    <hr className="border-gray-100 print:border-gray-200" />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                        <div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wide block mb-0.5">Subkontraktor Pelaksana</span>
                            <span className="font-medium text-gray-800">{dataHeader.subKontraktor}</span>
                        </div>
                        <div className="md:col-span-2">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wide block mb-0.5 flex items-center gap-1"><Truck size={12} /> Catatan Pengiriman / Ekspedisi</span>
                            <span className="text-gray-700 italic bg-gray-50 px-3 py-2 rounded-lg border border-gray-100 block print:bg-none print:border-none print:p-0">{dataHeader.catatan || '-'}</span>
                        </div>
                    </div>
                </div>

                {/* SEKSI B: DETAIL ITEM TABEL (READ ONLY) */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4 print:border-none print:shadow-none print:p-0">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                        <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2 print:text-base">
                            <Package size={16} className="text-blue-600 print:hidden" /> 2. Detail Spesifikasi & Volume Material Keluar
                        </h3>
                        <div className="text-xs font-bold text-gray-500 flex gap-4 print:text-sm">
                            <div>Total SKU: <span className="text-gray-900 font-mono">{dataItems.length}</span></div>
                            <div>Total Volume Keluar: <span className="text-blue-600 font-mono">{totalVolumeKeluar}</span></div>
                        </div>
                    </div>

                    <div className="overflow-x-auto border border-gray-200 rounded-xl print:border-gray-300">
                        <table className="min-w-full text-sm">
                            <thead className="bg-gray-50 text-gray-700 font-bold border-b border-gray-200 text-xs uppercase tracking-wider print:bg-none">
                                <tr>
                                    <th className="px-4 py-3 text-left w-40">SKU / Kode</th>
                                    <th className="px-4 py-3 text-left">Nama & Spesifikasi Teknis Material</th>
                                    <th className="px-3 py-3 text-center w-24">Satuan</th>
                                    <th className="px-3 py-3 text-center w-32">Vol Diminta (MR)</th>
                                    <th className="px-3 py-3 text-center w-32">Vol Dikeluarkan</th>
                                    <th className="px-4 py-3 text-left w-52">Kondisi Barang</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {dataItems.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50/50 transition">
                                        <td className="px-4 py-3.5 font-mono font-bold text-gray-900">{item.kodeMaterial}</td>
                                        <td className="px-4 py-3.5 font-medium text-gray-800">{item.namaMaterial}</td>
                                        <td className="px-3 py-3.5 text-center text-gray-600 font-medium">{item.satuan}</td>
                                        <td className="px-3 py-3.5 text-center font-mono text-gray-600">{item.jumlahDiminta}</td>
                                        <td className="px-3 py-3.5 text-center font-mono font-bold text-blue-600 print:text-gray-900">{item.jumlahDikeluarkan}</td>
                                        <td className="px-4 py-3.5 text-left">
                                            <span className="text-xs font-semibold px-2 py-1 bg-gray-100 text-gray-700 rounded border border-gray-200 print:border-none print:p-0">
                                                {item.kondisi}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* TANDA TANGAN UNTUK VERSI CETAK / PRINT DOKUMEN */}
                <div className="hidden print:grid grid-cols-3 gap-4 text-center text-xs mt-12 pt-8 border-t border-dashed border-gray-300">
                    <div className="space-y-12">
                        <p>Dibuat Oleh (Dispatcher)</p>
                        <p className="font-bold underline">{dataHeader.petugasGudang.split(' (')[0]}</p>
                    </div>
                    <div className="space-y-12">
                        <p>Diterima Oleh (Mandor/Subkon)</p>
                        <p className="font-bold underline">{dataHeader.subKontraktor}</p>
                    </div>
                    <div className="space-y-12">
                        <p>Diketahui (Direktur Utama)</p>
                        <p className="font-bold underline">( Agus Imam Riyadi )</p>
                    </div>
                </div>

            </div>
        </PortalLayout>
    );
}