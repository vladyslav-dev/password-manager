import { IRegisterUser, IUser } from "./user";

export interface IAuthState {
    user: IUser | null;
    isAuth: boolean | null;
}

export interface IAuthService {
    registration: (user: IRegisterUser) => Promise<IAuthResponse>;
    login: (user: IRegisterUser) => Promise<IAuthResponse>;
    logout: () => void;
    checkAuth: () => Promise<IAuthResponse>;
}

export interface ITokenGroup {
    accessToken: string,
    refreshToken: string
}

export interface IAuthResponse extends ITokenGroup {
    user: IUser;
}