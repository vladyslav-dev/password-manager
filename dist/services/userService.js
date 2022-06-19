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
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const tokenService_1 = __importDefault(require("../services/tokenService"));
const UserDto_1 = __importDefault(require("../dtos/UserDto"));
exports.default = {
    registration: ({ login, password }) => __awaiter(void 0, void 0, void 0, function* () {
        const candidate = yield userModel_1.default.findOne({ login });
        if (candidate) {
            throw new Error('Login is already taken');
        }
        const hashPassword = yield bcrypt_1.default.hash(password, 8);
        const newUser = yield userModel_1.default.create({
            login,
            password: hashPassword,
        });
        yield newUser.save();
        const userDto = new UserDto_1.default(newUser);
        const tokens = tokenService_1.default.generateTokens(Object.assign({}, userDto)); // {accessToken, refreshToken}
        yield tokenService_1.default.saveToken(userDto._id, tokens.refreshToken);
        return Object.assign(Object.assign({}, tokens), { user: userDto });
    }),
    login({ login, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userModel_1.default.findOne({ login });
            if (!user) {
                throw new Error('No user with such login');
            }
            const isPasswordEqual = yield bcrypt_1.default.compare(password, user.password);
            if (!isPasswordEqual) {
                throw new Error('Password is incorrect');
            }
            const userDto = new UserDto_1.default(user);
            const tokens = tokenService_1.default.generateTokens(Object.assign({}, userDto));
            yield tokenService_1.default.saveToken(userDto._id, tokens.refreshToken);
            return Object.assign(Object.assign({}, tokens), { user: userDto });
        });
    },
    logout(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            yield tokenService_1.default.removeToken(refreshToken);
        });
    },
    refresh(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!refreshToken) {
                throw new Error('Authorization failed');
            }
            const userData = tokenService_1.default.validateRefreshToken(refreshToken);
            const tokenFromDB = yield tokenService_1.default.findToken(refreshToken);
            if (!userData || !tokenFromDB) {
                throw new Error('Authorization failed');
            }
            const user = yield userModel_1.default.findById(userData._id);
            const userDto = new UserDto_1.default(user);
            const tokens = tokenService_1.default.generateTokens(Object.assign({}, userDto));
            yield tokenService_1.default.saveToken(userDto._id, tokens.refreshToken);
            return Object.assign(Object.assign({}, tokens), { user: userDto });
        });
    }
};
