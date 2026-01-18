import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import isAdminMiddleware from "../middlewares/isAdmin.middleware";
import validate from "../middlewares/validate";
import {
  createProductSchema,
  updateProductSchema,
} from "../validations/product.validation";
import {
  getProducts,
  getProductById,
  adminGetProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller";

const router = Router();

// Public
router.get("/", getProducts);
router.get("/:id", getProductById);

// Admin
router.get(
  "/admin/all",
  authMiddleware,
  isAdminMiddleware,
  adminGetProducts
);

router.post(
  "/admin",
  authMiddleware,
  isAdminMiddleware,
  validate(createProductSchema),
  createProduct
);

router.put(
  "/admin/:id",
  authMiddleware,
  isAdminMiddleware,
  validate(updateProductSchema),
  updateProduct
);

router.delete(
  "/admin/:id",
  authMiddleware,
  isAdminMiddleware,
  deleteProduct
);

export default router;
