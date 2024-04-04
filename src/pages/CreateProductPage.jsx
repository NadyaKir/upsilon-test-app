import React from "react";
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateFormData } from "../store/ProductsSlice";

function CreateProductPage() {
  const dispatch = useDispatch();

  const handleSubmit = async (
    values,
    { setSubmitting, setErrors, resetForm }
  ) => {
    try {
      const response = await axios.post(
        "https://fakestoreapi.com/products",
        values
      );
      console.log("Product created successfully:", response.data);
      resetForm(); // Сброс формы
    } catch (error) {
      console.error("Error creating product:", error);
      if (error.response) {
        setErrors({
          submit: "Failed to create product. Please try again later.",
        });
      } else if (error.request) {
        setErrors({
          submit: "Network error. Please check your internet connection.",
        });
      } else {
        setErrors({
          submit: "An unexpected error occurred. Please try again later.",
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
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
          }
          if (!values.description) {
            errors.description = "Required";
          }
          return errors;
        }}
      >
        {({ isSubmitting }) => (
          <Form>
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
              control={<Field name="published" type="checkbox" as={Checkbox} />}
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
