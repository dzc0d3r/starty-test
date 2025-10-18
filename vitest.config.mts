import { existsSync, readdirSync } from "fs";
import { defineConfig } from "vitest/config";

const pkgRoot = (pkg: string) =>
  new URL(`./packages/${pkg}`, import.meta.url).pathname;
const appRoot = (app: string) =>
  new URL(`./apps/${app}`, import.meta.url).pathname;

const alias = (pkg: string) => `${pkgRoot(pkg)}`;
const appAlias = (app: string) => `${appRoot(app)}`;

const getAliases = (root: string, prefix: string) =>
  readdirSync(root)
    .filter((dir) => existsSync(`${root}/${dir}/package.json`))
    .filter((dir) => dir !== "starty")
    .reduce<Record<string, string>>((acc, item) => {
      acc[`${prefix}/${item}`] =
        prefix === "@starty" ? appAlias(item) : alias(item);
      return acc;
    }, {});

const packageAliases = getAliases(
  new URL("./packages", import.meta.url).pathname,
  "@workspace",
);
const appAliases = getAliases(
  new URL("./apps", import.meta.url).pathname,
  "@worskpace",
);

export default defineConfig({
  test: {
    mockReset: true,
    coverage: {
      //provider: "v8",
      include: ["**/components/**"],
      exclude: ["**/docs/**"],
    },
  },
  esbuild: { target: "es2020" },
  resolve: { alias: { ...packageAliases, ...appAliases } },
});
