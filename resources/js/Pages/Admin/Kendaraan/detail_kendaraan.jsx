import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { ArrowLeft, Edit2, FileText } from 'lucide-react';
import { decodeId } from '@/Utils/Helpers/IdHelper';
import { useKendaraanDetail } from './Hooks/useEditKendaraan'; // Sesuaikan lokasi hook

export default function DetailKendaraan() {
    const navigate = useNavigate();
    const { id: encodedId } = useParams();
    const [realId, setRealId] = useState(null);

    useEffect(() => {
        const decoded = decodeId(encodedId);
        if (!decoded) navigate('/portal/master/kendaraan');
        setRealId(decoded);
    }, [encodedId, navigate]);

    const { data: detail, isLoading } = useKendaraanDetail(realId);

    if (isLoading) return <PortalLayout><div>Loading data...</div></PortalLayout>;

    // Helper untuk menampilkan field agar kode lebih bersih
    const DetailField = ({ label, value }) => (
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{label}</label>
            <p className="text-slate-800 font-medium">{value || '-'}</p>
        </div>
    );

    return (
        <PortalLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-slate-800">Detail Kendaraan</h1>
                        <p className="text-sm text-slate-500 mt-1">Menampilkan informasi lengkap kendaraan {detail?.NoPolisi}</p>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => navigate(-1)} className="flex items-center gap-2 h-10 px-4 rounded-lg border bg-white text-slate-700 hover:bg-slate-50">
                            <ArrowLeft size={16} /> Kembali
                        </button>
                        <button 
                            onClick={() => navigate(`/portal/master/kendaraan/edit/${encodedId}`)} 
                            className="flex items-center gap-2 h-10 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                        >
                            <Edit2 size={16} /> Edit Data
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <FileText size={24} />
                        </div>
                        <h2 className="text-lg font-semibold text-slate-800">Informasi Teknis & Administrasi</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <DetailField label="Kode Unit" value={detail?.unit_kendaraan?.Unit} />
                        <DetailField label="Merk" value={detail?.merk_kendaraan?.Merk} />
                        <DetailField label="Tipe" value={detail?.tipe_kendaraan?.Type} />
                        <DetailField label="Tahun" value={detail?.TahunPembuatan} />
                        
                        <DetailField label="No Polisi" value={detail?.NoPolisi} />
                        <DetailField label="No Rangka" value={detail?.NoRangka} />
                        <DetailField label="No Mesin" value={detail?.NoMesin} />
                        <DetailField label="No Lambung" value={detail?.NoLambung} />
                        
                        <DetailField label="No BPKB" value={detail?.NoBPKB} />
                        <DetailField label="Bahan Bakar" value={detail?.BahanBakar} />
                        <DetailField label="Status" value={detail?.KeteranganStatus} />
                    </div>

                    <div className="mt-8">
                        <h3 className="text-md font-semibold text-slate-800 mb-4">Informasi Dokumen KIR & Pajak</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <DetailField label="No KIR I" value={detail?.NoKIR} />
                                <DetailField label="Expired KIR I" value={detail?.ExpiredKIR} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <DetailField label="No KIR II" value={detail?.NoKIR2} />
                                <DetailField label="Expired KIR II" value={detail?.ExpiredKIR2} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <DetailField label="STNK Expired" value={detail?.ExpiredSTNK} />
                                <DetailField label="TAX Expired" value={detail?.ExpiredTAX} />
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 p-4 bg-slate-100 rounded-lg">
                        <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Keterangan Tambahan</label>
                        <p className="text-slate-700 italic">{detail?.Keterangan || 'Tidak ada keterangan'}</p>
                    </div>
                </div>
            </div>
        </PortalLayout>
    );
}