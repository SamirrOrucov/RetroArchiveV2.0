import mongoose,{ Schema } from "mongoose";

const actorSchema = new Schema({
    image: String,
    name: String,
    title:String,
    desc: String,
    city:String
  });
  
  export const ActorModel = mongoose.model("Actors", actorSchema);
  