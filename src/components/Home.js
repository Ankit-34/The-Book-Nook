import React, { useEffect } from "react";
import "../style/Home.css";
import coverImg from "../assets/cover-img.jpg";
import Header from "./Header";
import Footer from './Footer'
import axios from "axios";
// import books from "../assets/Books";
// import Card from "./Card";

const Home = () => {

  const fetchCategoryList = async () => {
    const res = await axios.get("https://book-e-sell-node-api.vercel.app/api/category/all");
    console.log("cats are : ", res.data);

   }
  // const [cartCount, setCartCount] = useState(0);
  useEffect(()=>{
    fetchCategoryList();
  }, []);

  return (
    <div>
      {/* <User.Provider value={user}> */}
        <Header />

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

        <div>
          <h2 style={{textAlign: 'center', width: '100%'}}>UNDER DEVELOPMENT...</h2>
        </div>

        {/* <div className="cards">
          {books.map((book) => {
            return (
              <Card
                book={book}
              />
            );
          })}
        </div> */}
        <Footer />
    {/* </User.Provider> */}
    </div>
  );
};

export default Home;

