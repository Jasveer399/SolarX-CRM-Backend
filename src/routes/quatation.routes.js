import { Router } from "express";
import {
  createAdmin,
  loginAdmin,
  logoutAdmin,
  updateImage,
} from "../controllers/admin.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import {
  createQuotation,
  getAllQuotations,
  updateQuotation,
} from "../controllers/quotation.contriller.js";

const router = Router();

router.post("/createquotation", createQuotation);
router.get("/getAllQuotations", getAllQuotations);
router.put("/updateQuotation", updateQuotation);

export default router;
