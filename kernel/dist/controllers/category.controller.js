"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.adminGetCategories = exports.getCategories = void 0;
const Category_1 = __importDefault(require("../models/Category"));
const slugify_1 = __importDefault(require("../utils/slugify"));
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
exports.getCategories = (0, asyncHandler_1.default)(async (_req, res) => {
    const categories = await Category_1.default.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(categories);
});
// Admin: list all (active+inactive)
exports.adminGetCategories = (0, asyncHandler_1.default)(async (_req, res) => {
    const categories = await Category_1.default.find().sort({ createdAt: -1 });
    res.json(categories);
});
exports.createCategory = (0, asyncHandler_1.default)(async (req, res) => {
    const { name, description, isActive } = req.body;
    if (!name) {
        res.status(400);
        throw new Error("Category name is required");
    }
    const slug = (0, slugify_1.default)(name);
    // unique check
    const exists = await Category_1.default.findOne({ $or: [{ name }, { slug }] });
    if (exists) {
        res.status(409);
        throw new Error("Category already exists");
    }
    const category = await Category_1.default.create({
        name,
        slug,
        description: description || "",
        isActive: typeof isActive === "boolean" ? isActive : true,
    });
    res.status(201).json(category);
});
exports.updateCategory = (0, asyncHandler_1.default)(async (req, res) => {
    const { id } = req.params;
    const { name, description, isActive } = req.body;
    const category = await Category_1.default.findById(id);
    if (!category) {
        res.status(404);
        throw new Error("Category not found");
    }
    if (name && name !== category.name) {
        const newSlug = (0, slugify_1.default)(name);
        const exists = await Category_1.default.findOne({ $or: [{ name }, { slug: newSlug }] });
        if (exists) {
            res.status(409);
            throw new Error("Category name/slug already exists");
        }
        category.name = name;
        category.slug = newSlug;
    }
    if (typeof description === "string")
        category.description = description;
    if (typeof isActive === "boolean")
        category.isActive = isActive;
    await category.save();
    res.json(category);
});
exports.deleteCategory = (0, asyncHandler_1.default)(async (req, res) => {
    const { id } = req.params;
    const category = await Category_1.default.findByIdAndDelete(id);
    if (!category) {
        res.status(404);
        throw new Error("Category not found");
    }
    res.json({ message: "Category deleted" });
});
