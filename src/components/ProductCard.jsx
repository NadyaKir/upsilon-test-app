import React from "react";
import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: "0 auto",
  },
  media: {
    height: 140,
  },
  button: {
    marginTop: 10,
  },
});

export default function ProductCard({ product }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={product.image}
        title={product.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.price}
        </Typography>
        <Button
          className={classes.button}
          variant="contained"
          href={`/products/${product.id}`}
        >
          View
        </Button>
      </CardContent>
    </Card>
  );
}
