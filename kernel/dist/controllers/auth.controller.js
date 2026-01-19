"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminLogin = exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
/**
 * NORMAL LOGIN (istersen ileride kullanırsın)
 * username + password
 */
const login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
    }
    const user = await User_1.default.findOne({ username });
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt_1.default.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = (0, generateToken_1.default)({
        userId: user._id.toString(),
        isAdmin: user.isAdmin,
    });
    return res.json({
        token,
        user: {
            id: user._id,
            username: user.username,
            isAdmin: user.isAdmin,
        },
    });
};
exports.login = login;
/**
 * 🔐 ADMIN LOGIN (admin panel bunu kullanacak)
 * SADECE isAdmin === true olanlar girebilir
 */
const adminLogin = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
    }
    const admin = await User_1.default.findOne({
        username,
        isAdmin: true,
    });
    if (!admin) {
        return res.status(403).json({ message: "Admin access denied" });
    }
    const isMatch = await bcrypt_1.default.compare(password, admin.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = (0, generateToken_1.default)({
        userId: admin._id.toString(),
        isAdmin: true,
    });
    return res.json({
        token,
        user: {
            id: admin._id,
            username: admin.username,
            isAdmin: true,
        },
    });
};
exports.adminLogin = adminLogin;
