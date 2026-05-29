import React from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { ArrowLeft, Landmark, Hash, Wallet, Clock, History, AlertCircle } from 'lucide-react';

export default function DetailCashBankPage() {
    const navigate = useNavigate();

    // Mock data detail akun
    const detailAkun = {
        nama_akun: 'Bank BCA Utama',
        kode_akun: 'CB-001',
        tipe_akun: 'Bank',
        nomor_rekening: '1234567890',
        saldo_terakhir: 'Rp 485.500.000',
        mata_uang: 'IDR',
        status: 'Aktif',
        catatan: 'Rekening operasional pusat untuk penerimaan pembayaran klien dan pembayaran vendor besar.',
        dibuat_pada: '12 Januari 2026',
        diperbarui_pada: '28 Mei 2026'
    };

    return (
        <PortalLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Detail Akun Keuangan</h1>
                        <p className="text-sm text-gray-500 mt-1">Informasi lengkap dan status akun kas/bank</p>
                    </div>
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 h-10 px-4 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium bg-white hover:bg-gray-50 transition"
                    >
                        <ArrowLeft size={16} /> Kembali
                    </button>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                    {/* Header Card */}
                    <div className="p-6 border-b border-gray-100 flex items-start gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600">
                            <Landmark size={28} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">{detailAkun.nama_akun}</h2>
                            <p className="text-gray-500 text-sm font-mono">{detailAkun.kode_akun}</p>
                        </div>
                        <div className="ml-auto">
                            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wide">
                                {detailAkun.status}
                            </span>
                        </div>
                    </div>

                    {/* Content Detail */}
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <InfoItem icon={<Hash size={18} />} label="Nomor Rekening" value={detailAkun.nomor_rekening} />
                        <InfoItem icon={<Wallet size={18} />} label="Saldo Saat Ini" value={detailAkun.saldo_terakhir} />
                        <InfoItem icon={<Landmark size={18} />} label="Tipe Akun" value={detailAkun.tipe_akun} />
                        <InfoItem icon={<AlertCircle size={18} />} label="Mata Uang" value={detailAkun.mata_uang} />
                        
                        <div className="md:col-span-2 space-y-2">
                            <div className="flex items-center gap-2 text-gray-500 text-sm">
                                <History size={18} />
                                <span className="font-medium">Catatan Akun</span>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-xl text-gray-700 text-sm italic leading-relaxed">
                                "{detailAkun.catatan}"
                            </div>
                        </div>

                        <div className="md:col-span-2 pt-4 border-t border-gray-100 flex gap-8 text-sm">
                            <div className="text-gray-500">
                                <span className="block font-medium">Dibuat pada</span>
                                <span className="text-gray-900">{detailAkun.dibuat_pada}</span>
                            </div>
                            <div className="text-gray-500">
                                <span className="block font-medium">Terakhir diperbarui</span>
                                <span className="text-gray-900">{detailAkun.diperbarui_pada}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PortalLayout>
    );
}

function InfoItem({ icon, label, value }) {
    return (
        <div>
            <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                {icon}
                <span className="font-medium">{label}</span>
            </div>
            <div className="text-gray-900 font-semibold">{value}</div>
        </div>
    );
}