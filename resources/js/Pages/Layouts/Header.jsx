import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMe, useLogout } from '@/Utils/Hooks/UseAuth';
import ThemeToggle from '@/Pages/Components/ThemeToggle';
import { LogOut, User, ChevronDown } from 'lucide-react';

export default function Header() {
    const navigate = useNavigate();
    const { data: user } = useMe();
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
                        onClick={() => setOpen((v) => !v)}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm text-foreground hover:bg-accent transition-colors"
                    >
                        <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold">
                            {user?.name?.[0]?.toUpperCase() ?? <User size={14} />}
                        </div>
                        <span className="font-medium">{user?.name ?? '...'}</span>
                        <ChevronDown size={14} className="text-muted-foreground" />
                    </button>

                    {open && (
                        <div className="absolute right-0 mt-1 w-48 bg-card border border-border rounded-lg shadow-md py-1 z-50">
                            <div className="px-3 py-2 border-b border-border">
                                <p className="text-sm font-medium text-foreground">{user?.name}</p>
                                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-accent transition-colors"
                            >
                                <LogOut size={14} />
                                Keluar
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
