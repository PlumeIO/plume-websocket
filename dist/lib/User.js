"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
class User {
    constructor(id, name, socket) {
        this.id = id;
        this.name = name;
        this.socket = socket;
    }
    exitCurrentRoom() {
        const room = this.room;
        if (room) {
            if (room.admin === this && (room === null || room === void 0 ? void 0 : room.users.length) >= 2) {
                room.admin = room.users[1];
                room.emitUpdate("admin");
            }
            const index = room.users.indexOf(this);
            room.users.splice(index, 1);
            room.emitUpdate("users");
            if (room.users.length === 0)
                room.endRoom();
        }
    }
    get json() {
        return {
            id: this.id,
            name: this.name
        };
    }
    get room() {
        return config_1.default.rooms.find(room => room.users.indexOf(this) >= 0);
    }
    static findBy(key, value) {
        // @ts-ignore
        return config_1.default.users.find(user => user[key] === value);
    }
}
exports.default = User;
//# sourceMappingURL=User.js.map