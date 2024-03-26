"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exitRoom = exports.joinRoom = exports.createRoom = exports.getRooms = void 0;
const config_1 = __importDefault(require("../config"));
const response_1 = __importDefault(require("../utils/response"));
const User_1 = __importDefault(require("../lib/User"));
const Room_1 = __importStar(require("../lib/Room"));
const getRooms = (req, res) => {
    const parsedRooms = [];
    config_1.default.rooms.forEach(room => {
        const parsedRoom = {
            id: room.id,
            userLength: room.users.length,
            adminName: room.admin.name,
            state: room.state
        };
        parsedRooms.push(parsedRoom);
    });
    res.json((0, response_1.default)("Successfully fetched rooms", true, parsedRooms));
};
exports.getRooms = getRooms;
const createRoom = (req, res) => {
    const { roomId, userId } = req.body;
    const admin = User_1.default.findBy("id", userId);
    const room = Room_1.default.findBy("id", roomId);
    if (room)
        return res.json((0, response_1.default)("Room id already used"));
    if (admin === null || admin === void 0 ? void 0 : admin.room)
        return res.json((0, response_1.default)("User is already in a room"));
    if (admin) {
        const room = new Room_1.default(roomId, admin);
        config_1.default.rooms.push(room);
        res.json((0, response_1.default)("Successfully created room", true, room.json));
        console.log("room created", room.id, config_1.default.rooms.length);
    }
    else {
        res.json((0, response_1.default)("Invalid userId for admin"));
    }
};
exports.createRoom = createRoom;
const joinRoom = (req, res) => {
    const { roomId, userId } = req.body;
    const room = Room_1.default.findBy("id", roomId);
    const user = User_1.default.findBy("id", userId);
    if (!room) {
        return res.json((0, response_1.default)("Invalid roomId"));
    }
    else if (!user) {
        return res.json((0, response_1.default)("Invalid userId"));
    }
    else {
        if (user.room !== undefined) {
            return res.json((0, response_1.default)("User is already in a room"));
        }
        else if (room.state === Room_1.RoomState.OPEN) {
            room.users.push(user);
            room.emitUpdate("users");
            res.json((0, response_1.default)("Successfully joined room", true, room.json));
            console.log("user joined room", userId, roomId, room.users.length, config_1.default.rooms.length);
        }
        else {
            return res.json((0, response_1.default)("Room is closed"));
        }
    }
};
exports.joinRoom = joinRoom;
const exitRoom = (req, res) => {
    const { roomId, userId } = req.body;
    const room = Room_1.default.findBy("id", roomId);
    const user = User_1.default.findBy("id", userId);
    if (!room) {
        return res.json((0, response_1.default)("Invalid roomId"));
    }
    else if (!user) {
        return res.json((0, response_1.default)("Invalid userId"));
    }
    else if (user.room === room) {
        user.exitCurrentRoom();
        res.json((0, response_1.default)("Successfully exited current room", true));
        console.log("user exited room", user.id, room.id, room.users.length, config_1.default.rooms.length);
    }
    else {
        res.json((0, response_1.default)("User is not a member of given room"));
    }
};
exports.exitRoom = exitRoom;
exports.default = {
    getRooms: exports.getRooms,
    createRoom: exports.createRoom,
    joinRoom: exports.joinRoom,
    exitRoom: exports.exitRoom
};
//# sourceMappingURL=room.controller.js.map