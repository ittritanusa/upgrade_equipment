import './bootstrap';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from '@/Utils/Contexts/AuthContext';
import { ThemeProvider } from '@/Utils/Contexts/ThemeContext';
import queryClient from '@/Utils/Libs/QueryClient';

// Auth
import Login from '@/Pages/Auth/Login/Login';

// Not Found
import NotFoundPage from '@/Pages/NotFound/NotFoundPage';

// Dashboard
import Dashboard from '@/Pages/Admin/Dashboard/Dashboard';

import '../css/app.css';

function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/employee-portal" replace />;
}

function GuestRoute({ children }) {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <Navigate to="/portal/dashboard" replace /> : children;
}

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<GuestRoute><Login /></GuestRoute>} />
                <Route path="/portal/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                
                <Route path="*" element={<GlobalNotFoundHandler />} />
            </Routes>
        </BrowserRouter>
    );
}

function GlobalNotFoundHandler() {
    const { isAuthenticated } = useAuth();

    // Jika sudah login, bungkus dengan ProtectedRoute agar ada Sidebar/Navbar
    if (isAuthenticated) {
        return (
            <ProtectedRoute>
                <NotFoundPage />
            </ProtectedRoute>
        );
    }

    // Jika belum login, tampilkan halaman 404 polos (tanpa sidebar/dashboard layout)
    return <NotFoundPage />;
}

const el = document.getElementById('app');
if (el) {
    createRoot(el).render(
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <AuthProvider>
                    <AppRoutes />
                </AuthProvider>
            </ThemeProvider>
        </QueryClientProvider>
    );
}
