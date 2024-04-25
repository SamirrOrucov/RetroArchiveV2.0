import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../AdminComments.scss";

function AdminCommentsDetail() {
  const { id } = useParams();
  const [filmComments, setfilmComments] = useState([]);

  async function fetchComments(e) {
    try {
      const response = await fetch(
        "https://retroarchivev2-0.onrender.com/film/filmWithComment/" + id
      );
      const data = await response.json();
      setfilmComments(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    fetchComments();
  }, []);
  async function handleDelete(commentId) {
    await fetch("https://retroarchivev2-0.onrender.com/comment/"+commentId , {
      method: "DELETE"
    });
    console.log(commentId);
    await fetchComments();
  }
  return (
    <div className="adminComments">
      <div className="adminComments_container">
        <table>
          <thead>
            <tr>
              <th>Comment</th>
              <th>User</th>
              <th>Post Time</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {filmComments.map((item) => (
              <tr key={item._id}>
                <td>{item.content}</td>
                <td>{item.userId.nickName} </td>
                <td>{item?.createdAt}</td>
                <td>
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

export default AdminCommentsDetail;
