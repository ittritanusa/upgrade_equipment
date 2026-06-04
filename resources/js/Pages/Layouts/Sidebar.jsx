import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/Utils/Helpers/Utils';

import {
    LayoutDashboard, BarChart3, Monitor, Bell, Truck, Bus, BadgeInfo, CircleDot, Car,
    MapPinned, Building2, Wrench, Package2, ClipboardCheck, ShieldCheck, Route, Map,
    FileCheck, FileText, Settings2, History, ShoppingCart, PackagePlus, PackageMinus,
    Boxes, Users, Shield, ChevronDown
} from 'lucide-react';

const navItems = [
    {
        group: 'GENERAL',
        items: [{ label: 'Dashboard', path: '/portal/dashboard', icon: LayoutDashboard }],
    },
    {
        group: 'MASTER DATA',
        items: [
            {
                label: 'Kendaraan',
                icon: Truck,
                children: [
                    {
                        label: 'Unit Kendaraan',
                        path: '/portal/master/unit-kendaraan',
                        icon: Bus
                    },
                    {
                        label: 'Tipe Kendaraan',
                        path: '/portal/master/tipe-kendaraan',
                        icon: Truck
                    },
                    {
                        label: 'Merk Kendaraan',
                        path: '/portal/master/merk-kendaraan',
                        icon: BadgeInfo
                    },
                    {
                        label: 'Tire Type Kendaraan',
                        path: '/portal/master/tire-type',
                        icon: CircleDot
                    },
                    {
                        label: 'Kendaraan',
                        path: '/portal/master/kendaraan',
                        icon: Car
                    }
                ]
            },

            {
                label: 'Corporate',
                icon: Building2,
                children: [
                    {
                        label: 'Area Unit',
                        path: '/portal/master/area-unit',
                        icon: MapPinned
                    },
                    {
                        label: 'Unit Bisnis',
                        path: '/portal/master/unit-bisnis',
                        icon: Building2
                    },
                    {
                        label: 'Kode Pos',
                        path: '/portal/master/kode-pos',
                        icon: Building2
                    }
                ]
            },

            {
                label: 'Items Sparepart',
                path: '/portal/master/sparepart',
                icon: Wrench
            },

            {
                label: 'Items Operasional',
                path: '/portal/master/operasional',
                icon: Package2
            }
        ]
    },
    {
        group: 'OPERASIONAL',
        items: [
            {
                label: 'P2H',
                icon: ShieldCheck,
                children: [
                    {
                        label: 'Item P2H',
                        path: '/portal/p2h/item'
                    },
                    {
                        label: 'List P2H',
                        path: '/portal/p2h/list'
                    },
                    {
                        label: 'Report P2H',
                        path: '/portal/p2h/report'
                    }
                ]
            },

            {
                label: 'Operasional Unit',
                icon: Truck,
                children: [
                    {
                        label: 'Kendaraan',
                        path: '/portal/operasional-unit/kendaraan'
                    },
                    {
                        label: 'Reachstacker',
                        path: '/portal/operasional-unit/reachstacker'
                    },
                    {
                        label: 'Report',
                        path: '/portal/operasional-unit/report'
                    }
                ]
            },
        ]
    },
    {
        group: 'MAINTENANCE',
        items: [
            {
                label: 'Work Order (SPK)',
                path: '/portal/maintenance/spk',
                icon: FileText
            },
            {
                label: 'Maintenance Process',
                path: '/portal/maintenance/process',
                icon: Settings2
            },
            {
                label: 'Maintenance History',
                path: '/portal/maintenance/history',
                icon: History
            }
        ]
    },
    {
        group: 'INVENTORY',
        items: [
            {
                label: 'Purchase Request',
                path: '/portal/inventory/pr',
                icon: ShoppingCart
            },
            {
                label: 'Penerimaan (GR)',
                path: '/portal/inventory/gr',
                icon: PackagePlus
            },
            {
                label: 'Pengeluaran (GI)',
                path: '/portal/inventory/gi',
                icon: PackageMinus
            },
            {
                label: 'Stock',
                path: '/portal/inventory/stock',
                icon: Boxes
            }
        ]
    },
    {
        group: 'TOOLS & UTILITIES',
        items: [
            {
                label: 'Manajemen Users',
                path: '/portal/system/users',
                icon: Users
            },
            {
                label: 'Management Roles',
                path: '/portal/system/roles',
                icon: Shield
            }
        ]
    }
];

export default function Sidebar() {
    const location = useLocation();
    const [openMenus, setOpenMenus] = useState({});

    const toggleMenu = (label) => {
        setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
    };

    return (
        <aside className="w-64 shrink-0 border-r border-border bg-card flex flex-col h-screen sticky top-0">
            {/* Logo */}
            <div className="h-16 flex items-center justify-center px-6 border-b border-border shrink-0">
                <img src="/assets/img/logo_tirta_group.png" alt="AGS Logo" className="h-10 object-contain" />
            </div>

            {/* Navigation (Scrollable Area) */}
            <nav className="flex-1 overflow-y-auto py-4 px-3 custom-scrollbar">
                {navItems.map((group) => (
                    <div key={group.group} className="mb-6">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">
                            {group.group}
                        </p>

                        <div className="space-y-1">
                            {group.items.map((item) => {
                                const Icon = item.icon;
                                
                                if (item.children) {
                                    const isOpen = openMenus[item.label];
                                    const isChildActive = item.children.some((child) => location.pathname.startsWith(child.path));

                                    return (
                                        <div key={item.label}>
                                            <button onClick={() => toggleMenu(item.label)} className={cn('w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all', isChildActive ? 'bg-primary text-primary-foreground font-medium' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground')}>
                                                <div className="flex items-center gap-3"><Icon size={16} /> <span>{item.label}</span></div>
                                                <ChevronDown size={16} className={cn('transition-transform duration-200', isOpen && 'rotate-180')} />
                                            </button>
                                            {isOpen && (
                                                <div className="mt-1 ml-6 space-y-1 border-l border-border pl-3">
                                                    {item.children.map((child) => (
                                                        <NavLink key={child.path} to={child.path} className={({ isActive }) => cn('block px-3 py-2 rounded-lg text-sm transition-all', isActive ? 'bg-primary text-primary-foreground font-medium' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground')}>
                                                            {child.label}
                                                        </NavLink>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                }

                                return (
                                    <NavLink key={item.path} to={item.path} className={({ isActive }) => cn('flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all', isActive ? 'bg-primary text-primary-foreground font-medium' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground')}>
                                        <Icon size={16} /> <span>{item.label}</span>
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