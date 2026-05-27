import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import {
    ArrowLeft, Save, Building2, Users, BadgeDollarSign, Trash2, Plus
} from 'lucide-react';

export default function CreatePayrollPage() {
    const navigate = useNavigate();

    // Simulasi data karyawan untuk select
    const listKaryawan = ['Budi Santoso', 'Siti Aminah', 'Andi Wijaya', 'Dewi Lestari'];

    const [form, setForm] = useState({
        nama_payroll: '',
        periode_gaji: '',
        tahun: '2026',
    });

    const [payrollData, setPayrollData] = useState([
        { id: Date.now(), nama: '', total: '', status: 'Pending' }
    ]);

    const totalPengeluaran = payrollData.reduce((sum, item) => sum + Number(item.total || 0), 0);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleAddRow = () => {
        setPayrollData([...payrollData, { id: Date.now(), nama: '', total: '', status: 'Pending' }]);
    };

    const handleRemoveRow = (id) => {
        if (payrollData.length > 1) {
            setPayrollData(payrollData.filter(row => row.id !== id));
        }
    };

    const handleInputChange = (id, field, value) => {
        setPayrollData(payrollData.map(row => 
            row.id === id ? { ...row, [field]: value } : row
        ));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submit Data:", { ...form, details: payrollData });
        alert('Payroll berhasil disimpan!');
    };

    // Styling bersama untuk input agar terlihat seperti form standar
    const inputStyle = "w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition";

    return (
        <PortalLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Create Payroll</h1>
                        <p className="text-sm text-gray-500">Buat data penggajian untuk periode tertentu</p>
                    </div>
                    <button onClick={() => navigate(-1)} className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50 flex items-center gap-2">
                        <ArrowLeft size={16} /> Kembali
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                        <div className="xl:col-span-2 space-y-6">
                            {/* Informasi Payroll */}
                            <div className="bg-white border p-6 rounded-3xl shadow-sm">
                                <h2 className="font-semibold flex items-center gap-2 mb-4"><Building2 size={18} className="text-indigo-600" /> Informasi Payroll</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <input name="nama_payroll" placeholder="Nama Penggajian" onChange={handleChange} className={inputStyle} required />
                                    <select name="periode_gaji" onChange={handleChange} className={inputStyle} required>
                                        <option value="">Pilih Bulan</option>
                                        {['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'].map(m => <option key={m}>{m}</option>)}
                                    </select>
                                </div>
                            </div>

                            {/* Tabel Karyawan */}
                            <div className="bg-white border rounded-3xl shadow-sm overflow-hidden">
                                <div className="px-6 py-4 border-b flex justify-between items-center">
                                    <h2 className="font-semibold flex items-center gap-2"><Users size={18} className="text-emerald-600" /> Detail Karyawan</h2>
                                    <button type="button" onClick={handleAddRow} className="text-xs bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 flex items-center gap-1">
                                        <Plus size={14} /> Tambah
                                    </button>
                                </div>
                                <div className="p-2">
                                    <table className="w-full text-left text-sm border-separate border-spacing-y-2">
                                        <thead>
                                            <tr className="text-gray-500 text-xs uppercase">
                                                <th className="px-4">Nama Karyawan</th>
                                                <th className="px-4">Total Gaji</th>
                                                <th className="px-4">Status</th>
                                                <th className="px-4 text-center">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {payrollData.map((row) => (
                                                <tr key={row.id}>
                                                    <td className="px-2">
                                                        <select className={inputStyle} value={row.nama} onChange={(e) => handleInputChange(row.id, 'nama', e.target.value)}>
                                                            <option value="">Pilih Karyawan</option>
                                                            {listKaryawan.map(k => <option key={k} value={k}>{k}</option>)}
                                                        </select>
                                                    </td>
                                                    <td className="px-2">
                                                        <input type="number" placeholder="0" className={inputStyle} value={row.total} onChange={(e) => handleInputChange(row.id, 'total', e.target.value)} />
                                                    </td>
                                                    <td className="px-2">
                                                        <select className={inputStyle} value={row.status} onChange={(e) => handleInputChange(row.id, 'status', e.target.value)}>
                                                            <option>Pending</option><option>Dibayar</option>
                                                        </select>
                                                    </td>
                                                    <td className="text-center">
                                                        <button type="button" onClick={() => handleRemoveRow(row.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition"><Trash2 size={16} /></button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="space-y-6">
                            <div className="bg-white border rounded-3xl shadow-sm p-6">
                                <h2 className="font-semibold flex items-center gap-2 mb-4"><BadgeDollarSign size={18} className="text-indigo-600" /> Summary</h2>
                                <div className="border-t pt-4 font-bold flex justify-between">
                                    <span>Total Pengeluaran</span>
                                    <span className="text-indigo-600">
                                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(totalPengeluaran)}
                                    </span>
                                </div>
                            </div>
                            <button type="submit" className="w-full py-3 rounded-2xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 flex items-center justify-center gap-2">
                                <Save size={18} /> Simpan Data
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </PortalLayout>
    );
}