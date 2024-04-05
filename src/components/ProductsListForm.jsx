import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Switch,
  FormControlLabel,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { deleteFormData } from "../store/ProductsFormSlice";

export default function ProductsListForm() {
  const dispatch = useDispatch();

  const formDataList = useSelector((state) => state.form.formDataList);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const [showPublished, setShowPublished] = useState(false);

  const handleDelete = () => {
    if (productIdToDelete) {
      dispatch(deleteFormData(productIdToDelete));

      axios
        .delete(`https://fakestoreapi.com/products/${productIdToDelete}`)
        .then((response) => {
          console.log("Product deleted:", response.data);
        })
        .catch((error) => {
          console.error("Error deleting product:", error);
        });

      setDeleteDialogOpen(false);
    }
  };

  const openDeleteDialog = (id) => {
    setProductIdToDelete(id);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setProductIdToDelete(null);
    setDeleteDialogOpen(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const filterProducts = (product) => {
    if (showPublished) {
      return product.published;
    } else {
      return true;
    }
  };

  const publishedProducts = formDataList.filter(filterProducts);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={showPublished}
              onChange={(e) => setShowPublished(e.target.checked)}
              disabled={formDataList.length === 0}
            />
          }
          label="Show Published Products"
        />
        <Button
          component={Link}
          to="/products/create"
          variant="contained"
          color="primary"
          style={{ marginBottom: "1rem" }}
        >
          Create
        </Button>
      </div>

      {formDataList.length === 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="body1" color="text.secondary">
            No products found
          </Typography>
        </div>
      ) : publishedProducts.length === 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="body1" color="text.secondary">
            No published products found
          </Typography>
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Published</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {publishedProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{formatDate(product.createdAt)}</TableCell>
                  <TableCell>
                    <Switch
                      color="primary"
                      checked={product.published}
                      disabled
                    />
                  </TableCell>
                  <TableCell>
                    <Link to={`/products/${product.id}/edit`}>
                      <Button color="primary">Edit</Button>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Button
                      color="error"
                      onClick={() => openDeleteDialog(product.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this product?
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
