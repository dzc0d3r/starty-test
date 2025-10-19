import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import api from './api'; 
import { errorHandler } from './middleware/errorHandler'; 
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './docs/swagger';


const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
// swagger-ui 
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'server' });
});
app.use('/api', api);
app.use(errorHandler);

export default app;
