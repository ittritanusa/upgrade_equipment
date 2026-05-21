import React from 'react';
import PortalLayout from '@/Pages/Layouts/PortalLayout';
import { useDashboard } from './Hooks/useDashboard';

export default function Dashboard() {
    const { user, isLoading, handleLogout } = useDashboard();

    return (
        <PortalLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Selamat datang{user ? `, ${user.name}` : ''}!
                        </p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 text-sm border border-border rounded-md text-foreground hover:bg-accent transition-colors"
                    >
                        Keluar
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        { label: 'Total Proyek', value: '-', desc: 'Proyek aktif' },
                        { label: 'Total Pekerja', value: '-', desc: 'Pekerja terdaftar' },
                        { label: 'Material', value: '-', desc: 'Item tersedia' },
                        { label: 'Pengeluaran', value: '-', desc: 'Bulan ini' },
                    ].map((stat) => (
                        <div
                            key={stat.label}
                            className="bg-card border border-border rounded-xl p-6"
                        >
                            <p className="text-sm text-muted-foreground">{stat.label}</p>
                            <p className="text-3xl font-semibold text-foreground mt-1">{stat.value}</p>
                            <p className="text-xs text-muted-foreground mt-1">{stat.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </PortalLayout>
    );
}
