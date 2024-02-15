import React from "react";

import MainRoutes from "./routes/MainRoutes";
import Navbar from "./components/HomePage/Navbar";
import PostList from "./components/posts/PostList";

import AddPost from "./components/posts/AddPosts";

const App = () => {
  return (
    <div>
      <Navbar />
      <AddPost />

      <PostList />
      <MainRoutes />
    </div>
  );
};

export default App;
