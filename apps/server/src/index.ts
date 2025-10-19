import app from './app';
import config from './config';
import { logger } from './utils/logger';

const port = config.PORT;

app.listen(port, () => {
  logger.info(`Server listening at http://localhost:${port}`);
  logger.info(`API Docs available at http://localhost:${port}/docs`);
});
