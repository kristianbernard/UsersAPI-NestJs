import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true },
    first_name: String,
    last_name: String,
    email: { type: String, unique: false },
    avatar: { type: String, unique: false },
  },
  { timestamps: true, collection: 'Users' },
);
