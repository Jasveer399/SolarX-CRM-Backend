import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import {
  createQuotation,
  deleteQuotation,
  getAllQuotations,
  updateQuotation,
  upLoadSiteViewImage,
} from "../controllers/quotation.contriller.js";

const router = Router();

router.post("/createquotation", createQuotation);
router.get("/getAllQuotations", getAllQuotations);
router.put("/updateQuotation", updateQuotation);
router.delete("/deleteQuotation/:quotationId", deleteQuotation);
router.put("/upLoadSiteViewImage", upload.single("images"), upLoadSiteViewImage);

export default router;
