import React from 'react';

export default function PortalLayout({ children }) {
    return (
        <div className="min-h-screen flex bg-background">
            <aside className="w-64 border-r border-border bg-card shrink-0">
                {/* Sidebar */}
            </aside>
            <div className="flex-1 flex flex-col">
                <header className="h-16 border-b border-border bg-card px-6 flex items-center">
                    {/* Header */}
                </header>
                <main className="flex-1 p-6 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
