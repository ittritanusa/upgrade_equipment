import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { Save, X, Plus, Trash2, ArrowLeft } from 'lucide-react';

export default function EditJabatan() {
    const navigate = useNavigate();
    const { id } = useParams(); // Mengambil ID dari URL

    // State form
    const [formData, setFormData] = useState({
        kode: '',
        nama: '',
        departemen: ''
    });

    // State untuk daftar komponen (diisi data dari API nantinya)
    const [pendapatan, setPendapatan] = useState([{ id: Date.now(), nama: '', jumlah: '' }]);
    const [potongan, setPotongan] = useState([{ id: Date.now(), nama: '', jumlah: '' }]);

    // Simulasi Fetch Data (Ganti dengan API call Anda)
    useEffect(() => {
        // Contoh: const data = fetchData(id);
        // setFormData({ kode: 'JBT-001', nama: 'Manager', departemen: 'Ops' });
        // setPendapatan([{ id: 1, nama: 'Gaji Pokok', jumlah: '10000000' }]);
    }, [id]);

    const addField = (list, setList) => setList([...list, { id: Date.now(), nama: '', jumlah: '' }]);
    const removeField = (id, list, setList) => setList(list.filter(item => item.id !== id));

    const handleUpdate = (e) => {
        e.preventDefault();
        console.log("Updating data...", { formData, pendapatan, potongan });
    };

    return (
        <PortalLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Edit Jabatan</h1>
                        <div className="flex items-center gap-2 mt-1 text-sm">
                            <span className="text-gray-400">Master Data</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-gray-400">Data Jabatan</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-blue-600 font-medium">Edit Jabatan</span>
                        </div>
                    </div>
                    <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 h-10 px-4 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-sm">
                        <ArrowLeft size={16} /> Kembali
                    </button>
                </div>

                <form onSubmit={handleUpdate} className="space-y-6">
                    {/* Informasi Dasar */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-6">Informasi Jabatan</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Kode Jabatan *</label>
                                <input type="text" defaultValue={formData.kode} className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Nama Jabatan *</label>
                                <input type="text" defaultValue={formData.nama} className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Departemen *</label>
                                <select className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm">
                                    <option>Pilih Departemen</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Komponen Gaji */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white border border-gray-200 rounded-xl p-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Komponen Pendapatan</h2>
                            <div className="space-y-3">
                                {pendapatan.map((item) => (
                                    <div key={item.id} className="flex gap-2">
                                        <input type="text" defaultValue={item.nama} placeholder="Nama" className="flex-1 h-10 rounded-lg border border-gray-300 px-3 text-sm" />
                                        <input type="number" defaultValue={item.jumlah} placeholder="Jumlah" className="w-32 h-10 rounded-lg border border-gray-300 px-3 text-sm" />
                                        <button type="button" onClick={() => removeField(item.id, pendapatan, setPendapatan)} className="text-red-500 p-2"><Trash2 size={18} /></button>
                                    </div>
                                ))}
                                <button type="button" onClick={() => addField(pendapatan, setPendapatan)} className="text-sm text-blue-600 font-medium flex items-center gap-1">
                                    <Plus size={16} /> Tambah Pendapatan
                                </button>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl p-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Komponen Potongan</h2>
                            <div className="space-y-3">
                                {potongan.map((item) => (
                                    <div key={item.id} className="flex gap-2">
                                        <input type="text" defaultValue={item.nama} placeholder="Nama" className="flex-1 h-10 rounded-lg border border-gray-300 px-3 text-sm" />
                                        <input type="number" defaultValue={item.jumlah} placeholder="Jumlah" className="w-32 h-10 rounded-lg border border-gray-300 px-3 text-sm" />
                                        <button type="button" onClick={() => removeField(item.id, potongan, setPotongan)} className="text-red-500 p-2"><Trash2 size={18} /></button>
                                    </div>
                                ))}
                                <button type="button" onClick={() => addField(potongan, setPotongan)} className="text-sm text-red-600 font-medium flex items-center gap-1">
                                    <Plus size={16} /> Tambah Potongan
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 pt-4">
                        <button type="submit" className="flex items-center gap-2 h-11 px-6 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">
                            <Save size={16} /> Simpan Perubahan
                        </button>
                        <button type="button" onClick={() => navigate(-1)} className="flex items-center gap-2 h-11 px-6 rounded-lg border border-gray-300 text-sm font-medium">
                            <X size={16} /> Batal
                        </button>
                    </div>
                </form>
            </div>
        </PortalLayout>
    );
}