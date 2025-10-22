import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { z } from "zod";
import { logger } from "../utils/logger.js";

// for dev server -- pnpm --filter server dev
try {
  const envPath = path.resolve(process.cwd(), "../../.env.local");
  const result = dotenv.config({ path: envPath });
  if (result.error) throw result.error;
  logger.info(`Loaded .env.local from ${envPath}`);
} catch (err: any) {
  logger.error(`Failed to load .env.local`, err);
}
const configSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().default(8080),
  DATABASE_URL: z.string().url().optional(),
  DIRECT_URL: z.string().url().optional(),
  JWT_ACCESS_TOKEN_SECRET: z.string(),
  JWT_ACCESS_TOKEN_TTL: z.string(),
  JWT_REFRESH_TOKEN_SECRET: z.string(),
  JWT_REFRESH_TOKEN_TTL: z.string(),
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
