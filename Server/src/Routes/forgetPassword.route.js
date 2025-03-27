import express from "express";
import {  sendOTP } from "../Controllers/forgotPassword.controller.js";
const router = express.Router();

router.post('/forgot-password', sendOTP);

export default router;