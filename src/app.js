import express from "express";
import cors from "cors";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
};

const firebase = initializeApp(firebaseConfig);

// const auth = firebase;

const app = express();
app.use(
    cors({
        origin: '*',
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve("../public")));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

import http from 'node:http';
import { Server } from "socket.io";

const server = http.createServer(app,
    {
        cors: ({
            origin: '*',
        }),
    }
);

const socket = new Server(server);

socket.on("connection", (client) => {
    console.log("client is connected", client.id);
    client.on("chat", (payload) => {
        console.log(payload);
        socket.emit("message",payload);
        // client.join(payload.sender);
        // socket.in(payload.reciver).emit("chat", payload);
    });
});

app.use((req, res, next) => {
    // console.log("inside use state");
    res.setHeader("Access-Control-Allow-Origin", "*");
    // You can also set other CORS headers as needed
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    // res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    // Handle preflight requests
    if (req.method === "OPTIONS") {
        res.sendStatus(200);
    } else {
        next();
    }
});


import userRoute from "./routes/users.routes.js";
import chatroute from "./routes/chats.routes.js";
import path from "path";

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
    return res.sendFile("/public/index.html");
});

app.use("/api", userRoute);


export {
    server,
    app,
    socket,
};