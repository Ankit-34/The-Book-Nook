import axios from "axios";
import React, { useEffect, useState } from "react";
import Cartbook from "./Cartbook";
import { useDispatch, useSelector } from "react-redux";
import { grandTotal, initializeCart } from "../Store/userSlice";
// import { UseSelector } from "react-redux";
const Cart = () => {
  const [cartList, setCartList] = useState();
  const [orderPlaced, setOP] = useState(""); 
  const dispatch = useDispatch();
  const final = useSelector((state) => state.user.grandTotal);
  const userId = useSelector((state) => state.user.id);
  const cartItems = useSelector((state) => state.user.items);
  // console.log("cartlist : ", userId);
  const fetchCart = async () => {
    const res = await axios.get(
      `https://book-e-sell-node-api.vercel.app/api/cart?userId=${userId}`
    );
    const result = await res.data.result;
    console.log("cart fetched: ", result);
    setCartList(result);
    let cartItems = [];
    result.map((item) => {

      cartItems.push({
        id: item.bookId,
        name: item.book.name,
        image: item.book.base64image,
        price: item.book.price,
        quantity: item.quantity,
      });
    });
    dispatch(initializeCart(cartItems));
    dispatch(grandTotal());
    // }
  };

  const placeOrder = async (e) => {
    const cartIds = cartItems.map(item => item.id);
    console.log("cart items ids : ", cartIds);
    e.preventDefault();
    const res = await axios.post(
      "https://book-e-sell-node-api.vercel.app/api/order",
      {
        userId: userId,
        cartIds: cartIds,
      }
    );
    // const d
    console.log(res.data);
    setOP("Your order placed successfully...")
  }

  useEffect(() => {
    fetchCart();
  }, [final]);

  return (
    <div className="cart_outer">
      {/* <Header /> */}

      <div className="cart_title">Your Cart Is Here...</div>

      <div classname="cart_container">
        {cartList !== undefined && cartList != [] ? (
          cartList.map((item) => {
            return <Cartbook book={item} />;
          })
        ) : (
          <h1>Empty!!</h1>
        )}
      </div>

      <div className="grandPrice">
        <p>Grand Total : {final} </p>
        <button className="place_order" onClick={(e)=>placeOrder(e)}>Place Order</button>
        <p>{orderPlaced}</p>
      </div>
    </div>
  );
};

export default Cart;
