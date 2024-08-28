import { Router } from "express";
import {
  createProject,
  getAllProject,
} from "../controllers/project.controller.js";

const router = Router();

router.post("/create", createProject);
router.get("/getallprojects", getAllProject);

export default router;
