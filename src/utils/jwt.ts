import jwt, { SignOptions } from "jsonwebtoken";
import { config } from "dotenv";

config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;
const ACCESS_TOKEN_EXPIRY = (process.env.ACCESS_TOKEN_EXPIRY ||
  "15m") as SignOptions["expiresIn"];
const REFRESH_TOKEN_EXPIRY = (process.env.REFRESH_TOKEN_EXPIRY ||
  "7d") as SignOptions["expiresIn"];

export const generateAccessToken = (userId: string) =>
  jwt.sign({ userId }, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });

export const generateRefreshToken = (userId: string) =>
  jwt.sign({ userId }, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });

export const verifyAccessToken = (token: string) =>
  jwt.verify(token, ACCESS_TOKEN_SECRET);

export const verifyRefreshToken = (token: string) =>
  jwt.verify(token, REFRESH_TOKEN_SECRET);
