import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { ArrowLeft, Save, CalendarClock } from 'lucide-react';

export default function EditAlasanCutiPage() {
    const navigate = useNavigate();
    const { id } = useParams();

    // Mock data untuk form edit
    const [form, setForm] = useState({
        nama_alasan: 'Pernikahan Karyawan',
        kode_cuti: 'CK-001',
        tipe_cuti: 'Cuti Khusus',
        kuota_hari: 3,
        status: 'Aktif',
        keterangan: 'Diberikan kepada karyawan yang melangsungkan pernikahan pertama.'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Data diperbarui:", form);
        alert('Data alasan cuti berhasil diperbarui!');
        navigate(-1);
    };

    return (
        <PortalLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Edit Alasan Cuti</h1>
                        <p className="text-sm text-gray-500 mt-1">Perbarui konfigurasi dan kebijakan alasan cuti</p>
                    </div>
                    <button 
                        onClick={() => navigate(-1)} 
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
                    >
                        <ArrowLeft size={16} /> Kembali
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                    <div className="p-6 space-y-6">
                        <h2 className="text-base font-semibold text-gray-800 flex items-center gap-2">
                            <CalendarClock size={18} className="text-amber-600" /> Pengaturan Alasan Cuti
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Alasan</label>
                                <input type="text" name="nama_alasan" value={form.nama_alasan} onChange={handleChange} className="w-full h-10 rounded-lg border border-gray-300 px-3 focus:ring-2 focus:ring-amber-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Kode Cuti</label>
                                <input type="text" name="kode_cuti" value={form.kode_cuti} onChange={handleChange} className="w-full h-10 rounded-lg border border-gray-300 px-3 bg-gray-50" disabled />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tipe Cuti</label>
                                <select name="tipe_cuti" value={form.tipe_cuti} onChange={handleChange} className="w-full h-10 rounded-lg border border-gray-300 px-3">
                                    <option>Cuti Tahunan</option>
                                    <option>Cuti Khusus</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Kuota Hari</label>
                                <input type="number" name="kuota_hari" value={form.kuota_hari} onChange={handleChange} className="w-full h-10 rounded-lg border border-gray-300 px-3" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                <select name="status" value={form.status} onChange={handleChange} className="w-full h-10 rounded-lg border border-gray-300 px-3">
                                    <option value="Aktif">Aktif</option>
                                    <option value="Nonaktif">Nonaktif</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi / Keterangan</label>
                            <textarea name="keterangan" value={form.keterangan} onChange={handleChange} className="w-full h-24 rounded-lg border border-gray-300 px-3 py-2"></textarea>
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