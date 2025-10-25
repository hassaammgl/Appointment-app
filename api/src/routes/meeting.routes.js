import { Router } from "express";
import { isAuthenticated, authorize } from "../middlewares/auth.middlewares.js";
// import { checkOrgPremium } from "../middlewares/checkPremium.middleware.js";
import { meeting } from "../controllers/meeting.controller.js";
import { validateRequest } from "../middlewares/validation.middleware.js";
import { validateReqMeeting } from "../validations/auth.validation.js";

const router = Router();

router.post(
  "/met-req",
  isAuthenticated,
  // checkOrgPremium,
  authorize("receptionist"),
  validateRequest(validateReqMeeting),
  meeting.createMettingReq
);
router.post("/renew/:id/org", () => {});
router.get(
  "/roles",
  isAuthenticated,
  // checkOrgPremium,
  authorize("receptionist"),
  meeting.getAllRoles
);
router.get(
  "/get-all-reqs",
  isAuthenticated,
  //   checkOrgPremium
  authorize("receptionist", "ceo", "cfo", "cto", "gm"),
  meeting.getAllMeetingsReq
);
router.get("/get-reqs-by-roles/:id", () => {});
router.get("/get-organization", () => {});
router.put("/approve-req/:id", () => {});
router.put("/reject-req/:id", () => {});
router.put("/update-priority/:id", () => {});
router.delete("/cancel-req/:id", () => {});

export default router;
