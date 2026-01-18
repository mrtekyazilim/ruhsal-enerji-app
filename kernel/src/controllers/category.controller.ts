import { Request, Response } from "express";
import Category from "../models/Category";
import slugify from "../utils/slugify";
import asyncHandler from "../utils/asyncHandler";

export const getCategories = asyncHandler(async (_req: Request, res: Response) => {
  const categories = await Category.find({ isActive: true }).sort({ createdAt: -1 });
  res.json(categories);
});

// Admin: list all (active+inactive)
export const adminGetCategories = asyncHandler(async (_req: Request, res: Response) => {
  const categories = await Category.find().sort({ createdAt: -1 });
  res.json(categories);
});

export const createCategory = asyncHandler(async (req: Request, res: Response) => {
  const { name, description, isActive } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Category name is required");
  }

  const slug = slugify(name);

  // unique check
  const exists = await Category.findOne({ $or: [{ name }, { slug }] });
  if (exists) {
    res.status(409);
    throw new Error("Category already exists");
  }

  const category = await Category.create({
    name,
    slug,
    description: description || "",
    isActive: typeof isActive === "boolean" ? isActive : true,
  });

  res.status(201).json(category);
});

export const updateCategory = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, isActive } = req.body;

  const category = await Category.findById(id);
  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

  if (name && name !== category.name) {
    const newSlug = slugify(name);
    const exists = await Category.findOne({ $or: [{ name }, { slug: newSlug }] });
    if (exists) {
      res.status(409);
      throw new Error("Category name/slug already exists");
    }

    category.name = name;
    category.slug = newSlug;
  }

  if (typeof description === "string") category.description = description;
  if (typeof isActive === "boolean") category.isActive = isActive;

  await category.save();
  res.json(category);
});

export const deleteCategory = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const category = await Category.findByIdAndDelete(id);
  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

  res.json({ message: "Category deleted" });
});
