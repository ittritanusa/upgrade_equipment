import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';

import {
    ArrowLeft,
    Save,
    Calendar,
    User,
    FileText,
    Building2,
    CheckCircle2
} from 'lucide-react';

export default function CreateLeaveAttendancePage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        employee: '',
        leaveType: '',
        startDate: '',
        endDate: '',
        reason: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        alert('Pengajuan cuti berhasil dikirim');
        navigate(-1);
    };

    return (
        <PortalLayout>
            <div className="space-y-6">

                {/* HEADER */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Ajukan Cuti Karyawan
                        </h1>
                        <p className="text-sm text-gray-500">
                            Form pengajuan cuti & izin karyawan
                        </p>
                    </div>

                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 h-10 px-4 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium bg-white hover:bg-gray-50 transition"
                    >
                        <ArrowLeft size={16} /> Kembali
                    </button>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* PANEL 1 */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
                        <h3 className="text-base font-bold text-gray-800 flex items-center gap-2 border-b pb-3">
                            <User size={18} className="text-blue-600" />
                            Informasi Karyawan
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

                            {/* Employee */}
                            <div className="md:col-span-6">
                                <label className="block text-sm font-medium text-gray-600 mb-2">
                                    Karyawan
                                </label>
                                <select
                                    name="employee"
                                    value={formData.employee}
                                    onChange={handleInputChange}
                                    className="w-full h-11 rounded-lg border border-gray-300 px-3 text-sm focus:border-blue-500 outline-none"
                                >
                                    <option value="">Pilih Karyawan</option>
                                    <option>Budi Santoso</option>
                                    <option>Siti Aminah</option>
                                </select>
                            </div>

                            {/* Leave Type */}
                            <div className="md:col-span-6">
                                <label className="block text-sm font-medium text-gray-600 mb-2">
                                    Jenis Cuti
                                </label>
                                <select
                                    name="leaveType"
                                    value={formData.leaveType}
                                    onChange={handleInputChange}
                                    className="w-full h-11 rounded-lg border border-gray-300 px-3 text-sm focus:border-blue-500 outline-none"
                                >
                                    <option value="">Pilih Jenis Cuti</option>
                                    <option>Cuti Tahunan</option>
                                    <option>Sakit</option>
                                    <option>Izin</option>
                                </select>
                            </div>

                        </div>
                    </div>

                    {/* PANEL 2 */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
                        <h3 className="text-base font-bold text-gray-800 flex items-center gap-2 border-b pb-3">
                            <Calendar size={18} className="text-blue-600" />
                            Periode Cuti
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

                            <div className="md:col-span-6">
                                <label className="block text-sm font-medium text-gray-600 mb-2">
                                    Tanggal Mulai
                                </label>
                                <input
                                    type="date"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleInputChange}
                                    className="w-full h-11 rounded-lg border border-gray-300 px-3 text-sm focus:border-blue-500 outline-none"
                                />
                            </div>

                            <div className="md:col-span-6">
                                <label className="block text-sm font-medium text-gray-600 mb-2">
                                    Tanggal Selesai
                                </label>
                                <input
                                    type="date"
                                    name="endDate"
                                    value={formData.endDate}
                                    onChange={handleInputChange}
                                    className="w-full h-11 rounded-lg border border-gray-300 px-3 text-sm focus:border-blue-500 outline-none"
                                />
                            </div>

                        </div>
                    </div>

                    {/* PANEL 3 */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
                        <h3 className="text-base font-bold text-gray-800 flex items-center gap-2 border-b pb-3">
                            <FileText size={18} className="text-blue-600" />
                            Alasan Cuti
                        </h3>

                        <textarea
                            name="reason"
                            value={formData.reason}
                            onChange={handleInputChange}
                            rows="4"
                            className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 outline-none resize-none"
                            placeholder="Jelaskan alasan pengajuan cuti..."
                        />
                    </div>

                    {/* ACTION */}
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
                            <Save size={16} /> Kirim Pengajuan
                        </button>
                    </div>

                </form>
            </div>
        </PortalLayout>
    );
}