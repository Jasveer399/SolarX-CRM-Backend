import { Router } from "express";
import { createConsumer, getAllConsumer } from "../controllers/consumer.controller.js";
// import { verifyJWT } from "../middleware/auth.middleware.js";
// import {
//   createSiteVisit,
//   getAllSiteVisit,
//   updateSiteViewImage,
//   updateSiteVisit,
// } from "../controllers/sitevisit.controller.js";
// import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.post("/createConsumer", createConsumer);
router.get("/getAllConsumer", getAllConsumer);
// router.put("/updateSiteVisit", updateSiteVisit);
// router.put(
//   "/updateSiteViewImage",
//   upload.single("image"),
//   updateSiteViewImage
// );

export default router;
