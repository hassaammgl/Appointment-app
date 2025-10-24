import { Router } from "express";
import { validateRequest } from "../middlewares/validation.middleware.js";
import {
	validateRegister,
	validateLogin,
} from "../validations/auth.validation.js";
import { isAuthenticated } from "../middlewares/auth.middlewares.js";
import { auth } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", validateRequest(validateRegister), auth.register);
router.post("/login", validateRequest(validateLogin), auth.login);
router.post("/logout", isAuthenticated, auth.logout);

export default router;
