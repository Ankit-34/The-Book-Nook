import React from "react";
import "../style/Register.css";
import "../style/Login.css";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import schema from "../Schema/Register_Schema";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import axios from "axios";

const initialValues = {
  email: "",
  firstname: "",
  lastname: "",
  role: "",
  password: "",
  cnf_password: "",
};

const Register = () => {
  const navigate = useNavigate();
  const handleRegister = (userDetails) => {
      const payload = {
        firstName: userDetails.firstname,
        lastName: userDetails.lastname,  
        email: userDetails.email,
        roleId: (userDetails.role==="seller" ? 2 : 3),
        password: userDetails.password,
      };
      // const payload = {
      //   firstName: "testiinggg",
      //   lastName: "test",
      //   email: "testingguser@gmail.com",
      //   roleId: 2,
      //   password: "tests",    
      // };
    console.log("payload :", payload);
    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://book-e-sell-node-api.vercel.app/api/user",
      headers: {},
      data: payload,
    };
    axios(config)
      .then((res) => {
        console.log("register Done : ", res.data);
        // localStorage.setItem("isLoggedIn", true);
        navigate("/login");
        // setIsLoggedIn(false);
      })
      .catch((err) => {
        console.log("Not registered : ", err);
        // setIsLoggedIn(true);
      });
  };
  
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: schema,
      onSubmit: (values, action) => {
        console.log(values);
        localStorage.setItem("user_info", JSON.stringify(values));
        handleRegister(values);
        action.resetForm();
      },
    });

  // console.log(errors);
  return (
    <div>
      <h1> Register </h1>{" "}
      <form className="form-container" onSubmit={handleSubmit}>
        <TextField
          name="email"
          label="Email"
          variant="outlined"
          size="small"
          type="email"
          className="remail"
          value={values.email}
          onBlur={handleBlur}
          onChange={handleChange}
        ></TextField>{" "}
        {errors.email && touched.email ? <p> {errors.email} </p> : null}{" "}
        <TextField
          name="firstname"
          label="First Name"
          variant="outlined"
          size="small"
          type="text"
          className="fname"
          value={values.firstname}
          onBlur={handleBlur}
          onChange={handleChange}
        ></TextField>{" "}
        {errors.firstname && touched.firstname ? (
          <p> {errors.firstname} </p>
        ) : null}{" "}
        <TextField
          name="lastname"
          label="Lastname"
          variant="outlined"
          size="small"
          type="text"
          className="lname"
          value={values.lastname}
          onBlur={handleBlur}
          onChange={handleChange}
        ></TextField>{" "}
        {errors.lastname && touched.lastname ? (
          <p> {errors.lastname} </p>
        ) : null}{" "}
        <TextField
          name="password"
          label="Password"
          variant="outlined"
          size="small"
          type="password"
          className="rpassword"
          value={values.password}
          onBlur={handleBlur}
          onChange={handleChange}
        ></TextField>{" "}
        {errors.password && touched.password ? (
          <p> {errors.password} </p>
        ) : null}{" "}
        <TextField
          name="cnf_password"
          label=" Confirm Password"
          variant="outlined"
          size="small"
          type="password"
          className="cnf-rpassword"
          value={values.cnf_password}
          onBlur={handleBlur}
          onChange={handleChange}
        ></TextField>
        {errors.cnf_password && touched.cnf_password ? (
          <p> {errors.cnf_password} </p>
        ) : null}
        <InputLabel id="demo-simple-select-label"> Role </InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          name="role"
          label="Role"
          value={values.role}
          onBlur={handleBlur}
          onChange={handleChange}
          style={{ width: "100px" }}
        >
          <MenuItem value="buyer" defaultChecked>
            Buyer
          </MenuItem>
          <MenuItem value="seller"> Seller </MenuItem>
        </Select>
        <Button variant="outlined" className="btn-register" type="submit">
          Submit
        </Button>
      </form>
      <div>
        <p>
          Already Have an account ?<Link to="/login">Login Now</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
