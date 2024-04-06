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
  TextField,
} from "@mui/material";

import Loader from "./Loader";

export default function ProductsListAPI() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  const [productsCount, setProductsCount] = useState(8);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    dispatch(fetchProducts(productsCount));
  }, [dispatch, productsCount]);

  const handleLoadMore = (count) => {
    setProductsCount(count);
  };

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(filterText.toLowerCase())
  );

  if (status === "loading") {
    return <Loader />;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <TextField
        type="text"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        placeholder="Search products..."
        margin="normal"
        InputProps={{ sx: { height: "40px" } }}
      />
      <Grid container spacing={2}>
        {filteredProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{ display: "flex", flexDirection: "column", height: "100%" }}
            >
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.title}
                sx={{ objectFit: "contain" }}
              />
              <CardContent
                sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
              >
                <Typography gutterBottom component="div">
                  {product.title}
                </Typography>

                <div style={{ marginTop: "auto" }}>
                  <Typography
                    variant="body2"
                    color="text.first"
                    noWrap
                    sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
                  >
                    {product.price}$
                  </Typography>
                  <Button variant="contained" href={`/products/${product.id}`}>
                    View Product
                  </Button>
                </div>
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
