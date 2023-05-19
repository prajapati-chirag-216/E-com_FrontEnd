import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/Reducer/reducer.helper";

const addCartItem = (cartItems, product) => {
  const itemExist = cartItems.find((item) => {
    return item._id === product._id;
  });
  if (itemExist) {
    return cartItems.map((item) => {
      return item._id === product._id
        ? { ...item, quntity: item.quntity + 1 }
        : item;
    });
  }
  return [...cartItems, { ...product, quntity: 1 }];
};

const removeCartItem = (cartItems, itemToBeRemoved) => {
  if (itemToBeRemoved.quntity === 1) {
    const updatedCartItems = cartItems.filter(
      (item) => item._id != itemToBeRemoved._id
    );
    localStorage.setItem("cartItems", updatedCartItems);
    return updatedCartItems;
  }

  const updatedCartItems = cartItems.map((item) => {
    return item._id == itemToBeRemoved._id
      ? { ...item, quntity: item.quntity - 1 }
      : item;
  });
  localStorage.setItem("cartItems", updatedCartItems);
  return updatedCartItems;
};

const clearCartItem = (cartItems, itemToBeCleared) => {
  const updatedCartItems = cartItems.filter((item) => {
    return item._id != itemToBeCleared._id;
  });
  localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  return updatedCartItems;
};

export const setIsCartOpen = (boolean) => {
  return createAction(CART_ACTION_TYPES.SET_CART_ISOPEN, boolean);
};

export const setAddItemToCart = (productToAdd) => {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const setRemoveItemFromCart = (cartItems, productToRemove) => {
  const newCartItems = removeCartItem(cartItems, productToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const setClearItemFromCart = (cartItems, productToClear) => {
  const newCartItems = clearCartItem(cartItems, productToClear);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
export const setUpdateCartState = () => {
  return createAction(CART_ACTION_TYPES.UPDATE_CART_STATE);
};
