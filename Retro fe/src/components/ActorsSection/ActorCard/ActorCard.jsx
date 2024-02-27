import React from 'react'
import "./ActorCard.scss"
import { Link } from 'react-router-dom'

function ActorCard({id,image,name,city}) {
  return (
    <div className='actorCard'>
      <div className="actorCard_container">
        <div className="image">
          <img src={image} alt="" />
        </div>
        <div className="info">
          <div className="name">
            <Link to={"/actors/"+id}><p>{name}</p></Link>
          </div>
          <div className="location">
            <p><span>City:</span>{city}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ActorCard