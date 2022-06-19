import { IPassword } from '../interfaces/index';
import PasswordModel from '../models/passwordModel';
import { ICreatePassword } from '../interfaces';

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
    updateOne: async (passwordData: IPassword) => {
        const updatedPassword = await PasswordModel.findOneAndUpdate({ _id: passwordData._id}, passwordData );
        return updatedPassword;
    },
    deleteOne: async (id: string) => {
        await PasswordModel.findByIdAndDelete(id);
    }
}