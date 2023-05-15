import { PRODUCT_ACTION_TYPES } from "./product.types";
import { createAction } from "../../utils/Reducer/reducer.helper";
export const setProductDetails = (productData) => {
  return createAction(PRODUCT_ACTION_TYPES.SET_PRODUCT_DETAILS, productData);
};
