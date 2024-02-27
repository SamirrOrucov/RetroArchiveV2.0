
import { Router } from "express";
import { createComment, deleteComment, getAvarageForFilm, getCommentsById, updateComment } from "../controller/CommentController.js";


export const commentRoute = Router();

commentRoute.post("/", createComment);
commentRoute.get("/:commentId", getCommentsById);
commentRoute.put("/", updateComment);
commentRoute.post("/avarage", getAvarageForFilm);
commentRoute.delete("/:id", deleteComment);