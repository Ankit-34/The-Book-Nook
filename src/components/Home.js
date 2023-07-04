import React, { useEffect } from "react";
import "../style/Home.css";
import coverImg from "../assets/cover-img.jpg";
import Header from "./Header";
import Footer from './Footer'
// import axios from "axios";
import Category from "./Category";
import BookList from "./BookList";
// import books from "../assets/Books";
// import Card from "./Card";

const Home = () => {

  return (
    <div>
      {/* <Header /> */}

      <div className="container">
        <div className="left_part">
          <div style={{ width: "90%" }}>
            <p className="tagline">
              Find Your Best Friend..
              <button>Explore Now</button>
            </p>
          </div>
        </div>
        <div className="right_part">
          <img src={coverImg} alt="cover_image" />
        </div>
      </div>

      <Category />

      <BookList />

      <Footer />
    </div>
  );
};

export default Home;

