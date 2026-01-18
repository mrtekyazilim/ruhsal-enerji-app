import { z } from "zod";

export const createProductSchema = z.object({
  title: z.string().min(2, "Title is required"),
  description: z.string().optional(),
  price: z.number().nonnegative("Price must be >= 0"),
  categoryId: z.string().min(1, "categoryId is required"),
  images: z.array(z.string()).optional(),
  isActive: z.boolean().optional(),
});

export const updateProductSchema = createProductSchema.partial();
