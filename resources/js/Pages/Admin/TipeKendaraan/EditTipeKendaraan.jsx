import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { Save, X, ArrowLeft } from 'lucide-react';
import { decodeId } from '@/Utils/Helpers/IdHelper';
import { useTipeKendaraanDetail, useUpdateUnitKendaraan } from './Hooks/useEditTipeKendaraan';
import { useUnitKendaraanList } from '../UnitKendaraan/Hooks/useUnitKendaraanList'; // Sesuaikan path

export default function EditTipeKendaraan() {
    const navigate = useNavigate();
    const { id: encodedId } = useParams();
    const [realId, setRealId] = useState(null);

    const updateMutation = useUpdateUnitKendaraan();
    const { data: listUnit } = useUnitKendaraanList({ limit: 100 }); // Ambil data unit
    const units = listUnit?.data?.data || [];

    const [formData, setFormData] = useState({
        KodeUnit: '', 
        KodeType: '',
        Type: '',
        Status: '1',
    });

    useEffect(() => {
        const decoded = decodeId(encodedId);
        if (!decoded) {
            navigate('/portal/master/tipe-kendaraan');
            return;
        }
        setRealId(decoded);
    }, [encodedId, navigate]);

    const { data, isLoading } = useTipeKendaraanDetail(realId);

    useEffect(() => {
        if (data) {
            setFormData({
                KodeUnit: data.KodeUnit || '',
                KodeType: data.KodeType || '',
                Type: data.Type || '',
                Status: String(data.Status ?? '1'),
            });
        }
    }, [data]);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateMutation.mutate({ id: realId, payload: formData }, {
            onSuccess: () => {
                Swal.fire('Berhasil', 'Data berhasil diperbarui', 'success');
                navigate('/portal/master/tipe-kendaraan');
            },
            onError: (err) => Swal.fire('Gagal', err?.response?.data?.message || 'Terjadi kesalahan', 'error')
        });
    };

    if (isLoading) return <PortalLayout><div className="p-6">Loading...</div></PortalLayout>;

    return (
        <PortalLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-slate-800">Edit Tipe Kendaraan</h1>
                    <button onClick={() => navigate(-1)} className="border px-4 h-10 rounded-lg flex items-center gap-2">
                        <ArrowLeft size={16} /> Kembali
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="bg-white border rounded-xl p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Kode Unit (Dropdown) */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Kode Unit *</label>
                            <select
                                required
                                // Gunakan KodeUnit sebagai value
                                value={formData.KodeUnit} 
                                // Update state dengan key yang benar
                                onChange={(e) => setFormData({...formData, KodeUnit: e.target.value})}
                                className="w-full h-11 rounded-lg border px-4 text-sm"
                            >
                                <option value="">-- Choose Option --</option>
                                {units.map((u) => (
                                    <option key={u.id} value={u.Kode}>
                                        {u.Kode} - {u.Unit}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Kode Tipe Kendaraan */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Kode Type *</label>
                            <input type="text" required value={formData.KodeType} onChange={(e) => setFormData({...formData, KodeType: e.target.value})} className="w-full h-11 rounded-lg border px-4" />
                        </div>
                        
                        {/* Nama Tipe Kendaraan */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Nama Tipe Kendaraan *</label>
                            <input type="text" required value={formData.Type} onChange={(e) => setFormData({...formData, Type: e.target.value})} className="w-full h-11 rounded-lg border px-4" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Status *</label>
                            <select value={formData.Status} onChange={(e) => setFormData({...formData, Status: e.target.value})} className="w-full h-11 rounded-lg border px-4">
                                <option value="1">Aktif</option>
                                <option value="2">Tidak Aktif</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit" disabled={updateMutation.isPending} className="mt-8 bg-blue-600 text-white px-6 h-11 rounded-lg">
                        {updateMutation.isPending ? 'Menyimpan...' : 'Simpan Perubahan'}
                    </button>
                </form>
            </div>
        </PortalLayout>
    );
}