import React from "react";
import "../style/Card.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../Store/userSlice";

const Card = ({ book }) => {
  // console.log("book here :" , book);
  const userId = useSelector(state => state.user.id)
  // console.log("in cart : ", userId);
  const dispatch = useDispatch();
  const addToCart = () => {
    console.log("Added to Cart");

    axios.post("https://book-e-sell-node-api.vercel.app/api/cart", {
      bookId: book.id,
      userId: userId,
      quantity: 1,
    }).then(res => {
      console.log("Added new : ", res);
    }).catch(err => {
      console.log("New Err : ", err);
    });

    dispatch(
      add({
        id: book.id,
        name: book.name,
        image: book.base64image,
        price: book.price,
        quantity: 1,
      })
    );
  };

  return (
    <div className="bookCard">
      <div className="bookImg">
        <img src={book.base64image} alt="img" />
      </div>
      <div className="bookContent">
        <p className="bookName">{book.name}</p>
        <p className="bookPrice">{book.price} /- </p>
        <button onClick={addToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default Card;
