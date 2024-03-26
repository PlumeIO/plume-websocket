import roomController from "../contorllers/room.controller";
import { Router } from "express";

const roomRouter = Router();

/* 
 * RESPONSE - array of parsed rooms
 */
roomRouter.get("/", roomController.getRooms);

/*
 * REQUEST - roomId, userId
 * RESPONSE - newly created room
 */
roomRouter.post("/create", roomController.createRoom)

/*
 * REQUEST - roomId, userId
 * REQUEST - joined room
 */
roomRouter.post("/join", roomController.joinRoom)

/*
 * REQUEST - roomId, userId
 */
roomRouter.post("/exit", roomController.exitRoom)

export default roomRouter
