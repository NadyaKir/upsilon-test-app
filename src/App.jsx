import ProductsListAPI from "./components/ProductsListAPI";

import { AppBar, Toolbar, Typography, Container } from "@mui/material";

function App() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">upsilon-test-app</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ marginTop: "20px" }}
        >
          Products
        </Typography>
        <ProductsListAPI />
      </Container>
    </div>
  );
}

export default App;
