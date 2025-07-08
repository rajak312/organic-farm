import { RequestHandler } from "express";

export const healthCheckHandler: RequestHandler = (_, res) => {
  res.status(200).send({ status: "UP" });
};
