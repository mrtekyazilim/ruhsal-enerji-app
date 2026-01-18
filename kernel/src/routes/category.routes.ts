import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import isAdminMiddleware from "../middlewares/isAdmin.middleware";
import validate from "../middlewares/validate";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../validations/category.validation";
import {
  getCategories,
  adminGetCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller";

const router = Router();

// Public
router.get("/", getCategories);

// Admin
router.get(
  "/admin/all",
  authMiddleware,
  isAdminMiddleware,
  adminGetCategories
);

router.post(
  "/admin",
  authMiddleware,
  isAdminMiddleware,
  validate(createCategorySchema),
  createCategory
);

router.put(
  "/admin/:id",
  authMiddleware,
  isAdminMiddleware,
  validate(updateCategorySchema),
  updateCategory
);

router.delete(
  "/admin/:id",
  authMiddleware,
  isAdminMiddleware,
  deleteCategory
);

export default router;
