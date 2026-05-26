import { useNavigate } from 'react-router-dom';
import { useMe, useLogout } from '@/Utils/Hooks/UseAuth';

export function useDetailProject() {
    const navigate = useNavigate();
    const { data: user, isLoading } = useMe();
    const logoutMutation = useLogout();

    const handleLogout = () => {
        logoutMutation.mutate(undefined, {
            onSuccess: () => navigate('/login'),
        });
    };

    return { user, isLoading, handleLogout };
}
