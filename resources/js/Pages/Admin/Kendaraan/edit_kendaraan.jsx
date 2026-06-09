import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { Save, ArrowLeft } from 'lucide-react';
import { decodeId } from '@/Utils/Helpers/IdHelper';
import { useKendaraanDetail, useUpdateKendaraan } from './Hooks/useEditKendaraan'; 
import { useUnitKendaraanList } from '../UnitKendaraan/Hooks/useUnitKendaraanList';
import { useTipeKendaraanList } from '../TipeKendaraan/Hooks/useTipeKendaraanList';
import { useMerkKendaraanList } from '../MerkKendaraan/Hooks/useMerkKendaraanList';
import { useAreaUnitList } from '../AreaUnit/Hooks/useAreaUnitList';
import { useUnitBisnisList } from '../UnitBisnis/Hooks/useUnitBisnisList';

export default function EditKendaraan() {
    const navigate = useNavigate();
    const { id: encodedId } = useParams();
    const [realId, setRealId] = useState(null);
    const updateMutation = useUpdateKendaraan();
    
    // Ambil semua data dropdown
    const { data: listUnit } = useUnitKendaraanList({ limit: 100 });
    const { data: listMerk } = useMerkKendaraanList({ limit: 100 });
    const { data: listTipe } = useTipeKendaraanList({ limit: 100 });
    const { data: listAreaUnit } = useAreaUnitList({ limit: 100 });
    const { data: listUnitBisnis } = useUnitBisnisList({ limit: 100 });
    
    const units = listUnit?.data || [];
    const merks = listMerk?.data || [];
    const tipes = listTipe?.data || [];
    const areaUnits = listAreaUnit?.data || [];
    const unitBisnises = listUnitBisnis?.data || [];

    const [formData, setFormData] = useState({
        TypeUnit: '', NoPolisi: '', NoMesin: '', NoRangka: '', NoLambung: '', NoBPKB: '',
        StatusUnit: '', BahanBakar: '', Asuransi: '', TypeKendaraan: '', MerekTypeUnit: '',
        Milik: '', WarnaKB: '', WarnaTNKB: '', PengesahanSTNK: '', ExpiredSTNK: '',
        PengesahanTAX: '', ExpiredTAX: '', NoKIR: '', PengesahanKIR: '', ExpiredKIR: '',
        NoKIR2: '', PengesahanKIR2: '', ExpiredKIR2: '', LokasiUnit: '', UnitBisnis: '',
        TahunPembuatan: '', KeteranganStatus: ''
    });

    useEffect(() => {
        const decoded = decodeId(encodedId);
        if (!decoded) navigate(-1);
        else setRealId(decoded);
    }, [encodedId, navigate]);

    const { data, isLoading } = useKendaraanDetail(realId);

    useEffect(() => {
        if (data) {
            setFormData({ ...data });
        }
    }, [data]);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateMutation.mutate({ id: realId, payload: formData }, {
            onSuccess: () => {
                Swal.fire('Berhasil', 'Data kendaraan diperbarui', 'success');
                navigate(-1);
            },
            onError: (err) => Swal.fire('Gagal', err?.response?.data?.message || 'Terjadi kesalahan', 'error')
        });
    };

    if (isLoading) return <PortalLayout>Loading...</PortalLayout>;

    return (
        <PortalLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-slate-800">Edit Kendaraan</h1>
                    <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 h-10 px-4 rounded-lg border border-slate-300 bg-white text-sm hover:bg-slate-50">
                        <ArrowLeft size={16} /> Kembali
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl p-6">
                    {/* GUNAKAN STRUKTUR GRID YANG SAMA DENGAN CREATE_KENDARAAN.JSX DISINI */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Kolom 1 */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Tipe Unit *</label>
                                <select required value={formData.TypeUnit} onChange={(e) => setFormData({...formData, TypeUnit: e.target.value})} className="w-full h-11 rounded-lg border border-slate-300 px-4 text-sm bg-white">
                                    <option value="">-- Choose Option --</option>
                                    {units.map((u) => <option key={u.id} value={u.Kode}>{u.Kode} - {u.Unit}</option>)}
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
                                <select required value={formData.StatusUnit} onChange={(e) => setFormData({...formData, StatusUnit: e.target.value})} className="w-full h-11 rounded-lg border border-slate-300 px-4 text-sm bg-white">
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
                                <select required value={formData.TypeKendaraan} onChange={(e) => setFormData({...formData, TypeKendaraan: e.target.value})} className="w-full h-11 rounded-lg border border-slate-300 px-4 text-sm bg-white">
                                    <option value="">-- Choose Option --</option>
                                    {tipes.map((u) => <option key={u.id} value={u.KodeType}>{u.Type}</option>)}
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
                                <select required value={formData.LokasiUnit} onChange={(e) => setFormData({...formData, LokasiUnit: e.target.value})} className="w-full h-11 rounded-lg border border-slate-300 px-4 text-sm bg-white">
                                    <option value="">-- Choose Option --</option>
                                    {areaUnits.map((u) => <option key={u.id} value={u.Area}>{u.UnitBisnis} - {u.Area}/{u.Lokasi}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Warna KB *</label>
                                <input required className="w-full h-11 rounded-lg border border-slate-300 px-4" value={formData.WarnaKB} onChange={(e) => setFormData({...formData, WarnaKB: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Milik *</label>
                                <select required value={formData.Milik} onChange={(e) => setFormData({...formData, Milik: e.target.value})} className="w-full h-11 rounded-lg border border-slate-300 px-4 text-sm bg-white">
                                    <option value="">-- Choose Option --</option>
                                    {unitBisnises.map((u) => <option key={u.id} value={u.KodeUnitBisnis}>{u.KodeUnitBisnis} - {u.UnitBisnis}</option>)}
                                </select>
                            </div>
                        </div>

                        {/* Kolom 3 */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Merk Kendaraan *</label>
                                <select required value={formData.MerekTypeUnit} onChange={(e) => setFormData({...formData, MerekTypeUnit: e.target.value})} className="w-full h-11 rounded-lg border border-slate-300 px-4 text-sm bg-white">
                                    <option value="">-- Choose Option --</option>
                                    {merks.map((u) => <option key={u.id} value={u.KodeMerk}>{u.Merk}</option>)}
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
                                <select required value={formData.UnitBisnis} onChange={(e) => setFormData({...formData, UnitBisnis: e.target.value})} className="w-full h-11 rounded-lg border border-slate-300 px-4 text-sm bg-white">
                                    <option value="">-- Choose Option --</option>
                                    {unitBisnises.map((u) => <option key={u.id} value={u.KodeUnitBisnis}>{u.KodeUnitBisnis} - {u.UnitBisnis}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Warna TNKB *</label>
                                <input required className="w-full h-11 rounded-lg border border-slate-300 px-4" value={formData.WarnaTNKB} onChange={(e) => setFormData({...formData, WarnaTNKB: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Tahun Pembuatan</label>
                                <input type="date" className="w-full h-11 rounded-lg border border-slate-300 px-4" value={formData.TahunPembuatan} onChange={(e) => setFormData({...formData, TahunPembuatan: e.target.value})} />
                            </div>
                        </div>

                        {/* Keterangan */}
                        <div className="md:col-span-3">
                            <label className="block text-sm font-medium mb-1 text-slate-700">Keterangan *</label>
                            <textarea required rows="3" className="w-full rounded-lg border border-slate-300 p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" value={formData.KeteranganStatus} onChange={(e) => setFormData({...formData, KeteranganStatus: e.target.value})} placeholder="Masukkan keterangan tambahan..." />
                        </div>
                    </div>

                    <div className="flex items-center gap-3 mt-8 pt-6 border-t border-slate-200">
                        <button type="submit" disabled={updateMutation.isPending} className="flex items-center gap-2 h-11 px-6 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700">
                            <Save size={16} /> {updateMutation.isPending ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </button>
                    </div>
                </form>
            </div>
        </PortalLayout>
    );
}