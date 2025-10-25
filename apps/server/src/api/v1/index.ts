import { Router } from "express";
import adminRoutes from "./admin.routes.js";
import authRoutes from "./auth.routes.js";
import companyRoutes from "./companies.routes.js";
import scpiRoutes from "./scpi.routes.js";

const router: Router = Router();

router.use("/companies", companyRoutes);
router.use("/auth", authRoutes);
router.use("/scpis", scpiRoutes);
router.use("/admin", adminRoutes);

export default router;
