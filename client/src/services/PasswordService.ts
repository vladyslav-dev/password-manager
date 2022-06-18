import { IPasswordService } from "../types/password";
import $api from "../api/index";

const PasswordService: IPasswordService = {
    getAll: async () => {
        const response = await $api.get(`/all-passwords`);
        return response?.data;
    },
    getOne: async (id) => {
        const response = await $api.get(`/password`, { params: { id } });
        return response?.data;
    },
    createOne: async (passwordData) => {
        return $api.post(`/password`, passwordData)
    },
    updateOne: async (passwordData) => {
        const response = await $api.put(`/password`, passwordData);
        return response?.data;
    },
    deleteOne: async (id) => {
        const response = await $api.delete(`/password`, { params: { id } });
        return response?.data;
    }
}

export default PasswordService;