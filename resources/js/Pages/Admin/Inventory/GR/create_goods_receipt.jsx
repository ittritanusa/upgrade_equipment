import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';

import {
    ArrowLeft,
    Save,
    ClipboardCheck,
    FileText,
    Truck,
    AlertTriangle,
    Package,
    Calendar,
    UserCheck,
    Plus,
    Trash2
} from 'lucide-react';

export default function CreateGoodsReceipt() {
    const navigate = useNavigate();

    // ==========================================
    // STATE MASTER HEADER DOKUMEN GOODS RECEIPT
    // ==========================================
    const [headerData, setHeaderData] = useState({
        noReceipt: 'GR-2026-0089', // Generated otomatis oleh sistem
        tanggalTerima: '2026-05-28',
        noPoRef: 'PO-2026-0412',
        noSuratJalan: '',
        namaSupplier: 'PT. Teknologi Maju Utama',
        gudangTujuan: 'Gudang Utama (GDG-01)',
        petugasPenerima: 'Hendra Wijaya (Logistik Officer)',
        catatan: ''
    });

    // ==========================================
    // STATE DETAIL ITEMS GRID (URAIAN BARANG)
    // ==========================================
    const [receiptItems, setReceiptItems] = useState([
        {
            id: 1,
            kodeSku: 'SKU-IT-0091',
            namaBarang: 'Access Point Aruba AP-505 Dual-Radio',
            satuan: 'Pcs',
            qtyPo: 10,
            qtyDiterima: 10,
            qtyReject: 0,
            noBatchSerial: 'SN-ARUB-99210-X',
            tglExpired: '',
            kondisi: 'Bagus'
        },
        {
            id: 2,
            kodeSku: 'SKU-IT-0145',
            namaBarang: 'Kabel UTP Cat6 Belden (Roll @305 Meter)',
            satuan: 'Roll',
            qtyPo: 5,
            qtyDiterima: 4,
            qtyReject: 1,
            noBatchSerial: 'BATCH-BLD-0526',
            tglExpired: '',
            kondisi: '1 Roll Dus Basah & Robek'
        }
    ]);

    // Handler Perubahan Data Header
    const handleHeaderChange = (e) => {
        const { name, value } = e.target;
        setHeaderData(prev => ({ ...prev, [name]: value }));
    };

    // Handler Perubahan Data Grid Item (Form Array)
    const handleItemGridChange = (id, field, value) => {
        setReceiptItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, [field]: value } : item
            )
        );
    };

    // Menghitung akumulasi total kuantitas barang masuk untuk ringkasan widget
    const totalDiterima = receiptItems.reduce((sum, item) => sum + Number(item.qtyDiterima || 0), 0);
    const totalReject = receiptItems.reduce((sum, item) => sum + Number(item.qtyReject || 0), 0);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validasi Sederhana
        if (!headerData.noSuratJalan) {
            return alert('Nomor Surat Jalan dari vendor/ekspedisi wajib diisi!');
        }

        const adanegatif = receiptItems.some(item => item.qtyDiterima < 0 || item.qtyReject < 0);
        if (adanegatif) {
            return alert('Kuantitas item masuk tidak boleh bernilai negatif!');
        }

        console.log('Menyimpan Dokumen Goods Receipt:', { headerData, receiptItems });
        alert('Dokumen Goods Receipt berhasil diterbitkan! Stok inventaris gudang telah ter-update.');
        navigate('/portal/inventory/goods-receipt'); // Redirect kembali ke list transaksi
    };

    return (
        <PortalLayout>
            <div className="space-y-6">
                
                {/* 1. HEADER HALAMAN & NAVIGASI */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                            Penerimaan Barang Masuk <span className="text-sm font-mono bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md border border-blue-200">{headerData.noReceipt}</span>
                        </h1>
                        <div className="flex items-center gap-2 mt-1 text-sm">
                            <span className="text-gray-400">Inventory & Management</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-gray-400">Log Transaksi</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-blue-600 font-medium">Goods Receipt Baru</span>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 h-10 px-4 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium bg-white hover:bg-gray-50 transition self-start sm:self-auto"
                    >
                        <ArrowLeft size={16} /> Kembali
                    </button>
                </div>

                {/* 2. FORM PENERIMAAN BARANG UTAMA (FULL LEBAR col-lg-12) */}
                <form onSubmit={handleSubmit} className="space-y-6 w-full">
                    
                    {/* SEKSI A: INFORMASI REFERENSI DOKUMEN & LOGISTIK */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
                        <h3 className="text-sm font-bold text-gray-800 border-b border-gray-100 pb-2.5 flex items-center gap-2">
                            <FileText size={16} className="text-blue-600" /> Referensi Dokumen & Legalitas
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wide text-gray-400 mb-1.5">No. Goods Receipt</label>
                                <input type="text" readOnly value={headerData.noReceipt} className="w-full h-10 rounded-lg bg-gray-50 border border-gray-200 px-3 text-sm font-mono font-bold text-gray-500 cursor-not-allowed" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wide text-gray-600 mb-1.5">Tanggal Terima <span className="text-red-500">*</span></label>
                                <input type="date" name="tanggalTerima" required value={headerData.tanggalTerima} onChange={handleHeaderChange} className="w-full h-10 rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-blue-500 transition font-medium text-gray-800" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wide text-gray-400 mb-1.5">No. Referensi PO</label>
                                <input type="text" readOnly value={headerData.noPoRef} className="w-full h-10 rounded-lg bg-gray-50 border border-gray-200 px-3 text-sm font-mono font-bold text-gray-500 cursor-not-allowed" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wide text-gray-600 mb-1.5">No. Surat Jalan Vendor <span className="text-red-500">*</span></label>
                                <input type="text" name="noSuratJalan" required value={headerData.noSuratJalan} onChange={handleHeaderChange} placeholder="Contoh: SJ-TMU-991A" className="w-full h-10 rounded-lg border border-gray-300 px-3 text-sm font-mono font-bold placeholder:font-sans placeholder:font-normal uppercase outline-none focus:border-blue-500 transition" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wide text-gray-400 mb-1.5">Supplier / Vendor Pengirim</label>
                                <input type="text" readOnly value={headerData.namaSupplier} className="w-full h-10 rounded-lg bg-gray-50 border border-gray-200 px-3 text-sm font-bold text-gray-700 cursor-not-allowed" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wide text-gray-400 mb-1.5">Gudang Alokasi Stok</label>
                                <input type="text" readOnly value={headerData.gudangTujuan} className="w-full h-10 rounded-lg bg-gray-50 border border-gray-200 px-3 text-sm font-bold text-gray-700 cursor-not-allowed" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wide text-gray-400 mb-1.5">Petugas Pemeriksa (Checker)</label>
                                <input type="text" readOnly value={headerData.petugasPenerima} className="w-full h-10 rounded-lg bg-gray-50 border border-gray-200 px-3 text-sm font-bold text-gray-700 cursor-not-allowed" />
                            </div>
                        </div>
                    </div>

                    {/* SEKSI B: DETAIL BARANG YANG DITERIMA (TABLE GRID ARRAY FORM) */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-gray-100 pb-2.5">
                            <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                                <Package size={16} className="text-blue-600" /> Item Komparasi Kuantitas Terkirim
                            </h3>
                            <div className="flex gap-4 text-xs font-bold text-gray-500">
                                <div>Total Terima: <span className="text-emerald-600 font-mono text-sm">{totalDiterima}</span></div>
                                <div className="border-l pl-4">Total Reject: <span className="text-red-600 font-mono text-sm">{totalReject}</span></div>
                            </div>
                        </div>

                        {/* Tabel Form Array Item List */}
                        <div className="overflow-x-auto border border-gray-200 rounded-xl">
                            <table className="min-w-full text-sm">
                                <thead className="bg-gray-50 text-gray-700 font-bold border-b border-gray-200 text-xs uppercase tracking-wider">
                                    <tr>
                                        <th className="px-4 py-3 text-left w-48">SKU / Nama Barang</th>
                                        <th className="px-3 py-3 text-center w-20">Unit</th>
                                        <th className="px-3 py-3 text-center w-24">QTY PO</th>
                                        <th className="px-3 py-3 text-center w-28">QTY Bagus <span className="text-red-500">*</span></th>
                                        <th className="px-3 py-3 text-center w-28">QTY Reject</th>
                                        <th className="px-4 py-3 text-left w-48">No. Batch / Serial</th>
                                        <th className="px-4 py-3 text-left w-36">Expired Date</th>
                                        <th className="px-4 py-3 text-left">Catatan Kondisi Fisik</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white text-xs text-gray-700">
                                    {receiptItems.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50/20 transition-colors">
                                            {/* Data Identitas SKU */}
                                            <td className="px-4 py-3.5">
                                                <p className="font-mono font-bold text-blue-600 mb-0.5">{item.kodeSku}</p>
                                                <p className="font-bold text-gray-900 leading-normal">{item.namaBarang}</p>
                                            </td>
                                            
                                            {/* Satuan */}
                                            <td className="px-3 py-3.5 text-center">
                                                <span className="bg-gray-100 text-gray-700 font-mono px-1.5 py-0.5 rounded border border-gray-200 text-[11px] font-bold">
                                                    {item.satuan}
                                                </span>
                                            </td>

                                            {/* Qty Original PO */}
                                            <td className="px-3 py-3.5 text-center font-mono font-bold text-gray-500 bg-gray-50/50">
                                                {item.qtyPo}
                                            </td>

                                            {/* Input Kuantitas Diterima Bagus */}
                                            <td className="px-3 py-3.5">
                                                <input
                                                    type="number"
                                                    required
                                                    min="0"
                                                    value={item.qtyDiterima}
                                                    onChange={(e) => handleItemGridChange(item.id, 'qtyDiterima', e.target.value)}
                                                    className="w-full h-9 border border-gray-300 rounded-lg text-center font-mono font-bold text-emerald-700 focus:border-emerald-500 outline-none transition bg-emerald-50/20"
                                                />
                                            </td>

                                            {/* Input Kuantitas Rusak/Reject */}
                                            <td className="px-3 py-3.5">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={item.qtyReject}
                                                    onChange={(e) => handleItemGridChange(item.id, 'qtyReject', e.target.value)}
                                                    className="w-full h-9 border border-gray-300 rounded-lg text-center font-mono font-bold text-red-600 focus:border-red-500 outline-none transition bg-red-50/20"
                                                />
                                            </td>

                                            {/* Input Batch / Serial Number */}
                                            <td className="px-4 py-3.5">
                                                <input
                                                    type="text"
                                                    value={item.noBatchSerial}
                                                    onChange={(e) => handleItemGridChange(item.id, 'noBatchSerial', e.target.value)}
                                                    placeholder="Ketik S/N perangkat..."
                                                    className="w-full h-9 border border-gray-300 rounded-lg px-2.5 text-xs font-mono uppercase outline-none focus:border-blue-500 transition"
                                                />
                                            </td>

                                            {/* Input Expired Date */}
                                            <td className="px-4 py-3.5">
                                                <input
                                                    type="date"
                                                    value={item.tglExpired}
                                                    onChange={(e) => handleItemGridChange(item.id, 'tglExpired', e.target.value)}
                                                    className="w-full h-9 border border-gray-300 rounded-lg px-2 text-xs outline-none focus:border-blue-500 transition"
                                                />
                                            </td>

                                            {/* Input Catatan Kondisi Fisik Item */}
                                            <td className="px-4 py-3.5">
                                                <input
                                                    type="text"
                                                    value={item.kondisi}
                                                    onChange={(e) => handleItemGridChange(item.id, 'kondisi', e.target.value)}
                                                    placeholder="Contoh: Segel utuh, box mulus..."
                                                    className="w-full h-9 border border-gray-300 rounded-lg px-2.5 text-xs font-medium text-gray-700 outline-none focus:border-blue-500 transition"
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        
                        {/* Keterangan Tambahan Lembar Penerimaan */}
                        <div className="pt-2">
                            <label className="block text-xs font-bold uppercase tracking-wide text-gray-600 mb-1.5">Catatan Berita Acara / Keterangan Tambahan Penerimaan</label>
                            <textarea
                                name="catatan"
                                rows="2"
                                value={headerData.catatan}
                                onChange={handleHeaderChange}
                                placeholder="Tulis informasi tambahan di sini jika terdapat ketidaksesuaian manifes armada pengiriman atau detail segel kontainer luar vendor..."
                                className="w-full rounded-lg border border-gray-300 p-3 text-xs outline-none focus:border-blue-500 transition resize-none font-medium text-gray-700"
                            ></textarea>
                        </div>
                    </div>

                    {/* SEKSI C: VALIDASI & OTORISASI VALIDASI (SIGNATURE LABELS) */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
                        <h3 className="text-sm font-bold text-gray-800 border-b border-gray-100 pb-2.5 flex items-center gap-2">
                            <UserCheck size={16} className="text-blue-600" /> Lembar Verifikasi Tanda Tangan
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center pt-2">
                            <div className="border border-dashed border-gray-200 rounded-xl p-4 bg-gray-50/50">
                                <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-8">Diserahkan Oleh (Driver/Ekspedisi)</p>
                                <div className="h-0.5 bg-gray-200 w-32 mx-auto mb-2"></div>
                                <p className="text-xs font-bold text-gray-700">Nama Kurir / Supir</p>
                            </div>
                            <div className="border border-dashed border-gray-200 rounded-xl p-4 bg-gray-50/50">
                                <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-8">Diperiksa & Diterima (Warehouse Checker)</p>
                                <div className="h-0.5 bg-gray-400 w-44 mx-auto mb-2"></div>
                                <p className="text-xs font-bold text-gray-900">{headerData.petugasPenerima}</p>
                            </div>
                            <div className="border border-dashed border-gray-200 rounded-xl p-4 bg-gray-50/50 flex flex-col justify-between">
                                <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-4">Validasi Sistem Otomatis</p>
                                <div className="inline-flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg p-2 font-semibold justify-center mx-auto">
                                    <ClipboardCheck size={14} /> Ready to Commit Stock
                                </div>
                                <p className="text-[9px] text-gray-400 mt-2">Inventory Ledger Auto-Posting</p>
                            </div>
                        </div>
                    </div>

                    {/* TOMBOL AKSI LEMBAR KERJA GOODS RECEIPT */}
                    <div className="flex items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="h-11 px-6 rounded-lg border border-gray-300 text-sm font-semibold bg-white text-gray-600 hover:bg-gray-50 transition"
                        >
                            Batalkan
                        </button>
                        
                        <button
                            type="submit"
                            className="h-11 px-7 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold inline-flex items-center gap-2 transition shadow-md shadow-blue-100"
                        >
                            <Save size={16} /> Verifikasi & Posting Goods Receipt
                        </button>
                    </div>

                </form>
            </div>
        </PortalLayout>
    );
}