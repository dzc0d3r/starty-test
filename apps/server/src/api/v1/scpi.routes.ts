import { Router } from "express";
import {
  createScpiHandler,
  deleteScpiHandler,
  getAllScpisHandler,
  getScpiHandler,
  updateScpiHandler,
} from "../../controllers/scpi.controller.js";
import { requireAdmin } from "../../middleware/requireAdmin.js";
import { requireAuth } from "../../middleware/requireAuth.js";
import { validate } from "../../middleware/validateResource.js";
import {
  createScpiSchema,
  scpiParamsSchema,
  updateScpiSchema,
} from "../../validations/scpi.schema.js";

const router: Router = Router();
const requireAdminAccess = [requireAuth, requireAdmin];

// Public Routes
router.get("/", getAllScpisHandler);
router.get("/:id", validate(scpiParamsSchema), getScpiHandler);

// Protected Admin Routes
router.post(
  "/",
  [...requireAdminAccess, validate(createScpiSchema)],
  createScpiHandler,
);
router.put(
  "/:id",
  [...requireAdminAccess, validate(updateScpiSchema)],
  updateScpiHandler,
);
router.delete(
  "/:id",
  [...requireAdminAccess, validate(scpiParamsSchema)],
  deleteScpiHandler,
);

export default router;
