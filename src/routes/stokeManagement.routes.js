import { Router } from "express";
import {
  addProduct,
  createStockManagement,
  getAllStockManagement,
} from "../controllers/stokeManagement.controller.js";

const router = Router();

router.post("/createStockManagement", createStockManagement);
router.get("/getAllStockManagement", getAllStockManagement);
router.post("/addproduct", addProduct);

export default router;
