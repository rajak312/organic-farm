import { assert } from "@utils/assert.js";
import { verifyAccessToken } from "@utils/jwt.js";
import { RequestHandler } from "express";
import { JwtPayload } from "jsonwebtoken";

export const authenticate: RequestHandler = (req, _, next) => {
  const authHeader = req.headers.authorization;
  assert(authHeader?.startsWith("Bearer "), 401, "Unauthorized", "AUTH");
  const token = authHeader.split(" ")[1];
  assert(token && token.trim().length > 0, 401, "Token missing", "AUTH");
  const decoded = verifyAccessToken(token);
  assert(decoded, 401, "Invalid Token", "AUTH");
  if (typeof decoded === "object" && "userId" in decoded) {
    req.user = { userId: (decoded as JwtPayload).userId as string };
    next();
  } else {
    assert(false, 401, "Invalid Token Format", "AUTH");
  }
};
