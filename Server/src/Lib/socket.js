import express from "express";
import { Server } from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"] //* implement patch to edit msg
  }
});

const onlineUsers = {}; // to store online users

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  const userId = socket.handshake.query.userId;
  if (userId) onlineUsers[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(onlineUsers));
  socket.on('disconnect', () => {
    console.log(`User Disconnected: ${socket.id}`);
    delete onlineUsers[userId];
    io.emit("getOnlineUsers", Object.keys(onlineUsers));
  })
  
})

export { server, io, app };
