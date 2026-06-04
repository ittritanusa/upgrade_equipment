import React, {
    createContext,
    useContext,
    useState,
    useMemo,
    useEffect,
} from 'react';
import { authApi } from '@/Utils/Apis/AuthApi';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {

        try {

            const savedUser = localStorage.getItem('user');

            return savedUser
                ? JSON.parse(savedUser)
                : null;

        } catch (error) {

            console.error(
                'Failed parse localStorage user:',
                error
            );

            return null;
        }
    });
    const [isCheckingAuth, setIsCheckingAuth] = useState(() => {
        try {
            return !!localStorage.getItem('user');
        } catch {
            return false;
        }
    });

    const clearUser = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const persistUser = (userData) => {
        setUser(userData);
        localStorage.setItem(
            'user',
            JSON.stringify(userData)
        );
    };

    const login = (userData) => {
        persistUser(userData);
    };

    const logout = () => {
        clearUser();
    };

    useEffect(() => {
        if (!user) {
            setIsCheckingAuth(false);
            return;
        }

        let cancelled = false;

        authApi.me()
            .then((response) => {
                if (cancelled) {
                    return;
                }

                const sessionUser = response?.data;

                if (!sessionUser?.id) {
                    clearUser();
                    return;
                }

                persistUser({
                    id: sessionUser.id,
                    username: sessionUser.username,
                    nama: sessionUser.name ?? user.nama ?? '',
                    role: sessionUser.role,
                    jabatan: sessionUser.jabatan,
                    unitbisnis: sessionUser.unitbisnis,
                    working_area: sessionUser.working_area,
                    idErp: sessionUser.idErp,
                });
            })
            .catch(() => {
                if (!cancelled) {
                    clearUser();
                }
            })
            .finally(() => {
                if (!cancelled) {
                    setIsCheckingAuth(false);
                }
            });

        return () => {
            cancelled = true;
        };
    }, []);

    useEffect(() => {
        const handleUnauthorized = () => {
            clearUser();
            setIsCheckingAuth(false);
        };

        window.addEventListener('auth:unauthorized', handleUnauthorized);

        return () => {
            window.removeEventListener('auth:unauthorized', handleUnauthorized);
        };
    }, []);

    const value = useMemo(() => ({
        user,
        setUser,
        login,
        logout,
        isAuthenticated: !!user,
        isCheckingAuth,
    }), [user, isCheckingAuth]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {

    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            'useAuth must be used within AuthProvider'
        );
    }

    return context;
}
