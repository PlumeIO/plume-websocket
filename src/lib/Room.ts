import Timeout from "./Timeout";
import User, { UserJson } from "./User";
import config, { io } from "../config";

export enum RoomState {
	OPEN = "OPEN",
	CLOSE = "CLOSE",
}

export type RoomJson = {
	id: string;
	name: string;
	clientName: string;
	users: UserJson[];
	admin: UserJson;
	state: RoomState;
	data: any;
};

export default class Room {
	id: string;
	name: string;
	clientName: string;
	users: User[];
	admin: User;
	timeout: Timeout;
	state: RoomState;
	data: any;

	// Interval in minutes
	constructor(
		id: string,
		name: string,
		clientName: string,
		admin: User,
		data: any = undefined,
		interval: number = 15
	) {
		this.id = id;
		this.name = name;
		this.clientName = clientName;
		this.admin = admin;
		this.users = [admin];
		this.timeout = new Timeout(this.endRoom, interval);
		this.state = RoomState.OPEN;
		this.data = data;
	}

	endRoom() {
		const index = config.rooms.indexOf(this);
		if (index >= 0) config.rooms.splice(index, 1);
	}

	get json() {
		const users: UserJson[] = [];
		this.users.forEach((user) => {
			users.push(user.json);
		});
		return {
			id: this.id,
			clientName: this.clientName,
			name: this.name,
			users,
			admin: this.admin.json,
			state: this.state,
			data: this.data,
		};
	}

	emitUpdate(key: string) {
		// @ts-ignore
		io.emit(`${this.id}/${key}-update`, this.json[key]);
	}

	static findBy(key: string, value: any) {
		// @ts-ignore
		return config.rooms.find((room) => room[key] === value);
	}
}
