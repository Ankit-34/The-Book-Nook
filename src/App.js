import React from "react";
import Login from "./components/Login";
import Protected from "./components/Protected";
import Register from "./components/Register";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from "./components/Cart";
import Header from "./components/Header";
import AddBook from "./components/AddBook"
import { Provider } from "react-redux";
import store from "./Store/store";

const App = () => {
  // const status = localStorage.getItem("isLoggedIn");
  localStorage.setItem("isLoggedIn", false);
      console.log("what!! in app", localStorage.getItem("isLoggedIn"));

  return (
    <div>
      <Provider store={store}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Protected Content={Home} />}></Route>
            <Route path="/add-book" element={<AddBook />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            {/* <Route path="/cart" element={<Protected Content={Cart} />}></Route> */}
            <Route path="/cart" element={<Cart />}></Route>
          </Routes>
        </Router>
      </Provider>
    </div>
  );
};

export default App;
