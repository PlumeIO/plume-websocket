import { app } from "../config"
import roomRouter from "./room.route"

export function initRoutes() {
  app.use("/room", roomRouter)

  app.use("*", (req, res) => res.send("UNREGISTERED ENDPOINT"))
}
