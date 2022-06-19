import { IPassword } from './password';

export interface IUser {
    _id: string;
    login: string;
    password_storage: IPassword[];
}

export interface IRegisterUser extends Pick<IUser, 'login'> {
    password: string;
}