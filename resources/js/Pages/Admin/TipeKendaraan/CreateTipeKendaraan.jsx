import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { Save, X, ArrowLeft } from 'lucide-react';
import { useCreateTipeKendaraan } from './Hooks/useCreateTipeKendaraan';
// Tambahkan hook untuk mengambil data list unit
import { useUnitKendaraanList } from '../UnitKendaraan/Hooks/useUnitKendaraanList'; 

export default function CreateUnitKendaraan() {
    const navigate = useNavigate();
    const mutation = useCreateTipeKendaraan();
    
    // 1. Ambil data unit dari API
    const { data: listUnit, isLoading: loadingUnit } = useUnitKendaraanList({ limit: 100 });
    const units = listUnit?.data?.data || [];

    const [formData, setFormData] = useState({
        KodeUnit: '',
        KodeType: '',
        Type: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        Swal.fire({
            title: 'Simpan Data?',
            text: "Pastikan data Tipe Kendaraan sudah benar.",
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
                            text: 'Data Tipe kendaraan telah disimpan.',
                            icon: 'success',
                            timer: 2000,
                            showConfirmButton: false
                        });
                        navigate('/portal/master/tipe-kendaraan');
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
                        <h1 className="text-2xl font-semibold text-slate-800">Tambah Tipe Kendaraan</h1>

                        <div className="flex items-center gap-2 mt-1 text-sm">
                            <span className="text-slate-400">
                                Master Data
                            </span>

                            <span className="text-slate-300">
                                /
                            </span>

                            <span className="text-slate-400">
                                Tipe Kendaraan
                            </span>

                            <span className="text-slate-300">
                                /
                            </span>

                            <span className="text-blue-600 font-medium">
                                Tambah Tipe Kendaraan
                            </span>
                        </div>
                    </div>
                    <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 h-10 px-4 rounded-lg border border-slate-300 bg-white text-slate-700 text-sm font-medium hover:bg-slate-50 transition">
                        <ArrowLeft size={16} /> Kembali
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        
                        {/* Kode Unit (Diubah menjadi Select) */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Pilih Kode Unit *</label>
                            <select
                                required
                                value={formData.KodeUnit}
                                onChange={(e) => setFormData({...formData, KodeUnit: e.target.value})}
                                className="w-full h-11 rounded-lg border border-slate-300 px-4 text-sm bg-white"
                                disabled={loadingUnit}
                            >
                                <option value="">-- Choose Option --</option>
                                {units.map((u) => (
                                    <option key={u.id} value={u.Kode}>
                                        {u.Kode} - {u.Unit}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Kode Type */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Kode Type *</label>
                            <input
                                type="text"
                                required
                                value={formData.KodeType}
                                onChange={(e) => setFormData({...formData, KodeType: e.target.value})}
                                placeholder="Contoh : UNT001"
                                className="w-full h-11 rounded-lg border border-slate-300 px-4 text-sm"
                            />
                        </div>

                        {/* Nama Tipe (Tipe Kendaraan) */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Nama Tipe Kendaraan *</label>
                            <input
                                type="text"
                                required
                                value={formData.Type}
                                onChange={(e) => setFormData({...formData, Type: e.target.value})}
                                placeholder="Contoh : Dump Truck"
                                className="w-full h-11 rounded-lg border border-slate-300 px-4 text-sm"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3 mt-8 pt-6 border-t border-slate-200">
                        <button type="submit" disabled={mutation.isPending} className="bg-blue-600 text-white px-6 h-11 rounded-lg text-sm font-medium hover:bg-blue-700">
                            {mutation.isPending ? 'Menyimpan...' : 'Simpan Data'}
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