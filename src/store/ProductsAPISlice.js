import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",

  async (count) => {
    if (count) {
      const response = await axios.get(
        `https://fakestoreapi.com/products?limit=${count}`
      );
      return response.data;
    } else {
      const response = await axios.get(`https://fakestoreapi.com/products`);
      return response.data;
    }
  }
);

const ProductsFormSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default ProductsFormSlice.reducer;
