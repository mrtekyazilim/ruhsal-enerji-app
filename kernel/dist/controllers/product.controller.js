"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.adminGetProducts = exports.getProductById = exports.getProducts = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const Category_1 = __importDefault(require("../models/Category"));
const slugify_1 = __importDefault(require("../utils/slugify"));
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
// Public: list (filters: categoryId, q)
exports.getProducts = (0, asyncHandler_1.default)(async (req, res) => {
    const { categoryId, q } = req.query;
    const filter = { isActive: true };
    if (categoryId)
        filter.categoryId = categoryId;
    let query = Product_1.default.find(filter).populate("categoryId", "name slug");
    if (q && q.trim()) {
        query = Product_1.default.find({ ...filter, $text: { $search: q.trim() } }).populate("categoryId", "name slug");
    }
    const products = await query.sort({ createdAt: -1 });
    res.json(products);
});
// Public: detail by id
exports.getProductById = (0, asyncHandler_1.default)(async (req, res) => {
    const { id } = req.params;
    const product = await Product_1.default.findById(id).populate("categoryId", "name slug");
    if (!product || !product.isActive) {
        res.status(404);
        throw new Error("Product not found");
    }
    res.json(product);
});
// Admin: list all
exports.adminGetProducts = (0, asyncHandler_1.default)(async (_req, res) => {
    const products = await Product_1.default.find().populate("categoryId", "name slug").sort({ createdAt: -1 });
    res.json(products);
});
// Admin: create
exports.createProduct = (0, asyncHandler_1.default)(async (req, res) => {
    const { title, description, price, currency, stock, categoryId, images, isActive } = req.body;
    console.log("CREATE PRODUCT PAYLOAD =>", { title, description, price, currency, stock, categoryId, images, isActive });
    if (!title || price === undefined || !categoryId || stock === undefined) {
        res.status(400);
        throw new Error("title, price, stock, categoryId required");
    }
    const category = await Category_1.default.findById(categoryId);
    if (!category) {
        res.status(400);
        throw new Error("Invalid categoryId");
    }
    const slug = (0, slugify_1.default)(title);
    const exists = await Product_1.default.findOne({ slug });
    if (exists) {
        res.status(409);
        throw new Error("Product already exists");
    }
    const product = await Product_1.default.create({
        title,
        slug,
        description: description || "",
        price: Number(price),
        currency: currency || "TRY",
        stock: Number(stock),
        categoryId,
        images: Array.isArray(images) ? images : [],
        isActive: typeof isActive === "boolean" ? isActive : true,
    });
    // Populate category info
    await product.populate("categoryId", "name slug");
    console.log("PRODUCT BEFORE RESPONSE =>", product.toObject());
    res.status(201).json(product);
});
// Admin: update
exports.updateProduct = (0, asyncHandler_1.default)(async (req, res) => {
    const { id } = req.params;
    const { title, description, price, currency, stock, categoryId, images, isActive } = req.body;
    const product = await Product_1.default.findById(id);
    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }
    if (title && title !== product.title) {
        const newSlug = (0, slugify_1.default)(title);
        const exists = await Product_1.default.findOne({ slug: newSlug });
        if (exists) {
            res.status(409);
            throw new Error("Product slug already exists");
        }
        product.title = title;
        product.slug = newSlug;
    }
    if (typeof description === "string")
        product.description = description;
    if (price !== undefined)
        product.price = Number(price);
    if (currency !== undefined)
        product.currency = currency;
    if (stock !== undefined)
        product.stock = Number(stock);
    if (categoryId) {
        const category = await Category_1.default.findById(categoryId);
        if (!category) {
            res.status(400);
            throw new Error("Invalid categoryId");
        }
        product.categoryId = categoryId;
    }
    if (Array.isArray(images))
        product.images = images;
    if (typeof isActive === "boolean")
        product.isActive = isActive;
    await product.save();
    // Populate category info
    await product.populate("categoryId", "name slug");
    res.json(product);
});
// Admin: delete
exports.deleteProduct = (0, asyncHandler_1.default)(async (req, res) => {
    const { id } = req.params;
    const product = await Product_1.default.findByIdAndDelete(id);
    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }
    res.json({ message: "Product deleted" });
});
