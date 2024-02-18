import React, { useState } from "react";
import AddPosts from "../components/posts/AddPosts";
import { Button } from "@mui/material";
import AddCategory from "../components/posts/AddCategory";

const AdminPage = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Button
        sx={{
          width: "320px",
          alignSelf: "center",
          marginLeft: "16px",
          marginTop: "50px",
          marginBottom: "30px",
        }}
        onClick={handleOpen}
        variant="contained"
      >
        Add Category
      </Button>
      <AddPosts />
      <AddCategory open={open} handleClose={handleClose} />
    </div>
  );
};

export default AdminPage;
