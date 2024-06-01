import { app, server } from "./app.js";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./DB/index.js";
dotenv.config({ path: ".env" });
import fs from "fs";
import XLSX from "xlsx";

server.listen(process.env.PORT, () => {
    connectDB();
    console.log("server listening on Port 9000");
});
