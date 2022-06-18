export interface INewGroup {
    title: string;
}

export interface IUpdateGroup {
    title: string;
    userId: string;
}

export interface IGroup {
    readonly _id: string;
    title: string;
    user: string;
}

export type TGroupCollection ={ [key: string]: IGroup }

export interface IGroupService {
    getAll: () => Promise<IGroup[]>;
    getOne: (id: string) => Promise<IGroup>;
    createOne: (groupData: INewGroup) => Promise<IGroup>;
    updateOne: (groupData: IUpdateGroup) => Promise<IGroup>;
    deleteOne: (id: string) => Promise<void>;
}