"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notFound = (_req, res, _next) => {
    res.status(404).json({ message: "Route not found" });
};
exports.default = notFound;
