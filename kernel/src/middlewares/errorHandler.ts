import { Request, Response, NextFunction } from "express";

const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  // 🔁 Mongoose duplicate key (unique) error
  if (err?.code === 11000) {
    return res.status(409).json({
      message: "Duplicate value",
      details: err.keyValue,
    });
  }

  // 🚫 CORS blocked
  if (err?.message === "Not allowed by CORS") {
    return res.status(403).json({
      message: "CORS blocked",
    });
  }

  // ❌ Genel hata
  res.status(statusCode).json({
    message: err?.message || "Server error",
    // dev ortamında stack göster
    stack: process.env.NODE_ENV === "production" ? undefined : err?.stack,
  });
};

export default errorHandler;
