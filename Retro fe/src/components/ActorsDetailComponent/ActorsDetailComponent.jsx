import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ActorsDetailComponent.scss";
function ActorsDetailComponent() {
  const { id } = useParams();
  const [dbData, setDbData] = useState([]);
  async function fetchData() {
    const response = await fetch("http://localhost:3003/actor/" + id);
    const data = await response.json();
    setDbData(data);
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="actorsDetailComponent">
      {
        <div className="actorsDetailComponent_container">
          <div className="image">
            <img src={dbData.image} alt="" />
          </div>
          <div className="info">
            <div className="name">
              <p>{dbData.name}</p>
            </div>
            <div className="desc">
              <p>{dbData.desc}</p>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default ActorsDetailComponent;
