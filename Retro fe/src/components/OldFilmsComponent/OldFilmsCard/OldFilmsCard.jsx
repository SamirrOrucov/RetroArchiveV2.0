import React, { useContext, useEffect, useState } from "react";
import "./OldFilmsCards.scss";
import { WatchlistContext } from "../../../context/WatchlistContext";
import { Link } from "react-router-dom";
function OldFilmsCard({
  item,
  image,
  title,
  desc,
  duration,
  sendDataToParent,
}) {
  const { addToWatchlist, watchlist, removeFromWatchlist } =
    useContext(WatchlistContext);
  const [rating, setRating] = useState(0);

  const { hours, minutes } = timeConvert(duration);
  function timeConvert(duration) {
    const minutes = duration % 60;
    const hours = (duration - minutes) / 60;
    return { hours, minutes };
  }
  async function fetchRating() {  
    try {
      const response = await fetch("https://retroarchivev2-0.onrender.com/comment/avarage", {
        method: "POST",
        body: JSON.stringify({
          filmId: item._id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
       // if (data && data.length > 0) {
      const roundedRating = data[0].averageRating;
      const roundedRate = parseFloat(roundedRating?.toFixed(1));
      setRating(roundedRate);
      // }
    } catch (error) {
      console.error("Error fetching rating:", error);
    }
  }
  function handleClick() {
    sendDataToParent(rating);
  }
  useEffect(() => {
    handleClick();
  }, [rating]);

  useEffect(() => {
    fetchRating();
  }, []);
  return (
    <div className="oldFilmsCard">
      <div className="oldFilmsCard_container">
        <div className="top">
          <div className="rate">
            <p>
              <i class="fa-sharp fa-solid fa-star"></i>
              {typeof rating=="number" ? rating : rating=="NaN" ?"0":"0"}
            {console.log(rating)}
            </p>
          </div>
          <div className="catgory">
            {watchlist.some((x) => x === item._id) ? (
              <button
                onClick={() => removeFromWatchlist(item)}
                className="addedWatchlist"
              >
                Added
              </button>
            ) : (
              <button onClick={() => addToWatchlist(item)}>
                Add Watchlist
              </button>
            )}
          </div>
        </div>
        <div className="image">
          <img src={image} alt="" />
        </div>
        <div className="middle">
          <div className="title">
            <Link to={"/films/" + item._id}>
              <p>{title}</p>
            </Link>
          </div>
          <div className="desc">{desc.slice(0, 250)}..</div>
        </div>
        <div className="duration">
          <p>
            <span>Duration: </span>
            {hours + "h" + " " + minutes + "min"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default OldFilmsCard;
