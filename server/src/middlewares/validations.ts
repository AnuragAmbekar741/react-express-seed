import { NextFunction, Request, Response } from "express";
import { ZodError, ZodSchema } from "zod";

export const payloadValidations =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedPayload = schema.parse(req.body);
      req.body = validatedPayload;
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(401).json({
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
