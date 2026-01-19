"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isAdminMiddleware = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    if (!req.user.isAdmin) {
        return res.status(403).json({ message: "Forbidden: Admin only" });
    }
    next();
};
exports.default = isAdminMiddleware;
