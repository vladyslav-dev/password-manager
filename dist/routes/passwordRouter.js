"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passwordController_1 = __importDefault(require("../controllers/passwordController"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
router.get('/all-passwords', auth_1.default, passwordController_1.default.getAll);
router.get('/password/:id', auth_1.default, passwordController_1.default.getOne);
router.post('/password', auth_1.default, passwordController_1.default.createOne);
router.put('/password', auth_1.default, passwordController_1.default.updateOne);
router.delete('/password/:id', auth_1.default, passwordController_1.default.deleteOne);
exports.default = router;
