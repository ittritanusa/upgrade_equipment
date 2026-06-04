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

// Master Data
import UnitKendaraan from '@/Pages/Admin/UnitKendaraan/UnitKendaraan';
import CreateUnitKendaraan from '@/Pages/Admin/UnitKendaraan/CreateUnitKendaraan';
import EditUnitKendaraan from '@/Pages/Admin/UnitKendaraan/EditUnitKendaraan';

import TipeKendaraan from '@/Pages/Admin/TipeKendaraan/TipeKendaraan';
import CreateTipeKendaraan from '@/Pages/Admin/TipeKendaraan/CreateTipeKendaraan';
import EditTipeKendaraan from '@/Pages/Admin/TipeKendaraan/EditTipeKendaraan';

import MerkKendaraan from '@/Pages/Admin/MerkKendaraan/MerkKendaraan';
import CreateMerkKendaraan from '@/Pages/Admin/MerkKendaraan/CreateMerkKendaraan';
import EditMerkKendaraan from '@/Pages/Admin/MerkKendaraan/EditMerkKendaraan';

import '../css/app.css';

function ProtectedRoute({ children }) {
    const { isAuthenticated, isCheckingAuth } = useAuth();
    if (isCheckingAuth) {
        return null;
    }
    return isAuthenticated ? children : <Navigate to="/" replace />;
}

function GuestRoute({ children }) {
    const { isAuthenticated, isCheckingAuth } = useAuth();
    if (isCheckingAuth) {
        return null;
    }
    return isAuthenticated ? <Navigate to="/portal/dashboard" replace /> : children;
}

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<GuestRoute><Login /></GuestRoute>} />
                <Route path="/portal/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

                {/* Master Data */}
                <Route path="/portal/master/unit-kendaraan" element={<ProtectedRoute><UnitKendaraan /></ProtectedRoute>} />
                <Route path="/portal/master/unit-kendaraan/create" element={<ProtectedRoute><CreateUnitKendaraan /></ProtectedRoute>} />
                <Route path="/portal/master/unit-kendaraan/edit/:id" element={<ProtectedRoute><EditUnitKendaraan /></ProtectedRoute>} />
                
                <Route path="/portal/master/tipe-kendaraan" element={<ProtectedRoute><TipeKendaraan /></ProtectedRoute>} />
                <Route path="/portal/master/tipe-kendaraan/create" element={<ProtectedRoute><CreateTipeKendaraan /></ProtectedRoute>} />
                <Route path="/portal/master/tipe-kendaraan/edit/:id" element={<ProtectedRoute><EditTipeKendaraan /></ProtectedRoute>} />
                
                <Route path="/portal/master/merk-kendaraan" element={<ProtectedRoute><MerkKendaraan /></ProtectedRoute>} />
                <Route path="/portal/master/merk-kendaraan/create" element={<ProtectedRoute><CreateMerkKendaraan /></ProtectedRoute>} />
                <Route path="/portal/master/merk-kendaraan/edit/:id" element={<ProtectedRoute><EditMerkKendaraan /></ProtectedRoute>} />
                
                <Route path="*" element={<GlobalNotFoundHandler />} />
            </Routes>
        </BrowserRouter>
    );
}

function GlobalNotFoundHandler() {
    const { isAuthenticated, isCheckingAuth } = useAuth();

    if (isCheckingAuth) {
        return null;
    }

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
