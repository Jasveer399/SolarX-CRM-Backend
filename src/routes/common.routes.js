import { Router } from "express";
import { createConsumerAndPayment } from "../controllers/common.controller.js";

const router = Router();

router.post("/createConsumerAndPayment", createConsumerAndPayment);

export { router as CommonRoutes };
