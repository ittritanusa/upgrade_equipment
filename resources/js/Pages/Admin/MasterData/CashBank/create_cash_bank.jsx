import React from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { ArrowLeft, Save, Landmark, Building2, Hash, Wallet } from 'lucide-react';

export default function CreateCashBankPage() {
    const navigate = useNavigate();

    return (
        <PortalLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Tambah Akun Kas & Bank</h1>
                        <p className="text-sm text-gray-500 mt-1">Daftarkan akun keuangan baru untuk kebutuhan transaksi perusahaan</p>
                    </div>
                    <button 
                        onClick={() => navigate(-1)} 
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
                    >
                        <ArrowLeft size={16} /> Kembali
                    </button>
                </div>

                <form className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                    <div className="p-6 space-y-6">
                        <h2 className="text-base font-semibold text-gray-800 flex items-center gap-2">
                            <Landmark size={18} className="text-blue-600" /> Informasi Akun
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Akun</label>
                                <input type="text" className="w-full h-10 rounded-lg border border-gray-300 px-3 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Contoh: Bank BCA - Cabang Sudirman" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Kode Akun</label>
                                <input type="text" className="w-full h-10 rounded-lg border border-gray-300 px-3" placeholder="Contoh: CB-005" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tipe Akun</label>
                                <select className="w-full h-10 rounded-lg border border-gray-300 px-3 bg-white">
                                    <option value="Bank">Bank</option>
                                    <option value="Cash">Cash (Kas Kecil)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Rekening</label>
                                <div className="relative">
                                    <Hash size={16} className="absolute left-3 top-3 text-gray-400" />
                                    <input type="text" className="w-full h-10 rounded-lg border border-gray-300 pl-10 pr-3" placeholder="Kosongkan jika tipe Cash" />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Saldo Awal</label>
                                <div className="relative">
                                    <Wallet size={16} className="absolute left-3 top-3 text-gray-400" />
                                    <input type="number" className="w-full h-10 rounded-lg border border-gray-300 pl-10 pr-3" placeholder="0" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Mata Uang</label>
                                <select className="w-full h-10 rounded-lg border border-gray-300 px-3">
                                    <option value="IDR">IDR - Rupiah</option>
                                    <option value="USD">USD - US Dollar</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Catatan</label>
                            <textarea className="w-full h-20 rounded-lg border border-gray-300 px-3 py-2" placeholder="Informasi tambahan terkait akun..."></textarea>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="bg-gray-50 p-6 flex justify-end gap-3">
                        <button type="button" onClick={() => navigate(-1)} className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100">
                            Batal
                        </button>
                        <button type="submit" className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 flex items-center gap-2">
                            <Save size={16} /> Simpan Akun
                        </button>
                    </div>
                </form>
            </div>
        </PortalLayout>
    );
}