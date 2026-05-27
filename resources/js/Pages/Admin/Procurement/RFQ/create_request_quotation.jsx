import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';

import {
    Plus,
    Trash2,
    ArrowLeft,
    Save,
    FileText,
    Building2,
    Calendar,
    Users
} from 'lucide-react';

export default function CreateRequestQuotation() {
    const navigate = useNavigate();

    // ==========================================
    // SIMULASI MASTER DATA DARI BACKEND
    // ==========================================
    // Master PR yang statusnya sudah "Approved / Disetujui"
    const availablePR = [
        {
            id: 1,
            kodePR: 'PR/PROC/AGS/2026/05/001',
            perihal: 'Pengadaan Komputer & Laptop Divisi IT',
            divisi: 'Teknologi Informasi',
            tanggalApproval: '24/05/2026',
            items: [
                { id: 101, namaBarang: 'Laptop ASUS ExpertBook B5', qty: 5, satuan: 'Unit', spek: 'Core i7, 16GB RAM, 512GB SSD' },
                { id: 102, namaBarang: 'Monitor Dell 24 Inch P2422H', qty: 5, satuan: 'Unit', spek: 'FHD, IPS, Ergonomic Stand' }
            ]
        },
        {
            id: 2,
            kodePR: 'PR/PROC/AGS/2026/04/015',
            perihal: 'Peremajaan Server Ruang Data Center',
            divisi: 'Teknologi Informasi',
            tanggalApproval: '18/04/2026',
            items: [
                { id: 201, namaBarang: 'HPE ProLiant DL380 Gen10', qty: 1, satuan: 'Unit', spek: 'Intel Xeon 4208, 32GB RAM' }
            ]
        }
    ];

    // Master Vendor Terdaftar
    const masterVendors = [
        { id: 1, nama: 'PT. Computindo Utama', email: 'sales@computindo.com', kategori: 'IT Hardware' },
        { id: 2, nama: 'CV. TechMedia Nusantara', email: 'info@techmedia.co.id', kategori: 'IT Hardware & Network' },
        { id: 3, nama: 'PT. Sinergi Integrasi', email: 'procurement@sinergi.com', kategori: 'IT & Server' },
        { id: 4, nama: 'PT. Furnitur Kantor Indonesia', email: 'sales@furniturkantor.id', kategori: 'Furniture' }
    ];

    // ==========================================
    // STATE FORM DATA UTAMA (RFQ)
    // ==========================================
    const [selectedPR, setSelectedPR] = useState(null);
    const [invitedVendors, setInvitedVendors] = useState([]);
    const [formData, setFormData] = useState({
        nomorRfq: 'RFQ/PROC/AGS/' + new Date().getFullYear() + '/05/004', // Auto-generated placeholder
        deadlineDate: '',
        catatan: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handler ketika user memilih dokumen referensi Purchase Request
    const handlePRChange = (e) => {
        const prId = parseInt(e.target.value);
        const foundPR = availablePR.find(pr => pr.id === prId);
        setSelectedPR(foundPR || null);
    };

    // Handler memasukkan vendor kandidat ke list undangan
    const handleAddVendor = (e) => {
        const vendorId = parseInt(e.target.value);
        if (!vendorId) return;

        const vendor = masterVendors.find(v => v.id === vendorId);
        if (vendor && !invitedVendors.some(v => v.id === vendor.id)) {
            setInvitedVendors([...invitedVendors, vendor]);
        }
        e.target.value = ""; // Reset dropdown setelah dipilih
    };

    // Handler menghapus vendor dari list undangan
    const handleRemoveVendor = (id) => {
        setInvitedVendors(invitedVendors.filter(v => v.id !== id));
    };

    // Handler submit kirim data form ke backend
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!selectedPR) return alert('Silakan pilih nomor Purchase Request (PR) terlebih dahulu!');
        if (invitedVendors.length === 0) return alert('Minimal pilih 1 vendor untuk diundang ke RFQ ini!');

        const fullPayload = {
            nomorRfq: formData.nomorRfq,
            deadlineDate: formData.deadlineDate,
            catatan: formData.catatan,
            referensiPR: selectedPR.kodePR,
            items: selectedPR.items,
            vendors: invitedVendors.map(v => v.id)
        };

        console.log('Data Request for Quotation Payload:', fullPayload);
        alert('Dokumen RFQ Berhasil Dibuat & Siap Di-broadcast ke Vendor!');
        navigate('/portal/request-quotation');
    };

    return (
        <PortalLayout>
            <div className="space-y-6">
                
                {/* 1. HEADER HALAMAN & BREADCRUMBS */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Request for Quotation
                        </h1>

                        <div className="flex items-center gap-2 mt-1 text-sm">
                            <span className="text-gray-400">Procurement</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-gray-400">Request for Quotation</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-blue-600 font-medium">Buat RFQ Baru</span>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 h-10 px-4 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium bg-white hover:bg-gray-50 transition self-start sm:self-auto"
                    >
                        <ArrowLeft size={16} />
                        Kembali
                    </button>
                </div>

                {/* 2. MAIN FORM ENTRY AREA */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Panel 1: Informasi Dokumen & Aturan Penawaran */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
                        <h3 className="text-base font-bold text-gray-800 border-b border-gray-100 pb-3">
                            Informasi Dokumen & Batas Waktu RFQ
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">
                                    Nomor RFQ <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="nomorRfq"
                                    required
                                    value={formData.nomorRfq}
                                    onChange={handleInputChange}
                                    className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm bg-gray-50 text-gray-500 font-medium cursor-not-allowed"
                                    readOnly
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">
                                    Pilih Referensi Purchase Request (PR) <span className="text-red-500">*</span>
                                </label>
                                <select 
                                    name="referensiPR"
                                    required
                                    defaultValue=""
                                    onChange={handlePRChange}
                                    className="w-full h-11 px-3 border border-gray-300 rounded-lg text-sm focus:border-blue-500 outline-none bg-white transition"
                                >
                                    <option value="" disabled>-- Choose Option --</option>
                                    {availablePR.map(pr => (
                                        <option key={pr.id} value={pr.id}>
                                            {pr.kodePR} - {pr.perihal}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">
                                    Batas Akhir Penawaran (Deadline) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    name="deadlineDate"
                                    required
                                    value={formData.deadlineDate}
                                    onChange={handleInputChange}
                                    className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>

                        {/* Tampilan Kondisional Info Ringkasan Detail PR yang di-select */}
                        {selectedPR && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-gray-200 text-xs text-gray-600">
                                <div>
                                    <span className="font-semibold text-gray-400 block mb-0.5 uppercase tracking-wider">Divisi Pemohon PR:</span>
                                    <span className="text-sm font-bold text-gray-800">{selectedPR.divisi}</span>
                                </div>
                                <div>
                                    <span className="font-semibold text-gray-400 block mb-0.5 uppercase tracking-wider">Tanggal PR Disetujui:</span>
                                    <span className="text-sm font-bold text-gray-800">{selectedPR.tanggalApproval}</span>
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">
                                    Catatan Tambahan / Terms Instruction untuk Vendor
                                </label>
                                <textarea
                                    name="catatan"
                                    rows="2"
                                    value={formData.catatan}
                                    onChange={handleInputChange}
                                    placeholder="Tuliskan instruksi atau catatan khusus mengenai spesifikasi, pengemasan, atau sistem pengiriman dokumen penawaran harga oleh vendor..."
                                    className="w-full rounded-lg border border-gray-300 p-4 text-sm outline-none focus:border-blue-500"
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Panel 2: Pilih & Undang Kandidat Vendor */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
                        <h3 className="text-base font-bold text-gray-800 border-b border-gray-100 pb-3">
                            Undang Mitra Vendor Penawaran
                        </h3>
                        
                        <div className="grid grid-cols-1 gap-4">
                            <div className="max-w-md">
                                <label className="block text-sm font-medium text-gray-600 mb-2">
                                    Pilih Komunitas Vendor <span className="text-red-500">*</span>
                                </label>
                                <select 
                                    defaultValue=""
                                    onChange={handleAddVendor}
                                    className="w-full h-11 px-3 border border-gray-300 rounded-lg text-sm focus:border-blue-500 outline-none bg-white transition"
                                >
                                    <option value="" disabled>-- Cari & Pilih Vendor untuk Dikirimi RFQ --</option>
                                    {masterVendors.map(vendor => (
                                        <option key={vendor.id} value={vendor.id}>
                                            {vendor.nama} ({vendor.kategori})
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* List Baris Badge Vendor yang diundang */}
                        <div className="space-y-2">
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
                                Daftar Undangan Terpilih ({invitedVendors.length})
                            </label>

                            {invitedVendors.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 bg-gray-50 p-4 rounded-xl border border-gray-200">
                                    {invitedVendors.map(vendor => (
                                        <div 
                                            key={vendor.id} 
                                            className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg shadow-sm"
                                        >
                                            <div className="space-y-0.5 truncate pr-2">
                                                <p className="text-xs font-bold text-gray-800 truncate">{vendor.nama}</p>
                                                <p className="text-[10px] text-gray-400 truncate">{vendor.email}</p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveVendor(vendor.id)}
                                                className="text-red-500 hover:text-red-700 p-1.5 rounded hover:bg-red-50 transition shrink-0"
                                                title="Hapus Vendor"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center p-6 text-xs text-gray-400 italic bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                    Belum ada vendor yang dipilih untuk menerima dokumen penawaran harga ini.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Panel 3: Daftar Breakdown Item Barang (Auto Populate dari Pilihan PR) */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
                        <h3 className="text-base font-bold text-gray-800 border-b border-gray-100 pb-3">
                            Rincian Kebutuhan Barang / Jasa (Kunci Ref PR)
                        </h3>

                        {/* Responsive Table Form */}
                        <div className="overflow-x-auto border border-gray-200 rounded-xl">
                            <table className="min-w-full text-sm">
                                <thead className="bg-gray-50 text-gray-700 font-semibold border-b border-gray-200">
                                    <tr>
                                        <th className="px-4 py-3 text-center w-12">No</th>
                                        <th className="px-4 py-3 text-left">Nama Barang / Deskripsi Pekerjaan</th>
                                        <th className="px-4 py-3 text-left min-w-[250px]">Spesifikasi Teknis Aturan</th>
                                        <th className="px-4 py-3 text-center w-28">Kuantitas</th>
                                        <th className="px-4 py-3 text-left w-28">Satuan</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {selectedPR ? (
                                        selectedPR.items.map((item, index) => (
                                            <tr key={item.id} className="hover:bg-gray-50/40 transition-colors text-xs text-gray-700">
                                                <td className="px-4 py-4 text-gray-400 text-center font-medium">
                                                    {index + 1}
                                                </td>
                                                <td className="px-4 py-4 font-semibold text-gray-900">
                                                    {item.namaBarang}
                                                </td>
                                                <td className="px-4 py-4 text-gray-500 italic">
                                                    {item.spek || '-'}
                                                </td>
                                                <td className="px-4 py-4 text-center font-bold text-blue-600 text-sm">
                                                    {item.qty}
                                                </td>
                                                <td className="px-4 py-4 text-gray-500 font-medium">
                                                    {item.satuan}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="px-4 py-8 text-center text-gray-400 italic">
                                                Data item barang akan otomatis tampil di sini setelah Anda memilih Referensi Purchase Request (PR) di atas.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Tombol Aksi Kontrol Kontainer Bawah */}
                    <div className="flex items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="h-10 px-5 rounded-lg border border-gray-300 text-sm font-semibold bg-white text-gray-600 hover:bg-gray-50 transition"
                        >
                            Batalkan
                        </button>
                        
                        <button
                            type="submit"
                            className="h-10 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold inline-flex items-center gap-2 transition shadow-sm"
                        >
                            <Save size={16} /> Broadcast Dokumen RFQ
                        </button>
                    </div>

                </form>
            </div>
        </PortalLayout>
    );
}