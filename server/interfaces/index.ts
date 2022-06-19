import { Request } from 'express'
import { Document } from 'mongoose'

export interface IUser extends Document {
    _id: string;
    login: string;
    password: string;
    password_storage: IPassword[];
    _doc: object;
}

export interface IUserDto extends Omit<IUser, 'password' | '_doc'> {}

export interface IUserJWT extends IUserDto {
    iat: number;
    exp: number;
}

export interface IUserData extends ITokenGroup {
    user: IUserDto;
}

export interface ITokenGroup {
    accessToken: string;
    refreshToken: string;
}

export interface IRegisterUser extends Pick<IUser, 'login' | 'password'> {}

export interface IToken extends Document {
    readonly _id: string;
    user: string;
    refresh_token: string;
    _doc: object;
}

export interface IPassword extends Document {
    readonly _id: string;
    user: string;
    service: string;
    username: string;
    password: string;
    group?: string;
    _doc?: object;
}

export interface IGroup extends Document {
    _id: string;
    title: string;
    user: string;
    _doc: object;
}

export interface IRequestAuth extends Request {
    user?: IUserDto;
}

export interface ICreateGroup {
    title: string;
    userId: string;
}

export interface IUpdateGroup extends Omit<IGroup, '_doc'> {}

export interface ICreatePassword {
    passwordData: IPassword;
    userId: string;
}