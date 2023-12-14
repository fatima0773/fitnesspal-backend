// Mongoose Imports
import mongoose, { Document, Model, Schema } from "mongoose";

// Create interfact for products
export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  age: number;
  gender: string;
}

// Create schema for products
const UserSchema: Schema<IUser> = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
});

const User: Model<IUser> = mongoose.model<IUser>("user", UserSchema);

export default User;

// END OF FILE
