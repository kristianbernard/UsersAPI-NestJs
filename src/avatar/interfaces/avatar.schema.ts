import * as mongoose from 'mongoose';

export const AvatarSchema = new mongoose.Schema(
  {
    userId: { type: Number },
    avatar: { type: String },
    base64: { type: String },
  },
  { timestamps: true, collection: 'Avatar' },
);
