import { model, Schema, Document } from "mongoose";

export interface User {
  _id: string;
  email: string;
  password: string;
}

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const userModel = model<User & Document>("User", userSchema);

export default userModel;
