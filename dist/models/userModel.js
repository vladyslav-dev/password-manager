"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    login: {
        type: String,
        required: [true, 'Please add your login'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add your password']
    },
    password_storage: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'password'
        }]
}, { collection: 'user' });
exports.default = mongoose_1.default.model('user', userSchema);
