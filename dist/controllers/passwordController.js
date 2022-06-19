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
const passwordService_1 = __importDefault(require("../services/passwordService"));
exports.default = {
    getAll: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        try {
            if ((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id) {
                const passwords = yield passwordService_1.default.getAll((_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b._id);
                res.status(200).json(passwords);
            }
            else {
                res.status(401).json({ message: 'Unauthorized, no user to get all passwords.' });
            }
        }
        catch (err) {
            res.status(500).json({ message: `${err}` });
        }
    }),
    getOne: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const password = yield passwordService_1.default.getOne(req.params.id);
            res.status(200).json(password);
        }
        catch (err) {
            res.status(500).json({ message: `${err}` });
        }
    }),
    createOne: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _c;
        try {
            if ((_c = req === null || req === void 0 ? void 0 : req.user) === null || _c === void 0 ? void 0 : _c._id) {
                const password = yield passwordService_1.default.createOne({ passwordData: req.body, userId: req.user._id });
                res.status(200).json(password);
            }
            else {
                res.status(401).json({ message: 'Unauthorized, no user to create password.' });
            }
        }
        catch (err) {
            res.status(500).json({ message: `${err}` });
        }
    }),
    updateOne: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const updatedPassword = yield passwordService_1.default.updateOne(req.body);
            res.status(200).json(updatedPassword);
        }
        catch (err) {
            res.status(500).json({ message: `${err}` });
        }
    }),
    deleteOne: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield passwordService_1.default.deleteOne(req.params.id);
            res.status(200).json({ message: 'Password deleted.' });
        }
        catch (err) {
            res.status(500).json({ message: `${err}` });
        }
    }),
};
