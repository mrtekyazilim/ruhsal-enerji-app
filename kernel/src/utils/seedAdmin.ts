import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "../models/User";
import connectDB from "../config/db";

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();

    // Zaten admin varsa tekrar oluşturma
   
    const existingAdmin = await User.findOne({ isAdmin: true });
if (existingAdmin) {
  console.log("⚠️ Admin already exists");
  console.log("👤 existing admin username:", existingAdmin.username);
  process.exit(0);
}


    const username = process.env.ADMIN_USERNAME || "admin";
    const plainPassword = process.env.ADMIN_PASSWORD || "admin123";

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const admin = new User({
      username,
      password: hashedPassword,
      isAdmin: true,
    });

    await admin.save();

    console.log("✅ Admin user created");
    console.log("👤 username:", username);
    console.log("🔑 password:", plainPassword);

    process.exit(0);
  } catch (error) {
    console.error("❌ Admin seed failed", error);
    process.exit(1);
  }
};

seedAdmin();
