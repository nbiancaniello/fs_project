import mongoose, { Document } from "mongoose";
export interface ICategory {
    description: string;
    isActive: boolean;
    isDeleted: boolean;
    internalNotes?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface ICategoryDocument extends ICategory, Document {
}
export declare const categorySchema: mongoose.Schema<ICategoryDocument, mongoose.Model<ICategoryDocument, any, any, any, mongoose.Document<unknown, any, ICategoryDocument, any, {}> & ICategoryDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, ICategoryDocument, mongoose.Document<unknown, {}, mongoose.FlatRecord<ICategoryDocument>, {}, mongoose.DefaultSchemaOptions> & mongoose.FlatRecord<ICategoryDocument> & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}>;
export declare const Category: mongoose.Model<ICategoryDocument, {}, {}, {}, mongoose.Document<unknown, {}, ICategoryDocument, {}, {}> & ICategoryDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
