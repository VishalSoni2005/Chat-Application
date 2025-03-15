import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../Model/user.model.js";
dotenv.config();

export const authorizedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    console.log("Token is : ", token);

    //* cookie only contain userID

    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken) {
      res.status(401).json({
        message: "Invalid token"
      });
    }

    const user = await User.findById(decodedToken.userId).select("-password");

    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    /*
      user = {
        _id: user._id,
        email: user.email,
        fullname: user.fullname,
        profilePic: user.profilePic,
      }
    */
    req.user = user; //todo: note user is added to request
    //* now req contain { cookie, user (OBJECT) }
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
};
