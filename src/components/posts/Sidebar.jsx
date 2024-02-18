import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";
import { usePosts } from "../context/PostContext";

const Sidebar = ({ page, setPage }) => {
  const { categories, getCategories, fetchByParams } = usePosts();

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <Paper style={{ height: "100%", width: "40%" }} sx={{ p: 2 }}>
      <FormControl>
        <FormLabel
          sx={{ marginBottom: "20px", alignSelf: "center" }}
          id="demo-radio-buttons-group-label"
        >
          Category
        </FormLabel>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              fetchByParams("category", "all");
              setPage(1); // Добавляем сюда сброс страницы
            }}
            sx={{
              marginBottom: 1,
              borderRadius: 1,
              width: "100%",
              backgroundColor: "rgb(197, 132, 132)",
            }}
          >
            All
          </Button>
          {categories.map((elem) => (
            <Button
              key={elem.id}
              variant="contained"
              color="primary"
              onClick={() => fetchByParams("category", elem.name)}
              sx={{
                marginBottom: 1,
                borderRadius: 1,
                width: "100%",
                backgroundColor: "rgb(197, 132, 132)",
              }}
            >
              {elem.name}
            </Button>
          ))}
        </div>
      </FormControl>
    </Paper>
  );
};

export default Sidebar;
