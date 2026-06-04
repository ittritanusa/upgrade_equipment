import { useMutation, useQuery } from '@tanstack/react-query';
import { authApi } from '@/Utils/Apis/AuthApi';
import { useAuth } from '@/Utils/Contexts/AuthContext';

export function useLogin() {

    const { login } = useAuth();

    return useMutation({
        mutationFn: (credentials) =>
            authApi.login(credentials),

        onSuccess: (response) => {

            console.log(
                'LOGIN RESPONSE:',
                response.data
            );

            login(response.data.user);
        },
    });
}

export function useLogout() {

    const { logout } = useAuth();

    return useMutation({
        mutationFn: () => authApi.logout(),

        onSuccess: () => {
            logout();
        },

        onError: () => {
            logout();
        },
    });
}

export function useMe() {

    return useQuery({
        queryKey: ['me'],
        queryFn: () =>
            authApi.me().then(
                (response) => response.data
            ),
    });
}