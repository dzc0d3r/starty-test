import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { z } from "zod";

const configSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().default(8080),
  DATABASE_URL: z.string().url().optional(),
  DIRECT_URL: z.string().url().optional(),
});

const parsedConfig = configSchema.safeParse(process.env);

if (!parsedConfig.success) {
  console.error(
    "❌ Invalid environment variables:",
    parsedConfig.error.flatten().fieldErrors,
  );
  throw new Error("Invalid environment variables.");
}

const config = parsedConfig.data;

export default config;
