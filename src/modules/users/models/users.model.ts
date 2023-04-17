import { DocumentResult } from "@/generic/models/generic.model";
import { model, Schema, Document } from "mongoose";

export interface User extends DocumentResult<User> {
  _id: string;
  email: string;
  password: string;

  token?: string;
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
