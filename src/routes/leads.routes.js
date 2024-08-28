import { Router } from "express";
import {changeCurrentSOLandFinalStatus, createLead, getAllLeads, updateLead } from "../controllers/leads.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router()

router.post("/", createLead)
router.get("/getallLeads", getAllLeads)
router.put("/changeCurrentSOL", changeCurrentSOLandFinalStatus)
router.put("/updateLead", updateLead)

export default router