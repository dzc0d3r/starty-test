import cors from "cors";
import express, { Request, Response } from "express";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import api from "./api";
import swaggerSpec from "./docs/swagger";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
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
