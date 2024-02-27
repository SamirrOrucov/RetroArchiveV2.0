import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Actors.scss";
function Actors() {
  const [dbData, setDbData] = useState([]);
  async function fetchData() {
    const response = await fetch("http://localhost:3003/actor/");
    const data = await response.json();
    setDbData(data);
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="actors">
      <div className="actors_container">
        <div className="headTitle">
          <h1>Actors</h1>
        </div>
        <div className="actors_container_cards">
          {
            dbData.map((item)=>
            
            <div className="actors_container_cards_card">
            <div className="actors_container_cards_card_container">
              <div className="leftSide">
                <div className="image">
                  <img src={item.image} alt="" />
                </div>
                <div className="name">
                  <p>{item.name}</p>
                </div>
              </div>
              <div className="rightSide">
                <div className="location">
                  <p>
                    <span>City: </span>
                    {item.city}
                  </p>
                </div>
                <Link to={"/actors/"+item._id}>
                  About <i class="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
            )
          }
          
        </div>
      </div>
    </div>
  );
}

export default Actors;
