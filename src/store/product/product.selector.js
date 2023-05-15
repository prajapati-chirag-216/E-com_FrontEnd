import { createSelector } from "reselect";

export const selectProductDetailsSlice = (state) => state.product;

export const selectProductDetails = createSelector(
  [selectProductDetailsSlice],
  (product) => product.productDetails
);
