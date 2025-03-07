import express from "express";
import { getMessages, getUserForSidebar } from "../Controllers/message.controller.js";
import { authorizedRoute } from "../Middleware/authorise.middleware.js";
const router = express.Router();

router.get("/users", authorizedRoute ,getUserForSidebar);
router.get("/:id", authorizedRoute ,getMessages)

export default router;
