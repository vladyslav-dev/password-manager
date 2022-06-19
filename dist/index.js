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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = __importDefault(require("./routes/index"));
const path_1 = __importDefault(require("path"));
// Middleware
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// Routes
app.use('/api', index_1.default);
// Enviroment variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
// Production Deploy
if (process.env.NODE_ENV === 'production') {
    console.log('Production mode has been started');
    app.use(express_1.default.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path_1.default.join(__dirname, '../client', 'build', 'index.html'));
    });
}
// Start server
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (MONGO_URI) {
            mongoose_1.default.connect(MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }, (err) => {
                if (err)
                    throw err;
                console.log('MongoDB connected!');
            });
        }
        else {
            throw new Error('Environment variable MONGO_URI is not defined');
        }
        app.listen(PORT, () => console.log('Server has been started on PORT ', PORT));
    }
    catch (err) {
        console.error(err);
    }
});
start();
