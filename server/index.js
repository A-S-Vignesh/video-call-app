import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";

import mongoose from "./db.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
    console.log("User connected ", socket.id);

    socket.on("join-room", (roomId, userId) => {
        console.log("room Joint");
        console.log("user Id", userId);
        console.log("Room ID", roomId);

        socket.join(roomId);
        socket.to(roomId).emit("user-connected", userId);

        socket.on("disconnect", () => {
            socket.to(roomId).emit("user-disconnected", userId);
        });
    });
});

app.get("/", (req, res) =>{
    res.send("Server is running");
})

server.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});