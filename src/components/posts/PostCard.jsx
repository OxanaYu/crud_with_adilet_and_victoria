import { usePosts } from "../context/PostContext";
import { useBM } from "../context/BookMarksContext";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { IconButton } from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarOutlineTwoToneIcon from "@mui/icons-material/StarOutlineTwoTone";
import { useState } from "react";

const PostCard = ({ elem }) => {
  const { addPostToCard, checkPostInCart } = useCart();
  const navigate = useNavigate();
  const { deletePost, increaseLikes } = usePosts();
  const { addPostToBookmarks, checkPostInBm } = useBM();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isButtonActive, setIsButtonActive] = useState(false);

  const handleAddToBookmarks = () => {
    // Проверяем, есть ли пост уже в избранном
    const postInBm = checkPostInBm(elem.id);

    // Если пост не в избранном, добавляем его
    if (!postInBm) {
      addPostToBookmarks(elem);
    } else {
      console.log("Пост уже в избранном");
    }
    setIsButtonActive(true);
    // если пост уже добавлен, в консоли выйдет сообщение
  };

  const handleClick = () => {
    setIsFavorite(true);
  };
  const handleLikeClick = () => {
    increaseLikes(); // Вызываем функцию увеличения лайков из контекста
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
            marginBottom: "-10px",
            marginRight: "-140px",
            width: "30px",
            height: "30px",
            color: isButtonActive ? "yellow" : "inherit", // Устанавливаем цвет в зависимости от состояния
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
        <IconButton
          size="large"
          color="inherit"
          onClick={() => {
            handleClick();
            handleLikeClick();
          }}
        >
          {isFavorite ? (
            <FavoriteIcon style={{ color: "red" }} />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
        <div className="input-with-button">
          <input type="text" placeholder="Add your comment" />
          <button type="button">Button</button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
