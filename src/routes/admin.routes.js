import { Router } from "express";
import { createAdmin, loginAdmin, logoutAdmin, updateImage } from "../controllers/admin.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router()

router.post("/", createAdmin)
router.post("/login", loginAdmin)
router.post("/logout", logoutAdmin)
router.put("/updateImage",upload.single('imageUrl'), updateImage)

export default router