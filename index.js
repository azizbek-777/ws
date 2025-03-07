const http = require("http");
const uWS = require("uWebSockets.js");
const { Server } = require("socket.io");

const app = uWS.App();
const io = new Server({
    cors: {
        origin: "*",
    },
    transports: ["polling", "websocket"],
});

io.attachApp(app);

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("message", (data) => {
        console.log("Message received:", data);
        io.emit("message", data);
    });

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

const PORT = 3000;
app.listen(PORT, async (token) => {
    if (token) {
        console.log("🚀Server is running on " + PORT);
    }
    else console.warn("❌ Port already in use");
});
