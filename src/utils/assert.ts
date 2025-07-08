import { AppError } from "./AppError.js";

export type ErrorType =
  | "AUTH"
  | "VALIDATION"
  | "DATABASE"
  | "NOT_FOUND"
  | "CONFLICT"
  | "FORBIDDEN"
  | "UNKNOWN";

export function assert<T>(
  condition: T,
  statusCode: number,
  message: string,
  type: ErrorType = "UNKNOWN"
): asserts condition is NonNullable<T> {
  if (!condition) {
    throw new AppError(message, statusCode, type);
  }
}
