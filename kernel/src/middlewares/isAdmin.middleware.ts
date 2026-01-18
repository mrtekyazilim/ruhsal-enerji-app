import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";

const isAdminMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "Forbidden: Admin only" });
  }

  next();
};

export default isAdminMiddleware;
