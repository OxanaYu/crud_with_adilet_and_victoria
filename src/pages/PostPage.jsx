import React from "react";
import PostList from "../components/posts/PostList";
import Sidebar from "../components/posts/Sidebar";

const PostPage = () => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ width: "300px", flex: "none" }}>
        <Sidebar />
      </div>
      <PostList />
    </div>
  );
};

export default PostPage;
