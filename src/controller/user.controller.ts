import { RequestHandler } from "express";
import prisma from "@config/prisma.js";
import { assert } from "@utils/assert.js";

export const getCurrentUser: RequestHandler = async (req, res) => {
  const { userId } = req.user as {
    userId: string;
  };
  assert(userId, 401, "unauthorized", "AUTH");
  const user = await getUserById(userId);
  res.status(201).json(user);
};

export const getUsers: RequestHandler = async (req, res) => {
  const users = await prisma.user.findMany();
  res.status(200).json(users);
};

export const getUserById = async (id: string) =>
  await prisma.user.findUnique({
    where: { id },
  });
