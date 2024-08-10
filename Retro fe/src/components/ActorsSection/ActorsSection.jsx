import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ActorCard from "./ActorCard/ActorCard";
import "./ActorsSection.scss";
function ActorsSection() {
  const [dbData, setDbData] = useState([]);
  async function fetchData() {
    const response = await fetch("https://retroarchivev2-0.onrender.com/actor/");
    const data = await response.json();
    setDbData(data);
  }
  
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="actors">
      <div className="actors_container">
        <div className="actors_container_top">
          <p className="actors">Actors</p>
          <div className="link">
            <p>
              <Link to={"/actors"}>
                ALL <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </p>
          </div>
        </div>
        <div className="actors_container_cards">
          {dbData.slice(0, 6).map((item) => (
            <ActorCard
              key={item._id}
              id={item._id}
              image={item.image}
              name={item.name}
              city={item.city}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ActorsSection;
