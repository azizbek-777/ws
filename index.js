const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    transports: ["websocket"],
    cors: {
        origin: "*", // Ruxsat berilgan domen
    },
});

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("message", (data) => {
        console.log("Message received:", data);
        io.emit("message", data); // Barcha clientlarga yuborish
    });

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

server.listen(3000, () => {
    console.log("Server listening on port 3000");
});
