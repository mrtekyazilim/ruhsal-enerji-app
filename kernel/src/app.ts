import express from "express";

import authRoutes from "./routes/auth.routes";
import categoryRoutes from "./routes/category.routes";
import productRoutes from "./routes/product.routes";
import consultantRoutes from "./routes/consultant.routes";

import authMiddleware from "./middlewares/auth.middleware";
import isAdminMiddleware from "./middlewares/isAdmin.middleware";
import notFound from "./middlewares/notFound";
import errorHandler from "./middlewares/errorHandler";
import { applySecurity } from "./middlewares/security";

const app = express();

// Security (helmet + cors + rate limit)
applySecurity(app);

app.use(express.json({ limit: "10mb" }));

// UTF-8 charset header
app.use((req, res, next) => {
  res.header("Content-Type", "application/json; charset=utf-8");
  next();
});

// ROUTES ✅
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/consultant", consultantRoutes);

// Health check
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

// Protected test routes
app.get("/api/me", authMiddleware, (_req, res) => {
  res.json({ message: "You are authenticated" });
});

app.get("/api/admin/check", authMiddleware, isAdminMiddleware, (_req, res) => {
  res.json({ message: "You are admin" });
});

// NOT FOUND & ERROR (always last)
app.use(notFound);
app.use(errorHandler);

export default app;
