import mongoose, { Schema } from "mongoose";

const filmSchema = new Schema({
  image: String,
  title: String,
  desc: String,
  director:{
    type: String,
    select:false
  },
  directorYears: String,
  directorImg: String,
  duration: String,
  date: String,
  category: String,
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
});
export const FilmModel = mongoose.model("Film", filmSchema);
  