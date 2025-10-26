import { defineConfig } from "vitest/config";
import { default as rootConfig } from "../../vitest.config.mts";

export default defineConfig({
  ...rootConfig,
  test: {
    setupFiles: ["dotenv/config"],
  },
});
