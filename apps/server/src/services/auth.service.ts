import argon2 from "argon2";
import { prisma } from "db/client";
import { AppError } from "../utils/AppError.js";
import { signAccessToken, signRefreshToken } from "../utils/jwt.js";
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
