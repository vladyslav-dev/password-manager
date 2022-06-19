"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authRouter_1 = __importDefault(require("./authRouter"));
const groupRouter_1 = __importDefault(require("./groupRouter"));
const passwordRouter_1 = __importDefault(require("./passwordRouter"));
exports.default = [
    authRouter_1.default,
    groupRouter_1.default,
    passwordRouter_1.default
];
