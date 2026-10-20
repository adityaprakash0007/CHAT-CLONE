import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

// Define your allowed origins (Local + Production)
const allowedOrigins = [
    "http://localhost:5173", 
     "chat-clone-use.vercel.app"
];

// Socket.IO setup
export const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        credentials: true
    }
});

export const userSocketMap = {};

io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) userSocketMap[userId] = socket.id;
    
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        if (userSocketMap[userId] === socket.id) {
            delete userSocketMap[userId];
        }
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

// Routes
app.use("/api/status", (req, res) => res.send("server is live"));
app.use('/api/auth', userRouter);
app.use('/api/messages', messageRouter);

// Start Server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();
        server.listen(PORT, () => console.log("Listening...on port: " + PORT));
    } catch (error) {
        console.error("Failed to start server:", error);
    }
};

startServer();