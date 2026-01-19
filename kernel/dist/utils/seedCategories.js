"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("../config/db"));
const Category_1 = __importDefault(require("../models/Category"));
const slugify_1 = __importDefault(require("./slugify"));
dotenv_1.default.config();
const categories = [
    { name: "Kahve falı", description: "Kahve falı içerikleri" },
    { name: "Rüyalar", description: "Rüya yorumları ve içerikleri" },
    { name: "Şamanik", description: "Şamanik pratikler ve bilgiler" },
    { name: "Büyü", description: "Büyü ve ritüel içerikleri" },
    { name: "Cinler ve ifritler", description: "Cinler ve ifritlerle ilgili içerikler" },
    { name: "Tarot", description: "Tarot açılımları ve tarot bilgileri" },
    { name: "Yıldız haritası", description: "Astroloji ve yıldız haritası içerikleri" },
    { name: "Nümeroloji", description: "Sayılar ve numeroloji içerikleri" },
    { name: "Theta healing", description: "Theta healing teknikleri ve içerikleri" }
];
const seedCategories = async () => {
    try {
        await (0, db_1.default)();
        for (const c of categories) {
            const slug = (0, slugify_1.default)(c.name);
            const exists = await Category_1.default.findOne({ slug });
            if (exists) {
                console.log(`⚠️ Exists: ${c.name}`);
                continue;
            }
            await Category_1.default.create({
                name: c.name,
                slug,
                description: c.description,
                isActive: true,
            });
            console.log(`✅ Created: ${c.name}`);
        }
        console.log("🎉 Category seeding completed");
        process.exit(0);
    }
    catch (error) {
        console.error("❌ Category seed failed", error);
        process.exit(1);
    }
};
seedCategories();
