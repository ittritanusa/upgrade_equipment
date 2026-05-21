import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function PortalLayout({ children }) {
    return (
        <div className="min-h-screen flex bg-background">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0">
                <Header />
                <main className="flex-1 p-6 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
