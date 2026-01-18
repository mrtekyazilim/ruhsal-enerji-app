import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, "username gerekli"),
  password: z.string().min(1, "password gerekli"),
});
