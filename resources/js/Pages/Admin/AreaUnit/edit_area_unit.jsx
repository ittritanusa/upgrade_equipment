import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { Save, ArrowLeft } from 'lucide-react';
// Sesuaikan import hook sesuai proyek Anda
import { useDetailAreaUnit, useUpdateAreaUnit } from './Hooks/useEditAreaUnit'; 
import { useUnitBisnisList } from '../UnitBisnis/Hooks/useUnitBisnisList';
import { decodeId } from '@/Utils/Helpers/IdHelper';

export default function EditAreaUnit() {
    const navigate = useNavigate();
    const { id: encodedId } = useParams();
    const [realId, setRealId] = useState(null);
    
    useEffect(() => {
        const decoded = decodeId(encodedId);
        if (!decoded) navigate('/portal/master/area-unit');
        setRealId(decoded);
    }, [encodedId, navigate]);
    
    const updateMutation = useUpdateAreaUnit();
    
    // Ambil data Unit Bisnis untuk dropdown
    const { data: listUnitBisnis, isLoading: loadingUnitBisnis } = useUnitBisnisList({ limit: 100 });
    const unitBisnises = listUnitBisnis?.data || [];

    const [formData, setFormData] = useState({
        UnitBisnis: '',
        Area: '',
        Lokasi: '',
        Keterangan: '',
        Status: '',
    });

    // 2. Ambil detail data berdasarkan ID
    const { data: detailData, isLoading } = useDetailAreaUnit(realId);

    // 3. Isi form ketika data detail sudah didapat
    useEffect(() => {
        if (detailData) {
            setFormData({
                UnitBisnis: detailData.UnitBisnis || '',
                Area: detailData.Area || '',
                Lokasi: detailData.Lokasi || '',
                Keterangan: detailData.Keterangan || '',
            });
        }
    }, [detailData]);

    const handleSubmit = (e) => {
        e.preventDefault();

        Swal.fire({
            title: 'Update Data?',
            text: "Pastikan data Area Unit yang diubah sudah benar.",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#2563eb',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Ya, Update!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                updateMutation.mutate({ id: realId, payload: formData }, {
                    onSuccess: () => {
                        Swal.fire('Berhasil!', 'Data Area Unit telah diperbarui.', 'success');
                        navigate(-1);
                    },
                    onError: (error) => {
                        Swal.fire('Gagal!', error?.response?.data?.message || 'Terjadi kesalahan.', 'error');
                    }
                });
            }
        });
    };

    if (isLoading) return <PortalLayout>Loading...</PortalLayout>;

    return (
        <PortalLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-slate-800">Edit Area Unit</h1>
                        <p className="text-sm text-slate-500 mt-1">Ubah informasi area unit yang ada.</p>
                    </div>
                    <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 h-10 px-4 rounded-lg border border-slate-300 bg-white text-slate-700 text-sm font-medium hover:bg-slate-50 transition">
                        <ArrowLeft size={16} /> Kembali
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Area *</label>
                            <input
                                type="text"
                                required
                                value={formData.Area}
                                onChange={(e) => setFormData({...formData, Area: e.target.value})}
                                className="w-full h-11 rounded-lg border border-slate-300 px-4 text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Lokasi *</label>
                            <input
                                type="text"
                                required
                                value={formData.Lokasi}
                                onChange={(e) => setFormData({...formData, Lokasi: e.target.value})}
                                className="w-full h-11 rounded-lg border border-slate-300 px-4 text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Status *</label>
                            <select value={formData.Status} onChange={(e) => setFormData({...formData, Status: e.target.value})} className="w-full h-11 rounded-lg border px-4">
                                <option value="1">Aktif</option>
                                <option value="2">Tidak Aktif</option>
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1 text-slate-700">Keterangan *</label>
                            <textarea
                                required
                                rows="3"
                                className="w-full rounded-lg border border-slate-300 p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={formData.Keterangan}
                                onChange={(e) => setFormData({...formData, Keterangan: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3 mt-8 pt-6 border-t border-slate-200">
                        <button
                            type="submit"
                            disabled={updateMutation.isPending}
                            className="flex items-center gap-2 h-11 px-6 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
                        >
                            <Save size={16} /> {updateMutation.isPending ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </button>
                    </div>
                </form>
            </div>
        </PortalLayout>
    );
}