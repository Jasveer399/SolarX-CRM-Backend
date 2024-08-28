import { Router } from "express";
import {changeCurrentSOLandFinalStatus, createLead, getAllLeads, updateLead } from "../controllers/leads.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router()

router.post("/", createLead)
router.get("/getallLeads",verifyJWT(), getAllLeads)
router.put("/changeCurrentSOL",verifyJWT(), changeCurrentSOLandFinalStatus)
router.put("/updateLead",verifyJWT(), updateLead)

export default router