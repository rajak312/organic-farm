import { RequestHandler } from "express";
import prisma from "@config/prisma.js";
import bcrypt from "bcrypt";

export const registerUser: RequestHandler = async (req, res) => {
  const { name, email, password, phoneNumber } = req.body;
  const round = 10;
  const hashedPassword = await bcrypt.hash(password, round);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      phoneNumber,
    },
  });
  res.status(201).json(user);
};

export const getUsers: RequestHandler = async (req, res) => {
  const users = await prisma.user.findMany();
  res.status(200).json(users);
};
