import { Router } from "express";
import { isAuthenticated, authorize } from "../middlewares/auth.middlewares";
import { meetingController } from "../controllers/mettings.controllers";
// import { getOrganization, renewOrg } from '../controllers/auth.controller.js';
import { checkOrgPremium } from "../middlewares/checkPremium.middleware";
import {
	validateReqMeeting,
	validateCancelReq,
    validateApproveAndRej,
    validateUpdatePriority
} from "../validations/auth.validation";
import { validateRequest } from "../middlewares/validation.middleware";

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
    validateRequest(validateUpdatePriority, true),
	
);
// router.get("/get-reqs-by-roles/:id", isAuthenticated, checkOrgPremium, authorize("ceo", "cfo", "cto", "gm"), getReqsByRolesWithPagination)

// router.get("/get-organization", isAuthenticated, checkOrgPremium, authorize('receptionist', "ceo", "cfo", "cto", "gm"), getOrganization)
// router.post("/renew/:id/org", isAuthenticated, authorize("ceo"), renewOrg)

export default router;
