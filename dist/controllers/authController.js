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
const userService_1 = __importDefault(require("../services/userService"));
exports.default = {
    registration: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { login, password } = req.body;
            if (!login || !password) {
                return res.status(400).json({
                    message: 'Login or password is empty'
                });
            }
            const userData = yield userService_1.default.registration({ login, password });
            res.cookie('password-manager:refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return res.json(userData); // {user, accessToken, refreshToken}
        }
        catch (err) {
            return res.status(401).json({
                message: `${err}`
            });
        }
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { login, password } = req.body;
            const userData = yield userService_1.default.login({ login, password });
            res.cookie('password-manager:refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return res.json(userData); // {user, accessToken, refreshToken}
        }
        catch (err) {
            return res.status(401).json({
                message: `${err}`
            });
        }
    }),
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshToken } = req.cookies;
                const token = yield userService_1.default.logout(refreshToken);
                res.clearCookie('password-manager:refreshToken');
                res.json(token);
            }
            catch (err) {
                return res.status(401).json({
                    message: `${err}`
                });
            }
        });
    },
    refresh(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = yield userService_1.default.refresh(req.cookies['password-manager:refreshToken']);
                res.cookie('password-manager:refreshToken', userData.refreshToken, {
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    httpOnly: true,
                });
                return res.json(userData); // {user, accessToken, refreshToken}
            }
            catch (err) {
                return res.status(401).json({
                    message: `${err}`
                });
            }
        });
    }
};
