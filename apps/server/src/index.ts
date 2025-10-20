import app from "./app.js";
import config from "./config/index.js";
import { logger } from "./utils/logger.js";

const port = config.PORT;

app.listen(port, () => {
  logger.info(`Server listening at http://localhost:${port}`);
  logger.info(`API Docs available at http://localhost:${port}/docs`);
});
