import { TGroupCollection } from './group';
export interface IPassword {
    _id: string
    user: string
    service: string
    username: string
    password: string
    group?: string | null
}

export type TPasswordCollection = { [key: string]: IPassword }
export interface IPasswordState {
    passwordCollection: TPasswordCollection
    groupsCollection: TGroupCollection
    totalPasswords: number
    totalGroups: number
    isFetched: boolean
}

export interface INewPassword extends Omit<IPassword, '_id' | 'user'> {}

export interface IUpdatePassword extends IPassword {}

export interface IPasswordService {
    getAll: () => Promise<IPassword[]>;
    getOne: (id: string) => Promise<IPassword>;
    createOne: (passwordData: INewPassword) => Promise<IPassword>;
    updateOne: (passwordData: IUpdatePassword) => Promise<IPassword>;
    deleteOne: (id: string) => Promise<void>;
}