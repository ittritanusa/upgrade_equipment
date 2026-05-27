import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';

import {
    ArrowLeft,
    FileText,
    Building2,
    Calendar,
    Truck,
    CreditCard,
    Coins,
    Printer,
    Download,
    CheckCircle2,
    Clock,
    FileCheck2
} from 'lucide-react';

export default function DetailPurchaseOrder() {
    const navigate = useNavigate();
    const { id } = useParams();

    // ==========================================
    // SIMULASI DATA DETAIL PURCHASE ORDER (PO)
    // ==========================================
    const [poDetail] = useState({
        kodePO: 'PO/PROC/AGS/2026/05/002',
        kodeBA: 'BA-SV/PROC/AGS/2026/05/012',
        kodePR: 'PR/PROC/AGS/2026/04/015',
        perihal: 'Peremajaan Server Ruang Data Center',
        tanggalPO: '27/05/2026',
        statusPO: 'Disetujui', // Status: Draft / Menunggu Persetujuan / Disetujui / Dikirim ke Vendor
        divisiPemohon: 'Teknologi Informasi',
        
        // Informasi Kontrak Vendor
        vendor: {
            nama: 'CV. TechMedia Nusantara',
            email: 'info@techmedia.co.id',
            telepon: '021-88997766',
            alamat: 'Ruko Inkopal Blok B-14, Kelapa Gading, Jakarta Utara'
        },

        // Syarat Komersial & Logistik
        termOfPayment: 'Net 30 Days',
        deliveryDate: '15/06/2026',
        shippingAddress: 'Gudang Pusat AGS, Jl. Industri No. 12, Komplek Pergudangan Cakung, Jakarta',
        catatan: 'Harap konfirmasi 1 hari sebelum pengiriman ke PIC Gudang (Bpk. Andi). Seluruh perangkat server wajib dikemas menggunakan peti kayu tertutup.',

        // Rincian Item Barang Final
        items: [
            { id: 201, namaBarang: 'HPE ProLiant DL380 Gen10', qty: 1, satuan: 'Unit', spek: 'Intel Xeon 4208, 32GB RAM', hargaSatuan: 59500000, total: 59500000 },
            { id: 202, namaBarang: 'UPS APC Smart-UPS 3000VA', qty: 2, satuan: 'Unit', spek: 'Rackmount 2U, LCD 230V', hargaSatuan: 15200000, total: 30400000 }
        ],
        totalNilaiPO: 89900000
    });

    // Helper Format Rupiah
    const formatRupiah = (angka) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(angka);
    };

    // Helper Badge Status PO
    const renderPOStatusBadge = (status) => {
        switch (status) {
            case 'Dikirim ke Vendor':
                return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold">Sent to Vendor</span>;
            case 'Disetujui':
                return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold"><CheckCircle2 size={12} /> Approved</span>;
            case 'Menunggu Persetujuan':
                return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold animate-pulse"><Clock size={12} /> Pending Approval</span>;
            default:
                return <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold">{status}</span>;
        }
    };

    return (
        <PortalLayout>
            <div className="space-y-6">
                
                {/* 1. HEADER HALAMAN & BREADCRUMBS */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Detail Purchase Order
                        </h1>

                        <div className="flex items-center gap-2 mt-1 text-sm">
                            <span className="text-gray-400">Procurement</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-gray-400">Purchase Order</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-blue-600 font-medium">{poDetail.kodePO}</span>
                        </div>
                    </div>

                    {/* Tombol Kontrol Cetak & Navigasi */}
                    <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
                        <button
                            type="button"
                            onClick={() => window.print()}
                            className="inline-flex items-center gap-1.5 h-10 px-3.5 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium bg-white hover:bg-gray-50 transition"
                        >
                            <Printer size={15} /> Cetak PO
                        </button>
                        <button
                            type="button"
                            className="inline-flex items-center gap-1.5 h-10 px-3.5 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium bg-white hover:bg-gray-50 transition"
                        >
                            <Download size={15} /> Unduh PDF
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/portal/purchase-order')}
                            className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-gray-950 text-white text-sm font-medium hover:bg-gray-800 transition"
                        >
                            <ArrowLeft size={16} /> Kembali
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                    
                    {/* LEFT COLUMN: DETAIL INFORMASI PO & VENDOR */}
                    <div className="lg:col-span-2 space-y-6">
                        
                        {/* Panel 1: Ringkasan Identitas Dokumen */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
                            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                                <div className="flex items-center gap-2">
                                    <FileText size={18} className="text-blue-600" />
                                    <h3 className="text-base font-bold text-gray-800">Informasi Utama PO</h3>
                                </div>
                                {renderPOStatusBadge(poDetail.statusPO)}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                                <div>
                                    <span className="block font-semibold text-gray-400 mb-0.5 uppercase tracking-wide">Nomor PO</span>
                                    <p className="font-bold text-gray-900 text-sm tracking-wide">{poDetail.kodePO}</p>
                                </div>
                                <div>
                                    <span className="block font-semibold text-gray-400 mb-0.5 uppercase tracking-wide">Tanggal Terbit PO</span>
                                    <p className="font-medium text-gray-800 inline-flex items-center gap-1">
                                        <Calendar size={13} /> {poDetail.tanggalPO}
                                    </p>
                                </div>
                                <div>
                                    <span className="block font-semibold text-gray-400 mb-0.5 uppercase tracking-wide">Divisi Pemohon</span>
                                    <p className="font-medium text-gray-800">{poDetail.divisiPemohon}</p>
                                </div>
                                <div>
                                    <span className="block font-semibold text-gray-400 mb-0.5 uppercase tracking-wide">Referensi Berita Acara</span>
                                    <p className="font-semibold text-blue-600 hover:underline cursor-pointer">{poDetail.kodeBA}</p>
                                </div>
                                <div>
                                    <span className="block font-semibold text-gray-400 mb-0.5 uppercase tracking-wide">Referensi No. PR</span>
                                    <p className="font-medium text-gray-700">{poDetail.kodePR}</p>
                                </div>
                                <div className="sm:col-span-2 md:col-span-3 border-t border-gray-100 pt-3">
                                    <span className="block font-semibold text-gray-400 mb-0.5 uppercase tracking-wide">Perihal Pengadaan</span>
                                    <p className="font-bold text-gray-900 text-sm leading-relaxed">{poDetail.perihal}</p>
                                </div>
                            </div>
                        </div>

                        {/* Panel 2: Syarat Pengiriman & Pembayaran */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
                            <h3 className="text-base font-bold text-gray-800 border-b border-gray-100 pb-3 flex items-center gap-2">
                                <Truck size={18} className="text-blue-600" /> Syarat & Ketentuan Logistik
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                                <div className="space-y-3">
                                    <div className="flex items-start gap-2.5 p-3 bg-gray-50 rounded-lg border border-gray-200">
                                        <CreditCard size={16} className="text-gray-500 mt-0.5" />
                                        <div>
                                            <span className="block font-bold text-gray-400 uppercase tracking-wider text-[10px]">Term of Payment (TOP)</span>
                                            <p className="font-bold text-gray-900 mt-0.5 text-sm">{poDetail.termOfPayment}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-2.5 p-3 bg-gray-50 rounded-lg border border-gray-200">
                                        <Calendar size={16} className="text-gray-500 mt-0.5" />
                                        <div>
                                            <span className="block font-bold text-gray-400 uppercase tracking-wider text-[10px]">Target Pengiriman</span>
                                            <p className="font-bold text-red-600 mt-0.5 text-sm">{poDetail.deliveryDate}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                                    <span className="block font-bold text-gray-400 uppercase tracking-wider text-[10px] mb-1">Alamat Pengiriman (Shipping Address)</span>
                                    <p className="font-medium text-gray-700 leading-relaxed">{poDetail.shippingAddress}</p>
                                </div>
                            </div>

                            <div className="text-xs">
                                <span className="block font-semibold text-gray-400 uppercase tracking-wide mb-1">Instruksi / Catatan Khusus Tambahan</span>
                                <div className="bg-amber-50/50 rounded-lg p-3 border border-amber-200 text-gray-700 leading-relaxed font-medium">
                                    {poDetail.catatan || '-'}
                                </div>
                            </div>
                        </div>

                        {/* Panel 3: Tabel Rincian Item Barang */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
                            <h3 className="text-base font-bold text-gray-800 border-b border-gray-100 pb-3 flex items-center gap-2">
                                <FileCheck2 size={18} className="text-blue-600" /> Rincian Anggaran Finansial Barang
                            </h3>

                            <div className="overflow-x-auto border border-gray-200 rounded-xl">
                                <table className="min-w-full text-sm">
                                    <thead className="bg-gray-50 text-gray-700 font-semibold border-b border-gray-200">
                                        <tr>
                                            <th className="px-4 py-3 text-center w-12">No</th>
                                            <th className="px-4 py-3 text-left">Nama Barang / Deskripsi Teknis</th>
                                            <th className="px-4 py-3 text-center w-20">Qty</th>
                                            <th className="px-4 py-3 text-left w-20">Satuan</th>
                                            <th className="px-4 py-3 text-right w-40">Harga Satuan</th>
                                            <th className="px-4 py-3 text-right w-44">Total Harga</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white text-xs text-gray-700">
                                        {poDetail.items.map((item, index) => (
                                            <tr key={item.id} className="hover:bg-gray-50/30 transition-colors">
                                                <td className="px-4 py-4 text-center font-medium text-gray-400">{index + 1}</td>
                                                <td className="px-4 py-4">
                                                    <p className="font-bold text-gray-900 text-sm">{item.namaBarang}</p>
                                                    <p className="text-gray-400 text-[10px] italic mt-0.5">{item.spek}</p>
                                                </td>
                                                <td className="px-4 py-4 text-center font-bold text-gray-800">{item.qty}</td>
                                                <td className="px-4 py-4 text-gray-500 font-medium">{item.satuan}</td>
                                                <td className="px-4 py-4 text-right">{formatRupiah(item.hargaSatuan)}</td>
                                                <td className="px-4 py-4 text-right font-bold text-gray-900 bg-gray-50/40">{formatRupiah(item.total)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Nilai Akumulasi Akhir PO */}
                            <div className="flex justify-end pt-2">
                                <div className="flex items-center gap-12 bg-gray-900 text-white px-6 py-3.5 rounded-xl">
                                    <div className="flex items-center gap-1.5 text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        <Coins size={16} className="text-yellow-400" /> Total Nilai Purchase Order:
                                    </div>
                                    <span className="text-xl font-black tracking-wide">
                                        {formatRupiah(poDetail.totalNilaiPO)}
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* RIGHT COLUMN: INFORMASI DETAIL VENDOR CONTRAK */}
                    <div className="lg:col-span-1 space-y-6">
                        
                        {/* Panel Detail Vendor */}
                        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
                            <div className="flex items-center gap-2 border-b border-gray-100 pb-2.5">
                                <Building2 size={16} className="text-gray-500" />
                                <h3 className="text-sm font-bold text-gray-800">Tujuan Vendor Kontrak</h3>
                            </div>

                            <div className="space-y-3 text-xs">
                                <div>
                                    <span className="block font-bold text-blue-600 uppercase tracking-wide text-[10px] mb-0.5">Nama Vendor / Perusahaan:</span>
                                    <p className="font-black text-gray-900 text-sm uppercase">{poDetail.vendor.nama}</p>
                                </div>
                                <div>
                                    <span className="block font-semibold text-gray-400 text-[10px] uppercase">Email Operasional:</span>
                                    <p className="font-medium text-gray-800">{poDetail.vendor.email}</p>
                                </div>
                                <div>
                                    <span className="block font-semibold text-gray-400 text-[10px] uppercase">No. Telepon / Fax:</span>
                                    <p className="font-medium text-gray-800">{poDetail.vendor.telepon}</p>
                                </div>
                                <div className="pt-1.5 border-t border-gray-100">
                                    <span className="block font-semibold text-gray-400 text-[10px] uppercase mb-0.5">Alamat Kantor Vendor:</span>
                                    <p className="font-medium text-gray-600 leading-relaxed">{poDetail.vendor.alamat}</p>
                                </div>
                            </div>
                        </div>

                        {/* Panel Approval Status Otorisasi Internal */}
                        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
                            <h3 className="text-sm font-bold text-gray-800 border-b border-gray-100 pb-2">Log Validasi Otorisasi</h3>
                            
                            <div className="space-y-3 text-xs">
                                <div className="flex items-center justify-between border-b border-dashed border-gray-100 pb-2">
                                    <span className="text-gray-400">Dibuat Oleh:</span>
                                    <span className="font-semibold text-gray-800 text-right">Tim Purchasing <span className="block text-[10px] text-gray-400 font-normal">27/05/2026</span></span>
                                </div>
                                <div className="flex items-center justify-between border-b border-dashed border-gray-100 pb-2">
                                    <span className="text-gray-400">Verifikasi Anggaran:</span>
                                    <span className="font-semibold text-emerald-600 text-right">Finance Mgr <span className="block text-[10px] text-emerald-500 font-bold uppercase tracking-widest">✔ VERIFIED</span></span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-400">Persetujuan Direksi:</span>
                                    <span className="font-semibold text-emerald-600 text-right">Procurement Dir <span className="block text-[10px] text-emerald-500 font-bold uppercase tracking-widest">✔ APPROVED</span></span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </PortalLayout>
    );
}