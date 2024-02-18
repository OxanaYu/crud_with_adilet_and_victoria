// функция для получения данных из хранилища под ключом cart
export const getLocalStorageCart = () => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  return cart;
};

//функция для подсчета суммы всех товаров
// export const calcTotalPrice = (products) => {
//   const totalPrice = products.reduce((acc, curr) => acc + curr.subPrice, 0);
//   return totalPrice;
// };

// функция для подсчета всех товаров в корзине
export const getPostsCountInCart = () => {
  let cart = getLocalStorageCart();
  return cart ? cart.postsincart.length : 0;
};

// ? Сверить,что приходит в elem, какие там ключи
//функция для подсчета стоимости за одну позицию
export const calcSubPrice = (elem) => {
  return elem.item.price * elem.count;
};
export const getLocalStorage = () => {
  const post = JSON.parse(localStorage.getItem("bm"));
  return post;
};

//функция для подсчета постов в избранном
export const getPostsCountInBookmark = () => {
  let post = getLocalStorage();
  // console.log(post);
  return post ? post.posts.length : 0;
};
