import mongoose, { Document } from "mongoose";
import { IProduct } from "./productModel";
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
export interface IOrderDocument extends IOrder, Document {
}
export declare const orderSchema: mongoose.Schema<IOrderDocument, mongoose.Model<IOrderDocument, any, any, any, mongoose.Document<unknown, any, IOrderDocument, any, {}> & IOrderDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IOrderDocument, mongoose.Document<unknown, {}, mongoose.FlatRecord<IOrderDocument>, {}, mongoose.DefaultSchemaOptions> & mongoose.FlatRecord<IOrderDocument> & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}>;
export declare const Order: mongoose.Model<IOrderDocument, {}, {}, {}, mongoose.Document<unknown, {}, IOrderDocument, {}, {}> & IOrderDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
