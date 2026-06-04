import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function PortalLayout({ children }) {

    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="h-screen flex bg-[#f5f6fa]">

            {sidebarOpen && (
                <Sidebar />
            )}

            <div className="flex-1 flex flex-col overflow-hidden">

                <Header
                    toggleSidebar={() =>
                        setSidebarOpen(!sidebarOpen)
                    }
                />

                <main className="flex-1 overflow-y-auto p-5">
                    {children}
                </main>

            </div>

        </div>
    );
}