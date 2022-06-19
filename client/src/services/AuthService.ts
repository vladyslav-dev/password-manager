import { IAuthService } from '../interfaces/auth';
import $api from '../api/index';

const AuthService: IAuthService = {
    registration: async ({ login, password }) => {
        const response = await $api.post('/registration', { login, password });
        return response?.data;
    },
    login:  async ({ login, password }) => {
        const response = await $api.post('/login', { login, password });
        return response?.data;
    },
    logout: async () => {
        return $api.post('/logout');
    },
    checkAuth: async () => {
        const response = await $api.get(`/refresh`);
        return response?.data;
    }
}

export default AuthService;