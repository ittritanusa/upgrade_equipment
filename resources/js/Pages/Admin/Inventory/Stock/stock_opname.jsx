import React, { useState, useMemo } from 'react';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { Search, Calendar, FileSpreadsheet, Layers, Filter } from 'lucide-react';

// ==========================================
// 1. DATA MOCK LOGISTIK MUTASI HARIAN (MEI 2026)
// ==========================================
const MOCK_STOCK_OPNAME_DAILY = [
    { id: 1, kode: 'BMT-D16', deskripsi: 'Adjust Valve & Nozle', plant: 'PLANT-A', sisaBulanLalu: 10, mutasiHarian: { 1: { in: 0, out: 2 }, 2: { in: 5, out: 0 }, 15: { in: 0, out: 1 }, 31: { in: 12, out: 0 } } },
    { id: 2, kode: 'BMT-D13', deskripsi: 'Air Radiator & Level Air', plant: 'PLANT-B', sisaBulanLalu: 24, mutasiHarian: { 2: { in: 10, out: 5 }, 5: { in: 0, out: 2 }, 30: { in: 0, out: 4 } } },
    { id: 3, kode: 'CMN-PD50', deskripsi: 'Automatic Tensioner Belt', plant: 'PLANT-A', sisaBulanLalu: 0, mutasiHarian: { 1: { in: 100, out: 20 }, 3: { in: 0, out: 50 } } },
    { id: 4, kode: 'CMN-TIGA', deskripsi: 'By Pass Filter', plant: 'PLANT-C', sisaBulanLalu: 15, mutasiHarian: { 4: { in: 20, out: 10 } } },
    { id: 5, kode: 'PPA-PVC3', deskripsi: 'Engine Mounting', plant: 'PLANT-B', sisaBulanLalu: 8, mutasiHarian: { 1: { in: 0, out: 4 }, 6: { in: 15, out: 0 } } },
    { id: 6, kode: 'ELC-KBL4', deskripsi: 'FIP & Pipa Solar', plant: 'PLANT-A', sisaBulanLalu: 4, mutasiHarian: { 2: { in: 2, out: 1 } } },
    { id: 7, kode: 'SFT-HLM01', deskripsi: 'Fan dan V-belt Tensioner Pully', plant: 'PLANT-B', sisaBulanLalu: 50, mutasiHarian: { 5: { in: 0, out: 10 } } },
    { id: 8, kode: 'FLT-BKR01', deskripsi: 'Filter Bahan Bakar / Solar', plant: 'PLANT-A', sisaBulanLalu: 12, mutasiHarian: {} },
    { id: 9, kode: 'FLT-OLI01', deskripsi: 'Filter Oli Mesin', plant: 'PLANT-A', sisaBulanLalu: 18, mutasiHarian: { 3: { in: 5, out: 5 } } },
    { id: 10, kode: 'FLT-REM01', deskripsi: 'Filter Oli Rem', plant: 'PLANT-C', sisaBulanLalu: 0, mutasiHarian: {} },
];

export default function ListStockOpnameHarian() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPlant, setSelectedPlant] = useState('ALL');
    
    // State Periode Bulan & Tahun (Default: Mei 2026 sesuai waktu sistem saat ini)
    const [selectedMonth, setSelectedMonth] = useState(4); // 4 = Mei dalam JavaScript Date (0-indexed)
    const [selectedYear, setSelectedYear] = useState(2026);

    // ==========================================
    // LOGIKA GENERATE JUMLAH HARI DALAM SEBULAN
    // ==========================================
    const daysInMonthArray = useMemo(() => {
        // Mengambil jumlah hari dengan trik tanggal 0 pada bulan berikutnya
        const totalDays = new Date(selectedYear, selectedMonth + 1, 0).getDate();
        return Array.from({ length: totalDays }, (_, i) => i + 1);
    }, [selectedMonth, selectedYear]);

    // Helper untuk menampilkan format hari & tanggal pada header (Contoh: FRI, 01 MAY)
    const getDayHeaderLabel = (day) => {
        const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        
        const dateObj = new Date(selectedYear, selectedMonth, day);
        const dayName = dayNames[dateObj.getDay()];
        const formattedDay = day.toString().padStart(2, '0');
        const monthName = monthNames[selectedMonth];
        
        return `${dayName}, ${formattedDay} ${monthName}`;
    };

    // Filter data berdasarkan text search dan filter plant
    const filteredData = MOCK_STOCK_OPNAME_DAILY.filter(item => {
        const matchSearch = item.deskripsi.toLowerCase().includes(searchTerm.toLowerCase()) || item.kode.toLowerCase().includes(searchTerm.toLowerCase());
        const matchPlant = selectedPlant === 'ALL' || item.plant === selectedPlant;
        return matchSearch && matchPlant;
    });

    return (
        <PortalLayout>
            <div className="space-y-4 w-full">
                
                {/* 1. HEADER HALAMAN */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-3">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Stock Opname
                        </h1>

                        <div className="flex items-center gap-2 mt-1 text-sm">
                            <span className="text-gray-400">Inventory & Warehouse</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-blue-600 font-medium">Stock Opname</span>
                        </div>
                    </div>
                    
                    <button className="inline-flex items-center gap-1.5 h-9 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition shadow-sm self-start sm:self-auto">
                        <FileSpreadsheet size={14} /> Export Excel
                    </button>
                </div>

                {/* 2. FILTER & SEARCH CONTROL BAR */}
                <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-3 shadow-sm w-full">
                    <div className="flex flex-col sm:flex-row items-center gap-2 w-full lg:w-auto">
                        
                        {/* Search Input */}
                        <div className="relative w-full sm:w-60">
                            <Search className="absolute left-3 top-2.5 text-gray-400" size={14} />
                            <input 
                                type="text"
                                placeholder="Cari Deskripsi Material..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full h-9 pl-9 pr-4 rounded-lg border border-gray-300 text-xs outline-none focus:border-blue-500 transition"
                            />
                        </div>

                        {/* Plant Selector */}
                        <div className="relative w-full sm:w-36">
                            <Layers className="absolute left-3 top-2.5 text-gray-400" size={14} />
                            <select
                                value={selectedPlant}
                                onChange={(e) => setSelectedPlant(e.target.value)}
                                className="w-full h-9 pl-9 pr-3 rounded-lg border border-gray-300 text-xs bg-white outline-none focus:border-blue-500 transition appearance-none font-medium text-gray-700"
                            >
                                <option value="ALL">Semua Plant</option>
                                <option value="PLANT-A">Plant A</option>
                                <option value="PLANT-B">Plant B</option>
                                <option value="PLANT-C">Plant C</option>
                            </select>
                        </div>

                        {/* FILTER PERIODE BULAN */}
                        <div className="relative w-full sm:w-40">
                            <Calendar className="absolute left-3 top-2.5 text-gray-400" size={14} />
                            <select
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                                className="w-full h-9 pl-9 pr-3 rounded-lg border border-gray-300 text-xs bg-white outline-none focus:border-blue-500 transition appearance-none font-bold text-gray-800"
                            >
                                <option value={0}>Januari</option>
                                <option value={1}>Februari</option>
                                <option value={2}>Maret</option>
                                <option value={3}>April</option>
                                <option value={4}>Mei</option>
                                <option value={5}>Juni</option>
                                <option value={6}>Juli</option>
                                <option value={7}>Agustus</option>
                                <option value={8}>September</option>
                                <option value={9}>Oktobor</option>
                                <option value={10}>November</option>
                                <option value={11}>Desember</option>
                            </select>
                        </div>

                        {/* FILTER PERIODE TAHUN */}
                        <div className="relative w-full sm:w-28">
                            <select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                                className="w-full h-9 px-3 rounded-lg border border-gray-300 text-xs bg-white outline-none focus:border-blue-500 transition font-bold text-gray-800"
                            >
                                <option value={2025}>2025</option>
                                <option value={2026}>2026</option>
                                <option value={2027}>2027</option>
                            </select>
                        </div>

                    </div>

                    <div className="text-[11px] text-indigo-600 font-bold font-mono bg-indigo-50/60 px-3 py-1.5 rounded-md border border-indigo-100 self-end lg:self-auto">
                        Jumlah Hari Ter-render: {daysInMonthArray.length} Hari
                    </div>
                </div>

                {/* 3. TABLE GRID MUTASI HORIZONTAL */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden w-full">
                    <div className="overflow-x-auto max-w-full">
                        <table className="w-full border-collapse text-left text-xs">
                            
                            <thead className="bg-gray-50 text-gray-700 font-bold border-b border-gray-200 uppercase tracking-wider sticky top-0">
                                <tr>
                                    <th rowSpan="2" className="border-r border-b border-gray-200 px-3 py-4 text-center w-10 bg-gray-50 z-10">#</th>
                                    <th rowSpan="2" className="border-r border-b border-gray-200 px-3 py-4 w-32 bg-gray-50 z-10">Material Code</th>
                                    <th rowSpan="2" className="border-r border-b border-gray-200 px-4 py-4 w-64 bg-gray-50 z-10">Material Description</th>
                                    <th rowSpan="2" className="border-r border-b border-gray-200 px-3 py-4 w-20 text-center bg-gray-50 z-10">Plant</th>
                                    <th rowSpan="2" className="border-r border-b border-gray-200 px-3 py-4 w-28 text-center bg-gray-50 z-10">Sisa Bulan Lalu</th>
                                    
                                    {/* Auto-looping Header Tanggal Berdasarkan Jumlah Hari Sebulan */}
                                    {daysInMonthArray.map((day) => (
                                        <th key={day} colSpan="2" className="border-r border-b border-gray-200 px-2 py-1.5 text-center text-[10px] font-mono bg-gray-100 min-w-[76px]">
                                            {getDayHeaderLabel(day)}
                                        </th>
                                    ))}
                                </tr>
                                <tr>
                                    {daysInMonthArray.map((day) => (
                                        <React.Fragment key={`sub-${day}`}>
                                            <th className="border-r border-b border-gray-200 py-1 text-center font-bold text-[9px] bg-emerald-600 text-white w-[38px]">IN</th>
                                            <th className="border-r border-b border-gray-200 py-1 text-center font-bold text-[9px] bg-red-600 text-white w-[38px]">OUT</th>
                                        </React.Fragment>
                                    ))}
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200 bg-white">
                                {filteredData.map((item, index) => (
                                    <tr key={item.id} className="hover:bg-gray-50/70 transition">
                                        <td className="border-r border-gray-200 px-3 py-2.5 text-center text-gray-400 font-medium">{index + 1}</td>
                                        <td className="border-r border-gray-200 px-3 py-2.5 font-mono text-gray-500">{item.kode || '-'}</td>
                                        <td className="border-r border-gray-200 px-4 py-2.5 font-semibold text-gray-800 whitespace-nowrap">{item.deskripsi}</td>
                                        <td className="border-r border-gray-200 px-3 py-2.5 text-center font-mono text-gray-400 text-[11px] font-medium">{item.plant || '---'}</td>
                                        <td className="border-r border-gray-200 px-3 py-2.5 text-center font-mono font-bold text-gray-700 bg-gray-50/40">{item.sisaBulanLalu}</td>
                                        
                                        {/* Auto-render Sel Sesuai Jumlah Hari */}
                                        {daysInMonthArray.map((day) => {
                                            const dayData = item.mutasiHarian[day] || { in: 0, out: 0 };
                                            return (
                                                <React.Fragment key={`cell-${item.id}-${day}`}>
                                                    <td className={`border-r border-gray-150 py-2.5 text-center font-mono text-[11px] ${dayData.in > 0 ? 'bg-emerald-50 text-emerald-700 font-bold' : 'text-gray-300'}`}>
                                                        {dayData.in > 0 ? dayData.in : '-'}
                                                    </td>
                                                    <td className={`border-r border-gray-200 py-2.5 text-center font-mono text-[11px] ${dayData.out > 0 ? 'bg-red-50 text-red-700 font-bold' : 'text-gray-300'}`}>
                                                        {dayData.out > 0 ? dayData.out : '-'}
                                                    </td>
                                                </React.Fragment>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                </div>

            </div>
        </PortalLayout>
    );
}