import React from "react";
import Header from "../../components/HeaderCompononet/Header";
import FilmsSection from "../../components/FilmsSection/FilmsSection";
import ActorsSection from "../../components/ActorsSection/ActorsSection";

function HomePage() {
  return (
    <div>
      <Header />
      <FilmsSection />
      <ActorsSection />
    </div>
  );
}

export default HomePage;
