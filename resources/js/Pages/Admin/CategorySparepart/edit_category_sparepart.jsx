import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { Save, ArrowLeft } from 'lucide-react';
// Sesuaikan import hook sesuai proyek Anda
import { useDetailCategorySparepart, useUpdateCategorySparepart } from './Hooks/useEditCategorySparepart'; 
import { decodeId } from '@/Utils/Helpers/IdHelper';

export default function EditCategorySparepart() {
    const navigate = useNavigate();
    const { id: encodedId } = useParams();
    const [realId, setRealId] = useState(null);
    
    useEffect(() => {
        const decoded = decodeId(encodedId);
        if (!decoded) navigate('/portal/master/category-sparepart');
        setRealId(decoded);
    }, [encodedId, navigate]);
    
    const updateMutation = useUpdateCategorySparepart();

    const [formData, setFormData] = useState({
        category_code: '',
        category_name: '',
        description: ''
    });

    // 2. Ambil detail data berdasarkan ID
    const { data: detailData, isLoading } = useDetailCategorySparepart(realId);

    // 3. Isi form ketika data detail sudah didapat
    useEffect(() => {
        if (detailData) {
            setFormData({
                category_code: detailData.category_code || '',
                category_name: detailData.category_name || '',
                description: detailData.description || '',
            });
        }
    }, [detailData]);

    const handleSubmit = (e) => {
        e.preventDefault();

        Swal.fire({
            title: 'Update Data?',
            text: "Pastikan data Kategori Sparepart yang diubah sudah benar.",
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
                        Swal.fire('Berhasil!', 'Data Kategori Sparepart telah diperbarui.', 'success');
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
                        <h1 className="text-2xl font-semibold text-slate-800">Edit Kategori Sparepart</h1>

                        <div className="flex items-center gap-2 mt-1 text-sm">
                            <span className="text-slate-400">
                                Master Data
                            </span>

                            <span className="text-slate-300">
                                /
                            </span>

                            <span className="text-slate-400">
                                Kategori Sparepart
                            </span>

                            <span className="text-slate-300">
                                /
                            </span>

                            <span className="text-blue-600 font-medium">
                                Edit Kategori Sparepart
                            </span>
                        </div>
                    </div>
                    <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 h-10 px-4 rounded-lg border border-slate-300 bg-white text-slate-700 text-sm font-medium hover:bg-slate-50 transition">
                        <ArrowLeft size={16} /> Kembali
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Kode Kategori *</label>
                            <input
                                type="text"
                                required
                                value={formData.category_code}
                                onChange={(e) => setFormData({...formData, category_code: e.target.value})}
                                className="w-full h-11 rounded-lg border border-slate-300 px-4 text-sm" disabled
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Nama Kategori *</label>
                            <input
                                type="text"
                                required
                                value={formData.category_name}
                                onChange={(e) => setFormData({...formData, category_name: e.target.value})}
                                className="w-full h-11 rounded-lg border border-slate-300 px-4 text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Deskripsi</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                placeholder="Deskripsi tambahan tentang kategori sparepart (opsional)"
                                className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm h-24 resize-none"
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