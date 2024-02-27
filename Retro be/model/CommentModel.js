import mongoose from "mongoose";
import { Schema } from "mongoose";

const commentSchema = new Schema({
  filmId: { type: Schema.Types.ObjectId, ref: "Film" },
  userId: { type: Schema.Types.ObjectId, ref: "UserModel" },
  content: {
    type: String,
    required: false,
  },
  rating:{
    type:Number,
    min:0,
    max:10,
  }
  
},{ timestamps: true });

export const CommentModel = mongoose.model("Comment", commentSchema);
