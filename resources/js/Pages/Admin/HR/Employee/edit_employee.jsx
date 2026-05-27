import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { 
    ArrowLeft, 
    Save, 
    User, 
    Briefcase, 
    IdCard, 
    Trash2 
} from 'lucide-react';

export default function EditEmployeePage() {
    const navigate = useNavigate();
    const { id } = useParams(); // Mengambil ID dari URL jika menggunakan react-router

    // ==========================================
    // STATE (Mock initial data)
    // ==========================================
    const [form, setForm] = useState({
        nama_lengkap: 'Budi Santoso',
        email: 'budi@company.com',
        telepon: '08123456789',
        jabatan: 'Software Engineer',
        departemen: 'Engineering',
        nik: 'EMP-001',
    });

    // ==========================================
    // HANDLE CHANGE
    // ==========================================
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    // ==========================================
    // HANDLE SUBMIT
    // ==========================================
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Update Data:", form);
        alert('Data karyawan berhasil diperbarui!');
    };

    return (
        <PortalLayout>
            <div className="space-y-6">
                {/* HEADER */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Edit Profil Karyawan</h1>
                        <p className="text-sm text-gray-500 mt-1">Perbarui informasi data diri dan jabatan karyawan</p>
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

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                        {/* LEFT CONTENT */}
                        <div className="xl:col-span-2 space-y-6">
                            <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
                                <div className="px-6 py-5 border-b border-gray-200">
                                    <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                                        <User size={18} className="text-indigo-600" /> Informasi Karyawan
                                    </h2>
                                </div>
                                <div className="p-6 space-y-5">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap</label>
                                        <input type="text" name="nama_lengkap" value={form.nama_lengkap} onChange={handleChange} className="w-full h-12 rounded-2xl border border-gray-200 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                                            <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full h-12 rounded-2xl border border-gray-200 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">NIK</label>
                                            <input type="text" name="nik" value={form.nik} onChange={handleChange} className="w-full h-12 rounded-2xl border border-gray-200 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDEBAR */}
                        <div className="space-y-6">
                            <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-6">
                                <h2 className="font-semibold text-gray-900 mb-5">Aksi Cepat</h2>
                                <button
                                    type="submit"
                                    className="w-full h-12 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center justify-center gap-2 transition"
                                >
                                    <Save size={18} /> Simpan Perubahan
                                </button>
                                <button
                                    type="button"
                                    className="w-full h-12 rounded-2xl border border-red-200 text-red-600 hover:bg-red-50 font-semibold flex items-center justify-center gap-2 transition mt-3"
                                >
                                    <Trash2 size={18} /> Hapus Karyawan
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </PortalLayout>
    );
}