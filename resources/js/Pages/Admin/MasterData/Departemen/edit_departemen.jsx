import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { Save, X, ArrowLeft } from 'lucide-react';

export default function EditDepartemen() {
    const navigate = useNavigate();
    const { id } = useParams(); // Mengambil ID dari URL untuk proses edit

    // State untuk menampung data departemen
    const [formData, setFormData] = useState({
        kode: '',
        nama: '',
        kepala: '',
        status: '1',
        keterangan: ''
    });

    // Simulasi pengambilan data dari API
    useEffect(() => {
        // Di sini Anda biasanya melakukan fetch data berdasarkan ID
        // Contoh data hasil fetch:
        setFormData({
            kode: 'DEP-001',
            nama: 'Engineering',
            kepala: '2', // ID Kepala
            status: '1',
            keterangan: 'Departemen yang menangani proyek konstruksi dan teknis.'
        });
    }, [id]);

    const handleUpdate = (e) => {
        e.preventDefault();
        console.log("Mengupdate data departemen:", formData);
        // Logika update ke API di sini
    };

    return (
        <PortalLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Edit Departemen</h1>
                        <div className="flex items-center gap-2 mt-1 text-sm">
                            <span className="text-gray-400">Master Data</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-gray-400">Data Departemen</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-blue-600 font-medium">Edit Departemen</span>
                        </div>
                    </div>
                    <button 
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 h-10 px-4 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium bg-white hover:bg-gray-50 transition"
                    >
                        <ArrowLeft size={16} /> Kembali
                    </button>
                </div>

                {/* Form Section */}
                <form onSubmit={handleUpdate} className="bg-white border border-gray-200 rounded-xl p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-6">Informasi Departemen</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Kode Departemen */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Kode Departemen *</label>
                            <input
                                type="text"
                                defaultValue={formData.kode}
                                className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        {/* Nama Departemen */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Nama Departemen *</label>
                            <input
                                type="text"
                                defaultValue={formData.nama}
                                className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        {/* Kepala Departemen */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Kepala Departemen</label>
                            <select 
                                value={formData.kepala} 
                                onChange={(e) => setFormData({...formData, kepala: e.target.value})}
                                className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">-- Pilih Kepala Departemen --</option>
                                <option value="1">Budi Santoso</option>
                                <option value="2">Siti Aminah</option>
                            </select>
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Status Aktif</label>
                            <select 
                                value={formData.status}
                                onChange={(e) => setFormData({...formData, status: e.target.value})}
                                className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="1">Aktif</option>
                                <option value="0">Tidak Aktif</option>
                            </select>
                        </div>

                        {/* Keterangan */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Keterangan</label>
                            <textarea
                                defaultValue={formData.keterangan}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500"
                                rows="3"
                            ></textarea>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center gap-3 mt-8 pt-6 border-t border-gray-100">
                        <button
                            type="submit"
                            className="flex items-center gap-2 h-11 px-6 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
                        >
                            <Save size={16} /> Simpan Perubahan
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/portal/master/departments')}
                            className="flex items-center gap-2 h-11 px-6 rounded-lg border border-gray-300 text-sm font-medium hover:bg-gray-50 transition"
                        >
                            <X size={16} /> Batal
                        </button>
                    </div>
                </form>
            </div>
        </PortalLayout>
    );
}