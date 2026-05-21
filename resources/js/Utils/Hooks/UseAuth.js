import { useMutation, useQuery } from '@tanstack/react-query';
import { authApi } from '@/Utils/Apis/AuthApi';
import { useAuth } from '@/Utils/Contexts/AuthContext';

export function useLogin() {
    const { login } = useAuth();

    return useMutation({
        mutationFn: (credentials) => authApi.login(credentials),
        onSuccess: ({ data }) => {
            login(data.user, data.token);
        },
    });
}

export function useLogout() {
    const { logout } = useAuth();

    return useMutation({
        mutationFn: () => authApi.logout(),
        onSuccess: () => logout(),
        onError: () => logout(),
    });
}

export function useMe() {
    const { token } = useAuth();

    return useQuery({
        queryKey: ['me'],
        queryFn: () => authApi.me().then((r) => r.data),
        enabled: !!token,
    });
}
