import React from 'react';
import { useTheme } from '@/Utils/Contexts/ThemeContext';

const options = [
    { value: 'light', label: 'Light', icon: '☀️' },
    { value: 'dark', label: 'Dark', icon: '🌙' },
    { value: 'system', label: 'System', icon: '💻' },
];

export default function ThemeToggle() {
    const { theme, changeTheme } = useTheme();

    return (
        <div className="flex items-center gap-1 rounded-lg border border-border bg-muted p-1">
            {options.map((opt) => (
                <button
                    key={opt.value}
                    onClick={() => changeTheme(opt.value)}
                    className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                        theme === opt.value
                            ? 'bg-background text-foreground shadow-sm'
                            : 'text-muted-foreground hover:text-foreground'
                    }`}
                >
                    <span>{opt.icon}</span>
                    <span>{opt.label}</span>
                </button>
            ))}
        </div>
    );
}
