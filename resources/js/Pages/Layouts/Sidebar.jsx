import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/Utils/Helpers/Utils';
import {
    LayoutDashboard,
    FolderOpen,
    Users,
    HardHat,
    Package,
    Receipt,
    ClipboardList,
    Settings,
} from 'lucide-react';

const navItems = [
    {
        group: 'Utama',
        items: [
            { label: 'Dashboard', path: '/portal/dashboard', icon: LayoutDashboard },
        ],
    },
    {
        group: 'Manajemen',
        items: [
            { label: 'Proyek', path: '/portal/projects', icon: FolderOpen },
            { label: 'Pekerja', path: '/portal/workers', icon: HardHat },
            { label: 'Material', path: '/portal/materials', icon: Package },
            { label: 'Pengeluaran', path: '/portal/expenses', icon: Receipt },
            { label: 'Laporan', path: '/portal/reports', icon: ClipboardList },
        ],
    },
    {
        group: 'Sistem',
        items: [
            { label: 'Pengguna', path: '/portal/users', icon: Users },
            { label: 'Pengaturan', path: '/portal/settings', icon: Settings },
        ],
    },
];

export default function Sidebar() {
    return (
        <aside className="w-64 shrink-0 border-r border-border bg-card flex flex-col">
            <div className="h-16 flex items-center px-6 border-b border-border shrink-0">
                <span className="font-semibold text-foreground text-sm leading-tight">
                    Construction<br />
                    <span className="text-muted-foreground font-normal">Management System</span>
                </span>
            </div>

            <nav className="flex-1 overflow-y-auto py-4 px-3">
                {navItems.map((group) => (
                    <div key={group.group} className="mb-5">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 mb-1">
                            {group.group}
                        </p>
                        {group.items.map(({ label, path, icon: Icon }) => (
                            <NavLink
                                key={path}
                                to={path}
                                className={({ isActive }) =>
                                    cn(
                                        'flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors',
                                        isActive
                                            ? 'bg-primary text-primary-foreground font-medium'
                                            : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                                    )
                                }
                            >
                                <Icon size={16} />
                                {label}
                            </NavLink>
                        ))}
                    </div>
                ))}
            </nav>
        </aside>
    );
}
