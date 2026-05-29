import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { Save, X, Plus, Trash2, ArrowLeft } from 'lucide-react';

export default function CreateJabatan() {
    const navigate = useNavigate();

    // State untuk daftar komponen
    const [pendapatan, setPendapatan] = useState([{ id: Date.now(), nama: '', jumlah: '' }]);
    const [potongan, setPotongan] = useState([{ id: Date.now(), nama: '', jumlah: '' }]);

    // Fungsi tambah & hapus komponen
    const addField = (list, setList) => setList([...list, { id: Date.now(), nama: '', jumlah: '' }]);
    const removeField = (id, list, setList) => setList(list.filter(item => item.id !== id));

    return (
        <PortalLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Tambah Jabatan</h1>
                        <div className="flex items-center gap-2 mt-1 text-sm">
                            <span className="text-gray-400">Master Data</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-gray-400">Data Jabatan</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-blue-600 font-medium">Tambah Jabatan</span>
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

                <form className="space-y-6">
                    {/* Informasi Dasar */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-6">Informasi Jabatan</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Kode Jabatan *</label>
                                <input type="text" className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm" placeholder="Contoh: JBT-001" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Nama Jabatan *</label>
                                <input type="text" className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm" placeholder="Nama Jabatan" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Departemen *</label>
                                <select className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm">
                                    <option>Pilih Departemen</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Komponen Gaji & Potongan */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* List Pendapatan */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Komponen Pendapatan</h2>
                            <div className="space-y-3">
                                {pendapatan.map((item, index) => (
                                    <div key={item.id} className="flex gap-2">
                                        <input type="text" placeholder="Nama (e.g. Tunjangan Makan)" className="flex-1 h-10 rounded-lg border border-gray-300 px-3 text-sm" />
                                        <input type="number" placeholder="Jumlah" className="w-32 h-10 rounded-lg border border-gray-300 px-3 text-sm" />
                                        <button type="button" onClick={() => removeField(item.id, pendapatan, setPendapatan)} className="text-red-500 hover:text-red-700 p-2">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))}
                                <button type="button" onClick={() => addField(pendapatan, setPendapatan)} className="text-sm text-blue-600 font-medium flex items-center gap-1">
                                    <Plus size={16} /> Tambah Pendapatan
                                </button>
                            </div>
                        </div>

                        {/* List Potongan */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Komponen Potongan</h2>
                            <div className="space-y-3">
                                {potongan.map((item, index) => (
                                    <div key={item.id} className="flex gap-2">
                                        <input type="text" placeholder="Nama (e.g. BPJS)" className="flex-1 h-10 rounded-lg border border-gray-300 px-3 text-sm" />
                                        <input type="number" placeholder="Jumlah" className="w-32 h-10 rounded-lg border border-gray-300 px-3 text-sm" />
                                        <button type="button" onClick={() => removeField(item.id, potongan, setPotongan)} className="text-red-500 hover:text-red-700 p-2">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))}
                                <button type="button" onClick={() => addField(potongan, setPotongan)} className="text-sm text-red-600 font-medium flex items-center gap-1">
                                    <Plus size={16} /> Tambah Potongan
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 pt-4">
                        <button type="submit" className="flex items-center gap-2 h-11 px-6 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition">
                            <Save size={16} />
                            Simpan
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/portal/master/jabatan')}
                            className="flex items-center gap-2 h-11 px-6 rounded-lg border border-gray-300 text-sm font-medium hover:bg-gray-50 transition"
                        >
                            <X size={16} />
                            Batal
                        </button>
                    </div>
                </form>
            </div>
        </PortalLayout>
    );
}