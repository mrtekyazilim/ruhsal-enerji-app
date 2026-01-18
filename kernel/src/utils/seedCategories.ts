import dotenv from "dotenv";
import connectDB from "../config/db";
import Category from "../models/Category";
import slugify from "./slugify";

dotenv.config();

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
    await connectDB();

    for (const c of categories) {
      const slug = slugify(c.name);

      const exists = await Category.findOne({ slug });
      if (exists) {
        console.log(`⚠️ Exists: ${c.name}`);
        continue;
      }

      await Category.create({
        name: c.name,
        slug,
        description: c.description,
        isActive: true,
      });

      console.log(`✅ Created: ${c.name}`);
    }

    console.log("🎉 Category seeding completed");
    process.exit(0);
  } catch (error) {
    console.error("❌ Category seed failed", error);
    process.exit(1);
  }
};

seedCategories();
