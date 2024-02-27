import React from "react";
import FilmsDetailComponent from "../../components/FIlmsDetailComponent/FilmsDetailComponent";
import { Link } from "react-router-dom";
import "./FilmsDetail.scss"
function FilmsDetail() {
  return (
    <div className="filmsDetail">
      <div className="filmsDetail_container">
        <div className="filmsDetail_container_top">
          <Link to={"/films"}>
            <i className="fa-solid fa-arrow-left"></i> Go Back
          </Link>
          <p>Films</p>
        </div>
        <div className="detail">
          <FilmsDetailComponent />
        </div>
      </div>
    </div>
  );
}

export default FilmsDetail;
