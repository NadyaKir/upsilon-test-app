import { Container } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CreateProductPage from "./pages/CreateProductPage";
import ProductsPage from "./pages/ProductsPage";
import ProductPage from "./pages/ProductPage";
import EditProductPage from "./pages/EditProductPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Container maxWidth="lg" style={{ height: "100vh" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/create" element={<CreateProductPage />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/products/:id/edit" element={<EditProductPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
