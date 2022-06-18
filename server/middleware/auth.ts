import TokenService from '../services/tokenService'

import { Response, NextFunction } from 'express'
import { IRequestAuth, IUserJWT } from '../types'

export default function (req: IRequestAuth, res: Response, next: NextFunction) {
    try {
        const authorizationHeader = req.headers.authorization

        if (!authorizationHeader) {
            throw new Error("Authorization failed")
        }

        const accessesToken = authorizationHeader.split(' ')[1]

        if (!accessesToken) {
            throw new Error("Authorization failed")
        }
        const userData = TokenService.validateAccessesToken(accessesToken) as IUserJWT
        if (!userData) {
            throw new Error("Authorization failed")
        }

        req.user = userData
        next()
    } catch (err) {
        return res.status(401).json({
            message: `${err}`
        })
    }
}