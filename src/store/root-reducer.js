import { combineReducers } from "redux";

import { cartReducer } from "./cart/cart.reducer";
import { catagoriesReducer } from "./catagories/catagories.reducer";
import { productReducer } from "./product/product.reducer";
import { uiReducer } from "./ui/ui.reducer";
import {filterReducer} from './filter/filter.reducer'
import orderInfoReducer from "./Order/order.reducer";


export const rootReducer = combineReducers({
  cart: cartReducer,
  catagories: catagoriesReducer,
  product: productReducer,
  ui: uiReducer,
  filter:filterReducer,
  order:orderInfoReducer

});
