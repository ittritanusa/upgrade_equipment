import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { Save, X, ArrowLeft } from 'lucide-react';

import { decodeId } from '@/Utils/Helpers/IdHelper';
import {
    useUnitKendaraanDetail,
    useUpdateUnitKendaraan,
} from './Hooks/useEditUnitKendaraan';

export default function EditUnitKendaraan() {

    const navigate = useNavigate();
    const { id: encodedId } = useParams();
    const [realId, setRealId] = useState(null);

    // FIX 1: Panggil hook mutasi agar updateMutation tersedia
    const updateMutation = useUpdateUnitKendaraan();

    const [formData, setFormData] = useState({
        Kode: '',
        Unit: '',
        Status: '1',
    });

    useEffect(() => {
        const decoded = decodeId(encodedId);
        if (!decoded) {
            Swal.fire('Error', 'ID tidak valid', 'error');
            navigate('/portal/master/unit-kendaraan');
            return;
        }
        setRealId(decoded);
    }, [encodedId, navigate]);

    const { data, isLoading } = useUnitKendaraanDetail(realId);

    useEffect(() => {
        const item = data?.data || data; 

        if (item) {
            setFormData({
                Kode: item.Kode || '',
                Unit: item.Unit || '',
                Status: String(item.Status ?? '1'),
            });
        }
    }, [data]);

    const handleSubmit = (e) => {
        e.preventDefault();

        Swal.fire({
            title: 'Update Data?',
            text: 'Pastikan data sudah benar.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Ya, Simpan',
            cancelButtonText: 'Batal',
        }).then((result) => {
            if (!result.isConfirmed) return;

            updateMutation.mutate(
                { id: realId, payload: formData },
                {
                    onSuccess: () => {
                        Swal.fire('Berhasil', 'Data berhasil diperbarui', 'success');
                        navigate('/portal/master/unit-kendaraan');
                    },
                    onError: (error) => {
                        Swal.fire('Gagal', error?.response?.data?.message || 'Terjadi kesalahan', 'error');
                    },
                }
            );
        });
    };

    if (isLoading) {
        return (
            <PortalLayout>
                <div className="p-6">Loading...</div>
            </PortalLayout>
        );
    }

    return (
        <PortalLayout>

            <div className="space-y-6">

                {/* Header */}
                <div className="flex items-center justify-between">

                    <div>
                        <h1 className="text-2xl font-semibold text-slate-800">
                            Edit Unit Kendaraan
                        </h1>

                        <div className="flex items-center gap-2 mt-1 text-sm">
                            <span className="text-slate-400">
                                Master Data
                            </span>

                            <span className="text-slate-300">
                                /
                            </span>

                            <span className="text-slate-400">
                                Unit Kendaraan
                            </span>

                            <span className="text-slate-300">
                                /
                            </span>

                            <span className="text-blue-600 font-medium">
                                Edit Unit Kendaraan
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 h-10 px-4 rounded-lg border border-slate-300 bg-white text-slate-700 text-sm font-medium hover:bg-slate-50"
                    >
                        <ArrowLeft size={16} />
                        Kembali
                    </button>

                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white border border-slate-200 rounded-xl p-6"
                >

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* Kode Unit */}
                        <div>

                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Kode Unit
                                <span className="text-red-500">
                                    *
                                </span>
                            </label>

                            <input
                                type="text"
                                required
                                value={formData.Kode}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        Kode:
                                            e.target.value,
                                    })
                                }
                                className="w-full h-11 rounded-lg border border-slate-300 px-4 text-sm"
                            />

                        </div>

                        {/* Nama Unit */}
                        <div>

                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Nama Unit
                                <span className="text-red-500">
                                    *
                                </span>
                            </label>

                            <input
                                type="text"
                                required
                                value={formData.Unit}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        Unit:
                                            e.target.value,
                                    })
                                }
                                className="w-full h-11 rounded-lg border border-slate-300 px-4 text-sm"
                            />

                        </div>

                        {/* Status */}
                        <div>

                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Status
                                <span className="text-red-500">
                                    *
                                </span>
                            </label>

                            <select
                                value={formData.Status}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        Status:
                                            e.target.value,
                                    })
                                }
                                className="w-full h-11 rounded-lg border border-slate-300 px-4 text-sm"
                            >
                                <option value="1">
                                    Aktif
                                </option>

                                <option value="2">
                                    Tidak Aktif
                                </option>
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
                                    '/portal/master/unit-kendaraan'
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