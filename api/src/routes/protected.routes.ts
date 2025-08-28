import { Router } from "express";
import { isAuthenticated,authorize } from "../middlewares/auth.middlewares";
import {
	meetingController,
} from "../controllers/mettings.controllers";
// import { checkOrgPremium } from '../middlewares/checkpremium.middleware';
// import { getOrganization, renewOrg } from '../controllers/auth.controller.js';
import { checkOrgPremium } from "../middlewares/checkPremium.middleware";

const router = Router();

router.get(
	"/roles",
	isAuthenticated,
	checkOrgPremium,
	authorize("receptionist"),
	meetingController.getAllRoles
);
// router.get("/roles", isAuthenticated, checkOrgPremium, authorize('receptionist'), getAllRoles)
// router.post("/met-req", isAuthenticated, checkOrgPremium, authorize('receptionist'), createMettingReq)
// router.get("/get-all-reqs", isAuthenticated, checkOrgPremium, authorize('receptionist', "ceo", "cfo", "cto", "gm"), getAllMeetingsReq)
// router.delete("/cancel-req/:id", isAuthenticated, checkOrgPremium, authorize('receptionist'), cancelMeetingReq)
// router.put("/approve-req/:id", isAuthenticated, checkOrgPremium, authorize("ceo", "cfo", "cto", "gm"), approveMeetingReq)
// router.put("/reject-req/:id", isAuthenticated, checkOrgPremium, authorize("ceo", "cfo", "cto", "gm"), rejectMeetingReq)
// router.put("/update-priority/:id", isAuthenticated, checkOrgPremium, authorize("ceo", "cfo", "cto", "gm"), updatePriorityOfReq)
// router.get("/get-reqs-by-roles/:id", isAuthenticated, checkOrgPremium, authorize("ceo", "cfo", "cto", "gm"), getReqsByRolesWithPagination)

// router.get("/get-organization", isAuthenticated, checkOrgPremium, authorize('receptionist', "ceo", "cfo", "cto", "gm"), getOrganization)
// router.post("/renew/:id/org", isAuthenticated, authorize("ceo"), renewOrg)

export default router;
