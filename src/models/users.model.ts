import { model, Schema } from 'mongoose';
import { User } from '@interfaces/users.interface';

const userSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const userModel = model<User>('User', userSchema, 'users');

export default userModel;
