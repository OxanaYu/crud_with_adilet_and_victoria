import React from "react";
import { usePosts } from "../context/PostContext";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { IconButton } from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";

const PostCard = ({ elem }) => {
  const { addPostToCard, checkPostInCart } = useCart();
  const navigate = useNavigate();
  const { deletePost } = usePosts();
  return (
    <div className="card">
      <img src={elem.photo} alt="" />
      <h3>{elem.name}</h3>
      <p>{elem.description}</p>
      <button className="button" onClick={() => deletePost(elem.id)}>
        Delete
      </button>
      <button className="button" onClick={() => navigate(`/edit/${elem.id}`)}>
        Edit
      </button>
      <IconButton
        sx={{
          backgroundColor: checkPostInCart(elem.id) ? "black" : "",
          color: checkPostInCart(elem.id) ? "white" : "",
        }}
        onClick={() => addPostToCard(elem)}
      >
        <AddShoppingCart />
      </IconButton>
    </div>
  );
};

export default PostCard;
