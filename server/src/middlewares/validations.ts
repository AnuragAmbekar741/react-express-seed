import { NextFunction, Request, Response } from "express";
import { ZodError, type ZodSchema } from "zod";

export const validatePayload = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.body;
      const validatedPayload = schema.parse(payload);
      req.body = validatedPayload;
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).json({
          error: "Validation error",
          details: err.issues.map((e) => ({
            field: e.path.join("."),
            details: e.message,
          })),
        });
      }
      next(err);
    }
  };
};

export const validateParam = async (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const param = req.params;
      schema.parse(param);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).json({
          error: "Validation error",
          details: err.issues.map((e) => ({
            field: e.path.join("."),
            details: e.message,
          })),
        });
      }
      next(err);
    }
  };
};
