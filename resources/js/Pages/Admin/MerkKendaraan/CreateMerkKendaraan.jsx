import React, { useState } from 'react'; // 1. Tambahkan useState
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { Save, X, ArrowLeft } from 'lucide-react';
import { useCreateMerkKendaraan } from './Hooks/useCreateMerkKendaraan';

export default function CreateMerkKendaraan() {
    const navigate = useNavigate();
    const mutation = useCreateMerkKendaraan(); // 3. Panggil hook mutasi

    // 4. Buat state untuk form
    const [formData, setFormData] = useState({
        KodeMerk: '',
        Merk: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        Swal.fire({
            title: 'Simpan Data?',
            text: "Pastikan data Merk Kendaraan sudah benar.",
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
                            text: 'Data Merk Kendaraan telah disimpan.',
                            icon: 'success',
                            timer: 2000,
                            showConfirmButton: false
                        });
                        navigate('/portal/master/merk-kendaraan');
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
                        <h1 className="text-2xl font-semibold text-slate-800">Tambah Merk Kendaraan</h1>

                        <div className="flex items-center gap-2 mt-1 text-sm">
                            <span className="text-slate-400">
                                Master Data
                            </span>

                            <span className="text-slate-300">
                                /
                            </span>

                            <span className="text-slate-400">
                                Merk Kendaraan
                            </span>

                            <span className="text-slate-300">
                                /
                            </span>

                            <span className="text-blue-600 font-medium">
                                Tambah Merk Kendaraan
                            </span>
                        </div>
                    </div>
                    <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 h-10 px-4 rounded-lg border border-slate-300 bg-white text-slate-700 text-sm font-medium hover:bg-slate-50 transition">
                        <ArrowLeft size={16} /> Kembali
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Kode Merk */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Kode Merk *</label>
                            <input
                                type="text"
                                required
                                value={formData.KodeMerk}
                                onChange={(e) => setFormData({...formData, KodeMerk: e.target.value})}
                                placeholder="Contoh : UNT001"
                                className="w-full h-11 rounded-lg border border-slate-300 px-4 text-sm"
                            />
                        </div>

                        {/* Merk Kendaraan */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Merk Kendaraan *</label>
                            <input
                                type="text"
                                required
                                value={formData.Merk}
                                onChange={(e) => setFormData({...formData, Merk: e.target.value})}
                                placeholder="Contoh : Trucking Jakarta"
                                className="w-full h-11 rounded-lg border border-slate-300 px-4 text-sm"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3 mt-8 pt-6 border-t border-slate-200">
                        <button
                            type="submit"
                            disabled={mutation.isPending} // Disable tombol saat loading
                            className="flex items-center gap-2 h-11 px-6 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
                        >
                            <Save size={16} /> {mutation.isPending ? 'Menyimpan...' : 'Simpan Data'}
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/portal/master/merk-kendaraan')}
                            className="flex items-center gap-2 h-11 px-6 rounded-lg border border-slate-300 bg-white text-slate-700 text-sm font-medium hover:bg-slate-50 transition"
                        >
                            <X size={16} /> Batal
                        </button>
                    </div>
                </form>
            </div>
        </PortalLayout>
    );
}