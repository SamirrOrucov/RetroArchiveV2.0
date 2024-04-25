import React, { useEffect, useState } from "react";

function EditProfile() {
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  async function fetchUser() {
    const response = await fetch(
      "https://retroarchivev2-0.onrender.com/user/65cb6ae6f16975d4e4ba87e0"
    );
    const data = await response.json();
    setNickName(data.nickName);
    setImage(data.image);
    setPassword(data.password);
  }
  useEffect(() => {
    fetchUser()
  }, [])
  
  return (
    <div className="editProfile">
      <div className="editProfile_container">
        <form action="">
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <input
            type="text"
            name=""
            id="nickName"
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
          />
          <input
            type="password"
            value={password}
            id="myInput"
            name=""
            onChange={(e) => setPassword(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
