import { Router } from "express";
import UserRoutes from "./admin.routes.js";
import LeadsRoutes from "./leads.routes.js";
import ProjectRoutes from "./project.routes.js";

const router = Router();

router.use("/api/admin", UserRoutes);
router.use("/api/leads", LeadsRoutes);
router.use("/api/projects", ProjectRoutes);

export default router;
