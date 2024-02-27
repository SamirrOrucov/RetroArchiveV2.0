import React, { useEffect, useState } from "react";
import "./Header.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

function Header() {
  const [dbData, setDbData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3003/film/");
        const data = await response.json();
        setDbData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const firstFilmTitle = dbData.length > 0 ? dbData[1].title : "";
  const firstFilmimage = dbData.length > 0 ? dbData[1].image : "";
  const firstFilmDesc = dbData.length > 0 ? dbData[1].desc : "";

  return (
    <div className="header">
      <div className="header_container">
        <div className="topPart">
          <div className="upperText">
            <h6>FILM & AZE</h6>
          </div>
          <div className="slider">
            <Swiper
              slidesPerView={5}
              spaceBetween={10}
              loop={true}
              breakpoints={{
                75: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                575: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 60,
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 60,
                },
              }}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              modules={[Autoplay, Pagination]}
              className="mySwiper"
            >
              {dbData.map((item, index) => (
                <SwiperSlide key={index}>
                  <Link to={"/films/"+item._id}>
                    {item.title} <span>-</span>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div className="bottomPart">
          <div className="bottomPart_container">
             <div className="top">
             <div className="title">
                <h5>{firstFilmTitle}</h5>
              </div>
              <div className="desc">
                <p>{firstFilmDesc?.slice(0,490)}..</p>
              </div>  
             </div>
              <div className="image">
                <img src={firstFilmimage} alt="" /> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
