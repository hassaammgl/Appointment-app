import { Router } from "express";
import { isAuthenticated, authorize } from "../middlewares/auth.middlewares.js";
// import { checkOrgPremium } from "../middlewares/checkPremium.middleware.js";
import { meeting } from "../controllers/meeting.controller.js";
import { validateRequest } from "../middlewares/validation.middleware.js";
import {
  validateReqMeeting,
  validateGetReqsByRole,
  validateApproveAndRej,
  validateUpdatePriorityBody,
  validateUpdatePriorityParams,
  validateCancelReq,
} from "../validations/auth.validation.js";
import { auth } from "../controllers/auth.controller.js";

const router = Router();

router.post(
  "/met-req",
  isAuthenticated,
  // checkOrgPremium,
  authorize("receptionist"),
  validateRequest(validateReqMeeting),
  meeting.createMettingReq
);

router.post("/renew/:id/org", isAuthenticated, auth.renewOrganization);

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

router.get(
  "/get-organization",
  isAuthenticated,
  //   checkOrgPremium
  authorize("receptionist", "ceo", "cfo", "cto", "gm"),
  auth.getOrganization
);

router.get(
  "/get-reqs-by-roles/:id",
  isAuthenticated,
  // checkOrgPremium,
  authorize("ceo", "cfo", "cto", "gm"),
  validateRequest(validateGetReqsByRole, true),
  meeting.getReqsByRoles
);

router.put(
  "/approve-req/:id",
  isAuthenticated,
  // checkOrgPremium,
  authorize("ceo", "cfo", "cto", "gm"),
  validateRequest(validateApproveAndRej, true),
  meeting.approveMeetingReq
);

router.put(
  "/reject-req/:id",
  isAuthenticated,
  // checkOrgPremium,
  authorize("ceo", "cfo", "cto", "gm"),
  validateRequest(validateApproveAndRej, true),
  meeting.rejectMeetingReq
);

router.put(
  "/update-priority/:id",
  isAuthenticated,
  // checkOrgPremium,
  authorize("ceo", "cfo", "cto", "gm"),
  validateRequest(validateUpdatePriorityParams, true),
  validateRequest(validateUpdatePriorityBody),
  meeting.updatePriorityOfReq
);

router.delete(
  "/cancel-req/:id",
  isAuthenticated,
  // checkOrgPremium,
  authorize("receptionist"),
  validateRequest(validateCancelReq, true),
  meeting.cancelMeetingReq
);

export default router;
