import React, { useEffect, useState } from "react";
import "./AdminFilms.scss";
import { Link } from "react-router-dom";
import "./AdminFilms.scss";
function AdminFilms() {
  const [filmData, setFilmData] = useState([]);

  async function fetchFilms() {
    const response = await fetch("https://retroarchivev2-0.onrender.com/film");
    const data = await response.json();
    setFilmData(data);
  }

  useEffect(() => {
    fetchFilms();
  }, []);

  async function handleDelete(id) {
    await fetch("https://retroarchivev2-0.onrender.com/film/" + id, { method: "DELETE" });
    await fetchFilms();
  }

  return (
    <div className="adminFilms">
      <div className="adminFilms_container">
        <Link to={"/admin/films/add"}>
          <button className="addButton">
            <i className="fa-solid fa-plus"></i> Add Film
          </button>
        </Link>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Description</th>
              <th>Director</th>
              <th>Directors Years</th>
              <th>Directors Image</th>
              <th>Duration</th>
              <th>Date Year</th>
              <th>Category</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {filmData.map((item) => (
              <tr key={item._id}>
                <td>
                  <img src={item.image} alt="" />
                </td>
                <td>{item.title}</td>
                <td>{item.desc.slice(0,150)}..  </td>
                <td>{item.director}</td>
                <td>{item.directorYears}</td>
                <td>
                  <img src={item.directorImg} alt="" />
                </td>
                <td>{item.duration}</td>
                <td>{item.date}</td>
                <td>{item.category}</td>
                <td>
                  <Link to={"/admin/films/edit/" + item._id}>
                    <button>Edit</button>
                  </Link>
                  <button onClick={() => handleDelete(item._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminFilms;
