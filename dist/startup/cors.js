"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initCors = void 0;
const cors_1 = __importDefault(require("cors"));
const config_1 = require("../config");
function initCors() {
    config_1.app.use((0, cors_1.default)({
        origin: "*",
        methods: ["GET", "POST", "PUT", "OPTIONS", "DELETE"],
        credentials: true, // enable set cookie
    }));
}
exports.initCors = initCors;
//# sourceMappingURL=cors.js.map