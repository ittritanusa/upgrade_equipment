import React from 'react';

export default function AuthLayout({ children }) {
    return (
        <div className="min-h-screen w-full bg-[#edf2f7] flex items-center justify-center">
            {children}
        </div>
    );
}