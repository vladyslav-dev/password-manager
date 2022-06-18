import GroupModel from '../models/groupModel';
import { ICreateGroup } from '../types';

export default {
    getAll: async () => {
        const groups = await GroupModel.find();
        return groups;
    },
    getOne: async (id: string) => {
        const group = await GroupModel.findById(id);
        return group;
    },
    createOne: async ({ title, userId }: ICreateGroup) => {
        const newGroup = await GroupModel.create({ title, user: userId });
        await newGroup.save();
        return newGroup;
    },
    updateOne: async (groupTitle: string, userId: string) => {

    },
    deleteOne: async (id: string) => {

    }
}