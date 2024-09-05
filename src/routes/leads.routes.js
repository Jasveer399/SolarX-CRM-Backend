import { Router } from "express";
import {changeCurrentSOL, changeFinalStatus, createLead, CreateLeadsFromExcel, getAllLeads, updateLead } from "../controllers/leads.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router()

router.post("/", createLead)
router.get("/getallLeads", getAllLeads)
router.put("/changeCurrentSOL", changeCurrentSOL)
router.put("/updateLead", updateLead)
router.put("/changeFinalStatus",changeFinalStatus)
router.post("/createLeadsFromExcel",CreateLeadsFromExcel)

export default router