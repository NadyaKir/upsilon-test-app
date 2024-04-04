import { configureStore } from "@reduxjs/toolkit";
import ProductsAPISlice from "./ProductsAPISlice";
import ProductsSlice from "./ProductsSlice";

const store = configureStore({
  reducer: {
    products: ProductsAPISlice,
    form: ProductsSlice,
  },
});

export default store;
