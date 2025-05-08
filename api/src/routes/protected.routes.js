import { Router } from 'express';
import { isAuthenticated, authorize } from '../middlewares/auth.middleware.js';
import { createMettingReq } from "../controllers/mettings.controllers.js"

const router = Router();

// router.get('/dashboard', isAuthenticated, (req, res) => {
//     res.json({ message: `Hello ${req.session.user.role}` });
// });

// router.get('/admin', isAuthenticated, authorize('ceo', 'cto', 'cfo'), (req, res) => {
//     res.json({ message: 'Admin zone 👑' });
// });

// router.get('/reception', isAuthenticated, authorize('receptionist'), (req, res) => {
//     res.json({ message: 'Reception area ☎️' });
// });

router.post("/met-req", isAuthenticated, authorize('receptionist'), createMettingReq)

export default router;
