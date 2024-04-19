import React, { useContext } from "react";
import "./FilmCard.scss";
import { Link } from "react-router-dom";
import { WatchlistContext } from "../../../context/WatchlistContext";

function FilmCard({
  id,
  image,
  title,
  desc,
  director,
  date,
  duration,
  category,
  item,
}) {
  const { removeFromWatchlist,addToWatchlist, watchlist } = useContext(WatchlistContext);

  return (
    <div className="filmCard">
      <div className="filmCard_container">
        <div className="filmCard_container_image">
          <img src={image} alt="" />
        </div>
        <div className="filmCard_container_info">
          <div className="filmCard_container_info_top">
            <div className="title">
              <Link to={"/films/" + id}>
                {" "}
                <p>{title}</p>
              </Link>

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
            <div className="desc">
              <p>{desc.slice(0,450)}..</p>
            </div>
          </div>
          <div className="filmCard_container_info_bottom">
            <div className="leftSide">
              <div className="director same">
                <span>Director: </span>
                <p> {director}</p>
              </div>
              <div className="date same">
                <span>Date: </span>
                <p> {date}</p>
              </div>
              <div className="duration same">
                <span>Duration: </span>
                <p> {duration} min</p>
              </div>
            </div>
            <div className="rightSide">
              <button>{category}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilmCard;
