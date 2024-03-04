import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import "./AdminNav.scss"
function AdminNav() {
  return (
    <div className='adminNav'>
        <div className="adminNav_container">
            <Link to={"/"} className='logo'>Retro Archive</Link>
         <div className="adminNav_container_nav">
                <NavLink to={"/admin/films"}><i className="fa-solid fa-film"></i>  Films</NavLink>
                <NavLink to={"/admin/actors"}><i className="fa-solid fa-masks-theater"></i>  Actors</NavLink>
                <NavLink to={"/admin/users"}><i className="fa-solid fa-user"></i>  Users</NavLink>
                <NavLink to={"/admin/comments"}><i className="fa-solid fa-comments"></i> Comments</NavLink>

            </div>
        </div>
    </div>
  )
}

export default AdminNav