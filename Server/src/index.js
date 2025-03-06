import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import authRoute from "./Routes/auth.route.js";

const app = express();

// database connection
import { connectDB } from "./Lib/db.js";
connectDB();

// middleware
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

// server start up
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
