import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { 
    Search, 
    Plus, 
    Eye, 
    Filter, 
    Calendar, 
    FileText, 
    CheckCircle2, 
    Clock, 
    ArrowRightLeft,
    AlertCircle
} from 'lucide-react';

// ==========================================
// MOCK DATA HISTORI ADJUSTMENT
// ==========================================
const MOCK_ADJUSTMENT_LIST = [
    { id: 1, noDoc: 'SA-2026-0189', tanggal: '2026-05-28', gudang: 'GDG-01', totalItem: 3, nilaiDampak: -340000, status: 'Approved', alasan: 'Rusak saat bongkar muat' },
    { id: 2, noDoc: 'SA-2026-0185', tanggal: '2026-05-25', gudang: 'GDG-04', totalItem: 1, nilaiDampak: 850000, status: 'Pending', alasan: 'Temuan stok lebih opname' },
    { id: 3, noDoc: 'SA-2026-0170', tanggal: '2026-05-20', gudang: 'GDG-01', totalItem: 5, nilaiDampak: -1250000, status: 'Approved', alasan: 'Kadaluarsa / Afkir' },
];

export default function ListStockAdjustment() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <PortalLayout>
            <div className="space-y-6 w-full">
                
                {/* 1. HEADER HALAMAN */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Stock Adjustment
                        </h1>

                        <div className="flex items-center gap-2 mt-1 text-sm">
                            <span className="text-gray-400">Inventory & Warehouse</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-blue-600 font-medium">Stock Adjustment</span>
                        </div>
                    </div>
                    <button 
                        onClick={() => navigate('/portal/inventory/stock-adjustment/create')}
                        className="inline-flex items-center gap-2 h-11 px-5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg shadow-sm transition"
                    >
                        <Plus size={18} /> Buat Adjustment Baru
                    </button>
                </div>

                {/* 2. FILTER & SEARCH BAR */}
                <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col md:flex-row gap-3 shadow-sm w-full">
                    <div className="relative flex-grow">
                        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                        <input 
                            type="text"
                            placeholder="Cari No. Dokumen atau Alasan..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full h-10 pl-10 pr-4 rounded-lg border border-gray-300 text-sm outline-none focus:border-indigo-500"
                        />
                    </div>
                    <button className="flex items-center justify-center gap-2 h-10 px-4 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm font-medium hover:bg-gray-50">
                        <Filter size={16} /> Filter Periode
                    </button>
                </div>

                {/* 3. TABLE LIST DATA */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden w-full">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead className="bg-gray-50 text-gray-700 font-bold border-b border-gray-200 uppercase text-xs tracking-wider">
                                <tr>
                                    <th className="px-6 py-4 text-left">No. Dokumen</th>
                                    <th className="px-6 py-4 text-left">Tanggal</th>
                                    <th className="px-6 py-4 text-left">Gudang</th>
                                    <th className="px-6 py-4 text-center">Item</th>
                                    <th className="px-6 py-4 text-right">Dampak Finansial</th>
                                    <th className="px-6 py-4 text-center">Status</th>
                                    <th className="px-6 py-4 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {MOCK_ADJUSTMENT_LIST.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50/50 transition">
                                        <td className="px-6 py-4 font-mono font-bold text-indigo-600">{item.noDoc}</td>
                                        <td className="px-6 py-4 text-gray-600 flex items-center gap-2">
                                            <Calendar size={14} className="text-gray-400" /> {item.tanggal}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-800">{item.gudang}</td>
                                        <td className="px-6 py-4 text-center text-gray-600">{item.totalItem} SKU</td>
                                        <td className={`px-6 py-4 text-right font-mono font-bold ${item.nilaiDampak >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                                            {item.nilaiDampak.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                                                item.status === 'Approved' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                                            }`}>
                                                {item.status === 'Approved' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <button 
                                                onClick={() => navigate(`/portal/inventory/stock-adjustment/detail`)}
                                                className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                                                title="Lihat Detail"
                                            >
                                                <Eye size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </PortalLayout>
    );
}