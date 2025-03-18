import express from "express";
import { getMessages, getUserForSidebar, sendMessage } from "../Controllers/message.controller.js";
import { authorizedRoute } from "../Middleware/authorise.middleware.js";
const router = express.Router();

router.get("/users", authorizedRoute ,getUserForSidebar);
router.get("/:id", authorizedRoute ,getMessages)

router.post('/send/:id', authorizedRoute, sendMessage);

export default router;
