import React from "react";
import "./NoPage.scss";
import { Link } from "react-router-dom";
function NoPage() {
  return (
    <div className="notfound">
      <div className="notfound_container">
        <h6>404 Page Not Found!</h6>
        <Link to={"/"}>Back to HomePage</Link>
      </div>
    </div>
  );
}

export default NoPage;
