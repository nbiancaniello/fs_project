import mongoose, { Schema, Document } from "mongoose";

export interface ICategory {
  description: string;
  isActive: boolean;
  isDeleted: boolean;
  internalNotes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICategoryDocument extends ICategory, Document {}

export const categorySchema = new Schema<ICategoryDocument>({
  description: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  internalNotes: { type: String },
}, {
  timestamps: true
});

export const Category = mongoose.model<ICategoryDocument>("Category", categorySchema);
