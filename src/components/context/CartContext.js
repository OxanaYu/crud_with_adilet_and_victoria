import React, { createContext, useContext, useReducer } from "react";
import { ACTIONS } from "../../helpers/const";
import {
  calcTotalPrice,
  getLocalStorageCart,
  getPostsCountInCart,
} from "../../helpers/functions";

const incartContext = createContext();
export const useCart = () => useContext(incartContext);

const INIT_STATE = {
  cart: JSON.parse(localStorage.getItem("cart")),
  cartLength: getPostsCountInCart(),
};
const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ACTIONS.GET_CART:
      return { ...state, cart: action.payload };
    default:
      return state;
  }
};

const CartContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  // !  GET
  // функция для получения продуктов, добавленных в корзину, из localStorage

  const getCart = () => {
    let cart = getLocalStorageCart();
    if (!cart) {
      localStorage.setItem(
        "cart",
        JSON.stringify({
          postsincart: [],
          subCount: 0,
        })
      );
      cart = {
        postsincart: [],
        subCount: 0,
      };
    } else {
      // Получаем длину массива postsincart и сохраняем ее в cartSubcount
      cart.subCount = cart.postsincart.length;
    }
    dispatch({
      type: ACTIONS.GET_CART,
      payload: cart,
    });
  };

  // ! CREATE
  const addPostToCard = (post) => {
    let cart = getLocalStorageCart();
    if (!cart) {
      cart = {
        postsincart: [],
        subCount: 0,
      };
    }
    let newPostinCart = {
      item: post,
      count: 1,
    };

    // проверяем есть ли уже пост, который хотим добавить в корзину
    let postToFind = cart.postsincart.filter(
      (elem) => elem.item.id === post.id
    );

    //если уже есть пост, то удаляем из массива cart.postsincart через фильтр, если нет,то добавляем
    if (postToFind.length === 0) {
      cart.postsincart.push(newPostinCart);
    } else {
      cart.postsincart = cart.postsincart.filter(
        (elem) => elem.item.id !== post.id
      );
    }

    //обновляем данные в localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    //обновляем состояние
    dispatch({
      type: ACTIONS.GET_CART,
      payload: cart,
    });
  };

  // функция для проверки на наличие товара в корзине
  const checkPostInCart = (id) => {
    let cart = getLocalStorageCart();
    if (cart) {
      let newCart = cart.postsincart.filter((elem) => elem.item.id == id);
      return newCart.length > 0 ? true : false;
    }
  };

  //! DELETE FROM CART
  const deletePostFromCart = (id) => {
    let cart = getLocalStorageCart();
    cart.postsincart = cart.postsincart.filter((elem) => elem.item.id !== id);
    // cart.totalPrice = calcTotalPrice(cart.products);
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({
      type: ACTIONS.GET_CART,
      payload: cart,
    });
  };

  const values = {
    addPostToCard,
    cart: state.cart,
    getCart,
    checkPostInCart,
    getPostsCountInCart,
    deletePostFromCart,
  };

  return (
    <incartContext.Provider value={values}>{children}</incartContext.Provider>
  );
};

export default CartContext;
