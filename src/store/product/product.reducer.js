import { PRODUCT_ACTION_TYPES } from "./product.types";

export const PRODUCT_INITIAL_STATE = {
  productDetails: {},
};

export const productReducer = (state = PRODUCT_INITIAL_STATE, action) => {
  const { type, payload } = action;
  console.log(payload);
  switch (type) {
    case PRODUCT_ACTION_TYPES.SET_PRODUCT_DETAILS:
      return {
        ...state,
        productDetails: payload,
      };
    default:
      return state;
  }
};
