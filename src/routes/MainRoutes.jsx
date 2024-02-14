import React from "react";
import HomePage from "../pages/HomePage";
import PostPage from "../pages/PostPage";
import AboutPage from "../pages/AboutPage";
import CartPage from "../pages/CartPage";
import BookMark from "../pages/BookMark";
import AdminPage from "../pages/AdminPage";
import EditPage from "../pages/EditPage";
import { Navigate, Route, Routes } from "react-router-dom";
import { ADMIN } from "../helpers/const";
import { useAuth } from "../components/context/AuthContext";
import AuthPage from "../pages/AuthPage";

const MainRoutes = () => {
  const { user } = useAuth();
  const PUBLIC_ROUTES = [
    { id: 1, link: "/", element: <HomePage /> },
    { id: 2, link: "/posts", element: <PostPage /> },
    { id: 3, link: "/about", element: <AboutPage /> },
    { id: 4, link: "/cart", element: <CartPage /> },
    { id: 5, link: "/bm", element: <BookMark /> },
    { id: 6, link: "/auth", element: <AuthPage /> },
  ];

  const PRIVATE_ROUTES = [
    { id: 7, link: "/admin", element: <AdminPage /> },
    { id: 8, link: "/edit/:id", element: <EditPage /> },
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
