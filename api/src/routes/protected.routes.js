import { Router } from 'express';
import { isAuthenticated, authorize } from '../middlewares/auth.middleware.js';
import {
    createMettingReq,
    getAllRoles,
    getAllMeetingsReq,
    cancelMeetingReq,
    approveMeetingReq,
    rejectMeetingReq,
    updatePriorityOfReq,
    getReqsByRolesWithPagination
} from "../controllers/mettings.controllers.js"
import { checkOrgPremium } from '../middlewares/checkpremium.middleware.js';
import { getOrganization, renewOrg } from '../controllers/auth.controller.js';

const router = Router();

router.get("/roles", isAuthenticated, checkOrgPremium, authorize('receptionist'), getAllRoles)
router.post("/met-req", isAuthenticated, checkOrgPremium, authorize('receptionist'), createMettingReq)
router.get("/get-all-reqs", isAuthenticated, checkOrgPremium, authorize('receptionist', "ceo", "cfo", "cto", "gm"), getAllMeetingsReq)
router.delete("/cancel-req/:id", isAuthenticated, checkOrgPremium, authorize('receptionist'), cancelMeetingReq)
router.put("/approve-req/:id", isAuthenticated, checkOrgPremium, authorize("ceo", "cfo", "cto", "gm"), approveMeetingReq)
router.put("/reject-req/:id", isAuthenticated, checkOrgPremium, authorize("ceo", "cfo", "cto", "gm"), rejectMeetingReq)
router.put("/update-priority/:id", isAuthenticated, checkOrgPremium, authorize("ceo", "cfo", "cto", "gm"), updatePriorityOfReq)
router.get("/get-reqs-by-roles/:id", isAuthenticated, checkOrgPremium, authorize("ceo", "cfo", "cto", "gm"), getReqsByRolesWithPagination)

router.get("/get-organization", isAuthenticated, checkOrgPremium, authorize('receptionist', "ceo", "cfo", "cto", "gm"), getOrganization)
router.post("/renew/:id/org", isAuthenticated, authorize("ceo"), renewOrg)

export default router;
