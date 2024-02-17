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
    <div className="container_favorite">
      <h2 className="favorite">Favorite</h2>
      <div
        className="font"
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
              height: 380,
              boxShadow: "none",
              margin: "40px 40px",
              width: { md: "30vw", lg: "19vw" },
              border: "1px solid grey",
              borderRadius: "20px",
              textAlign: "center",
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
              <Typography
                color="black"
                fontSize="15px"
                fontWeight="700"
                marginTop="7px"
              >
                {elem.description}
              </Typography>
              <Button
                sx={{
                  marginTop: "8px",
                }}
                variant="outlined"
                onClick={() => deletePostFromBM(elem.id)}
              >
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BookMark;
