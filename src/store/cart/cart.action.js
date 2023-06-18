import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/Reducer/reducer.helper";

const addCartItem = (cartItems, product) => {
  const index = cartItems.findIndex((item) => {
    return item._id === product._id;
  });
  if (index != -1) {
    cartItems[index].quntity += 1;
    return cartItems;
  }
  return [...cartItems, { ...product, quntity: 1 }];
};
const updateCart = (cartItems, products) => {
  products.map((product) => {
    const index = cartItems.findIndex((item) => {
      return item._id === product.product._id;
    });
    if (index != -1) {
      cartItems[index].quntity += product.quantity;
    } else {
      cartItems.push({ ...product.product, quntity: product.quantity });
    }
  });
  return cartItems;
};

const removeCartItem = (cartItems, itemToBeRemoved) => {
  if (itemToBeRemoved.quntity === 1) {
    const updatedCartItems = cartItems.filter(
      (item) => item._id != itemToBeRemoved._id
    );
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    return updatedCartItems;
  }

  const updatedCartItems = cartItems.map((item) => {
    return item._id == itemToBeRemoved._id
      ? { ...item, quntity: item.quntity - 1 }
      : item;
  });
  localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  return updatedCartItems;
};
const changeItemQuantity = (cartItems, itemToBeChanged, quantity) => {
  const updatedCartItems = cartItems.map((item) => {
    return item._id == itemToBeChanged._id
      ? { ...item, quntity: +quantity }
      : item;
  });
  localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  return updatedCartItems;
};

const clearCartItem = (cartItems, itemToBeCleared) => {
  const updatedCartItems = cartItems.filter((item) => {
    return item._id != itemToBeCleared._id;
  });
  localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  return updatedCartItems;
};
export const setClearCart = () => {
  localStorage.removeItem("cartItems");
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, []);
};

export const setIsCartOpen = (boolean) => {
  return createAction(CART_ACTION_TYPES.SET_CART_ISOPEN, boolean);
};

export const setAddItemToCart = (productToAdd) => {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
export const setUpdateCart = (itemsToAdd) => {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  let newCartItems;
  if (itemsToAdd.length !== 0) {
    newCartItems = updateCart(cartItems, itemsToAdd);
  } else {
    newCartItems = cartItems;
  }
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const setRemoveItemFromCart = (cartItems, productToRemove) => {
  const newCartItems = removeCartItem(cartItems, productToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
export const setChangeItemQuantityFromCart = (
  cartItems,
  productToRemove,
  quantity
) => {
  const newCartItems = changeItemQuantity(cartItems, productToRemove, quantity);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const setClearItemFromCart = (cartItems, productToClear) => {
  const newCartItems = clearCartItem(cartItems, productToClear);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
export const setUpdateCartState = () => {
  return createAction(CART_ACTION_TYPES.UPDATE_CART_STATE);
};
