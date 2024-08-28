import { Router } from "express";
import { createAdmin, loginAdmin, logoutAdmin, updateImage } from "../controllers/admin.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router()

router.post("/", createAdmin)
router.post("/login", loginAdmin)
router.post("/logout", verifyJWT(), logoutAdmin)
router.put("/updateImage",upload.single('imageUrl'), verifyJWT(), updateImage)

export default router