import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, _, res) => {
  console.error("Global Error:", err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  const type = err.type || "UNKNOWN";

  res.status(statusCode).json({
    success: false,
    message,
    type,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
