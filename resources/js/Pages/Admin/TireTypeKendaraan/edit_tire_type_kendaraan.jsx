import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { Save, X, ArrowLeft } from 'lucide-react';
import { decodeId } from '@/Utils/Helpers/IdHelper';
import { useTireTypeKendaraanDetail, useUpdateTireTypeKendaraan } from './Hooks/useEditTireTypeKendaraan';
import { useTipeKendaraanList } from '../TipeKendaraan/Hooks/useTipeKendaraanList'; 

export default function EditTireTypeKendaraan() {
    const navigate = useNavigate();
    const { id: encodedId } = useParams();
    const [realId, setRealId] = useState(null);

    const updateMutation = useUpdateTireTypeKendaraan();
    const { data: listType, isLoading: loadingType } = useTipeKendaraanList({ limit: 100 });
    const tipe = listType?.data || [];

    const [formData, setFormData] = useState({
        KodeType: '',
        Tire: '',
        Status: '1',
    });

    useEffect(() => {
        const decoded = decodeId(encodedId);
        if (!decoded) {
            navigate('/portal/master/tire-type');
            return;
        }
        setRealId(decoded);
    }, [encodedId, navigate]);

    const { data, isLoading } = useTireTypeKendaraanDetail(realId);

    useEffect(() => {
        if (data) {
            setFormData({
                KodeType: data.KodeType || '',
                Tire: data.Tire || '',
                Status: String(data.Status ?? '1'),
            });
        }
    }, [data]);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateMutation.mutate({ id: realId, payload: formData }, {
            onSuccess: () => {
                Swal.fire('Berhasil', 'Data berhasil diperbarui', 'success');
                navigate('/portal/master/tire-type');
            },
            onError: (err) => Swal.fire('Gagal', err?.response?.data?.message || 'Terjadi kesalahan', 'error')
        });
    };

    if (isLoading) return <PortalLayout><div className="p-6">Loading...</div></PortalLayout>;

    return (
        <PortalLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-slate-800">Edit Tire Type Kendaraan</h1>

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
                                Edit Tire Type Kendaraan
                            </span>
                        </div>
                    </div>
                    
                    <button onClick={() => navigate(-1)} className="border px-4 h-10 rounded-lg flex items-center gap-2">
                        <ArrowLeft size={16} /> Kembali
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="bg-white border rounded-xl p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Tipe Kendaraan */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Tipe Kendaraan *</label>
                            <select
                                required
                                value={formData.KodeType} 
                                onChange={(e) => setFormData({...formData, KodeType: e.target.value})}
                                className="w-full h-11 rounded-lg border px-4 text-sm"
                            >
                                <option value="">-- Choose Option --</option>
                                {tipe.map((u) => (
                                    <option key={u.id} value={u.KodeType}>
                                        {u.KodeType} - {u.Type}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Jumlah Tire */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Jumlah Tire *</label>
                            <input type="text" required value={formData.Tire} onChange={(e) => setFormData({...formData, Tire: e.target.value})} className="w-full h-11 rounded-lg border px-4" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Status *</label>
                            <select value={formData.Status} onChange={(e) => setFormData({...formData, Status: e.target.value})} className="w-full h-11 rounded-lg border px-4">
                                <option value="1">Aktif</option>
                                <option value="2">Tidak Aktif</option>
                            </select>
                        </div>
                    </div>
                    
                    {/* Footer */}
                    <div className="flex items-center gap-3 mt-8 pt-6 border-t border-slate-200">

                        <button
                            type="submit"
                            disabled={
                                updateMutation.isPending
                            }
                            className="flex items-center gap-2 h-11 px-6 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
                        >
                            <Save size={16} />

                            {updateMutation.isPending
                                ? 'Menyimpan...'
                                : 'Simpan Perubahan'}
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                navigate(
                                    '/portal/master/tire-type'
                                )
                            }
                            className="flex items-center gap-2 h-11 px-6 rounded-lg border border-slate-300 bg-white text-slate-700 text-sm font-medium hover:bg-slate-50"
                        >
                            <X size={16} />
                            Batal
                        </button>

                    </div>
                </form>
            </div>
        </PortalLayout>
    );
}