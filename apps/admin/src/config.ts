import { z } from "zod";

const configSchema = z.object({
  VITE_API_BASE_URL: z.string().url(),
});

const parsedConfig = configSchema.safeParse(import.meta.env);

if (!parsedConfig.success) {
  throw new Error("Invalid admin environment variables. Check your .env file.");
}

export default parsedConfig.data;
