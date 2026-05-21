import React from 'react';
import AuthLayout from '@/Pages/Layouts/AuthLayout';
import ThemeToggle from '@/Pages/Components/ThemeToggle';
import { useLoginForm } from './Hooks/useLoginForm';

export default function Login() {
    const { form, errors, isLoading, handleChange, handleSubmit } = useLoginForm();

    return (
        <AuthLayout>
            <div className="flex justify-center mb-4">
                <ThemeToggle />
            </div>
            <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-semibold text-foreground">Masuk</h1>
                    <p className="text-sm text-muted-foreground mt-1">Construction Management System</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            placeholder="email@contoh.com"
                            disabled={isLoading}
                        />
                        {errors.email && (
                            <p className="text-destructive text-xs mt-1">{errors.email}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            placeholder="••••••••"
                            disabled={isLoading}
                        />
                        {errors.password && (
                            <p className="text-destructive text-xs mt-1">{errors.password}</p>
                        )}
                    </div>

                    {errors.general && (
                        <p className="text-destructive text-sm text-center">{errors.general}</p>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {isLoading ? 'Memproses...' : 'Masuk'}
                    </button>
                </form>
            </div>
        </AuthLayout>
    );
}
