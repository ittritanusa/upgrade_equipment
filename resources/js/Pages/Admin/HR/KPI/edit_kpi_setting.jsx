import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { ArrowLeft, Save, Target, UserPlus, Trash2, Plus, Percent } from 'lucide-react';

export default function EditKPISettingPage() {
    const navigate = useNavigate();
    const { id } = useParams(); // Mengambil ID dari URL

    // State untuk data
    const [kpiForm, setKpiForm] = useState({
        nama_karyawan: '',
        periode: '',
    });

    const [kpiItems, setKpiItems] = useState([
        { id: Date.now(), indikator: '', target: '', bobot: 0 }
    ]);

    // Simulasi Fetch Data berdasarkan ID
    useEffect(() => {
        console.log("Fetching data untuk ID:", id);
        // Simulasi data yang didapat dari API
        setKpiForm({ nama_karyawan: 'Budi Santoso', periode: 'Q1 2026' });
        setKpiItems([
            { id: 1, indikator: 'Pencapaian Sales', target: '1 Miliar', bobot: 60 },
            { id: 2, indikator: 'Kepuasan Pelanggan', target: '4.8/5', bobot: 40 }
        ]);
    }, [id]);

    const totalBobot = kpiItems.reduce((sum, item) => sum + Number(item.bobot || 0), 0);

    // Handlers
    const handleItemChange = (id, field, value) => {
        setKpiItems(kpiItems.map(item => item.id === id ? { ...item, [field]: value } : item));
    };

    const handleAddItem = () => setKpiItems([...kpiItems, { id: Date.now(), indikator: '', target: '', bobot: 0 }]);
    const handleRemoveItem = (id) => kpiItems.length > 1 && setKpiItems(kpiItems.filter(item => item.id !== id));

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Data KPI berhasil diperbarui!');
        navigate('/portal/manpower/kpi-setting');
    };

    const inputStyle = "w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition";

    return (
        <PortalLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Edit KPI Setting</h1>
                        <p className="text-sm text-gray-500">Perbarui indikator kinerja untuk {kpiForm.nama_karyawan}</p>
                    </div>
                    <button onClick={() => navigate(-1)} className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50 flex items-center gap-2">
                        <ArrowLeft size={16} /> Kembali
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <div className="xl:col-span-2 space-y-6">
                        <div className="bg-white border p-6 rounded-3xl shadow-sm">
                            <h2 className="font-semibold flex items-center gap-2 mb-4"><UserPlus size={18} className="text-indigo-600" /> Informasi Umum</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <input value={kpiForm.nama_karyawan} disabled className={`${inputStyle} bg-gray-50`} />
                                <input value={kpiForm.periode} className={inputStyle} onChange={(e) => setKpiForm({...kpiForm, periode: e.target.value})} />
                            </div>
                        </div>

                        <div className="bg-white border rounded-3xl shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b flex justify-between items-center">
                                <h2 className="font-semibold flex items-center gap-2"><Target size={18} className="text-emerald-600" /> Indikator Kinerja</h2>
                                <button type="button" onClick={handleAddItem} className="text-xs bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 flex items-center gap-1">
                                    <Plus size={14} /> Tambah Indikator
                                </button>
                            </div>
                            <div className="p-4">
                                <table className="w-full text-left text-sm border-separate border-spacing-y-2">
                                    <thead>
                                        <tr className="text-gray-500 text-xs uppercase">
                                            <th className="px-4">Indikator</th>
                                            <th className="px-4 w-40">Target</th>
                                            <th className="px-4 w-24">Bobot (%)</th>
                                            <th className="px-4 w-16 text-center">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {kpiItems.map((item) => (
                                            <tr key={item.id}>
                                                <td className="px-2"><input className={inputStyle} value={item.indikator} onChange={(e) => handleItemChange(item.id, 'indikator', e.target.value)} /></td>
                                                <td className="px-2"><input className={inputStyle} value={item.target} onChange={(e) => handleItemChange(item.id, 'target', e.target.value)} /></td>
                                                <td className="px-2"><input type="number" className={inputStyle} value={item.bobot} onChange={(e) => handleItemChange(item.id, 'bobot', e.target.value)} /></td>
                                                <td className="text-center"><button type="button" onClick={() => handleRemoveItem(item.id)} className="text-red-500 p-2"><Trash2 size={16} /></button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white border rounded-3xl shadow-sm p-6">
                            <h2 className="font-semibold flex items-center gap-2 mb-4"><Percent size={18} className="text-indigo-600" /> Ringkasan Bobot</h2>
                            <div className="flex justify-between items-center py-2 border-b">
                                <span>Total Bobot:</span>
                                <span className={`font-bold ${totalBobot === 100 ? 'text-emerald-600' : 'text-amber-600'}`}>{totalBobot}%</span>
                            </div>
                        </div>
                        <button type="submit" className="w-full py-3 rounded-2xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 flex items-center justify-center gap-2">
                            <Save size={18} /> Update Data KPI
                        </button>
                    </div>
                </form>
            </div>
        </PortalLayout>
    );
}