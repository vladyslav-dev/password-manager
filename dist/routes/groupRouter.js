"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const groupController_1 = __importDefault(require("../controllers/groupController"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
router.get('/all-groups', auth_1.default, groupController_1.default.getAll);
router.get('/group/:id', auth_1.default, groupController_1.default.getOne);
router.post('/group', auth_1.default, groupController_1.default.createOne);
router.put('/group', auth_1.default, groupController_1.default.updateOne);
router.delete('/group/:id', auth_1.default, groupController_1.default.deleteOne);
exports.default = router;
