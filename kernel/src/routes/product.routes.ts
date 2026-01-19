import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import isAdminMiddleware from "../middlewares/isAdmin.middleware";
import validate from "../middlewares/validate";
import { upload } from "../middlewares/upload";
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

// Upload endpoint - bu parameterized route'tan ÖNCE olmalı
router.post(
  "/admin/upload",
  authMiddleware,
  isAdminMiddleware,
  upload.array("images", 5),
  (req, res) => {
    try {
      const files = req.files as any[];
      console.log("Upload files:", files);
      
      if (!files || files.length === 0) {
        return res.status(400).json({ error: "Dosya yüklenmedi" });
      }

      const urls = files.map((f) => {
        if (!f.buffer) {
          console.error("File buffer yok:", f);
          throw new Error("File buffer is missing");
        }
        const base64 = f.buffer.toString("base64");
        return `data:${f.mimetype};base64,${base64}`;
      });
      
      console.log("Upload URLs count:", urls.length);
      res.json({ urls });
    } catch (e: any) {
      console.error("Upload error:", e.message);
      res.status(500).json({ error: e.message || "Upload başarısız" });
    }
  }
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
