"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const passwordSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'user'
    },
    service: {
        type: String,
        required: [true, 'Please add your service name']
    },
    username: {
        type: String,
        required: [true, 'Please add your username']
    },
    password: {
        type: String,
        required: [true, 'Please add your password']
    },
    group: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'group'
    }
}, { collection: 'password' });
exports.default = mongoose_1.default.model('password', passwordSchema);
