import express from "express";
import cors from "cors";
import authRoute from "./Routes/auth.route.js";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);

app.use('/api/auth', authRoute)
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
