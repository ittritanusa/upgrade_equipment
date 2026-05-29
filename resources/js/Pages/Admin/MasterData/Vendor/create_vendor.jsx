import React from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { ArrowLeft, Save, Building2, User, FileText, Mail, Phone, MapPin } from 'lucide-react';

export default function CreateVendorPage() {
    const navigate = useNavigate();

    return (
        <PortalLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Tambah Vendor Baru</h1>
                        <p className="text-sm text-gray-500 mt-1">Lengkapi data vendor untuk keperluan seleksi procurement</p>
                    </div>
                    <button 
                        onClick={() => navigate(-1)} 
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
                    >
                        <ArrowLeft size={16} /> Kembali
                    </button>
                </div>

                <form className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                    {/* Section: Informasi Utama */}
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <Building2 size={18} className="text-blue-600" /> Informasi Perusahaan
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Vendor</label>
                                <input type="text" className="w-full h-10 rounded-lg border border-gray-300 px-3 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Contoh: PT. Maju Jaya" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                                <select className="w-full h-10 rounded-lg border border-gray-300 px-3">
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
                            <User size={18} className="text-blue-600" /> Informasi Kontak
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nama PIC</label>
                                <input type="text" className="w-full h-10 rounded-lg border border-gray-300 px-3" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input type="email" className="w-full h-10 rounded-lg border border-gray-300 px-3" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Telepon</label>
                                <input type="text" className="w-full h-10 rounded-lg border border-gray-300 px-3" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap</label>
                            <textarea className="w-full h-20 rounded-lg border border-gray-300 px-3 py-2" placeholder="Masukkan alamat operasional"></textarea>
                        </div>
                    </div>

                    {/* Section: Dokumen */}
                    <div className="p-6">
                        <h2 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FileText size={18} className="text-blue-600" /> Dokumen Legalitas
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {['NIB / SIUP', 'NPWP', 'Surat PKP', 'Dokumen Pendukung Lain'].map((doc) => (
                                <div key={doc} className="border border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center hover:bg-gray-50 cursor-pointer">
                                    <span className="text-sm text-gray-500 mb-2">Upload {doc}</span>
                                    <input type="file" className="text-xs text-gray-400" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="bg-gray-50 p-6 flex justify-end gap-3">
                        <button type="button" onClick={() => navigate(-1)} className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100">
                            Batal
                        </button>
                        <button type="submit" className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 flex items-center gap-2">
                            <Save size={16} /> Simpan Data Vendor
                        </button>
                    </div>
                </form>
            </div>
        </PortalLayout>
    );
}