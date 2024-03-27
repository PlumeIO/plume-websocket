import config, { io } from "../config";
import { Request, Response } from "express";
import response from "../utils/response";
import User from "../lib/User";
import Room, { RoomState } from "../lib/Room";

export const getRooms = (req: Request, res: Response) => {
	type ParsedRoom = {
		id: string;
		name: string;
		userLength: number;
		adminName: string;
		state: RoomState;
	};

	const parsedRooms: ParsedRoom[] = [];

	config.rooms.forEach((room) => {
		const parsedRoom = {
			id: room.id,
			name: room.name,
			userLength: room.users.length,
			adminName: room.admin.name,
			state: room.state,
		};
		parsedRooms.push(parsedRoom);
	});

	res.json(response("Successfully fetched rooms", true, parsedRooms));
};

export const createRoom = (req: Request, res: Response) => {
	const { roomId, roomName, userId } = req.body;
	const admin = User.findBy("id", userId);
	const room = Room.findBy("id", roomId);
	if (room) return res.json(response("Room id already used"));
	if (admin?.room) return res.json(response("User is already in a room"));
	if (admin) {
		const room = new Room(roomId, roomName, admin);
		config.rooms.push(room);

		res.json(response("Successfully created room", true, room.json));
		console.log("room created", room.id, config.rooms.length);
	} else {
		res.json(response("Invalid userId for admin"));
	}
};

export const joinRoom = (req: Request, res: Response) => {
	const { roomId, userId } = req.body;

	const room = Room.findBy("id", roomId);
	const user = User.findBy("id", userId);

	if (!room) {
		return res.json(response("Invalid roomId"));
	} else if (!user) {
		return res.json(response("Invalid userId"));
	} else {
		if (user.room !== undefined) {
			return res.json(response("User is already in a room"));
		} else if (room.state === RoomState.OPEN) {
			room.users.push(user);
			room.emitUpdate("users");
			res.json(response("Successfully joined room", true, room.json));
			console.log(
				"user joined room",
				userId,
				roomId,
				room.users.length,
				config.rooms.length
			);
		} else {
			return res.json(response("Room is closed"));
		}
	}
};

export const exitRoom = (req: Request, res: Response) => {
	const { roomId, userId } = req.body;

	const room = Room.findBy("id", roomId);
	const user = User.findBy("id", userId);

	if (!room) {
		return res.json(response("Invalid roomId"));
	} else if (!user) {
		return res.json(response("Invalid userId"));
	} else if (user.room === room) {
		user.exitCurrentRoom();
		res.json(response("Successfully exited current room", true));
		console.log(
			"user exited room",
			user.id,
			room.id,
			room.users.length,
			config.rooms.length
		);
	} else {
		res.json(response("User is not a member of given room"));
	}
};

export default {
	getRooms,
	createRoom,
	joinRoom,
	exitRoom,
};
