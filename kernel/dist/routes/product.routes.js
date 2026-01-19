"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const isAdmin_middleware_1 = __importDefault(require("../middlewares/isAdmin.middleware"));
const validate_1 = __importDefault(require("../middlewares/validate"));
const upload_1 = require("../middlewares/upload");
const product_validation_1 = require("../validations/product.validation");
const product_controller_1 = require("../controllers/product.controller");
const router = (0, express_1.Router)();
// Public
router.get("/", product_controller_1.getProducts);
router.get("/:id", product_controller_1.getProductById);
// Admin
router.get("/admin/all", auth_middleware_1.default, isAdmin_middleware_1.default, product_controller_1.adminGetProducts);
router.post("/admin", auth_middleware_1.default, isAdmin_middleware_1.default, (0, validate_1.default)(product_validation_1.createProductSchema), product_controller_1.createProduct);
// Upload endpoint - bu parameterized route'tan ÖNCE olmalı
router.post("/admin/upload", auth_middleware_1.default, isAdmin_middleware_1.default, upload_1.upload.array("images", 5), (req, res) => {
    try {
        const files = req.files;
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
    }
    catch (e) {
        console.error("Upload error:", e.message);
        res.status(500).json({ error: e.message || "Upload başarısız" });
    }
});
router.put("/admin/:id", auth_middleware_1.default, isAdmin_middleware_1.default, (0, validate_1.default)(product_validation_1.updateProductSchema), product_controller_1.updateProduct);
router.delete("/admin/:id", auth_middleware_1.default, isAdmin_middleware_1.default, product_controller_1.deleteProduct);
exports.default = router;
