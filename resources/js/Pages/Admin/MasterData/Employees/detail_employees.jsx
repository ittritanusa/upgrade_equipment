import React from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { 
    ArrowLeft, User, Briefcase, Mail, Phone, IdCard, 
    CalendarDays, MapPin, CreditCard, ShieldCheck, FileText, ExternalLink 
} from 'lucide-react';

export default function DetailEmployeePage() {
    const navigate = useNavigate();
    
    // Mock data yang disesuaikan dengan struktur form Create
    const employee = {
        nama_lengkap: 'Budi Santoso',
        email: 'budi@company.com',
        telepon: '08123456789',
        jabatan: 'Project Manager',
        departemen: 'Engineering',
        nik: 'EMP-001',
        tanggal_bergabung: '12 Januari 2024',
        alamat: 'Jl. Sudirman No. 123, Jakarta Selatan',
        no_bpjs_kes: '123456789012',
        no_bpjs_tk: '987654321098',
        jenis_kontrak: 'Kontrak',
        tgl_awal_kontrak: '2025-01-01',
        tgl_akhir_kontrak: '2026-01-01',
        dokumen: {
            ktp: 'ktp_budi.pdf',
            kk: 'kk_budi.pdf',
            npwp: null,
            buku_rekening: 'rekening_budi.pdf'
        }
    };

    return (
        <PortalLayout>
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Profil Karyawan</h1>
                        <p className="text-sm text-gray-500 mt-1">Detail lengkap informasi dan administrasi karyawan</p>
                    </div>
                    <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 h-10 px-4 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium bg-white hover:bg-gray-50 transition">
                        <ArrowLeft size={16} /> Kembali
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        {/* Info Utama */}
                        <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl">
                                    {employee.nama_lengkap.charAt(0)}
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">{employee.nama_lengkap}</h2>
                                    <p className="text-indigo-600 font-medium">{employee.jabatan}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <InfoItem icon={<Mail size={18} />} label="Email" value={employee.email} />
                                <InfoItem icon={<Phone size={18} />} label="No. Telepon" value={employee.telepon} />
                                <InfoItem icon={<IdCard size={18} />} label="NIK" value={employee.nik} />
                                <InfoItem icon={<Briefcase size={18} />} label="Departemen" value={employee.departemen} />
                                <InfoItem icon={<CalendarDays size={18} />} label="Tanggal Bergabung" value={employee.tanggal_bergabung} />
                                <InfoItem icon={<MapPin size={18} />} label="Alamat" value={employee.alamat} />
                            </div>
                        </div>

                        {/* Dokumen */}
                        <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
                            <h3 className="font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                <FileText size={20} className="text-indigo-600" /> Dokumen Legalitas
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Object.entries(employee.dokumen).map(([key, value]) => (
                                    <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                                        <span className="text-sm font-medium capitalize text-gray-600">{key.replace('_', ' ')}</span>
                                        {value ? (
                                            <a href="#" className="flex items-center gap-1 text-sm text-indigo-600 hover:underline">
                                                Lihat <ExternalLink size={14} />
                                            </a>
                                        ) : (
                                            <span className="text-sm text-gray-400 italic">Tidak ada</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* Status */}
                        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
                            <h3 className="font-semibold text-gray-900 mb-4">Status Karyawan</h3>
                            <div className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold w-max mb-2">
                                {employee.jenis_kontrak.toUpperCase()}
                            </div>
                            {employee.jenis_kontrak !== 'Tetap' && (
                                <p className="text-xs text-gray-500">Kontrak: {employee.tgl_awal_kontrak} s/d {employee.tgl_akhir_kontrak}</p>
                            )}
                        </div>

                        {/* Administrasi */}
                        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
                            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <ShieldCheck size={18} className="text-indigo-600" /> Administrasi
                            </h3>
                            <div className="space-y-4">
                                <InfoItem icon={<CreditCard size={16} />} label="BPJS Kesehatan" value={employee.no_bpjs_kes} />
                                <InfoItem icon={<CreditCard size={16} />} label="BPJS Ketenagakerjaan" value={employee.no_bpjs_tk} />
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
            <div className="text-gray-900 font-semibold">{value || '-'}</div>
        </div>
    );
}