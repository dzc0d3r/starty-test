import { Router } from "express";
import authRoutes from "./auth.routes.js";
import companyRoutes from "./companies.routes.js";
import scpiRoutes from "./scpi.routes.js";

const router: Router = Router();

router.use("/companies", companyRoutes);
router.use("/auth", authRoutes);
router.use("/scpis", scpiRoutes);

export default router;
