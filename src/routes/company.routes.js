import { Router } from "express";
import {
  createCompany,
  deleteCompany,
  editCompany,
  getAllCompanies,
} from "../controllers/company.controller.js";

const router = Router();

router.post("/createCompany", createCompany);
router.get("/getAllCompanies", getAllCompanies);
router.delete("/deleteCompany/:id", deleteCompany);
router.put("/editCompany/:id", editCompany);

export default router;
