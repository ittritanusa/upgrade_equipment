import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { Save, ArrowLeft } from 'lucide-react';
import { useCreateKendaraan } from './Hooks/useCreateKendaraan';
import { useUnitKendaraanList } from '../UnitKendaraan/Hooks/useUnitKendaraanList';
import { useMerkKendaraanList } from '../MerkKendaraan/Hooks/useMerkKendaraanList';
import { useTipeKendaraanList } from '../TipeKendaraan/Hooks/useTipeKendaraanList';
import { useAreaUnitList } from '../AreaUnit/Hooks/useAreaUnitList';
import { useUnitBisnisList } from '../UnitBisnis/Hooks/useUnitBisnisList';

export default function CreateKendaraan() {
    const navigate = useNavigate();
    const mutation = useCreateKendaraan();

    const [formData, setFormData] = useState({
        // Identitas Unit
        TypeUnit: '',
        NoPolisi: '',
        NoMesin: '',
        NoRangka: '',
        NoLambung: '',
        NoBPKB: '',
        StatusUnit: '',
        BahanBakar: '',
        Asuransi: '',

        // Detail Kendaraan
        TypeKendaraan: '',
        MerekTypeUnit: '',
        Milik: '',
        WarnaKB: '',
        WarnaTNKB: '',

        // Dokumen & Perizinan (STNK, TAX, KIR)
        PengesahanSTNK: '',
        ExpiredSTNK: '',
        PengesahanTAX: '',
        ExpiredTAX: '',
        
        NoKIR: '',
        PengesahanKIR: '',
        ExpiredKIR: '',
        
        NoKIR2: '',
        PengesahanKIR2: '',
        ExpiredKIR2: '',

        // Lainnya
        LokasiUnit: '',
        UnitBisnis: '',
        TahunPembuatan: '',
        KeteranganStatus: ''
    });

    // Ambil data unit dari API
    const { data: listUnit, isLoading: loadingUnit } = useUnitKendaraanList({ limit: 100 });
    const units = listUnit?.data || [];

    // Ambil data Merk dari API
    const { data: listMerk, isLoading: loadingMerk } = useMerkKendaraanList({ limit: 100 });
    const merks = listMerk?.data || [];

    // Ambil data Tipe dari API
    const { data: listTipe, isLoading: loadingTipe } = useTipeKendaraanList({ limit: 100 });
    const tipes = listTipe?.data || [];

    // Ambil data Area Unit dari API
    const { data: listAreaUnit, isLoading: loadingAreaUnit } = useAreaUnitList({ limit: 100 });
    const areaUnits = listAreaUnit?.data || [];

    // Ambil data Unit Bisnis dari API
    const { data: listUnitBisnis, isLoading: loadingUnitBisnis } = useUnitBisnisList({ limit: 100 });
    const unitBisnises = listUnitBisnis?.data || [];

    const handleSubmit = (e) => {
        e.preventDefault();
        
        Swal.fire({
            title: 'Simpan Data?',
            text: "Pastikan data kendaraan sudah benar.",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#2563eb',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Ya, Simpan!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                mutation.mutate(formData, {
                    onSuccess: () => {
                        Swal.fire('Berhasil!', 'Data kendaraan telah disimpan.', 'success');
                        navigate(-1);
                    },
                    onError: (error) => {
                        Swal.fire('Gagal!', error?.response?.data?.message || 'Terjadi kesalahan.', 'error');
                    }
                });
            }
        });
    };

    return (
        <PortalLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-slate-800">Tambah Kendaraan</h1>
                    <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 h-10 px-4 rounded-lg border border-slate-300 bg-white text-sm hover:bg-slate-50">
                        <ArrowLeft size={16} /> Kembali
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Kolom 1 */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Tipe Unit *</label>
                                <select
                                    required
                                    value={formData.TypeUnit}
                                    onChange={(e) => setFormData({...formData, TypeUnit: e.target.value})}
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
                            <div>
                                <label className="block text-sm font-medium mb-1">Nomor Polisi *</label>
                                <input required className="w-full h-11 rounded-lg border border-slate-300 px-4" value={formData.NoPolisi} onChange={(e) => setFormData({...formData, NoPolisi: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Nomor Mesin *</label>
                                <input required className="w-full h-11 rounded-lg border border-slate-300 px-4" value={formData.NoMesin} onChange={(e) => setFormData({...formData, NoMesin: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Nomor Rangka *</label>
                                <input required className="w-full h-11 rounded-lg border border-slate-300 px-4" value={formData.NoRangka} onChange={(e) => setFormData({...formData, NoRangka: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Nomor Lambung *</label>
                                <input required className="w-full h-11 rounded-lg border border-slate-300 px-4" value={formData.NoLambung} onChange={(e) => setFormData({...formData, NoLambung: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Nomor BPKB *</label>
                                <input required className="w-full h-11 rounded-lg border border-slate-300 px-4" value={formData.NoBPKB} onChange={(e) => setFormData({...formData, NoBPKB: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Status Unit *</label>
                                <select
                                    required
                                    value={formData.StatusUnit}
                                    onChange={(e) => setFormData({...formData, StatusUnit: e.target.value})}
                                    className="w-full h-11 rounded-lg border border-slate-300 px-4 text-sm bg-white"
                                    disabled={loadingUnit}
                                >
                                    <option value="">-- Choose Option --</option>
                                    <option value="1">Aktif</option>
                                    <option value="2">Breakdown</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Bahan Bakar *</label>
                                <input required className="w-full h-11 rounded-lg border border-slate-300 px-4" value={formData.BahanBakar} onChange={(e) => setFormData({...formData, BahanBakar: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Asuransi *</label>
                                <input required className="w-full h-11 rounded-lg border border-slate-300 px-4" value={formData.Asuransi} onChange={(e) => setFormData({...formData, Asuransi: e.target.value})} />
                            </div>
                        </div>

                        {/* Kolom 2 */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Tipe Kendaraan *</label>
                                <select
                                    required
                                    value={formData.TypeKendaraan}
                                    onChange={(e) => setFormData({...formData, TypeKendaraan: e.target.value})}
                                    className="w-full h-11 rounded-lg border border-slate-300 px-4 text-sm bg-white"
                                    disabled={loadingUnit}
                                >
                                    <option value="">-- Choose Option --</option>
                                    {tipes.map((u) => (
                                        <option key={u.id} value={u.KodeType}>
                                            {u.Type}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Pengesahan STNK</label>
                                <input type="date" className="w-full h-11 rounded-lg border border-slate-300 px-4" value={formData.PengesahanSTNK} onChange={(e) => setFormData({...formData, PengesahanSTNK: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Pengesahan TAX</label>
                                <input type="date" className="w-full h-11 rounded-lg border border-slate-300 px-4" value={formData.PengesahanTAX} onChange={(e) => setFormData({...formData, PengesahanTAX: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Nomor KIR I</label>
                                <input type="text" className="w-full h-11 rounded-lg border border-slate-300 px-4" value={formData.NoKIR} onChange={(e) => setFormData({...formData, NoKIR: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Nomor KIR II</label>
                                <input type="text" className="w-full h-11 rounded-lg border border-slate-300 px-4" value={formData.NoKIR2} onChange={(e) => setFormData({...formData, NoKIR2: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Expired KIR I</label>
                                <input type="date" className="w-full h-11 rounded-lg border border-slate-300 px-4" value={formData.ExpiredKIR} onChange={(e) => setFormData({...formData, ExpiredKIR: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Lokasi Unit *</label>
                                <select
                                    required
                                    value={formData.LokasiUnit}
                                    onChange={(e) => setFormData({...formData, LokasiUnit: e.target.value})}
                                    className="w-full h-11 rounded-lg border border-slate-300 px-4 text-sm bg-white"
                                    disabled={loadingUnit}
                                >
                                    <option value="">-- Choose Option --</option>
                                    {areaUnits.map((u) => (
                                        <option key={u.id} value={u.Area}>
                                            {u.UnitBisnis} - {u.Area}/{u.Lokasi}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Warna KB *</label>
                                <input required className="w-full h-11 rounded-lg border border-slate-300 px-4" value={formData.WarnaKB} onChange={(e) => setFormData({...formData, WarnaKB: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Milik *</label>
                                <select
                                    required
                                    value={formData.Milik}
                                    onChange={(e) => setFormData({...formData, Milik: e.target.value})}
                                    className="w-full h-11 rounded-lg border border-slate-300 px-4 text-sm bg-white"
                                    disabled={loadingUnit}
                                >
                                    <option value="">-- Choose Option --</option>
                                    {unitBisnises.map((u) => (
                                        <option key={u.id} value={u.KodeUnitBisnis}>
                                            {u.KodeUnitBisnis} - {u.UnitBisnis}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Kolom 3 */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Merk Kendaraan *</label>
                                <select
                                    required
                                    value={formData.MerekTypeUnit}
                                    onChange={(e) => setFormData({...formData, MerekTypeUnit: e.target.value})}
                                    className="w-full h-11 rounded-lg border border-slate-300 px-4 text-sm bg-white"
                                    disabled={loadingUnit}
                                >
                                    <option value="">-- Choose Option --</option>
                                    {merks.map((u) => (
                                        <option key={u.id} value={u.KodeMerk}>
                                            {u.Merk}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Expired STNK</label>
                                <input type="date" className="w-full h-11 rounded-lg border border-slate-300 px-4" value={formData.ExpiredSTNK} onChange={(e) => setFormData({...formData, ExpiredSTNK: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Expired TAX</label>
                                <input type="date" className="w-full h-11 rounded-lg border border-slate-300 px-4" value={formData.ExpiredTAX} onChange={(e) => setFormData({...formData, ExpiredTAX: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Pengesahan KIR I</label>
                                <input type="date" className="w-full h-11 rounded-lg border border-slate-300 px-4" value={formData.PengesahanKIR} onChange={(e) => setFormData({...formData, PengesahanKIR: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Pengesahan KIR II</label>
                                <input type="date" className="w-full h-11 rounded-lg border border-slate-300 px-4" value={formData.PengesahanKIR2} onChange={(e) => setFormData({...formData, PengesahanKIR2: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Expired KIR II</label>
                                <input type="date" className="w-full h-11 rounded-lg border border-slate-300 px-4" value={formData.ExpiredKIR2} onChange={(e) => setFormData({...formData, ExpiredKIR2: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Unit Bisnis *</label>
                                <select
                                    required
                                    value={formData.UnitBisnis}
                                    onChange={(e) => setFormData({...formData, UnitBisnis: e.target.value})}
                                    className="w-full h-11 rounded-lg border border-slate-300 px-4 text-sm bg-white"
                                    disabled={loadingUnit}
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
                                <label className="block text-sm font-medium mb-1">Warna TNKB *</label>
                                <input required className="w-full h-11 rounded-lg border border-slate-300 px-4" value={formData.WarnaTNKB} onChange={(e) => setFormData({...formData, WarnaTNKB: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">TahunPembuatan</label>
                                <input type="date" className="w-full h-11 rounded-lg border border-slate-300 px-4" value={formData.TahunPembuatan} onChange={(e) => setFormData({...formData, TahunPembuatan: e.target.value})} />
                            </div>
                        </div>
                        <div className="md:col-span-3">
                            <label className="block text-sm font-medium mb-1 text-slate-700">Keterangan *</label>
                            <textarea
                                required
                                rows="3"
                                className="w-full rounded-lg border border-slate-300 p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={formData.KeteranganStatus}
                                onChange={(e) => setFormData({...formData, KeteranganStatus: e.target.value})}
                                placeholder="Masukkan keterangan tambahan..."
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3 mt-8 pt-6 border-t border-slate-200">
                        <button type="submit" disabled={mutation.isPending} className="flex items-center gap-2 h-11 px-6 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700">
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