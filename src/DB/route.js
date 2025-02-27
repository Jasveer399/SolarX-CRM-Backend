import { Router } from "express";
import UserRoutes from "./admin.routes.js";
import LeadsRoutes from "./leads.routes.js";
import ProjectRoutes from "./project.routes.js";
import QuotationRoutes from "./quatation.routes.js";
import PaymentRoutes from "./payment.routes.js";
import SiteVisitRoutes from "./sitevisit.routes.js";

const router = Router();

router.use("/api/admin", UserRoutes);
router.use("/api/leads", LeadsRoutes);
router.use("/api/projects", ProjectRoutes);
router.use("/api/quotations", QuotationRoutes);
router.use("/api/payments", PaymentRoutes);
router.use("/api/sitevisit", SiteVisitRoutes);

export default router;
