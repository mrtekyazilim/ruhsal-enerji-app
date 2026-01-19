import mongoose, { Schema, Document } from "mongoose";

export interface IConsultant extends Document {
  name: string;
  title?: string;
  phone?: string;
  email?: string;
  instagram?: string;
  avatarUrl?: string;
  bio?: string;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const ConsultantSchema = new Schema<IConsultant>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    instagram: {
      type: String,
      trim: true,
    },
    avatarUrl: {
      type: String,
    },
    bio: {
      type: String,
      trim: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Consultant = mongoose.model<IConsultant>("Consultant", ConsultantSchema);

export default Consultant;
