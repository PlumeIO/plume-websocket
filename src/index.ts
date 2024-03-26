import dotenv from "dotenv";
import { initCors } from "./startup/cors";
import { initIo } from "./startup/io";
import { app, httpServer } from "./config";
import { initRoutes } from "./routes";
import bodyParser from "body-parser";

dotenv.config();

app.use(bodyParser.json());

initCors();
initIo();
initRoutes();

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
