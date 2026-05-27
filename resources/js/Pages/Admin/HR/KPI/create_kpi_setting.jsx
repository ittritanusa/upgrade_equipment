import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import {
    ArrowLeft, Save, Target, UserPlus, Trash2, Plus, Percent
} from 'lucide-react';

export default function KPISettingPage() {
    const navigate = useNavigate();

    // Data simulasi
    const listKaryawan = ['Budi Santoso', 'Siti Aminah', 'Andi Wijaya', 'Dewi Lestari'];
    
    const [kpiForm, setKpiForm] = useState({
        nama_karyawan: '',
        periode: '',
        tahun: '2026'
    });

    const [kpiItems, setKpiItems] = useState([
        { id: Date.now(), indikator: '', target: '', bobot: 0 }
    ]);

    const totalBobot = kpiItems.reduce((sum, item) => sum + Number(item.bobot || 0), 0);

    const handleAddItem = () => {
        setKpiItems([...kpiItems, { id: Date.now(), indikator: '', target: '', bobot: 0 }]);
    };

    const handleRemoveItem = (id) => {
        if (kpiItems.length > 1) {
            setKpiItems(kpiItems.filter(item => item.id !== id));
        }
    };

    const handleItemChange = (id, field, value) => {
        setKpiItems(kpiItems.map(item => 
            item.id === id ? { ...item, [field]: value } : item
        ));
    };

    const inputStyle = "w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition";

    return (
        <PortalLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">KPI Setting</h1>
                        <p className="text-sm text-gray-500">Tetapkan indikator kinerja utama karyawan</p>
                    </div>
                    <button onClick={() => navigate(-1)} className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50 flex items-center gap-2">
                        <ArrowLeft size={16} /> Kembali
                    </button>
                </div>

                <form className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <div className="xl:col-span-2 space-y-6">
                        {/* Header Form */}
                        <div className="bg-white border p-6 rounded-3xl shadow-sm">
                            <h2 className="font-semibold flex items-center gap-2 mb-4"><UserPlus size={18} className="text-indigo-600" /> Pengaturan Awal</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <select className={inputStyle} onChange={(e) => setKpiForm({...kpiForm, nama_karyawan: e.target.value})}>
                                    <option value="">Pilih Karyawan</option>
                                    {listKaryawan.map(k => <option key={k} value={k}>{k}</option>)}
                                </select>
                                <input type="text" placeholder="Periode (Contoh: Q1)" className={inputStyle} onChange={(e) => setKpiForm({...kpiForm, periode: e.target.value})} />
                            </div>
                        </div>

                        {/* Tabel KPI */}
                        <div className="bg-white border rounded-3xl shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b flex justify-between items-center">
                                <h2 className="font-semibold flex items-center gap-2"><Target size={18} className="text-emerald-600" /> Key Performance Indicators</h2>
                                <button type="button" onClick={handleAddItem} className="text-xs bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 flex items-center gap-1">
                                    <Plus size={14} /> Tambah Indikator
                                </button>
                            </div>
                            <div className="p-4">
                                <table className="w-full text-left text-sm border-separate border-spacing-y-2">
                                    <thead>
                                        <tr className="text-gray-500 text-xs uppercase">
                                            <th className="px-4">Indikator Kinerja</th>
                                            <th className="px-4 w-40">Target</th>
                                            <th className="px-4 w-24">Bobot (%)</th>
                                            <th className="px-4 w-16 text-center">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {kpiItems.map((item) => (
                                            <tr key={item.id}>
                                                <td className="px-2">
                                                    <input type="text" placeholder="Contoh: Pencapaian Sales" className={inputStyle} value={item.indikator} onChange={(e) => handleItemChange(item.id, 'indikator', e.target.value)} />
                                                </td>
                                                <td className="px-2">
                                                    <input type="text" placeholder="Target Angka/Goal" className={inputStyle} value={item.target} onChange={(e) => handleItemChange(item.id, 'target', e.target.value)} />
                                                </td>
                                                <td className="px-2">
                                                    <input type="number" placeholder="0" className={inputStyle} value={item.bobot} onChange={(e) => handleItemChange(item.id, 'bobot', e.target.value)} />
                                                </td>
                                                <td className="text-center">
                                                    <button type="button" onClick={() => handleRemoveItem(item.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg"><Trash2 size={16} /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Summary */}
                    <div className="space-y-6">
                        <div className="bg-white border rounded-3xl shadow-sm p-6">
                            <h2 className="font-semibold flex items-center gap-2 mb-4"><Percent size={18} className="text-indigo-600" /> Ringkasan Bobot</h2>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span>Total Bobot:</span>
                                    <span className={`font-bold text-lg ${totalBobot !== 100 ? 'text-amber-600' : 'text-emerald-600'}`}>
                                        {totalBobot}%
                                    </span>
                                </div>
                                {totalBobot !== 100 && (
                                    <p className="text-xs text-amber-600 bg-amber-50 p-2 rounded-lg">
                                        Total bobot harus berjumlah 100% untuk menyimpan KPI.
                                    </p>
                                )}
                            </div>
                        </div>
                        <button 
                            disabled={totalBobot !== 100}
                            className={`w-full py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 transition ${totalBobot === 100 ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                        >
                            <Save size={18} /> Simpan KPI
                        </button>
                    </div>
                </form>
            </div>
        </PortalLayout>
    );
}