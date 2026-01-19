import { Request, Response } from "express";
import Consultant from "../models/Consultant";
import asyncHandler from "../utils/asyncHandler";

// Public: list all active consultants
export const getConsultants = asyncHandler(async (req: Request, res: Response) => {
  const consultants = await Consultant.find({ active: true }).sort({ createdAt: -1 });
  res.json(consultants);
});

// Public: get by id
export const getConsultantById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const consultant = await Consultant.findById(id);
  
  if (!consultant || !consultant.active) {
    res.status(404);
    throw new Error("Consultant not found");
  }

  res.json(consultant);
});

// Admin: list all (including inactive)
export const adminGetConsultants = asyncHandler(async (_req: Request, res: Response) => {
  const consultants = await Consultant.find().sort({ createdAt: -1 });
  res.json(consultants);
});

// Admin: create
export const createConsultant = asyncHandler(async (req: Request, res: Response) => {
  const { name, title, phone, email, instagram, bio, active } = req.body;
  const file = (req as any).file;

  if (!name || !name.trim()) {
    res.status(400);
    throw new Error("Danışman adı gerekli");
  }

  const consultant = new Consultant({
    name: name.trim(),
    title: title?.trim(),
    phone: phone?.trim(),
    email: email?.trim(),
    instagram: instagram?.trim(),
    bio: bio?.trim(),
    avatarUrl: file ? `/uploads/${file.filename}` : undefined,
    active: active !== false,
  });

  await consultant.save();
  res.status(201).json(consultant);
});

// Admin: update
export const updateConsultant = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, title, phone, email, instagram, bio, active } = req.body;
  const file = (req as any).file;

  console.log(`[UPDATE CONSULTANT] ID: ${id}, Body:`, req.body);

  const consultant = await Consultant.findById(id);
  if (!consultant) {
    res.status(404);
    throw new Error("Consultant not found");
  }

  if (name !== undefined) consultant.name = name.trim();
  if (title !== undefined) consultant.title = title?.trim();
  if (phone !== undefined) consultant.phone = phone?.trim();
  if (email !== undefined) consultant.email = email?.trim();
  if (instagram !== undefined) consultant.instagram = instagram?.trim();
  if (bio !== undefined) consultant.bio = bio?.trim();
  if (file) consultant.avatarUrl = `/uploads/${file.filename}`;
  if (active !== undefined) consultant.active = active;

  await consultant.save();
  console.log(`[UPDATE CONSULTANT] Saved:`, consultant);
  res.json(consultant);
});

// Admin: delete
export const deleteConsultant = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const consultant = await Consultant.findByIdAndDelete(id);

  if (!consultant) {
    res.status(404);
    throw new Error("Consultant not found");
  }

  res.json({ message: "Consultant deleted successfully" });
});
