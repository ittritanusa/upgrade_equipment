import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';

import {
    ArrowLeft,
    Save,
    User,
    Mail,
    Phone,
    Briefcase,
    Building2,
    CalendarDays,
    FileText,
    IdCard
} from 'lucide-react';

export default function CreateEmployeePage() {
    const navigate = useNavigate();

    // ==========================================
    // STATE
    // ==========================================
    const [form, setForm] = useState({
        nama_lengkap: '',
        email: '',
        telepon: '',
        jabatan: '',
        departemen: '',
        tanggal_bergabung: '',
        nik: '',
        status_karyawan: '',
        alamat: '',
    });

    // ==========================================
    // HANDLE CHANGE
    // ==========================================
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // ==========================================
    // HANDLE SUBMIT
    // ==========================================
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
        alert('Data karyawan berhasil disimpan!');
    };

    return (
        <PortalLayout>
            <div className="space-y-6">
                {/* HEADER */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Tambah Karyawan Baru</h1>
                        <p className="text-sm text-gray-500 mt-1">Lengkapi informasi profil karyawan baru di sistem</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 h-10 px-4 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium bg-white hover:bg-gray-50 transition self-start sm:self-auto"
                    >
                        <ArrowLeft size={16} /> Kembali
                    </button>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                        
                        {/* LEFT CONTENT */}
                        <div className="xl:col-span-2 space-y-6">
                            
                            {/* PERSONAL INFORMATION */}
                            <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
                                <div className="px-6 py-5 border-b border-gray-200">
                                    <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                                        <User size={18} className="text-indigo-600" /> Informasi Pribadi
                                    </h2>
                                </div>
                                <div className="p-6 space-y-5">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap</label>
                                        <input type="text" name="nama_lengkap" value={form.nama_lengkap} onChange={handleChange} className="w-full h-12 rounded-2xl border border-gray-200 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500" required />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                                            <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full h-12 rounded-2xl border border-gray-200 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500" required />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">No. Telepon</label>
                                            <input type="text" name="telepon" value={form.telepon} onChange={handleChange} className="w-full h-12 rounded-2xl border border-gray-200 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500" required />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* EMPLOYMENT DETAILS */}
                            <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
                                <div className="px-6 py-5 border-b border-gray-200">
                                    <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                                        <Briefcase size={18} className="text-indigo-600" /> Informasi Pekerjaan
                                    </h2>
                                </div>
                                <div className="p-6 space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Jabatan</label>
                                            <input type="text" name="jabatan" value={form.jabatan} onChange={handleChange} className="w-full h-12 rounded-2xl border border-gray-200 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Departemen</label>
                                            <select name="departemen" value={form.departemen} onChange={handleChange} className="w-full h-12 rounded-2xl border border-gray-200 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500">
                                                <option value="">Pilih Departemen</option>
                                                <option>Engineering</option>
                                                <option>Finance</option>
                                                <option>HR & GA</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">NIK</label>
                                        <input type="text" name="nik" value={form.nik} onChange={handleChange} className="w-full h-12 rounded-2xl border border-gray-200 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDEBAR */}
                        <div className="space-y-6">
                            <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-6">
                                <h2 className="font-semibold text-gray-900 flex items-center gap-2 mb-5">
                                    <IdCard size={18} className="text-indigo-600" /> Profil Singkat
                                </h2>
                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-500">Nama</span>
                                        <span className="text-sm font-semibold truncate max-w-[150px]">{form.nama_lengkap || '-'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-500">Jabatan</span>
                                        <span className="text-sm font-semibold">{form.jabatan || '-'}</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full h-12 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center justify-center gap-2 transition"
                            >
                                <Save size={18} /> Simpan Data Karyawan
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </PortalLayout>
    );
}