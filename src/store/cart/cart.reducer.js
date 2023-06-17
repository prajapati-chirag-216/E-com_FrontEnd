import { CART_ACTION_TYPES } from "./cart.types";

export const CART_INITIAL_STATE = {
  isCartOpen: false,
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
};

export const cartReducer = (state = CART_INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      localStorage.setItem("cartItems", JSON.stringify(payload));
      return {
        ...state,
        cartItems: payload,
      };
    case CART_ACTION_TYPES.SET_CART_ISOPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    case CART_ACTION_TYPES.SET_EMPTY_CART:
      localStorage.setItem("cartItems", JSON.stringify(payload));
      return{
       ...state,
       cartItems:payload
      }
    default:
      return state;
  }
};
