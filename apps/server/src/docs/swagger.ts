import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import yaml from "js-yaml";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const openApiPath = path.resolve(__dirname, "openapi.yaml");

const fileContents = fs.readFileSync(openApiPath, "utf8");
const swaggerSpec = yaml.load(fileContents);

export default swaggerSpec;
