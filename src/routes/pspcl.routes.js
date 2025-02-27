import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import { createPSPCL, getAllPSPCL, updatePspcl } from "../controllers/pspcl.controller.js";

const router = Router()

router.post("/createpspcl", createPSPCL)
router.get("/getallpspcl", getAllPSPCL)
router.put("/updatePspcl", updatePspcl)

export default router