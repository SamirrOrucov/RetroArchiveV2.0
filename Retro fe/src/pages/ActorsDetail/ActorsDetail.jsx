import React from "react";
import { Link } from "react-router-dom";
import ActorsDetailComponent from "../../components/ActorsDetailComponent/ActorsDetailComponent";
import "./ActorsDetail.scss";
function ActorsDetail() {
  return (
    <div className="actorsDetail">
      <div className="actorsDetail_container">
        <div className="actorsDetail_container_top">
          <Link to={"/actors"}>
            <i className="fa-solid fa-arrow-left"></i> Go Back
          </Link>
          <p>ACTORS</p>
        </div>
        <div className="detail">
          <ActorsDetailComponent />
        </div>
      </div>
    </div>
  );
}

export default ActorsDetail;
