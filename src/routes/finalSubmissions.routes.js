import { Router } from "express";
import {
  createFinalSubmission,
  deleteFinalSubmission,
  getAllFinalSubmissions,
  updateFinalSubmission,
} from "../controllers/finalSubmissions.controller.js";

const router = Router();

// Routes
router.post("/createFinalSubmission", createFinalSubmission);
router.put("/updateFinalSubmission/:id", updateFinalSubmission);
router.get("/getAllFinalSubmissions", getAllFinalSubmissions);
router.delete("/deleteFinalSubmission/:id", deleteFinalSubmission);

export { router as FinalSubmissionRoutes };
