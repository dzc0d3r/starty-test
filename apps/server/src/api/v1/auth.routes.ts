import { Router } from "express";
import { loginHandler } from "../../controllers/auth.controller.js";
import { validate } from "../../middleware/validateResource.js";
import { loginSchema } from "../../validations/auth.schema.js";

const router: Router = Router();

router.post("/login", validate(loginSchema), loginHandler);

export default router;
