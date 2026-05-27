import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { 
    ChevronLeft, 
    FileText, 
    Building2, 
    Calendar, 
    DollarSign, 
    Type, 
    Clock3, 
    CheckCircle2, 
    Paperclip,
    Printer,
    Download,
    ArrowLeft
} from 'lucide-react';

export default function DetailPettyCashPage() {
    const navigate = useNavigate();
    const { id } = useParams();

    // Mock data untuk detail
    const detailData = {
        transactionCode: 'PC-2026-00101',
        date: '28 Mei 2026',
        project: 'Project Tol Cisumdawu',
        category: 'ATK',
        amount: 2500000,
        description: 'Pembelian ATK Proyek untuk kebutuhan administrasi kantor lapangan. Pembelian dilakukan di Toko Buku Sentral pada tanggal 27 Mei 2026.',
        status: 'Approved',
        requestedBy: 'Budi Santoso (Site Admin)'
    };

    const formatRupiah = (value) => 
        new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value || 0);

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
                                Detail Transaksi
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

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* INFO UTAMA */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <h3 className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Kode Transaksi</h3>
                                    <p className="text-xl font-bold text-gray-900">{detailData.transactionCode}</p>
                                </div>
                                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-green-50 border border-green-200 text-green-700 text-sm font-semibold">
                                    <CheckCircle2 size={16} /> {detailData.status}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Tanggal</p>
                                    <p className="font-medium text-gray-900 flex items-center gap-2"><Calendar size={16} className="text-indigo-400"/> {detailData.date}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Proyek</p>
                                    <p className="font-medium text-gray-900 flex items-center gap-2"><Building2 size={16} className="text-indigo-400"/> {detailData.project}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Kategori</p>
                                    <p className="font-medium text-gray-900 flex items-center gap-2"><Type size={16} className="text-indigo-400"/> {detailData.category}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Nominal</p>
                                    <p className="font-bold text-2xl text-indigo-600">{formatRupiah(detailData.amount)}</p>
                                </div>
                            </div>

                            <div className="mt-8 pt-8 border-t border-gray-100">
                                <p className="text-sm text-gray-500 mb-2">Deskripsi Lengkap</p>
                                <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl">{detailData.description}</p>
                            </div>
                        </div>
                    </div>

                    {/* SIDEBAR INFO */}
                    <div className="space-y-6">
                        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
                            <h4 className="font-semibold text-gray-900 mb-4">Informasi Tambahan</h4>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs text-gray-500">Diajukan Oleh</p>
                                    <p className="text-sm font-medium">{detailData.requestedBy}</p>
                                </div>
                            </div>
                        </div>

                        {/* LAMPIRAN */}
                        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
                            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <Paperclip size={18} /> Lampiran (Nota)
                            </h4>
                            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-4 text-center hover:border-indigo-300 transition cursor-pointer">
                                <FileText size={32} className="mx-auto text-gray-300 mb-2" />
                                <p className="text-xs text-gray-500">nota_pembelian_atk.pdf</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PortalLayout>
    );
}