import React, { createContext, useContext, useReducer } from "react";

import { ACTIONS } from "../../helpers/const";
import {
  getLocalStorage,
  getPostsCountInBookmark,
} from "../../helpers/functions";
const bmContext = createContext();
export const useBM = () => useContext(bmContext);

const INIT_STATE = {
  bookmarks: JSON.parse(localStorage.getItem("bm")),
  bookmarksLength: getPostsCountInBookmark(),
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ACTIONS.GET_MB:
      return { ...state, bookmarks: action.payload };
    default:
      return state;
  }
};

const BookMarksContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  //   ! GET
  // Функция для получения постов из хранилища
  const getPost = () => {
    let bookmarks = getLocalStorage();

    if (!bookmarks) {
      localStorage.setItem(
        "bm",
        JSON.stringify({
          posts: [],
          totalCount: 0,
        })
      );
      bookmarks = {
        posts: [],
        totalCount: 0,
      };
    }
    dispatch({
      type: ACTIONS.GET_MB,
      payload: bookmarks,
    });
  };

  // ! CREATE
  const addPostToBookmarks = (post) => {
    let bookmarks = getLocalStorage();

    if (!bookmarks) {
      bookmarks = {
        posts: [],
        totalCount: 0,
      };
    }

    let newPost = {
      id: post.id,
      title: post.name,
      description: post.description,
      image: post.photo,
      postcount: 1,
    };

    let newBookmark = bookmarks.posts.filter((elem) => elem.id == post.id);

    if (newBookmark.length === 0) {
      bookmarks.posts.push(newPost);
    } else {
      bookmarks.posts = bookmarks.posts.filter((elem) => elem.id !== post.id);
    }

    localStorage.setItem("bm", JSON.stringify(bookmarks));

    dispatch({
      type: ACTIONS.GET_MB,
      payload: bookmarks,
    });
  };

  // функция для проверки на наличие товара в корзине
  const checkPostInBm = (id) => {
    let bookmarks = getLocalStorage();
    if (bookmarks) {
      let newBookmark = bookmarks.posts.filter((elem) => elem.id == id);
      return newBookmark.length > 0 ? true : false;
    }
  };

  //! DELETE FROM CART
  const deletePostFromBM = (id) => {
    let bookmarks = getLocalStorage();
    bookmarks.posts = bookmarks.posts.filter((elem) => elem.id !== id);

    localStorage.setItem("bm", JSON.stringify(bookmarks));
    dispatch({
      type: ACTIONS.GET_MB,
      payload: bookmarks,
    });
  };

  const values = {
    addPostToBookmarks,
    checkPostInBm,
    getPost,
    deletePostFromBM,
    bookmarks: state.bookmarks,
  };
  return <bmContext.Provider value={values}>{children}</bmContext.Provider>;
};

export default BookMarksContext;
