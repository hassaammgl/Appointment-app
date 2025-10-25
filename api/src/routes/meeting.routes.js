import { Router } from "express";
import { isAuthenticated, authorize } from "../middlewares/auth.middlewares.js";
import { checkOrgPremium } from "../middlewares/checkPremium.middleware.js";
import { meeting } from "../controllers/meeting.controller.js";

const router = Router();

router.post("/met-req", () => {});
router.post("/renew/:id/org", () => {});
router.get(
	"/roles",
	isAuthenticated,
	checkOrgPremium,
	authorize("receptionist"),
	// meeting.getAllRoles
);
router.get("/get-all-reqs", () => {});
router.get("/get-reqs-by-roles/:id", () => {});
router.get("/get-organization", () => {});
router.put("/approve-req/:id", () => {});
router.put("/reject-req/:id", () => {});
router.put("/update-priority/:id", () => {});
router.delete("/cancel-req/:id", () => {});

export default router;
