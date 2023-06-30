import React from "react";
import Login from "./components/Login";
import Protected from "./components/Protected";
import Register from "./components/Register";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  localStorage.setItem("isLoggedIn", false);
      console.log("what!! in app", localStorage.getItem("isLoggedIn"));

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Protected Content={Home} />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        {/* <Route path="/cart" element={<Protected Content={Cart} />}></Route> */}
      </Routes>
    </Router>
  );
};

export default App;
