import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditFilm.scss"
function EditFilm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [director, setDirector] = useState("");
  const [directorYears, setDirectorYears] = useState("");
  const [directorImg, setDirectorImg] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  async function getFetch() {
    const response = await fetch("https://retroarchivev2-0.onrender.com/film/" + id);
    const data = await response.json();
    setImage(data.image);
    setTitle(data.title);
    setDesc(data.desc);
    setDirector(data.director);
    setDirectorYears(data.directorYears);
    setDirectorImg(data.directorImg);
    setDuration(data.duration);
    setDate(data.date);
    setCategory(data.category);
  }

  useEffect(() => {
    getFetch();
  }, []);
  async function updateFilm() {
    await fetch("https://retroarchivev2-0.onrender.com/film/" + id, {
      method: "PUT",
      body: JSON.stringify({
        image: image,
        title: title,
        desc: desc,
        director: director,
        directorYears: directorYears,
        directorImg: directorImg,
        duration: duration,
        date: date,
        category: category,
      }),
      headers: { "Content-Type": "application/json" },
    }).then(() => navigate("/admin/films"));
  }
  return (
    <div className="editFilm">
      <div className="editFilm_container">
      <p>Edit</p>
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            updateFilm();
          }}
          className="form"
        >
          <input
            type="text"
            name=""
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <input
            type="text"
            name=""
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            name=""
            id="desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <input
            type="text"
            name=""
            id="director"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
          />
          <input
            type="text"
            name=""
            id="directorYears"
            value={directorYears}
            onChange={(e) => setDirectorYears(e.target.value)}
          />
          <input
            type="text"
            name=""
            id="directorImg"
            value={directorImg}
            onChange={(e) => setDirectorImg(e.target.value)}
          />
          <input
            type="text"
            name=""
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
          <input
            type="text"
            name=""
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            type="text"
            name=""
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <button>Update!</button>
        </form>
      </div>
    </div>
  );
}

export default EditFilm;
