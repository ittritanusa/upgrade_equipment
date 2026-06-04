import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { Save, X, ArrowLeft } from 'lucide-react';
import { useCreateTireTypeKendaraan } from './Hooks/useCreateTireTypeKendaraan';
// hook untuk mengambil data list tipe kendaraan
import { useTipeKendaraanList } from '../TipeKendaraan/Hooks/useTipeKendaraanList'; 

export default function CreateTireTypeKendaraan() {
    const navigate = useNavigate();
    const mutation = useCreateTireTypeKendaraan();
    
    const { data: listType, isLoading: loadingType } = useTipeKendaraanList({ limit: 100 });
    const units = listType?.data || [];

    const [formData, setFormData] = useState({
        KodeType: '',
        Tire: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        Swal.fire({
            title: 'Simpan Data?',
            text: "Pastikan data Tire Type Kendaraan sudah benar.",
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
                            text: 'Data Tire Type Kendaraan telah disimpan.',
                            icon: 'success',
                            timer: 2000,
                            showConfirmButton: false
                        });
                        navigate('/portal/master/tire-type');
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
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-slate-800">Tambah Tire Type Kendaraan</h1>

                        <div className="flex items-center gap-2 mt-1 text-sm">
                            <span className="text-slate-400">
                                Master Data
                            </span>

                            <span className="text-slate-300">
                                /
                            </span>

                            <span className="text-slate-400">
                                Tire Type Kendaraan
                            </span>

                            <span className="text-slate-300">
                                /
                            </span>

                            <span className="text-blue-600 font-medium">
                                Tambah Tire Type Kendaraan
                            </span>
                        </div>
                    </div>
                    <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 h-10 px-4 rounded-lg border border-slate-300 bg-white text-slate-700 text-sm font-medium hover:bg-slate-50 transition">
                        <ArrowLeft size={16} /> Kembali
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Tipe Kendaraan */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Pilih Tipe Kendaraan *</label>
                            <select
                                required
                                value={formData.KodeType}
                                onChange={(e) => setFormData({...formData, KodeType: e.target.value})}
                                className="w-full h-11 rounded-lg border border-slate-300 px-4 text-sm bg-white"
                                disabled={loadingType}
                            >
                                <option value="">-- Choose Option --</option>
                                {units.map((u) => (
                                    <option key={u.id} value={u.KodeType}>
                                        {u.KodeType} - {u.Type}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Jumlah Tire */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Jumlah Tire *</label>
                            <input
                                type="text"
                                required
                                value={formData.Tire}
                                onChange={(e) => setFormData({...formData, Tire: e.target.value})}
                                placeholder="Contoh : UNT001"
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
                        <button type="button" onClick={() => navigate(-1)} className="border border-slate-300 px-6 h-11 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
                            Batal
                        </button>
                    </div>
                </form>
            </div>
        </PortalLayout>
    );
}