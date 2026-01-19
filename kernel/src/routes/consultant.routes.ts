import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import isAdminMiddleware from "../middlewares/isAdmin.middleware";
import { upload } from "../middlewares/upload";
import {
  getConsultants,
  getConsultantById,
  adminGetConsultants,
  createConsultant,
  updateConsultant,
  deleteConsultant,
} from "../controllers/consultant.controller";

const router = Router();

// Public
router.get("/", getConsultants);
router.get("/:id", getConsultantById);

// Admin
router.get("/admin/all", authMiddleware, isAdminMiddleware, adminGetConsultants);
router.post("/", authMiddleware, isAdminMiddleware, upload.single("avatar"), createConsultant);
router.put("/:id", authMiddleware, isAdminMiddleware, upload.single("avatar"), updateConsultant);
router.delete("/:id", authMiddleware, isAdminMiddleware, deleteConsultant);

export default router;
