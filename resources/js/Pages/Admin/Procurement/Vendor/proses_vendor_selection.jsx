import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';

import {
    ArrowLeft,
    FileText,
    TrendingUp,
    ShieldAlert,
    CheckCircle2,
    Save,
    ExternalLink,
    Award,
    AlertCircle
} from 'lucide-react';

export default function ProcessVendorSelection() {
    const navigate = useNavigate();
    const { id } = useParams();

    // ==========================================
    // SIMULASI DETAIL DATA RFQ & PENAWARAN VENDOR
    // ==========================================
    const [rfqDetail] = useState({
        kodeRFQ: 'RFQ/PROC/AGS/2026/05/002',
        kodePR: 'PR/PROC/AGS/2026/04/015',
        perihal: 'Peremajaan Server Ruang Data Center',
        divisiPemohon: 'Teknologi Informasi',
        deadlineDate: '25/05/2026',
        
        // Rincian Item Barang Kebutuhan
        items: [
            { id: 201, namaBarang: 'HPE ProLiant DL380 Gen10', qty: 1, satuan: 'Unit', spek: 'Intel Xeon 4208, 32GB RAM' },
            { id: 202, namaBarang: 'UPS APC Smart-UPS 3000VA', qty: 2, satuan: 'Unit', spek: 'Rackmount 2U, LCD 230V' }
        ],

        // Data Matriks Penawaran Komparasi Harga Masuk dari Vendor
        vendors: [
            {
                id: 1,
                nama: 'PT. Computindo Utama',
                filePenawaran: 'QUO-CU-9921.pdf',
                penawaranHarga: {
                    201: { hargaSatuan: 62000000, total: 62000000 },
                    202: { hargaSatuan: 14500000, total: 29000000 }
                },
                grandTotal: 91000000
            },
            {
                id: 2,
                nama: 'CV. TechMedia Nusantara',
                filePenawaran: 'TMN-PRQM-2026.pdf',
                penawaranHarga: {
                    201: { hargaSatuan: 59500000, total: 59500000 },
                    202: { hargaSatuan: 15200000, total: 30400000 }
                },
                grandTotal: 89900000 // Harga Termurah Terakumulasi
            },
            {
                id: 3,
                nama: 'PT. Sinergi Integrasi',
                filePenawaran: 'SI-OFFER-04.pdf',
                penawaranHarga: {
                    201: { hargaSatuan: 64000000, total: 64000000 },
                    202: { hargaSatuan: 14000000, total: 28000000 }
                },
                grandTotal: 92000000
            }
        ]
    });

    // ==========================================
    // STATE FORM EVALUASI & PENENTUAN PEMENANG
    // ==========================================
    const [evaluation, setEvaluation] = useState({
        vendorPemenangId: '',
        alasanPemilihan: '',
        catatanNegosiasi: '',
        skorKualifikasi: {} // Menyimpan skor non-teknis per vendor jika diperlukan
    });

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setEvaluation(prev => ({ ...prev, [name]: value }));
    };

    // Helper Format Rupiah untuk Tampilan Finansial
    const formatRupiah = (angka) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(angka);
    };

    // Handler Kirim Hasil Seleksi (Berita Acara Kelulusan)
    const handleSubmitSelection = (e) => {
        e.preventDefault();

        if (!evaluation.vendorPemenangId) {
            return alert('Silakan tentukan 1 Vendor Pemenang utama untuk pengadaan ini!');
        }

        const selectedVendorObj = rfqDetail.vendors.find(v => v.id === parseInt(evaluation.vendorPemenangId));

        const payload = {
            rfqId: id,
            kodeRFQ: rfqDetail.kodeRFQ,
            vendorPemenang: selectedVendorObj.nama,
            vendorPemenangId: evaluation.vendorPemenangId,
            totalNilaiDisetujui: selectedVendorObj.grandTotal,
            alasanPemilihan: evaluation.alasanPemilihan,
            catatanNegosiasi: evaluation.catatanNegosiasi
        };

        console.log('Data Berita Acara Vendor Selection Payload:', payload);
        alert(`Berita Acara Selesai! Vendor "${selectedVendorObj.nama}" resmi ditunjuk sebagai pemenang.`);
        navigate('/portal/vendor-selection'); // Kembali ke halaman utama list
    };

    return (
        <PortalLayout>
            <div className="space-y-6">
                
                {/* 1. HEADER HALAMAN & BREADCRUMBS */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Proses Evaluasi & Seleksi Vendor
                        </h1>

                        <div className="flex items-center gap-2 mt-1 text-sm">
                            <span className="text-gray-400">Procurement</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-gray-400">Vendor Selection</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-blue-600 font-medium">Evaluasi {rfqDetail.kodeRFQ}</span>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 h-10 px-4 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium bg-white hover:bg-gray-50 transition self-start sm:self-auto"
                    >
                        <ArrowLeft size={16} />
                        Kembali
                    </button>
                </div>

                {/* INFO RINGKAS DOKUMEN REFERENSI */}
                <div className="bg-slate-900 text-white border border-slate-800 rounded-xl p-5 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                    <div>
                        <span className="text-slate-400 block mb-0.5 font-medium">NOMOR RFQ MASTER:</span>
                        <span className="text-sm font-bold text-white tracking-wide">{rfqDetail.kodeRFQ}</span>
                    </div>
                    <div>
                        <span className="text-slate-400 block mb-0.5 font-medium">NOMOR REFERENSI PR:</span>
                        <span className="text-sm font-bold text-blue-400">{rfqDetail.kodePR}</span>
                    </div>
                    <div>
                        <span className="text-slate-400 block mb-0.5 font-medium">PERIHAL PENGADAAN:</span>
                        <span className="text-sm font-bold text-white line-clamp-1">{rfqDetail.perihal}</span>
                    </div>
                    <div>
                        <span className="text-slate-400 block mb-0.5 font-medium">DIVISI / DEPARTEMEN:</span>
                        <span className="text-sm font-bold text-white">{rfqDetail.divisiPemohon}</span>
                    </div>
                </div>

                <form onSubmit={handleSubmitSelection} className="space-y-6">

                    {/* 2. MATRIKS KOMPARASI HARGA SIDE-BY-SIDE */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
                        <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                            <TrendingUp size={18} className="text-blue-600" />
                            <h3 className="text-base font-bold text-gray-800">
                                Matriks Perbandingan Harga Penawaran Berdampingan
                            </h3>
                        </div>

                        <div className="overflow-x-auto border border-gray-200 rounded-xl">
                            <table className="min-w-full text-sm border-collapse">
                                <thead className="bg-gray-50 text-gray-700 font-semibold border-b border-gray-200">
                                    {/* Row 1: Header Nama-Nama Vendor */}
                                    <tr>
                                        <th rowSpan="2" className="px-4 py-3 text-center border-r border-gray-200 w-12 bg-gray-100">No</th>
                                        <th rowSpan="2" className="px-4 py-3 text-left border-r border-gray-200 min-w-[240px] bg-gray-100">Deskripsi Barang / Spesifikasi PR</th>
                                        <th rowSpan="2" className="px-4 py-3 text-center border-r border-gray-200 w-20 bg-gray-100">Qty</th>
                                        
                                        {rfqDetail.vendors.map((vendor) => (
                                            <th key={vendor.id} colSpan="2" className="px-4 py-2 text-center border-r border-gray-200 bg-blue-50/60 text-blue-900 border-b">
                                                <div className="space-y-1">
                                                    <p className="font-bold text-xs uppercase tracking-wide">{vendor.nama}</p>
                                                    <a href="#view" className="inline-flex items-center gap-0.5 text-[10px] text-blue-600 hover:underline">
                                                        <ExternalLink size={10} /> Lihat Berkas Berita Acara (.pdf)
                                                    </a>
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                    {/* Row 2: Sub Header Kolom Finansial */}
                                    <tr>
                                        {rfqDetail.vendors.map((vendor) => (
                                            <React.Fragment key={`sub-${vendor.id}`}>
                                                <th className="px-3 py-2 text-right text-xs font-semibold text-gray-500 bg-gray-50/30 border-r border-gray-200 w-36">Harga Satuan</th>
                                                <th className="px-3 py-2 text-right text-xs font-semibold text-gray-600 bg-gray-100/50 border-r border-gray-200 w-36">Total Harga</th>
                                            </React.Fragment>
                                        ))}
                                    </tr>
                                </thead>
                                
                                <tbody className="divide-y divide-gray-200 bg-white text-xs text-gray-700">
                                    {/* Iterasi Item Barang dari Kebutuhan PR */}
                                    {rfqDetail.items.map((item, index) => (
                                        <tr key={item.id} className="hover:bg-gray-50/40 transition-colors">
                                            <td className="px-4 py-4 text-center border-r border-gray-200 font-medium text-gray-400 bg-gray-50/20">{index + 1}</td>
                                            <td className="px-4 py-4 border-r border-gray-200">
                                                <p className="font-bold text-gray-900 text-sm">{item.namaBarang}</p>
                                                <p className="text-gray-400 text-[10px] italic mt-0.5">{item.spek}</p>
                                            </td>
                                            <td className="px-4 py-4 text-center font-bold text-gray-800 border-r border-gray-200">
                                                {item.qty} <span className="text-[10px] text-gray-400 font-medium block">{item.satuan}</span>
                                            </td>

                                            {/* Distribusikan Data Finansial Penawaran Vendor Secara Horizontal */}
                                            {rfqDetail.vendors.map((vendor) => {
                                                const bid = vendor.penawaranHarga[item.id];
                                                return (
                                                    <React.Fragment key={`bid-${vendor.id}-${item.id}`}>
                                                        <td className="px-3 py-4 text-right border-r border-gray-200 text-gray-600 font-medium">
                                                            {bid ? formatRupiah(bid.hargaSatuan) : '-'}
                                                        </td>
                                                        <td className="px-3 py-4 text-right border-r border-gray-200 font-semibold text-gray-900 bg-gray-50/40">
                                                            {bid ? formatRupiah(bid.total) : '-'}
                                                        </td>
                                                    </React.Fragment>
                                                );
                                            })}
                                        </tr>
                                    ))}

                                    {/* BARIS AKUMULASI GRAND TOTAL PENAWARAN (FOOTER TABEL) */}
                                    <tr className="bg-slate-50 font-bold text-gray-900 border-t-2 border-gray-300">
                                        <td colSpan="3" className="px-4 py-4 text-right uppercase text-xs font-bold tracking-wider text-gray-500 border-r border-gray-200 bg-gray-100">
                                            Total Akumulasi Anggaran Pengajuan:
                                        </td>
                                        {rfqDetail.vendors.map((vendor) => (
                                            <React.Fragment key={`total-${vendor.id}`}>
                                                <td className="px-3 py-4 bg-gray-100 border-r border-gray-200"></td>
                                                <td className="px-3 py-4 text-right text-sm font-black border-r border-gray-200 text-blue-700 bg-blue-50/40">
                                                    {formatRupiah(vendor.grandTotal)}
                                                </td>
                                            </React.Fragment>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* 3. PANEL INPUT PENETAPAN PEMENANG (FORM BERITA ACARA) */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
                        <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                            <Award size={18} className="text-blue-600" />
                            <h3 className="text-base font-bold text-gray-800">
                                Lembar Berita Acara & Penetapan Vendor Pemenang
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="md:col-span-1">
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Tunjuk Pemenang Pengadaan <span className="text-red-500">*</span>
                                </label>
                                <select 
                                    name="vendorPemenangId"
                                    required
                                    value={evaluation.vendorPemenangId}
                                    onChange={handleSelectChange}
                                    className="w-full h-11 px-3 border border-blue-300 bg-blue-50/20 text-blue-900 font-bold rounded-lg text-sm focus:border-blue-500 focus:bg-white outline-none transition"
                                >
                                    <option value="" className="text-gray-700 font-normal">-- Pilih Pemenang Hasil Seleksi --</option>
                                    {rfqDetail.vendors.map(vendor => (
                                        <option key={vendor.id} value={vendor.id} className="text-gray-900 font-semibold">
                                            {vendor.nama} ({formatRupiah(vendor.grandTotal)})
                                        </option>
                                    ))}
                                </select>
                                <div className="mt-2 text-[11px] text-gray-400 flex items-start gap-1 leading-relaxed">
                                    <AlertCircle size={12} className="shrink-0 text-amber-500 mt-0.5" />
                                    <span>Penunjukan vendor pemenang akan mengunci anggaran pengadaan dan menjadi acuan utama dokumen Purchase Order (PO).</span>
                                </div>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-600 mb-2">
                                    Justifikasi / Alasan Utama Pemilihan <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="alasanPemilihan"
                                    required
                                    rows="2"
                                    value={evaluation.alasanPemilihan}
                                    onChange={handleSelectChange}
                                    placeholder="Tuliskan alasan penunjukan pemenang (Contoh: Menawarkan harga terendah dengan spesifikasi SLA pemeliharaan paling optimal selama 3 tahun...)"
                                    className="w-full rounded-lg border border-gray-300 p-3 text-sm outline-none focus:border-blue-500"
                                ></textarea>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 pt-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">
                                    Catatan Hasil Negosiasi Akhir (Opsional)
                                </label>
                                <textarea
                                    name="catatanNegosiasi"
                                    rows="2"
                                    value={evaluation.catatanNegosiasi}
                                    onChange={handleSelectChange}
                                    placeholder="Tuliskan poin negosiasi tambahan yang disepakati bersama vendor pasca penawaran diajukan (jika ada)..."
                                    className="w-full rounded-lg border border-gray-300 p-3 text-sm outline-none focus:border-blue-500"
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    {/* KONTROL ACTION TOMBOL BAWAH */}
                    <div className="flex items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="h-10 px-5 rounded-lg border border-gray-300 text-sm font-semibold bg-white text-gray-600 hover:bg-gray-50 transition"
                        >
                            Kembali / Batalkan
                        </button>
                        
                        <button
                            type="submit"
                            className="h-10 px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold inline-flex items-center gap-2 transition shadow-sm"
                        >
                            <Save size={16} /> Finalisasi Berita Acara Seleksi
                        </button>
                    </div>

                </form>
            </div>
        </PortalLayout>
    );
}