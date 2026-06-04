import React, {
    createContext,
    useContext,
    useState,
    useMemo,
} from 'react';

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

    const login = (userData) => {

        console.log(
            'LOGIN USER:',
            userData
        );

        setUser(userData);

        localStorage.setItem(
            'user',
            JSON.stringify(userData)
        );
    };

    const logout = () => {

        setUser(null);

        localStorage.removeItem('user');
    };

    const value = useMemo(() => ({
        user,
        setUser,
        login,
        logout,
        isAuthenticated: !!user,
    }), [user]);

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