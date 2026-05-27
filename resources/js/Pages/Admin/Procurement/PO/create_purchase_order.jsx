import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';

import {
    Plus,
    Trash2,
    Coins,
    ArrowLeft,
    Save,
    FileText,
    Building2,
    Calendar,
    Truck,
    CreditCard,
    CheckCircle2
} from 'lucide-react';

export default function CreatePurchaseOrder() {
    const navigate = useNavigate();

    // ==========================================
    // SIMULASI DATA REFERENSI (BA APPROVED)
    // ==========================================
    const availableBA = [
        {
            id: 1,
            nomorBA: 'BA-SV/PROC/AGS/2026/05/012',
            perihal: 'Peremajaan Server Ruang Data Center',
            vendorPemenang: 'CV. TechMedia Nusantara',
            totalNilai: 89900000,
            divisi: 'Teknologi Informasi',
            items: [
                { id: 201, namaBarang: 'HPE ProLiant DL380 Gen10', qty: 1, satuan: 'Unit', harga: 59500000, total: 59500000 },
                { id: 202, namaBarang: 'UPS APC Smart-UPS 3000VA', qty: 2, satuan: 'Unit', harga: 15200000, total: 30400000 }
            ]
        },
        {
            id: 2,
            nomorBA: 'BA-SV/PROC/AGS/2026/05/009',
            perihal: 'Pengadaan Komputer & Laptop Divisi IT',
            vendorPemenang: 'PT. Computindo Utama',
            totalNilai: 145000000,
            divisi: 'Teknologi Informasi',
            items: [
                { id: 101, namaBarang: 'Laptop ASUS ExpertBook B5', qty: 5, satuan: 'Unit', harga: 29000000, total: 145000000 }
            ]
        }
    ];

    // ==========================================
    // STATE FORM DATA PO
    // ==========================================
    const [selectedBA, setSelectedBA] = useState(null);
    const [formData, setFormData] = useState({
        nomorPo: 'PO/PROC/AGS/' + new Date().getFullYear() + '/05/005',
        tanggalPo: new Date().toISOString().split('T')[0],
        termOfPayment: 'Net 30',
        deliveryDate: '',
        shippingAddress: 'Gudang Pusat AGS, Jl. Industri No. 12, Jakarta',
        catatan: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handler saat referensi Berita Acara dipilih
    const handleBAChange = (e) => {
        const baId = parseInt(e.target.value);
        const foundBA = availableBA.find(ba => ba.id === baId);
        setSelectedBA(foundBA || null);
    };

    // Helper Format Rupiah
    const formatRupiah = (angka) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(angka);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedBA) return alert('Pilih referensi Berita Acara terlebih dahulu!');

        const payload = {
            ...formData,
            referensiBA: selectedBA.nomorBA,
            vendor: selectedBA.vendorPemenang,
            totalKontrak: selectedBA.totalNilai,
            items: selectedBA.items
        };

        console.log('PO Payload:', payload);
        alert('Dokumen Purchase Order Berhasil Diterbitkan!');
        navigate('/portal/purchase-order');
    };

    return (
        <PortalLayout>
            <div className="space-y-6">
                
                {/* 1. HEADER HALAMAN & BREADCRUMBS */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Terbitkan Purchase Order
                        </h1>
                        <div className="flex items-center gap-2 mt-1 text-sm">
                            <span className="text-gray-400">Procurement</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-gray-400">Purchase Order</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-blue-600 font-medium">Buat PO</span>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 h-10 px-4 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium bg-white hover:bg-gray-50 transition"
                    >
                        <ArrowLeft size={16} /> Kembali
                    </button>
                </div>

                {/* 2. MAIN FORM */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Panel 1: Referensi & Identitas PO */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
                        <h3 className="text-base font-bold text-gray-800 border-b border-gray-100 pb-3 flex items-center gap-2">
                            <FileText size={18} className="text-blue-600" /> Informasi Dokumen PO
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">Nomor PO (Otomatis)</label>
                                <input
                                    type="text"
                                    name="nomorPo"
                                    value={formData.nomorPo}
                                    readOnly
                                    className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm bg-gray-50 text-gray-500 font-medium cursor-not-allowed"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">
                                    Pilih Referensi Berita Acara <span className="text-red-500">*</span>
                                </label>
                                <select 
                                    required
                                    onChange={handleBAChange}
                                    defaultValue=""
                                    className="w-full h-11 px-3 border border-blue-200 rounded-lg text-sm bg-blue-50/30 focus:border-blue-500 outline-none transition"
                                >
                                    <option value="" disabled>-- Pilih BA Vendor Selection --</option>
                                    {availableBA.map(ba => (
                                        <option key={ba.id} value={ba.id}>{ba.nomorBA} - {ba.perihal}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">Tanggal Dokumen PO</label>
                                <input
                                    type="date"
                                    name="tanggalPo"
                                    value={formData.tanggalPo}
                                    onChange={handleInputChange}
                                    className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>

                        {/* Kondisional Info Vendor Pemenang dari BA */}
                        {selectedBA && (
                            <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-emerald-500 text-white rounded-lg">
                                        <Building2 size={20} />
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest block">Vendor Terpilih:</span>
                                        <p className="text-sm font-bold text-gray-900 uppercase">{selectedBA.vendorPemenang}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase block">Total Nilai Kontrak:</span>
                                    <p className="text-lg font-black text-emerald-700">{formatRupiah(selectedBA.totalNilai)}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Panel 2: Syarat & Ketentuan Pengiriman/Pembayaran */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
                        <h3 className="text-base font-bold text-gray-800 border-b border-gray-100 pb-3 flex items-center gap-2">
                            <Truck size={18} className="text-blue-600" /> Syarat & Ketentuan PO
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2 flex items-center gap-1.5">
                                        <CreditCard size={14} /> Term of Payment (TOP)
                                    </label>
                                    <select 
                                        name="termOfPayment"
                                        value={formData.termOfPayment}
                                        onChange={handleInputChange}
                                        className="w-full h-11 px-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 bg-white"
                                    >
                                        <option value="COD">Cash on Delivery (COD)</option>
                                        <option value="Net 14">Net 14 Days</option>
                                        <option value="Net 30">Net 30 Days</option>
                                        <option value="Net 60">Net 60 Days</option>
                                        <option value="DP 30%">DP 30%, Pelunasan sebelum kirim</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">Target Tanggal Pengiriman</label>
                                    <input
                                        type="date"
                                        name="deliveryDate"
                                        value={formData.deliveryDate}
                                        onChange={handleInputChange}
                                        className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm outline-none focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">Alamat Pengiriman (Shipping Address)</label>
                                <textarea
                                    name="shippingAddress"
                                    rows="4"
                                    value={formData.shippingAddress}
                                    onChange={handleInputChange}
                                    className="w-full rounded-lg border border-gray-300 p-3 text-sm outline-none focus:border-blue-500 transition resize-none"
                                ></textarea>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">Instruksi Khusus / Catatan Internal PO</label>
                            <textarea
                                name="catatan"
                                rows="2"
                                value={formData.catatan}
                                onChange={handleInputChange}
                                placeholder="Contoh: Harap konfirmasi 1 hari sebelum pengiriman ke PIC Gudang (Bpk. Andi)..."
                                className="w-full rounded-lg border border-gray-300 p-3 text-sm outline-none focus:border-blue-500 transition resize-none"
                            ></textarea>
                        </div>
                    </div>

                    {/* Panel 3: Rincian Item (Read-only berdasarkan BA) */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
                        <h3 className="text-base font-bold text-gray-800 border-b border-gray-100 pb-3 flex items-center gap-2">
                            <CheckCircle2 size={18} className="text-blue-600" /> Rincian Barang & Harga Final
                        </h3>

                        <div className="overflow-x-auto border border-gray-200 rounded-xl">
                            <table className="min-w-full text-sm">
                                <thead className="bg-gray-50 text-gray-700 font-semibold border-b border-gray-200">
                                    <tr>
                                        <th className="px-4 py-3 text-center w-12">No</th>
                                        <th className="px-4 py-3 text-left">Deskripsi Barang / Jasa</th>
                                        <th className="px-4 py-3 text-center w-24">Qty</th>
                                        <th className="px-4 py-3 text-left w-24">Satuan</th>
                                        <th className="px-4 py-3 text-right w-44">Harga Satuan</th>
                                        <th className="px-4 py-3 text-right w-44">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {selectedBA ? (
                                        selectedBA.items.map((item, index) => (
                                            <tr key={item.id} className="text-xs text-gray-700">
                                                <td className="px-4 py-4 text-center font-medium text-gray-400">{index + 1}</td>
                                                <td className="px-4 py-4 font-bold text-gray-900">{item.namaBarang}</td>
                                                <td className="px-4 py-4 text-center font-bold">{item.qty}</td>
                                                <td className="px-4 py-4 text-gray-500 font-medium">{item.satuan}</td>
                                                <td className="px-4 py-4 text-right">{formatRupiah(item.harga)}</td>
                                                <td className="px-4 py-4 text-right font-bold text-gray-900 bg-gray-50/30">{formatRupiah(item.total)}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="px-4 py-10 text-center text-gray-400 italic">
                                                Data item akan muncul secara otomatis setelah Anda memilih Nomor Berita Acara (BA).
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Grand Total PO */}
                        <div className="flex flex-col items-end gap-2 pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-10 bg-gray-900 text-white px-6 py-3.5 rounded-xl shadow-lg shadow-gray-200">
                                <div className="flex items-center gap-2">
                                    <Coins size={18} className="text-yellow-400" />
                                    <span className="text-xs font-medium text-gray-300 uppercase tracking-wider">Total Nilai Purchase Order:</span>
                                </div>
                                <span className="text-xl font-black tracking-wide">
                                    {selectedBA ? formatRupiah(selectedBA.totalNilai) : 'Rp 0'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Tombol Aksi */}
                    <div className="flex items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="h-10 px-6 rounded-lg border border-gray-300 text-sm font-semibold bg-white text-gray-600 hover:bg-gray-50 transition"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="h-10 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold inline-flex items-center gap-2 transition shadow-md"
                        >
                            <Save size={16} /> Terbitkan & Kirim PO
                        </button>
                    </div>

                </form>
            </div>
        </PortalLayout>
    );
}