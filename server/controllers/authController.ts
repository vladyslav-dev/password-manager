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

            res.cookie("refreshToken", userData.refreshToken, {
              maxAge: 30 * 24 * 60 * 60 * 1000,
              httpOnly: true,
            });

            return res.json(userData) // {user, accessToken, refreshToken}
        } catch (err) {
            return res.status(500).json({
                message: err
            })
        }
    },
    login: async (req: Request, res: Response) => {

        try {
            const { login, password } = req.body
            const userData = await UserService.login({ login, password })

            res.cookie("refreshToken", userData.refreshToken, {
              maxAge: 30 * 24 * 60 * 60 * 1000,
              httpOnly: true,
            })

            return res.json(userData) // {user, accessToken, refreshToken}
        } catch (err) {
            return res.status(500).json({
                message: err
            })
        }
    },
    async logout(req: Request, res: Response) {
        try {
            const { refreshToken } = req.cookies

            const token = await UserService.logout(refreshToken)

            res.clearCookie("refreshToken")
            res.json(token)
        } catch (err) {
            return res.status(500).json({
                message: err
            })
        }
    },

    async refresh(req: Request, res: Response) {
        try {
            const { refreshToken } = req.cookies

            const userData: IUserData = await UserService.refresh(refreshToken)

            res.cookie("refreshToken", userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            })

            return res.json(userData); // {user, accessToken, refreshToken}
        } catch (err) {
            return res.status(500).json({
                message: err
            })
        }
    }
}