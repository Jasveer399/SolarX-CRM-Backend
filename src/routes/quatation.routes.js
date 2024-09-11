import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import {
  createQuotation,
  getAllQuotations,
  updateQuotation,
  upLoadSiteViewImage,
} from "../controllers/quotation.contriller.js";

const router = Router();

router.post("/createquotation", createQuotation);
router.get("/getAllQuotations", getAllQuotations);
router.put("/updateQuotation", updateQuotation);
router.put("/upLoadSiteViewImage", upload.single("images"), upLoadSiteViewImage);

export default router;
