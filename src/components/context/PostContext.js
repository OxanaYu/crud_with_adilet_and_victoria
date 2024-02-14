import React, { createContext, useContext, useReducer } from "react";
import { ACTIONS } from "../../helpers/const";
export const postsContext = createContext();
export const usePosts = () => useContext(postsContext);

const INIT_STATE = {
  posts: [],
  onePost: {},
  categories: [],
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ACTIONS.GET_POSTS:
      return { ...state, posts: action.payload };
    case ACTIONS.GET_ONE_POST:
      return { ...state, onePost: action.payload };
    case ACTIONS.GET_CATEGORIES:
      return { ...state, categories: action.payload };
    default:
      return state;
  }
};

const PostContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const values = {};
  return (
    <postsContext.Provider value={values}>{children}</postsContext.Provider>
  );
};

export default PostContext;
