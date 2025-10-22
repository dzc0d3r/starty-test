import { Router } from "express";
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
import {
  companyParamsSchema,
  createCompanySchema,
  updateCompanySchema,
} from "../../validations/company.schema.js";

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
