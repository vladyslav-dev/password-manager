export interface INewGroup {
    title: string;
}

export interface IGroup {
    _id: string;
    title: string;
    user: string;
}

export interface IUpdateGroup extends IGroup {}

export type TGroupCollection ={ [key: string]: IGroup }

export interface IGroupService {
    getAll: () => Promise<IGroup[]>;
    getOne: (id: string) => Promise<IGroup>;
    createOne: (groupData: INewGroup) => Promise<IGroup>;
    updateOne: (groupData: IUpdateGroup) => Promise<IGroup>;
    deleteOne: (id: string) => Promise<void>;
}