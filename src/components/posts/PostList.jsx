import { Box } from "@mui/material";
import React, { useState } from "react";

const PostList = () => {
  // !SEARCH

  // const { getProducts, products } = useProducts();
  // const [searchParams, setSearchParams] = useSearchParams();

  // useEffect(() => {
  //   getProducts();
  // }, [searchParams]);
  // console.log(products);

  // !PAGINATION
  const [page, setPage] = useState(1);
  const itemPerPage = 4;
  const count = Math.ceil(products.length / itemPerPage);

  const currentData = () => {
    const begin = (page - 1) * itemPerPage;
    const end = begin + itemPerPage;
    return products.slice(begin, end);
  };
  const handleChange = (e, value) => {
    setPage(value);
  };
  return (
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
  );
};

export default PostList;
