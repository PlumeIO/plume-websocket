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
exports.initIo = void 0;
const User_1 = __importDefault(require("../lib/User"));
const config_1 = __importStar(require("../config"));
function initIo() {
    config_1.io.on("connection", (socket) => {
        const user = new User_1.default(socket.id, String(socket.handshake.query["name"]), socket);
        config_1.default.users.push(user);
        console.log("user connected", user.id, user.name, config_1.default.users.length);
        socket.on("disconnect", () => {
            const index = config_1.default.users.indexOf(user);
            const room = user.room;
            user.exitCurrentRoom();
            if (room)
                room.emitUpdate("users");
            config_1.default.users.splice(index, 1);
            console.log("user disconnected", user.id, user.name, config_1.default.users.length);
        });
        socket.on("data-update", (data) => {
            const room = user.room;
            if (room) {
                room.data = data;
                room.emitUpdate("data");
            }
        });
        socket.on("state-update", (state) => {
            const room = user.room;
            if (room && room.admin === user) {
                room.state = state;
                room.emitUpdate("state");
            }
        });
        socket.on("admin-update", (adminId) => {
            const room = user.room;
            const newAdmin = User_1.default.findBy("id", adminId);
            if (room && newAdmin && room.admin === user) {
                room.admin = newAdmin;
                room.emitUpdate("admin");
                const users = [newAdmin];
                room.users.forEach((roomUser) => {
                    if (roomUser !== newAdmin)
                        users.push(roomUser);
                });
                room.users = users;
                room.emitUpdate("users");
            }
        });
        socket.on("remove-user", (userId) => {
            const room = user.room;
            if (room && room.admin === user) {
                const foundUser = User_1.default.findBy("id", userId);
                if (foundUser && foundUser.room === room) {
                    foundUser.exitCurrentRoom();
                }
            }
        });
        // socket.on("custom", req => {
        //   const { emitEndpoint, data } = req
        //   const room = user.room;
        //   if (room) {
        //     room.data = Object.assign(room.data, data)
        //     io.emit(`${room.id}/${emitEndpoint}`, data)
        //   }
        // })
    });
}
exports.initIo = initIo;
//# sourceMappingURL=io.js.map