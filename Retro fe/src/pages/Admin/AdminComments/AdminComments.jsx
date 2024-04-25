import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AdminComments.scss";
import AdminCommentsDetail from "./AdminCommentsDetail/AdminCommentsDetail";
function AdminComments() {
  const [filmData, setFilmData] = useState([]);
  async function fetchFilms() {
    const response = await fetch("https://retroarchivev2-0.onrender.com/film");
    const data = await response.json();
    setFilmData(data);
  }
  function handleFetchCommentsLength(length) {
    setFetchCommentsLength(length);
  }
  useEffect(() => {
    fetchFilms();
  }, []);
  return (
    <div className="adminComments">
      <div className="adminComments_container">
        <table>
          <thead>
            <tr>
              <th>Film Name</th>
            </tr>
          </thead>
          <tbody>
            {filmData.map((item) => (
              <tr key={item._id}>
                <td>
                  <Link to={"/admin/comments/detail/" + item._id}>
                    {item.title}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default AdminComments;
