import React from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { 
    ArrowLeft, Building2, User, Mail, Phone, MapPin, 
    FileText, ShieldCheck, ExternalLink, CalendarDays 
} from 'lucide-react';

export default function DetailVendorPage() {
    const navigate = useNavigate();

    // Mock data detail vendor
    const vendor = {
        nama_vendor: 'PT. Maju Konstruksi',
        kode_vendor: 'VND-001',
        kategori: 'Material',
        status: 'Approved',
        pic: 'Budi Santoso',
        email: 'budi@majukonstruksi.com',
        telepon: '08123456789',
        alamat: 'Jl. Sudirman No. 123, Jakarta Selatan',
        tgl_registrasi: '15 Januari 2025',
        dokumen: [
            { nama: 'NIB / SIUP', status: 'Verified' },
            { nama: 'NPWP', status: 'Verified' },
            { nama: 'Surat PKP', status: 'Pending' }
        ]
    };

    return (
        <PortalLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Detail Vendor</h1>
                        <p className="text-sm text-gray-500 mt-1">Informasi lengkap profil dan kualifikasi vendor</p>
                    </div>
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 h-10 px-4 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium bg-white hover:bg-gray-50 transition"
                    >
                        <ArrowLeft size={16} /> Kembali
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Info Utama */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
                            <div className="flex items-start gap-4 mb-8">
                                <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600">
                                    <Building2 size={32} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">{vendor.nama_vendor}</h2>
                                    <p className="text-gray-500 text-sm">{vendor.kode_vendor}</p>
                                    <span className="inline-block mt-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold">
                                        {vendor.status}
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <InfoItem icon={<User size={18} />} label="PIC Contact" value={vendor.pic} />
                                <InfoItem icon={<Mail size={18} />} label="Email" value={vendor.email} />
                                <InfoItem icon={<Phone size={18} />} label="No. Telepon" value={vendor.telepon} />
                                <InfoItem icon={<CalendarDays size={18} />} label="Tanggal Registrasi" value={vendor.tgl_registrasi} />
                                <div className="md:col-span-2">
                                    <InfoItem icon={<MapPin size={18} />} label="Alamat" value={vendor.alamat} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar: Dokumen & Kategori */}
                    <div className="space-y-6">
                        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
                            <h3 className="font-semibold text-gray-900 mb-4">Kategori Layanan</h3>
                            <div className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-2 rounded-lg inline-block">
                                {vendor.kategori}
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
                            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <ShieldCheck size={18} className="text-blue-600" /> Status Legalitas
                            </h3>
                            <div className="space-y-3">
                                {vendor.dokumen.map((doc, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                        <span className="text-sm text-gray-700">{doc.nama}</span>
                                        <div className="flex items-center gap-2">
                                            <span className={`text-[10px] font-bold uppercase ${doc.status === 'Verified' ? 'text-emerald-600' : 'text-amber-600'}`}>
                                                {doc.status}
                                            </span>
                                            <button className="text-gray-400 hover:text-blue-600">
                                                <ExternalLink size={14} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
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