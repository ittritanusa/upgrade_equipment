import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';

import {
    ArrowLeft,
    Edit2,
    Tag,
    Layers,
    Warehouse,
    ShieldCheck,
    History,
    Boxes,
    ArrowUpRight,
    ArrowDownLeft,
    Calendar,
    FileText,
    Info
} from 'lucide-react';

export default function DetailMasterItemMaterial() {
    const navigate = useNavigate();
    const { id } = useParams();

    // ==========================================
    // SIMULASI DATA DETAIL MASTER ITEM
    // ==========================================
    const [itemDetail] = useState({
        sku: 'SKU-IT-UPS-003',
        namaItem: 'UPS APC Smart-UPS 3000VA Rackmount',
        kategori: 'Teknologi Informasi',
        merek: 'APC by Schneider Electric',
        tipeInventaris: 'Asset',
        satuanBesar: 'Unit',
        stokAktif: 2,
        minStok: 5,
        maxStok: 15,
        lokasiRak: 'Rak A-02',
        metodeValuasi: 'FIFO',
        status: 'Aktif',
        catatanTeknis: 'Rackmount 2U, LCD 230V. Pastikan baterai diperiksa setiap 6 bulan sekali oleh tim infrastruktur.',
        lastUpdated: '20/05/2026 14:20 oleh Admin Warehouse',
        
        // Histori Kartu Stok (Stock Card Ledger)
        stockCard: [
            { id: 101, tanggal: '27/05/2026', noReferensi: 'TO/2026/05/112', tipe: 'Keluar', keterangan: 'Pengeluaran untuk Ruang Server Lt.3', qty: 1, sisaStok: 2 },
            { id: 102, tanggal: '25/05/2026', noReferensi: 'GRN/2026/05/044', tipe: 'Masuk', keterangan: 'Penerimaan PO #002 - CV. TechMedia', qty: 2, sisaStok: 3 },
            { id: 103, tanggal: '10/04/2026', noReferensi: 'GRN/2026/04/012', tipe: 'Masuk', keterangan: 'Stok Awal Registrasi Gudang', qty: 1, sisaStok: 1 }
        ]
    });

    // Helper Badge Kondisi Stok
    const renderStockAlert = (stok, limit) => {
        if (stok === 0) {
            return <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-xs font-medium flex items-center gap-2">
                <Info size={16} className="text-red-500" /> <strong>Perhatian:</strong> Stok barang ini telah habis di gudang!
            </div>;
        } else if (stok <= limit) {
            return <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-amber-700 text-xs font-medium flex items-center gap-2 animate-pulse">
                <Info size={16} className="text-amber-500" /> <strong>Peringatan Reorder:</strong> Kuantitas saat ini berada di bawah batas minimum keamanan.
            </div>;
        }
        return null;
    };

    return (
        <PortalLayout>
            <div className="space-y-6">
                
                {/* 1. HEADER HALAMAN & UTILITY ACTION BUTTONS */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Detail Master Item & Material
                        </h1>
                        <div className="flex items-center gap-2 mt-1 text-sm">
                            <span className="text-gray-400">Inventory & Warehouse</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-gray-400">Master Data</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-blue-600 font-medium">{itemDetail.sku}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                        <button
                            type="button"
                            onClick={() => navigate(`/portal/inventory/master-item/edit`)}
                            className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition shadow-sm"
                        >
                            <Edit2 size={14} /> Ubah Parameter
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/portal/inventory/master-item')}
                            className="inline-flex items-center gap-2 h-10 px-4 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium bg-white hover:bg-gray-50 transition"
                        >
                            <ArrowLeft size={16} /> Kembali
                        </button>
                    </div>
                </div>

                {/* ALERT KONDISI REORDER LEVEL */}
                {renderStockAlert(itemDetail.stokActive ?? itemDetail.stokAktif, itemDetail.minStok)}

                {/* 2. SPESIFIKASI DATA MATERIAL & VOLUMETRIK GUDANG */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                    
                    {/* LEFT COLUMN: IDENTITAS UTAMA BARANG */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
                            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                                <div className="flex items-center gap-2">
                                    <Tag size={18} className="text-blue-600" />
                                    <h3 className="text-base font-bold text-gray-800">Spesifikasi Katalog SKU</h3>
                                </div>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                    itemDetail.status === 'Aktif' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'
                                }`}>
                                    Status {itemDetail.status}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6 text-xs">
                                <div>
                                    <span className="block font-semibold text-gray-400 mb-0.5 uppercase tracking-wide">Nomor SKU</span>
                                    <p className="font-mono font-bold text-gray-900 text-sm tracking-wide">{itemDetail.sku}</p>
                                </div>
                                <div className="sm:col-span-2">
                                    <span className="block font-semibold text-gray-400 mb-0.5 uppercase tracking-wide">Nama Lengkap Item</span>
                                    <p className="font-bold text-gray-900 text-sm leading-relaxed">{itemDetail.namaItem}</p>
                                </div>
                                <div>
                                    <span className="block font-semibold text-gray-400 mb-0.5 uppercase tracking-wide">Kelompok Kategori</span>
                                    <p className="font-medium text-gray-800">{itemDetail.kategori}</p>
                                </div>
                                <div>
                                    <span className="block font-semibold text-gray-400 mb-0.5 uppercase tracking-wide">Merek / Manufaktur</span>
                                    <p className="font-medium text-gray-800">{itemDetail.merek || '-'}</p>
                                </div>
                                <div>
                                    <span className="block font-semibold text-gray-400 mb-0.5 uppercase tracking-wide">Tipe Pengelolaan</span>
                                    <p className="font-semibold text-blue-600">{itemDetail.tipeInventaris}</p>
                                </div>
                            </div>

                            <div className="border-t border-gray-100 pt-3 text-xs">
                                <span className="block font-semibold text-gray-400 uppercase tracking-wide mb-1">Catatan Teknis & Penanganan Spesifik</span>
                                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 text-gray-700 leading-relaxed font-medium">
                                    {itemDetail.catatanTeknis || '-'}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: PARAMETER KONTROL STOK */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
                            <div className="flex items-center gap-2 border-b border-gray-100 pb-2.5">
                                <Warehouse size={16} className="text-gray-500" />
                                <h3 className="text-sm font-bold text-gray-800">Parameter Kuantitas Logistik</h3>
                            </div>

                            {/* Besar Total Stok Aktif Saat Ini */}
                            <div className="bg-slate-900 text-white rounded-xl p-4 flex items-center justify-between shadow-md">
                                <div className="flex items-center gap-2.5">
                                    <Boxes size={20} className="text-blue-400" />
                                    <div>
                                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Stok On-Hand</span>
                                        <span className="text-xl font-black">{itemDetail.stokAktif}</span> <span className="text-xs font-semibold text-slate-400">{itemDetail.satuanBesar}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2 text-xs border-t border-gray-100 pt-3">
                                <div className="flex items-center justify-between py-1 border-b border-dashed border-gray-100">
                                    <span className="text-gray-400 flex items-center gap-1"><ShieldCheck size={13} /> Safety Stock (Min)</span>
                                    <span className="font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">{itemDetail.minStok} {itemDetail.satuanBesar}</span>
                                </div>
                                <div className="flex items-center justify-between py-1 border-b border-dashed border-gray-100">
                                    <span className="text-gray-400">Kapasitas Rak (Max)</span>
                                    <span className="font-semibold text-gray-800">{itemDetail.maxStok} {itemDetail.satuanBesar}</span>
                                </div>
                                <div className="flex items-center justify-between py-1 border-b border-dashed border-gray-100">
                                    <span className="text-gray-400">Titik Posisi Rak</span>
                                    <span className="font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{itemDetail.lokasiRak}</span>
                                </div>
                                <div className="flex items-center justify-between py-1">
                                    <span className="text-gray-400">Metode Penilaian</span>
                                    <span className="font-bold text-gray-700">{itemDetail.metodeValuasi}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. TABEL KARTU STOK UTAMA (STOCK CARD LEDGER) */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
                    <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                        <History size={18} className="text-blue-600" />
                        <div>
                            <h3 className="text-base font-bold text-gray-800">Kartu Stok Barang (Stock Card Ledger)</h3>
                            <p className="text-[11px] text-gray-400 mt-0.5 font-medium">Log historis mutasi masuk dan keluar persediaan material</p>
                        </div>
                    </div>

                    <div className="overflow-x-auto border border-gray-200 rounded-xl">
                        <table className="min-w-full text-sm">
                            <thead className="bg-gray-50 text-gray-700 font-semibold border-b border-gray-200">
                                <tr>
                                    <th className="px-5 py-3 text-left w-36">Tanggal Mutasi</th>
                                    <th className="px-5 py-3 text-left w-44">No. Referensi Dokumen</th>
                                    <th className="px-5 py-3 text-center w-28">Tipe Mutasi</th>
                                    <th className="px-5 py-3 text-left">Deskripsi Keterangan Transaksi</th>
                                    <th className="px-5 py-3 text-center w-28">Kuantitas</th>
                                    <th className="px-5 py-3 text-center w-32 bg-gray-50">Sisa Stok Akhir</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white text-xs text-gray-700">
                                {itemDetail.stockCard.map((ledger) => (
                                    <tr key={ledger.id} className="hover:bg-gray-50/20 transition-colors">
                                        <td className="px-5 py-3.5 font-medium text-gray-500 inline-flex items-center gap-1.5">
                                            <Calendar size={12} /> {ledger.tanggal}
                                        </td>
                                        <td className="px-5 py-3.5 font-bold text-blue-600 hover:underline cursor-pointer tracking-wide">
                                            {ledger.noReferensi}
                                        </td>
                                        <td className="px-5 py-3.5 text-center">
                                            {ledger.tipe === 'Masuk' ? (
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-100">
                                                    <ArrowDownLeft size={10} /> IN
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-bold text-[10px] border border-indigo-100">
                                                    <ArrowUpRight size={10} /> OUT
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-5 py-3.5 text-gray-600 font-medium">{ledger.keterangan}</td>
                                        <td className={`px-5 py-3.5 text-center font-black text-sm ${ledger.tipe === 'Masuk' ? 'text-emerald-600' : 'text-indigo-600'}`}>
                                            {ledger.tipe === 'Masuk' ? '+' : '-'}{ledger.qty}
                                        </td>
                                        <td className="px-5 py-3.5 text-center font-black text-gray-900 bg-slate-50/50 text-sm">
                                            {ledger.sisaStok} <span className="text-[10px] text-gray-400 font-normal">{itemDetail.satuanBesar}</span>
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