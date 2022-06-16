import { Request } from 'express'
import { Document } from 'mongoose'

export interface IUser extends Document {
    readonly _id: string
    login: string
    password: string
    password_storage: IPassword[]
    _doc: object
}

export interface IUserData extends ITokenGroup {
    user: IUser
}

export interface ITokenGroup {
    accessToken: string,
    refreshToken: string
}

export interface IRegisterUser extends Pick<IUser, 'login' | 'password'> {}

export interface IToken extends Document {
    readonly _id: string
    user: string
    refresh_token: string
    _doc: object
}

export interface IPassword extends Document {
    readonly _id: string
    user: string
    service: string
    username: string
    password: string
    group?: string
    _doc: object
}

export interface IGroup extends Document {
    readonly _id: string
    title: string
    _doc: object
}

export interface IRequestAuth extends Request {
    user?: IUserData;
}