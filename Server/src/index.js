import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";

import messageRoute from "./Routes/message.route.js";
import authRoute from "./Routes/auth.route.js";
dotenv.config();

// database connection
import { connectDB } from "./Lib/db.js";
import { cloudinaryConnection } from "./Lib/cloudinary.js";
import { app, server } from "./Lib/socket.js";
cloudinaryConnection();
connectDB();


// const app = express();
app

// middleware
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
  })
); //* special middleware to upload files
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true 
  })
);

app.options("*", cors()); // enable pre-flight

// routes
app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);

// server start up
const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
