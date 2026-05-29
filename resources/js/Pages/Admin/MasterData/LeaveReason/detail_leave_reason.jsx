import React from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { ArrowLeft, CalendarClock, Tag, ShieldCheck, FileText, Info } from 'lucide-react';

export default function DetailAlasanCutiPage() {
    const navigate = useNavigate();

    // Mock data detail alasan cuti
    const detailCuti = {
        nama_alasan: 'Pernikahan Karyawan',
        kode_cuti: 'CK-001',
        tipe_cuti: 'Cuti Khusus',
        kuota_hari: 3,
        status: 'Aktif',
        keterangan: 'Diberikan kepada karyawan yang melangsungkan pernikahan pertama. Diperlukan bukti berupa salinan undangan atau surat keterangan nikah.',
        dibuat_pada: '10 Januari 2026',
        terakhir_diubah: '15 Maret 2026'
    };

    return (
        <PortalLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Detail Alasan Cuti</h1>
                        <p className="text-sm text-gray-500 mt-1">Informasi lengkap kebijakan alasan cuti</p>
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
                            <CalendarClock size={28} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">{detailCuti.nama_alasan}</h2>
                            <p className="text-gray-500 text-sm font-mono">{detailCuti.kode_cuti}</p>
                        </div>
                        <div className="ml-auto">
                            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wide">
                                {detailCuti.status}
                            </span>
                        </div>
                    </div>

                    {/* Content Detail */}
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <InfoItem icon={<Tag size={18} />} label="Tipe Cuti" value={detailCuti.tipe_cuti} />
                        <InfoItem icon={<ShieldCheck size={18} />} label="Kuota Hari" value={`${detailCuti.kuota_hari} Hari`} />
                        
                        <div className="md:col-span-2 space-y-2">
                            <div className="flex items-center gap-2 text-gray-500 text-sm">
                                <FileText size={18} />
                                <span className="font-medium">Deskripsi / Ketentuan</span>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-xl text-gray-700 text-sm leading-relaxed">
                                {detailCuti.keterangan}
                            </div>
                        </div>

                        <div className="md:col-span-2 pt-4 border-t border-gray-100 flex gap-8 text-sm">
                            <div className="text-gray-500">
                                <span className="block font-medium">Dibuat pada</span>
                                <span className="text-gray-900">{detailCuti.dibuat_pada}</span>
                            </div>
                            <div className="text-gray-500">
                                <span className="block font-medium">Terakhir diubah</span>
                                <span className="text-gray-900">{detailCuti.terakhir_diubah}</span>
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