import { IToken, ITokenGroup, IUserDto } from '../interfaces/index';
import TokenModel from '../models/tokenModel';
import jwt from 'jsonwebtoken';

const JWT_ACCESSES_SECRET = process.env.JWT_ACCESSES_SECRET || 'default_access_secret';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'default_refresh_secret';

export default {
    generateTokens(payload: IUserDto) {
        const accessToken = jwt.sign(payload, JWT_ACCESSES_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '30d' });

        return {
            accessToken,
            refreshToken
        } as ITokenGroup
    },
    validateAccessesToken(token: string) {
        try {
            const userData = jwt.verify(token, JWT_ACCESSES_SECRET);
            return userData;
        } catch (err) {
            return null;
        }
    },
    validateRefreshToken(token: string) {
        try {
            const userData = jwt.verify(token, JWT_REFRESH_SECRET);
            return userData;
        } catch (err) {
            return null;
        }
    },
    async saveToken(userId: string, refreshToken: string) {
        const tokenData = await TokenModel.findOne({ user: userId }) as IToken;
        if (tokenData) {
            tokenData.refresh_token = refreshToken;
            return tokenData.save();
        }

        const token = await TokenModel.create({ user: userId, refresh_token: refreshToken });

        return token.save();
    },
    async removeToken(refreshToken: string) {
        await TokenModel.deleteOne({ refresh_token: refreshToken });
    },
    async findToken(refreshToken: string) {
        const token = await TokenModel.findOne({ refresh_token: refreshToken });
        return token;
    }
}