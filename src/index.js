import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AuthContext from "./components/context/AuthContext";
import PostContext from "./components/context/PostContext";
import BookMarksContext from "./components/context/BookMarksContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <BookMarksContext>
      <AuthContext>
        <PostContext>
          <App />
        </PostContext>
      </AuthContext>
    </BookMarksContext>
  </BrowserRouter>
);
