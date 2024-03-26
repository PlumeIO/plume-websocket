"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initRoutes = void 0;
const config_1 = require("../config");
const room_route_1 = __importDefault(require("./room.route"));
function initRoutes() {
    config_1.app.use("/room", room_route_1.default);
    config_1.app.use("*", (req, res) => res.send("UNREGISTERED ENDPOINT"));
}
exports.initRoutes = initRoutes;
//# sourceMappingURL=index.js.map