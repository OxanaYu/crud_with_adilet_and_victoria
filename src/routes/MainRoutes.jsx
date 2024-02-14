import React from "react";
import HomePage from "../pages/HomePage";
import PostPage from "../pages/PostPage";
import AboutPage from "../pages/AboutPage";
import CartPage from "../pages/CartPage";
import BookMark from "../pages/BookMark";
import AdminPage from "../pages/AdminPage";
import EditPage from "../pages/EditPage";
import { Route, Routes } from "react-router-dom";

const MainRoutes = () => {
  const PUBLIC_ROUTES = [
    { id: 1, link: "/", element: <HomePage /> },
    { id: 2, link: "/posts", element: <PostPage /> },
    { id: 3, link: "/about", element: <AboutPage /> },
    { id: 4, link: "/cart", element: <CartPage /> },
    { id: 5, link: "/bm", element: <BookMark /> },
  ];

  const PRIVATE_ROUTES = [
    { id: 9, link: "/admin", element: <AdminPage /> },
    { id: 8, link: "/edit/:id", element: <EditPage /> },
  ];
  return (
    <div>
      <Routes></Routes>
    </div>
  );
};

export default MainRoutes;
