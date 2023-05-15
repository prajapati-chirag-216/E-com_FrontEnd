import { combineReducers } from "redux";

import { cartReducer } from "./cart/cart.reducer";
import { catagoriesReducer } from "./catagories/catagories.reducer";
import { productReducer } from "./product/product.reducer";

export const rootReducer = combineReducers({
  cart: cartReducer,
  catagories: catagoriesReducer,
  product: productReducer,
});
