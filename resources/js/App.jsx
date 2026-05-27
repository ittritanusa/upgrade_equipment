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

// Module Budget & RAB
import RABProject from '@/Pages/Admin/Budget/Rab/rab_project';
import CreateRABProject from '@/Pages/Admin/Budget/Rab/create_rab_project';
import DetailRABProject from '@/Pages/Admin/Budget/Rab/detail_rab_project';

import RealisasiBudget from '@/Pages/Admin/Budget/RealisasiBudget/realisasi_budget';
import CreateRealisasiBudget from '@/Pages/Admin/Budget/RealisasiBudget/create_realisasi_budget';
import DetailRealisasiBudget from '@/Pages/Admin/Budget/RealisasiBudget/detail_realisasi_budget';

// Module Procurement
import PurchaseRequest from '@/Pages/Admin/Procurement/PR/Purchase_request';
import CreatePurchaseRequest from '@/Pages/Admin/Procurement/PR/create_purchase_request';
import DetailPurchaseRequest from '@/Pages/Admin/Procurement/PR/detail_purchase_request';

import RequestQuotation from '@/Pages/Admin/Procurement/RFQ/request_quotation';
import CreateRequestQuotation from '@/Pages/Admin/Procurement/RFQ/create_request_quotation';
import DetailRequestQuotation from '@/Pages/Admin/Procurement/RFQ/detail_request_quotation';

import VendorSelection from '@/Pages/Admin/Procurement/Vendor/vendor_selection';
import ProsesVendorSelection from '@/Pages/Admin/Procurement/Vendor/proses_vendor_selection';
import BeritaAcaraVendorSelection from '@/Pages/Admin/Procurement/Vendor/ba_vendor_selection';

import PurchaseOrder from '@/Pages/Admin/Procurement/PO/purchase_order';
import CreatePurchaseOrder from '@/Pages/Admin/Procurement/PO/create_purchase_order';
import DetailPurchaseOrder from '@/Pages/Admin/Procurement/PO/detail_purchase_order';

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

                {/* Module Project */}
                <Route path="/portal/project" element={<ProtectedRoute><Project /></ProtectedRoute>} />
                <Route path="/portal/project/create" element={<ProtectedRoute><CreateProject /></ProtectedRoute>} />
                <Route path="/portal/project/detail" element={<ProtectedRoute><DetailProject /></ProtectedRoute>} />

                {/* Module Budget & RAB */}
                <Route path="/portal/budget/rab-project" element={<ProtectedRoute><RABProject /></ProtectedRoute>} />
                <Route path="/portal/budget/rab-project/create" element={<ProtectedRoute><CreateRABProject /></ProtectedRoute>} />
                <Route path="/portal/budget/rab-project/detail" element={<ProtectedRoute><DetailRABProject /></ProtectedRoute>} />

                <Route path="/portal/budget/realisasi" element={<ProtectedRoute><RealisasiBudget /></ProtectedRoute>} />
                <Route path="/portal/budget/realisasi/create" element={<ProtectedRoute><CreateRealisasiBudget /></ProtectedRoute>} />
                <Route path="/portal/budget/realisasi/detail" element={<ProtectedRoute><DetailRealisasiBudget /></ProtectedRoute>} />

                {/* Module Procurement */}
                <Route path="/portal/purchase-request" element={<ProtectedRoute><PurchaseRequest /></ProtectedRoute>} />
                <Route path="/portal/purchase-request/create" element={<ProtectedRoute><CreatePurchaseRequest /></ProtectedRoute>} />
                <Route path="/portal/purchase-request/detail" element={<ProtectedRoute><DetailPurchaseRequest /></ProtectedRoute>} />
                
                <Route path="/portal/request-quotation" element={<ProtectedRoute><RequestQuotation /></ProtectedRoute>} />
                <Route path="/portal/request-quotation/create" element={<ProtectedRoute><CreateRequestQuotation /></ProtectedRoute>} />
                <Route path="/portal/request-quotation/detail" element={<ProtectedRoute><DetailRequestQuotation /></ProtectedRoute>} />
                
                <Route path="/portal/vendor-selection" element={<ProtectedRoute><VendorSelection /></ProtectedRoute>} />
                <Route path="/portal/vendor-selection/proses" element={<ProtectedRoute><ProsesVendorSelection /></ProtectedRoute>} />
                <Route path="/portal/vendor-selection/berita-acara" element={<ProtectedRoute><BeritaAcaraVendorSelection /></ProtectedRoute>} />\
                
                <Route path="/portal/purchase-order" element={<ProtectedRoute><PurchaseOrder /></ProtectedRoute>} />
                <Route path="/portal/purchase-order/create" element={<ProtectedRoute><CreatePurchaseOrder /></ProtectedRoute>} />
                <Route path="/portal/purchase-order/detail" element={<ProtectedRoute><DetailPurchaseOrder /></ProtectedRoute>} />
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
