import { z } from "zod";

export const loginSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "Email is required" }).email(),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, "Password must be at least 6 characters long"),
  }),
});

export type LoginInput = z.infer<typeof loginSchema>["body"];
