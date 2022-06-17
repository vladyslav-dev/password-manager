import { Request, Response, NextFunction } from 'express'
import UserService from '../services/userService'
import { IUserData } from '../types'

export default {
    registration: async (req: Request, res: Response, next: NextFunction) => {
        try {

            const { login, password } = req.body

            if (!login || !password) {
                return res.status(400).json({
                    message: 'Login or password is empty'
                })
            }

            const userData: IUserData = await UserService.registration({ login, password })

            res.cookie("password-manager:refreshToken", userData.refreshToken, {
              maxAge: 30 * 24 * 60 * 60 * 1000,
              httpOnly: true,
            });

            return res.json(userData) // {user, accessToken, refreshToken}
        } catch (err) {
            return res.status(401).json({
                message: `${err}`
            })
        }
    },
    login: async (req: Request, res: Response) => {

        try {
            const { login, password } = req.body
            const userData = await UserService.login({ login, password })

            res.cookie("password-manager:refreshToken", userData.refreshToken, {
              maxAge: 30 * 24 * 60 * 60 * 1000,
              httpOnly: true,
            })
            return res.json(userData) // {user, accessToken, refreshToken}
        } catch (err) {
            return res.status(401).json({
                message: `${err}`
            })
        }
    },
    async logout(req: Request, res: Response) {
        try {
            const { refreshToken } = req.cookies

            const token = await UserService.logout(refreshToken)

            res.clearCookie("password-manager:refreshToken")
            res.json(token)
        } catch (err) {
            return res.status(401).json({
                message: `${err}`
            })
        }
    },

    async refresh(req: Request, res: Response) {
        console.log('------------------')
        console.log('check auth')
        try {

            const userData = await UserService.refresh(req.cookies['password-manager:refreshToken'])

            res.cookie("password-manager:refreshToken", userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            })

            return res.json(userData); // {user, accessToken, refreshToken}
        } catch (err) {
            console.log(err)
            console.log('error in contrl')
            return res.status(401).json({
                message: `${err}`
            })
        }
    }
}