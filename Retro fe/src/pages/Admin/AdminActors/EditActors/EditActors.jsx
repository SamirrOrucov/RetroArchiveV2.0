import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../AdminFilms/EditFilm/EditFilm";

function EditActors() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  async function getFetch() {
    const response = await fetch("https://retroarchivev2-0.onrender.com/actor/" + id);
    const data = await response.json();
    setImage(data.image);
    setName(data.name);
    setDesc(data.desc);
  }

  useEffect(() => {
    getFetch();
  }, []);
  async function updateFilm() {
    await fetch("https://retroarchivev2-0.onrender.com/actor/" + id, {
      method: "PUT",
      body: JSON.stringify({
        image: image,
        name: name,
        desc: desc,
      }),
      headers: { "Content-Type": "application/json" },
    }).then(() => navigate("/admin/actors"));
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
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            name=""
            id="desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />

          <button>Update!</button>
        </form>
      </div>
    </div>
  );
}

export default EditActors;
