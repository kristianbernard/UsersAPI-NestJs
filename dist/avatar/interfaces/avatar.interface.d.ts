import { Document } from 'mongoose';
export interface Avatar extends Document {
    readonly userId: number;
    readonly avatar: string;
    readonly base64: string;
}
