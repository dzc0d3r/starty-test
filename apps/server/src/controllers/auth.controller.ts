import { NextFunction, Request, Response } from "express";
import config from "../config/index.js";
import * as AuthService from "../services/auth.service.js";
import { LoginInput } from "../validations/auth.schema.js";

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
      secure: config.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: config.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: "/",
    });

    res.status(200).json({ message: "success", token: accessToken });
  } catch (error) {
    next(error);
  }
};
