import mongoose, { Schema, Document } from "mongoose";

export interface IUser {
  id?: string;
  username: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  defaultPaymentType?: string;
  isActive: boolean;
  emailVerified: boolean;
  isDeleted: boolean;
  internalNotes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserDocument extends Omit<Document, 'id'>, IUser {}

export const userSchema = new Schema<IUserDocument>({
  id: { type: String },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  email: { type: String, required: false, match: /.+\@.+\..+/, unique: true },
  phone: { type: String, required: false, unique: true },
  address: { type: String, required: false },
  defaultPaymentType: { type: String, required: false },
  isActive: { type: Boolean, default: true },
  emailVerified: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  internalNotes: { type: String },
}, {
  timestamps: true
});

export const User = mongoose.model<IUserDocument>("User", userSchema);
