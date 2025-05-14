import { Router } from 'express';
import { isAuthenticated, authorize } from '../middlewares/auth.middleware.js';
import { createMettingReq, getAllRoles, getAllMeetingsReq, cancelMeetingReq, approveMeetingReq, rejectMeetingReq, updatePriorityOfReq } from "../controllers/mettings.controllers.js"

const router = Router();

router.get("/roles", isAuthenticated, authorize('receptionist'), getAllRoles)
router.post("/met-req", isAuthenticated, authorize('receptionist'), createMettingReq)
router.get("/get-all-reqs", isAuthenticated, authorize('receptionist', "ceo", "cfo", "cto", "gm"), getAllMeetingsReq)
router.delete("/cancel-req/:id", isAuthenticated, authorize('receptionist'), cancelMeetingReq)
router.put("/approve-req/:id", isAuthenticated, authorize("ceo", "cfo", "cto", "gm"), approveMeetingReq)
router.put("/reject-req/:id", isAuthenticated, authorize("ceo", "cfo", "cto", "gm"), rejectMeetingReq)
router.put("/update-priority/:id", isAuthenticated, authorize("ceo", "cfo", "cto", "gm"), updatePriorityOfReq)

export default router;
