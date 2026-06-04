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

            <div className="min-w-0 flex flex-1 flex-col overflow-hidden">

                <Header
                    toggleSidebar={() =>
                        setSidebarOpen(!sidebarOpen)
                    }
                />

                <main className="min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden p-5">
                    {children}
                </main>

            </div>

        </div>
    );
}
