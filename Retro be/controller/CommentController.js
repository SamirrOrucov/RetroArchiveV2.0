// commentController.js

import mongoose from "mongoose";
import { CommentModel } from "../model/CommentModel.js";
import { FilmModel } from "../model/FilmModel.js";

export const createComment = async (req, res) => {
  try {
    const { userId, filmId, content, rating } = req.body;

    const existingComment = await CommentModel.findOne({ userId, filmId });
    console.log(existingComment);
    if (existingComment && existingComment.rating !== null) {
      const newComment = new CommentModel({ userId, filmId, content });
      await newComment.validate();
      await newComment.save();
      const film = await FilmModel.findById(filmId);
      film.comments.push(newComment._id);
      await film.save();
      return res
        .status(200)
        .send("You have already rated this film,but your comment sent.");
    }

    const newComment = new CommentModel({ userId, filmId, content, rating });
    await newComment.validate();
    await newComment.save();

    const film = await FilmModel.findById(filmId);
    film.comments.push(newComment._id);
    await film.save();

    res.send("New comment created successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getAvarageForFilm = async (req, res) => {
  try {
    const { filmId } = req.body;
    const rating = await CommentModel.aggregate([
      { $match: { filmId: new mongoose.Types.ObjectId(filmId) } },
      { $group: { _id: null, averageRating: { $avg: "$rating" } } },
    ]);
    res.send(rating);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
export const getCommentsById = async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await CommentModel.findById(commentId);
    console.log(comment);
    res.send(comment);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateComment = async (req, res) => {
  try {
    const { userId, filmId, content } = req.body;
    const existingComment = await CommentModel.findOne({ userId, filmId });

    if (!existingComment) {
      return res.status(404).send("Comment not found");
    }

    existingComment.content = content;
    await existingComment.save();
    res.send("Comment updated successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const deleteComment = await CommentModel.findByIdAndDelete(commentId);
    res.send("Comment deleted successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
