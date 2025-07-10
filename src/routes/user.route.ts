import { getCurrentUser, getUsers } from "@controller/user.controller.js";
import { authenticate } from "@middlewares/auth.middleware.js";
import { asyncHandler } from "@utils/asyncHandler.js";
import express from "express";

const router = express.Router();

router.get("/", authenticate, asyncHandler(getUsers));
router.get("/me", authenticate, asyncHandler(getCurrentUser));

export default router;
