// функция для получения данных из хранилища под ключом cart
export const getLocalStorageCart = () => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  return cart;
};

//функция для подсчета суммы всех товаров
export const calcTotalPrice = (products) => {
  const totalPrice = products.reduce((acc, curr) => acc + curr.subPrice, 0);
  return totalPrice;
};

// ? Сверить,что приходит в cart, какие там ключи
// функция для подсчета всех товаров в корзине
export const getProductsCountInCart = () => {
  let cart = getLocalStorageCart();
  return cart ? cart.postsincart.length : 0;
};

// ? Сверить,что приходит в elem, какие там ключи
//функция для подсчета стоимости за одну позицию
// export const calcSubPrice = (elem) => {
//   return elem.item.price * elem.count;
// };
