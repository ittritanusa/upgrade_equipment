import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { Save, X, ArrowLeft } from 'lucide-react';
import { useCreateItemsSparepart } from './Hooks/useCreateItemsSparepart';
// Tambahkan hook untuk mengambil data list unit
import { useCategorySparepartList } from '../CategorySparepart/Hooks/useCategorySparepartList'; 

export default function CreateItemsSparepart() {
    const navigate = useNavigate();
    const mutation = useCreateItemsSparepart();
    
    // 1. Ambil data category dari API
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
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        Swal.fire({
            title: 'Simpan Data?',
            text: "Pastikan data Items Sparepart sudah benar.",
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
                            text: 'Data Items Sparepart telah disimpan.',
                            icon: 'success',
                            timer: 2000,
                            showConfirmButton: false
                        });
                        navigate('/portal/master/items-sparepart');
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
                        <h1 className="text-2xl font-semibold text-slate-800">Tambah Items Sparepart</h1>

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
                                Tambah Items Sparepart
                            </span>
                        </div>
                    </div>
                    <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 h-10 px-4 rounded-lg border border-slate-300 bg-white text-slate-700 text-sm font-medium hover:bg-slate-50 transition">
                        <ArrowLeft size={16} /> Kembali
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        
                        {/* Kategori Sparepart */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Pilih Kategori Sparepart *</label>
                            <select
                                required
                                value={formData.category_id}
                                onChange={(e) => setFormData({...formData, category_id: e.target.value})}
                                className="w-full h-11 rounded-lg border border-slate-300 px-4 text-sm bg-white"
                                disabled={loadingCategory}
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
                            <label className="block text-sm font-medium text-slate-700 mb-2">Part Code *</label>
                            <input
                                type="text"
                                required
                                value={formData.part_code}
                                onChange={(e) => setFormData({...formData, part_code: e.target.value})}
                                placeholder="Input Part Code"
                                className="w-full h-11 rounded-lg border border-slate-300 px-4 text-sm"
                            />
                        </div>

                        {/* Nama Part */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Nama Part *</label>
                            <input
                                type="text"
                                required
                                value={formData.part_name}
                                onChange={(e) => setFormData({...formData, part_name: e.target.value})}
                                placeholder="Input Nama Part"
                                className="w-full h-11 rounded-lg border border-slate-300 px-4 text-sm"
                            />
                        </div>

                        {/* Part Number */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Part Number *</label>
                            <input
                                type="text"
                                required
                                value={formData.part_number}
                                onChange={(e) => setFormData({...formData, part_number: e.target.value})}
                                placeholder="Input Part Number"
                                className="w-full h-11 rounded-lg border border-slate-300 px-4 text-sm"
                            />
                        </div>

                        {/* Unit Stock */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Unit Stock *</label>
                            <input
                                type="text"
                                required
                                value={formData.unit}
                                onChange={(e) => setFormData({...formData, unit: e.target.value})}
                                placeholder="Input Unit Stock"
                                className="w-full h-11 rounded-lg border border-slate-300 px-4 text-sm"
                            />
                        </div>

                        {/* Minimum Stock */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Minimum Stock *</label>
                            <input
                                type="number"
                                required
                                value={formData.minimum_stock}
                                onChange={(e) => setFormData({...formData, minimum_stock: e.target.value})}
                                placeholder="Input Minimum Stock"
                                className="w-full h-11 rounded-lg border border-slate-300 px-4 text-sm"
                            />
                        </div>

                        {/* Notes */}
                        <div className="md:col-span-3">
                            <label className="block text-sm font-medium text-slate-700 mb-2">Notes</label>
                            <textarea
                                value={formData.notes}
                                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                                placeholder="notes (opsional)"
                                className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm h-24 resize-none"
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