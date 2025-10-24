import { Router } from "express";
import { isAuthenticated, authorize } from "../middlewares/auth.middlewares.js";
import { MeetingController } from "../controllers/meetings.controllers.js";
import { authController } from "../controllers/auth.controller.js";
import { checkOrgPremium } from "../middlewares/checkPremium.middleware.js";
import {
  validateReqMeeting,
  validateCancelReq,
  validateApproveAndRej,
  validateUpdatePriorityBody,
  validateUpdatePriorityParams,
  validateGetReqsByRole,
} from "../validations/auth.validation.js";
import { validateRequest } from "../middlewares/validation.middleware.js";

const router = Router();

router.get(
  "/roles",
  isAuthenticated,
  checkOrgPremium,
  authorize("receptionist"),
  MeetingController.getAllRoles
);
router.post(
  "/met-req",
  isAuthenticated,
  checkOrgPremium,
  authorize("receptionist"),
  validateRequest(validateReqMeeting),
  MeetingController.createMettingReq
);
router.get(
  "/get-all-reqs",
  isAuthenticated,
  checkOrgPremium,
  authorize("receptionist", "ceo", "cfo", "cto", "gm"),
  MeetingController.getAllMeetingsReq
);
router.delete(
  "/cancel-req/:id",
  isAuthenticated,
  checkOrgPremium,
  authorize("receptionist"),
  validateRequest(validateCancelReq, true),
  MeetingController.cancelMeetingReq
);
router.put(
  "/approve-req/:id",
  isAuthenticated,
  checkOrgPremium,
  authorize("ceo", "cfo", "cto", "gm"),
  validateRequest(validateApproveAndRej, true),
  MeetingController.approveMeetingReq
);
router.put(
  "/reject-req/:id",
  isAuthenticated,
  checkOrgPremium,
  authorize("ceo", "cfo", "cto", "gm"),
  validateRequest(validateApproveAndRej, true),
  MeetingController.rejectMeetingReq
);
router.put(
  "/update-priority/:id",
  isAuthenticated,
  checkOrgPremium,
  authorize("ceo", "cfo", "cto", "gm"),
  validateRequest(validateUpdatePriorityParams, true),
  validateRequest(validateUpdatePriorityBody),
  MeetingController.updatePriorityOfReq
);
router.get(
  "/get-reqs-by-roles/:id",
  isAuthenticated,
  checkOrgPremium,
  authorize("ceo", "cfo", "cto", "gm"),
  validateRequest(validateGetReqsByRole, true),
  MeetingController.getReqsByRolesWithPagination
);

router.get(
  "/get-organization",
  isAuthenticated,
  checkOrgPremium,
  authorize("receptionist", "ceo", "cfo", "cto", "gm"),
  authController.getOrganization
);
router.post("/renew/:id/org", isAuthenticated, authController.renewOrg);

export default router;
