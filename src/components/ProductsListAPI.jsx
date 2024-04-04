import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../store/ProductsAPISlice";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";

export default function ProductsListAPI() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  const [productsCount, setProductsCount] = useState(8);

  useEffect(() => {
    dispatch(fetchProducts(productsCount));
  }, [dispatch, productsCount]);

  const handleLoadMore = (count) => {
    setProductsCount(count);
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{ display: "flex", flexDirection: "column", height: "100%" }}
            >
              <CardMedia
                component="img"
                height="140"
                image={product.image}
                alt={product.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom component="div">
                  {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.price}
                </Typography>
                <Button variant="contained" href={`/products/${product.id}`}>
                  View Product
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <div>
        <Button onClick={() => handleLoadMore(8)}>Load 8 Products</Button>
        <Button onClick={() => handleLoadMore(16)}>Load 16 Products</Button>
        <Button onClick={() => handleLoadMore(20)}>Load All Products</Button>
      </div>
    </div>
  );
}
