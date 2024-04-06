import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Switch, FormControlLabel, TextField } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { updateFormData } from "../store/ProductsFormSlice";
import { useParams, useNavigate } from "react-router-dom";

function EditProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formDataList = useSelector((state) => state.form.formDataList);
  const product = formDataList.find((item) => item.id === id);

  const [initialValues, setInitialValues] = useState({
    name: "",
    price: "",
    description: "",
    published: false,
  });

  useEffect(() => {
    if (product) {
      setInitialValues({
        name: product.name,
        price: product.price,
        description: product.description,
        published: product.published,
      });
    }
  }, [product]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const updatedProduct = {
        ...values,
        id: product.id,
        createdAt: product.createdAt,
      };
      await fetch(`https://fakestoreapi.com/products/${product.id}`, {
        method: "PUT",
        body: JSON.stringify(updatedProduct),
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(updateFormData(updatedProduct));
      navigate("/products");
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>
      <h2>Edit Product</h2>
      <Formik
        initialValues={initialValues}
        enableReinitialize
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
              Save Changes
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default EditProductPage;
