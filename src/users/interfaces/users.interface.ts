import { Document } from 'mongoose';

export interface User extends Document {
  readonly id: number;
  readonly email: string;
  first_name: string;
  last_name: string;
  readonly avatar: string;
}
