import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { Save, X, ArrowLeft } from 'lucide-react';
import { useCreateCategorySparepart } from './Hooks/useCreateCategorySparepart';

export default function CreateCategorySparepart() {
    const navigate = useNavigate();
    const mutation = useCreateCategorySparepart();

    const [formData, setFormData] = useState({
        category_code: '',
        category_name: '',
        description: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        Swal.fire({
            title: 'Simpan Data?',
            text: "Pastikan data Kategori Sparepart sudah benar.",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#2563eb',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Ya, Simpan!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                // Jalankan mutasi
                mutation.mutate(formData, {
                    onSuccess: () => {
                        Swal.fire({
                            title: 'Berhasil!',
                            text: 'Data Kategori Sparepart telah disimpan.',
                            icon: 'success',
                            timer: 2000,
                            showConfirmButton: false
                        });
                        navigate('/portal/master/category-sparepart');
                    },
                    onError: (error) => {
                        Swal.fire({
                            title: 'Gagal!',
                            text: error?.response?.data?.message || 'Terjadi kesalahan saat menyimpan data.',
                            icon: 'error',
                            confirmButtonText: 'Ok'
                        });
                    }
                });
            }
        });
    };

    return (
        <PortalLayout>
            <div className="space-y-6">
                {/* Header (Sama seperti sebelumnya) */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-slate-800">Tambah Kategori Sparepart</h1>

                        <div className="flex items-center gap-2 mt-1 text-sm">
                            <span className="text-slate-400">
                                Master Data
                            </span>

                            <span className="text-slate-300">
                                /
                            </span>

                            <span className="text-slate-400">
                                Kategori Sparepart
                            </span>

                            <span className="text-slate-300">
                                /
                            </span>

                            <span className="text-blue-600 font-medium">
                                Tambah Kategori Sparepart
                            </span>
                        </div>
                    </div>
                    <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 h-10 px-4 rounded-lg border border-slate-300 bg-white text-slate-700 text-sm font-medium hover:bg-slate-50 transition">
                        <ArrowLeft size={16} /> Kembali
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Kode Kategori */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Kode Kategori *</label>
                            <input
                                type="text"
                                required
                                value={formData.category_code}
                                onChange={(e) => setFormData({...formData, category_code: e.target.value})}
                                placeholder="Input kode kategori sparepart, contoh: SP-001"
                                className="w-full h-11 rounded-lg border border-slate-300 px-4 text-sm"
                            />
                        </div>

                        {/* Nama Kategori */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Nama Kategori *</label>
                            <input
                                type="text"
                                required
                                value={formData.category_name}
                                onChange={(e) => setFormData({...formData, category_name: e.target.value})}
                                placeholder="Input nama kategori sparepart, contoh: Rem"
                                className="w-full h-11 rounded-lg border border-slate-300 px-4 text-sm"
                            />
                        </div>

                        {/* Deskripsi */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-2">Deskripsi</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                placeholder="Deskripsi tambahan tentang kategori sparepart (opsional)"
                                className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm h-24 resize-none"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3 mt-8 pt-6 border-t border-slate-200">
                        <button
                            type="submit"
                            disabled={mutation.isPending}
                            className="flex items-center gap-2 h-11 px-6 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
                        >
                            <Save size={16} /> {mutation.isPending ? 'Menyimpan...' : 'Simpan Data'}
                        </button>
                        <button type="button" onClick={() => navigate(-1)} className="border border-slate-300 px-6 h-11 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
                            Batal
                        </button>
                    </div>
                </form>
            </div>
        </PortalLayout>
    );
}