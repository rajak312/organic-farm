import { RequestHandler } from "express";
import prisma from "@config/prisma.js";

export const createUser: RequestHandler = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });
  res.status(201).json(user);
};

export const getUsers: RequestHandler = async (req, res) => {
  const users = await prisma.user.findMany();
  res.status(200).json(users);
};
