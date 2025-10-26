import { Router } from "express";
import { getMeHandler } from "../../controllers/auth.controller.js";
import { getAllCompaniesHandler } from "../../controllers/company.controller.js";
import { getAllScpisHandler } from "../../controllers/scpi.controller.js";
import { requireAdmin } from "../../middleware/requireAdmin.js";
import { requireAuth } from "../../middleware/requireAuth.js";

const router: Router = Router();

router.use(requireAuth, requireAdmin);

router.get("/me", getMeHandler);

router.get("/companies", getAllCompaniesHandler);

router.get("/scpis", getAllScpisHandler);

export default router;
