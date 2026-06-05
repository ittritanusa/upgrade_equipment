import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { Save, X, ArrowLeft } from 'lucide-react';
import { useCreateKendaraan } from './Hooks/useCreateKendaraan';
import { useUnitKendaraanList } from '../UnitKendaraan/Hooks/useUnitKendaraanList'; 
import { useTipeKendaraanList } from '../TipeKendaraan/Hooks/useTipeKendaraanList'; 
import { useMerkKendaraanList } from '../MerkKendaraan/Hooks/useMerkKendaraanList';

export default function CreateKendaraan() {
    const navigate = useNavigate();
    const mutation = useCreateKendaraan();
    
    // 1. Ambil data unit dari API
    const { data: listUnit, isLoading: loadingUnit } = useUnitKendaraanList({ limit: 100 });
    const { data: listType, isLoading: loadingType } = useTipeKendaraanList({ limit: 100 });
    const { data: listMerk, isLoading: loadingMerk } = useMerkKendaraanList({ limit: 100 });
    const units = listUnit?.data || [];
    const type  = listType?.data || [];
    const merk  = listMerk?.data || [];

    const [formData, setFormData] = useState({
        TypeUnit: '',
        MerkTypeUnit: '',
        TypeKendaraan: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        Swal.fire({
            title: 'Simpan Data?',
            text: "Pastikan data Kendaraan sudah benar.",
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
                            text: 'Data kendaraan telah disimpan.',
                            icon: 'success',
                            timer: 2000,
                            showConfirmButton: false
                        });
                        navigate('/portal/master/kendaraan');
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
                        
                        {/* Kode Unit */}
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

                        {/* Merk Kendaraan */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Pilih Merk Kendaraan *</label>
                            <select
                                required
                                value={formData.MerkTypeUnit}
                                onChange={(e) => setFormData({...formData, MerkTypeUnit: e.target.value})}
                                className="w-full h-11 rounded-lg border border-slate-300 px-4 text-sm bg-white"
                                disabled={loadingMerk}
                            >
                                <option value="">-- Choose Option --</option>
                                {merk.map((u) => (
                                    <option key={u.id} value={u.KodeMerk}>
                                        {u.KodeMerk} - {u.Merk}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Tipe Kendaraan */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Pilih Tipe Kendaraan *</label>
                            <select
                                required
                                value={formData.TypeKendaraan}
                                onChange={(e) => setFormData({...formData, TypeKendaraan: e.target.value})}
                                className="w-full h-11 rounded-lg border border-slate-300 px-4 text-sm bg-white"
                                disabled={loadingType}
                            >
                                <option value="">-- Choose Option --</option>
                                {type.map((u) => (
                                    <option key={u.id} value={u.KodeType}>
                                        {u.KodeType} - {u.Merk}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Tahun Pembuatan */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Tahun Pembuatan *</label>
                            <input
                                type="text"
                                required
                                value={formData.TahunPembuatan}
                                onChange={(e) => setFormData({...formData, TahunPembuatan: e.target.value})}
                                placeholder="Contoh : 2018"
                                className="w-full h-11 rounded-lg border border-slate-300 px-4 text-sm"
                            />
                        </div>

                        {/* No Rangka */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">No Rangka *</label>
                            <input
                                type="text"
                                required
                                value={formData.NoRangka}
                                onChange={(e) => setFormData({...formData, NoRangka: e.target.value})}
                                placeholder="Contoh : 2018"
                                className="w-full h-11 rounded-lg border border-slate-300 px-4 text-sm"
                            />
                        </div>

                        {/* No Mesin */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">No Mesin *</label>
                            <input
                                type="text"
                                required
                                value={formData.NoMesin}
                                onChange={(e) => setFormData({...formData, NoMesin: e.target.value})}
                                placeholder="Contoh : 2018"
                                className="w-full h-11 rounded-lg border border-slate-300 px-4 text-sm"
                            />
                        </div>

                        {/* No Lambung */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">No Lambung *</label>
                            <input
                                type="text"
                                required
                                value={formData.NoLambung}
                                onChange={(e) => setFormData({...formData, NoLambung: e.target.value})}
                                placeholder="Contoh : 2018"
                                className="w-full h-11 rounded-lg border border-slate-300 px-4 text-sm"
                            />
                        </div>

                        {/* No KIR I */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">No KIR I *</label>
                            <input
                                type="text"
                                required
                                value={formData.NoKIR}
                                onChange={(e) => setFormData({...formData, NoKIR: e.target.value})}
                                placeholder="Contoh : 2018"
                                className="w-full h-11 rounded-lg border border-slate-300 px-4 text-sm"
                            />
                        </div>

                        {/* No KIR II */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">No KIR II *</label>
                            <input
                                type="text"
                                required
                                value={formData.NoKIR2}
                                onChange={(e) => setFormData({...formData, NoKIR2: e.target.value})}
                                placeholder="Contoh : 2018"
                                className="w-full h-11 rounded-lg border border-slate-300 px-4 text-sm"
                            />
                        </div>

                        {/* No Polisi */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">No Polisi *</label>
                            <input
                                type="text"
                                required
                                value={formData.NoPolisi}
                                onChange={(e) => setFormData({...formData, NoPolisi: e.target.value})}
                                placeholder="Contoh : 2018"
                                className="w-full h-11 rounded-lg border border-slate-300 px-4 text-sm"
                            />
                        </div>

                        {/* No BPKB */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">No BPKB *</label>
                            <input
                                type="text"
                                required
                                value={formData.NoBPKB}
                                onChange={(e) => setFormData({...formData, NoBPKB: e.target.value})}
                                placeholder="Contoh : 2018"
                                className="w-full h-11 rounded-lg border border-slate-300 px-4 text-sm"
                            />
                        </div>

                        {/* Pengesahan KIR */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Pengesahan KIR *</label>
                            <input
                                type="text"
                                required
                                value={formData.PengesahanKIR}
                                onChange={(e) => setFormData({...formData, PengesahanKIR: e.target.value})}
                                placeholder="Contoh : 2018"
                                className="w-full h-11 rounded-lg border border-slate-300 px-4 text-sm"
                            />
                        </div>

                        {/* Expired KIR */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Expired KIR *</label>
                            <input
                                type="text"
                                required
                                value={formData.ExpiredKIR}
                                onChange={(e) => setFormData({...formData, ExpiredKIR: e.target.value})}
                                placeholder="Contoh : 2018"
                                className="w-full h-11 rounded-lg border border-slate-300 px-4 text-sm"
                            />
                        </div>

                        {/* Pengesahan KIR II */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Pengesahan KIR II *</label>
                            <input
                                type="text"
                                required
                                value={formData.PengesahanKIR2}
                                onChange={(e) => setFormData({...formData, PengesahanKIR2: e.target.value})}
                                placeholder="Contoh : 2018"
                                className="w-full h-11 rounded-lg border border-slate-300 px-4 text-sm"
                            />
                        </div>

                        {/* Expired KIR II */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Expired KIR II *</label>
                            <input
                                type="text"
                                required
                                value={formData.ExpiredKIR2}
                                onChange={(e) => setFormData({...formData, ExpiredKIR2: e.target.value})}
                                placeholder="Contoh : 2018"
                                className="w-full h-11 rounded-lg border border-slate-300 px-4 text-sm"
                            />
                        </div>

                        {/* Pengesahan STNK */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Pengesahan STNK *</label>
                            <input
                                type="text"
                                required
                                value={formData.PengesahanSTNK}
                                onChange={(e) => setFormData({...formData, PengesahanSTNK: e.target.value})}
                                placeholder="Contoh : 2018"
                                className="w-full h-11 rounded-lg border border-slate-300 px-4 text-sm"
                            />
                        </div>

                        {/* Expired STNK */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Expired STNK *</label>
                            <input
                                type="text"
                                required
                                value={formData.ExpiredSTNK}
                                onChange={(e) => setFormData({...formData, ExpiredSTNK: e.target.value})}
                                placeholder="Contoh : 2018"
                                className="w-full h-11 rounded-lg border border-slate-300 px-4 text-sm"
                            />
                        </div>

                        {/* Pengesahan TAX */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Pengesahan TAX *</label>
                            <input
                                type="text"
                                required
                                value={formData.PengesahanTAX}
                                onChange={(e) => setFormData({...formData, PengesahanTAX: e.target.value})}
                                placeholder="Contoh : 2018"
                                className="w-full h-11 rounded-lg border border-slate-300 px-4 text-sm"
                            />
                        </div>

                        {/* Expired TAX */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Expired TAX *</label>
                            <input
                                type="text"
                                required
                                value={formData.ExpiredTAX}
                                onChange={(e) => setFormData({...formData, ExpiredTAX: e.target.value})}
                                placeholder="Contoh : 2018"
                                className="w-full h-11 rounded-lg border border-slate-300 px-4 text-sm"
                            />
                        </div>

                        {/* Keterangan */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Keterangan *</label>
                            <input
                                type="text"
                                required
                                value={formData.Keterangan}
                                onChange={(e) => setFormData({...formData, Keterangan: e.target.value})}
                                placeholder="Contoh : 2018"
                                className="w-full h-11 rounded-lg border border-slate-300 px-4 text-sm"
                            />
                        </div>

                        {/* Bahan Bakar */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Bahan Bakar *</label>
                            <input
                                type="text"
                                required
                                value={formData.BahanBakar}
                                onChange={(e) => setFormData({...formData, BahanBakar: e.target.value})}
                                placeholder="Contoh : 2018"
                                className="w-full h-11 rounded-lg border border-slate-300 px-4 text-sm"
                            />
                        </div>

                        {/* Keterangan Status */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Keterangan Status *</label>
                            <input
                                type="text"
                                required
                                value={formData.KeteranganStatus}
                                onChange={(e) => setFormData({...formData, KeteranganStatus: e.target.value})}
                                placeholder="Contoh : 2018"
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