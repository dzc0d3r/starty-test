import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import config from "../config/index.js";

interface DecodedToken {
  valid: boolean;
  expired: boolean;
  decoded: string | JwtPayload | null;
}

// Helpers to coerce our runtime config values into jsonwebtoken types
const asSecret = (s: unknown): jwt.Secret => s as jwt.Secret;
const asSignOptions = (o: unknown): jwt.SignOptions => o as jwt.SignOptions;

export function signAccessToken(payload: object): string {
  const secret = asSecret(config.JWT_ACCESS_TOKEN_SECRET);
  const opts = asSignOptions({
    expiresIn: config.JWT_ACCESS_TOKEN_TTL,
  });

  return jwt.sign(payload as jwt.JwtPayload | string, secret, opts);
}

export function verifyAccessToken(token: string): DecodedToken {
  try {
    const secret = asSecret(config.JWT_ACCESS_TOKEN_SECRET);
    const decoded = jwt.verify(token, secret) as string | JwtPayload;
    return { valid: true, expired: false, decoded };
  } catch (err: any) {
    return {
      valid: false,
      expired: err?.message === "jwt expired",
      decoded: null,
    };
  }
}

export function signRefreshToken(payload: object): string {
  const secret = asSecret(config.JWT_REFRESH_TOKEN_SECRET);
  const opts = asSignOptions({
    expiresIn: config.JWT_REFRESH_TOKEN_TTL,
  });

  return jwt.sign(payload as jwt.JwtPayload | string, secret, opts);
}

export function verifyRefreshToken(token: string): DecodedToken {
  try {
    const secret = asSecret(config.JWT_REFRESH_TOKEN_SECRET);
    const decoded = jwt.verify(token, secret) as string | JwtPayload;
    return { valid: true, expired: false, decoded };
  } catch (err: any) {
    return {
      valid: false,
      expired: err?.message === "jwt expired",
      decoded: null,
    };
  }
}
