import { Router } from "express";
import {
  changeFinalStatus,
  createProject,
  getAllProject,
  updateProject,
} from "../controllers/project.controller.js";

const router = Router();

router.post("/create", createProject);
router.get("/getallprojects", getAllProject);
router.put("/changeFinalStatus", changeFinalStatus);
router.put("/updateProject", updateProject);

export default router;
