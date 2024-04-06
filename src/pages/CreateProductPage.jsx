import React from "react";
import axios from "axios";
import { Button, FormControlLabel, Switch, TextField } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { addFormData } from "../store/ProductsFormSlice";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

function CreateProductPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const product = { ...values, id: uuidv4() };
      const response = await axios.post(
        "https://fakestoreapi.com/products",
        product
      );
      console.log("Product created successfully:", response.data);
      resetForm();
      dispatch(addFormData(product));
      navigate("/products");
    } catch (error) {
      console.error("Error creating product:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const validatePrice = (value) => {
    let error;
    if (!value) {
      error = "Required";
    } else if (isNaN(value)) {
      error = "Must be a number";
    }
    return error;
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>
      <h2>Create Product</h2>
      <Formik
        initialValues={{
          name: "",
          price: "",
          description: "",
          published: false,
          createdAt: new Date().toISOString(),
        }}
        onSubmit={handleSubmit}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = "Required";
          }
          if (!values.price) {
            errors.price = "Required";
          } else if (isNaN(values.price)) {
            errors.price = "Must be a number";
          }
          if (!values.description) {
            errors.description = "Required";
          }
          return errors;
        }}
      >
        {({ isSubmitting }) => (
          <Form style={{ display: "flex", flexDirection: "column" }}>
            <Field
              name="name"
              as={TextField}
              label="Name"
              fullWidth
              required
              margin="normal"
            />
            <ErrorMessage
              name="name"
              component="div"
              style={{ color: "red" }}
            />

            <Field
              name="price"
              as={TextField}
              label="Price"
              fullWidth
              required
              margin="normal"
              validate={validatePrice}
            />
            <ErrorMessage
              name="price"
              component="div"
              style={{ color: "red" }}
            />

            <Field
              name="description"
              as={TextField}
              label="Description"
              fullWidth
              required
              margin="normal"
            />
            <ErrorMessage
              name="description"
              component="div"
              style={{ color: "red" }}
            />

            <FormControlLabel
              control={<Field name="published" type="checkbox" as={Switch} />}
              label="Published"
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              variant="contained"
              color="primary"
              style={{ marginTop: "20px" }}
            >
              Create
            </Button>

            <ErrorMessage
              name="submit"
              component="div"
              style={{ color: "red" }}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CreateProductPage;
