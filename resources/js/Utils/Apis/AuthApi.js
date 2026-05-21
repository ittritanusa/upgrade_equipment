import api from '@/Utils/Libs/Axios';

export const authApi = {
    login: (data) => api.post('/auth/login', data),
    logout: () => api.post('/auth/logout'),
    me: () => api.get('/auth/me'),
};
