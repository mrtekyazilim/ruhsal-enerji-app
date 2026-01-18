import { Router } from "express";
import { login, adminLogin } from "../controllers/auth.controller";
import validate from "../middlewares/validate";
import { loginSchema } from "../validations/auth.validation";

const router = Router();

router.post("/login", validate(loginSchema), login);
router.post("/admin/login", validate(loginSchema), adminLogin);

export default router;
