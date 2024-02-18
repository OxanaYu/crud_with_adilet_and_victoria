import React, { useEffect, useState } from "react";
import { usePosts } from "../context/PostContext";

const AddPosts = () => {
  const { addPost, getPost, categories, getCategories } = usePosts();
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleAddPost = async () => {
    const newPost = {
      photo,
      name,
      description,
      category,
    };

    await addPost(newPost);
    setPhoto("");
    setName("");
    setDescription("");
    setCategory("");
    await getPost();
  };

  useEffect(() => {
    getCategories();
  }, []);

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
      <div className="input">
        <select
          id="categorySelect"
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.length > 0 &&
            categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
        </select>
      </div>
      <button className="button" onClick={handleAddPost}>
        Add Post
      </button>
    </div>
  );
};

export default AddPosts;
