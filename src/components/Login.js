import React, { useState } from "react";
import "../style/Login.css";
import { Link } from "react-router-dom";
import schema from "../Schema/Login_Schema";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../Store/userSlice";

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem("isLoggedIn"))
  );
  const dispatch = useDispatch();
  const addUserDetail = (userDetails) => {
    dispatch(setUserData(userDetails));
  };
  const hanadleLogin = (userDetails) => {
    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://book-e-sell-node-api.vercel.app/api/user/login",
      headers: {},
      data: userDetails,
    };
    axios(config)
      .then((res) => {
        console.log("Login Done : ", res.data.result);
        localStorage.setItem("isLoggedIn", true);
        addUserDetail(res.data.result);
        navigate("/");
      })
      .catch((err) => {
        console.log("Not logged in : ", err);
        setIsLoggedIn(true);
      });
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: schema,
      onSubmit: (values, action) => {
        console.log("Login values : ", values);
        hanadleLogin(values);
        action.resetForm();
      },
    });

  // console.log(errors);
  return (
    <div>
      {" "}
      {/* {isLoggedIn && <h3>Already LoggedIn...Logout First </h3>} */}{" "}
      <h1> Login </h1>{" "}
      <form className="form-container" onSubmit={handleSubmit}>
        <TextField
          name="email"
          label="Email"
          variant="outlined"
          size="small"
          type="email"
          className="lemail"
          value={values.email}
          onBlur={handleBlur}
          onChange={handleChange}
        ></TextField>{" "}
        {errors.email && touched.email ? <p> {errors.email} </p> : null}{" "}
        <TextField
          name="password"
          label="Password"
          variant="outlined"
          size="small"
          type="password"
          className="lpassword"
          value={values.password}
          onBlur={handleBlur}
          onChange={handleChange}
        ></TextField>{" "}
        {errors.password && touched.password ? (
          <p> {errors.password} </p>
        ) : null}{" "}
        <Button variant="outlined" className="btn-register" type="submit">
          Login{" "}
        </Button>{" "}
        {isLoggedIn && <h3 style={{ color: "red" }}> Login Failed... </h3>}{" "}
      </form>{" "}
      <div>
        <p>
          Don 't Have an account ?<Link to="/register">Create Now</Link>{" "}
        </p>{" "}
      </div>{" "}
    </div>
  );
};

export default Login;
