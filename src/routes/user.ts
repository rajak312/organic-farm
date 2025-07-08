import { registerUser, getUsers } from "@controller/user.js";
import { asyncHandler } from "@utils/asyncHandler.js";
import express from "express";

const router = express.Router();

router.post("/", asyncHandler(registerUser));
router.get("/", asyncHandler(getUsers));

export default router;
