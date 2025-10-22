import argon2 from "argon2";
import { prisma } from "db/client";
import { AppError } from "../utils/AppError.js";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";
import { LoginInput } from "../validations/auth.schema.js";

export const login = async (
  input: LoginInput,
  userAgent?: string,
  ipAddress?: string,
) => {
  const user = await prisma.user.findUnique({
    where: { email: input.email },
  });

  if (!user || !user.hashedPassword) {
    throw new AppError(401, "Invalid email or password");
  }

  const isPasswordValid = await argon2.verify(
    user.hashedPassword,
    input.password,
  );
  if (!isPasswordValid) {
    throw new AppError(401, "Invalid email or password");
  }

  const tokenPayload = { userId: user.id, role: user.role, email: user.email };

  const accessToken = signAccessToken(tokenPayload);
  const refreshToken = signRefreshToken(tokenPayload);

  const hashedRefreshToken = await argon2.hash(refreshToken);

  await prisma.session.create({
    data: {
      userId: user.id,
      hashedRefreshToken: hashedRefreshToken,
      userAgent: userAgent,
      ipAddress: ipAddress,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    },
  });

  return { accessToken, refreshToken, user };
};

export const refreshSession = async (incomingRefreshToken: string) => {
  const { decoded, expired, valid } = verifyRefreshToken(incomingRefreshToken);

  if (
    !valid ||
    expired ||
    !decoded ||
    typeof decoded !== "object" ||
    !("userId" in decoded)
  ) {
    throw new AppError(401, "Invalid or expired refresh token");
  }

  const userId = (decoded as { userId: string }).userId;

  const session = await prisma.session.findFirst({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  if (!session) {
    throw new AppError(401, "Session not found. Please log in again.");
  }

  let isValidHash = false;
  try {
    isValidHash = await argon2.verify(
      session.hashedRefreshToken,
      incomingRefreshToken,
    );
  } catch (err) {
    throw new AppError(401, "Invalid refresh token");
  }

  if (!isValidHash) {
    throw new AppError(401, "Invalid or expired refresh token");
  }

  if (session.expiresAt && session.expiresAt < new Date()) {
    throw new AppError(401, "Refresh token expired. Please log in again.");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
  });

  if (!user) {
    throw new AppError(401, "User associated with this session not found.");
  }

  const tokenPayload = { userId: user.id, role: user.role, email: user.email };
  const newAccessToken = signAccessToken(tokenPayload);

  return newAccessToken;
};
export const getMe = async (
  userId: string,
): Promise<Omit<User, "hashedPassword">> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  const { hashedPassword, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const logout = async (incomingRefreshToken: string) => {
  const { decoded } = verifyRefreshToken(incomingRefreshToken);

  if (!decoded || typeof decoded !== "object" || !("userId" in decoded)) {
    return;
  }

  const userId = (decoded as { userId: string }).userId;

  const session = await prisma.session.findFirst({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  if (!session || !session.hashedRefreshToken) {
    return;
  }

  const isValidHash = await argon2.verify(
    session.hashedRefreshToken,
    incomingRefreshToken,
  );

  if (isValidHash) {
    await prisma.session.delete({
      where: { id: session.id },
    });
  }

  return;
};
