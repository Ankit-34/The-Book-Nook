import React, { useState } from "react";
import "../style/Cartbook.css";
import axios from "axios";
import { update, remove, grandTotal } from '../Store/userSlice'
import { useDispatch } from "react-redux";

const Cartbook = ({ book }) => {
  // console.log("Got the book : ", book);
  const dispatch = useDispatch();
  // console.log("cart book : ", book);
  const [qnt, setQnt] = useState(book.quantity);

  const updateCart = async (opt) => {

    if (opt === "+") {
      setQnt((prev) => prev + 1);
      const res = await axios.put(
        "https://book-e-sell-node-api.vercel.app/api/cart",
        {
          id: book.id,
          bookId: book.bookId,
          userId: book.userId,
          quantity: qnt+1,
        }
      );
    dispatch(update({
      id: book.bookId,
      count: qnt+1
    }));
    dispatch(grandTotal());
      console.log("updated : ", res);
    } else if (qnt > 1) {
      setQnt((prev) => prev - 1);
      const res = await axios.put(
        "https://book-e-sell-node-api.vercel.app/api/cart",
        {
          id: book.id,
          bookId: book.bookId,
          userId: book.userId,
          quantity: qnt-1,
        }
        );
        dispatch(
          update({
            id: book.bookId,
            count: qnt - 1,
          })
        );
        dispatch(grandTotal());
        console.log("updated : ", res);
    }
    

  };

  const deleteItem = async (id, apiId, e) => {
    e.preventDefault();
    console.log("del : ", id);
    dispatch(remove(id));
    dispatch(grandTotal());
    console.log("deleting : ", id);
    const res = await axios.delete(
      `https://book-e-sell-node-api.vercel.app/api/cart?id=${apiId}`
    );
    console.log("deleted : ", res.data);
      
  };


  return (
    <>
      <div className="cb">
        <img src={book.book.base64image} alt="img" />
        <div className="cb_name"> {book.book.name} </div>
        <div className="cb_price"> {book.book.price} /-</div>
        <div className="adjust">
          <button onClick={() => updateCart("+")}>+</button>
          {/* <p>{book.quantity}</p> */}
          <p>{qnt}</p>
          <button onClick={() => updateCart("-")}>-</button>
          <p
            style={{ color: "red", cursor: "pointer" }}
            onClick={(e) => deleteItem(book.bookId, book.id, e)}
          >
            Remove
          </p>
        </div>
      </div>
    </>
  );
};

export default Cartbook;
