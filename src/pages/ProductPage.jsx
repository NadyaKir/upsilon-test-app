import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../store/ProductsAPISlice";
import {
  Box,
  Typography,
  Card,
  CircularProgress,
  CardMedia,
  Button,
  Container,
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
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  const product = products.find((product) => product.id === parseInt(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h3" gutterBottom>
        {product.title}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {product.description}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Price: {product.price}$
      </Typography>
      <Card sx={{ maxWidth: 400, marginBottom: 2 }}>
        <CardMedia component="img" image={product.image} alt={product.title} />
      </Card>
      <Button href={`/products`} variant="contained">
        Back to Products
      </Button>
    </Container>
  );
}

export default ProductPage;
