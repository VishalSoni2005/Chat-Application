import express from "express";
import {
  checkAuth,
  login,
  logout,
  signup,
  updateProfilePicture
} from "../Controllers/auth.controller.js";
import { authorizedRoute } from "../Middleware/authorise.middleware.js";
const router = express.Router();

// test Route
router.get("/check", authorizedRoute, checkAuth);

// route for authentication
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
//? image update route, we use put method
router.put("/update-profile", authorizedRoute, updateProfilePicture);
//* put request -> Replaces the entire resource with a new one
export default router;
