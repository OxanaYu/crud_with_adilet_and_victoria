import React, { createContext, useContext, useEffect, useReducer } from "react";
import { ACTIONS, API, API_CATEGORIES } from "../../helpers/const";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const postsContext = createContext();
export const usePosts = () => useContext(postsContext);

const INIT_STATE = {
  posts: [],
  onePost: {},
  categories: [],
  likesCount: 0,
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ACTIONS.GET_POSTS:
      return { ...state, posts: action.payload };
    case ACTIONS.GET_ONE_POST:
      return { ...state, onePost: action.payload };
    case ACTIONS.INCREASE_LIKES:
      return { ...state, likesCount: state.likesCount + 1 };
    case ACTIONS.GET_CATEGORIES:
      return { ...state, categories: action.payload };
    default:
      return state;
  }
};

const PostContext = ({ children }) => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  useEffect(() => {
    console.log(state);
  }, [state]);

  //* CREATE
  const addPost = async (newProduct) => {
    await axios.post(API, newProduct);
    navigate("/posts");
    console.log(newProduct);
  };

  //* GET
  const getPost = async () => {
    const { data } = await axios(`${API}${window.location.search}`);
    dispatch({
      type: ACTIONS.GET_POSTS,
      payload: data,
    });
  };

  //* DELETE
  const deletePost = async (id) => {
    await axios.delete(`${API}/${id}`);
    getPost();
  };
  //* GET_ONE_POST
  const getOnePost = async (id) => {
    try {
      const { data } = await axios(`${API}/${id}`);
      dispatch({
        type: ACTIONS.GET_ONE_POST,
        payload: data,
      });
    } catch (error) {
      console.error("Error fetching one post:", error);
    }
  };

  //* EDIT
  const editPost = async (id, editedProduct) => {
    try {
      await axios.patch(`${API}/${id}`, editedProduct);
      // Дополнительный код, если необходимо
    } catch (error) {
      console.error("Error editing post:", error);
    }
    navigate("/posts");
  };

  // !GET_CATEGORIES
  const getCategories = async () => {
    const { data } = await axios(API_CATEGORIES);
    console.log(data);
    dispatch({
      type: ACTIONS.GET_CATEGORIES,
      payload: data,
    });
  };
  // !CREATE CATEGORY
  const createCategory = async (newCategory) => {
    await axios.post(API_CATEGORIES, newCategory);
    getCategories();
  };
  // !FILTER
  const fetchByParams = (query, value) => {
    const search = new URLSearchParams(window.location.search);
    if (value === "all") {
      search.delete(query);
    } else {
      search.set(query, value);
    }
    const url = `${window.location.pathname}?${search}`;
    navigate(url);
  };

  const increaseLikes = () => {
    dispatch({ type: ACTIONS.INCREASE_LIKES });
  };

  const values = {
    posts: state.posts,
    addPost,
    getPost,
    deletePost,
    editPost,
    getOnePost,
    onePost: state.onePost,
    likesCount: state.likesCount,
    increaseLikes,
    getCategories,
    categories: state.categories,
    createCategory,
    fetchByParams,
  };
  return (
    <postsContext.Provider value={values}>{children}</postsContext.Provider>
  );
};

export default PostContext;
