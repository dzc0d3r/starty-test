import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";
import { AppError } from "../utils/AppError.js";

export const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.flatten().fieldErrors;
        const errorMessage = "Invalid request data";

        console.error(errorMessage, formattedErrors);

        const validationError = {
          message: errorMessage,
          errors: formattedErrors,
        };

        return next(new AppError(400, JSON.stringify(validationError)));
      }
      next(error);
    }
  };
