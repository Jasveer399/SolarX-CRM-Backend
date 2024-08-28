import { Router } from "express";
import UserRoutes from "./admin.routes.js"
import LeadsRoutes from "./leads.routes.js"

const router = Router()

router.use("/api/admin", UserRoutes)
router.use("/api/leads", LeadsRoutes)

export default router