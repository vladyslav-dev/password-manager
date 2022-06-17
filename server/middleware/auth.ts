import TokenService from '../services/tokenService'

import { Response, NextFunction } from 'express'
import { IUserData, IRequestAuth } from '../types'

export default function (req: IRequestAuth, res: Response, next: NextFunction) {
    try {
        const authorizationHeader = req.headers.authorization
        console.log('authorizationHeader: ', authorizationHeader)
        if (!authorizationHeader) {
            throw new Error("Authorization failed")
        }

        const accessesToken = authorizationHeader.split(' ')[1]
        console.log('accessesToken ', accessesToken)
        if (!accessesToken) {
            throw new Error("Authorization failed")
        }
        const userData = TokenService.validateAccessesToken(accessesToken) as IUserData
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