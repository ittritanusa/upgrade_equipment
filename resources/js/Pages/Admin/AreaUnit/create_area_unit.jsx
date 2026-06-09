import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { Save, X, ArrowLeft } from 'lucide-react';
import { useCreateAreaUnit } from './Hooks/useCreateAreaUnit';
// Tambahkan hook untuk mengambil data list unit
import { useUnitBisnisList } from '../UnitBisnis/Hooks/useUnitBisnisList';

export default function CreateAreaUnit() {
    const navigate = useNavigate();
    const mutation = useCreateAreaUnit();
    
    // Ambil data Unit Bisnis dari API
    const { data: listUnitBisnis, isLoading: loadingUnitBisnis } = useUnitBisnisList({ limit: 100 });
    const unitBisnises = listUnitBisnis?.data || [];

    const [formData, setFormData] = useState({
        UnitBisnis: '',
        Area: '',
        Lokasi: '',
        Keterangan: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        Swal.fire({
            title: 'Simpan Data?',
            text: "Pastikan data Area Unit sudah benar.",
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
                            text: 'Data Area Unit telah disimpan.',
                            icon: 'success',
                            timer: 2000,
                            showConfirmButton: false
                        });
                        navigate('/portal/master/area-unit');
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
                        <h1 className="text-2xl font-semibold text-slate-800">Tambah Area Unit</h1>

                        <div className="flex items-center gap-2 mt-1 text-sm">
                            <span className="text-slate-400">
                                Master Data
                            </span>

                            <span className="text-slate-300">
                                /
                            </span>

                            <span className="text-slate-400">
                                Area Unit
                            </span>

                            <span className="text-slate-300">
                                /
                            </span>

                            <span className="text-blue-600 font-medium">
                                Tambah Area Unit
                            </span>
                        </div>
                    </div>
                    <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 h-10 px-4 rounded-lg border border-slate-300 bg-white text-slate-700 text-sm font-medium hover:bg-slate-50 transition">
                        <ArrowLeft size={16} /> Kembali
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        
                        {/* Unit Bisnis */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Pilih Unit Bisnis *</label>
                            <select
                                required
                                value={formData.UnitBisnis}
                                onChange={(e) => setFormData({...formData, UnitBisnis: e.target.value})}
                                className="w-full h-11 rounded-lg border border-slate-300 px-4 text-sm bg-white"
                                disabled={loadingUnitBisnis}
                            >
                                <option value="">-- Choose Option --</option>
                                {unitBisnises.map((u) => (
                                    <option key={u.id} value={u.KodeUnitBisnis}>
                                        {u.KodeUnitBisnis} - {u.UnitBisnis}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Area */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Area *</label>
                            <input
                                type="text"
                                required
                                value={formData.Area}
                                onChange={(e) => setFormData({...formData, Area: e.target.value})}
                                placeholder="Contoh : JAKARTA"
                                className="w-full h-11 rounded-lg border border-slate-300 px-4 text-sm"
                            />
                        </div>

                        {/* Lokasi */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Lokasi *</label>
                            <input
                                type="text"
                                required
                                value={formData.Lokasi}
                                onChange={(e) => setFormData({...formData, Lokasi: e.target.value})}
                                placeholder="Contoh : LEGOK"
                                className="w-full h-11 rounded-lg border border-slate-300 px-4 text-sm"
                            />
                        </div>

                        <div className="md:col-span-3">
                            <label className="block text-sm font-medium mb-1 text-slate-700">Keterangan *</label>
                            <textarea
                                required
                                rows="3"
                                className="w-full rounded-lg border border-slate-300 p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={formData.Keterangan}
                                onChange={(e) => setFormData({...formData, Keterangan: e.target.value})}
                                placeholder="Masukkan keterangan..."
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