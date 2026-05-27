import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { 
    CreditCard, 
    Search, 
    Filter, 
    Download, 
    CheckCircle2, 
    Clock, 
    XCircle,
    Plus,
    Pencil
} from 'lucide-react';

export default function TaxPaymentPage() {
    const navigate = useNavigate();

    // Mock data riwayat pembayaran
    const paymentHistory = [
        { id: 1, kode: 'BILL-2026-001', jenis: 'PPh Pasal 21', nominal: 5500000, status: 'Lunas', tanggal: '25/05/2026' },
        { id: 2, kode: 'BILL-2026-002', jenis: 'PPN Masa', nominal: 12750000, status: 'Menunggu', tanggal: '28/05/2026' },
        { id: 3, kode: 'BILL-2026-003', jenis: 'PPh Pasal 4(2)', nominal: 2100000, status: 'Gagal', tanggal: '20/05/2026' },
    ];

    const getStatusStyle = (status) => {
        switch(status) {
            case 'Lunas': return 'bg-green-100 text-green-700';
            case 'Menunggu': return 'bg-amber-100 text-amber-700';
            case 'Gagal': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <PortalLayout>
            <div className="space-y-6">
                {/* HEADER */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Tax Payment
                        </h1>

                        <div className="flex items-center gap-2 mt-1 text-sm">
                            <span className="text-gray-400">Tax Management</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-blue-600 font-medium">Tax Payment</span>
                        </div>
                    </div>
                    <button 
                            onClick={() => navigate('/portal/tax/payment/create')}
                        className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition"
                    >
                        <Plus size={16} /> Bayar Pajak Baru
                    </button>
                </div>

                {/* TABLE SECTION */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-gray-100 flex gap-2">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                            <input type="text" placeholder="Cari kode billing..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                        </div>
                    </div>
                    
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-gray-700 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left">Kode Billing</th>
                                <th className="px-6 py-3 text-left">Jenis Pajak</th>
                                <th className="px-6 py-3 text-right">Nominal</th>
                                <th className="px-6 py-3 text-center">Status</th>
                                <th className="px-6 py-3 text-center">Tanggal</th>
                                <th className="px-6 py-3 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {paymentHistory.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">{item.kode}</td>
                                    <td className="px-6 py-4 text-gray-600">{item.jenis}</td>
                                    <td className="px-6 py-4 text-right font-semibold">Rp {item.nominal.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${getStatusStyle(item.status)}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center text-gray-500">{item.tanggal}</td>
                                    <td className="px-4 py-4">
                                        <div className="flex items-center justify-center gap-3">
                                            {/* Button View */}
                                            <button 
                                                onClick={() => navigate(`/portal/tax/payment/edit`)}
                                                className="text-blue-600 hover:text-blue-800 p-0.5 transition"
                                                title="Edit Data"
                                            >
                                                <Pencil size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </PortalLayout>
    );
}