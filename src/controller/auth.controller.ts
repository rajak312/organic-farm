import { RequestHandler } from "express";
import prisma from "@config/prisma.js";
import bcrypt from "bcrypt";
import { assert } from "@utils/assert.js";
import { LoginUserBody, RegisterUserBody } from "@validattions/user.schema.js";
import { User } from "@prisma/client";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "@utils/jwt.js";

export const registerUser: RequestHandler = async (req, res) => {
  const { name, email, password, phoneNumber } = req.body as RegisterUserBody;
  const round = 10;
  assert(
    !!name && !!email && !!password && !!phoneNumber,
    400,
    "All fields (name, email, password, phoneNumber) are required",
    "VALIDATION"
  );
  const existing = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { phoneNumber }],
    },
  });
  assert(
    !existing,
    409,
    "user already exists with this email or phone number",
    "CONFLICT"
  );
  const hashedPassword = await bcrypt.hash(password, round);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      phoneNumber,
    },
  });
  res.status(201).json({
    message: "user register successfully",
    user: getSafeUser(user),
  });
};

export const loginUser: RequestHandler = async (req, res) => {
  const { email, phoneNumber, password } = req.body as LoginUserBody;
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        email ? { email } : undefined,
        phoneNumber ? { phoneNumber } : undefined,
      ].filter(Boolean) as any,
    },
  });
  assert(user, 401, "User not found", "AUTH");
  const isMatch = await bcrypt.compare(password, user.password);
  assert(isMatch, 401, "Invalid credentials", "AUTH");
  res.status(200).json({
    message: "Login successful",
    user: getSafeUser(user),
  });
  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);
  res
    .cookie("refreshToken", refreshToken, {
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json({
      accessToken,
    });
};

export const refreshToken: RequestHandler = async (req, res) => {
  const token = req.cookies.refreshToken;
  assert(token, 401, "refresh token is missing", "AUTH");
  const payload = verifyRefreshToken(token) as { userId: string };
  assert(payload, 401, "invalid refresh token", "AUTH");
  const user = await getUserById(payload.userId);
  assert(user, 401, "user not found", "AUTH");
  const accessToken = generateAccessToken(user?.id);
  res
    .status(200)
    .json({ accessToken, message: "access token refresh successfully" });
};

export const logoutUser: RequestHandler = (_, res) => {
  res.clearCookie("refreshToken").json({
    message: "logout successfully",
  });
};

const getSafeUser = ({ password, ...safe }: User) => safe;

const getUserById = async (id: string) =>
  await prisma.user.findUnique({
    where: { id },
  });
