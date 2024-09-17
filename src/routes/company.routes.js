import { Router } from "express";
import { createCompany, getAllCompanies } from "../controllers/company.controller.js";

const router = Router();

router.post("/createCompany", createCompany);
router.get("/getAllCompanies", getAllCompanies);

export default router;
