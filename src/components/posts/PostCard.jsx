import React from "react";
import { usePosts } from "../context/PostContext";
import { useNavigate } from "react-router-dom";

const PostCard = ({ elem }) => {
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
    </div>
  );
};

export default PostCard;
