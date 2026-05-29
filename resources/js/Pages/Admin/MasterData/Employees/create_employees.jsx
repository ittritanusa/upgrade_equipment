import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { 
    ArrowLeft, Save, User, Briefcase, CreditCard, 
    UploadCloud, FileText, Eye, EyeOff 
} from 'lucide-react';

export default function CreateEmployeePage() {
    const navigate = useNavigate();

    // State untuk kontrol visibilitas password
    const [showPassword, setShowPassword] = useState(false);

    const masterData = {
        jabatan: ['Project Manager', 'Site Engineer', 'Finance Officer', 'HR Coordinator'],
        departemen: ['Operations', 'Engineering', 'Finance', 'Human Resources'],
        statusKontrak: ['Tetap', 'Kontrak', 'Probation', 'Magang']
    };

    const [form, setForm] = useState({
        nama_lengkap: '', email: '', telepon: '', jabatan: '', departemen: '',
        tanggal_bergabung: '', nik: '', alamat: '',
        no_bpjs_kes: '', no_bpjs_tk: '', 
        jenis_kontrak: '', 
        tgl_awal_kontrak: '',
        tgl_akhir_kontrak: '',
        // State untuk file
        ktp: null, kk: null, npwp: null, buku_rekening: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setForm(prev => ({ ...prev, [name]: files[0] }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Data & File yang disubmit:", form);
        alert('Data dan Dokumen karyawan berhasil diunggah!');
    };

    // Validasi untuk remark merah
    const isPasswordMatch = form.password === form.confirm_password;

    return (
        <PortalLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Tambah Karyawan Baru</h1>
                        <p className="text-sm text-gray-500">Lengkapi data profil, administrasi, dan dokumen legalitas</p>
                    </div>
                    <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium hover:bg-gray-50">
                        <ArrowLeft size={16} /> Kembali
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Kiri: Data Utama */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Data Pribadi & Pekerjaan */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                            <h2 className="text-lg font-semibold flex items-center gap-2"><User size={20} className="text-indigo-600"/> Data Diri & Pekerjaan</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2"><label className="block text-sm font-medium mb-1">Nama Lengkap</label>
                                    <input type="text" name="nama_lengkap" onChange={handleChange} className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm" required />
                                </div>
                                <div><label className="block text-sm font-medium mb-1">Email</label>
                                    <input type="email" name="email" onChange={handleChange} className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm" />
                                </div>
                                <div><label className="block text-sm font-medium mb-1">No. Telepon</label>
                                    <input type="text" name="telepon" onChange={handleChange} className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm" />
                                </div>
                                {/* Input Password */}
                                <div className="relative">
                                    <label className="block text-sm font-medium mb-1">Password</label>
                                    <div className="relative flex items-center">
                                        <input 
                                            type={showPassword ? "text" : "password"} 
                                            name="password" 
                                            onChange={handleChange} 
                                            className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm pr-12" 
                                        />
                                        <button 
                                            type="button" 
                                            onClick={() => setShowPassword(!showPassword)} 
                                            className="absolute right-3 text-gray-400 hover:text-indigo-600 transition-colors"
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                <div className="relative">
                                    <label className="block text-sm font-medium mb-1">Ketik Ulang Password</label>
                                    <div className="relative flex items-center">
                                        <input 
                                            type="password" 
                                            name="confirm_password" 
                                            onChange={handleChange} 
                                            className={`w-full h-11 rounded-lg border px-4 text-sm pr-12 ${!isPasswordMatch && form.confirm_password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}`} 
                                        />
                                    </div>
                                    {!isPasswordMatch && form.confirm_password && (
                                        <p className="text-xs text-red-500 mt-1 font-medium absolute">Password tidak cocok</p>
                                    )}
                                </div>
                                <div><label className="block text-sm font-medium mb-1">Departemen</label>
                                    <select name="departemen" onChange={handleChange} className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm">
                                        <option value="">Pilih Departemen</option>
                                        {masterData.departemen.map(d => <option key={d}>{d}</option>)}
                                    </select>
                                </div>
                                <div><label className="block text-sm font-medium mb-1">Jabatan</label>
                                    <select name="jabatan" onChange={handleChange} className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm">
                                        <option value="">Pilih Jabatan</option>
                                        {masterData.jabatan.map(j => <option key={j}>{j}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Upload Dokumen */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><FileText size={20} className="text-indigo-600"/> Dokumen Pendukung (PDF/Image)</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { name: 'ktp', label: 'Scan KTP' },
                                    { name: 'kk', label: 'Scan Kartu Keluarga' },
                                    { name: 'npwp', label: 'Scan NPWP' },
                                    { name: 'buku_rekening', label: 'Buku Rekening' }
                                ].map((field) => (
                                    <div key={field.name}>
                                        <label className="block text-sm font-medium mb-1">{field.label}</label>
                                        <div className="flex items-center gap-2">
                                            <label className="flex-1 cursor-pointer flex items-center justify-center gap-2 h-11 rounded-lg border border-dashed border-gray-300 bg-gray-50 text-sm hover:border-indigo-400 transition">
                                                <UploadCloud size={16} /> <span>Pilih File</span>
                                                <input type="file" name={field.name} onChange={handleFileChange} className="hidden" />
                                            </label>
                                        </div>
                                        {form[field.name] && <p className="text-xs text-indigo-600 mt-1 truncate">{form[field.name].name}</p>}
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
                                <div><label className="block text-sm font-medium mb-1">NIK</label>
                                    <input type="text" name="nik" onChange={handleChange} className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm" placeholder='No Induk Kependudukan' />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Jenis Kontrak</label>
                                    <select 
                                        name="jenis_kontrak" 
                                        onChange={handleChange} 
                                        className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm"
                                    >
                                        <option value="">Pilih Status</option>
                                        {masterData.statusKontrak.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>

                                {/* Conditional Rendering: Muncul hanya jika BUKAN 'Tetap' */}
                                {form.jenis_kontrak !== 'Tetap' && form.jenis_kontrak !== '' && (
                                    <div className="grid grid-cols-2 gap-3 p-4 bg-indigo-50 rounded-xl border border-indigo-100 animate-in fade-in slide-in-from-top-2">
                                        <div>
                                            <label className="block text-xs font-semibold text-indigo-900 mb-1">Mulai Kontrak</label>
                                            <input 
                                                type="date" 
                                                name="tgl_awal_kontrak" 
                                                onChange={handleChange} 
                                                className="w-full h-9 rounded-lg border border-indigo-200 px-2 text-sm" 
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-indigo-900 mb-1">Selesai Kontrak</label>
                                            <input 
                                                type="date" 
                                                name="tgl_akhir_kontrak" 
                                                onChange={handleChange} 
                                                className="w-full h-9 rounded-lg border border-indigo-200 px-2 text-sm" 
                                            />
                                        </div>
                                    </div>
                                )}
                                <div><label className="block text-sm font-medium mb-1">No. BPJS Kes / TK</label>
                                    <input type="text" name="no_bpjs_kes" placeholder="BPJS Kes" onChange={handleChange} className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm mb-2" />
                                    <input type="text" name="no_bpjs_tk" placeholder="BPJS TK" onChange={handleChange} className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm" />
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="w-full h-12 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 flex items-center justify-center gap-2 transition">
                            <Save size={18} /> Simpan Data Karyawan
                        </button>
                    </div>
                </form>
            </div>
        </PortalLayout>
    );
}