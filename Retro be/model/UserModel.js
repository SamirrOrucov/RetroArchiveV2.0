import mongoose,{ Schema } from "mongoose";

const userSchema = new Schema({
    image: String,
    nickName: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, default: "user" },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Film' }]
  }); 

  export const UserModel = mongoose.model("UserModel", userSchema);
  