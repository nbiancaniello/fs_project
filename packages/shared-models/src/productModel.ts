import mongoose, { Schema, Document } from "mongoose";

export interface IProduct {
  id: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock?: boolean;
  isPromotion?: boolean;
  isNewArrival?: boolean;
  isActive: boolean;
  isDeleted: boolean;
  internalNotes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProductDocument extends Omit<Document, 'id'>, IProduct {}

export const productSchema = new Schema<IProductDocument>({
  id: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, default: '' },
  category: { type: String, required: true },
  inStock: { type: Boolean, required: false },
  isPromotion: { type: Boolean, required: false },
  isNewArrival: { type: Boolean, required: false },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  internalNotes: { type: String },
}, {
  timestamps: true
});

export const Product = mongoose.model<IProductDocument>("Product", productSchema);
