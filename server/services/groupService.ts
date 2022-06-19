import { IUpdateGroup } from '../interfaces/index';
import GroupModel from '../models/groupModel';
import { ICreateGroup } from '../interfaces';

export default {
    getAll: async (userId: string) => {
        const groups = await GroupModel.find({ user: userId });
        return groups;
    },
    getOne: async (id: string) => {
        const group = await GroupModel.findById(id);
        return group;
    },
    createOne: async ({ title, userId }: ICreateGroup) => {
        const newGroup = await GroupModel.create({ title, user: userId });
        return newGroup;
    },
    updateOne: async (data: IUpdateGroup) => {
        const updatedGroup = await GroupModel.findOneAndUpdate({ _id: data._id}, { title: data.title });
        return updatedGroup;
    },
    deleteOne: async (id: string) => {
        const deletedGroup = await GroupModel.findByIdAndDelete(id);
        return deletedGroup;
    }
}