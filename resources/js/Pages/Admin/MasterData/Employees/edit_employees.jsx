import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { 
    ArrowLeft, Save, User, CreditCard, 
    Trash2, History, X, Eye, EyeOff, UploadCloud, FileText, ExternalLink 
} from 'lucide-react';

export default function EditEmployeePage() {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const masterData = {
        jabatan: ['Project Manager', 'Site Engineer', 'Finance Officer', 'HR Coordinator'],
        departemen: ['Operations', 'Engineering', 'Finance', 'Human Resources'],
        statusKontrak: ['Tetap', 'Kontrak', 'Probation', 'Magang']
    };

    const mutasiHistory = [
        { id: 1, tanggal: '2025-01-10', info: 'Promosi ke Senior Engineer' },
        { id: 2, tanggal: '2024-05-20', info: 'Mutasi dari Dept. Finance ke Engineering' },
    ];

    const [form, setForm] = useState({
        nama_lengkap: 'Budi Santoso', email: 'budi@company.com', telepon: '08123456789',
        jabatan: 'Project Manager', departemen: 'Engineering', nik: 'EMP-001',
        jenis_kontrak: 'Kontrak', tgl_awal_kontrak: '2025-01-01', tgl_akhir_kontrak: '2026-01-01',
        password: '', confirm_password: '', no_bpjs_kes: '123456789', no_bpjs_tk: '987654321',
        // Data Dokumen (dari database)
        dokumen: {
            ktp: 'ktp_budi.pdf',
            kk: 'kk_budi.pdf',
            npwp: null,
            buku_rekening: 'rekening_budi.pdf'
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setForm(prev => ({ 
            ...prev, 
            dokumen: { ...prev.dokumen, [name]: files[0] } 
        }));
    };

    const isPasswordMatch = form.password === form.confirm_password;

    const docFields = [
        { name: 'ktp', label: 'Scan KTP' },
        { name: 'kk', label: 'Scan Kartu Keluarga' },
        { name: 'npwp', label: 'Scan NPWP' },
        { name: 'buku_rekening', label: 'Buku Rekening' }
    ];

    return (
        <PortalLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Edit Profil Karyawan</h1>
                        <p className="text-sm text-gray-500">Perbarui informasi personal, pekerjaan, dan administrasi</p>
                    </div>
                    <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 text-sm font-medium">
                        <ArrowLeft size={16} /> Kembali
                    </button>
                </div>

                <form className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Kiri: Data Utama */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Data Diri & Pekerjaan */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                            <h2 className="text-lg font-semibold flex items-center gap-2"><User size={20} className="text-indigo-600"/> Data Diri & Pekerjaan</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium mb-1">Nama Lengkap</label>
                                    <input name="nama_lengkap" value={form.nama_lengkap} onChange={handleChange} className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Email</label>
                                    <input name="email" value={form.email} onChange={handleChange} className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">No. Telepon</label>
                                    <input name="telepon" value={form.telepon} onChange={handleChange} className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm" />
                                </div>
                                
                                <div className="relative">
                                    <label className="block text-sm font-medium mb-1">Password Baru</label>
                                    <div className="relative flex items-center">
                                        <input type={showPassword ? "text" : "password"} name="password" onChange={handleChange} className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm pr-12" />
                                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 text-gray-400 hover:text-indigo-600">
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>
                                <div className="relative">
                                    <label className="block text-sm font-medium mb-1">Ketik Ulang Password</label>
                                    <input type="password" name="confirm_password" onChange={handleChange} className={`w-full h-11 rounded-lg border px-4 text-sm ${!isPasswordMatch && form.confirm_password ? 'border-red-500' : 'border-gray-300'}`} />
                                    {!isPasswordMatch && form.confirm_password && <p className="text-xs text-red-500 mt-1 font-medium">Password tidak cocok</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Departemen</label>
                                    <select name="departemen" value={form.departemen} onChange={handleChange} className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm">
                                        {masterData.departemen.map(d => <option key={d}>{d}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Jabatan</label>
                                    <select name="jabatan" value={form.jabatan} onChange={handleChange} className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm">
                                        {masterData.jabatan.map(j => <option key={j}>{j}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Dokumen Legalitas */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><FileText size={20} className="text-indigo-600"/> Dokumen Legalitas</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {docFields.map((field) => (
                                    <div key={field.name} className="border border-gray-200 rounded-xl p-4">
                                        <label className="block text-sm font-medium mb-2">{field.label}</label>
                                        {form.dokumen[field.name] && (
                                            <div className="flex items-center justify-between bg-indigo-50 p-2 rounded-lg mb-2 text-sm text-indigo-700">
                                                <span className="truncate flex-1 font-medium">
                                                    {typeof form.dokumen[field.name] === 'string' ? form.dokumen[field.name] : form.dokumen[field.name].name}
                                                </span>
                                                <a href="#" className="hover:text-indigo-900 ml-2"><ExternalLink size={16} /></a>
                                            </div>
                                        )}
                                        <label className="cursor-pointer flex items-center justify-center gap-2 h-10 w-full rounded-lg border border-dashed border-gray-300 bg-gray-50 text-xs hover:border-indigo-400 transition">
                                            <UploadCloud size={14} /> <span>{form.dokumen[field.name] ? 'Ganti File' : 'Pilih File'}</span>
                                            <input type="file" name={field.name} onChange={handleFileChange} className="hidden" />
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Kanan: Administrasi */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><CreditCard size={20} className="text-indigo-600"/> Administrasi</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">NIK</label>
                                    <input name="nik" value={form.nik} onChange={handleChange} className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Jenis Kontrak</label>
                                    <select name="jenis_kontrak" value={form.jenis_kontrak} onChange={handleChange} className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm">
                                        {masterData.statusKontrak.map(s => <option key={s}>{s}</option>)}
                                    </select>
                                </div>

                                {form.jenis_kontrak !== 'Tetap' && (
                                    <div className="grid grid-cols-2 gap-3 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                                        <div>
                                            <label className="block text-xs font-semibold text-indigo-900 mb-1">Mulai Kontrak</label>
                                            <input type="date" name="tgl_awal_kontrak" value={form.tgl_awal_kontrak} onChange={handleChange} className="w-full h-9 rounded-lg border border-indigo-200 px-2 text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-indigo-900 mb-1">Selesai Kontrak</label>
                                            <input type="date" name="tgl_akhir_kontrak" value={form.tgl_akhir_kontrak} onChange={handleChange} className="w-full h-9 rounded-lg border border-indigo-200 px-2 text-sm" />
                                        </div>
                                    </div>
                                )}
                                
                                <div>
                                    <label className="block text-sm font-medium mb-1">No. BPJS Kes / TK</label>
                                    <input name="no_bpjs_kes" value={form.no_bpjs_kes} placeholder="BPJS Kes" onChange={handleChange} className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm mb-2" />
                                    <input name="no_bpjs_tk" value={form.no_bpjs_tk} placeholder="BPJS TK" onChange={handleChange} className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <button onClick={() => setIsModalOpen(true)} type="button" className="w-full h-12 rounded-xl border border-indigo-200 text-indigo-700 hover:bg-indigo-50 font-semibold flex items-center justify-center gap-2 transition">
                                <History size={18} /> Lihat Riwayat
                            </button>
                            <button type="submit" className="w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center justify-center gap-2 transition">
                                <Save size={18} /> Simpan Perubahan
                            </button>
                            <button type="button" className="w-full h-12 rounded-xl border border-red-100 text-red-600 hover:bg-red-50 font-semibold flex items-center justify-center gap-2 transition">
                                <Trash2 size={18} /> Hapus Karyawan
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            
            {/* Modal Riwayat */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-lg">Riwayat Mutasi</h3>
                            <button onClick={() => setIsModalOpen(false)}><X size={20}/></button>
                        </div>
                        <div className="space-y-4">
                            {mutasiHistory.map((h) => (
                                <div key={h.id} className="border-l-2 border-indigo-200 pl-4 py-1">
                                    <p className="text-xs text-gray-400">{h.tanggal}</p>
                                    <p className="text-sm font-medium text-gray-800">{h.info}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </PortalLayout>
    );
}