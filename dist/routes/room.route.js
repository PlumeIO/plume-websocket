"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const room_controller_1 = __importDefault(require("../contorllers/room.controller"));
const express_1 = require("express");
const roomRouter = (0, express_1.Router)();
/*
 * RESPONSE - array of parsed rooms
 */
roomRouter.get("/", room_controller_1.default.getRooms);
/*
 * REQUEST - roomId, userId
 * RESPONSE - newly created room
 */
roomRouter.post("/create", room_controller_1.default.createRoom);
/*
 * REQUEST - roomId, userId
 * REQUEST - joined room
 */
roomRouter.post("/join", room_controller_1.default.joinRoom);
/*
 * REQUEST - roomId, userId
 */
roomRouter.post("/exit", room_controller_1.default.exitRoom);
exports.default = roomRouter;
//# sourceMappingURL=room.route.js.map