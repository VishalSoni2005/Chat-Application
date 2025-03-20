import express from "express";
import { Server } from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  //* making web socket server
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"] //* implement patch to edit msg
  }
});

const onlineUsers = {}; // to store online users
// onlineUsers contain key value pairs as { userId: socketId } : { key : value }

export const getRecieverSocketId = (userId) => {
  return onlineUsers[userId];
};

//? note: on -> event listener && connection is event && socket is connection b/w browser and server
io.on("connection", (socket) => {
  console.log(`Client Connected: ${socket.id}`);

  // console.log("socket handshake -->> ",socket.handshake);
  // console.log("socket handshake query -->> ",socket.handshake.query);

  //* socket.handshake is an object containing have info about connect b/w client and server

  const userId = socket.handshake.query.userId;
  if (userId) onlineUsers[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(onlineUsers)); //* this is captured by frontend

  socket.on("disconnect", () => {
    console.log(`User Disconnected: ${socket.id}`);
    delete onlineUsers[userId];
    io.emit("getOnlineUsers", Object.keys(onlineUsers)); //* to tell that this user is offline
  });
});

export { server, io, app };
