import React, { useState } from 'react';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import {
    PieChart,
    FileText,
    AlertTriangle,
    CheckCircle2,
    CreditCard,
    Building2,
    ArrowUpRight,
    ArrowDownRight,
    Calculator,
    X,
    Save,
    CalendarDays,
    Receipt,
} from 'lucide-react';

// ==========================================
// MOCK DATA
// ==========================================
const TAX_SUMMARY = [
    { label: 'PPN Masukan', value: 450000000, trend: '+12%', color: 'text-indigo-600' },
    { label: 'PPN Keluaran', value: 720000000, trend: '+5%', color: 'text-emerald-600' },
    { label: 'PPh Pasal 4(2)', value: 125000000, trend: '-2%', color: 'text-amber-600' },
    { label: 'PPh Pasal 21', value: 85000000, trend: '+8%', color: 'text-blue-600' },
];

const RECENT_TAX_FILINGS = [
    { id: 1, type: 'PPN Masa', period: 'Mei 2026', amount: 270000000, status: 'Filed', date: '25/05/2026' },
    { id: 2, type: 'PPh 4(2)', period: 'April 2026', amount: 45000000, status: 'Pending', date: '05/06/2026' },
];

// ==========================================
// COMPONENT
// ==========================================
export default function TaxDashboardPage() {

    // ==========================================
    // STATE
    // ==========================================
    const [isBillingModalOpen, setIsBillingModalOpen] = useState(false);

    const [billingForm, setBillingForm] = useState({
        jenisPajak: 'PPh Pasal 21',
        masaPajak: '',
        tahunPajak: '2026',
        nominal: '',
        keterangan: '',
    });

    // ==========================================
    // FORMAT RUPIAH
    // ==========================================
    const formatRupiah = (value) =>
        new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(value);

    // ==========================================
    // HANDLE INPUT
    // ==========================================
    const handleChange = (e) => {
        const { name, value } = e.target;

        setBillingForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // ==========================================
    // HANDLE SAVE
    // ==========================================
    const handleSaveBilling = () => {
        alert(`
e-Billing berhasil dibuat!

Jenis Pajak : ${billingForm.jenisPajak}
Masa Pajak : ${billingForm.masaPajak}
Tahun Pajak : ${billingForm.tahunPajak}
Nominal : Rp ${billingForm.nominal}
        `);

        setIsBillingModalOpen(false);
    };

    return (
        <PortalLayout>
            <div className="space-y-6">

                {/* HEADER */}
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Tax Management Dashboard
                    </h1>

                    <p className="text-sm text-gray-500 mt-1">
                        Monitoring kewajiban pajak perusahaan & proyek
                    </p>
                </div>

                {/* KPI CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                    {TAX_SUMMARY.map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm"
                        >
                            <p className="text-sm text-gray-500">
                                {item.label}
                            </p>

                            <h3 className={`text-xl font-bold mt-2 ${item.color}`}>
                                {formatRupiah(item.value)}
                            </h3>

                            <span className="text-xs font-medium text-gray-400 mt-1 block">
                                {item.trend} dari bulan lalu
                            </span>
                        </div>
                    ))}
                </div>

                {/* MAIN CONTENT AREA */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* RECENT FILINGS TABLE */}
                    <div className="lg:col-span-2 bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">

                        <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
                            <h2 className="font-semibold text-gray-900">
                                Status Pelaporan Pajak
                            </h2>

                            <button className="text-sm text-indigo-600 font-medium hover:underline">
                                Lihat Semua
                            </button>
                        </div>

                        <table className="min-w-full text-sm">
                            <thead className="bg-gray-50 text-xs text-gray-600 uppercase">
                                <tr>
                                    <th className="px-6 py-4 text-left">
                                        Jenis Pajak
                                    </th>

                                    <th className="px-6 py-4 text-left">
                                        Periode
                                    </th>

                                    <th className="px-6 py-4 text-right">
                                        Nominal
                                    </th>

                                    <th className="px-6 py-4 text-center">
                                        Status
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200">
                                {RECENT_TAX_FILINGS.map((tax) => (
                                    <tr key={tax.id}>
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            {tax.type}
                                        </td>

                                        <td className="px-6 py-4 text-gray-500">
                                            {tax.period}
                                        </td>

                                        <td className="px-6 py-4 text-right font-semibold">
                                            {formatRupiah(tax.amount)}
                                        </td>

                                        <td className="px-6 py-4 text-center">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                    tax.status === 'Filed'
                                                        ? 'bg-green-50 text-green-700'
                                                        : 'bg-amber-50 text-amber-700'
                                                }`}
                                            >
                                                {tax.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* DEADLINE WIDGET */}
                    <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-6">

                        <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <AlertTriangle
                                size={18}
                                className="text-amber-500"
                            />
                            Deadline Mendatang
                        </h2>

                        <div className="space-y-4">
                            <div className="p-4 rounded-2xl bg-red-50 border border-red-100">
                                <p className="text-sm font-bold text-red-800">
                                    PPh Pasal 21
                                </p>

                                <p className="text-xs text-red-600 mt-1">
                                    Jatuh tempo: 10 Juni 2026
                                </p>
                            </div>

                            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100">
                                <p className="text-sm font-bold text-amber-800">
                                    PPN Masa
                                </p>

                                <p className="text-xs text-amber-600 mt-1">
                                    Jatuh tempo: 30 Juni 2026
                                </p>
                            </div>
                        </div>

                        {/* BUTTON OPEN MODAL */}
                        <button
                            onClick={() => setIsBillingModalOpen(true)}
                            className="w-full mt-6 h-11 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition flex items-center justify-center gap-2"
                        >
                            <CreditCard size={18} />
                            Buat e-Billing
                        </button>
                    </div>
                </div>
            </div>

            {/* ==========================================
                MODAL E-BILLING
            ========================================== */}
            {isBillingModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">

                    <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">

                        {/* HEADER */}
                        <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                    <CreditCard
                                        size={22}
                                        className="text-indigo-600"
                                    />
                                    Buat e-Billing Pajak
                                </h3>

                                <p className="text-sm text-gray-500 mt-1">
                                    Generate kode billing pajak perusahaan
                                </p>
                            </div>

                            <button
                                onClick={() => setIsBillingModalOpen(false)}
                                className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* BODY */}
                        <div className="p-6 space-y-5">

                            {/* Jenis Pajak */}
                            <div>
                                <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                    <Receipt size={16} />
                                    Jenis Pajak
                                </label>

                                <select
                                    name="jenisPajak"
                                    value={billingForm.jenisPajak}
                                    onChange={handleChange}
                                    className="w-full h-12 rounded-2xl border border-gray-200 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option>PPh Pasal 21</option>
                                    <option>PPh Pasal 23</option>
                                    <option>PPh Pasal 4(2)</option>
                                    <option>PPN Masa</option>
                                    <option>PPh Badan</option>
                                </select>
                            </div>

                            {/* GRID */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                {/* Masa Pajak */}
                                <div>
                                    <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                        <CalendarDays size={16} />
                                        Masa Pajak
                                    </label>

                                    <select
                                        name="masaPajak"
                                        value={billingForm.masaPajak}
                                        onChange={handleChange}
                                        className="w-full h-12 rounded-2xl border border-gray-200 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                                    >
                                        <option value="">
                                            Pilih Masa Pajak
                                        </option>

                                        <option>Januari</option>
                                        <option>Februari</option>
                                        <option>Maret</option>
                                        <option>April</option>
                                        <option>Mei</option>
                                        <option>Juni</option>
                                        <option>Juli</option>
                                        <option>Agustus</option>
                                        <option>September</option>
                                        <option>Oktober</option>
                                        <option>November</option>
                                        <option>Desember</option>
                                    </select>
                                </div>

                                {/* Tahun Pajak */}
                                <div>
                                    <label className="text-sm font-semibold text-gray-700 mb-2">
                                        Tahun Pajak
                                    </label>

                                    <input
                                        type="number"
                                        name="tahunPajak"
                                        value={billingForm.tahunPajak}
                                        onChange={handleChange}
                                        className="w-full h-12 rounded-2xl border border-gray-200 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                            </div>

                            {/* Nominal */}
                            <div>
                                <label className="text-sm font-semibold text-gray-700 mb-2">
                                    Nominal Pembayaran
                                </label>

                                <input
                                    type="number"
                                    name="nominal"
                                    value={billingForm.nominal}
                                    onChange={handleChange}
                                    placeholder="Masukkan nominal pembayaran"
                                    className="w-full h-12 rounded-2xl border border-gray-200 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            {/* Keterangan */}
                            <div>
                                <label className="text-sm font-semibold text-gray-700 mb-2">
                                    Keterangan
                                </label>

                                <textarea
                                    rows={4}
                                    name="keterangan"
                                    value={billingForm.keterangan}
                                    onChange={handleChange}
                                    placeholder="Tambahkan catatan..."
                                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            {/* INFO BOX */}
                            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4">
                                <p className="text-sm text-indigo-700">
                                    Setelah e-Billing dibuat, sistem akan menghasilkan
                                    kode billing yang dapat digunakan untuk pembayaran
                                    pajak melalui bank atau DJP Online.
                                </p>
                            </div>
                        </div>

                        {/* FOOTER */}
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end gap-3">

                            <button
                                onClick={() => setIsBillingModalOpen(false)}
                                className="h-11 px-6 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-semibold transition"
                            >
                                Batal
                            </button>

                            <button
                                onClick={handleSaveBilling}
                                className="h-11 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold flex items-center gap-2 transition"
                            >
                                <Save size={16} />
                                Generate e-Billing
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </PortalLayout>
    );
}