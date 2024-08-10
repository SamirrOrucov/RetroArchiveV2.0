import React, { useEffect, useState } from "react";
import "./OldFilmsComponents.scss";
import OldFilmsCard from "./OldFilmsCard/OldFilmsCard";

function OldFilmsComponents() {
  const [dbData, setDbData] = useState([]);
  const [ratingsData, setRatingsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filmsPerPage] = useState(6);
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  async function fetchData() {
    const response = await fetch("https://retroarchivev2-0.onrender.com/film");
    const data = await response.json();
    setDbData(data);
  }

  function handleDataFromChild(data) {
    setRatingsData(data);
    console.log(data);
  }
  window.onbeforeunload = function () {
    window.scrollTo(0,0);
};
  useEffect(() => {
    fetchData();
  }, []);
  const indexOfLastFilm = currentPage * filmsPerPage;
  const indexOfFirstFilm = indexOfLastFilm - filmsPerPage;

  const filteredProducts =
    category === "All"
      ? dbData
      : dbData.filter((item) => item.category === category);

  const sortedProducts = sortBy
    ? filteredProducts.sort((a, b) => {
        if (sortOrder === "asc") {
          return a[sortBy] > b[sortBy] ? 1 : -1;
        } else {
          return a[sortBy] < b[sortBy] ? 1 : -1;
        }
      })
    : filteredProducts;

  const currentFilms = sortedProducts.slice(indexOfFirstFilm, indexOfLastFilm);
  const totalPages = Math.ceil(filteredProducts.length / filmsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handleCategoryClick = (category) => {
    setCategory(category);
    setCurrentPage(1);
  };

  const handleSortChange = (sort, order) => {
    if (ratingsData === sort) {
      setSortOrder(order === "asc" ? "desc" : "asc");
    } else {
      setSortBy(sort);
      setSortOrder("asc");
    }
    const sortedFilms = ratingsData
      ? filteredProducts.sort((a, b) => {
          if (order === "asc") {
            return a[ratingsData] > b[ratingsData] ? 1 : -1;
          } else {
            return a[ratingsData] < b[ratingsData] ? 1 : -1;
          }
        })
      : filteredProducts;
    setSortedData(sortedFilms);
  };
  return (
    <div className="oldFilms">
      <div className="oldFilms_container">
        <div className="oldFilms_container_top">
          <h1>OLD FILMS</h1>
        </div>
        <div className="oldFilms_container_bottom">
          <div className="categorySide">
            <p>CATEGORIES</p>
         
            <div className="types">
              <button onClick={() => handleCategoryClick("All")}>ALL</button>
              <button onClick={() => handleCategoryClick("dram")}>DRAMA</button>
              <button onClick={() => handleCategoryClick("komediya")}>
                COMEDY
              </button>
              <button onClick={() => handleCategoryClick("war")}>WAR</button>
            </div>
          </div>
          <div className="cards">
            {currentFilms.map((item, index) => (
              <OldFilmsCard
                sendDataToParent={handleDataFromChild}
                key={index}
                year={item.date}
                category={item.category}
                image={item.image}
                title={item.title}
                desc={item.desc}
                duration={item.duration}
                item={item}
                rating={item.rating}
              />
            ))}
          </div>
          <div className="pagination">
            <div className="container">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  className={currentPage === i + 1 ? "active" : ""}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OldFilmsComponents;
