import { Router } from "express";
import {
  createCompanyHandler,
  getAllCompaniesHandler,
} from "../../controllers/company.controller.js";
import { requireAdmin } from "../../middleware/requireAdmin.js";
import { requireAuth } from "../../middleware/requireAuth.js";
import { validate } from "../../middleware/validateResource.js";
import { createCompanySchema } from "../../validations/company.schema.js";

const router: Router = Router();

router.get("/", getAllCompaniesHandler);
router.post(
  "/",
  [requireAuth, requireAdmin, validate(createCompanySchema)],
  createCompanyHandler,
);
export default router;
