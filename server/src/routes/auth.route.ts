import { Router } from "express";
import { validate } from "../middlewares/validate.middleware.ts";
import { registerSchema } from "../validators/auth.validator.ts";
import { register } from "../controllers/auth.controller.ts";

const router = Router();

router.post("/register", validate(registerSchema), register);

export default router;
