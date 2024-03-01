import React, { useState, useContext, useEffect } from "react";
import "./Navbar.scss";
import { Link, NavLink } from "react-router-dom";
import { UserTokenContext } from "../../context/UserTokenContext";
import UserProfile from "../../components/UserProfile/UserProfile";

function Navbar() {
  const { decodedToken, logout, addToken } = useContext(UserTokenContext);
  const [showProfile, setShowProfile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [stickyNav, setStickyNav] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);

    return () => {
      window.removeEventListener("scroll", stickNavbar);
    };
  }, []);
  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      windowHeight > 100 ? setStickyNav(true) : setStickyNav(false);
    }
  };
  return (
    <div className={`navbar  ${stickyNav ? "fixed" : ""}`}>
      <div className="navbar_container">
        <div className="logo">
          <Link to={"/"}>AZEFILMS</Link>
        </div>
        <div className="links">
          <NavLink to={"/films"}>Films</NavLink>
          <NavLink to={"/actors"}>Actors</NavLink>

          <div className="line"></div>
          {decodedToken ? (
            <>
              <p
                onClick={() => setShowProfile(!showProfile)}
                className="settings"
              >
                {showProfile ? (
                  <i className="fa-solid fa-xmark"></i>
                ) : (
                  <>
                    <i className="fa-solid fa-bars"></i> Settings
                  </>
                )}
              </p>
              {showProfile ? <UserProfile /> : ""}
            </>
          ) : (
            <NavLink to={"/login"}>
              Log in <i className="fa-solid fa-user"></i>
            </NavLink>
          )}
        </div>

        <div className={isOpen ? "responsiveNav isOpen" : "responsiveNav"}>
          <NavLink to={"/films"} onClick={() => setIsOpen(!isOpen)}>
            Films
          </NavLink>
          <NavLink to={"/actors"} onClick={() => setIsOpen(!isOpen)}>
            Actors
          </NavLink>
          <div className="icons">
            <Link>
              <i className="fa-brands fa-instagram"></i>
            </Link>
            <Link>
              <i className="fa-brands fa-x-twitter"></i>
            </Link>
            <Link>
              <i className="fa-brands fa-youtube"></i>
            </Link>
            <Link>
              <i className="fa-solid fa-rss"></i>
            </Link>
          </div>
        </div>
        <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          <i className="fa-light fa-bars"></i>
        </div>
      </div>
    </div>
  );
}

export default Navbar;