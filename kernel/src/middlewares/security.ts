import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors, { CorsOptions } from "cors";
import { Express } from "express";

export const applySecurity = (app: Express) => {
  // Helmet (security headers)
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: "cross-origin" },
    })
  );

  // CORS whitelist
  const allowedOrigins = (process.env.CORS_ORIGINS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
      // Postman/Thunder yok dedin ama tarayıcı dışı isteklerde origin olmaz -> izin ver
      if (!origin) return callback(null, true);

      if (allowedOrigins.length === 0) return callback(null, true);

      if (allowedOrigins.includes(origin)) return callback(null, true);

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  };

  app.use(cors(corsOptions));

  // General rate limit (tüm API)
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 dk
      max: 300, // IP başına
      standardHeaders: true,
      legacyHeaders: false,
    })
  );

  // Auth rate limit (login için daha sıkı)
  const authLimiter = rateLimit({
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
