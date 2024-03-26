"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = require("./startup/cors");
const io_1 = require("./startup/io");
const config_1 = require("./config");
const routes_1 = require("./routes");
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
config_1.app.use(body_parser_1.default.json());
(0, cors_1.initCors)();
(0, io_1.initIo)();
(0, routes_1.initRoutes)();
const PORT = process.env.PORT || 3000;
config_1.httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map