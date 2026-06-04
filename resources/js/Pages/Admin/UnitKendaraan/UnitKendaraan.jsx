import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { Plus, Pencil, Trash2, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { useUnitKendaraanList, useDeleteUnitKendaraan } from './Hooks/useUnitKendaraanList';
import { encodeId } from '@/Utils/Helpers/IdHelper';

export default function UnitKendaraan() {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);

    const { data, isLoading } = useUnitKendaraanList({ search, limit });
    const rawRows = Array.isArray(data?.data?.data) ? data.data.data : [];

    // Mengambil data dan meta dari response API
    const rows = data?.data || [];
    const meta = data?.meta;

    const deleteMutation = useDeleteUnitKendaraan();

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: "Data yang dihapus tidak dapat dikembalikan!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, hapus!',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMutation.mutate(id, {
                    onSuccess: () => {
                        Swal.fire('Terhapus!', 'Data berhasil dihapus.', 'success');
                    },
                    onError: (error) => {
                        // Tampilkan pesan error asli dari API
                        const message = error?.response?.data?.message || error.message;
                        Swal.fire('Gagal!', message, 'error'); 
                    }
                });
            }
        });
    };

    return (
        <PortalLayout>
            <div className="space-y-6">
                {/* Header Section */}
                <div>
                    <h1 className="text-2xl font-semibold text-slate-800">Master Unit Kendaraan</h1>
                    <div className="flex items-center gap-2 mt-1 text-sm text-slate-400">
                        <span>Master Data</span>
                        <span>/</span>
                        <span className="text-blue-600 font-medium">Unit Kendaraan</span>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
                    {/* Toolbar */}
                    <div className="p-5 border-b border-slate-200 flex justify-between items-center">
                        <h2 className="text-lg font-semibold">Data Unit Kendaraan</h2>
                        <button
                            onClick={() => navigate('/portal/master/unit-kendaraan/create')}
                            className="bg-blue-600 text-white px-4 h-10 rounded-lg flex items-center gap-2"
                        >
                            <Plus size={16} /> Tambah Data
                        </button>
                    </div>

                    {/* Filter & Table */}
                    <div className="p-5">
                        {/* Filter Input */}
                        <div className="flex justify-between mb-4">
                            <select
                                value={limit}
                                onChange={(e) => {
                                    setLimit(Number(e.target.value));
                                    setPage(1);
                                }}
                                className="border rounded-lg px-3 h-10"
                            >
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                            </select>
                            <div className="relative">
                                <Search size={16} className="absolute left-3 top-3 text-slate-400" />
                                <input
                                    value={search}
                                    onChange={(e) => { 
                                        setSearch(e.target.value); 
                                        setPage(1); // Reset ke halaman 1 saat search berubah
                                    }}
                                    placeholder="Cari data..."
                                    className="pl-10 h-10 border rounded-lg w-72"
                                />
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto border rounded-xl">
                            <table className="min-w-full text-sm">
                                <thead className="bg-slate-100">
                                    <tr>
                                        <th className="px-4 py-3 text-left w-16">No</th>
                                        <th className="px-4 py-3 text-left">Kode Unit</th>
                                        <th className="px-4 py-3 text-left">Nama Unit</th>
                                        <th className="px-4 py-3 text-left w-30">Status</th>
                                        <th className="px-4 py-3 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isLoading ? (
                                        <tr><td colSpan="5" className="text-center py-8">Loading...</td></tr>
                                    ) : rows.length > 0 ? (
                                        rows.map((item, index) => (
                                            <tr key={item.id} className="border-t">
                                                <td className="px-4 py-3">{index + 1}</td>
                                                <td className="px-4 py-3 font-medium">{item.Kode}</td>
                                                <td className="px-4 py-3">{item.Unit}</td>
                                                <td className="px-4 py-3">
                                                    <span className={`px-2 py-1 rounded-full text-xs ${item.Status === 1 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                        {item.Status === 1 ? 'Aktif' : 'Tidak Aktif'}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex justify-center gap-3">
                                                        <button
                                                            onClick={() => navigate(`/portal/master/unit-kendaraan/edit/${encodeId(item.id)}`)}
                                                            className="text-amber-600 hover:text-amber-800"
                                                        >
                                                            <Pencil size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(item.id)}
                                                            className="text-red-600 hover:text-red-800"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr><td colSpan="5" className="text-center py-8">Tidak ada data ditemukan.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Footer */}
                        {meta && (
                            <div className="flex justify-between items-center mt-4 border-t pt-4">
                                <span className="text-sm text-slate-600">
                                    Menampilkan {(meta.current_page - 1) * meta.per_page + 1} - {Math.min(meta.current_page * meta.per_page, meta.total)} dari {meta.total} data
                                </span>
                                <div className="flex items-center gap-1">
                                    <button
                                        disabled={page === 1}
                                        onClick={() => setPage(page - 1)}
                                        className="h-9 w-9 border rounded-lg"
                                    >
                                        <ChevronLeft size={16} />
                                    </button>

                                    {Array.from(
                                        { length: meta?.last_page || 1 },
                                        (_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setPage(i + 1)}
                                                className={`h-9 w-9 rounded-lg border ${
                                                    page === i + 1
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-white'
                                                }`}
                                            >
                                                {i + 1}
                                            </button>
                                        )
                                    )}

                                    <button
                                        disabled={page === meta?.last_page}
                                        onClick={() => setPage(page + 1)}
                                        className="h-9 w-9 border rounded-lg"
                                    >
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </PortalLayout>
    );
}