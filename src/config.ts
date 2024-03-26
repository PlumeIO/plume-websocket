import Room from "./lib/Room"
import User from "./lib/User";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*"
  }
});

type Config = {
  rooms: Room[];
  users: User[];
}

const config: Config = {
  rooms: [],
  users: []
}

export { app, httpServer, io }
export default config
