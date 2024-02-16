import React, { useState } from "react";
import { usePosts } from "../context/PostContext";

import { TextField } from "@mui/material";

const AddPosts = () => {
  const { addPost, getPost } = usePosts();
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleAddPost = async () => {
    const newPost = {
      photo,
      name,
      description,
    };

    await addPost(newPost);
    setPhoto("");
    setName("");
    setDescription("");
    await getPost();
  };

  return (
    <div className="cardInput">
      <div className="input">
        <input
          type="text"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
          placeholder="Photo"
        />
      </div>
      <div className="input">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
      </div>
      <div className="input">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
      </div>

      <button className="button" onClick={handleAddPost}>
        Add Post
      </button>
    </div>
  );
};

export default AddPosts;
