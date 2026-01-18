import { Request, Response } from "express";
import Product from "../models/Product";
import Category from "../models/Category";
import slugify from "../utils/slugify";
import asyncHandler from "../utils/asyncHandler";

// Public: list (filters: categoryId, q)
export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const { categoryId, q } = req.query as { categoryId?: string; q?: string };

  const filter: any = { isActive: true };
  if (categoryId) filter.categoryId = categoryId;

  let query = Product.find(filter).populate("categoryId", "name slug");

  if (q && q.trim()) {
    query = Product.find({ ...filter, $text: { $search: q.trim() } }).populate(
      "categoryId",
      "name slug"
    );
  }

  const products = await query.sort({ createdAt: -1 });
  res.json(products);
});

// Public: detail by id
export const getProductById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const product = await Product.findById(id).populate("categoryId", "name slug");
  if (!product || !product.isActive) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.json(product);
});

// Admin: list all
export const adminGetProducts = asyncHandler(async (_req: Request, res: Response) => {
  const products = await Product.find().populate("categoryId", "name slug").sort({ createdAt: -1 });
  res.json(products);
});

// Admin: create
export const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const { title, description, price, categoryId, images, isActive } = req.body;

  if (!title || price === undefined || !categoryId) {
    res.status(400);
    throw new Error("title, price, categoryId required");
  }

  const category = await Category.findById(categoryId);
  if (!category) {
    res.status(400);
    throw new Error("Invalid categoryId");
  }

  const slug = slugify(title);

  const exists = await Product.findOne({ slug });
  if (exists) {
    res.status(409);
    throw new Error("Product already exists");
  }

  const product = await Product.create({
    title,
    slug,
    description: description || "",
    price: Number(price),
    categoryId,
    images: Array.isArray(images) ? images : [],
    isActive: typeof isActive === "boolean" ? isActive : true,
  });

  res.status(201).json(product);
});

// Admin: update
export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, price, categoryId, images, isActive } = req.body;

  const product = await Product.findById(id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  if (title && title !== product.title) {
    const newSlug = slugify(title);
    const exists = await Product.findOne({ slug: newSlug });
    if (exists) {
      res.status(409);
      throw new Error("Product slug already exists");
    }

    product.title = title;
    product.slug = newSlug;
  }

  if (typeof description === "string") product.description = description;
  if (price !== undefined) product.price = Number(price);

  if (categoryId) {
    const category = await Category.findById(categoryId);
    if (!category) {
      res.status(400);
      throw new Error("Invalid categoryId");
    }
    product.categoryId = categoryId;
  }

  if (Array.isArray(images)) product.images = images;
  if (typeof isActive === "boolean") product.isActive = isActive;

  await product.save();
  res.json(product);
});

// Admin: delete
export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.json({ message: "Product deleted" });
});
