import { NextFunction, Request, Response } from "express";
import config from "../config/index.js";
import * as AuthService from "../services/auth.service.js";
import { AppError } from "../utils/AppError.js";
import { LoginInput } from "../validations/auth.schema.js";

const cookieOptions = {
  secure: config.NODE_ENV === "production",
  // Use 'lax' in development and 'none' in production
  sameSite: (config.NODE_ENV === "production" ? "none" : "lax") as
    | "lax"
    | "strict"
    | "none"
    | undefined,
  path: "/",
};

export const loginHandler = async (
  req: Request<{}, {}, LoginInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { accessToken, refreshToken } = await AuthService.login(
      req.body,
      req.get("user-agent"),
      req.ip,
    );

    res.cookie("accessToken", accessToken, {
      maxAge: 900000, // 15 minutes in milliseconds
      ...cookieOptions,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      ...cookieOptions,
    });

    res.status(200).json({ message: "success", token: accessToken });
  } catch (error) {
    next(error);
  }
};

export const refreshHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const refreshToken = req.cookies ? req.cookies.refreshToken : null;
    console.log(req.cookies);
    if (!refreshToken) {
      throw new AppError(401, "Refresh token not found");
    }

    const newAccessToken = await AuthService.refreshSession(refreshToken);

    res.cookie("accessToken", newAccessToken, {
      maxAge: 900000, // 15 minutes
      ...cookieOptions,
    });

    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    next(error);
  }
};

export const getMeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = res.locals.user.userId;
    const user = await AuthService.getMe(userId);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const logoutHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (refreshToken) {
      await AuthService.logout(refreshToken);
    }

    res.clearCookie("accessToken", cookieOptions);
    res.clearCookie("refreshToken", { ...cookieOptions, httpOnly: true });

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    next(error);
  }
};
