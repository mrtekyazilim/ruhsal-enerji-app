"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const isAdmin_middleware_1 = __importDefault(require("../middlewares/isAdmin.middleware"));
const validate_1 = __importDefault(require("../middlewares/validate"));
const category_validation_1 = require("../validations/category.validation");
const category_controller_1 = require("../controllers/category.controller");
const router = (0, express_1.Router)();
// Public
router.get("/", category_controller_1.getCategories);
// Admin
router.get("/admin/all", auth_middleware_1.default, isAdmin_middleware_1.default, category_controller_1.adminGetCategories);
router.post("/admin", auth_middleware_1.default, isAdmin_middleware_1.default, (0, validate_1.default)(category_validation_1.createCategorySchema), category_controller_1.createCategory);
router.put("/admin/:id", auth_middleware_1.default, isAdmin_middleware_1.default, (0, validate_1.default)(category_validation_1.updateCategorySchema), category_controller_1.updateCategory);
router.delete("/admin/:id", auth_middleware_1.default, isAdmin_middleware_1.default, category_controller_1.deleteCategory);
exports.default = router;
