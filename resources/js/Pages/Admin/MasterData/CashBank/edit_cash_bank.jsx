import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { ArrowLeft, Save, Landmark, Hash, Wallet, Building2 } from 'lucide-react';

export default function EditCashBankPage() {
    const navigate = useNavigate();
    const { id } = useParams();

    // Mock initial data
    const [form, setForm] = useState({
        nama_akun: 'Bank BCA Utama',
        kode_akun: 'CB-001',
        tipe_akun: 'Bank',
        nomor_rekening: '1234567890',
        saldo_awal: 500000000,
        mata_uang: 'IDR',
        status: 'Aktif',
        catatan: 'Rekening operasional pusat'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Data diperbarui:", form);
        alert('Data akun keuangan berhasil diperbarui!');
        navigate(-1);
    };

    return (
        <PortalLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Edit Akun Kas & Bank</h1>
                        <p className="text-sm text-gray-500 mt-1">Update informasi dan status akun keuangan perusahaan</p>
                    </div>
                    <button 
                        onClick={() => navigate(-1)} 
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
                    >
                        <ArrowLeft size={16} /> Kembali
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                    <div className="p-6 space-y-6">
                        <h2 className="text-base font-semibold text-gray-800 flex items-center gap-2">
                            <Landmark size={18} className="text-amber-600" /> Pengaturan Akun
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Akun</label>
                                <input type="text" name="nama_akun" value={form.nama_akun} onChange={handleChange} className="w-full h-10 rounded-lg border border-gray-300 px-3 focus:ring-2 focus:ring-amber-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Kode Akun</label>
                                <input type="text" value={form.kode_akun} className="w-full h-10 rounded-lg border border-gray-300 px-3 bg-gray-50" disabled />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tipe Akun</label>
                                <select name="tipe_akun" value={form.tipe_akun} onChange={handleChange} className="w-full h-10 rounded-lg border border-gray-300 px-3">
                                    <option value="Bank">Bank</option>
                                    <option value="Cash">Cash</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                <select name="status" value={form.status} onChange={handleChange} className="w-full h-10 rounded-lg border border-gray-300 px-3">
                                    <option value="Aktif">Aktif</option>
                                    <option value="Nonaktif">Nonaktif</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Mata Uang</label>
                                <select name="mata_uang" value={form.mata_uang} onChange={handleChange} className="w-full h-10 rounded-lg border border-gray-300 px-3">
                                    <option value="IDR">IDR</option>
                                    <option value="USD">USD</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Rekening</label>
                                <div className="relative">
                                    <Hash size={16} className="absolute left-3 top-3 text-gray-400" />
                                    <input type="text" name="nomor_rekening" value={form.nomor_rekening} onChange={handleChange} className="w-full h-10 rounded-lg border border-gray-300 pl-10 pr-3" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Saldo Awal (Penyesuaian)</label>
                                <div className="relative">
                                    <Wallet size={16} className="absolute left-3 top-3 text-gray-400" />
                                    <input type="number" name="saldo_awal" value={form.saldo_awal} onChange={handleChange} className="w-full h-10 rounded-lg border border-gray-300 pl-10 pr-3" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Catatan</label>
                            <textarea name="catatan" value={form.catatan} onChange={handleChange} className="w-full h-20 rounded-lg border border-gray-300 px-3 py-2"></textarea>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="bg-gray-50 p-6 flex justify-end gap-3">
                        <button type="button" onClick={() => navigate(-1)} className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100">
                            Batal
                        </button>
                        <button type="submit" className="px-5 py-2 rounded-lg bg-amber-600 text-white font-medium hover:bg-amber-700 flex items-center gap-2">
                            <Save size={16} /> Simpan Perubahan
                        </button>
                    </div>
                </form>
            </div>
        </PortalLayout>
    );
}