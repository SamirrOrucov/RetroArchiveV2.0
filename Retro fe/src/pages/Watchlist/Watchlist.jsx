import React, { useContext, useEffect, useState } from "react";
import { WatchlistContext } from "../../context/WatchlistContext";
import "./Watchlist.scss";
import { Link } from "react-router-dom";

function Watchlist() {
  const { watchlist, removeFromWatchlist } = useContext(WatchlistContext);
  const [filmData, setFilmData] = useState([]);

  async function fetchFilm() {
    try {
      const filmPromises = watchlist.map(async (filmId) => {
        const response = await fetch(`https://retroarchivev2-0.onrender.com/film/${filmId}`);

        if (response.ok) {
          const responseData = await response.json();
          return responseData;
        } else {
          console.error(
            `Failed to fetch film with ID ${filmId}: ${response.statusText}`
          );
          return null;
        }
      });
      console.log(filmPromises);
      const filmDataArray = await Promise.all(filmPromises);
      console.log(filmPromises);
      setFilmData(filmDataArray.filter((film) => film !== null));
    } catch (error) {
      console.error("Error fetching film data:", error);
    }
  }

  useEffect(() => {
    fetchFilm();
  }, [watchlist]);

  return (
    <div className="watchlist">
      <div className="watchlist_container">
        <div className="watchlist_container_cards">
          {filmData.length ? (
            filmData.map((item) => (
              <div key={item._id} className="watchlist_container_cards_card">
                <div className="top">
                  <div className="year">
                    <button
                      onClick={() => removeFromWatchlist(item)}
                      className="addedWatchlist"
                    >
                      Added
                    </button>
                  </div>
                  <div className="category">
                    <button>{item.category}</button>
                  </div>
                </div>
                <div className="image">
                  <img src={item.image} alt="" />
                </div>
                <div className="middle">
                  <div className="title">
                    <Link to={"/films/" + item._id}>
                      <p>{item.title}</p>
                    </Link>
                  </div>
                  <div className="desc">
                    {item.desc?.slice(0, 440)}
                    ..
                  </div>
                </div>
                <div className="duration">
                  <p>
                    <span>Duration: </span>
                    {item.duration} min
                  </p>
                </div>
              </div>
            ))
          ) : (
            <h1>Watchlist is empty..</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default Watchlist;
