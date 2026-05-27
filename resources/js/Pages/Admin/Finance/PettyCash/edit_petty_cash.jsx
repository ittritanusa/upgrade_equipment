import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { 
    ChevronLeft, 
    Save, 
    Building2, 
    Calendar, 
    DollarSign, 
    Type,
    AlertCircle,
    ArrowLeft
} from 'lucide-react';

export default function EditPettyCashPage() {
    const navigate = useNavigate();
    const { id } = useParams(); // Mengambil ID dari URL
    
    // Mock state data awal (seolah-olah data diambil dari API berdasarkan ID)
    const [formData, setFormData] = useState({
        date: '2026-05-28',
        project: 'tol-cisumdawu',
        description: 'Pembelian ATK Proyek untuk kebutuhan administrasi kantor lapangan.',
        amount: '2500000',
        category: 'ATK',
        status: 'Pending'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Update Data:', formData);
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
                                Edit Transaksi
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
                                <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal</label>
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
                                <label className="block text-sm font-medium text-gray-700 mb-2">Proyek</label>
                                <div className="relative">
                                    <Building2 className="absolute left-4 top-3.5 text-gray-400" size={18} />
                                    <select 
                                        className="w-full h-11 pl-11 pr-4 rounded-xl border border-gray-300 focus:border-indigo-500 outline-none bg-white"
                                        value={formData.project}
                                        onChange={(e) => setFormData({...formData, project: e.target.value})}
                                    >
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
                                        className="w-full h-11 pl-11 pr-4 rounded-xl border border-gray-300 focus:border-indigo-500 outline-none"
                                        value={formData.amount}
                                        onChange={(e) => setFormData({...formData, amount: e.target.value})}
                                    />
                                </div>
                            </div>

                            {/* KATEGORI */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                                <div className="relative">
                                    <Type className="absolute left-4 top-3.5 text-gray-400" size={18} />
                                    <input 
                                        type="text" 
                                        className="w-full h-11 pl-11 pr-4 rounded-xl border border-gray-300 focus:border-indigo-500 outline-none"
                                        value={formData.category}
                                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* DESKRIPSI */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi Lengkap</label>
                            <textarea 
                                rows={4}
                                className="w-full p-4 rounded-xl border border-gray-300 focus:border-indigo-500 outline-none"
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                            />
                        </div>

                        {/* FOOTER ACTIONS */}
                        <div className="flex justify-between pt-6 border-t border-gray-100">
                            <button 
                                type="button"
                                className="h-11 px-6 rounded-xl border border-red-200 text-red-600 font-medium hover:bg-red-50"
                            >
                                Hapus Transaksi
                            </button>
                            <div className="flex gap-3">
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
                                    <Save size={18} /> Update Transaksi
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </PortalLayout>
    );
}