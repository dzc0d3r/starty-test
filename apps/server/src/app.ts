import cookieParser from "cookie-parser";
import cors, { CorsOptions } from "cors";
import express, { Express, Request, Response } from "express";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import api from "./api/index.js";
import swaggerSpec from "./docs/swagger.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app: Express = express();

// just bcoz of no time for twae this for deployment
const corsOptions: CorsOptions = {
  origin: true, // <-- echo request Origin, allowing all origins
  credentials: true,
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
// swagger-ui
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      docExpansion: "none",
      filter: true,
      displayRequestDuration: true,
    },
    customSiteTitle: "Starty API Docs",
  }),
);
app.get("/api/health", (req: Request, res: Response) => {
  res.json({ status: "ok", service: "server" });
});
app.use("/api", api);
app.use(errorHandler);

export default app;
