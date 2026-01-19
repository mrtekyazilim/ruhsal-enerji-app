"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applySecurity = void 0;
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const cors_1 = __importDefault(require("cors"));
const applySecurity = (app) => {
    // Helmet (security headers)
    app.use((0, helmet_1.default)({
        crossOriginResourcePolicy: { policy: "cross-origin" },
    }));
    // CORS whitelist
    const allowedOrigins = (process.env.CORS_ORIGINS || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    const corsOptions = {
        origin: (origin, callback) => {
            // Postman/Thunder yok dedin ama tarayıcı dışı isteklerde origin olmaz -> izin ver
            if (!origin)
                return callback(null, true);
            if (allowedOrigins.length === 0)
                return callback(null, true);
            if (allowedOrigins.includes(origin))
                return callback(null, true);
            return callback(new Error("Not allowed by CORS"));
        },
        credentials: true,
    };
    app.use((0, cors_1.default)(corsOptions));
    // General rate limit (tüm API)
    app.use((0, express_rate_limit_1.default)({
        windowMs: 15 * 60 * 1000, // 15 dk
        max: 300, // IP başına
        standardHeaders: true,
        legacyHeaders: false,
    }));
    // Auth rate limit (login için daha sıkı)
    const authLimiter = (0, express_rate_limit_1.default)({
        windowMs: 10 * 60 * 1000, // 10 dk
        max: 20,
        standardHeaders: true,
        legacyHeaders: false,
        message: { message: "Too many login attempts, try again later." },
    });
    // sadece login endpointlerine uygula
    app.use("/api/login", authLimiter);
    app.use("/api/admin/login", authLimiter);
};
exports.applySecurity = applySecurity;
