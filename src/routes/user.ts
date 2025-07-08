import { createUser, getUsers } from "@controller/user.js";
import { asyncHandler } from "@utils/asyncHandler.js";
import express from "express";

const router = express.Router();

router.post("/", asyncHandler(createUser));
router.get("/", asyncHandler(getUsers));

export default router;
