import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'system');

    useEffect(() => {
        const root = document.documentElement;
        const applyDark = () => root.classList.add('dark');
        const applyLight = () => root.classList.remove('dark');

        if (theme === 'dark') {
            applyDark();
        } else if (theme === 'light') {
            applyLight();
        } else {
            const mq = window.matchMedia('(prefers-color-scheme: dark)');
            mq.matches ? applyDark() : applyLight();

            const handler = (e) => (e.matches ? applyDark() : applyLight());
            mq.addEventListener('change', handler);
            return () => mq.removeEventListener('change', handler);
        }
    }, [theme]);

    const changeTheme = (value) => {
        setTheme(value);
        localStorage.setItem('theme', value);
    };

    return (
        <ThemeContext.Provider value={{ theme, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useTheme must be used within ThemeProvider');
    return context;
}
