import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
  createSiteVisit,
  getAllSiteVisit,
  updateSiteViewImage,
  updateSiteVisit,
} from "../controllers/sitevisit.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.post("/createSiteVisit", createSiteVisit);
router.get("/getAllSiteVisit", getAllSiteVisit);
router.put("/updateSiteVisit", updateSiteVisit);
router.put(
  "/updateSiteViewImage",
  upload.single("image"),
  updateSiteViewImage
);

export default router;
