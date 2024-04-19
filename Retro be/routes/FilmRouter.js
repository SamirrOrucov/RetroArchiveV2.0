import { Router } from "express";
import {
  deleteFilm,
  getAllFilms,
  getFilmById,
  getFilmWithComments,
  postFilm,
  updateFilm,
} from "../controller/FilmController.js";
import multer from "multer";
import {  audioStorage } from "../Middleware/multerStorage.js";


const audioStorages = multer({ storage: audioStorage }).fields([
  { name: "audioStorage", maxCount: 1 },
  { name: "videoStorage", maxCount: 1 },
]);
export const filmRoute = Router();

filmRoute.get("/", getAllFilms);
filmRoute.get("/:id", getFilmById);
filmRoute.get("/filmWithComment/:id", getFilmWithComments);


filmRoute.post("/",audioStorages,  postFilm);

filmRoute.put("/:id",audioStorages,  updateFilm);

filmRoute.delete("/:id",  deleteFilm)