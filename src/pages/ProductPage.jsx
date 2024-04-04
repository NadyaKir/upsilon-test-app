import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../store/ProductsAPISlice";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";

function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  const product = products.find((product) => product.id === parseInt(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <Typography variant="h3" gutterBottom>
        Title: {product.title}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Description: {product.description}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Price: {product.price}
      </Typography>
      <Card sx={{ maxWidth: 400 }}>
        <CardMedia component="img" image={product.image} alt={product.title} />
      </Card>
      <Button href={`/products`} variant="contained">
        Back to Products
      </Button>
    </div>
  );
}

export default ProductPage;
