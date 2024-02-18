import {
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

const Sidebar = () => {
  const { categories, getCategories, fetchByParams } = usePosts();

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <Paper sx={{ p: 2 }}>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Category</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
          onChange={(e) => fetchByParams("category", e.target.value)}
        >
          <FormControlLabel control={<Radio />} value={"all"} label={"All"} />
          {categories.map((elem) => (
            <FormControlLabel
              key={elem.id}
              value={elem.name}
              label={elem.name}
              control={<Radio />}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Paper>
  );
};

export default Sidebar;
