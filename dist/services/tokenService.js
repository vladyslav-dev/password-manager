"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tokenModel_1 = __importDefault(require("../models/tokenModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_ACCESSES_SECRET = process.env.JWT_ACCESSES_SECRET || 'default_access_secret';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'default_refresh_secret';
exports.default = {
    generateTokens(payload) {
        const accessToken = jsonwebtoken_1.default.sign(payload, JWT_ACCESSES_SECRET, { expiresIn: '1h' });
        const refreshToken = jsonwebtoken_1.default.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '30d' });
        return {
            accessToken,
            refreshToken
        };
    },
    validateAccessesToken(token) {
        try {
            const userData = jsonwebtoken_1.default.verify(token, JWT_ACCESSES_SECRET);
            return userData;
        }
        catch (err) {
            return null;
        }
    },
    validateRefreshToken(token) {
        try {
            const userData = jsonwebtoken_1.default.verify(token, JWT_REFRESH_SECRET);
            return userData;
        }
        catch (err) {
            return null;
        }
    },
    saveToken(userId, refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenData = yield tokenModel_1.default.findOne({ user: userId });
            if (tokenData) {
                tokenData.refresh_token = refreshToken;
                return tokenData.save();
            }
            const token = yield tokenModel_1.default.create({ user: userId, refresh_token: refreshToken });
            return token.save();
        });
    },
    removeToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            yield tokenModel_1.default.deleteOne({ refresh_token: refreshToken });
        });
    },
    findToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield tokenModel_1.default.findOne({ refresh_token: refreshToken });
            return token;
        });
    }
};
