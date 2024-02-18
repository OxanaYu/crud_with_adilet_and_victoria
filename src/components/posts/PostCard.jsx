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
import { ADMIN } from "../../helpers/const";
import { useAuth } from "../context/AuthContext";

const PostCard = ({ elem }) => {
  const { addPostToCard, checkPostInCart, deletePostFromCart } = useCart();
  const navigate = useNavigate();
  const { deletePost, increaseLikes } = usePosts();
  const { addPostToBookmarks, checkPostInBm, deletePostFromBM } = useBM();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isButtonActive, setIsButtonActive] = useState(false);
  const { user } = useAuth();

  const [comment, setComment] = useState(""); // Состояние для хранения комментария
  const [inputComment, setInputComment] = useState(""); // Локальная переменная для хранения значения из инпута

  // Обработчик для сохранения комментария после нажатия на кнопку
  const handleAddComment = (e) => {
    e.preventDefault();
    setComment(inputComment); // Обновляем состояние комментария
    setInputComment("");
  };

  // Обработчик для изменения локальной переменной при изменении инпута
  const handleInputChange = (event) => {
    setInputComment(event.target.value); // Обновляем локальную переменную при изменении
  };

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

  const handleDelete = () => {
    deletePost(elem.id);
    deletePostFromCart(elem.id);
    deletePostFromBM(elem.id);
  };

  return (
    <div className="card">
      <img src={elem.photo} alt="" />
      <h3>{elem.name}</h3>
      <p>{elem.description}</p>
      {user.email === ADMIN ? (
        <>
          <button className="button" onClick={handleDelete}>
            Delete
          </button>
          <button
            className="button"
            onClick={() => navigate(`/edit/${elem.id}`)}
          >
            Edit
          </button>
        </>
      ) : (
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
          <p>Your comment: {comment}</p>
          <div
            style={{ marginTop: "5px", marginBottom: "10px" }}
            className="input-with-button"
          >
            <input
              value={inputComment}
              onChange={handleInputChange}
              type="text"
              placeholder="Add your comment"
            />
            <button onClick={handleAddComment} type="button">
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
