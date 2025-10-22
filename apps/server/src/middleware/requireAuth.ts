import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";
import { verifyAccessToken } from "../utils/jwt.js";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let token: string | undefined;

  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  } else if (req.cookies && req.cookies.accessToken) {
    token = req.cookies.accessToken;
  }

  // If no token is found in either location, deny access.
  if (!token) {
    return next(new AppError(401, "Unauthorized: An access token is required"));
  }

  const { decoded, expired } = verifyAccessToken(token);

  if (expired) {
    return next(new AppError(401, "Unauthorized: Token has expired"));
  }

  if (!decoded) {
    return next(new AppError(401, "Unauthorized: Invalid token"));
  }

  res.locals.user = decoded;
  return next();
};
