import { createServer } from "http";
import { config } from "dotenv";
import express from "express";
import { healthCheckHandler } from "@routes/health.js";
import userRoutes from "@routes/user.route.js";
import authRoutes from "@routes/auth.route.js";
import { errorHandler } from "@middlewares/error.middleware.js";
import logger from "@utils/logger.js";
import { pinoHttp } from "pino-http";

config();

const PORT = process.env.PORT;

const app = express();

const server = createServer(app);

app.use(express.json());
app.use(
  pinoHttp({
    logger,
  })
);

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.use(healthCheckHandler);

app.use(errorHandler);

async function startServer() {
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();
