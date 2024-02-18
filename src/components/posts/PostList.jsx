import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { usePosts } from "../context/PostContext";
import { Box } from "@mui/material";
import PaginationControlled from "./Pagination";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PostList = () => {
  const { posts, getPost } = usePosts();
  const [page, setPage] = useState(1);
  const { user } = useAuth();
  // useEffect(() => {
  //   getPost();
  // }, []);

  //! SEARCH
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    setPage(1);
    getPost();
  }, [searchParams]);

  // !PAGINATION
  const itemPerPage = 8;
  const count = Math.ceil(posts.length / itemPerPage);
  console.log(count);
  const currentData = () => {
    const begin = (page - 1) * itemPerPage;
    const end = begin + itemPerPage;
    return posts.slice(begin, end);
  };
  const handleChange = (e, value) => {
    setPage(value);
    console.log(value);
  };

  // useEffect(() => {
  //   getPost();
  // }, []);
  return (
    <div>
      <div>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: "30px",
            flexWrap: "wrap",
          }}
        >
          {currentData().map((elem) => (
            <PostCard key={elem.id} elem={elem} />
          ))}
        </Box>
        <PaginationControlled
          count={count}
          page={page}
          handleChange={handleChange}
        />
      </div>
    </div>
  );
};

export default PostList;
