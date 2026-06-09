import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { Save, ArrowLeft } from 'lucide-react';
// Sesuaikan import hook sesuai proyek Anda
import { useDetailUnitBisnis, useUpdateUnitBisnis } from './Hooks/useEditUnitBisnis'; 
import { decodeId } from '@/Utils/Helpers/IdHelper';

export default function EditUnitBisnis() {
    const navigate = useNavigate();
    const { id: encodedId } = useParams();
    const [realId, setRealId] = useState(null);
    
    useEffect(() => {
        const decoded = decodeId(encodedId);
        if (!decoded) navigate('/portal/master/unit-bisnis');
        setRealId(decoded);
    }, [encodedId, navigate]);
    
    const updateMutation = useUpdateUnitBisnis();

    const [formData, setFormData] = useState({
        KodeUnitBisnis: '',
        UnitBisnis: '',
        Status: '',
    });

    // 2. Ambil detail data berdasarkan ID
    const { data: detailData, isLoading } = useDetailUnitBisnis(realId);

    // 3. Isi form ketika data detail sudah didapat
    useEffect(() => {
        if (detailData) {
            setFormData({
                KodeUnitBisnis: detailData.KodeUnitBisnis || '',
                UnitBisnis: detailData.UnitBisnis || '',
                Status: detailData.Status || '',
            });
        }
    }, [detailData]);

    const handleSubmit = (e) => {
        e.preventDefault();

        Swal.fire({
            title: 'Update Data?',
            text: "Pastikan data Unit Bisnis yang diubah sudah benar.",
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
                        Swal.fire('Berhasil!', 'Data Unit Bisnis telah diperbarui.', 'success');
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
                        <h1 className="text-2xl font-semibold text-slate-800">Edit Unit Bisnis</h1>
                        <p className="text-sm text-slate-500 mt-1">Ubah informasi Unit Bisnis yang ada.</p>
                    </div>
                    <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 h-10 px-4 rounded-lg border border-slate-300 bg-white text-slate-700 text-sm font-medium hover:bg-slate-50 transition">
                        <ArrowLeft size={16} /> Kembali
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Kode Unit Bisnis *</label>
                            <input
                                type="text"
                                required
                                value={formData.KodeUnitBisnis}
                                onChange={(e) => setFormData({...formData, KodeUnitBisnis: e.target.value})}
                                className="w-full h-11 rounded-lg border border-slate-300 px-4 text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Unit Bisnis *</label>
                            <input
                                type="text"
                                required
                                value={formData.UnitBisnis}
                                onChange={(e) => setFormData({...formData, UnitBisnis: e.target.value})}
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