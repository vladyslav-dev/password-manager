import { IUser, IUserData } from './../types/index';
import UserModel from '../models/userModel'
import { IRegisterUser } from '../types'
import bcrypt from 'bcrypt'
import TokenService from '../services/tokenService'

export default {
    registration: async ({ login, password }: IRegisterUser) =>  {
        const candidate = await UserModel.findOne({ login })

        if (candidate) {
            throw new Error('Login is already taken')
        }

        const hashPassword = await bcrypt.hash(password, 8)

        const newUser = await UserModel.create({
            login,
            password: hashPassword,
        })

        await newUser.save()

        console.log('new User', newUser)

        const tokens = TokenService.generateTokens({ ...newUser } as IUser) // {accessToken, refreshToken}

        await TokenService.saveToken(newUser._id, tokens.refreshToken)

        return {
            ...tokens,
            user: newUser
        } as IUserData
    },
    async login({ login, password }: IRegisterUser) {
        const user = await UserModel.findOne({ login })
        if (!user) {
            throw new Error("No user with such login")
        }

        const isPasswordEqual = await bcrypt.compare(password, user.password)
        if (!isPasswordEqual) {
           throw new Error("Password incorrect")
        }

        const tokens = TokenService.generateTokens({ ...user } as IUser)
        await TokenService.saveToken(user._id, tokens.refreshToken)

        return {
            ...tokens,
            user
        }
    },
    async logout(refreshToken: string) {
        await TokenService.removeToken(refreshToken)
    },
    async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw new Error("Authorization failed")
        }

        const userData= TokenService.validateRefreshToken(refreshToken) as IUser
        const tokenFromDB = await TokenService.findToken(refreshToken)

        if (!userData || !tokenFromDB) {
            throw new Error("Authorization failed")
        }

        const user = await UserModel.findById(userData._id) as IUser

        const tokens = TokenService.generateTokens({ ...user } as IUser)
        await TokenService.saveToken(user._id, tokens.refreshToken)

        return {
            ...tokens,
            user
        }
    }
}