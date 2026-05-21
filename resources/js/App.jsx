import './bootstrap';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/Utils/Contexts/AuthContext';
import '../css/app.css';

const queryClient = new QueryClient();

const el = document.getElementById('app');
if (el) {
    createRoot(el).render(
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <App />
            </AuthProvider>
        </QueryClientProvider>
    );
}
