import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { ArrowLeft, Printer } from 'lucide-react';

export default function PrintGoodsIssue() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [dataHeader, setDataHeader] = useState(null);
    const [dataItems, setDataItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulasi fetch data dari database berdasarkan ID
        const timer = setTimeout(() => {
            setDataHeader({
                noIssue: 'GI-2026-0045', 
                tanggalKeluar: '28 Mei 2026',
                gudangAsal: 'Gudang Pusat Logistik (GDG-01)',
                noRefRequest: 'MR-PRJ01-098',
                kodeWbs: 'WBS-1.1.2',
                petugasGudang: 'Hendra Wijaya',
                proyekTujuan: 'Proyek Bendungan Hilir Balikpapan',
                subKontraktor: 'PT. Sinar Jaya Mandiri',
                catatan: 'Supir Pak Doni - Truk Colt Diesel Plat B 9283 FAA',
                perusahaan: 'PT. LOGISTIK KONSTRUKSI INDONESIA',
                alamatPerusahaan: 'Jl. Jendral Sudirman No. 45, Jakarta Pusat'
            });

            setDataItems([
                { id: 1, kode: 'BMT-D16', nama: 'Besi Beton Ulir D16 (KS/Per Batang)', satuan: 'Batang', minta: 150, keluar: 150, kondisi: 'Bagus' },
                { id: 2, kode: 'CMN-PD50', nama: 'Semen Padang Type I @50kg', satuan: 'Zak', minta: 200, keluar: 180, kondisi: 'Bagus' },
                { id: 3, kode: 'PPA-PVC3', nama: 'Pipa PVC Wavin AW 3 Inch', satuan: 'Batang', minta: 50, keluar: 50, kondisi: 'Bagus' }
            ]);
            setIsLoading(false);
        }, 400);

        return () => clearTimeout(timer);
    }, [id]);

    // Fungsi trigger dialog print browser secara otomatis
    const handleTriggerPrint = () => {
        window.print();
    };

    if (isLoading) {
        return (
            <PortalLayout>
                <div className="flex flex-col items-center justify-center min-h-[400px]">
                    <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-sm font-medium text-gray-500 mt-3">Menyiapkan dokumen cetak...</p>
                </div>
            </PortalLayout>
        );
    }

    return (
        <PortalLayout>
            {/* ========================================================= */}
            {/* CONTROLLER BAR (Disembunyikan total saat kertas dicetak) */}
            {/* ========================================================= */}
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between print:hidden">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 bg-white hover:bg-gray-100 border border-gray-300 rounded-lg text-gray-700 transition"
                        title="Kembali"
                    >
                        <ArrowLeft size={16} />
                    </button>
                    <div>
                        <h4 className="text-sm font-bold text-gray-900">Pratinjau Formulir Goods Issue</h4>
                        <p className="text-xs text-gray-500">Tekan tombol cetak di kanan untuk mencetak fisik atau simpan sebagai PDF.</p>
                    </div>
                </div>
                <button
                    onClick={handleTriggerPrint}
                    className="inline-flex items-center gap-2 h-10 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg shadow-sm transition"
                >
                    <Printer size={16} /> Cetak Sekarang
                </button>
            </div>

            {/* ========================================================= */}
            {/* LEMBAR DOKUMEN CETAK (A4 PRINT OPTIMIZED)                 */}
            {/* ========================================================= */}
            <div className="bg-white p-8 max-w-4xl mx-auto border border-gray-200 rounded-xl print:border-none print:p-0 print:max-w-full font-sans text-black">
                
                {/* KOP SURAT PERUSAHAAN */}
                <div className="flex justify-between items-start border-b-2 border-black pb-4 mb-6">
                    <div>
                        <h1 className="text-xl font-black tracking-tight text-gray-900">PT. ANUGRAH GUNA SEMESTA</h1>
                        <p className="text-xs text-gray-500 max-w-sm mt-1 leading-relaxed">
                            Bintaro Tride Center, Ruko Lantai Dasar Blok C2-18 Jalan Jendral Sudirman, SOUTH TANGERANG.
                            <br />Telp: (021) 555-9988 | Email: info@anugrahgunasemesta.com
                        </p>
                    </div>
                    <div className="text-right">
                        <h2 className="text-lg font-bold uppercase tracking-wide text-gray-800">BUKTI KELUAR BARANG</h2>
                        <p className="text-sm font-mono font-bold text-gray-700">{dataHeader.noIssue}</p>
                    </div>
                </div>

                {/* METADATA / MANIFES HEADER GRID */}
                <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-xs mb-6">
                    <div className="space-y-2">
                        <table className="w-full table-fixed">
                            <tbody>
                                <tr>
                                    <td className="w-28 font-semibold text-gray-500">Tanggal Mobilisasi</td>
                                    <td className="w-3 text-center">:</td>
                                    <td className="font-medium">{dataHeader.tanggalKeluar}</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold text-gray-500">Asal Gudang</td>
                                    <td className="text-center">:</td>
                                    <td className="font-medium">{dataHeader.gudangAsal}</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold text-gray-500">No. Ref Request (MR)</td>
                                    <td className="text-center">:</td>
                                    <td className="font-mono font-bold">{dataHeader.noRefRequest}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="space-y-2">
                        <table className="w-full table-fixed">
                            <tbody>
                                <tr>
                                    <td className="w-28 font-semibold text-gray-500">Lokasi Proyek Tujuan</td>
                                    <td className="w-3 text-center">:</td>
                                    <td className="font-bold">{dataHeader.proyekTujuan}</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold text-gray-500">Subkontraktor / Mandor</td>
                                    <td className="text-center">:</td>
                                    <td className="font-medium">{dataHeader.subKontraktor}</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold text-gray-500">WBS / Cost Center</td>
                                    <td className="text-center">:</td>
                                    <td className="font-medium">{dataHeader.kodeWbs}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* TABEL ITEM LOGISTIK */}
                <table className="w-full text-xs border-collapse border border-gray-400 mb-6">
                    <thead>
                        <tr className="bg-gray-100 print:bg-transparent border-b border-gray-400">
                            <th className="border border-gray-400 px-3 py-2 text-center w-8">No</th>
                            <th className="border border-gray-400 px-3 py-2 text-left w-24">Kode SKU</th>
                            <th className="border border-gray-400 px-3 py-2 text-left">Nama Material / Spesifikasi Teknis</th>
                            <th className="border border-gray-400 px-3 py-2 text-center w-20">Satuan</th>
                            <th className="border border-gray-400 px-3 py-2 text-center w-20">Vol. MR</th>
                            <th className="border border-gray-400 px-3 py-2 text-center w-20">Vol. Keluar</th>
                            <th className="border border-gray-400 px-3 py-2 text-center w-24">Kondisi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataItems.map((item, index) => (
                            <tr key={item.id} className="border-b border-gray-400">
                                <td className="border border-gray-400 px-3 py-2 text-center font-medium">{index + 1}</td>
                                <td className="border border-gray-400 px-3 py-2 font-mono font-bold">{item.kode}</td>
                                <td className="border border-gray-400 px-3 py-2 font-medium">{item.nama}</td>
                                <td className="border border-gray-400 px-3 py-2 text-center">{item.satuan}</td>
                                <td className="border border-gray-400 px-3 py-2 text-center font-mono">{item.minta}</td>
                                <td className="border border-gray-400 px-3 py-2 text-center font-mono font-bold">{item.keluar}</td>
                                <td className="border border-gray-400 px-3 py-2 text-center">{item.kondisi}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* CATATAN PENGIRIMAN */}
                <div className="text-xs mb-8">
                    <span className="font-bold text-gray-700 block mb-1">Catatan Ekspeditur / Driver:</span>
                    <div className="border border-gray-300 rounded p-2.5 bg-gray-50/50 italic print:bg-transparent">
                        {dataHeader.catatan || 'Tidak ada catatan instruksi khusus.'}
                    </div>
                </div>

                {/* AREA VALIDASI TANDA TANGAN (3 KOLOM) */}
                <div className="grid grid-cols-3 gap-4 text-center text-xs mt-12">
                    <div className="flex flex-col justify-between h-24">
                        <p className="font-medium text-gray-600">Diserahkan Oleh,</p>
                        <div>
                            <p className="font-bold underline">{dataHeader.petugasGudang}</p>
                            <p className="text-[10px] text-gray-400">Dispatcher Logistik</p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between h-24">
                        <p className="font-medium text-gray-600">Dibawa / Supir Oleh,</p>
                        <div>
                            <p className="font-bold underline">( .................................... )</p>
                            <p className="text-[10px] text-gray-400">Ekspedisi / Driver</p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between h-24">
                        <p className="font-medium text-gray-600">Diterima Oleh,</p>
                        <div>
                            <p className="font-bold underline">{dataHeader.subKontraktor}</p>
                            <p className="text-[10px] text-gray-400">Mandor / Lapangan Site</p>
                        </div>
                    </div>
                </div>

                {/* FOOTER BUKTI REKAMAN */}
                <div className="mt-16 pt-2 border-t border-gray-200 text-[10px] text-gray-400 font-mono flex justify-between">
                    <span>Dokumen Sistem GI Otomatis - Logistik ERP</span>
                    <span>Waktu Cetak: {new Date().toLocaleString('id-ID')}</span>
                </div>

            </div>
        </PortalLayout>
    );
}