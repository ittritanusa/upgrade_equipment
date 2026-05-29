import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/Utils/Helpers/Utils';

import {
    LayoutDashboard,
    FolderOpen,
    Users,
    HardHat,
    Package,
    Wallet,
    Receipt,
    ClipboardList,
    Settings,
    ChevronDown,
    BriefcaseBusiness,
    Building2,
    Building,
    CalendarDays,
    HandCoins,
    ShoppingCart,
    UserCheck,
    FileText,
    UserCog
} from 'lucide-react';

const navItems = [
    {
        group: 'General',
        items: [
            { label: 'Dashboard', path: '/portal/dashboard', icon: LayoutDashboard },
        ],
    },
    {
        group: 'Master Data',
        items: [
            { label: 'Data Departemen', path: '/portal/master/departments', icon: Building2 },
            { label: 'Data Jabatan', path: '/portal/master/jabatan', icon: BriefcaseBusiness },
            { label: 'Data Karyawan', path: '/portal/master/employees', icon: Users },
            { label: 'Data Supplier / Vendor', path: '/portal/master/vendors', icon: Building },
            { label: 'Data Alasan Cuti', path: '/portal/master/leave-reasons', icon: CalendarDays },
            { label: 'Cash & Bank', path: '/portal/master/cash-bank', icon: HandCoins },
        ],
    },
    {
        group: 'Fitur',
        items: [
            { label: 'Project Management', path: '/portal/project', icon: FolderOpen },
            {
                label: 'Budget & RAB',
                icon: HardHat,
                children: [
                    { label: 'RAB Project', path: '/portal/budget/rab-project' },
                    { label: 'Realisasi Budget', path: '/portal/budget/realisasi' }
                ],
            },
            {
                label: 'Procurement',
                icon: ShoppingCart,
                children: [
                    { label: 'Purchase Request', path: '/portal/purchase-request' },
                    { label: 'Request for Quotation', path: '/portal/request-quotation' },
                    { label: 'Vendor Selection', path: '/portal/vendor-selection' },
                    { label: 'Purchase Order', path: '/portal/purchase-order' }
                ],
            },
            {
                label: 'Inventory & Warehouse',
                icon: Package,
                children: [
                    { label: 'Dashboard Inventory', path: '/portal/inventory/dashboard' },
                    { label: 'Warehouse Management', path: '/portal/inventory/warehouse' },
                    { label: 'Kategori & Satuan', path: '/portal/inventory/category-unit' },
                    { label: 'Master Item & Material', path: '/portal/inventory/master-item' },
                    { label: 'Goods Receipt', path: '/portal/inventory/goods-receipt' },
                    { label: 'Goods Issue', path: '/portal/inventory/goods-issue' },
                    { label: 'Stock Opname', path: '/portal/inventory/stock-opname' },
                    { label: 'Stock Adjustment', path: '/portal/inventory/stock-adjustment' },
                    { label: 'Inter Warehouse Transfer', path: '/portal/inventory/inter-warehouse-transfer' }
                ],
            },
            {
                label: 'Accounting & Finance',
                icon: Wallet,
                children: [
                    { label: 'Finance Dashboard', path: '/portal/finance/dashboard' },
                    { label: 'Chart of Account (COA)', path: '/portal/finance/coa' },
                    { label: 'Journal Entry', path: '/portal/finance/journal-entry' },
                    { label: 'General Ledger', path: '/portal/finance/general-ledger' },
                    { label: 'Account Receivable', path: '/portal/finance/account-receivable' },
                    { label: 'Account Payable', path: '/portal/finance/account-payable' },
                    { label: 'Petty Cash', path: '/portal/finance/petty-cash' }
                ],
            },
            {
                label: 'Tax Management',
                icon: Receipt,
                children: [
                    { label: 'Tax Dashboard', path: '/portal/tax/dashboard' },
                    { label: 'Tax Payment', path: '/portal/tax/payment' },
                ],
            },
            {
                label: 'HR & Manpower',
                icon: UserCheck,
                children: [
                    { label: 'HR Dashboard', path: '/portal/manpower/dashboard' },
                    { label: 'Employee Management', path: '/portal/manpower/employee' },
                    { label: 'Data Attendance', path: '/portal/manpower/attendance' },
                    { label: 'Payroll & Compensation', path: '/portal/manpower/payroll' },
                    { label: 'KPI Monitoring', path: '/portal/manpower/kpi-monitoring' },
                ],
            },
            { label: 'Document Management', path: '/portal/document', icon: FileText },
            { label: 'Report & Analytics', path: '/portal/reports', icon: ClipboardList },
        ],
    },
    {
        group: 'Sistem',
        items: [
            { label: 'Manajemen Pengguna', path: '/portal/system/users', icon: UserCog },
            { label: 'Pengaturan Sistem', path: '/portal/system/settings', icon: Settings },
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