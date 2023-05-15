import { createSelector } from "reselect";

export const selectCartSlice = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCartSlice],
  (cart) => cart.cartItems
);

export const selectIsCartOpen = createSelector(
  [selectCartSlice],
  (cart) => cart.isCartOpen
);

export const selectNewCartCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce((total, cartItem) => total + cartItem.quntity, 0)
);

export const selectNewCartTotal = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce((total, cartItem) => {
      return total + cartItem.quntity * cartItem.price;
    })
);
