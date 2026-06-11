import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { Save, X, ArrowLeft } from 'lucide-react';
import { decodeId } from '@/Utils/Helpers/IdHelper';
import { useDetailItemsSparepart, useUpdateItemsSparepart } from './Hooks/useEditItemsSparepart';
import { useCategorySparepartList } from '../CategorySparepart/Hooks/useCategorySparepartList'; 

export default function EditItemsSparepart() {
    const navigate = useNavigate();
    const { id: encodedId } = useParams();
    const [realId, setRealId] = useState(null);

    const updateMutation = useUpdateItemsSparepart();
    const { data: listCategory, isLoading: loadingCategory } = useCategorySparepartList({ limit: 100 });
    const categories = listCategory?.data || [];

    const [formData, setFormData] = useState({
        category_id: '',
        part_code: '',
        part_name: '',
        part_number: '',
        unit: '',
        minimum_stock: '',
        notes: '',
        Status: '',
    });

    useEffect(() => {
        const decoded = decodeId(encodedId);
        if (!decoded) {
            navigate('/portal/master/items-sparepart');
            return;
        }
        setRealId(decoded);
    }, [encodedId, navigate]);

    const { data, isLoading } = useDetailItemsSparepart(realId);

    useEffect(() => {
        if (data) {
            setFormData({
                category_id: data.category_id || '',
                part_code: data.part_code || '',
                part_name: data.part_name || '',
                part_number: data.part_number || '',
                unit: data.unit || '',
                minimum_stock: data.minimum_stock || '',
                notes: data.notes || '',
                Status: String(data.Status ?? '1'),
            });
        }
    }, [data]);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateMutation.mutate({ id: realId, payload: formData }, {
            onSuccess: () => {
                Swal.fire('Berhasil', 'Data berhasil diperbarui', 'success');
                navigate('/portal/master/items-sparepart');
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
                        <h1 className="text-2xl font-semibold text-slate-800">Edit Items Sparepart</h1>

                        <div className="flex items-center gap-2 mt-1 text-sm">
                            <span className="text-slate-400">
                                Master Data
                            </span>

                            <span className="text-slate-300">
                                /
                            </span>

                            <span className="text-slate-400">
                                Items Sparepart
                            </span>

                            <span className="text-slate-300">
                                /
                            </span>

                            <span className="text-blue-600 font-medium">
                                Edit Items Sparepart
                            </span>
                        </div>
                    </div>

                    <button onClick={() => navigate(-1)} className="border px-4 h-10 rounded-lg flex items-center gap-2">
                        <ArrowLeft size={16} /> Kembali
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="bg-white border rounded-xl p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Kategori Sparepart */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Kategori Sparepart *</label>
                            <select
                                required
                                // Gunakan category_id sebagai value
                                value={formData.category_id} 
                                // Update state dengan key yang benar
                                onChange={(e) => setFormData({...formData, category_id: e.target.value})}
                                className="w-full h-11 rounded-lg border px-4 text-sm"
                            >
                                <option value="">-- Choose Option --</option>
                                {categories.map((u) => (
                                    <option key={u.id} value={u.id}>
                                        {u.category_code} - {u.category_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Part Code */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Kode Part *</label>
                            <input type="text" required value={formData.part_code} onChange={(e) => setFormData({...formData, part_code: e.target.value})} className="w-full h-11 rounded-lg border px-4" />
                        </div>
                        
                        {/* Nama Part */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Nama Part *</label>
                            <input type="text" required value={formData.part_name} onChange={(e) => setFormData({...formData, part_name: e.target.value})} className="w-full h-11 rounded-lg border px-4" />
                        </div>

                        {/* Part Number */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Part Number *</label>
                            <input type="text" required value={formData.part_number} onChange={(e) => setFormData({...formData, part_number: e.target.value})} className="w-full h-11 rounded-lg border px-4" />
                        </div>

                        {/* Unit Stock */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Unit Stock *</label>
                            <input type="text" required value={formData.unit} onChange={(e) => setFormData({...formData, unit: e.target.value})} className="w-full h-11 rounded-lg border px-4" />
                        </div>

                        {/* Minimum Stock */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Minimum Stock *</label>
                            <input type="text" required value={formData.minimum_stock} onChange={(e) => setFormData({...formData, minimum_stock: e.target.value})} className="w-full h-11 rounded-lg border px-4" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Status *</label>
                            <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full h-11 rounded-lg border px-4">
                                <option value="1">Aktif</option>
                                <option value="2">Tidak Aktif</option>
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-2">Notes</label>
                            <textarea
                                value={formData.notes}
                                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                                placeholder="notes (opsional)"
                                className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm h-24 resize-none"
                            />
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
                                    '/portal/master/items-sparepart'
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