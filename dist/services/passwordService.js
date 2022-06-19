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
const passwordModel_1 = __importDefault(require("../models/passwordModel"));
exports.default = {
    getAll: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const passwords = yield passwordModel_1.default.find({ user: userId });
        return passwords;
    }),
    getOne: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const password = yield passwordModel_1.default.findById(id);
        return password;
    }),
    createOne: ({ passwordData, userId }) => __awaiter(void 0, void 0, void 0, function* () {
        const newPassword = yield passwordModel_1.default.create({
            user: userId,
            service: passwordData.service,
            username: passwordData.username,
            password: passwordData.password,
            group: passwordData.group
        });
        return newPassword;
    }),
    updateOne: (passwordData) => __awaiter(void 0, void 0, void 0, function* () {
        const updatedPassword = yield passwordModel_1.default.findOneAndUpdate({ _id: passwordData._id }, passwordData);
        return updatedPassword;
    }),
    deleteOne: (id) => __awaiter(void 0, void 0, void 0, function* () {
        yield passwordModel_1.default.findByIdAndDelete(id);
    })
};
