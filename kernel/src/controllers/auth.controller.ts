import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";
import generateToken from "../utils/generateToken";

/**
 * NORMAL LOGIN (istersen ileride kullanırsın)
 * username + password
 */
export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = generateToken({
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

/**
 * 🔐 ADMIN LOGIN (admin panel bunu kullanacak)
 * SADECE isAdmin === true olanlar girebilir
 */
export const adminLogin = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  const admin = await User.findOne({
    username,
    isAdmin: true,
  });

  if (!admin) {
    return res.status(403).json({ message: "Admin access denied" });
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = generateToken({
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
