import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import {
  backToLead,
  createQuotation,
  deleteQuotation,
  getAllQuotations,
  updateQuotation,
  upLoadSiteViewImage,
} from "../controllers/quotation.controller.js";

const router = Router();

router.post("/createquotation", createQuotation);
router.get("/getAllQuotations", getAllQuotations);
router.put("/updateQuotation", updateQuotation);
router.delete("/deleteQuotation/:quotationId", deleteQuotation);
router.put(
  "/upLoadSiteViewImage",
  upload.single("images"),
  upLoadSiteViewImage
);
router.post("/backToLead", backToLead);

export default router;
