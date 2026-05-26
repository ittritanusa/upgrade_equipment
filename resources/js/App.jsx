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

// Dashboard
import Dashboard from '@/Pages/Admin/Dashboard/Dashboard';

// Module Projects
import Project from '@/Pages/Admin/Project/Project';
import CreateProject from '@/Pages/Admin/Project/CreateProject';
import DetailProject from '@/Pages/Admin/Project/DetailProject';

import '../css/app.css';

function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function GuestRoute({ children }) {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <Navigate to="/portal/dashboard" replace /> : children;
}

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
                <Route path="/portal/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/portal/project" element={<ProtectedRoute><Project /></ProtectedRoute>} />
                <Route path="/portal/project/create" element={<ProtectedRoute><CreateProject /></ProtectedRoute>} />
                <Route path="/portal/project/detail" element={<ProtectedRoute><DetailProject /></ProtectedRoute>} />
                <Route path="*" element={<Navigate to="/portal/dashboard" replace />} />
            </Routes>
        </BrowserRouter>
    );
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
