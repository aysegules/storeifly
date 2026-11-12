import { Router } from "express";
import { validate } from "../middlewares/validate.middleware.ts";
import { loginSchema, registerSchema } from "../validators/auth.validator.ts";
import { login, logout, register } from "../controllers/auth.controller.ts";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/logout", logout);

export default router;
