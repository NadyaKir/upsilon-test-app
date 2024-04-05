import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import {
  loadStateFromLocalStorage,
  saveStateToLocalStorage,
} from "./localStorage";
import ProductsFormSlice from "./ProductsFormSlice";
import ProductsAPISlice from "./ProductsAPISlice";

const persistedState = loadStateFromLocalStorage();

const store = configureStore({
  reducer: {
    products: ProductsAPISlice,
    form: ProductsFormSlice,
  },
  preloadedState: persistedState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

store.subscribe(() => {
  saveStateToLocalStorage(store.getState());
});

export default store;
