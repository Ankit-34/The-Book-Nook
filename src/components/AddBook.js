import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'

const AddBook = () => {

    const initialValues = {
      name: "",
      description: "",
      price: "",
      categoryId: "",
      base64image: "",
    };

    const hanadleAddBook = (bookDetails) => {
      var config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://book-e-sell-node-api.vercel.app/api/book",
        headers: {},
        data: bookDetails,
      };
      axios(config)
        .then((res) => {
          console.log("Book added : ", res.data.result);
        })
        .catch((err) => {
          console.log("Book Not Added : ", err);
        });
    };

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
      useFormik({
        initialValues: initialValues,
        onSubmit: (values, action) => {
          console.log("Add-book values : ", values);
          hanadleAddBook(values);
          action.resetForm();
        },
      });

      const convert64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
      };

  return (
    <div>
      <form className="form-container" onSubmit={handleSubmit}>
        <TextField
          name="name"
          label="Name"
          variant="outlined"
          size="small"
          type="text"
          className="name"
          value={values.name}
          onBlur={handleBlur}
          onChange={handleChange}
        ></TextField>
        <TextField
          name="description"
          label="Description"
          variant="outlined"
          size="small"
          type="text"
          className="desc"
          value={values.description}
          onBlur={handleBlur}
          onChange={handleChange}
        ></TextField>
        <TextField
          name="price"
          label="Price"
          variant="outlined"
          size="small"
          type="number"
          className="price"
          value={values.price}
          onBlur={handleBlur}
          onChange={handleChange}
        ></TextField>
        <TextField
          name="categoryId"
          label="Category Id"
          variant="outlined"
          size="small"
          type="number"
          className="catid"
          value={values.categoryId}
          onBlur={handleBlur}
          onChange={handleChange}
        ></TextField>
        <TextField
          error={!!errors.base64}
          id="base64"
          name="base64image"
          variant="outlined"
          type="file"
          sx={{ width: "80%" }}
          onBlur={handleBlur}
          onChange={async (e) => {
            const file = e.target.files[0];
            const ext = file.name.split(".").pop(); 
            if (ext !== "jpg" && ext !== "jpeg" && ext !== "png") {
              console.log("Only images are allowe!!");
              e.target.value = "";
              values.base64 = "";
            } else {
              const base64 = await convert64(file);
                // setBase(base64);
              //   console.log(base64);
              values.base64image = await base64;
            }
          }}
        ></TextField>
        {/* {errors.email && touched.email ? <p> {errors.email} </p> : null} */}

        <Button variant="outlined" className="add-book" type="submit">
          Add Book
        </Button>
      </form>
    </div>
  );
}

export default AddBook