import React, { createRef, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserTokenContext } from "../../context/UserTokenContext";
import "./Register.scss";

function Register() {
  const { addToken } = useContext(UserTokenContext);
  const navigate = useNavigate();
  const [passwordStatus, setPasswordStatus] = useState(true);
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const fileRef = createRef();

  function passwordToggle() {
    const x = document.getElementById("myInput");

    if (passwordStatus) {
      x.type = "text";
    } else {
      x.type = "password";
    }
    setPasswordStatus(!passwordStatus);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nickName", nickName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", image);

    const response = await fetch("https://retroarchivev2-0.onrender.com/auth/register", {
      method: "POST",
      body: formData,
    });

    const tokenResponse = await response.json();
    const token = tokenResponse.token;

    if (!token || typeof token !== "string") {
      throw new Error("Invalid token received from the server");
    }

    addToken(token);
    navigate("/");
  }

  return (
    <>
      <div className="register">
        <div className="register_container">
          <div className="left">
            <h2>FILM & AZE</h2>
            <img
              src="https://azkataloq.org/files/preview/1280x1010/11628358005vtswdw9zhxhmpnbd3v3esn4m68r8yc7b6lqa4bil6tjn9p0pxdxgzsxkagbkez3ynqz1ci3wjiucxny9xa0po316coqwfujrweul.jpg"
              alt=""
            />
          </div>
          <div className="right">
            <div className="form">
              <form action="" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name=""
                  id="nickName"
                  placeholder="Nickname"
                  onChange={(e) => setNickName(e.target.value)}
                />
                <input
                  type="email"
                  name=""
                  id="email"
                  placeholder="example@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="password">
                  <input
                    type="password"
                    id="myInput"
                    name=""
                    placeholder="*******"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <i
                    className={
                      passwordStatus
                        ? "fa-solid fa-eye"
                        : "fa-solid fa-eye-slash"
                    }
                    onClick={() => passwordToggle()}
                  ></i>
                </div>

                <div className="file-input-container">
                  <input
                    ref={fileRef}
                    onChange={(e) => setImage(e.target.files[0])}
                    type="file"
                    accept="image/*"
                    className="imageFile"
                  ></input>
                  <div className="addFile">
                    <i className="fa-solid fa-file-arrow-up"></i> Add Profile
                    Photo
                  </div>
                </div>

                <button>Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
