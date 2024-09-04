import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { createSiteVisit, getAllSiteVisit } from "../controllers/sitevisit.controller.js";

const router = Router();

router.post("/createSiteVisit", createSiteVisit);
router.get("/getAllSiteVisit", getAllSiteVisit);
// router.put("/updatePayment", updatePayment);

export default router;
