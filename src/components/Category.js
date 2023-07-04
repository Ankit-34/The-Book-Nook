import axios from "axios";
import '../style/Category.css'
import React, { useEffect, useState } from "react";

const Category = () => {
  const [category, setCategory] = useState([]);

  const fetchCategoryList = async () => {
    const res = await axios.get(
      "https://book-e-sell-node-api.vercel.app/api/category/all"
    );

    const result = await res.data.result;
    setCategory(result.slice(0, 12));
    // console.log("cats are here: ", result);
  };

  const fetchBooks = async (catId) => {
    const res = await axios.get(
      `https://book-e-sell-node-api.vercel.app/api/category/byId?id=${catId}`
    );

    const result = await res.data;
    console.log("book list :" , result);
  }

  useEffect(() => {
    fetchCategoryList();
  }, []);

  return (
    <div>
        <h2 style={{width: '100%', textAlign: 'center', letterSpacing: '2px'}}>We Provide a Wide Range Of Categories</h2>
      <div className="catList">
        {category.map((cat) => {
          return <p>{cat.name}</p>;
        })}
      </div>
    </div>
  );
};

export default Category;
