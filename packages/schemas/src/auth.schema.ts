import { z } from "zod";
import { baseUserSchema } from "./base.schema.js";

export const loginSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "Email is required" }).email(),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, "Password must be at least 6 characters long"),
  }),
});

export const loginResponseSchema = z.object({
  accessToken: z.string(),
});

export type LoginInput = z.infer<typeof loginSchema>["body"];
export type LoginResponse = z.infer<typeof loginResponseSchema>;
export type UserResponse = z.infer<typeof baseUserSchema>;
