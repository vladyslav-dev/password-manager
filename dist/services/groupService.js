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
const groupModel_1 = __importDefault(require("../models/groupModel"));
exports.default = {
    getAll: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const groups = yield groupModel_1.default.find({ user: userId });
        return groups;
    }),
    getOne: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const group = yield groupModel_1.default.findById(id);
        return group;
    }),
    createOne: ({ title, userId }) => __awaiter(void 0, void 0, void 0, function* () {
        const newGroup = yield groupModel_1.default.create({ title, user: userId });
        return newGroup;
    }),
    updateOne: (data) => __awaiter(void 0, void 0, void 0, function* () {
        const updatedGroup = yield groupModel_1.default.findOneAndUpdate({ _id: data._id }, { title: data.title });
        return updatedGroup;
    }),
    deleteOne: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const deletedGroup = yield groupModel_1.default.findByIdAndDelete(id);
        return deletedGroup;
    })
};
