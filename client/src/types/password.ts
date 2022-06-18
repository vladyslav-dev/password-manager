import { TGroupCollection } from './group';
export interface IPassword {
    _id: string
    user: string
    service: string
    username: string
    password: string
    group?: string
}

export type TPasswordCollection = { [key: string]: IPassword }
export interface IPasswordState {
    passwordCollection: TPasswordCollection
    groupsCollection: TGroupCollection
    totalPasswords: number
    totalGroups: number
}