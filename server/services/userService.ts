import { IToken, IUser, IUserData, IUserDto } from '../interfaces/index';
import UserModel from '../models/userModel';
import { IRegisterUser } from '../interfaces';
import bcrypt from 'bcrypt';
import TokenService from '../services/tokenService';
import UserDto from '../dtos/UserDto';

export default {
    registration: async ({ login, password }: IRegisterUser) =>  {
        const candidate = await UserModel.findOne({ login });

        if (candidate) {
            throw new Error('Login is already taken');
        }

        const hashPassword = await bcrypt.hash(password, 8);

        const newUser = await UserModel.create({
            login,
            password: hashPassword,
        });

        await newUser.save();

        const userDto = new UserDto(newUser);

        const tokens = TokenService.generateTokens({ ...userDto } as IUser); // {accessToken, refreshToken}

        await TokenService.saveToken(userDto._id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        } as IUserData;
    },
    async login({ login, password }: IRegisterUser) {
        const user = await UserModel.findOne({ login });
        if (!user) {
            throw new Error('No user with such login');
        }

        const isPasswordEqual = await bcrypt.compare(password, user.password);

        if (!isPasswordEqual) {
           throw new Error('Password is incorrect');
        }

        const userDto = new UserDto(user);

        const tokens = TokenService.generateTokens({ ...userDto } as IUserDto);
        await TokenService.saveToken(userDto._id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        };
    },
    async logout(refreshToken: string) {
        await TokenService.removeToken(refreshToken);
    },
    async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw new Error('Authorization failed');
        }

        const userData = TokenService.validateRefreshToken(refreshToken) as IUserDto | null;
        const tokenFromDB = await TokenService.findToken(refreshToken) as IToken | null;


        if (!userData || !tokenFromDB) {
            throw new Error('Authorization failed');
        }

        const user = await UserModel.findById(userData._id) as IUser;

        const userDto = new UserDto(user);

        const tokens = TokenService.generateTokens({ ...userDto } as IUserDto);
        await TokenService.saveToken(userDto._id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        };
    }
}