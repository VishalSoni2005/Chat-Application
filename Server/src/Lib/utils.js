import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateToken = async (userId, res) => {
  try {
    const payload = { userId };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("jwt", token, {
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict"
    });
    return token;
  } catch (err) {
    console.log("Error in generating token", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
