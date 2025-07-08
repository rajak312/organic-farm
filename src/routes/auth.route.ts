import {
  loginUser,
  refreshToken,
  registerUser,
} from "@controller/auth.controller.js";
import { validateRequest } from "@middlewares/validate.middeware.js";
import { asyncHandler } from "@utils/asyncHandler.js";
import {
  loginUserSchema,
  registerUserSchema,
} from "@validattions/user.schema.js";
import express from "express";

const router = express.Router();

router.post(
  "/register",
  validateRequest(registerUserSchema),
  asyncHandler(registerUser)
);
router.post(
  "/login",
  validateRequest(loginUserSchema),
  asyncHandler(loginUser)
);

router.get("/refresh-token", asyncHandler(refreshToken));
router.get("/logout", asyncHandler(loginUser));

export default router;
