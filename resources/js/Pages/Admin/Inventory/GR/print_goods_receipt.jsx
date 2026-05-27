import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { ArrowLeft, Printer } from 'lucide-react';

export default function PrintGoodsReceipt() {
    const navigate = useNavigate();
    const componentRef = useRef();

    // ==========================================
    // DATA SOURCE
    // ==========================================
    const grData = {
        noReceipt: 'GR-2026-0087',
        tanggalTerima: '22 Mei 2026, 14:15 WIB',
        noPoRef: 'PO-2026-0350',
        noSuratJalan: 'DO-LOG-7721',
        namaSupplier: 'Global Logistics Supply Ltd.', // <--- PT Vendor ditaruh di sini
        alamatSupplier: 'Kawasan Industri Jababeka Phase II, Blok C-14, Cikarang, Bekasi',
        gudangTujuan: 'Gudang Transit (GDG-03) - Sector B',
        petugasPenerima: 'Suryadi Pratama',
        status: 'Parsial',
        catatan: 'Penerimaan tahap ke-1. Terdapat kekurangan 1 unit kabel feeder karena keterbatasan kapasitas armada vendor. Pengiriman susulan dijadwalkan tanggal 30 Mei 2026.',
        items: [
            { id: 1, sku: 'SKU-NET-0021', nama: 'Cisco Switch Catalyst C9200L-24T-4X-E', unit: 'Unit', qtyPo: 5, qtyOk: 5, qtyReject: 0, remark: 'Sesuai spesifikasi, serial number terverifikasi.' },
            { id: 2, sku: 'SKU-NET-0114', nama: 'Kabel Andrew Feeder 7/8 Foam Coaxial', unit: 'Roll', qtyPo: 3, qtyOk: 2, qtyReject: 0, remark: 'Kurang 1 roll, armada vendor tidak muat.' },
            { id: 3, sku: 'SKU-NET-0099', nama: 'Connector Andrew 7/8 DIN Male', unit: 'Pcs', qtyPo: 12, qtyOk: 12, qtyReject: 0, remark: 'Kondisi segel baik.' }
        ]
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <PortalLayout>
            {/* CONTAINER UTAMA */}
            <div className="max-w-4xl mx-auto space-y-6">
                
                {/* ==========================================
                    1. ACTION BAR (OTOMATIS HILANG SAAT DICETAK)
                   ========================================== */}
                <div className="no-print flex items-center justify-between bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition"
                        >
                            <ArrowLeft size={18} />
                        </button>
                        <div>
                            <h2 className="text-sm font-bold text-gray-800">Pratinjau Cetak Dokumen</h2>
                            <p className="text-xs text-gray-400">Tekan cetak untuk mengekspor ke PDF atau Printer Fisik.</p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={handlePrint}
                        className="inline-flex items-center gap-2 h-10 px-5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition shadow-md shadow-blue-100"
                    >
                        <Printer size={14} /> Cetak Sekarang
                    </button>
                </div>

                {/* ==========================================
                    2. KERTAS PRINT (A4 AREA FORMAT)
                   ========================================== */}
                <div 
                    ref={componentRef} 
                    className="bg-white border border-gray-300 rounded-xl p-8 md:p-12 shadow-sm font-sans text-gray-900 printable-sheet"
                >
                    {/* BARIS KOP SURAT PERUSAHAAN (KITA) */}
                    <div className="flex justify-between items-start border-b-2 border-gray-900 pb-6">
                        <div>
                            {/* Diubah Menjadi PT Anugrah Guna Semesta */}
                            <h1 className="text-xl font-black uppercase tracking-tight text-gray-900">PT. ANUGRAH GUNA SEMESTA</h1>
                            <p className="text-xs text-gray-500 max-w-sm mt-1 leading-relaxed">
                                Bintaro Tride Center, Ruko Lantai Dasar Blok C2-18 Jalan Jendral Sudirman, SOUTH TANGERANG.
                                <br />Telp: (021) 555-9988 | Email: info@anugrahgunasemesta.com
                            </p>
                        </div>
                        <div className="text-right">
                            <h2 className="text-lg font-mono font-bold tracking-widest text-gray-400 uppercase">GOODS RECEIPT</h2>
                            <p className="text-xs font-mono font-black text-gray-900 mt-1 bg-gray-100 px-2 py-1 rounded inline-block">
                                {grData.noReceipt}
                            </p>
                        </div>
                    </div>

                    {/* BLOCK INFORMASI METADATA */}
                    <div className="grid grid-cols-2 gap-8 my-6 text-xs">
                        {/* Kolom Kiri: Vendor Pengirim */}
                        <div className="space-y-1">
                            <p className="font-bold text-gray-400 uppercase tracking-wider text-[10px]">Diterima Dari (Supplier):</p>
                            <p className="font-bold text-gray-900 text-sm">{grData.namaSupplier}</p>
                            <p className="text-gray-500 leading-relaxed">{grData.alamatSupplier}</p>
                        </div>
                        {/* Kolom Kanan: Detail Dokumen Internal */}
                        <div className="border-l border-gray-200 pl-6 grid grid-cols-2 gap-2">
                            <div>
                                <p className="font-bold text-gray-400 uppercase tracking-wider text-[10px]">Tanggal Masuk:</p>
                                <p className="font-semibold">{grData.tanggalTerima}</p>
                            </div>
                            <div>
                                <p className="font-bold text-gray-400 uppercase tracking-wider text-[10px]">Gudang Lokasi:</p>
                                <p className="font-semibold">{grData.gudangTujuan}</p>
                            </div>
                            <div>
                                <p className="font-bold text-gray-400 uppercase tracking-wider text-[10px]">Ref. Purchase Order:</p>
                                <p className="font-mono font-bold text-gray-900">{grData.noPoRef}</p>
                            </div>
                            <div>
                                <p className="font-bold text-gray-400 uppercase tracking-wider text-[10px]">No. Surat Jalan:</p>
                                <p className="font-mono font-bold text-gray-900">{grData.noSuratJalan}</p>
                            </div>
                        </div>
                    </div>

                    {/* TABEL BARANG MANIFES */}
                    <div className="mt-8">
                        <table className="w-full text-left text-xs border-collapse">
                            <thead>
                                <tr className="border-b border-gray-900 text-gray-500 font-bold uppercase tracking-wider text-[10px]">
                                    <th className="py-2 w-8 text-center">No</th>
                                    <th className="py-2 w-32">Kode SKU</th>
                                    <th className="py-2">Deskripsi Barang / Nama Item</th>
                                    <th className="py-2 w-16 text-center">Unit</th>
                                    <th className="py-2 w-16 text-center">QTY PO</th>
                                    <th className="py-2 w-16 text-center bg-gray-50 font-black text-gray-900">QTY OK</th>
                                    <th className="py-2 w-16 text-center">REJECT</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {grData.items.map((item, idx) => (
                                    <tr key={item.id} className="align-top">
                                        <td className="py-3 text-center font-mono text-gray-400">{idx + 1}</td>
                                        <td className="py-3 font-mono font-bold text-gray-900">{item.sku}</td>
                                        <td className="py-3 pr-4">
                                            <p className="font-bold text-gray-900">{item.nama}</p>
                                            <p className="text-[11px] text-gray-400 mt-0.5 italic">{item.remark}</p>
                                        </td>
                                        <td className="py-3 text-center text-gray-600">{item.unit}</td>
                                        <td className="py-3 text-center font-mono text-gray-400">{item.qtyPo}</td>
                                        <td className="py-3 text-center font-mono font-black bg-gray-50 text-gray-900">{item.qtyOk}</td>
                                        <td className="py-3 text-center font-mono font-bold text-red-600">{item.qtyReject}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* BAGIAN BERITA ACARA & KETERANGAN TAMBAHAN */}
                    <div className="mt-8 pt-4 border-t border-gray-200 text-xs">
                        <p className="font-bold text-gray-400 uppercase tracking-wider text-[10px] mb-1">Catatan / Berita Acara Penerimaan:</p>
                        <p className="text-gray-600 bg-gray-50 p-3 rounded border border-gray-200 leading-relaxed italic">
                            "{grData.catatan}"
                        </p>
                    </div>

                    {/* AREA TANDA TANGAN (SIGNATURE BLOCK) */}
                    <div className="mt-16 grid grid-cols-3 gap-4 text-center text-xs">
                        <div>
                            <p className="text-gray-400 font-medium mb-16">Dibuat & Diserahkan Oleh,</p>
                            <div className="w-32 mx-auto border-b border-gray-400 mb-1"></div>
                            <p className="font-bold text-gray-700">Kurir / Driver Vendor</p>
                        </div>
                        <div>
                            <p className="text-gray-400 font-medium mb-16">Diperiksa & Diterima Oleh,</p>
                            <div className="w-40 mx-auto border-b border-gray-900 mb-1"></div>
                            <p className="font-bold text-gray-900">{grData.petugasPenerima}</p>
                            <p className="text-[10px] text-gray-400 font-mono">Staff Gudang Internal</p>
                        </div>
                        <div>
                            <p className="text-gray-400 font-medium mb-16">Mengetahui (Validasi),</p>
                            <div className="w-32 mx-auto border-b border-gray-400 mb-1"></div>
                            <p className="font-bold text-gray-900">Agus Imama Riyadi</p>
                            <p className="font-bold text-gray-400 font-mono">Direktur Utama</p>
                        </div>
                    </div>

                </div>
            </div>

            {/* ==========================================
                3. REVISED PRINT STYLE RULES (MENCEGAH BOCOR)
               ========================================== */}
            <style>{`
                @media print {
                    /* 1. Sembunyikan SEMUA elemen layout luar bawaan PortalLayout secara agresif */
                    html, body {
                        background: #fff !important;
                        color: #000 !important;
                    }

                    /* Cari tag layouting HTML yang biasa dipakai di dashboard admin */
                    nav, aside, header, footer, .no-print,
                    [role="navigation"], [role="menubar"], 
                    .sidebar, .navbar, .main-header { 
                        display: none !important; 
                        width: 0 !important;
                        height: 0 !important;
                        overflow: hidden !important;
                    }
                    
                    /* 2. Bongkar paksa grid/flexbox pembungkus dashboard agar tidak merusak posisi */
                    div, main, section {
                        position: static !important;
                        overflow: visible !important;
                        box-shadow: none !important;
                        transform: none !important;
                    }

                    /* 3. Paksa area kertas cetak mengisi penuh halaman tanpa margin ganda */
                    .printable-sheet { 
                        display: block !important;
                        position: absolute !important;
                        left: 0 !important;
                        top: 0 !important;
                        width: 100% !important;
                        padding: 0 !important;
                        margin: 0 !important;
                        border: none !important;
                        box-shadow: none !important;
                    }

                    /* 4. Pengaturan Warna Tinta Cetak */
                    * {
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    
                    @page {
                        size: A4 portrait;
                        margin: 20mm 15mm 20mm 15mm; /* Atur batas margin kertas fisik */
                    }
                }
            `}</style>
        </PortalLayout>
    );
}