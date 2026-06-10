import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { Plus, Pencil, Trash2, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { useKodePosList, useDeleteKodePos } from './Hooks/useKodePosList';
import { encodeId } from '@/Utils/Helpers/IdHelper';

export default function KodePos() {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);

    const { data, isLoading } = useKodePosList({ search, limit, page });

    const rows = data?.data || [];
    const meta = data?.meta;

    const deleteMutation = useDeleteKodePos();

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
                        const message = error?.response?.data?.message || error.message;
                        Swal.fire('Gagal!', message, 'error'); 
                    }
                });
            }
        });
    };

    // Fungsi untuk membuat deret pagination dengan batas dan titik-titik (...)
    const getPaginationNumbers = (current, last) => {
        const delta = 1;
        const range = [];
        const rangeWithDots = [];
        let l;

        for (let i = 1; i <= last; i++) {
            if (i === 1 || i === last || (i >= current - delta && i <= current + delta)) {
                range.push(i);
            }
        }

        range.forEach((i) => {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l !== 1) {
                    rangeWithDots.push('...');
                }
            }
            rangeWithDots.push(i);
            l = i;
        });

        return rangeWithDots;
    };

    return (
        <PortalLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-800">Master Kode Pos</h1>
                    <div className="flex items-center gap-2 mt-1 text-sm text-slate-400">
                        <span>Master Data</span>
                        <span>/</span>
                        <span className="text-blue-600 font-medium">Kode Pos</span>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
                    <div className="p-5 border-b border-slate-200 flex justify-between items-center">
                        <h2 className="text-lg font-semibold">Data Kode Pos</h2>
                        <button
                            onClick={() => navigate('/portal/master/kode-pos/create')}
                            className="bg-blue-600 text-white px-4 h-10 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-blue-700 transition"
                        >
                            <Plus size={16} /> Tambah Data
                        </button>
                    </div>

                    <div className="p-5">
                        <div className="flex justify-between mb-4">
                            <select
                                value={limit}
                                onChange={(e) => {
                                    setLimit(Number(e.target.value));
                                    setPage(1);
                                }}
                                className="border border-slate-300 rounded-lg px-3 h-10 text-sm bg-white"
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
                                        setPage(1);
                                    }}
                                    placeholder="Cari data..."
                                    className="pl-10 h-10 border border-slate-300 rounded-lg w-72 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <div className="overflow-x-auto border border-slate-200 rounded-xl">
                            <table className="min-w-full text-sm">
                                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                                    <tr>
                                        <th className="px-4 py-3 text-left w-16 font-semibold">No</th>
                                        <th className="px-4 py-3 text-left font-semibold">Provinsi</th>
                                        <th className="px-4 py-3 text-left font-semibold">Kota</th>
                                        <th className="px-4 py-3 text-left font-semibold">Kecamatan</th>
                                        <th className="px-4 py-3 text-left font-semibold">Kelurahan</th>
                                        <th className="px-4 py-3 text-left font-semibold">Kode Pos</th>
                                        <th className="px-4 py-3 text-center w-24 font-semibold">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-slate-700">
                                    {isLoading ? (
                                        <tr><td colSpan="7" className="text-center py-8 text-slate-400">Loading data...</td></tr>
                                    ) : rows.length > 0 ? (
                                        rows.map((item, index) => (
                                            <tr key={item.id} className="hover:bg-slate-50/50 transition">
                                                <td className="px-4 py-3">{(meta ? (meta.current_page - 1) * meta.per_page : 0) + index + 1}</td>
                                                <td className="px-4 py-3 font-medium">{item.provinsi}</td>
                                                <td className="px-4 py-3 font-medium">{item.kota}</td>
                                                <td className="px-4 py-3 font-medium">{item.kecamatan}</td>
                                                <td className="px-4 py-3 font-medium">{item.kelurahan}</td>
                                                <td className="px-4 py-3 font-medium">{item.kodepos}</td>
                                                <td className="px-4 py-3">
                                                    <div className="flex justify-center items-center gap-2">
                                                        <button onClick={() => navigate(`/portal/master/kode-pos/edit/${encodeId(item.id)}`)} className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg transition"><Pencil size={18} /></button>
                                                        <button onClick={() => handleDelete(item.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition"><Trash2 size={18} /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr><td colSpan="7" className="text-center py-8 text-slate-400">Tidak ada data ditemukan.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Footer */}
                        {meta && meta.last_page > 1 && (
                            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6 border-t border-slate-200 pt-5">
                                <span className="text-sm text-slate-500">
                                    Menampilkan <span className="font-medium text-slate-700">{(meta.current_page - 1) * meta.per_page + 1}</span> - <span className="font-medium text-slate-700">{Math.min(meta.current_page * meta.per_page, meta.total)}</span> dari <span className="font-medium text-slate-700">{meta.total}</span> data
                                </span>
                                
                                <div className="flex items-center gap-1.5 bg-slate-50 p-1 rounded-xl border border-slate-200/60">
                                    <button
                                        disabled={page === 1}
                                        onClick={() => setPage(page - 1)}
                                        className="h-9 px-3 flex items-center justify-center rounded-lg text-slate-600 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200/60 transition disabled:opacity-40 disabled:pointer-events-none"
                                    >
                                        <ChevronLeft size={16} />
                                    </button>

                                    {getPaginationNumbers(meta.current_page, meta.last_page).map((item, i) => (
                                        item === '...' ? (
                                            <span key={i} className="h-9 px-3 flex items-center justify-center text-slate-400 font-medium">...</span>
                                        ) : (
                                            <button
                                                key={i}
                                                onClick={() => setPage(item)}
                                                className={`h-9 min-w-9 px-3 rounded-lg text-sm font-medium transition ${
                                                    meta.current_page === item
                                                        ? 'bg-blue-600 text-white shadow-sm'
                                                        : 'text-slate-600 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200/60'
                                                }`}
                                            >
                                                {item}
                                            </button>
                                        )
                                    ))}

                                    <button
                                        disabled={page === meta?.last_page}
                                        onClick={() => setPage(page + 1)}
                                        className="h-9 px-3 flex items-center justify-center rounded-lg text-slate-600 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200/60 transition disabled:opacity-40 disabled:pointer-events-none"
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