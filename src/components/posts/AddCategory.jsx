import React, { useState } from "react";

import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { usePosts } from "../context/PostContext";

const AddCategory = (props) => {
  const style = {
    position: "absolute",
    top: "70%",
    left: "25%",
    width: 700,
    display: "flex",
    border: "1px solid gray",
    boxShadow: 24,
    bgcolor: "background.paper",
    borderRadius: "12px",

    p: 4,
  };
  const { open, handleClose } = props;
  const { createCategory } = usePosts();

  const [category, setCategory] = useState();

  const handleClick = () => {
    if (!category) {
      alert("Enter category!");
      return;
    } else {
      const newCategory = {
        name: category,
      };
      createCategory(newCategory);
      setCategory("");
    }
    handleClose();
  };
  return (
    <div>
      <Modal onClose={handleClose} open={open}>
        <Box sx={style}>
          <Typography
            sx={{
              width: "20%",
              color: "gray",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            id="modal-modal-title"
          >
            NEW CATEGORY
          </Typography>
          <TextField
            sx={{
              width: "58%",
            }}
            variant="outlined"
            onChange={(e) => setCategory(e.target.value)}
          />
          <Button
            sx={{ backgroundColor: "rgb(197, 132, 132)" }}
            variant="contained"
            onClick={handleClick}
          >
            Add Category
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default AddCategory;
