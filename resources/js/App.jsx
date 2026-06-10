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

import TireTypeKendaraan from '@/Pages/Admin/TireTypeKendaraan/tire_type_kendaraan';
import CreateTireTypeKendaraan from '@/Pages/Admin/TireTypeKendaraan/create_tire_type_kendaraan';
import EditTireTypeKendaraan from '@/Pages/Admin/TireTypeKendaraan/edit_tire_type_kendaraan';

import Kendaraan from '@/Pages/Admin/Kendaraan/kendaraan';
import CreateKendaraan from '@/Pages/Admin/Kendaraan/create_kendaraan';
import DetailKendaraan from '@/Pages/Admin/Kendaraan/detail_kendaraan';
import EditKendaraan from '@/Pages/Admin/Kendaraan/edit_kendaraan';

import AreaUnit from '@/Pages/Admin/AreaUnit/area_unit';
import CreateAreaUnit from '@/Pages/Admin/AreaUnit/create_area_unit';
import DetailAreaUnit from '@/Pages/Admin/AreaUnit/detail_area_unit';
import EditAreaUnit from '@/Pages/Admin/AreaUnit/edit_area_unit';

import UnitBisnis from '@/Pages/Admin/UnitBisnis/unit_bisnis';
import CreateUnitBisnis from '@/Pages/Admin/UnitBisnis/create_unit_bisnis';
import EditUnitBisnis from '@/Pages/Admin/UnitBisnis/edit_unit_bisnis';

import KodePos from '@/Pages/Admin/KodePos/kode_pos';
import CreateKodePos from '@/Pages/Admin/KodePos/create_kode_pos';
import EditKodePos from '@/Pages/Admin/KodePos/edit_kode_pos';

import '../css/app.css';

function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/" replace />;
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
                
                <Route path="/portal/master/tire-type" element={<ProtectedRoute><TireTypeKendaraan /></ProtectedRoute>} />
                <Route path="/portal/master/tire-type/create" element={<ProtectedRoute><CreateTireTypeKendaraan /></ProtectedRoute>} />
                <Route path="/portal/master/tire-type/edit/:id" element={<ProtectedRoute><EditTireTypeKendaraan /></ProtectedRoute>} />
                
                <Route path="/portal/master/kendaraan" element={<ProtectedRoute><Kendaraan /></ProtectedRoute>} />
                <Route path="/portal/master/kendaraan/create" element={<ProtectedRoute><CreateKendaraan /></ProtectedRoute>} />
                <Route path="/portal/master/kendaraan/detail/:id" element={<ProtectedRoute><DetailKendaraan /></ProtectedRoute>} />
                <Route path="/portal/master/kendaraan/edit/:id" element={<ProtectedRoute><EditKendaraan /></ProtectedRoute>} />
                
                <Route path="/portal/master/area-unit" element={<ProtectedRoute><AreaUnit /></ProtectedRoute>} />
                <Route path="/portal/master/area-unit/create" element={<ProtectedRoute><CreateAreaUnit /></ProtectedRoute>} />
                <Route path="/portal/master/area-unit/detail/:id" element={<ProtectedRoute><DetailAreaUnit /></ProtectedRoute>} />
                <Route path="/portal/master/area-unit/edit/:id" element={<ProtectedRoute><EditAreaUnit /></ProtectedRoute>} />

                <Route path="/portal/master/unit-bisnis" element={<ProtectedRoute><UnitBisnis /></ProtectedRoute>} />
                <Route path="/portal/master/unit-bisnis/create" element={<ProtectedRoute><CreateUnitBisnis /></ProtectedRoute>} />
                <Route path="/portal/master/unit-bisnis/edit/:id" element={<ProtectedRoute><EditUnitBisnis /></ProtectedRoute>} />

                <Route path="/portal/master/kode-pos" element={<ProtectedRoute><KodePos /></ProtectedRoute>} />
                <Route path="/portal/master/kode-pos/create" element={<ProtectedRoute><CreateKodePos /></ProtectedRoute>} />
                <Route path="/portal/master/kode-pos/edit/:id" element={<ProtectedRoute><EditKodePos /></ProtectedRoute>} />
                
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
