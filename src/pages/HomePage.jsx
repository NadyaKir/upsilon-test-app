import React from "react";
import { Typography, Container } from "@mui/material";

const HomePage = () => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h3" component="h1" align="center" mt={5}>
        Welcome!
      </Typography>
      <Typography variant="body1" align="center" mt={3}>
        It is a test-app for Upsilon company
      </Typography>
    </Container>
  );
};

export default HomePage;
