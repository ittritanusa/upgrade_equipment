import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

import {
    ChevronDown,
    Eye,
    ClipboardList,
    Wallet,
    BadgeDollarSign,
    CalendarDays,
    Users,
    Plus,
    CircleDollarSign,
    CheckCircle2,
    AlertTriangle,
} from 'lucide-react';

const tabs = [
    'Overview',
    'Task & Schedule',
    'Daily Report',
    'Manpower',
    'Subkontraktor',
    'Equipment',
    'Additional Scope',
];

const dataKurvaS = [
  { name: 'Jan', rencana: 0, aktual: 0 },
  { name: 'Feb', rencana: 20, aktual: 15 },
  { name: 'Mar', rencana: 45, aktual: 40 },
  { name: 'Apr', rencana: 65, aktual: 60 },
  { name: 'Mei', rencana: 85, aktual: 75 },
  { name: 'Jun', rencana: 100, aktual: 90 },
];

export default function DetailProject() {
    const navigate = useNavigate();

    // DEFAULT OPEN TAB = OVERVIEW
    const [activeTab, setActiveTab] =
        useState('Overview');

    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isStatusTaskModalOpen, setIsStatusTaskModalOpen] = useState(false);

    // =========================
    // DATA TASK
    // =========================
    const [tasks, setTasks] = useState([
        {
            task: 'Mobilisasi dan Persiapan',
            pic: 'Joko Susilo',
            start: '24 Mei 2026',
            end: '30 Mei 2026',
            priority: 'High',
            progress: '90%',
            status: 'In Progress',
        },
        {
            task: 'Pekerjaan Pondasi',
            pic: 'Budi Santoso',
            start: '01 Juni 2026',
            end: '20 Juni 2026',
            priority: 'Medium',
            progress: '65%',
            status: 'Done',
        },
    ]);

    // =========================
    // FORM STATE
    // =========================
    const [taskForm, setTaskForm] = useState({
        task: '',
        pic: '',
        start: '',
        end: '',
        priority: 'Medium',
        progress: '0%',
        status: 'On Track',
    });

    // =========================
    // HANDLE INPUT
    // =========================
    const handleTaskChange = (e) => {
        setTaskForm({
            ...taskForm,
            [e.target.name]: e.target.value,
        });
    };

    // =========================
    // SAVE TASK
    // =========================
    const handleSaveTask = () => {
        setTasks([
            ...tasks,
            taskForm,
        ]);

        setTaskForm({
            task: '',
            pic: '',
            start: '',
            end: '',
            priority: 'Medium',
            progress: '0%',
            status: 'On Track',
        });

        setIsTaskModalOpen(false);
    };

    // =========================
    // RENDER TAB CONTENT
    // =========================
    const renderContent = () => {

        // OVERVIEW
        if (activeTab === 'Overview') {
            return (
                <div className="space-y-5">

                    {/* SUMMARY */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">

                        <div className="bg-white border rounded-xl p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Progress Project
                                    </p>

                                    <h3 className="text-3xl font-bold text-gray-800 mt-2">
                                        52.45%
                                    </h3>
                                </div>

                                <ClipboardList
                                    size={24}
                                    className="text-blue-600"
                                />
                            </div>
                        </div>

                        <div className="bg-white border rounded-xl p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Total Budget
                                    </p>

                                    <h3 className="text-xl font-bold text-gray-800 mt-2">
                                        Rp1.500.000.000
                                    </h3>
                                </div>

                                <Wallet
                                    size={24}
                                    className="text-blue-600"
                                />
                            </div>
                        </div>

                        <div className="bg-white border rounded-xl p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Actual Cost
                                    </p>

                                    <h3 className="text-xl font-bold text-gray-800 mt-2">
                                        Rp785.450.000
                                    </h3>

                                    <p className="text-xs text-green-600 mt-2">
                                        52.36%
                                    </p>
                                </div>

                                <BadgeDollarSign
                                    size={24}
                                    className="text-green-600"
                                />
                            </div>
                        </div>

                        <div className="bg-white border rounded-xl p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Sisa Budget
                                    </p>

                                    <h3 className="text-xl font-bold text-gray-800 mt-2">
                                        Rp714.550.000
                                    </h3>

                                    <p className="text-xs text-blue-600 mt-2">
                                        47.64%
                                    </p>
                                </div>

                                <CircleDollarSign
                                    size={24}
                                    className="text-blue-600"
                                />
                            </div>
                        </div>

                        <div className="bg-white border rounded-xl p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Hari Tersisa
                                    </p>

                                    <h3 className="text-3xl font-bold text-gray-800 mt-2">
                                        381
                                    </h3>

                                    <p className="text-xs text-gray-500 mt-2">
                                        Hari
                                    </p>
                                </div>

                                <CalendarDays
                                    size={24}
                                    className="text-green-600"
                                />
                            </div>
                        </div>
                    </div>

                    {/* CONTENT GRID */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

                        {/* LEFT */}
                        <div className="xl:col-span-2 space-y-5">

                            {/* CHART */}
                            <div className="bg-white border rounded-xl p-5">

                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="font-semibold text-gray-800">
                                        Progress vs Plan
                                    </h3>
                                </div>

                                <div className="h-[250px] flex items-center justify-center text-gray-400">
                                    Chart Progress Project
                                </div>
                            </div>

                            {/* TABLE */}
                            <div className="bg-white border rounded-xl overflow-hidden">

                                <div className="p-5 border-b">
                                    <h3 className="font-semibold text-gray-800">
                                        Kinerja Progress
                                    </h3>
                                </div>

                                <div className="overflow-auto">
                                    <table className="w-full text-sm">

                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-4 py-3 text-left">
                                                    Nama Pekerjaan
                                                </th>

                                                <th className="px-4 py-3 text-left">
                                                    Budget Plan (%)
                                                </th>

                                                <th className="px-4 py-3 text-left">
                                                    Budget Actual (%)
                                                </th>

                                                <th className="px-4 py-3 text-left">
                                                    Deviasi
                                                </th>

                                                <th className="px-4 py-3 text-left">
                                                    Status
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {[
                                                'Pekerjaan Pondasi',
                                                'Pekerjaan Struktur',
                                                'MEP',
                                                'Finishing',
                                            ].map((item, index) => (
                                                <tr
                                                    key={index}
                                                    className="border-t"
                                                >
                                                    <td className="px-4 py-3">
                                                        {item}
                                                    </td>

                                                    <td className="px-4 py-3">
                                                        40%
                                                    </td>

                                                    <td className="px-4 py-3">
                                                        32%
                                                    </td>

                                                    <td className="px-4 py-3 text-red-500">
                                                        -8%
                                                    </td>

                                                    <td className="px-4 py-3">
                                                        <span className="bg-red-100 text-red-600 text-xs px-3 py-1 rounded-full">
                                                            Behind
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>

                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div className="space-y-5">

                            {/* DONUT */}
                            <div className="bg-white border rounded-xl p-5">

                                <h3 className="font-semibold text-gray-800 mb-6">
                                    Budget Utilization
                                </h3>

                                <div className="h-[250px] flex items-center justify-center text-gray-400">
                                    Donut Chart Budget
                                </div>
                            </div>

                            {/* TIMELINE */}
                            <div className="bg-white border rounded-xl p-5">

                                <h3 className="font-semibold text-gray-800 mb-5">
                                    Timeline Project
                                </h3>

                                <div className="space-y-5">

                                    {[
                                        'Project Dimulai',
                                        'Mobilisasi Alat',
                                        'Pekerjaan Pondasi',
                                        'Struktur Lantai 1',
                                        'Struktur Lantai 2',
                                        'Finishing',
                                        'Project Selesai',
                                    ].map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start gap-4"
                                        >
                                            <div className="w-3 h-3 rounded-full bg-blue-600 mt-1" />

                                            <div>
                                                <p className="text-sm font-medium text-gray-700">
                                                    {item}
                                                </p>

                                                <p className="text-xs text-gray-400 mt-1">
                                                    01/06/2026
                                                </p>
                                            </div>
                                        </div>
                                    ))}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        // Task & Schedule
        if (activeTab === 'Task & Schedule') {
            return (
                <div className="space-y-5">

                    {/* SUMMARY */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

                        <div className="bg-white border rounded-2xl p-5">
                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Total Task
                                    </p>

                                    <h3 className="text-3xl font-bold text-gray-800 mt-2">
                                        50
                                    </h3>

                                    <p className="text-xs text-green-600 mt-2">
                                        +12% dari bulan lalu
                                    </p>
                                </div>

                                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                                    <ClipboardList
                                        className="text-blue-600"
                                        size={22}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border rounded-2xl p-5">
                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Completed
                                    </p>

                                    <h3 className="text-3xl font-bold text-gray-800 mt-2">
                                        32
                                    </h3>

                                    <p className="text-xs text-green-600 mt-2">
                                        64% selesai
                                    </p>
                                </div>

                                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                                    <CheckCircle2
                                        className="text-green-600"
                                        size={22}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border rounded-2xl p-5">
                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Ongoing
                                    </p>

                                    <h3 className="text-3xl font-bold text-gray-800 mt-2">
                                        13
                                    </h3>

                                    <p className="text-xs text-yellow-600 mt-2">
                                        Sedang berjalan
                                    </p>
                                </div>

                                <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
                                    <CalendarDays
                                        className="text-yellow-600"
                                        size={22}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border rounded-2xl p-5">
                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Delayed Task
                                    </p>

                                    <h3 className="text-3xl font-bold text-gray-800 mt-2">
                                        5
                                    </h3>

                                    <p className="text-xs text-red-600 mt-2">
                                        Butuh perhatian
                                    </p>
                                </div>

                                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                                    <AlertTriangle
                                        className="text-red-600"
                                        size={22}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* MAIN GRID */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

                        {/* LEFT */}
                        <div className="xl:col-span-2 space-y-5">

                            {/* TASK PROGRESS */}
                            <div className="bg-white border rounded-2xl p-5">
                                <h3 className="font-semibold text-gray-800 mb-5">Progress Schedule Project</h3>
                                <div className="space-y-5">
                                    {[
                                        { title: 'Pekerjaan Pondasi', progress: '90%', width: '90%', color: 'bg-green-500' },
                                        { title: 'Pekerjaan Struktur', progress: '70%', width: '70%', color: 'bg-blue-500' },
                                        { title: 'MEP', progress: '45%', width: '45%', color: 'bg-yellow-500' },
                                        { title: 'Finishing', progress: '15%', width: '15%', color: 'bg-red-500' },
                                    ].map((item, index) => (
                                        <div key={index}>
                                            <div className="flex items-center justify-between mb-2">
                                                <p className="text-sm font-medium text-gray-700">{item.title}</p>
                                                <p className="text-sm font-semibold text-gray-800">{item.progress}</p>
                                            </div>
                                            <div className="w-full h-3 rounded-full bg-gray-100 overflow-hidden">
                                                <div className={`h-full rounded-full ${item.color}`} style={{ width: item.width }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* KURVA S CHART */}
                            <div className="bg-white border rounded-2xl p-5">
                                <h3 className="font-semibold text-gray-800 mb-5">Kurva S Monitoring</h3>
                                <div className="h-[250px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={dataKurvaS}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                            <XAxis dataKey="name" fontSize={12} />
                                            <YAxis fontSize={12} unit="%" />
                                            <Tooltip />
                                            <Legend />
                                            <Line type="monotone" dataKey="rencana" stroke="#94a3b8" strokeWidth={2} name="Rencana" />
                                            <Line type="monotone" dataKey="aktual" stroke="#2563eb" strokeWidth={2} name="Aktual" />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* TASK TABLE */}
                            <div className="bg-white border rounded-2xl overflow-hidden">

                                <div className="p-5 border-b flex items-center justify-between">

                                    <div>
                                        <h3 className="font-semibold text-gray-800">
                                            Task Schedule
                                        </h3>

                                        <p className="text-sm text-gray-500 mt-1">
                                            List pekerjaan dan jadwal project
                                        </p>
                                    </div>

                                    <button
                                        onClick={() =>
                                            setIsTaskModalOpen(true)
                                        }
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
                                    >
                                        <Plus size={16} />
                                        Tambah
                                    </button>
                                </div>

                                <div className="overflow-auto">

                                    <table className="w-full text-sm">

                                        <thead className="bg-gray-50">
                                            <tr className="text-left text-gray-600">

                                                <th className="px-5 py-3 font-medium">
                                                    Task
                                                </th>

                                                <th className="px-5 py-3 font-medium">
                                                    PIC
                                                </th>

                                                <th className="px-5 py-3 font-medium">
                                                    Start Date
                                                </th>

                                                <th className="px-5 py-3 font-medium">
                                                    End Date
                                                </th>

                                                <th className="px-5 py-3 font-medium">
                                                    Priority
                                                </th>

                                                <th className="px-5 py-3 font-medium">
                                                    Progress
                                                </th>

                                                <th className="px-5 py-3 font-medium">
                                                    Status
                                                </th>

                                                <th className="px-5 py-3 font-medium">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {tasks.map((item, index) => (
                                                <tr
                                                    key={index}
                                                    className="border-t"
                                                >

                                                    <td className="px-5 py-4 font-medium text-gray-700">
                                                        {item.task}
                                                    </td>

                                                    <td className="px-5 py-4">
                                                        {item.pic}
                                                    </td>

                                                    <td className="px-5 py-4">
                                                        {item.start}
                                                    </td>

                                                    <td className="px-5 py-4">
                                                        {item.end}
                                                    </td>

                                                    <td className="px-5 py-4">

                                                        <span
                                                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                                item.priority === 'High'
                                                                    ? 'bg-red-100 text-red-600'
                                                                    : item.priority ===
                                                                    'Medium'
                                                                    ? 'bg-yellow-100 text-yellow-700'
                                                                    : 'bg-green-100 text-green-700'
                                                            }`}
                                                        >
                                                            {item.priority}
                                                        </span>
                                                    </td>

                                                    <td className="px-5 py-4">

                                                        <div className="flex items-center gap-3">

                                                            <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">

                                                                <div
                                                                    className="h-full bg-blue-600 rounded-full"
                                                                    style={{
                                                                        width:
                                                                            item.progress,
                                                                    }}
                                                                />
                                                            </div>

                                                            <span className="text-xs font-medium text-gray-600">
                                                                {item.progress}
                                                            </span>
                                                        </div>
                                                    </td>

                                                    <td className="px-5 py-4">

                                                        <span
                                                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                                item.status ===
                                                                'Delayed'
                                                                    ? 'bg-red-100 text-red-600'
                                                                    : item.status ===
                                                                    'Done'
                                                                    ? 'bg-green-100 text-green-600'
                                                                    : 'bg-blue-100 text-blue-600'
                                                            }`}
                                                        >
                                                            {item.status}
                                                        </span>
                                                    </td>

                                                    <td className="p-3 text-center">
                                                        <button
                                                            onClick={() =>
                                                                setIsStatusTaskModalOpen(true)
                                                            }
                                                            className="border border-gray-300 hover:bg-gray-50 text-gray-600 px-2 py-1 rounded text-[11px] font-medium flex items-center gap-1 mx-auto"
                                                        >
                                                            Ubah Status
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div className="space-y-5">

                            {/* UPCOMING */}
                            <div className="bg-white border rounded-2xl p-5">

                                <h3 className="font-semibold text-gray-800 mb-5">
                                    Upcoming Schedule
                                </h3>

                                <div className="space-y-4">

                                    {[
                                        {
                                            title: 'Meeting Progress Project',
                                            time: '09:00 AM',
                                        },
                                        {
                                            title: 'QC Struktur Lantai 2',
                                            time: '11:00 AM',
                                        },
                                        {
                                            title: 'Approval Material',
                                            time: '02:00 PM',
                                        },
                                    ].map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start gap-3"
                                        >

                                            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                                                <CalendarDays
                                                    size={18}
                                                    className="text-blue-600"
                                                />
                                            </div>

                                            <div>
                                                <p className="text-sm font-medium text-gray-700">
                                                    {item.title}
                                                </p>

                                                <p className="text-xs text-gray-400 mt-1">
                                                    {item.time}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* TIMELINE */}
                            <div className="bg-white border rounded-2xl p-5">

                                <h3 className="font-semibold text-gray-800 mb-5">
                                    Timeline Project
                                </h3>

                                <div className="space-y-6">

                                    {[
                                        'Project Dimulai',
                                        'Mobilisasi Alat',
                                        'Pekerjaan Pondasi',
                                        'Struktur Lantai 1',
                                        'Struktur Lantai 2',
                                        'Finishing',
                                        'Project Selesai',
                                    ].map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start gap-4 relative"
                                        >

                                            <div className="relative">

                                                <div className="w-3 h-3 rounded-full bg-blue-600 mt-1 z-10 relative" />

                                                {index !== 6 && (
                                                    <div className="absolute left-[5px] top-4 w-[2px] h-10 bg-gray-200" />
                                                )}
                                            </div>

                                            <div>
                                                <p className="text-sm font-medium text-gray-700">
                                                    {item}
                                                </p>

                                                <p className="text-xs text-gray-400 mt-1">
                                                    01/06/2026
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        // DAILY REPORT
        if (activeTab === 'Daily Report') {
            return (
                <div className="bg-white border rounded-xl overflow-hidden">

                    <div className="p-5 border-b flex items-center justify-between">

                        <div>
                            <h3 className="font-semibold text-gray-800">
                                Laporan Harian Terbaru
                            </h3>

                            <p className="text-sm text-gray-500 mt-1">
                                Monitoring progress harian project
                            </p>
                        </div>
                    </div>

                    <div className="overflow-auto">
                        <table className="w-full text-sm">

                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-5 py-3 text-left">
                                        No
                                    </th>

                                    <th className="px-5 py-3 text-left">
                                        Task/Pekerjaan
                                    </th>

                                    <th className="px-5 py-3 text-left">
                                        Tanggal
                                    </th>

                                    <th className="px-5 py-3 text-left">
                                        Cuaca
                                    </th>

                                    <th className="px-5 py-3 text-left">
                                        Kendala
                                    </th>

                                    <th className="px-5 py-3 text-left">
                                        Progress
                                    </th>

                                    <th className="px-5 py-3 text-left">
                                        Status
                                    </th>

                                    <th className="px-5 py-3 text-left">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody>

                                {[1, 2, 3, 4].map((item) => (
                                    <tr
                                        key={item}
                                        className="border-t"
                                    >
                                        <td className="px-5 py-4">
                                            {item}
                                        </td>

                                        <td className="px-5 py-4">
                                            Mobilisasi dan Persiapan
                                        </td>

                                        <td className="px-5 py-4">
                                            25 Mei 2026
                                        </td>

                                        <td className="px-5 py-4">
                                            Cerah
                                        </td>

                                        <td className="px-5 py-4">
                                            Material terlambat
                                        </td>

                                        <td className="px-5 py-4">
                                            85%
                                        </td>

                                        <td className="px-5 py-4">
                                            <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-xs">
                                                In Progress
                                            </span>
                                        </td>

                                        <td className="px-5 py-4">
                                            <button className="text-blue-600 text-sm">
                                                <Eye size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>

                        </table>
                    </div>
                </div>
            );
        }

        // MANPOWER
        if (activeTab === 'Manpower') {
            return (
                <div className="space-y-5">

                    {/* TANGGAL */}
                    <div>
                        <label className="text-sm text-gray-500 block mb-2">
                            Tanggal
                        </label>

                        <div className="w-full md:w-72 bg-gray-100 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700">
                            22 Mei 2026 18:04:50
                        </div>
                    </div>

                    {/* SUMMARY */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

                        <div className="bg-white border border-gray-200 rounded-xl p-5">
                            <div className="flex items-center gap-4">

                                <div className="w-12 h-12 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500">
                                    <Users size={22} />
                                </div>

                                <div>
                                    <div className="flex items-end gap-2">
                                        <h3 className="text-2xl font-bold text-gray-800">
                                            50
                                        </h3>

                                        <span className="text-xs text-gray-400 mb-1">
                                            Orang
                                        </span>
                                    </div>

                                    <p className="text-sm text-gray-500 mt-1">
                                        Total Persentase
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl p-5">
                            <div className="flex items-center gap-4">

                                <div className="w-12 h-12 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500">
                                    <Users size={22} />
                                </div>

                                <div>
                                    <div className="flex items-end gap-2">
                                        <h3 className="text-2xl font-bold text-gray-800">
                                            48
                                        </h3>

                                        <span className="text-xs text-gray-400 mb-1">
                                            Orang
                                        </span>
                                    </div>

                                    <p className="text-sm text-gray-500 mt-1">
                                        Absen Hadir Hari Ini
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl p-5">
                            <div className="flex items-center gap-4">

                                <div className="w-12 h-12 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500">
                                    <Users size={22} />
                                </div>

                                <div>
                                    <div className="flex items-end gap-2">
                                        <h3 className="text-2xl font-bold text-gray-800">
                                            2
                                        </h3>

                                        <span className="text-xs text-gray-400 mb-1">
                                            Orang
                                        </span>
                                    </div>

                                    <p className="text-sm text-gray-500 mt-1">
                                        Absen Tidak Hadir Hari Ini
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl p-5">
                            <div className="flex items-center gap-4">

                                <div className="w-12 h-12 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500">
                                    <Users size={22} />
                                </div>

                                <div>
                                    <div className="flex items-end gap-2">
                                        <h3 className="text-2xl font-bold text-gray-800">
                                            1
                                        </h3>

                                        <span className="text-xs text-gray-400 mb-1">
                                            Orang
                                        </span>
                                    </div>

                                    <p className="text-sm text-gray-500 mt-1">
                                        Absen Terlambat Hari Ini
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ABSENSI */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

                        {/* ABSENSI HARIAN */}
                        <div className="xl:col-span-2 bg-white border border-gray-200 rounded-xl shadow-sm">

                            <div className="p-5 border-b border-gray-200 flex items-center justify-between">

                                <div className="flex items-center gap-3">
                                    <h3 className="font-semibold text-gray-800">
                                        Absensi Harian
                                    </h3>

                                    <span className="bg-blue-100 text-blue-700 text-[11px] px-2 py-1 rounded-md font-medium">
                                        22 Mei 2026
                                    </span>
                                </div>
                            </div>

                            <div className="overflow-auto">

                                <table className="w-full text-sm">

                                    <thead className="bg-gray-50">
                                        <tr className="text-left text-gray-600">

                                            <th className="px-4 py-3 font-medium">
                                                No
                                            </th>

                                            <th className="px-4 py-3 font-medium">
                                                Nama
                                            </th>

                                            <th className="px-4 py-3 font-medium">
                                                Jabatan
                                            </th>

                                            <th className="px-4 py-3 font-medium">
                                                Clock In
                                            </th>

                                            <th className="px-4 py-3 font-medium">
                                                Clock Out
                                            </th>

                                            <th className="px-4 py-3 font-medium">
                                                Status
                                            </th>

                                            <th className="px-4 py-3 font-medium">
                                                Keterangan
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        {[
                                            {
                                                nama: 'Joko Susilo',
                                                jabatan: 'Project Manager',
                                                in: '10:28:44',
                                                out: '17:00:07',
                                                status: 'Hadir',
                                                color: 'green',
                                                ket: '-',
                                            },
                                            {
                                                nama: 'Budi Santoso',
                                                jabatan: 'Site Supervisor',
                                                in: '08:14:59',
                                                out: '10:32:07',
                                                status: 'Hadir',
                                                color: 'green',
                                                ket: '-',
                                            },
                                            {
                                                nama: 'Agung Sembodo',
                                                jabatan: 'Mandor',
                                                in: '08:14:59',
                                                out: '10:32:07',
                                                status: 'Izin',
                                                color: 'yellow',
                                                ket: 'Surat Dokter',
                                            },
                                            {
                                                nama: 'Bambang',
                                                jabatan: 'Tukang',
                                                in: '08:14:59',
                                                out: '10:32:07',
                                                status: 'Approved',
                                                color: 'blue',
                                                ket: '-',
                                            },
                                            {
                                                nama: 'Wahyu',
                                                jabatan: 'Tukang',
                                                in: '08:14:59',
                                                out: '10:32:07',
                                                status: 'Tidak Hadir',
                                                color: 'red',
                                                ket: 'Alpha',
                                            },
                                        ].map((item, index) => (
                                            <tr
                                                key={index}
                                                className="border-t border-gray-100"
                                            >
                                                <td className="px-4 py-3">
                                                    {index + 1}
                                                </td>

                                                <td className="px-4 py-3 font-medium text-gray-800">
                                                    {item.nama}
                                                </td>

                                                <td className="px-4 py-3 text-gray-500">
                                                    {item.jabatan}
                                                </td>

                                                <td className="px-4 py-3 font-mono text-xs">
                                                    {item.in}
                                                </td>

                                                <td className="px-4 py-3 font-mono text-xs">
                                                    {item.out}
                                                </td>

                                                <td className="px-4 py-3">
                                                    <span
                                                        className={`text-white text-[11px] px-3 py-1 rounded-md font-medium
                                                        ${
                                                            item.color === 'green'
                                                                ? 'bg-green-500'
                                                                : item.color === 'yellow'
                                                                ? 'bg-yellow-500'
                                                                : item.color === 'red'
                                                                ? 'bg-red-500'
                                                                : 'bg-blue-500'
                                                        }`}
                                                    >
                                                        {item.status}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-3 text-gray-500">
                                                    {item.ket}
                                                </td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* TOP ABSENSI */}
                        <div className="bg-white border border-gray-200 rounded-xl shadow-sm">

                            <div className="p-5 border-b border-gray-200">
                                <h3 className="font-semibold text-gray-800">
                                    Top Absensi Terlambat
                                </h3>
                            </div>

                            <div className="overflow-auto">

                                <table className="w-full text-sm">

                                    <thead className="bg-gray-50">
                                        <tr className="text-left text-gray-600">

                                            <th className="px-4 py-3 font-medium">
                                                No
                                            </th>

                                            <th className="px-4 py-3 font-medium">
                                                Tanggal
                                            </th>

                                            <th className="px-4 py-3 font-medium">
                                                Nama
                                            </th>

                                            <th className="px-4 py-3 font-medium">
                                                Jabatan
                                            </th>

                                            <th className="px-4 py-3 font-medium">
                                                Durasi
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr className="border-t border-gray-100">

                                            <td className="px-4 py-3">
                                                1
                                            </td>

                                            <td className="px-4 py-3 text-gray-500">
                                                22 Mei 2026
                                            </td>

                                            <td className="px-4 py-3 font-medium">
                                                Joko Susilo
                                            </td>

                                            <td className="px-4 py-3 text-gray-500">
                                                Project Manager
                                            </td>

                                            <td className="px-4 py-3 font-medium">
                                                2 jam : 13 menit
                                            </td>
                                        </tr>
                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>

                    {/* DATA MANPOWER */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

                        {/* TABLE */}
                        <div className="xl:col-span-2 bg-white border border-gray-200 rounded-xl shadow-sm">

                            <div className="p-5 border-b border-gray-200 flex items-center justify-between">

                                <h3 className="font-semibold text-gray-800">
                                    Pengelolaan Data Manpower
                                </h3>

                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                                    <Plus size={16} />
                                    Tambah
                                </button>
                            </div>

                            {/* FILTER */}
                            <div className="px-5 py-4 border-b border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <span>Tampilkan</span>

                                    <select className="border border-gray-300 rounded-md px-2 py-1">
                                        <option>10</option>
                                    </select>

                                    <span>data</span>
                                </div>

                                <div className="flex items-center gap-2 text-sm">
                                    <span className="text-gray-500">
                                        Cari Data :
                                    </span>

                                    <input
                                        type="text"
                                        className="border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            {/* TABLE */}
                            <div className="overflow-auto">

                                <table className="w-full text-sm">

                                    <thead className="bg-gray-50">
                                        <tr className="text-left text-gray-600">

                                            <th className="px-4 py-3 font-medium">
                                                No
                                            </th>

                                            <th className="px-4 py-3 font-medium">
                                                Nama
                                            </th>

                                            <th className="px-4 py-3 font-medium">
                                                Jabatan
                                            </th>

                                            <th className="px-4 py-3 font-medium">
                                                Tanggal Bergabung
                                            </th>

                                            <th className="px-4 py-3 font-medium">
                                                Status
                                            </th>

                                            <th className="px-4 py-3 font-medium text-center">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        {[1, 2, 3, 4, 5].map((item) => (
                                            <tr
                                                key={item}
                                                className="border-t border-gray-100"
                                            >
                                                <td className="px-4 py-3">
                                                    {item}
                                                </td>

                                                <td className="px-4 py-3 font-medium">
                                                    Joko Susilo
                                                </td>

                                                <td className="px-4 py-3 text-gray-500">
                                                    Project Manager
                                                </td>

                                                <td className="px-4 py-3 text-gray-500">
                                                    28 Mei 2026
                                                </td>

                                                <td className="px-4 py-3">
                                                    <span className="bg-green-100 text-green-700 text-[11px] px-3 py-1 rounded-md font-medium">
                                                        Aktif
                                                    </span>
                                                </td>

                                                <td className="px-4 py-3 text-center">
                                                    <button className="border border-gray-300 hover:bg-gray-50 px-3 py-1 rounded-md text-xs">
                                                        Ubah Status
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>

                            {/* PAGINATION */}
                            <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">

                                <span>
                                    Menampilkan 1 dari 1
                                </span>

                                <div className="flex items-center gap-2">

                                    <button className="text-gray-400">
                                        Kembali
                                    </button>

                                    <button className="w-7 h-7 rounded bg-blue-600 text-white text-xs">
                                        1
                                    </button>

                                    <button className="text-gray-400">
                                        Lanjut
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* INFO PANEL */}
                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 h-fit">

                            <h3 className="font-semibold text-gray-800 mb-4">
                                Atur Status Personil
                            </h3>

                            <p className="text-sm text-gray-600 leading-relaxed mb-5">
                                Gunakan fitur ini untuk mengubah status personil
                                menjadi Resign/Keluar atau Nonaktif jika tidak
                                lagi terlibat dalam proyek.
                            </p>

                            <div className="space-y-4">

                                <div className="flex items-start gap-3">
                                    <CheckCircle2
                                        size={18}
                                        className="text-green-600 mt-0.5"
                                    />

                                    <p className="text-sm text-gray-700">
                                        Perubahan status akan tercatat di history
                                    </p>
                                </div>

                                <div className="flex items-start gap-3">
                                    <CheckCircle2
                                        size={18}
                                        className="text-green-600 mt-0.5"
                                    />

                                    <p className="text-sm text-gray-700">
                                        Data absensi akan tetap tersimpan
                                    </p>
                                </div>

                                <div className="flex items-start gap-3">
                                    <CheckCircle2
                                        size={18}
                                        className="text-green-600 mt-0.5"
                                    />

                                    <p className="text-sm text-gray-700">
                                        Personil dapat diaktifkan kembali jika diperlukan
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        // SUBKONTRAKTOR
        if (activeTab === 'Subkontraktor') {
            return (
                <div className="space-y-5">

                    {/* SUMMARY */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">

                        <div className="bg-white border border-gray-200 rounded-xl p-5">
                            <div className="flex items-center gap-4">

                                <div className="w-12 h-12 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500">
                                    <Users size={22} />
                                </div>

                                <div>
                                    <h3 className="text-2xl font-bold text-gray-800">
                                        50
                                    </h3>

                                    <p className="text-sm text-gray-500 mt-1">
                                        Total Subkontraktor
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl p-5">
                            <div className="flex items-center gap-4">

                                <div className="w-12 h-12 rounded-xl border border-gray-200 flex items-center justify-center text-blue-600">
                                    <ClipboardList size={22} />
                                </div>

                                <div>
                                    <h3 className="text-2xl font-bold text-gray-800">
                                        15
                                    </h3>

                                    <p className="text-sm text-gray-500 mt-1">
                                        Total On Progress
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl p-5">
                            <div className="flex items-center gap-4">

                                <div className="w-12 h-12 rounded-xl border border-gray-200 flex items-center justify-center text-green-600">
                                    <CheckCircle2 size={22} />
                                </div>

                                <div>
                                    <h3 className="text-2xl font-bold text-gray-800">
                                        25
                                    </h3>

                                    <p className="text-sm text-gray-500 mt-1">
                                        Total Selesai
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl p-5">
                            <div className="flex items-center gap-4">

                                <div className="w-12 h-12 rounded-xl border border-gray-200 flex items-center justify-center text-yellow-500">
                                    <AlertTriangle size={22} />
                                </div>

                                <div>
                                    <h3 className="text-2xl font-bold text-gray-800">
                                        5
                                    </h3>

                                    <p className="text-sm text-gray-500 mt-1">
                                        Total Evaluasi
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl p-5">
                            <div className="flex items-center gap-4">

                                <div className="w-12 h-12 rounded-xl border border-gray-200 flex items-center justify-center text-orange-500">
                                    <CircleDollarSign size={22} />
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">
                                        Rp450.000.000
                                    </h3>

                                    <p className="text-sm text-gray-500 mt-1">
                                        Total Kontrak
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* DAFTAR SUBKONTRAKTOR */}
                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">

                        {/* HEADER */}
                        <div className="p-5 border-b border-gray-200 flex items-center justify-between">

                            <div>
                                <h3 className="font-semibold text-gray-800">
                                    Daftar Sub Kontraktor
                                </h3>
                            </div>

                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                                <Plus size={16} />
                                Tambah
                            </button>
                        </div>

                        {/* FILTER */}
                        <div className="px-5 py-4 border-b border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <span>Tampilkan</span>

                                <select className="border border-gray-300 rounded-md px-2 py-1">
                                    <option>10</option>
                                </select>

                                <span>data</span>
                            </div>

                            <div className="flex items-center gap-2 text-sm">
                                <span className="text-gray-500">
                                    Cari Data :
                                </span>

                                <input
                                    type="text"
                                    className="border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        {/* TABLE */}
                        <div className="overflow-auto">

                            <table className="w-full text-sm">

                                <thead className="bg-gray-50">
                                    <tr className="text-left text-gray-600">

                                        <th className="px-4 py-3 font-medium">
                                            No
                                        </th>

                                        <th className="px-4 py-3 font-medium">
                                            Nama Subkontraktor
                                        </th>

                                        <th className="px-4 py-3 font-medium">
                                            Pekerjaan
                                        </th>

                                        <th className="px-4 py-3 font-medium">
                                            Nilai Kontrak
                                        </th>

                                        <th className="px-4 py-3 font-medium">
                                            Status
                                        </th>

                                        <th className="px-4 py-3 font-medium">
                                            No Kontrak
                                        </th>

                                        <th className="px-4 py-3 font-medium">
                                            PIC
                                        </th>

                                        <th className="px-4 py-3 font-medium">
                                            Evaluasi
                                        </th>

                                        <th className="px-4 py-3 font-medium text-center">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {[
                                        {
                                            nama: 'CV Karya Beton',
                                            pekerjaan: 'Struktur Beton',
                                            nilai: 'Rp95.000.000',
                                            status: 'On Progress',
                                            kontrak: 'SGM/AGS/V/009',
                                            pic: 'Hendra Wijaya',
                                            evaluasi: 'Belum Evaluasi',
                                            color: 'blue',
                                        },
                                        {
                                            nama: 'CV Karya Beton',
                                            pekerjaan: 'Struktur Beton',
                                            nilai: 'Rp100.000.000',
                                            status: 'On Progress',
                                            kontrak: 'SGM/AGS/V/008',
                                            pic: 'Hendra Wijaya',
                                            evaluasi: 'Belum Evaluasi',
                                            color: 'blue',
                                        },
                                        {
                                            nama: 'CV Sinar Mandiri',
                                            pekerjaan: 'Keramik',
                                            nilai: 'Rp70.000.000',
                                            status: 'Finished',
                                            kontrak: 'SGM/AGS/V/006',
                                            pic: 'Rudi',
                                            evaluasi: 'Belum Evaluasi',
                                            color: 'green',
                                        },
                                        {
                                            nama: 'PT Baja Konstruksi',
                                            pekerjaan: 'Struktur Baja',
                                            nilai: 'Rp90.000.000',
                                            status: 'Canceled',
                                            kontrak: 'SGM/AGS/V/004',
                                            pic: 'Agus Setia',
                                            evaluasi: 'Sudah Evaluasi',
                                            color: 'red',
                                        },
                                        {
                                            nama: 'CV Alif Jaya',
                                            pekerjaan: 'Aluminium dan Kaca',
                                            nilai: 'Rp120.000.000',
                                            status: 'Waiting',
                                            kontrak: 'SGM/AGS/V/002',
                                            pic: 'Wahyu Setiawan',
                                            evaluasi: 'Dalam Evaluasi',
                                            color: 'yellow',
                                        },
                                    ].map((item, index) => (
                                        <tr
                                            key={index}
                                            className="border-t border-gray-100"
                                        >
                                            <td className="px-4 py-3">
                                                {index + 1}
                                            </td>

                                            <td className="px-4 py-3 font-medium text-gray-800">
                                                {item.nama}
                                            </td>

                                            <td className="px-4 py-3 text-gray-500">
                                                {item.pekerjaan}
                                            </td>

                                            <td className="px-4 py-3">
                                                {item.nilai}
                                            </td>

                                            <td className="px-4 py-3">
                                                <span
                                                    className={`text-white text-[11px] px-3 py-1 rounded-md font-medium
                                                    ${
                                                        item.color === 'blue'
                                                            ? 'bg-blue-500'
                                                            : item.color === 'green'
                                                            ? 'bg-green-500'
                                                            : item.color === 'red'
                                                            ? 'bg-red-500'
                                                            : 'bg-yellow-500'
                                                    }`}
                                                >
                                                    {item.status}
                                                </span>
                                            </td>

                                            <td className="px-4 py-3 text-gray-500">
                                                {item.kontrak}
                                            </td>

                                            <td className="px-4 py-3 text-gray-500">
                                                {item.pic}
                                            </td>

                                            <td
                                                className={`px-4 py-3 text-xs font-medium
                                                ${
                                                    item.evaluasi === 'Sudah Evaluasi'
                                                        ? 'text-green-600'
                                                        : item.evaluasi === 'Dalam Evaluasi'
                                                        ? 'text-yellow-600'
                                                        : 'text-gray-500'
                                                }`}
                                            >
                                                {item.evaluasi}
                                            </td>

                                            <td className="px-4 py-3 text-center">
                                                <button className="border border-gray-300 hover:bg-gray-50 text-gray-600 px-2 py-1 rounded text-[11px] font-medium flex items-center gap-1 mx-auto">
                                                    Update
                                                </button>
                                                <button className="border border-gray-300 hover:bg-gray-50 text-gray-600 px-2 py-1 rounded text-[11px] font-medium flex items-center gap-1 mx-auto">
                                                    Evaluasi
                                                </button>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>

                        {/* PAGINATION */}
                        <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">

                            <span>
                                Menampilkan 1 dari 1
                            </span>

                            <div className="flex items-center gap-2">

                                <button className="text-gray-400">
                                    Kembali
                                </button>

                                <button className="w-7 h-7 rounded bg-blue-600 text-white text-xs">
                                    1
                                </button>

                                <button className="text-gray-400">
                                    Lanjut
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* HASIL EVALUASI */}
                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">

                        {/* HEADER */}
                        <div className="p-5 border-b border-gray-200">
                            <h3 className="font-semibold text-gray-800">
                                Hasil Evaluasi
                            </h3>
                        </div>

                        {/* FILTER */}
                        <div className="px-5 py-4 border-b border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <span>Tampilkan</span>

                                <select className="border border-gray-300 rounded-md px-2 py-1">
                                    <option>10</option>
                                </select>

                                <span>data</span>
                            </div>

                            <div className="flex items-center gap-2 text-sm">
                                <span className="text-gray-500">
                                    Cari Data :
                                </span>

                                <input
                                    type="text"
                                    className="border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        {/* TABLE */}
                        <div className="overflow-auto">

                            <table className="w-full text-sm">

                                <thead className="bg-gray-50">
                                    <tr className="text-left text-gray-600">

                                        <th className="px-4 py-3 font-medium">
                                            No
                                        </th>

                                        <th className="px-4 py-3 font-medium">
                                            Nama Subkontraktor
                                        </th>

                                        <th className="px-4 py-3 font-medium">
                                            Pekerjaan
                                        </th>

                                        <th className="px-4 py-3 font-medium">
                                            Nilai Kontrak
                                        </th>

                                        <th className="px-4 py-3 font-medium">
                                            Tanggal Evaluasi
                                        </th>

                                        <th className="px-4 py-3 font-medium">
                                            Catatan
                                        </th>

                                        <th className="px-4 py-3 font-medium text-center">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {[
                                        {
                                            nama: 'CV Karya Beton',
                                            pekerjaan: 'Struktur Beton',
                                            nilai: 'Rp95.000.000',
                                            tanggal: '22 Mei 2026',
                                            catatan: 'Kualitas baik, perlu tingkatkan ketepatan waktu',
                                        },
                                        {
                                            nama: 'CV Karya Beton',
                                            pekerjaan: 'Struktur Beton',
                                            nilai: 'Rp100.000.000',
                                            tanggal: '22 Mei 2026',
                                            catatan: 'Perlu improvement pada produktivitas finishing',
                                        },
                                        {
                                            nama: 'CV Sinar Mandiri',
                                            pekerjaan: 'Keramik',
                                            nilai: 'Rp70.000.000',
                                            tanggal: '18 Mei 2026',
                                            catatan: '-',
                                        },
                                        {
                                            nama: 'PT Baja Konstruksi',
                                            pekerjaan: 'Struktur Baja',
                                            nilai: 'Rp90.000.000',
                                            tanggal: '16 Mei 2026',
                                            catatan: '-',
                                        },
                                        {
                                            nama: 'CV Alif Jaya',
                                            pekerjaan: 'Aluminium dan Kaca',
                                            nilai: 'Rp120.000.000',
                                            tanggal: '18 Mei 2026',
                                            catatan: '-',
                                        },
                                    ].map((item, index) => (
                                        <tr
                                            key={index}
                                            className="border-t border-gray-100"
                                        >
                                            <td className="px-4 py-3">
                                                {index + 1}
                                            </td>

                                            <td className="px-4 py-3 font-medium text-gray-800">
                                                {item.nama}
                                            </td>

                                            <td className="px-4 py-3 text-gray-500">
                                                {item.pekerjaan}
                                            </td>

                                            <td className="px-4 py-3">
                                                {item.nilai}
                                            </td>

                                            <td className="px-4 py-3 text-gray-500">
                                                {item.tanggal}
                                            </td>

                                            <td className="px-4 py-3 text-gray-500">
                                                {item.catatan}
                                            </td>

                                            <td className="px-4 py-3 text-center">
                                                <button className="text-blue-600 hover:text-blue-800">
                                                    <Eye size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>

                        {/* PAGINATION */}
                        <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">

                            <span>
                                Menampilkan 1 dari 1
                            </span>

                            <div className="flex items-center gap-2">

                                <button className="text-gray-400">
                                    Kembali
                                </button>

                                <button className="w-7 h-7 rounded bg-blue-600 text-white text-xs">
                                    1
                                </button>

                                <button className="text-gray-400">
                                    Lanjut
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        // ==========================================
        // EQUIPMENT
        // ==========================================
        if (activeTab === 'Equipment') {
            return (
                <div className="space-y-6 text-gray-700 text-sm">

                    {/* SUMMARY CARD */}
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

                        {/* TOTAL EQUIPMENT */}
                        <div className="bg-white border rounded-xl p-4 flex items-center gap-4 shadow-sm">
                            <div>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-2xl font-bold text-gray-800">
                                        50
                                    </span>

                                    <span className="text-xs text-gray-400">
                                        Unit
                                    </span>
                                </div>

                                <p className="text-xs text-gray-500 font-medium">
                                    Total Equipment
                                </p>
                            </div>
                        </div>

                        {/* EQUIPMENT AKTIF */}
                        <div className="bg-white border rounded-xl p-4 flex items-center gap-4 shadow-sm">
                            <div>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-2xl font-bold text-gray-800">
                                        15
                                    </span>

                                    <span className="text-xs text-gray-400">
                                        Unit
                                    </span>
                                </div>

                                <p className="text-xs text-gray-500 font-medium">
                                    Equipment Aktif
                                </p>
                            </div>
                        </div>

                        {/* STANDBY */}
                        <div className="bg-white border rounded-xl p-4 flex items-center gap-4 shadow-sm">
                            <div>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-2xl font-bold text-gray-800">
                                        25
                                    </span>

                                    <span className="text-xs text-gray-400">
                                        Unit
                                    </span>
                                </div>

                                <p className="text-xs text-gray-500 font-medium">
                                    Equipment Standby
                                </p>
                            </div>
                        </div>

                        {/* MAINTENANCE */}
                        <div className="bg-white border rounded-xl p-4 flex items-center gap-4 shadow-sm">
                            <div>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-2xl font-bold text-gray-800">
                                        5
                                    </span>

                                    <span className="text-xs text-gray-400">
                                        Unit
                                    </span>
                                </div>

                                <p className="text-xs text-gray-500 font-medium">
                                    Maintenance
                                </p>
                            </div>
                        </div>

                        {/* RUSAK */}
                        <div className="bg-white border rounded-xl p-4 flex items-center gap-4 shadow-sm">
                            <div>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-2xl font-bold text-gray-800">
                                        0
                                    </span>

                                    <span className="text-xs text-gray-400">
                                        Unit
                                    </span>
                                </div>

                                <p className="text-xs text-gray-500 font-medium">
                                    Equipment Rusak
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* DAFTAR EQUIPMENT */}
                    <div className="bg-white border rounded-xl p-5 shadow-sm space-y-4">

                        <div className="flex items-center justify-between">
                            <h3 className="font-bold text-gray-800 text-base">
                                Daftar Equipment
                            </h3>

                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5">
                                <Plus size={14} />
                                Tambah
                            </button>
                        </div>

                        {/* FILTER */}
                        <div className="flex items-center justify-between text-xs text-gray-500">

                            <div className="flex items-center gap-2">
                                <span>Tampilkan</span>

                                <select className="border rounded px-2 py-1 bg-white">
                                    <option>10</option>
                                    <option>25</option>
                                    <option>50</option>
                                </select>

                                <span>data</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span>Cari Data :</span>

                                <input
                                    type="text"
                                    className="border rounded px-3 py-1 w-48"
                                />
                            </div>
                        </div>

                        {/* TABLE */}
                        <div className="overflow-x-auto">

                            <table className="w-full text-left text-xs">

                                <thead className="bg-gray-50 text-gray-600 border-b">
                                    <tr>
                                        <th className="p-3 font-semibold w-12">No</th>
                                        <th className="p-3 font-semibold">
                                            Nama Equipment
                                        </th>
                                        <th className="p-3 font-semibold">
                                            No Unit
                                        </th>
                                        <th className="p-3 font-semibold">
                                            Jenis
                                        </th>
                                        <th className="p-3 font-semibold">
                                            Tanggal Serah Terima
                                        </th>
                                        <th className="p-3 font-semibold">
                                            Status
                                        </th>
                                        <th className="p-3 font-semibold">
                                            PIC
                                        </th>
                                        <th className="p-3 font-semibold text-center">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y text-gray-700">

                                    {[1,2,3,4,5].map((item, index) => (
                                        <tr key={index}>

                                            <td className="p-3">
                                                {item}
                                            </td>

                                            <td className="p-3 font-medium">
                                                Excavator PC 200
                                            </td>

                                            <td className="p-3 text-gray-500">
                                                EXC-001
                                            </td>

                                            <td className="p-3 text-gray-500">
                                                Excavator
                                            </td>

                                            <td className="p-3 text-gray-500">
                                                22 Mei 2026
                                            </td>

                                            <td className="p-3">
                                                <span className="bg-green-600 text-white text-[10px] px-2.5 py-1 rounded font-medium">
                                                    Aktif
                                                </span>
                                            </td>

                                            <td className="p-3">
                                                Hendra Wijaya
                                            </td>

                                            <td className="p-3 text-center">
                                                <button className="border border-gray-300 hover:bg-gray-50 text-gray-600 px-2 py-1 rounded text-[11px] font-medium flex items-center gap-1 mx-auto">
                                                    Update
                                                </button>
                                            </td>

                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>

                        {/* PAGINATION */}
                        <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t">

                            <span>
                                Menampilkan 1 dari 1
                            </span>

                            <div className="flex items-center gap-1">

                                <button className="px-2 py-1 text-gray-400 cursor-not-allowed">
                                    Kembali
                                </button>

                                <button className="bg-blue-600 text-white px-2.5 py-1 rounded font-medium">
                                    1
                                </button>

                                <button className="px-2 py-1 text-gray-400 cursor-not-allowed">
                                    Lanjut
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* MONITORING JAM KERJA */}
                    <div className="bg-white border rounded-xl p-5 shadow-sm space-y-4">

                        <div className="flex items-center justify-between">
                            <h3 className="font-bold text-gray-800 text-base">
                                Monitoring Jam Kerja
                            </h3>

                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5">
                                <Plus size={14} />
                                Tambah
                            </button>
                        </div>

                        {/* TABLE */}
                        <div className="overflow-x-auto">

                            <table className="w-full text-left text-xs">

                                <thead className="bg-gray-50 text-gray-600 border-b">
                                    <tr>
                                        <th className="p-3">No</th>
                                        <th className="p-3">Nama Equipment</th>
                                        <th className="p-3">Tanggal</th>
                                        <th className="p-3">HM Awal</th>
                                        <th className="p-3">HM Akhir</th>
                                        <th className="p-3">BBM</th>
                                        <th className="p-3">Oli</th>
                                        <th className="p-3">Jam Mulai</th>
                                        <th className="p-3">Jam Selesai</th>
                                        <th className="p-3 text-center">Action</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y text-gray-700">

                                    {[1,2,3,4,5].map((item, index) => (
                                        <tr key={index}>

                                            <td className="p-3">{item}</td>

                                            <td className="p-3 font-medium">
                                                Excavator PC 200
                                            </td>

                                            <td className="p-3">
                                                22 Mei 2026
                                            </td>

                                            <td className="p-3">
                                                1200
                                            </td>

                                            <td className="p-3">
                                                1235
                                            </td>

                                            <td className="p-3">
                                                120 L
                                            </td>

                                            <td className="p-3">
                                                5 L
                                            </td>

                                            <td className="p-3">
                                                08:00
                                            </td>

                                            <td className="p-3">
                                                17:00
                                            </td>

                                            <td className="p-3 text-center">
                                                <button className="border border-gray-300 hover:bg-gray-50 text-gray-600 px-2 py-1 rounded text-[11px] font-medium flex items-center gap-1 mx-auto">
                                                    Update
                                                </button>
                                            </td>

                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>

                        {/* PAGINATION */}
                        <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t">

                            <span>
                                Menampilkan 1 dari 1
                            </span>

                            <div className="flex items-center gap-1">

                                <button className="px-2 py-1 text-gray-400 cursor-not-allowed">
                                    Kembali
                                </button>

                                <button className="bg-blue-600 text-white px-2.5 py-1 rounded font-medium">
                                    1
                                </button>

                                <button className="px-2 py-1 text-gray-400 cursor-not-allowed">
                                    Lanjut
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        // Additional Scope
        if (activeTab === 'Additional Scope') {
            return (
                <div className="space-y-6 text-gray-700 text-sm">

                    {/* SUMMARY CARD */}
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

                        {/* TOTAL KEGIATAN */}
                        <div className="bg-white border rounded-xl p-4 flex items-center gap-4 shadow-sm">
                            <div>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-2xl font-bold text-gray-800">50</span>
                                </div>
                                <p className="text-xs text-gray-500 font-medium">Total Kegiatan</p>
                            </div>
                        </div>

                        {/* DRAFT */}
                        <div className="bg-white border rounded-xl p-4 flex items-center gap-4 shadow-sm">
                            <div>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-2xl font-bold text-gray-800">15</span>
                                </div>
                                <p className="text-xs text-gray-500 font-medium">Draft</p>
                            </div>
                        </div>

                        {/* DISETUJUI */}
                        <div className="bg-white border rounded-xl p-4 flex items-center gap-4 shadow-sm">
                            <div>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-2xl font-bold text-gray-800">25</span>
                                </div>
                                <p className="text-xs text-gray-500 font-medium">Disetujui</p>
                            </div>
                        </div>

                        {/* DALAM PROSES */}
                        <div className="bg-white border rounded-xl p-4 flex items-center gap-4 shadow-sm">
                            <div>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-2xl font-bold text-gray-800">5</span>
                                </div>
                                <p className="text-xs text-gray-500 font-medium">Dalam Proses</p>
                            </div>
                        </div>

                        {/* TOTAL NILAI */}
                        <div className="bg-white border rounded-xl p-4 flex items-center gap-4 shadow-sm">
                            <div>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-xl font-bold text-gray-800">Rp450.000.000</span>
                                </div>
                                <p className="text-xs text-gray-500 font-medium">Total Nilai</p>
                            </div>
                        </div>
                    </div>

                    {/* DAFTAR TAMBAHAN KEGIATAN (OUT OF SCOPE) */}
                    <div className="bg-white border rounded-xl p-5 shadow-sm space-y-4">

                        <div className="flex items-center justify-between">
                            <h3 className="font-bold text-gray-800 text-base">
                                Daftar Tambahan Kegiatan (Out of Scope)
                            </h3>

                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5">
                                <Plus size={14} />
                                Tambah
                            </button>
                        </div>

                        {/* FILTER */}
                        <div className="flex items-center justify-between text-xs text-gray-500">
                            <div className="flex items-center gap-2">
                                <span>Tampilkan</span>
                                <select className="border rounded px-2 py-1 bg-white">
                                    <option>10</option>
                                    <option>25</option>
                                    <option>50</option>
                                </select>
                                <span>data</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span>Cari Data :</span>
                                <input
                                    type="text"
                                    className="border rounded px-3 py-1 w-48"
                                />
                            </div>
                        </div>

                        {/* TABLE */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs">
                                <thead className="bg-gray-50 text-gray-600 border-b">
                                    <tr>
                                        <th className="p-3 font-semibold w-12 text-center">No</th>
                                        <th className="p-3 font-semibold">No Kontrak</th>
                                        <th className="p-3 font-semibold">No Pengajuan</th>
                                        <th className="p-3 font-semibold">Nama Kegiatan</th>
                                        <th className="p-3 font-semibold">Tanggal Pengajuan</th>
                                        <th className="p-3 font-semibold">Nilai Kontrak</th>
                                        <th className="p-3 font-semibold text-center">Status</th>
                                        <th className="p-3 font-semibold text-center">Action</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y text-gray-700">
                                    {[
                                        { no: 1, kontrak: "05/AGS/USR/V/2026", pengajuan: "05/AGS/OOS/V/2026", nama: "Pembuatan Pos Jaga", tanggal: "1 Mei 2026", nilai: "Rp 35.000.000", status: "Draft", color: "bg-gray-400" },
                                        { no: 2, kontrak: "04/AGS/USR/V/2026", pengajuan: "04/AGS/OOS/V/2026", nama: "Perubahan Layout Parkir", tanggal: "1 Mei 2026", nilai: "Rp 25.000.000", status: "Draft", color: "bg-gray-400" },
                                        { no: 3, kontrak: "03/AGS/USR/V/2026", pengajuan: "03/AGS/OOS/V/2026", nama: "Pengadaan dan Pemasangan Kanopi", tanggal: "1 Mei 2026", nilai: "Rp 40.000.000", status: "Dalam Proses", color: "bg-orange-500" },
                                        { no: 4, kontrak: "02/AGS/USR/V/2026", pengajuan: "02/AGS/OOS/V/2026", nama: "Penambahan Titik Lampu Taman", tanggal: "1 Mei 2026", nilai: "Rp 18.000.000", status: "Disetujui", color: "bg-green-600" },
                                        { no: 5, kontrak: "01/AGS/USR/V/2026", pengajuan: "01/AGS/OOS/V/2026", nama: "Pekerjaan Galian Tambahan", tanggal: "1 Mei 2026", nilai: "Rp 60.000.000", status: "Draft", color: "bg-gray-400" }
                                    ].map((item, index) => (
                                        <tr key={index}>
                                            <td className="p-3 text-center">{item.no}</td>
                                            <td className="p-3 text-gray-500">{item.kontrak}</td>
                                            <td className="p-3 text-gray-500">{item.pengajuan}</td>
                                            <td className="p-3 font-medium text-gray-800">{item.nama}</td>
                                            <td className="p-3 text-gray-500">{item.tanggal}</td>
                                            <td className="p-3 text-gray-700 font-medium">{item.nilai}</td>
                                            <td className="p-3 text-center">
                                                <span className={`${item.color} text-white text-[10px] px-2 py-0.5 rounded font-medium block w-max mx-auto`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="p-3 text-center">
                                                <button className="border border-gray-300 hover:bg-gray-50 text-gray-600 px-2 py-1 rounded text-[11px] font-medium flex items-center gap-1 mx-auto">
                                                    Update
                                                </button>
                                                <button className="border border-gray-300 hover:bg-gray-50 text-gray-600 px-2 py-1 rounded text-[11px] font-medium flex items-center gap-1 mx-auto">
                                                    Detail
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* PAGINATION */}
                        <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t">
                            <span>Menampilkan 1 dari 1</span>

                            <div className="flex items-center gap-1">
                                <button className="px-2 py-1 text-gray-400 cursor-not-allowed">
                                    Kembali
                                </button>
                                <button className="bg-blue-600 text-white px-2.5 py-1 rounded font-medium">
                                    1
                                </button>
                                <button className="px-2 py-1 text-gray-400 cursor-not-allowed">
                                    Lanjut
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        // =========================
        // DEFAULT
        // =========================
        return (
            <div className="bg-white border rounded-xl p-10 text-center text-gray-400">
                Content {activeTab}
            </div>
        );
    };

    return (
        <PortalLayout>
            <div className="space-y-6">

                {/* HEADER */}
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Project Management
                    </h1>

                    <div className="flex items-center gap-2 mt-1 text-sm">
                        <span className="text-gray-400">
                            Project Management
                        </span>

                        <span className="text-gray-300">
                            /
                        </span>

                        <span className="text-blue-600 font-medium">
                            Detail Project
                        </span>
                    </div>
                </div>

                {/* PROJECT INFORMATION */}
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">

                    <div className="grid grid-cols-12">

                        {/* IMAGE */}
                        <div className="col-span-12 lg:col-span-2 p-4">
                            <img
                                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200&auto=format&fit=crop"
                                alt="project"
                                className="w-full h-40 object-cover rounded-lg"
                            />
                        </div>

                        {/* CONTENT */}
                        <div className="col-span-12 lg:col-span-10 p-5">

                            <div className="flex items-center justify-between mb-4">

                                <h2 className="font-semibold text-gray-800">
                                    Informasi Project
                                </h2>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => navigate('/portal/project')}
                                        className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-gray-300 text-white text-sm font-medium hover:bg-gray-600 transition"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="icon icon-tabler icon-tabler-chevrons-left"
                                        >
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M11 7l-5 5l5 5" />
                                            <path d="M17 7l-5 5l5 5" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-5 gap-y-5 gap-x-6">

                                <div>
                                    <p className="text-xs text-gray-400">
                                        No Contract
                                    </p>

                                    <p className="font-semibold text-sm mt-1">
                                        01/AGS/USR/V/2026
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-400">
                                        Nama Project
                                    </p>

                                    <p className="font-semibold text-sm mt-1">
                                        Pembangunan Gedung Kantor
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-400">
                                        Client
                                    </p>

                                    <p className="font-semibold text-sm mt-1">
                                        PT. Maju Bersama Makmur
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-400">
                                        Lokasi Project
                                    </p>

                                    <p className="font-semibold text-sm mt-1">
                                        DKI Jakarta
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-400">
                                        Project Manager
                                    </p>

                                    <p className="font-semibold text-sm mt-1">
                                        Joko Susilo
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-400">
                                        PIC Sales
                                    </p>

                                    <p className="font-semibold text-sm mt-1">
                                        Agus Imam Riyadi
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-400">
                                        Nilai Project
                                    </p>

                                    <p className="font-semibold text-sm mt-1">
                                        Rp1.500.000.000
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-400">
                                        Kategori Project
                                    </p>

                                    <p className="font-semibold text-sm mt-1">
                                        Infrastructure
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-400">
                                        Start Date
                                    </p>

                                    <p className="font-semibold text-sm mt-1">
                                        01/06/2026
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-400">
                                        End Date
                                    </p>

                                    <p className="font-semibold text-sm mt-1">
                                        01/06/2027
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* TABS */}
                    <div className="border-t border-gray-200 px-5">
                        <div className="flex items-center gap-6 overflow-x-auto">

                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() =>
                                        setActiveTab(tab)
                                    }
                                    className={`py-4 text-sm whitespace-nowrap border-b-2 transition-all ${
                                        activeTab === tab
                                            ? 'border-blue-600 text-blue-600 font-medium'
                                            : 'border-transparent text-gray-500 hover:text-blue-600'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* TAB CONTENT */}
                {renderContent()}
            </div>

            {/* ========================= */
            /* MODAL TAMBAH TASK */
            /* ========================= */}
            {isTaskModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden">

                        {/* HEADER */}
                        <div className="px-6 py-4 border-b flex items-center justify-between">

                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">
                                    Tambah Task Schedule
                                </h3>

                                <p className="text-sm text-gray-500 mt-1">
                                    Input task pekerjaan project
                                </p>
                            </div>

                            <button
                                onClick={() =>
                                    setIsTaskModalOpen(false)
                                }
                                className="w-9 h-9 rounded-lg hover:bg-gray-100 text-gray-500"
                            >
                                ✕
                            </button>
                        </div>

                        {/* BODY */}
                        <div className="p-6">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Nama Task
                                    </label>

                                    <input
                                        type="text"
                                        name="task"
                                        value={taskForm.task}
                                        onChange={handleTaskChange}
                                        placeholder="Input nama task"
                                        className="w-full h-11 rounded-xl border border-gray-300 px-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        PIC
                                    </label>

                                    <input
                                        type="text"
                                        name="pic"
                                        value={taskForm.pic}
                                        onChange={handleTaskChange}
                                        placeholder="Input PIC"
                                        className="w-full h-11 rounded-xl border border-gray-300 px-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Start Date
                                    </label>

                                    <input
                                        type="date"
                                        name="start"
                                        value={taskForm.start}
                                        onChange={handleTaskChange}
                                        className="w-full h-11 rounded-xl border border-gray-300 px-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        End Date
                                    </label>

                                    <input
                                        type="date"
                                        name="end"
                                        value={taskForm.end}
                                        onChange={handleTaskChange}
                                        className="w-full h-11 rounded-xl border border-gray-300 px-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Priority
                                    </label>

                                    <select
                                        name="priority"
                                        value={taskForm.priority}
                                        onChange={handleTaskChange}
                                        className="w-full h-11 rounded-xl border border-gray-300 px-4 text-sm"
                                    >
                                        <option value="Low">
                                            Low
                                        </option>

                                        <option value="Medium">
                                            Medium
                                        </option>

                                        <option value="High">
                                            High
                                        </option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Progress
                                    </label>

                                    <input
                                        type="text"
                                        name="progress"
                                        value={taskForm.progress}
                                        onChange={handleTaskChange}
                                        placeholder="Contoh 50%"
                                        className="w-full h-11 rounded-xl border border-gray-300 px-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Status
                                    </label>

                                    <select
                                        name="status"
                                        value={taskForm.status}
                                        onChange={handleTaskChange}
                                        className="w-full h-11 rounded-xl border border-gray-300 px-4 text-sm"
                                    >
                                        <option value="On Track">
                                            On Track
                                        </option>

                                        <option value="In Progress">
                                            In Progress
                                        </option>

                                        <option value="Delayed">
                                            Delayed
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* FOOTER */}
                        <div className="px-6 py-4 border-t flex items-center justify-end gap-3">

                            <button
                                onClick={() =>
                                    setIsTaskModalOpen(false)
                                }
                                className="h-11 px-5 rounded-xl border border-gray-300 text-sm font-medium hover:bg-gray-100"
                            >
                                Batal
                            </button>

                            <button
                                onClick={handleSaveTask}
                                className="h-11 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium"
                            >
                                Simpan Task
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Update Status Task */}
            {isStatusTaskModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden">
                        
                        {/* HEADER */}
                        <div className="px-6 py-4 border-b flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-bold text-gray-800">
                                    Ubah Status Task
                                </h3>
                                <p className="text-xs text-gray-500 mt-0.5">
                                    Update progress task/Pekerjaan
                                </p>
                            </div>
                            <button
                                onClick={() => setIsStatusTaskModalOpen(false)}
                                className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
                            >
                                <span className="text-xs font-bold">✕</span>
                            </button>
                        </div>

                        {/* BODY */}
                        <div className="p-6 space-y-5">
                            
                            {/* PILIH TASK */}
                            <div>
                                <label className="block text-xs font-bold text-gray-800 mb-2">
                                    Pilih Task
                                </label>
                                <input
                                    type="text"
                                    readOnly
                                    value={taskForm.task || "Mobilisasi dan Persiapan"}
                                    className="w-full h-11 rounded-xl bg-gray-100 border border-gray-200 px-4 text-xs font-medium text-gray-700 outline-none cursor-not-allowed"
                                />
                            </div>

                            {/* UBAH STATUS (SELECTION CARDS) */}
                            <div>
                                <label className="block text-xs font-bold text-gray-800 mb-2">
                                    Ubah Status <span className="text-red-500">*</span>
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                                    
                                    {/* OPEN CARD */}
                                    <div 
                                        onClick={() => handleTaskChange({ target: { name: 'status', value: 'OPEN' } })}
                                        className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                                            taskForm.status === 'OPEN' 
                                            ? 'bg-slate-100 border-slate-400' 
                                            : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                                        }`}
                                    >
                                        <span className="block text-xs font-bold text-slate-800">OPEN</span>
                                        <span className="block text-[11px] text-slate-500 mt-1">Belum Dikerjakan</span>
                                    </div>

                                    {/* IN PROGRESS CARD */}
                                    <div 
                                        onClick={() => handleTaskChange({ target: { name: 'status', value: 'In Progress' } })}
                                        className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                                            taskForm.status === 'In Progress' 
                                            ? 'bg-amber-50 border-amber-400' 
                                            : 'bg-amber-50/30 border-amber-200 hover:border-amber-300'
                                        }`}
                                    >
                                        <span className="block text-xs font-bold text-amber-500">IN PROGRESS</span>
                                        <span className="block text-[11px] text-slate-500 mt-1">Sedang Dikerjakan</span>
                                    </div>

                                    {/* DONE CARD */}
                                    <div 
                                        onClick={() => handleTaskChange({ target: { name: 'status', value: 'DONE' } })}
                                        className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                                            taskForm.status === 'DONE' 
                                            ? 'bg-gray-100 border-gray-400' 
                                            : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        <span className="block text-xs font-bold text-gray-400">DONE</span>
                                        <span className="block text-[11px] text-gray-400 mt-1">Selesai Dikerjakan</span>
                                    </div>

                                    {/* CANCELLED CARD */}
                                    <div 
                                        onClick={() => handleTaskChange({ target: { name: 'status', value: 'CANCELLED' } })}
                                        className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                                            taskForm.status === 'CANCELLED' 
                                            ? 'bg-red-50 border-red-400' 
                                            : 'bg-red-50/30 border-red-200 hover:border-red-300'
                                        }`}
                                    >
                                        <span className="block text-xs font-bold text-red-500">CANCELLED</span>
                                        <span className="block text-[11px] text-red-400/70 mt-1">Dibatalkan</span>
                                    </div>

                                </div>
                            </div>

                            {/* DOKUMENTASI */}
                            <div>
                                <label className="block text-xs font-bold text-gray-800 mb-2">
                                    Dokumentasi <span className="text-red-500">*</span>
                                </label>
                                <button
                                    type="button"
                                    className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-medium flex items-center justify-center gap-2 transition-colors shadow-sm"
                                >
                                    <span>+</span> Tambah Dokumentasi
                                </button>
                            </div>

                            {/* CATATAN */}
                            <div>
                                <label className="block text-xs font-bold text-gray-800 mb-2">
                                    Catatan (Optional)
                                </label>
                                <textarea
                                    name="catatan"
                                    value={taskForm.catatan || ''}
                                    onChange={handleTaskChange}
                                    placeholder="Tulis Catatan Status"
                                    rows={3}
                                    className="w-full rounded-xl border border-gray-200 p-4 text-xs text-gray-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400 resize-none"
                                />
                            </div>

                        </div>

                        {/* FOOTER */}
                        <div className="px-6 py-4 bg-gray-50 border-t flex items-center justify-start gap-3">
                            <button
                                onClick={handleSaveTask}
                                className="h-10 px-6 rounded-lg bg-green-500 hover:bg-green-600 text-white text-xs font-semibold shadow-sm transition-colors"
                            >
                                Simpan
                            </button>

                            <button
                                onClick={() => {
                                    // Tambahkan logic reset form Anda di sini jika diperlukan
                                    setIsStatusTaskModalOpen(false);
                                }}
                                className="h-10 px-6 rounded-lg bg-red-500 hover:bg-red-600 text-white text-xs font-semibold shadow-sm transition-colors"
                            >
                                Reset
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </PortalLayout>
    );
}