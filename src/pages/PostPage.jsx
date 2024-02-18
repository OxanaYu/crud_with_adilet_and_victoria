import React from "react";
import PostList from "../components/posts/PostList";
import Sidebar from "../components/posts/Sidebar";
import { useState } from "react";

const PostPage = () => {
  const [page, setPage] = useState(1);
  return (
    <div
      style={{
        width: "250px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div style={{ width: "300px", flex: "none" }}>
        <Sidebar page={page} setPage={setPage} />
      </div>
      <PostList setPage={setPage} />
    </div>
  );
};

export default PostPage;
