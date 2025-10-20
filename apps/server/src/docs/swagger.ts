import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import yaml from "js-yaml";
import { JsonObject } from "swagger-ui-express";

// Recreate __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Construct the absolute path to the OpenAPI YAML file
const openApiPath = path.resolve(__dirname, "openapi.yaml");

// Read and parse the YAML file
const fileContents = fs.readFileSync(openApiPath, "utf8");
const swaggerSpec = yaml.load(fileContents) as JsonObject;

export default swaggerSpec;
