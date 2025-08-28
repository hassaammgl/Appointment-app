import { Router } from "express";
import { validateRequest } from "../middlewares/validation.middleware";
import {
	validateRegister,
	validateLogin,
} from "../validations/auth.validation";
import { AuthController } from "../controllers/auth.controller";
import { isAuthenticated } from "../middlewares/auth.middlewares";

const router = Router();

router.post(
	"/register",
	validateRequest(validateRegister),
	AuthController.register
);
router.post("/login", validateRequest(validateLogin), AuthController.login);
router.post("/logout", isAuthenticated, AuthController.logout);

export default router;
