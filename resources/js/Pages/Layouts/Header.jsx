import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '@/Utils/Hooks/UseAuth';
import { useAuth } from '@/Utils/Contexts/AuthContext';
import ThemeToggle from '@/Pages/Components/ThemeToggle';
import { LogOut, User, ChevronDown } from 'lucide-react';

export default function Header() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const logoutMutation = useLogout();
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const handleLogout = () => {
        logoutMutation.mutate(undefined, {
            onSuccess: () => navigate('/login'),
            onError: () => navigate('/login'),
        });
    };

    return (
        <header className="h-16 shrink-0 border-b border-border bg-card px-6 flex items-center justify-between">
            <div />

            <div className="flex items-center gap-4">
                <ThemeToggle />

                <div className="relative" ref={ref}>
                    <button
                        onClick={() => setOpen(!open)}
                        className="flex items-center gap-2 hover:bg-gray-100 px-2 py-1 rounded-lg"
                    >
                        <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center border">
                            <User size={16} />
                        </div>

                        <div className="text-left hidden md:block">
                            <div className="text-xs font-semibold text-gray-800">
                                {user?.nama || '-'}
                            </div>

                            <div className="text-[10px] text-gray-500">
                                {user?.role || ''} - {user?.unitbisnis || ''}
                            </div>
                        </div>

                        <ChevronDown size={14} />
                    </button>

                    {open && (
                        <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-lg border shadow-lg z-50">
                            
                            <div className="p-3 border-b">
                                <div className="font-medium text-sm">
                                    {user?.nama}
                                </div>

                                <div className="text-xs text-gray-500">
                                    {user?.unitbisnis || ''} - {user?.working_area || ''}
                                </div>
                            </div>

                            <button
                                onClick={handleLogout}
                                className="w-full text-left flex items-center gap-2 px-3 py-3 text-red-600 hover:bg-red-50"
                            >
                                <LogOut size={16} />
                                Logout
                            </button>

                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
