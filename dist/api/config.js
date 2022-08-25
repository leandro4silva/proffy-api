"use strict";
//config to heroku
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3333;
const config = {
    server: {
        port: PORT
    }
};
exports.default = config;
//# sourceMappingURL=config.js.map