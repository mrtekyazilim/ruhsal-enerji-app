"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const category_routes_1 = __importDefault(require("./routes/category.routes"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const auth_middleware_1 = __importDefault(require("./middlewares/auth.middleware"));
const isAdmin_middleware_1 = __importDefault(require("./middlewares/isAdmin.middleware"));
const notFound_1 = __importDefault(require("./middlewares/notFound"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const security_1 = require("./middlewares/security");
const app = (0, express_1.default)();
// Security (helmet + cors + rate limit)
(0, security_1.applySecurity)(app);
app.use(express_1.default.json({ limit: "10mb" }));
// UTF-8 charset header
app.use((req, res, next) => {
    res.header("Content-Type", "application/json; charset=utf-8");
    next();
});
// ROUTES ✅
app.use("/api/auth", auth_routes_1.default);
app.use("/api/categories", category_routes_1.default);
app.use("/api/products", product_routes_1.default);
// Health check
app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
});
// Protected test routes
app.get("/api/me", auth_middleware_1.default, (_req, res) => {
    res.json({ message: "You are authenticated" });
});
app.get("/api/admin/check", auth_middleware_1.default, isAdmin_middleware_1.default, (_req, res) => {
    res.json({ message: "You are admin" });
});
// NOT FOUND & ERROR (always last)
app.use(notFound_1.default);
app.use(errorHandler_1.default);
exports.default = app;
