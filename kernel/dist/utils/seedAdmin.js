"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
const db_1 = __importDefault(require("../config/db"));
dotenv_1.default.config();
const seedAdmin = async () => {
    try {
        await (0, db_1.default)();
        // Zaten admin varsa tekrar oluşturma
        const existingAdmin = await User_1.default.findOne({ isAdmin: true });
        if (existingAdmin) {
            console.log("⚠️ Admin already exists");
            console.log("👤 existing admin username:", existingAdmin.username);
            process.exit(0);
        }
        const username = process.env.ADMIN_USERNAME || "admin";
        const plainPassword = process.env.ADMIN_PASSWORD || "admin123";
        const hashedPassword = await bcrypt_1.default.hash(plainPassword, 10);
        const admin = new User_1.default({
            username,
            password: hashedPassword,
            isAdmin: true,
        });
        await admin.save();
        console.log("✅ Admin user created");
        console.log("👤 username:", username);
        console.log("🔑 password:", plainPassword);
        process.exit(0);
    }
    catch (error) {
        console.error("❌ Admin seed failed", error);
        process.exit(1);
    }
};
seedAdmin();
