import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { logger } from "../utils/logger";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    logger.error(`[${err.statusCode}] - ${err.message}`);
    let message: object | string;
    try {
      message = JSON.parse(err.message);
    } catch (e) {
      message = err.message;
    }
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  logger.error(err);
  return res.status(500).json({
    status: "error",
    ...(typeof message === "object" ? message : { message }),
  });
};
