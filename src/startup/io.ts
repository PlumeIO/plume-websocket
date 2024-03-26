import User from "../lib/User";
import config, { io } from "../config";

export function initIo() {
	io.on("connection", (socket) => {
		const user = new User(
			socket.id,
			String(socket.handshake.query["name"]),
			socket
		);
		config.users.push(user);
		console.log("user connected", user.id, user.name, config.users.length);

		socket.on("disconnect", () => {
			const index = config.users.indexOf(user);
			const room = user.room;
			user.exitCurrentRoom();

			if (room) room.emitUpdate("users");

			config.users.splice(index, 1);
			console.log(
				"user disconnected",
				user.id,
				user.name,
				config.users.length
			);
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
			const newAdmin = User.findBy("id", adminId);
			if (room && newAdmin && room.admin === user) {
				room.admin = newAdmin;
				room.emitUpdate("admin");
				const users = [newAdmin];
				room.users.forEach((roomUser) => {
					if (roomUser !== newAdmin) users.push(roomUser);
				});
				room.users = users;
				room.emitUpdate("users");
			}
		});

		socket.on("remove-user", (userId) => {
			const room = user.room;
			if (room && room.admin === user) {
				const foundUser = User.findBy("id", userId);
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
