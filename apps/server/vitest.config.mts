import { default as rootConfig } from "../../vitest.config.mts";
import { defineConfig } from 'vitest/config';

export default defineConfig({
  ...rootConfig,
  test: {
    setupFiles: ['dotenv/config']
  }
});

