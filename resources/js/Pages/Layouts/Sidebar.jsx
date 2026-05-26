import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
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
    ChevronDown,
} from 'lucide-react';

const navItems = [
    {
        group: 'General',
        items: [
            {
                label: 'Dashboard',
                path: '/portal/dashboard',
                icon: LayoutDashboard,
            },
        ],
    },

    {
        group: 'Fitur',
        items: [
            {
                label: 'Project Management',
                path: '/portal/project',
                icon: FolderOpen,
            },

            // Dropdown Budget & RAB
            {
                label: 'Budget & RAB',
                icon: HardHat,
                children: [
                    {
                        label: 'RAB Project',
                        path: '/portal/budget/rab-project',
                    },
                    {
                        label: 'Budget Overview',
                        path: '/portal/budget/overview',
                    },
                    {
                        label: 'Realisasi Budget',
                        path: '/portal/budget/realisasi',
                    },
                    {
                        label: 'Import Realisasi Budget',
                        path: '/portal/budget/import-realisasi',
                    },
                    {
                        label: 'Cashflow Overview',
                        path: '/portal/budget/cashflow',
                    },
                ],
            },

            {
                label: 'Procurement',
                path: '/portal/procurement',
                icon: HardHat,
            },

            {
                label: 'Inventory & Warehouse',
                path: '/portal/inventory',
                icon: Package,
            },

            {
                label: 'Accounting & Finance',
                path: '/portal/finance',
                icon: Package,
            },

            {
                label: 'Tax Management',
                path: '/portal/tax',
                icon: Package,
            },

            {
                label: 'HR & Manpower',
                path: '/portal/manpower',
                icon: HardHat,
            },

            {
                label: 'Document Management',
                path: '/portal/document',
                icon: Receipt,
            },

            {
                label: 'Report & Analytics',
                path: '/portal/reports',
                icon: ClipboardList,
            },
        ],
    },

    {
        group: 'Sistem',
        items: [
            {
                label: 'Pengguna',
                path: '/portal/users',
                icon: Users,
            },

            {
                label: 'Pengaturan',
                path: '/portal/settings',
                icon: Settings,
            },
        ],
    },
];

export default function Sidebar() {
    const location = useLocation();

    const [openMenus, setOpenMenus] = useState({});

    const toggleMenu = (label) => {
        setOpenMenus((prev) => ({
            ...prev,
            [label]: !prev[label],
        }));
    };

    return (
        <aside className="w-64 shrink-0 border-r border-border bg-card flex flex-col">
            {/* Logo */}
            <div className="h-16 flex items-center justify-center px-6 border-b border-border shrink-0">
                <img
                    src="/assets/img/logo_ags.png"
                    alt="AGS Logo"
                    className="h-10 object-contain"
                />
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4 px-3">
                {navItems.map((group) => (
                    <div key={group.group} className="mb-6">
                        {/* Group Title */}
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">
                            {group.group}
                        </p>

                        {/* Menu Items */}
                        <div className="space-y-1">
                            {group.items.map((item) => {
                                const Icon = item.icon;

                                // =========================
                                // DROPDOWN MENU
                                // =========================
                                if (item.children) {
                                    const isOpen =
                                        openMenus[item.label];

                                    const isChildActive =
                                        item.children.some((child) =>
                                            location.pathname.startsWith(
                                                child.path
                                            )
                                        );

                                    return (
                                        <div key={item.label}>
                                            {/* Parent Button */}
                                            <button
                                                onClick={() =>
                                                    toggleMenu(
                                                        item.label
                                                    )
                                                }
                                                className={cn(
                                                    'w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all',
                                                    isChildActive
                                                        ? 'bg-primary text-primary-foreground font-medium'
                                                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                                                )}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <Icon size={16} />
                                                    <span>
                                                        {item.label}
                                                    </span>
                                                </div>

                                                <ChevronDown
                                                    size={16}
                                                    className={cn(
                                                        'transition-transform duration-200',
                                                        isOpen
                                                            ? 'rotate-180'
                                                            : ''
                                                    )}
                                                />
                                            </button>

                                            {/* Sub Menu */}
                                            {isOpen && (
                                                <div className="mt-1 ml-6 space-y-1 border-l border-border pl-3">
                                                    {item.children.map(
                                                        (
                                                            child
                                                        ) => (
                                                            <NavLink
                                                                key={
                                                                    child.path
                                                                }
                                                                to={
                                                                    child.path
                                                                }
                                                                className={({
                                                                    isActive,
                                                                }) =>
                                                                    cn(
                                                                        'block px-3 py-2 rounded-lg text-sm transition-all',
                                                                        isActive
                                                                            ? 'bg-primary text-primary-foreground font-medium'
                                                                            : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                                                                    )
                                                                }
                                                            >
                                                                {
                                                                    child.label
                                                                }
                                                            </NavLink>
                                                        )
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    );
                                }

                                // =========================
                                // NORMAL MENU
                                // =========================
                                return (
                                    <NavLink
                                        key={item.path}
                                        to={item.path}
                                        className={({
                                            isActive,
                                        }) =>
                                            cn(
                                                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all',
                                                isActive
                                                    ? 'bg-primary text-primary-foreground font-medium'
                                                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                                            )
                                        }
                                    >
                                        <Icon size={16} />
                                        <span>
                                            {item.label}
                                        </span>
                                    </NavLink>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>
        </aside>
    );
}