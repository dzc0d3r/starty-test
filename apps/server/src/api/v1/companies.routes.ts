import { Router } from "express";
import {
  createCompanyHandler,
  getAllCompaniesHandler,
} from "../../controllers/company.controller.js";
import { validate } from "../../middleware/validateResource.js";
import { createCompanySchema } from "../../validations/company.schema.js";

const router = Router();

router.get("/", getAllCompaniesHandler);
router.post("/", validate(createCompanySchema), createCompanyHandler);
export default router;
