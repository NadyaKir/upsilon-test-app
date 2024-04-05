import { AppBar, Toolbar, Typography, Container, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            upsilon-test-app
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/products">
            Products
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
