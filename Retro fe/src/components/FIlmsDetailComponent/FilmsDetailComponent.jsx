import React, { useContext, useEffect, useRef, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import "./FilmsDetailComponent.scss";
import { FaStar } from "react-icons/fa";
import { UserTokenContext } from "../../context/UserTokenContext";

function FilmsDetailComponent() {
  const { id } = useParams();
  const [dbData, setDbData] = useState([]);
  const [rating, setRating] = useState(null);
  const [totalRating, setTotalRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [message, setMessage] = useState("");
  const { decodedToken, tokenn } = useContext(UserTokenContext);
  const [filmComments, setfilmComments] = useState([]);
  const navigate = useNavigate();
  const iframeRef = useRef(null);

  async function postComment() {
    try {
      if (decodedToken) {
        const response = await fetch("http://localhost:3003/comment/", {
          method: "POST",
          body: JSON.stringify({
            userId: decodedToken.userId,
            filmId: id,
            content: message,
            rating: rating,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        await fetchComments();
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  async function fetchComments(e) {
    try {
      const response = await fetch(
        "http://localhost:3003/film/filmWithComment/" + id
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
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3003/film/" + id);
        const data = await response.json();
        setDbData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);
  async function fetchRating() {
    try {
      const response = await fetch("http://localhost:3003/comment/avarage", {
        method: "POST",
        body: JSON.stringify({
          filmId: id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data && data.length > 0) {
        const roundedRating = data[0].averageRating;
        const roundedRate = parseFloat(roundedRating?.toFixed(1));
        setTotalRating(roundedRate);
      }
    } catch (error) {
      console.error("Error fetching rating:", error);
    }
  }
  useEffect(() => {
    fetchRating();
  }, []);

  const audioRef = useRef(null);



  return (
    <div className="filmsDetailComponent">
      <div className="filmsDetailComponent_container">
        <div className="top">
          <div className="rate">
            <p>
              <div className="stars">
                {[...Array(5)].map((star, i) => {
                  const ratingValue = i + 1;
                  return (
                    <label key={i}>
                      <input
                        type="radio"
                        name="rating"
                        id=""
                        onClick={() => setRating(ratingValue)}
                        value={totalRating}
                      />
                      <FaStar
                        className="str"
                        color={
                          ratingValue <= (hover || totalRating)
                            ? "ffc107"
                            : "e4e5e9"
                        }
                      />
                    </label>
                  );
                })}
              </div>
            </p>
          </div>
          <div className="top_up">
            <div className="title">
              <h5>{dbData.title}</h5>
            </div>
            <div className="desc">
              <p>{dbData.desc?.slice(0, 190)}..</p>
            </div>
          </div>
          <div className="top_down">
            <div className="details">
              <div className="date">
                <p>
                  <span>Date: </span>
                  {dbData.date}
                </p>
              </div>
              <div className="date">
                <p>
                  <span>Duration: </span>
                  {dbData.duration} min
                </p>
              </div>
            </div>
            <div className="category">
              <button>{dbData.category}</button>
            </div>
          </div>
        </div>
        <div className="image">
          <img src={dbData.image} alt="" />
        </div>

        <div className="allDetail">
          <div className="left">
            <div className="director">
              <img src={dbData.directorImg} alt="" />
              <p>{dbData.director}</p>
            </div>
            <div className="line"></div>
            <div className="directorYears">
              <p>Director of the film</p>
              <span>{dbData.directorYears}</span>
            </div>
          </div>
          <div className="right">
            <p>{dbData.desc}</p>
          </div> 
        </div>
        {
          dbData.audioFile?
        <div className="videoSection">
          <video src={dbData.videoFile} controls style={{width:"915px"}}></video>
        </div>:null}
        <div className="feedbackSection">
          <p className="feedback">
            FEEDBACK <i className="fa-solid fa-arrow-right"></i>
          </p>
          <div className="rating">
            <p>What do you think of the film?</p>
            <div className="stars">
              {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                  <label key={i}>
                    <input
                      type="radio"
                      name="rating"
                      id=""
                      onClick={() => setRating(ratingValue)}
                      value={ratingValue}
                    />
                    <FaStar
                      className="str"
                      color={
                        ratingValue <= (hover || rating) ? "ffc107" : "e4e5e9"
                      }
                      onMouseEnter={() => setHover(ratingValue)}
                      onMouseLeave={() => setHover(null)}
                    />
                  </label>
                );
              })}
            </div>
          </div>
          <div className="commentSection">
            <p>Do you have any thoughts you’d like to share?</p>
            <input
              type="text"
              name=""
              id=""
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={() => postComment()}>SUBMIT</button>
          </div>
          <div className="publishedComments">
            {filmComments.map((item) => (
              <div className="userComment" key={item._id}>
                <div className="userSide">
                  <img src={item.userId?.image} alt="" />
                  <p className="userName">{item.userId?.nickName}</p>
                </div>
                <p className="comment">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
       {
          dbData.audioFile?<div className="audioButton" >
          <iframe
            name="newframe"
            frameborder="0"
            height="53"
            width="70%"
            style={{
              borderRadius: "30px",
              boxShadow: " rgb(38, 57, 77) 0px 20px 30px -10px",
            }}
            ref={audioRef}
            src={dbData.audioFile}
            allow="autoplay"
            className="audio"
          />
        </div>:null
        }
        
      </div>
    </div>
  );
}

export default FilmsDetailComponent;
