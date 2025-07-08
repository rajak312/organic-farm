import { createServer } from "http";
import { config } from "dotenv";
import express from "express";
import { healthCheckHandler } from "@routes/health.js";
import userRoutes from "@routes/user.js";
import authRoutes from "@routes/auth.route.js";
import { errorHandler } from "@middlewares/error.middleware.js";

config();

const PORT = process.env.PORT;

const app = express();

const server = createServer(app);

app.use(express.json());
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
