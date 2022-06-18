import PasswordModel from '../models/passwordModel';
import { ICreateGroup, ICreatePassword } from '../types';

export default {
    getAll: async (userId: string) => {
        const passwords = await PasswordModel.find({ user: userId });
        return passwords;
    },
    getOne: async (id: string) => {
        const password = await PasswordModel.findById(id);
        return password;
    },
    createOne: async ({ passwordData, userId }: ICreatePassword) => {
        const newPassword = await PasswordModel.create({
            user: userId,
            service: passwordData.service,
            username: passwordData.username,
            password: passwordData.password,
            group: passwordData.group
         });
        return newPassword;
    },
    updateOne: async (groupTitle: string, userId: string) => {

    },
    deleteOne: async (id: string) => {

    }
}