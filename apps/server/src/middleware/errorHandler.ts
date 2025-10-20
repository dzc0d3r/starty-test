import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";
import { logger } from "../utils/logger.js";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let message: object | string;

  if (err instanceof AppError) {
    logger.error(`[${err.statusCode}] - ${err.message}`);

    try {
      message = JSON.parse(err.message);
    } catch {
      message = err.message;
    }

    return res.status(err.statusCode).json({
      status: "error",
      ...(typeof message === "object" ? message : { message }),
    });
  }

  // For unexpected or non-AppError errors
  logger.error(err);

  message = err.message || "Internal Server Error";

  return res.status(500).json({
    status: "error",
    ...(typeof message === "object" ? message : { message }),
  });
};
