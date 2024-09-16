import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
  changePaymentStatus,
  createPayment,
  getAllPayments,
  updatePayment,
} from "../controllers/payment.controller.js";

const router = Router();

router.post("/createPayment", createPayment);
router.get("/getAllPayments", getAllPayments);
router.put("/updatePayment", updatePayment);
router.put("/changePaymentStatus", changePaymentStatus);

export default router;
