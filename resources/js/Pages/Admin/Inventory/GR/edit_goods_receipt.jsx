import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';

import {
    ArrowLeft,
    Save,
    FileText,
    Package,
    AlertTriangle,
    CheckCircle2,
    Clock,
    Plus,
    Calendar,
    HelpCircle
} from 'lucide-react';

export default function EditPartialGoodsReceipt() {
    const navigate = useNavigate();
    const { id } = useParams();

    // ==========================================
    // STATE MASTER HEADER DOKUMEN PARSIAL
    // ==========================================
    const [headerData, setHeaderData] = useState({
        noReceiptParent: 'GR-2026-0087',      // No. GR Awal
        noReceiptChild: 'GR-2026-0087.B',    // No. GR Penerimaan Susulan
        tanggalTerimaSusulan: '2026-05-28',
        noPoRef: 'PO-2026-0350',
        noSuratJalanBaru: '',                 // Harus diisi sesuai manifes baru
        namaSupplier: 'Global Logistics Supply',
        gudangTujuan: 'Gudang Transit (GDG-03)',
        petugasPenerima: 'Andika Pratama (Warehouse Checker)',
        catatan: ''
    });

    // ==========================================
    // STATE DETAIL ITEMS (BACKORDER CALCULATION)
    // ==========================================
    const [receiptItems, setReceiptItems] = useState([
        {
            id: 1,
            kodeSku: 'SKU-ME-0411',
            namaBarang: 'Kabel Supreme NYM 3x2.5mm (Roll @100m)',
            satuan: 'Roll',
            qtyPo: 12,
            qtyDiterimaSebelumnya: 5, // Datang di GR pertama
            qtyDiterimaSekarang: 7,   // Default diisi sisa outstanding
            qtyRejectSekarang: 0,
            noBatchSerial: 'SUP-B4-2026',
            isClosed: false
        },
        {
            id: 2,
            kodeSku: 'SKU-ME-0882',
            namaBarang: 'Pipa Conduit PVC Clipsal 20mm',
            satuan: 'Batang',
            qtyPo: 150,
            qtyDiterimaSebelumnya: 150, // SUDAH LUNAS / SELESAI
            qtyDiterimaSekarang: 0,
            qtyRejectSekarang: 0,
            noBatchSerial: '-',
            isClosed: true // Input di-lock otomatis oleh sistem
        }
    ]);

    // Handler Perubahan Data Grid Item (Form Array)
    const handleItemGridChange = (id, field, value) => {
        setReceiptItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, [field]: value } : item
            )
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!headerData.noSuratJalanBaru) {
            return alert('Nomor Surat Jalan baru untuk armada susulan wajib diisi!');
        }

        // Validasi Over-Receive Over-Limit Overdraft
        let valid = true;
        receiptItems.forEach(item => {
            if (!item.isClosed) {
                const sisaOutstanding = item.qtyPo - item.qtyDiterimaSebelumnya;
                const totalMasukBaru = Number(item.qtyDiterimaSekarang || 0) + Number(item.qtyRejectSekarang || 0);
                
                if (totalMasukBaru > sisaOutstanding) {
                    alert(`Item ${item.kodeSku} over-quantity! Sisa kuantitas yang ditunggu hanya ${sisaOutstanding} ${item.satuan}.`);
                    valid = false;
                }
            }
        });

        if (!valid) return;

        console.log('Menyimpan Penerimaan Backorder Parsial:', { headerData, receiptItems });
        alert('Data penerimaan parsial berhasil diperbarui! Stok susulan telah dimasukkan ke dalam ledger.');
        navigate('/portal/inventory/goods-receipt');
    };

    return (
        <PortalLayout>
            <div className="space-y-6">

                {/* 1. HEADER HALAMAN & NAVIGASI */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-bold uppercase tracking-wide bg-amber-100 text-amber-800 border border-amber-200 px-2 py-0.5 rounded">
                                Backorder Processing
                            </span>
                            <span className="text-xs font-mono text-gray-400">Ref Parent: {headerData.noReceiptParent}</span>
                        </div>
                        <h1 className="text-2xl font-semibold text-gray-900 mt-1 flex items-center gap-2">
                            Input Penerimaan Susulan <span className="text-sm font-mono bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md border border-blue-200">{headerData.noReceiptChild}</span>
                        </h1>
                    </div>

                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 h-10 px-4 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium bg-white hover:bg-gray-50 transition self-start sm:self-auto"
                    >
                        <ArrowLeft size={16} /> Kembali
                    </button>
                </div>

                {/* BANNER NOTIFIKASI INFORMASI DATA PARSIAL */}
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex items-start gap-3 text-amber-900 shadow-sm text-xs">
                    <Clock size={16} className="text-amber-600 mt-0.5 flex-shrink-0" />
                    <div>
                        <span className="font-bold text-amber-950 block mb-0.5">Mode Pembaruan Status Parsial (Dokumen Turunan):</span>
                        <p className="leading-relaxed font-medium text-amber-700">
                            Halaman ini digunakan untuk mencatat kedatangan barang kloter berikutnya. Item yang sudah berstatus <strong>Lunas (Sesuai PO)</strong> pada penerimaan sebelumnya telah dikunci otomatis oleh sistem keamanan persediaan untuk mencegah penggandaan aset stok.
                        </p>
                    </div>
                </div>

                {/* 2. FORM INTEGRASI PENERIMAAN (FULL WIDTH col-lg-12) */}
                <form onSubmit={handleSubmit} className="space-y-6 w-full">

                    {/* SEKSI A: INFORMASI MANIFES UTAMA */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
                        <h3 className="text-sm font-bold text-gray-800 border-b border-gray-100 pb-2.5 flex items-center gap-2">
                            <FileText size={16} className="text-blue-600" /> Manifes Kedatangan Kloter Susulan
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wide text-gray-400 mb-1.5">No. Referensi PO Utama</label>
                                <input type="text" readOnly value={headerData.noPoRef} className="w-full h-10 rounded-lg bg-gray-50 border border-gray-200 px-3 text-sm font-mono font-bold text-gray-500 cursor-not-allowed" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wide text-gray-600 mb-1.5">Tanggal Terima Kloter Ini <span className="text-red-500">*</span></label>
                                <input type="date" required value={headerData.tanggalTerimaSusulan} onChange={(e) => setHeaderData({...headerData, tanggalTerimaSusulan: e.target.value})} className="w-full h-10 rounded-lg border border-gray-300 px-3 text-sm font-medium outline-none focus:border-blue-500 transition" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wide text-gray-600 mb-1.5">No. Surat Jalan Baru <span className="text-red-500">*</span></label>
                                <input type="text" required value={headerData.noSuratJalanBaru} onChange={(e) => setHeaderData({...headerData, noSuratJalanBaru: e.target.value})} placeholder="Ketik No. Surat Jalan Baru..." className="w-full h-10 rounded-lg border border-gray-300 px-3 text-sm font-mono font-bold uppercase outline-none focus:border-blue-500 transition" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wide text-gray-400 mb-1.5">Lokasi Gudang Simpan</label>
                                <input type="text" readOnly value={headerData.gudangTujuan} className="w-full h-10 rounded-lg bg-gray-50 border border-gray-200 px-3 text-sm font-bold text-gray-600 cursor-not-allowed" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wide text-gray-400 mb-1.5">Nama Vendor / Supplier</label>
                                <input type="text" readOnly value={headerData.namaSupplier} className="w-full h-10 rounded-lg bg-gray-50 border border-gray-200 px-3 text-sm font-bold text-gray-600 cursor-not-allowed" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wide text-gray-400 mb-1.5">Petugas Gudang Pemeriksa (Checker)</label>
                                <input type="text" readOnly value={headerData.petugasPenerima} className="w-full h-10 rounded-lg bg-gray-50 border border-gray-200 px-3 text-sm font-bold text-gray-600 cursor-not-allowed" />
                            </div>
                        </div>
                    </div>

                    {/* SEKSI B: GRID RE-INPUT ITEM TERSEDIA */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
                        <h3 className="text-sm font-bold text-gray-800 border-b border-gray-100 pb-2.5 flex items-center gap-2">
                            <Package size={16} className="text-blue-600" /> Kalkulasi Kuantitas Sisa (Outstanding)
                        </h3>

                        <div className="overflow-x-auto border border-gray-200 rounded-xl">
                            <table className="min-w-full text-sm">
                                <thead className="bg-gray-50 text-gray-700 font-bold border-b border-gray-200 text-xs uppercase tracking-wider">
                                    <tr>
                                        <th className="px-4 py-3 text-left w-56">SKU / Uraian Barang</th>
                                        <th className="px-3 py-3 text-center w-20">Unit</th>
                                        <th className="px-3 py-3 text-center w-24">QTY PO</th>
                                        <th className="px-3 py-3 text-center w-28 text-blue-700 bg-blue-50/40">Diterima Lalu</th>
                                        <th className="px-3 py-3 text-center w-28 text-amber-700 bg-amber-50/40">Sisa Hutang</th>
                                        <th className="px-3 py-3 text-center w-28">QTY Masuk Baru <span className="text-red-500">*</span></th>
                                        <th className="px-3 py-3 text-center w-24">QTY Reject</th>
                                        <th className="px-4 py-3 text-left w-44">Batch / S/N</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white text-xs text-gray-700">
                                    {receiptItems.map((item) => {
                                        const sisaOutstanding = item.qtyPo - item.qtyDiterimaSebelumnya;
                                        
                                        return (
                                            <tr key={item.id} className={`${item.isClosed ? 'bg-gray-50/60 text-gray-400' : 'hover:bg-gray-50/20'} transition-colors`}>
                                                {/* Identitas Barang */}
                                                <td className="px-4 py-3.5">
                                                    <p className={`font-mono font-bold mb-0.5 ${item.isClosed ? 'text-gray-400 line-through' : 'text-blue-600'}`}>{item.kodeSku}</p>
                                                    <p className={`font-bold ${item.isClosed ? 'text-gray-400' : 'text-gray-900'}`}>{item.namaBarang}</p>
                                                </td>

                                                {/* Satuan */}
                                                <td className="px-3 py-3.5 text-center">
                                                    <span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded border font-mono text-[10px] font-bold">
                                                        {item.satuan}
                                                    </span>
                                                </td>

                                                {/* Total PO Awal */}
                                                <td className="px-3 py-3.5 text-center font-mono font-medium">
                                                    {item.qtyPo}
                                                </td>

                                                {/* Sudah Diterima pada Kloter Sebelumnya */}
                                                <td className="px-3 py-3.5 text-center font-mono font-bold text-blue-700 bg-blue-50/20">
                                                    {item.qtyDiterimaSebelumnya}
                                                </td>

                                                {/* Sisa Outstanding Vendor (Kalkulasi Sistem) */}
                                                <td className="px-3 py-3.5 text-center font-mono font-black text-amber-700 bg-amber-50/20">
                                                    {sisaOutstanding}
                                                </td>

                                                {/* Input Kuantitas Baru yang Datang Hari Ini */}
                                                <td className="px-3 py-3.5">
                                                    <input
                                                        type="number"
                                                        required
                                                        disabled={item.isClosed}
                                                        min="0"
                                                        max={sisaOutstanding}
                                                        value={item.qtyDiterimaSekarang}
                                                        onChange={(e) => handleItemGridChange(item.id, 'qtyDiterimaSekarang', e.target.value)}
                                                        className={`w-full h-9 border rounded-lg text-center font-mono font-bold outline-none transition ${
                                                            item.isClosed 
                                                                ? 'bg-gray-100 border-gray-200 text-gray-300 cursor-not-allowed' 
                                                                : 'border-gray-300 text-gray-900 focus:border-blue-500 bg-white'
                                                        }`}
                                                    />
                                                </td>

                                                {/* Input Kuantitas Reject Kloter Baru */}
                                                <td className="px-3 py-3.5">
                                                    <input
                                                        type="number"
                                                        disabled={item.isClosed}
                                                        min="0"
                                                        value={item.qtyRejectSekarang}
                                                        onChange={(e) => handleItemGridChange(item.id, 'qtyRejectSekarang', e.target.value)}
                                                        className={`w-full h-9 border rounded-lg text-center font-mono font-bold outline-none transition ${
                                                            item.isClosed 
                                                                ? 'bg-gray-100 border-gray-200 text-gray-300 cursor-not-allowed' 
                                                                : 'border-gray-300 text-red-600 focus:border-red-500 bg-white'
                                                        }`}
                                                    />
                                                </td>

                                                {/* Input Serial / Batch Number Manifes Baru */}
                                                <td className="px-4 py-3.5">
                                                    {item.isClosed ? (
                                                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                                            <CheckCircle2 size={12} /> Selesai Diterima
                                                        </span>
                                                    ) : (
                                                        <input
                                                            type="text"
                                                            value={item.noBatchSerial}
                                                            onChange={(e) => handleItemGridChange(item.id, 'noBatchSerial', e.target.value)}
                                                            placeholder="S/N Kloter Baru..."
                                                            className="w-full h-9 border border-gray-300 rounded-lg px-2 text-xs font-mono uppercase outline-none focus:border-blue-500 transition"
                                                        />
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* Catatan Berita Acara Penerimaan Kloter Susulan */}
                        <div className="pt-2">
                            <label className="block text-xs font-bold uppercase tracking-wide text-gray-600 mb-1.5">Catatan Berita Acara Susulan / Kronologi Pengiriman Vendor</label>
                            <textarea
                                rows="2"
                                value={headerData.catatan}
                                onChange={(e) => setHeaderData({...headerData, catatan: e.target.value})}
                                placeholder="Contoh: Pengiriman sisa 7 roll kabel supreme dari kekurangan Surat Jalan lama..."
                                className="w-full rounded-lg border border-gray-300 p-3 text-xs outline-none focus:border-blue-500 transition resize-none font-medium text-gray-700"
                            ></textarea>
                        </div>
                    </div>

                    {/* BUTTON AKSI SUBMIT */}
                    <div className="flex items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="h-11 px-6 rounded-lg border border-gray-300 text-sm font-semibold bg-white text-gray-600 hover:bg-gray-50 transition"
                        >
                            Batal
                        </button>
                        
                        <button
                            type="submit"
                            className="h-11 px-7 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold inline-flex items-center gap-2 transition shadow-md shadow-blue-100"
                        >
                            <Save size={16} /> Update Penerimaan Susulan
                        </button>
                    </div>

                </form>
            </div>
        </PortalLayout>
    );
}