import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"], // single entry — tests won't be bundled unless imported
  format: ["esm"], // emit ESM (keeps import.meta.url)
  outDir: "dist",
  platform: "node",
  target: "node18",
  sourcemap: true,
  clean: true,
  dts: true,
  bundle: true, // produce one optimized output file (optional)
  minify: false,
  esbuildOptions(options) {
    // Externalize Node builtins and keep runtime deps external to avoid dynamic-require issues
    options.external = [
      ...(options.external ?? []),
      "express", // externalize runtime libs — change/remove as needed
      "swagger-ui-express",
      "js-yaml",
      // externalize all "node:*" builtins
      ...[
        "node:fs",
        "node:path",
        "node:events",
        "node:stream",
        "node:util",
        "node:os",
      ],
    ];
  },
});
