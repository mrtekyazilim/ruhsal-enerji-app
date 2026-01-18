import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

export type UserRole = "admin";

export interface IUser {
  username: string;
  password: string;
  role: UserRole;
}

interface IUserDoc extends IUser, mongoose.Document {
  matchPassword(entered: string): Promise<boolean>;
}

const userSchema = new Schema<IUserDoc>(
  {
    username: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin"], default: "admin" },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (entered: string) {
  return bcrypt.compare(entered, this.password);
};

const User = mongoose.model<IUserDoc>("User", userSchema);
export default User;
