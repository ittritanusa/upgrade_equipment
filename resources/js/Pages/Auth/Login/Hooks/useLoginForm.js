import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '@/Utils/Hooks/UseAuth';

export function useLoginForm() {
    const navigate = useNavigate();
    const loginMutation = useLogin();

    const [form, setForm] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: null, general: null }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!form.email) newErrors.email = 'Email wajib diisi.';
        if (!form.password) newErrors.password = 'Password wajib diisi.';
        if (Object.keys(newErrors).length) {
            setErrors(newErrors);
            return;
        }

        loginMutation.mutate(form, {
            onSuccess: () => navigate('/portal/dashboard'),
            onError: (error) => {
                const msg = error?.response?.data?.message || 'Login gagal.';
                const emailErr = error?.response?.data?.errors?.email?.[0];
                setErrors(emailErr ? { email: emailErr } : { general: msg });
            },
        });
    };

    return {
        form,
        errors,
        isLoading: loginMutation.isPending,
        handleChange,
        handleSubmit,
    };
}
