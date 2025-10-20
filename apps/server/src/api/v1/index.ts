import { Router } from "express";
import companyRoutes from "./companies.routes.js";

const router = Router();

router.use("/companies", companyRoutes);

export default router;
