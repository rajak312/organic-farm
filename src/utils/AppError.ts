import { ErrorType } from "./assert.js";

export class AppError extends Error {
  statusCode: number;
  type: ErrorType;

  constructor(
    message: string,
    statusCode: number = 500,
    type: ErrorType = "UNKNOWN"
  ) {
    super(message);
    this.statusCode = statusCode;
    this.type = type;
    Error.captureStackTrace(this, this.constructor);
  }
}
