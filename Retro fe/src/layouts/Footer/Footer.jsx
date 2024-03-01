import React from 'react'
import "./Footer.scss"
import { NavLink } from 'react-router-dom'
function Footer() {
  return (
    <div className='footer'>
      <div className="footer_container">
        <div className="input"><input type="text" placeholder='Email' /> <button>Abunə Ol</button></div>
          <div className="social">
          <i className="fa-brands fa-square-facebook"></i>
          <i className="fa-brands fa-tiktok"></i>
          <i className="fa-brands fa-instagram"></i>
          <i className="fa-brands fa-youtube"></i>
          <i className="fa-brands fa-x-twitter"></i>
          
          </div>
          <div className="pageLinks">
            <NavLink to={"/films"}>Retro Films <i className="fa-solid fa-arrow-up-right-from-square"></i></NavLink>
            <NavLink to={"/musics"}>Film Musics <i className="fa-solid fa-arrow-up-right-from-square"></i></NavLink>
            <NavLink to={"/actors"}>Actors <i className="fa-solid fa-arrow-up-right-from-square"></i> </NavLink>

          </div>
          <p>Azərbaycan Retro Filmləri @2024</p>
      </div>
    </div>
  )
}

export default Footer