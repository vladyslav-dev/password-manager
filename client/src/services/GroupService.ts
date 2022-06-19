import { IGroupService } from "../types/group";
import $api from "../api/index";

const GroupService: IGroupService = {
    getAll: async () => {
        const response = await $api.get(`/all-groups`);
        return response?.data;
    },
    getOne: async (id) => {
        const response = await $api.get(`/group/${id}`);
        return response?.data;
    },
    createOne: async ({ title }) => {
        return $api.post(`/group`, { title })
    },
    updateOne: async ({ title, user }) => {
        const response = await $api.put(`/group`, { title, user });
        return response?.data;
    },
    deleteOne: async (id) => {
        const response = await $api.delete(`/group/${id}`);
        return response?.data;
    }
}

export default GroupService;