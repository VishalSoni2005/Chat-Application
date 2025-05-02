import express from "express";
import {  resetPassword, sendOTP } from "../Controllers/forgotPassword.controller.js";
const router = express.Router();

router.post('/forgot-password', sendOTP);
router.post('/reset-password', resetPassword);

export default router;