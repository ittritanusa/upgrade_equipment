import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { 
    ChevronLeft, 
    Save, 
    FileText, 
    Building2, 
    Calendar, 
    DollarSign, 
    Type,
    ArrowLeft
} from 'lucide-react';

export default function CreatePettyCashPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        project: '',
        description: '',
        amount: '',
        category: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Submitted:', formData);
        // Tambahkan logic API call di sini
        navigate('/portal/finance/petty-cash');
    };

    return (
        <PortalLayout>
            <div className="space-y-6">
                {/* HEADER */}
                <div className="flex items-center justify-between">
                    <div>

                        <h1 className="text-2xl font-semibold text-gray-900">
                            Buat Transaksi Petty Cash
                        </h1>

                        <div className="flex items-center gap-2 mt-1 text-sm">

                            <span className="text-gray-400">
                                Accounting & Finance
                            </span>

                            <span className="text-gray-300">/</span>

                            <span className="text-gray-400">
                                Petty Cash
                            </span>

                            <span className="text-gray-300">/</span>

                            <span className="text-indigo-600 font-medium">
                                Buat Transaksi
                            </span>

                        </div>

                    </div>

                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 h-11 px-5 rounded-xl border border-gray-300 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 transition"
                    >
                        <ArrowLeft size={18} />
                        Kembali
                    </button>
                </div>

                {/* FORM CARD */}
                <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            
                            {/* TANGGAL */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Transaksi</label>
                                <div className="relative">
                                    <Calendar className="absolute left-4 top-3.5 text-gray-400" size={18} />
                                    <input 
                                        type="date" 
                                        required
                                        className="w-full h-11 pl-11 pr-4 rounded-xl border border-gray-300 focus:border-indigo-500 outline-none"
                                        value={formData.date}
                                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                                    />
                                </div>
                            </div>

                            {/* PROYEK */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Pilih Proyek</label>
                                <div className="relative">
                                    <Building2 className="absolute left-4 top-3.5 text-gray-400" size={18} />
                                    <select 
                                        required
                                        className="w-full h-11 pl-11 pr-4 rounded-xl border border-gray-300 focus:border-indigo-500 outline-none bg-white"
                                        onChange={(e) => setFormData({...formData, project: e.target.value})}
                                    >
                                        <option value="">Pilih proyek...</option>
                                        <option value="tol-cisumdawu">Project Tol Cisumdawu</option>
                                        <option value="gedung-dpr">Project Gedung DPR</option>
                                        <option value="head-office">Head Office</option>
                                    </select>
                                </div>
                            </div>

                            {/* NOMINAL */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Nominal (IDR)</label>
                                <div className="relative">
                                    <DollarSign className="absolute left-4 top-3.5 text-gray-400" size={18} />
                                    <input 
                                        type="number" 
                                        placeholder="0"
                                        required
                                        className="w-full h-11 pl-11 pr-4 rounded-xl border border-gray-300 focus:border-indigo-500 outline-none"
                                        onChange={(e) => setFormData({...formData, amount: e.target.value})}
                                    />
                                </div>
                            </div>

                            {/* KATEGORI */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Kategori Pengeluaran</label>
                                <div className="relative">
                                    <Type className="absolute left-4 top-3.5 text-gray-400" size={18} />
                                    <input 
                                        type="text" 
                                        placeholder="Contoh: ATK, Konsumsi, Bensin"
                                        required
                                        className="w-full h-11 pl-11 pr-4 rounded-xl border border-gray-300 focus:border-indigo-500 outline-none"
                                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* DESKRIPSI LENGKAP */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi Lengkap</label>
                            <textarea 
                                rows={4}
                                required
                                placeholder="Masukkan rincian pengeluaran secara detail..."
                                className="w-full p-4 rounded-xl border border-gray-300 focus:border-indigo-500 outline-none"
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                            />
                        </div>

                        {/* FOOTER ACTIONS */}
                        <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                            <button 
                                type="button"
                                onClick={() => navigate(-1)}
                                className="h-11 px-6 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50"
                            >
                                Batal
                            </button>
                            <button 
                                type="submit"
                                className="h-11 px-6 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 flex items-center gap-2"
                            >
                                <Save size={18} /> Simpan Transaksi
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </PortalLayout>
    );
}