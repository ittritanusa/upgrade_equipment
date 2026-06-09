import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { ArrowLeft, Truck, FileText, Calendar, Info, MapPin } from 'lucide-react';
import { decodeId } from '@/Utils/Helpers/IdHelper';
import { useDetailAreaUnit } from './Hooks/useEditAreaUnit'; // Sesuaikan path hook Anda

export default function DetailAreaUnit() {
    const navigate = useNavigate();
    const { id: encodedId } = useParams();
    const [realId, setRealId] = useState(null);
    
    useEffect(() => {
        const decoded = decodeId(encodedId);
        if (!decoded) navigate('/portal/master/area-unit');
        setRealId(decoded);
    }, [encodedId, navigate]);
    
    const { data, isLoading } = useDetailAreaUnit(realId);

    if (isLoading) return <PortalLayout>Loading...</PortalLayout>;
    if (!data) return <PortalLayout>Data tidak ditemukan.</PortalLayout>;

    // Komponen helper untuk baris informasi
    const InfoRow = ({ label, value }) => (
        <div className="flex border-b border-slate-100 py-3 last:border-0">
            <span className="w-1/3 text-sm text-slate-500">{label}</span>
            <span className="w-2/3 text-sm font-medium text-slate-800">{value || '-'}</span>
        </div>
    );

    return (
        <PortalLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-slate-800">Detail Kendaraan</h1>
                    <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 h-10 px-4 rounded-lg border border-slate-300 bg-white text-slate-700 text-sm hover:bg-slate-50">
                        <ArrowLeft size={16} /> Kembali
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Card Informasi Dasar */}
                    <div className="bg-white border border-slate-200 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Truck size={20} /></div>
                            <h2 className="font-semibold text-slate-800">Informasi Dasar</h2>
                        </div>
                        <InfoRow label="No. Polisi" value={data.NoPolisi} />
                        <InfoRow label="Tipe Unit" value={data.TypeUnit} />
                        <InfoRow label="No. Lambung" value={data.NoLambung} />
                        <InfoRow label="Merk" value={data.MerekTypeUnit} />
                        <InfoRow label="Milik" value={data.Milik} />
                        <InfoRow label="Lokasi" value={data.LokasiUnit} />
                    </div>

                    {/* Card Dokumen */}
                    <div className="bg-white border border-slate-200 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-green-50 rounded-lg text-green-600"><FileText size={20} /></div>
                            <h2 className="font-semibold text-slate-800">Perizinan & Dokumen</h2>
                        </div>
                        <InfoRow label="No. BPKB" value={data.NoBPKB} />
                        <InfoRow label="No. KIR" value={data.NoKIR} />
                        <InfoRow label="Expired STNK" value={data.ExpiredSTNK} />
                        <InfoRow label="Expired TAX" value={data.ExpiredTAX} />
                        <InfoRow label="Expired KIR" value={data.ExpiredKIR} />
                        <InfoRow label="Tahun" value={data.TahunPembuatan} />
                    </div>

                    {/* Card Status & Keterangan */}
                    <div className="bg-white border border-slate-200 rounded-xl p-6 md:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-amber-50 rounded-lg text-amber-600"><Info size={20} /></div>
                            <h2 className="font-semibold text-slate-800">Status & Keterangan</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <span className="text-sm text-slate-500">Status Unit</span>
                                <div className="mt-1 font-semibold text-slate-800">
                                    {data.StatusUnit == 1 ? 'Aktif' : 'Breakdown'}
                                </div>
                            </div>
                            <div>
                                <span className="text-sm text-slate-500">Keterangan</span>
                                <div className="mt-1 p-3 bg-slate-50 rounded-lg text-sm text-slate-700 min-h-[60px]">
                                    {data.KeteranganStatus || '-'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PortalLayout>
    );
}