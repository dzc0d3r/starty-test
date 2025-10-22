import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";

interface UserPayload {
  userId: string;
  role: "ADMIN" | "USER";
  email: string;
}

export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = res.locals.user as UserPayload | undefined;

  if (!user || user.role !== "ADMIN") {
    return next(new AppError(403, "Forbidden: Insufficient permissions"));
  }

  return next();
};
