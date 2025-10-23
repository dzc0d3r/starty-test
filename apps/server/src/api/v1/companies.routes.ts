import { Router } from "express";
import {
  companyParamsSchema,
  createCompanySchema,
  updateCompanySchema,
} from "schemas";
import {
  createCompanyHandler,
  deleteCompanyHandler,
  getAllCompaniesHandler,
  getCompanyHandler,
  updateCompanyHandler,
} from "../../controllers/company.controller.js";
import { requireAdmin } from "../../middleware/requireAdmin.js";
import { requireAuth } from "../../middleware/requireAuth.js";
import { validate } from "../../middleware/validateResource.js";

const router: Router = Router();
const requireAdminAccess = [requireAuth, requireAdmin];

// --- Public Routes ---
router.get("/", getAllCompaniesHandler);

router.get("/:id", validate(companyParamsSchema), getCompanyHandler);

// --- Protected Admin Routes ---
router.post(
  "/",
  [...requireAdminAccess, validate(createCompanySchema)],
  createCompanyHandler,
);

router.put(
  "/:id",
  [...requireAdminAccess, validate(updateCompanySchema)],
  updateCompanyHandler,
);

router.delete(
  "/:id",
  [...requireAdminAccess, validate(companyParamsSchema)],
  deleteCompanyHandler,
);

export default router;
