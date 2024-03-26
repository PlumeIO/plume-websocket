import config from "../config";
import { Socket } from "socket.io";

export type UserJson = {
  id: string;
  name: string;
}

export default class User {
  id: string;
  name: string;
  socket: Socket;

  constructor(id: string, name: string, socket: Socket) {
    this.id = id;
    this.name = name;
    this.socket = socket
  }

  exitCurrentRoom() {
    const room = this.room;
    if (room) {
      if (room.admin === this && room?.users.length >= 2) {
        room.admin = room.users[1]
        room.emitUpdate("admin")
      }
      const index = room.users.indexOf(this);
      room.users.splice(index, 1)
      room.emitUpdate("users")

      if (room.users.length === 0) room.endRoom()
    }
  }

  get json(): UserJson {
    return {
      id: this.id,
      name: this.name
    }
  }

  get room() {
    return config.rooms.find(room => room.users.indexOf(this) >= 0)
  }

  static findBy(key: string, value: any) {
    // @ts-ignore
    return config.users.find(user => user[key] === value);
  }
}
