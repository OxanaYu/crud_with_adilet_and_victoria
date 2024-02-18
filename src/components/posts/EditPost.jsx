import React, { useEffect, useState } from "react";
import { usePosts } from "../context/PostContext";
import { useParams } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams();
  const { onePost, getOnePost, editPost } = usePosts();

  const [posts, setPost] = useState({
    photo: "",
    name: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    if (onePost && typeof onePost === "object") {
      setPost(onePost);
    }
  }, [onePost]);

  const handleInput = (e) => {
    const obj = { ...posts, [e.target.name]: e.target.value };
    setPost(obj);
  };

  useEffect(() => {
    getOnePost(id);
  }, [id]);

  const handleClick = () => {
    editPost(id, posts);
  };

  return (
    <div className="cardInput">
      <div className="input">
        <input
          name="photo"
          type="text"
          value={posts.photo}
          onChange={handleInput}
        />
      </div>
      <div className="input">
        <input
          name="name"
          type="text"
          value={posts.name}
          onChange={handleInput}
        />
      </div>
      <div className="input">
        <input
          name="description"
          type="text"
          value={posts.description}
          onChange={handleInput}
        />
      </div>
      <div className="input">
        <input
          name="category"
          type="text"
          value={posts.category}
          onChange={handleInput}
        />
      </div>
      <button className="button" onClick={handleClick}>
        save
      </button>
    </div>
  );
};

export default EditPost;
