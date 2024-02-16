import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";

import { useBM } from "../components/context/BookMarksContext";

const BookMark = () => {
  const { bookmarks, deletePostFromBM, getPost } = useBM();
  console.log(bookmarks.posts);

  useEffect(() => {
    getPost();
  }, []);

  const cartCleaner = () => {
    localStorage.removeItem("bm");
    getPost();
    console.log(bookmarks);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
      }}
    >
      {bookmarks.posts.map((elem) => (
        <Card
          key={elem.id}
          sx={{
            height: 360,
            boxShadow: "none",
            margin: "40px 40px",
            width: { md: "30vw", lg: "19vw" },
          }}
        >
          <CardActionArea>
            <CardMedia
              sx={{ height: 240, borderRadius: 4 }}
              image={elem.image}
            />
          </CardActionArea>
          <CardContent sx={{ padding: "20px 5px 0 5px" }}>
            <Typography
              variant="h5"
              fontSize="25px"
              fontWeight="700"
              component="div"
            >
              {elem.title}
            </Typography>
            <Typography color="black" fontSize="15px" fontWeight="700">
              {elem.description}
            </Typography>
            <Button
              variant="outlined"
              onClick={() => deletePostFromBM(elem.id)}
            >
              REMOVE
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BookMark;
