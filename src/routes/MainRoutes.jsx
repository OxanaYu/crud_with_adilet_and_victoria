import React from "react";
import HomePage from "../pages/HomePage";
import PostPage from "../pages/PostPage";
import AboutPage from "../pages/AboutPage";
import CartPage from "../pages/CartPage";
import BookMark from "../pages/BookMark";
import EditPage from "../pages/EditPage";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../components/context/AuthContext";
import AuthPage from "../pages/AuthPage";
import Login from "../components/auth/Login";
import { ADMIN } from "../helpers/const";
import NoteFoundPage from "../pages/NoteFoundPage";
import AdminPage from "../pages/AdminPage";

const MainRoutes = () => {
  const { user } = useAuth();
  const PUBLIC_ROUTES = [
    { id: 1, link: "/", element: <HomePage /> },
    { id: 2, link: "/posts", element: <PostPage /> },
    { id: 3, link: "/about", element: <AboutPage /> },
    { id: 4, link: "/cart", element: <CartPage /> },
    { id: 5, link: "/bm", element: <BookMark /> },
    { id: 6, link: "/auth", element: <AuthPage /> },
    { id: 7, link: "/login", element: <Login /> },
    { id: 8, link: "*", element: <NoteFoundPage /> },
  ];

  const PRIVATE_ROUTES = [
    { id: 9, link: "/admin", element: <AdminPage /> },
    { id: 10, link: "/edit/:id", element: <EditPage /> },
  ];

  return (
    <div>
      <Routes>
        {PUBLIC_ROUTES.map((elem) => (
          <Route path={elem.link} key={elem.id} element={elem.element} />
        ))}
        {user
          ? PRIVATE_ROUTES.map((elem) => (
              <Route
                key={elem.id}
                path={elem.link}
                element={
                  user.email === ADMIN ? elem.element : <Navigate to="*" />
                }
              />
            ))
          : null}
      </Routes>
    </div>
  );
};

export default MainRoutes;
