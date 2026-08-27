import mongoose, { Document } from "mongoose";
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
export interface IProductDocument extends Omit<Document, 'id'>, IProduct {
}
export declare const productSchema: mongoose.Schema<IProductDocument, mongoose.Model<IProductDocument, any, any, any, mongoose.Document<unknown, any, IProductDocument, any, {}> & IProductDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IProductDocument, mongoose.Document<unknown, {}, mongoose.FlatRecord<IProductDocument>, {}, mongoose.DefaultSchemaOptions> & mongoose.FlatRecord<IProductDocument> & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}>;
export declare const Product: mongoose.Model<IProductDocument, {}, {}, {}, mongoose.Document<unknown, {}, IProductDocument, {}, {}> & IProductDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
