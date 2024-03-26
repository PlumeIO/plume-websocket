import cors from "cors"
import { app } from "../config"

export function initCors() {
  app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "OPTIONS", "DELETE"],
    credentials: true, // enable set cookie
  }))
}
