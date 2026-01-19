"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductSchema = exports.createProductSchema = void 0;
const zod_1 = require("zod");
exports.createProductSchema = zod_1.z.object({
    title: zod_1.z.string().min(2, "Title is required"),
    description: zod_1.z.string().optional(),
    price: zod_1.z.number().nonnegative("Price must be >= 0"),
    currency: zod_1.z.enum(["TRY", "USD", "EUR"]).default("TRY"),
    stock: zod_1.z.number().int().nonnegative("Stock must be >= 0"),
    categoryId: zod_1.z.string().min(1, "categoryId is required"),
    images: zod_1.z.array(zod_1.z.string()).optional(),
    isActive: zod_1.z.boolean().optional(),
});
exports.updateProductSchema = exports.createProductSchema.partial();
