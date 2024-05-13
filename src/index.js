import { app, server } from "./app.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config({ path: ".env" });

server.listen(9000, () => {
    console.log("server listening on PORT 9000");
});

