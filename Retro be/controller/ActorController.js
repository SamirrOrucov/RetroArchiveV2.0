import { ActorModel } from "../model/ActorModel.js";

export const getAllActors = async (req, res) => {
  try {
    const actors = await ActorModel.find({});
    res.send(actors);
  } catch (error) {
    res.send(error.message);
  }
};
export const getActorById = async (req, res) => {
  try {
    const { id } = req.params;
    const Actor = await ActorModel.findById(id);
    res.send(Actor);
  } catch (error) {
    res.send(error.message);
  }
};
export const postActor = async (req, res) => {
  try {
    const { image,title, name, desc, city } = req.body;
    const newActor = new ActorModel({ image, title,name, desc, city });
    await newActor.save();

    res.send("New Actor Posted!");
  } catch (error) {
    res.send(error.message);
  }
};
export const updateActor = async (req, res) => {
  try {
    const { id } = req.params;
    const { image,title, name, desc, city } = req.body;
    const updatedActor = await ActorModel.findByIdAndUpdate(id, {
      image,title,
      name,
      desc,
      city,
    });
    res.send("Actor Updated!");
  } catch (error) {
    res.send(error.message);
  }
};
export const deleteActor = async (req, res) => {
  try {
    const { id } = req.params;
    const delActor = await ActorModel.findByIdAndDelete(id);

    res.send("Selected Actor deleted!");
  } catch (error) {
    res.send(error.message);
  }
};
