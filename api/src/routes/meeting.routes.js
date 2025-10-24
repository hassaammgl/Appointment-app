import { Router } from "express";

const router = Router();

router.post("/met-req", () => {});
router.post("/renew/:id/org", () => {});
router.get("/roles", () => {});
router.get("/get-all-reqs", () => {});
router.get("/get-reqs-by-roles/:id", () => {});
router.get("/get-organization", () => {});
router.put("/approve-req/:id", () => {});
router.put("/reject-req/:id", () => {});
router.put("/update-priority/:id", () => {});
router.delete("/cancel-req/:id", () => {});

export default router;
