import { Router } from "express";
import {
  getMeHandler,
  loginHandler,
  logoutHandler,
  refreshHandler,
} from "../../controllers/auth.controller.js";
import { requireAuth } from "../../middleware/requireAuth.js";
import { validate } from "../../middleware/validateResource.js";
import { loginSchema } from "../../validations/auth.schema.js";

const router: Router = Router();

router.post("/login", validate(loginSchema), loginHandler);
router.post("/refresh", requireAuth, refreshHandler);
router.get("/me", requireAuth, getMeHandler);
router.post("/logout", requireAuth, logoutHandler);
export default router;
