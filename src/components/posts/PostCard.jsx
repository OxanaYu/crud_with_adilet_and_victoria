import React from "react";
import { usePosts } from "../context/PostContext";
import { useBM } from "../context/BookMarksContext";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { IconButton } from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import StarOutlineTwoToneIcon from "@mui/icons-material/StarOutlineTwoTone";

const PostCard = ({ elem }) => {
  const { addPostToCard, checkPostInCart } = useCart();
  const navigate = useNavigate();
  const { deletePost } = usePosts();
  const { addPostToBookmarks, checkPostInBm } = useBM();

  const handleAddToBookmarks = () => {
    // Проверяем, есть ли пост уже в избранном
    const postInBm = checkPostInBm(elem.id);

    // Если пост не в избранном, добавляем его
    if (!postInBm) {
      addPostToBookmarks(elem);
    } else {
      console.log("Пост уже в избранном");
    }
    // если пост уже добавлен, в консоли выйдет сообщение
  };

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
      <div
        style={{
          marginLeft: "20px",
        }}
      >
        <StarOutlineTwoToneIcon
          onClick={handleAddToBookmarks}
          sx={{
            marginBottom: "-8px",
            marginRight: "-140px",
          }}
        />

        <IconButton
          sx={{
            backgroundColor: checkPostInCart(elem.id) ? "black" : "",
            color: checkPostInCart(elem.id) ? "white" : "",
            marginLeft: "180px",
          }}
          onClick={() => addPostToCard(elem)}
        >
          <AddShoppingCart />
        </IconButton>
      </div>
    </div>
  );
};

export default PostCard;
