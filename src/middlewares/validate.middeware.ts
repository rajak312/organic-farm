import { RequestHandler } from "express";
import { ZodSchema } from "zod";

export const validateRequest = (schema: ZodSchema): RequestHandler => {
  return (req, res, next): void => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.errors || error.message,
      });
    }
  };
};
