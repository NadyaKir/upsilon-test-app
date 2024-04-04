import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import ProductsListAPI from "./components/ProductsListAPI.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store";
import ProductPage from "./pages/ProductPage.jsx";
import CreateProductPage from "./pages/CreateProductPage.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  ,
  {
    path: "/products",
    element: <ProductsListAPI />,
  },
  {
    path: "/products/:id",
    element: <ProductPage />,
  },
  {
    path: "/products/create",
    element: <CreateProductPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
