import * as mongoose from 'mongoose';
export declare const AvatarSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
    collection: string;
}>, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    avatar?: string;
    userId?: number;
    base64?: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    avatar?: string;
    userId?: number;
    base64?: string;
}>> & Omit<mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    avatar?: string;
    userId?: number;
    base64?: string;
}> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
