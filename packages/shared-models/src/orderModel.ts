import mongoose, { Schema, Document } from "mongoose";
import { productSchema, IProduct } from "./productModel";

const localDate = new Date();
const defaultDateVal = localDate.setHours(localDate.getHours() - 5);

export interface IOrder {
  orderID: string;
  dateIssued: Date;
  userID: string;
  totalAmount: number;
  items: IProduct[];
  deliveryOption: string;
  isDeleted: boolean;
  internalNotes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IOrderDocument extends IOrder, Document {}

export const orderSchema = new Schema<IOrderDocument>({
  orderID: { type: String, required: true },
  dateIssued: {
    type: Date,
    required: true,
    default: defaultDateVal
  },
  userID: { type: String, required: true },
  totalAmount: { type: Number, required: true, min: 0 },
  items: { type: [productSchema], required: true },
  deliveryOption: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
  internalNotes: { type: String },
}, {
  timestamps: true
});

export const Order = mongoose.model<IOrderDocument>("Order", orderSchema);
