import { Router } from 'express';
import { isAuthenticated, authorize } from '../middlewares/auth.middleware.js';
import { createMettingReq, getAllRoles, getAllMeetingsReq } from "../controllers/mettings.controllers.js"

const router = Router();

router.get("/roles", isAuthenticated, authorize('receptionist'), getAllRoles)
router.post("/met-req", isAuthenticated, authorize('receptionist'), createMettingReq)
router.get("/get-all-reqs", isAuthenticated, authorize('receptionist', "ceo", "cfo", "cto", "gm"), getAllMeetingsReq)

export default router;
