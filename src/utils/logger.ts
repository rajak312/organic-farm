import { pino } from "pino";

export const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      translateTime: "SYS:standard",
      ignore: "pid,hostname",
      colorize: true,
    },
  },
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
});

export default logger;
