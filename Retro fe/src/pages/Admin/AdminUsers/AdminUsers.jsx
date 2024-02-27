import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import"./AdminUser.scss"
function AdminUsers() {
  const [userData, setUserData] = useState([]);

  async function fetchUsers() {
    const response = await fetch("http://localhost:3003/user");
    const data = await response.json();
    setUserData(data);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  async function handleDelete(id) {
    await fetch("http://localhost:3003/user/" + id, { method: "DELETE" });
    await fetchUsers();
  }

  return (
    <div className="adminUsers">
      <div className="adminUsers_container">
      
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>NickName</th>
              <th>Email</th>
              <th>Role</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((item) => (
              <tr key={item._id}>
                <td>
                  <img src={item.image} alt="" />
                </td>
                <td>{item.nickName}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
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

export default AdminUsers;
