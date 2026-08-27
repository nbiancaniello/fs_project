import mongoose, { Document } from "mongoose";
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
export interface IUserDocument extends Omit<Document, 'id'>, IUser {
}
export declare const userSchema: mongoose.Schema<IUserDocument, mongoose.Model<IUserDocument, any, any, any, mongoose.Document<unknown, any, IUserDocument, any, {}> & IUserDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IUserDocument, mongoose.Document<unknown, {}, mongoose.FlatRecord<IUserDocument>, {}, mongoose.DefaultSchemaOptions> & mongoose.FlatRecord<IUserDocument> & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}>;
export declare const User: mongoose.Model<IUserDocument, {}, {}, {}, mongoose.Document<unknown, {}, IUserDocument, {}, {}> & IUserDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
