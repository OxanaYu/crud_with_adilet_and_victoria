import React, { useEffect } from "react";
import PostCard from "./PostCard";
import { usePosts } from "../context/PostContext";

const PostList = () => {
  const { posts, getPost } = usePosts();
  useEffect(() => {
    getPost();
  }, []);
  return (
    <div>
      <div>
        {posts.map((elem) => (
          <PostCard key={elem.id} elem={elem} />
        ))}
      </div>
    </div>
  );
};

export default PostList;
