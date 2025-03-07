import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";

dotenv.config();
import cookieParser from "cookie-parser";
import messageRoute from "./Routes/message.route.js";
import authRoute from "./Routes/auth.route.js";

const app = express();

// database connection
import { connectDB } from "./Lib/db.js";
import { cloudinaryConnection } from "./Lib/cloudinary.js";
cloudinaryConnection();
connectDB();

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
    credentials: true
  })
);

// routes
app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);

// server start up
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
