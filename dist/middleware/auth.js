"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tokenService_1 = __importDefault(require("../services/tokenService"));
function default_1(req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            throw new Error('Authorization failed');
        }
        const accessesToken = authorizationHeader.split(' ')[1];
        if (!accessesToken) {
            throw new Error('Authorization failed');
        }
        const userData = tokenService_1.default.validateAccessesToken(accessesToken);
        if (!userData) {
            throw new Error('Authorization failed');
        }
        req.user = userData;
        next();
    }
    catch (err) {
        return res.status(401).json({
            message: `${err}`
        });
    }
}
exports.default = default_1;
