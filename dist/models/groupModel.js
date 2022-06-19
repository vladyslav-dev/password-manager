"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const groupSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: [true, 'Please add title']
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'user',
    }
}, { collection: 'group' });
exports.default = mongoose_1.default.model('group', groupSchema);
