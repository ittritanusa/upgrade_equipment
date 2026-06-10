import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { Save, X, ArrowLeft } from 'lucide-react';
import { useCreateKodePos } from './Hooks/useCreateKodePos';

export default function CreateKodePos() {
    const navigate = useNavigate();
    const mutation = useCreateKodePos();

    const [formData, setFormData] = useState({
        provinsi: '',
        kota: '',
        kecamatan: '',
        kelurahan: '',
        kodepos: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        Swal.fire({
            title: 'Simpan Data?',
            text: "Pastikan data Kode Pos sudah benar.",
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
                            text: 'Data Kode Pos telah disimpan.',
                            icon: 'success',
                            timer: 2000,
                            showConfirmButton: false
                        });
                        navigate('/portal/master/kode-pos');
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
                        <h1 className="text-2xl font-semibold text-slate-800">Tambah Kode Pos</h1>

                        <div className="flex items-center gap-2 mt-1 text-sm">
                            <span className="text-slate-400">
                                Master Data
                            </span>

                            <span className="text-slate-300">
                                /
                            </span>

                            <span className="text-slate-400">
                                Kode Pos
                            </span>

                            <span className="text-slate-300">
                                /
                            </span>

                            <span className="text-blue-600 font-medium">
                                Tambah Kode Pos
                            </span>
                        </div>
                    </div>
                    <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 h-10 px-4 rounded-lg border border-slate-300 bg-white text-slate-700 text-sm font-medium hover:bg-slate-50 transition">
                        <ArrowLeft size={16} /> Kembali
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Provinsi */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Provinsi *</label>
                            <input
                                type="text"
                                required
                                value={formData.provinsi}
                                onChange={(e) => setFormData({...formData, provinsi: e.target.value})}
                                placeholder="Contoh : DKI Jakarta"
                                className="w-full h-11 rounded-lg border border-slate-300 px-4 text-sm"
                            />
                        </div>

                        {/* Kota */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Kota *</label>
                            <input
                                type="text"
                                required
                                value={formData.kota}
                                onChange={(e) => setFormData({...formData, kota: e.target.value})}
                                placeholder="Contoh : Jakarta Pusat"
                                className="w-full h-11 rounded-lg border border-slate-300 px-4 text-sm"
                            />
                        </div>

                        {/* Kecamatan */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Kecamatan *</label>
                            <input
                                type="text"
                                required
                                value={formData.kecamatan}
                                onChange={(e) => setFormData({...formData, kecamatan: e.target.value})}
                                placeholder="Contoh : Menteng"
                                className="w-full h-11 rounded-lg border border-slate-300 px-4 text-sm"
                            />
                        </div>

                        {/* Kelurahan */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Kelurahan *</label>
                            <input
                                type="text"
                                required
                                value={formData.kelurahan}
                                onChange={(e) => setFormData({...formData, kelurahan: e.target.value})}
                                placeholder="Contoh : Menteng"
                                className="w-full h-11 rounded-lg border border-slate-300 px-4 text-sm"
                            />
                        </div>

                        {/* Kode Pos */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Kode Pos *</label>
                            <input
                                type="text"
                                required
                                value={formData.kodepos}
                                onChange={(e) => setFormData({...formData, kodepos: e.target.value})}
                                placeholder="Contoh : 12345"
                                className="w-full h-11 rounded-lg border border-slate-300 px-4 text-sm"
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