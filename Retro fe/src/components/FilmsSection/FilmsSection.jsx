import React, { useContext, useEffect, useState } from "react";
import "./FilmsSection.scss";
import FilmCard from "./FilmCard/FilmCard";
import { Link } from "react-router-dom";
import { WatchlistContext } from "../../context/WatchlistContext";
function FilmsSection() {
  const [dbData, setDbData] = useState([]);
  const {watchlist} = useContext(WatchlistContext)

  async function fetchData() {
    const response = await fetch("https://retroarchivev2-0.onrender.com/film");
    const data = await response.json();
    setDbData(data);
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="films">
      <div className="films_container">
      
        {
            dbData.slice(0,5).map((item)=>
            <FilmCard key={item._id}
            id={item._id}
          image={item.image}
          title={item.title}
          desc={item.desc}
          director={item.director}
          date={item.date}
          duration={item.duration}
          category={item.category}
          item={item}
        />
            )
        }
        <div className="link">
          <p>
            
            <Link to={"/films"}>ALL Films <i className="fa-solid fa-arrow-right"></i></Link>
            
            </p>

        </div>
        
      </div>
    </div>
  );
}

export default FilmsSection;
