import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/Utils/Contexts/ThemeContext';

export default function ThemeToggle() {
    const { theme, changeTheme } = useTheme();

    const toggleTheme = () => {
        changeTheme(
            theme === 'light'
                ? 'dark'
                : 'light'
        );
    };

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
            title={
                theme === 'light'
                    ? 'Dark Mode'
                    : 'Light Mode'
            }
        >
            {theme === 'light' ? (
                <Moon size={18} />
            ) : (
                <Sun size={18} />
            )}
        </button>
    );
}