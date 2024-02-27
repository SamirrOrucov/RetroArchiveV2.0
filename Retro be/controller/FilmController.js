import { CommentModel } from "../model/CommentModel.js";
import { FilmModel } from "../model/FilmModel.js";

export const getAllFilms = async (req, res) => {
  try {
    const films = await FilmModel.find({});
    res.send(films);
  } catch (error) {
    res.send(error.message);
  }
};
export const getFilmById = async (req, res) => {
  try {
    const { id } = req.params;
    const film = await FilmModel.findById(id);
    res.send(film);
  } catch (error) {
    res.send(error.message);
  }
};
export const postFilm = async (req, res) => {
  try {
    const {
      image,
      title,
      desc,
      director,
      directorYears,
      directorImg,
      duration,
      date,
      category,
    } = req.body;
    const newFilm = new FilmModel({
      image,
      title,
      desc,
      director,
      directorYears,
      directorImg,
      duration,
      date,
      category,
    });
    await newFilm.save();

    res.send("New film Posted!");
  } catch (error) {
    res.send(error.message);
  }
};
export const updateFilm = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      desc,
      director,
      directorYears,
      directorImg,
      duration,
      date,
      category,
    } = req.body;

    const updatedFilm = await FilmModel.findByIdAndUpdate(id, {
      image,
      title,
      desc,
      director,
      directorYears,
      directorImg,
      duration,
      date,
      category,
    });
    res.send("Film Updated!");
  } catch (error) {
    res.send(error.message);
  }
};
export const deleteFilm = async (req, res) => {
  try {
    const { id } = req.params;
    const delFilm = await FilmModel.findByIdAndDelete(id);

    res.send("Selected film deleted!");
  } catch (error) {
    res.send(error.message);
  }
};

export const getFilmWithComments = async (req, res) => {
  try {
    const { id } = req.params;
    const film = await CommentModel.find({ filmId: id }).populate(
      "userId",
      "-password"
    );
    if (!film) {
      return res.status(404).send("Film not found");
    }

    res.send(film);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
