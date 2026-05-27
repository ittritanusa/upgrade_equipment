import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { 
    ArrowLeft, 
    Edit2, 
    User, 
    Briefcase, 
    Mail, 
    Phone, 
    IdCard, 
    CalendarDays, 
    MapPin 
} from 'lucide-react';

export default function DetailEmployeePage() {
    const navigate = useNavigate();
    
    // Mock data - dalam implementasi nyata, ini diambil via API (fetch/axios)
    const employee = {
        nama_lengkap: 'Budi Santoso',
        email: 'budi@company.com',
        telepon: '08123456789',
        jabatan: 'Software Engineer',
        departemen: 'Engineering',
        nik: 'EMP-001',
        tanggal_bergabung: '12 Januari 2024',
        alamat: 'Jl. Sudirman No. 123, Jakarta Selatan'
    };

    return (
        <PortalLayout>
            <div className="space-y-6">
                {/* HEADER */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Profil Karyawan</h1>
                        <p className="text-sm text-gray-500 mt-1">Lihat detail informasi lengkap karyawan</p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => navigate(-1)}
                            className="inline-flex items-center gap-2 h-10 px-4 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium bg-white hover:bg-gray-50 transition"
                        >
                            <ArrowLeft size={16} /> Kembali
                        </button>
                    </div>
                </div>

                {/* CONTENT */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* INFO UTAMA */}
                    <div className="md:col-span-2 bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
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

                    {/* SIDEBAR STATUS */}
                    <div className="space-y-6">
                        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
                            <h3 className="font-semibold text-gray-900 mb-4">Status Aktif</h3>
                            <div className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold w-max">
                                KARYAWAN TETAP
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PortalLayout>
    );
}

// Komponen Pembantu (Sub-component) agar kode lebih rapi
function InfoItem({ icon, label, value }) {
    return (
        <div>
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                {icon}
                {label}
            </div>
            <div className="text-gray-900 font-medium">{value}</div>
        </div>
    );
}