import React from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { ArrowLeft, Save, CalendarClock, Tag, Info } from 'lucide-react';

export default function CreateAlasanCutiPage() {
    const navigate = useNavigate();

    return (
        <PortalLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Tambah Alasan Cuti Baru</h1>
                        <p className="text-sm text-gray-500 mt-1">Konfigurasikan tipe dan detail alasan cuti untuk karyawan</p>
                    </div>
                    <button 
                        onClick={() => navigate(-1)} 
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
                    >
                        <ArrowLeft size={16} /> Kembali
                    </button>
                </div>

                <form className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                    {/* Section: Form Utama */}
                    <div className="p-6 space-y-6">
                        <h2 className="text-base font-semibold text-gray-800 flex items-center gap-2">
                            <CalendarClock size={18} className="text-blue-600" /> Informasi Alasan Cuti
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Alasan</label>
                                <input type="text" className="w-full h-10 rounded-lg border border-gray-300 px-3 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Contoh: Cuti Melahirkan" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Kode Cuti</label>
                                <input type="text" className="w-full h-10 rounded-lg border border-gray-300 px-3" placeholder="Contoh: CK-004" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tipe Cuti</label>
                                <select className="w-full h-10 rounded-lg border border-gray-300 px-3">
                                    <option value="Tahunan">Cuti Tahunan</option>
                                    <option value="Khusus">Cuti Khusus</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Kuota Hari</label>
                                <input type="number" className="w-full h-10 rounded-lg border border-gray-300 px-3" placeholder="Contoh: 12" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi / Keterangan</label>
                            <textarea className="w-full h-24 rounded-lg border border-gray-300 px-3 py-2" placeholder="Masukkan detail atau kebijakan terkait cuti ini..."></textarea>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="bg-gray-50 p-6 flex justify-end gap-3">
                        <button type="button" onClick={() => navigate(-1)} className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100">
                            Batal
                        </button>
                        <button type="submit" className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 flex items-center gap-2">
                            <Save size={16} /> Simpan Data
                        </button>
                    </div>
                </form>
            </div>
        </PortalLayout>
    );
}