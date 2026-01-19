"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const validate_1 = __importDefault(require("../middlewares/validate"));
const auth_validation_1 = require("../validations/auth.validation");
const router = (0, express_1.Router)();
router.post("/login", (0, validate_1.default)(auth_validation_1.loginSchema), auth_controller_1.login);
router.post("/admin/login", (0, validate_1.default)(auth_validation_1.loginSchema), auth_controller_1.adminLogin);
exports.default = router;
