import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function AdminActors() {
  const [actorData, setActorData] = useState([]);
  async function fetchActors() {
    const response = await fetch("http://localhost:3003/actor");
    const data = await response.json();
    setActorData(data);
  }

  useEffect(() => {
    fetchActors();
  }, []);

  async function handleDelete(id) {
    await fetch("http://localhost:3003/actor/" + id, { method: "DELETE" });
    await fetchActors();
  }

  return (
    <div className="adminFilms">
    <div className="adminFilms_container">
      <Link to={"/admin/actors/add"}>
        <button className="addButton">
          <i className="fa-solid fa-plus"></i> Add Actor 
        </button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Description</th>
            
          </tr>
        </thead>
        <tbody>
          {actorData.map((item) => (
            <tr key={item._id}> 
              <td>
                <img src={item.image} alt="" />
              </td>
              <td >{(item.name)}</td>
              <td>{item.desc.slice(0,150)}...</td>
              
              <td>
                <Link to={"/admin/actors/edit/" + item._id}>
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
  )
}

export default AdminActors