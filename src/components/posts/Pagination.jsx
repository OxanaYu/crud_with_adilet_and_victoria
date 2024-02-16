import { Pagination, Stack, Typography } from "@mui/material";
import React from "react";

const PaginationControlled = ({ count, page, handleChange }) => {
  return (
    <Stack spacing={2}>
      <Typography>Page:{page}</Typography>
      <Pagination count={count} color="primary" onChange={handleChange} />
    </Stack>
  );
};

export default PaginationControlled;
