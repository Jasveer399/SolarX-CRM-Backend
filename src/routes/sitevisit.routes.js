import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { createSiteVisit, getAllSiteVisit, updateSiteVisit } from "../controllers/sitevisit.controller.js";

const router = Router();

router.post("/createSiteVisit", createSiteVisit);
router.get("/getAllSiteVisit", getAllSiteVisit);
router.put("/updateSiteVisit", updateSiteVisit);

export default router;
