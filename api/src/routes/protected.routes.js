import { Router } from "express";
import { isAuthenticated, authorize } from "../middlewares/auth.middlewares.js";
import {MeetingController as meetingController } from "../controllers/mettings.controllers.js";
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
  meetingController.getAllRoles
);
router.post(
  "/met-req",
  isAuthenticated,
  checkOrgPremium,
  authorize("receptionist"),
  validateRequest(validateReqMeeting),
  meetingController.createMettingReq
);
router.get(
  "/get-all-reqs",
  isAuthenticated,
  checkOrgPremium,
  authorize("receptionist", "ceo", "cfo", "cto", "gm"),
  meetingController.getAllMeetingsReq
);
router.delete(
  "/cancel-req/:id",
  isAuthenticated,
  checkOrgPremium,
  authorize("receptionist"),
  validateRequest(validateCancelReq, true),
  meetingController.cancelMeetingReq
);
router.put(
  "/approve-req/:id",
  isAuthenticated,
  checkOrgPremium,
  authorize("ceo", "cfo", "cto", "gm"),
  validateRequest(validateApproveAndRej, true),
  meetingController.approveMeetingReq
);
router.put(
  "/reject-req/:id",
  isAuthenticated,
  checkOrgPremium,
  authorize("ceo", "cfo", "cto", "gm"),
  validateRequest(validateApproveAndRej, true),
  meetingController.rejectMeetingReq
);
router.put(
  "/update-priority/:id",
  isAuthenticated,
  checkOrgPremium,
  authorize("ceo", "cfo", "cto", "gm"),
  validateRequest(validateUpdatePriorityParams, true),
  validateRequest(validateUpdatePriorityBody),
  meetingController.updatePriorityOfReq
);
router.get(
  "/get-reqs-by-roles/:id",
  isAuthenticated,
  checkOrgPremium,
  authorize("ceo", "cfo", "cto", "gm"),
  validateRequest(validateGetReqsByRole, true),
  meetingController.getReqsByRolesWithPagination
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
