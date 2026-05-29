import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { ArrowLeft, Save, Building2, User, FileText, UploadCloud, ShieldCheck } from 'lucide-react';

export default function EditVendorPage() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [form, setForm] = useState({
        nama_vendor: 'PT. Maju Konstruksi',
        kategori: 'Material',
        status: 'Approved', // Ditambahkan field status
        pic: 'Budi Santoso',
        email: 'budi@majukonstruksi.com',
        telepon: '08123456789',
        alamat: 'Jl. Sudirman No. 123, Jakarta Selatan',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Data diperbarui:", form);
        alert(`Data vendor diperbarui dengan status: ${form.status}`);
        navigate(-1);
    };

    return (
        <PortalLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Edit Data Vendor</h1>
                        <p className="text-sm text-gray-500 mt-1">Perbarui informasi dan status kualifikasi vendor</p>
                    </div>
                    <button 
                        onClick={() => navigate(-1)} 
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
                    >
                        <ArrowLeft size={16} /> Kembali
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                    {/* Section: Informasi Utama */}
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <Building2 size={18} className="text-amber-600" /> Informasi Perusahaan
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Vendor</label>
                                <input 
                                    type="text" name="nama_vendor" value={form.nama_vendor} onChange={handleChange}
                                    className="w-full h-10 rounded-lg border border-gray-300 px-3 focus:ring-2 focus:ring-amber-500 outline-none" 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Status Vendor</label>
                                <select 
                                    name="status"
                                    value={form.status}
                                    onChange={handleChange}
                                    className="w-full h-10 rounded-lg border border-gray-300 px-3 bg-white"
                                >
                                    <option value="Approved">Approved</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Blacklisted">Blacklisted</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                                <select 
                                    name="kategori" value={form.kategori} onChange={handleChange}
                                    className="w-full h-10 rounded-lg border border-gray-300 px-3"
                                >
                                    <option>Material</option>
                                    <option>Jasa</option>
                                    <option>Logistik</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Section: Kontak */}
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <User size={18} className="text-amber-600" /> Informasi Kontak
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nama PIC</label>
                                <input type="text" name="pic" value={form.pic} onChange={handleChange} className="w-full h-10 rounded-lg border border-gray-300 px-3" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full h-10 rounded-lg border border-gray-300 px-3" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Telepon</label>
                                <input type="text" name="telepon" value={form.telepon} onChange={handleChange} className="w-full h-10 rounded-lg border border-gray-300 px-3" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap</label>
                            <textarea name="alamat" value={form.alamat} onChange={handleChange} className="w-full h-20 rounded-lg border border-gray-300 px-3 py-2"></textarea>
                        </div>
                    </div>

                    {/* Section: Update Dokumen */}
                    <div className="p-6">
                        <h2 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FileText size={18} className="text-amber-600" /> Dokumen Legalitas (Opsional)
                        </h2>
                        <div className="bg-amber-50 border border-amber-100 p-4 rounded-lg flex items-center gap-4">
                            <UploadCloud className="text-amber-600" size={32} />
                            <div>
                                <p className="text-sm font-medium text-amber-900">Ganti Dokumen</p>
                                <p className="text-xs text-amber-700">Unggah file baru jika ingin memperbarui NIB, NPWP, atau surat lainnya.</p>
                            </div>
                            <input type="file" className="ml-auto text-sm" />
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="bg-gray-50 p-6 flex justify-end gap-3">
                        <button type="button" onClick={() => navigate(-1)} className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100">
                            Batal
                        </button>
                        <button type="submit" className="px-5 py-2 rounded-lg bg-amber-600 text-white font-medium hover:bg-amber-700 flex items-center gap-2">
                            <Save size={16} /> Simpan Perubahan
                        </button>
                    </div>
                </form>
            </div>
        </PortalLayout>
    );
}