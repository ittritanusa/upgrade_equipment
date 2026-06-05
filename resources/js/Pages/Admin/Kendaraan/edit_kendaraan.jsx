import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { Save, X, ArrowLeft } from 'lucide-react';
import { decodeId } from '@/Utils/Helpers/IdHelper';
// Sesuaikan import hook berikut dengan struktur folder Anda
import { useKendaraanDetail, useUpdateKendaraan } from './Hooks/useEditKendaraan'; 
import { useUnitKendaraanList } from '../UnitKendaraan/Hooks/useUnitKendaraanList';
import { useTipeKendaraanList } from '../TipeKendaraan/Hooks/useTipeKendaraanList';
import { useMerkKendaraanList } from '../MerkKendaraan/Hooks/useMerkKendaraanList';

export default function EditKendaraan() {
    const navigate = useNavigate();
    const { id: encodedId } = useParams();
    const [realId, setRealId] = useState(null);

    const updateMutation = useUpdateKendaraan();
    
    // Ambil data dropdown
    const { data: listUnit } = useUnitKendaraanList({ limit: 100 });
    const { data: listType } = useTipeKendaraanList({ limit: 100 });
    const { data: listMerk } = useMerkKendaraanList({ limit: 100 });
    
    const units = listUnit?.data?.data || [];
    const types = listType?.data?.data || [];
    const merks = listMerk?.data?.data || [];

    const [formData, setFormData] = useState({
        KodeUnit: '',
        MerkTypeUnit: '',
        TypeKendaraan: '',
        TahunPembuatan: '',
        NoRangka: '',
        NoMesin: '',
        NoLambung: '',
        NoKIR: '',
        NoKIR2: '',
        NoPolisi: '',
        NoBPKB: '',
        PengesahanKIR: '',
        ExpiredKIR: '',
        PengesahanKIR2: '',
        ExpiredKIR2: '',
        PengesahanSTNK: '',
        ExpiredSTNK: '',
        PengesahanTAX: '',
        ExpiredTAX: '',
        Keterangan: '',
        BahanBakar: '',
        KeteranganStatus: ''
    });

    // 1. Decode ID
    useEffect(() => {
        const decoded = decodeId(encodedId);
        if (!decoded) {
            navigate('/portal/master/kendaraan');
            return;
        }
        setRealId(decoded);
    }, [encodedId, navigate]);

    // 2. Fetch Detail
    const { data, isLoading } = useKendaraanDetail(realId);

    // 3. Populate Form
    useEffect(() => {
        if (data) {
            setFormData({
                KodeUnit: data.KodeUnit || '',
                MerkTypeUnit: data.MerkTypeUnit || '',
                TypeKendaraan: data.TypeKendaraan || '',
                TahunPembuatan: data.TahunPembuatan || '',
                NoRangka: data.NoRangka || '',
                NoMesin: data.NoMesin || '',
                NoLambung: data.NoLambung || '',
                NoKIR: data.NoKIR || '',
                NoKIR2: data.NoKIR2 || '',
                NoPolisi: data.NoPolisi || '',
                NoBPKB: data.NoBPKB || '',
                PengesahanKIR: data.PengesahanKIR || '',
                ExpiredKIR: data.ExpiredKIR || '',
                PengesahanKIR2: data.PengesahanKIR2 || '',
                ExpiredKIR2: data.ExpiredKIR2 || '',
                PengesahanSTNK: data.PengesahanSTNK || '',
                ExpiredSTNK: data.ExpiredSTNK || '',
                PengesahanTAX: data.PengesahanTAX || '',
                ExpiredTAX: data.ExpiredTAX || '',
                Keterangan: data.Keterangan || '',
                BahanBakar: data.BahanBakar || '',
                KeteranganStatus: data.KeteranganStatus || ''
            });
        }
    }, [data]);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateMutation.mutate({ id: realId, payload: formData }, {
            onSuccess: () => {
                Swal.fire('Berhasil', 'Data kendaraan diperbarui', 'success');
                navigate('/portal/master/kendaraan');
            },
            onError: (err) => Swal.fire('Gagal', err?.response?.data?.message || 'Terjadi kesalahan', 'error')
        });
    };

    if (isLoading) return <PortalLayout>Loading...</PortalLayout>;

    return (
        <PortalLayout>
            {/* ... Header Section (tiru dari CreateKendaraan.jsx) */}
            
            <form onSubmit={handleSubmit} className="bg-white border rounded-xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Select Dropdowns */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Kode Unit *</label>
                        <select value={formData.KodeUnit} onChange={(e) => setFormData({...formData, KodeUnit: e.target.value})} className="w-full h-11 rounded-lg border px-4">
                            <option value="">-- Pilih --</option>
                            {units.map(u => <option key={u.id} value={u.Kode}>{u.Kode} - {u.Unit}</option>)}
                        </select>
                    </div>
                    
                    {/* Tambahkan Select Merk dan Tipe Kendaraan dengan pola serupa */}
                    
                    {/* Semua Input Text lainnya (No Rangka, No Mesin, dll) */}
                    <div>
                        <label className="block text-sm font-medium mb-2">No Rangka *</label>
                        <input type="text" value={formData.NoRangka} onChange={(e) => setFormData({...formData, NoRangka: e.target.value})} className="w-full h-11 rounded-lg border px-4" />
                    </div>
                    {/* ... (input lainnya) */}
                </div>
                
                <button type="submit" className="mt-8 bg-blue-600 text-white px-6 h-11 rounded-lg">
                    {updateMutation.isPending ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
            </form>
        </PortalLayout>
    );
}