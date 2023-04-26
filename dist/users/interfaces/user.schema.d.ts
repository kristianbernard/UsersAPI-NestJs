import * as mongoose from 'mongoose';
export declare const UserSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
    collection: string;
}>, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    id?: number;
    email?: string;
    first_name?: string;
    last_name?: string;
    avatar?: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    id?: number;
    email?: string;
    first_name?: string;
    last_name?: string;
    avatar?: string;
}>> & Omit<mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    id?: number;
    email?: string;
    first_name?: string;
    last_name?: string;
    avatar?: string;
}> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
